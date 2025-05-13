import React from 'react'
import { Helmet } from 'react-helmet-async'
import config from '../config'

function SEO({ title, description, image, article }) {
  const siteTitle = config.title
  const seoTitle = title ? `${title} | ${siteTitle}` : siteTitle
  const seoDescription = description || config.description
  const seoImage = image || `${config.siteUrl}/default-og-image.jpg`
  const url = typeof window !== 'undefined' ? window.location.href : ''
  
  return (
    <Helmet>
      {/* Basic metadata */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      {config.social.twitter && (
        <meta name="twitter:creator" content={`@${config.social.twitter}`} />
      )}
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  )
}

export default SEO