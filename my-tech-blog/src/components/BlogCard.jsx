import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import config from '../config'

function BlogCard({ post }) {
  return (
    <article className="card hover:shadow-lg transition-shadow duration-300">
      {post.coverImage && (
        <div className="h-48 overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="text-sm text-gray-500 mb-2">
          {format(new Date(post.date), config.dateFormat)}
        </div>
        
        <h2 className="text-xl font-bold mb-2">
          <Link to={`/post/${post.slug}`} className="text-gray-900 hover:text-blue-600">
            {post.title}
          </Link>
        </h2>
        
        <p className="text-gray-600 mb-4">
          {post.description || post.excerpt}
        </p>
        
        <Link 
          to={`/post/${post.slug}`} 
          className="inline-block text-blue-600 font-medium hover:text-blue-800"
        >
          Read more →
        </Link>
      </div>
    </article>
  )
}

export default BlogCard