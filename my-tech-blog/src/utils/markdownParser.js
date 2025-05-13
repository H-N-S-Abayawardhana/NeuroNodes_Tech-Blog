// src/utils/markdownParser.js
import matter from 'gray-matter';
import { marked } from 'marked';
import highlight from 'highlight.js';
import DOMPurify from 'dompurify';

// Configure marked with syntax highlighting
marked.setOptions({
  highlight: function(code, lang) {
    const language = highlight.getLanguage(lang) ? lang : 'plaintext';
    return highlight.highlight(code, { language }).value;
  },
  langPrefix: 'hljs language-',
  gfm: true,  // Enable GitHub Flavored Markdown
  breaks: true,  // Add <br> on single line breaks
  headerIds: true,  // Add IDs to headers for anchor links
  mangle: false,  // Don't escape autolinked email addresses
});

/**
 * Parse a markdown file with frontmatter
 * @param {string} markdownContent - Raw markdown content with frontmatter
 * @returns {Object} - { frontmatter: {}, content: string, excerpt: string, html: string }
 */
export const parseMarkdown = (markdownContent) => {
  try {
    // Parse frontmatter and content
    const { data: frontmatter, content } = matter(markdownContent);
    
    // Generate excerpt (first 160 characters of content, removing markdown)
    const plainText = content.replace(/[#*[\]_`~]/g, '').trim();
    const excerpt = plainText.substring(0, 160) + (plainText.length > 160 ? '...' : '');
    
    // Convert markdown to HTML
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

/**
 * Get reading time estimate based on content
 * @param {string} content - Plain text content
 * @returns {string} - Estimated reading time
 */
export const getReadingTime = (content) => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

/**
 * Format a date string
 * @param {string} dateString - ISO date string
 * @returns {string} - Formatted date (e.g., "May 12, 2025")
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Extract metadata from markdown content
 * @param {string} markdownContent - Raw markdown with frontmatter
 * @returns {Object} - Metadata object with frontmatter + derived properties
 */
export const extractPostMetadata = (markdownContent) => {
  const { frontmatter, content, excerpt } = parseMarkdown(markdownContent);
  
  return {
    ...frontmatter,
    excerpt,
    readingTime: getReadingTime(content)
  };
};

/**
 * Generate URL-friendly slug from a title
 * @param {string} title - Post title
 * @returns {string} - URL-friendly slug
 */
export const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')     // Replace spaces with dashes
    .replace(/-+/g, '-')      // Remove consecutive dashes
    .trim();
};

export default {
  parseMarkdown,
  getReadingTime,
  formatDate,
  extractPostMetadata,
  generateSlug
};