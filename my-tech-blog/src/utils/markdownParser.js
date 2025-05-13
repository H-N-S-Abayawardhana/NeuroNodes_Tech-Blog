// src/utils/markdownParser.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import highlight from 'highlight.js';
import DOMPurify from 'dompurify';

// Set the posts directory
const postsDirectory = path.join(import.meta.env.BASE_URL || '', 'posts');

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
 * Get all posts from the /posts directory
 */
export const getAllPosts = () => {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const metadata = extractPostMetadata(fileContents);
    return {
      slug,
      ...metadata
    };
  });
};

/**
 * Get one post by slug
 */
export const getPostBySlug = (slug) => {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
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
