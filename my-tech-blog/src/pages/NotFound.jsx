import React from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

function NotFound() {
  return (
    <>
      <SEO 
        title="Page Not Found"
        description="Sorry, the page you are looking for does not exist."
      />
      
      <div className="max-w-2xl mx-auto text-center py-16">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
        
        <p className="text-xl text-gray-600 mb-8">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        
        <Link 
          to="/" 
          className="btn btn-primary inline-block"
        >
          Return to Home
        </Link>
      </div>
    </>
  )
}

export default NotFound