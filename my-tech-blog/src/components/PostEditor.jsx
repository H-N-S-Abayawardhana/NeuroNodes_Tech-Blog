// src/components/PostEditor.jsx
import React, { useState, useEffect } from 'react';
import { generateSlug, parseMarkdown } from '../utils/markdownParser';

const PostEditor = ({ initialPost = null }) => {
  const [title, setTitle] = useState(initialPost?.title || '');
  const [slug, setSlug] = useState(initialPost?.slug || '');
  const [date, setDate] = useState(
    initialPost?.date || new Date().toISOString().split('T')[0]
  );
  const [description, setDescription] = useState(initialPost?.description || '');
  const [imageUrl, setImageUrl] = useState(initialPost?.image || '');
  const [tags, setTags] = useState(initialPost?.tags?.join(', ') || '');
  const [content, setContent] = useState(initialPost?.content || '');
  const [preview, setPreview] = useState('');
  const [markdownOutput, setMarkdownOutput] = useState('');
  const [previewTab, setPreviewTab] = useState('rendered'); // 'rendered' or 'raw'

  // Generate slug from title
  useEffect(() => {
    if (title && !initialPost) {
      setSlug(generateSlug(title));
    }
  }, [title, initialPost]);

  // Update preview when content changes
  useEffect(() => {
    if (content) {
      try {
        const { html } = parseMarkdown(content);
        setPreview(html);
      } catch (error) {
        console.error('Error generating preview:', error);
      }
    } else {
      setPreview('');
    }
  }, [content]);

  // Generate markdown file output
  useEffect(() => {
    if (title) {
      // Format tags as array
      const tagArray = tags
        ? tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        : [];
      
      // Create frontmatter section
      const frontmatter = [
        '---',
        `title: "${title}"`,
        `slug: "${slug}"`,
        `date: "${date}"`,
        `description: "${description}"`,
        imageUrl ? `image: "${imageUrl}"` : null,
        tagArray.length > 0 ? `tags: [${tagArray.map(tag => `"${tag}"`).join(', ')}]` : null,
        '---',
        '',
        content
      ].filter(Boolean).join('\n');
      
      setMarkdownOutput(frontmatter);
    }
  }, [title, slug, date, description, imageUrl, tags, content]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column - Post details */}
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Post Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Your Post Title"
            />
          </div>
          
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
              Slug (URL)
            </label>
            <input
              type="text"
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="post-url-slug"
            />
          </div>
          
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Publish Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description (SEO)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              rows="2"
              placeholder="Brief description for SEO and previews"
            />
          </div>
          
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
              Featured Image URL
            </label>
            <input
              type="text"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
              Tags (comma separated)
            </label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="react, javascript, tutorial"
            />
          </div>
        </div>
        
        {/* Right column - Markdown content */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content (Markdown)
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 font-mono"
            rows="15"
            placeholder="Write your post content in Markdown..."
          />
        </div>
      </div>
      
      {/* Preview panel */}
      <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Preview</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setPreviewTab('rendered')}
              className={`px-3 py-1 rounded ${
                previewTab === 'rendered' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700'
              }`}
            >
              Rendered
            </button>
            <button
              onClick={() => setPreviewTab('raw')}
              className={`px-3 py-1 rounded ${
                previewTab === 'raw' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700'
              }`}
            >
              Raw Markdown
            </button>
          </div>
        </div>
        
        {previewTab === 'rendered' ? (
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: preview }}
          />
        ) : (
          <div className="relative">
            <pre className="bg-gray-800 text-white p-4 rounded-md overflow-auto max-h-96">
              <code>{markdownOutput}</code>
            </pre>
            <button
              onClick={() => {
                navigator.clipboard.writeText(markdownOutput);
                alert('Markdown copied to clipboard!');
              }}
              className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-sm"
            >
              Copy
            </button>
          </div>
        )}
      </div>
      
      <div className="flex justify-end">
        <p className="text-sm text-gray-500 mr-4">
          Copy the raw markdown and save it to <code>/src/posts/{slug}.md</code>
        </p>
        <button
          onClick={() => {
            navigator.clipboard.writeText(markdownOutput);
            alert('Markdown copied to clipboard!');
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Copy Markdown
        </button>
      </div>
    </div>
  );
};

export default PostEditor;