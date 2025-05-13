import React, { useEffect, useState } from 'react'
import SEO from '../components/SEO'
import BlogCard from '../components/BlogCard'
import { getAllPosts } from '../utils/markdownParser'
import config from '../config'

function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await getAllPosts()
        setPosts(allPosts)
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchPosts()
  }, [])
  
  return (
    <>
      <SEO 
        title="Home"
        description={config.description}
      />
      
      <div className="max-w-4xl mx-auto">
        <section className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome to {config.title}</h1>
          <p className="text-xl text-gray-600">
            {config.description}
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading posts...</p>
            </div>
          ) : posts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-100 rounded-lg">
              <p className="text-gray-600">No posts found.</p>
            </div>
          )}
        </section>
      </div>
    </>
  )
}

export default Home