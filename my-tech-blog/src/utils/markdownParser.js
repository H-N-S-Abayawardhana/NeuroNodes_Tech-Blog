// src/utils/markdownParser.js
// MODIFIED VERSION - Browser Compatible

import matter from 'gray-matter';
import { marked } from 'marked';
import highlight from 'highlight.js';
import DOMPurify from 'dompurify';

// Configure marked
marked.setOptions({
  highlight: function(code, lang) {
    const language = highlight.getLanguage(lang) ? lang : 'plaintext';
    return highlight.highlight(code, { language }).value;
  },
  langPrefix: 'hljs language-',
  gfm: true,
  breaks: true,
  headerIds: true,
  mangle: false,
});

/**
 * Parse markdown content
 */
export const parseMarkdown = (markdownContent) => {
  try {
    const { data: frontmatter, content } = matter(markdownContent);
    const plainText = content.replace(/[#*[\]_`~]/g, '').trim();
    const excerpt = plainText.substring(0, 160) + (plainText.length > 160 ? '...' : '');
    const html = DOMPurify.sanitize(marked(content));

    return {
      frontmatter,
      content,
      excerpt,
      html
    };
  } catch (error) {
    console.error('Error parsing markdown:', error);
    return {
      frontmatter: {},
      content: '',
      excerpt: '',
      html: ''
    };
  }
};

export const getReadingTime = (content) => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const extractPostMetadata = (markdownContent) => {
  const { frontmatter, content, excerpt } = parseMarkdown(markdownContent);
  return {
    ...frontmatter,
    excerpt,
    readingTime: getReadingTime(content)
  };
};

export const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

/**
 * BROWSER-COMPATIBLE POST HANDLING
 * Instead of using fs module to read files from the filesystem,
 * we'll use import.meta.glob which is a Vite feature to load files
 */

// This will be populated by the getAllPosts function
let postsCache = null;

/**
 * Get all posts using Vite's import.meta.glob
 */
export const getAllPosts = async () => {
  if (postsCache) return postsCache;
  
  // Use Vite's import.meta.glob to get all .md files from the posts directory
  const postFiles = import.meta.glob('/src/posts/*.md', { eager: true });
  
  const posts = Object.keys(postFiles).map((filePath) => {
    // Extract slug from file path
    const fileName = filePath.split('/').pop();
    const slug = fileName.replace(/\.md$/, '');
    
    // Get the raw content as a string
    const fileContents = postFiles[filePath].default || '';
    const metadata = extractPostMetadata(fileContents);
    
    return {
      slug,
      ...metadata
    };
  });
  
  // Sort posts by date (newest first)
  postsCache = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  return postsCache;
};

/**
 * Get one post by slug
 */
export const getPostBySlug = async (slug) => {
  const posts = await getAllPosts();
  const post = posts.find(post => post.slug === slug);
  
  if (!post) {
    throw new Error(`Post with slug "${slug}" not found`);
  }
  
  // We already have all the metadata from getAllPosts
  // Now we need to get the full content
  const postFiles = import.meta.glob('/src/posts/*.md', { as: 'raw', eager: true });
  const filePath = Object.keys(postFiles).find(path => path.includes(`${slug}.md`));
  
  if (!filePath) {
    throw new Error(`File for post "${slug}" not found`);
  }
  
  const fileContents = postFiles[filePath];
  const { frontmatter, content, excerpt, html } = parseMarkdown(fileContents);

  return {
    slug,
    frontmatter,
    content,
    excerpt,
    html,
    readingTime: getReadingTime(content),
  };
};