import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { format } from 'date-fns'
import { getPostBySlug } from '../utils/markdownParser'
import SEO from '../components/SEO'
import config from '../config'

function PostDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await getPostBySlug(slug)
        
        if (!postData) {
          // Post not found, redirect to 404
          navigate('/404', { replace: true })
          return
        }
        
        setPost(postData)
      } catch (error) {
        console.error('Error fetching post:', error)
        navigate('/404', { replace: true })
      } finally {
        setLoading(false)
      }
    }
    
    fetchPost()
  }, [slug, navigate])
  
  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto animate-spin"></div>
        <p className="mt-4 text-gray-600">Loading post...</p>
      </div>
    )
  }
  
  if (!post) {
    return null // Will redirect to 404 page via useEffect
  }
  
  const { frontmatter, content } = post
  
  return (
    <>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description || content.substring(0, 160)}
        image={frontmatter.coverImage}
        article={true}
      />
      
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{frontmatter.title}</h1>
          
          <div className="text-gray-600 mb-6">
            {format(new Date(frontmatter.date), config.dateFormat)}
          </div>
          
          {frontmatter.coverImage && (
            <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
              <img
                src={frontmatter.coverImage}
                alt={frontmatter.title}
                className="w-full h-auto"
              />
            </div>
          )}
          
          {frontmatter.description && (
            <p className="text-xl text-gray-600 mb-8">
              {frontmatter.description}
            </p>
          )}
        </header>
        
        <div className="blog-content prose prose-lg lg:prose-xl">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </article>
    </>
  )
}

export default PostDetail