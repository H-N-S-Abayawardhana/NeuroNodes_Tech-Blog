// src/config.js
/**
 * Global configuration for the blog
 */

const config = {
  // Blog information
  blog: {
    title: 'NeuroNodes Tech Blog',
    description: 'A modern React tech blog focusing on web development, AI, and programming tips.',
    author: 'Niwarthana Abayawardhana',
    logo: '/assets/logo.svg',
    baseUrl: 'https://your-domain.com', 
  },
  
  // Social media links
  social: {
    twitter: 'https://twitter.com/yourusername',
    github: 'https://github.com/H-N-S-Abayawardhana',
    linkedin: 'https://www.linkedin.com/in/niwarthana-abayawardhana-0752a5268/',
  },
  
  // Navigation links
  navigation: [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    // Add more navigation items as needed
  ],
  
  // Default SEO settings
  seo: {
    defaultTitle: 'NeuroNodes Tech Blog',
    titleTemplate: '%s | NeuroNodes Tech Blog',
    defaultDescription: 'A modern React tech blog focusing on web development, AI, and programming tips.',
    defaultKeywords: 'react, javascript, web development, programming, tech blog',
    twitterUsername: '@yourusername',
  },
  
  // Post display settings
  posts: {
    postsPerPage: 6, // Number of posts to show per page
    excerptLength: 160, // Character length for post excerpts
    dateFormat: 'MMMM dd, yyyy', // Format for displaying dates
  },
  
  // Footer content
  footer: {
    copyright: `© ${new Date().getFullYear()} NeuroNodes Tech Blog. All rights reserved.`,
  },
};

export default config;