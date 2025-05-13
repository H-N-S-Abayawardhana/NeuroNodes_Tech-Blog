import React from 'react'
import SEO from '../components/SEO'
import config from '../config'

function About() {
  return (
    <>
      <SEO 
        title="About"
        description={`Learn more about ${config.title} and its author.`}
      />
      
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">About</h1>
        
        <div className="prose prose-lg lg:prose-xl">
          <p>
            Welcome to {config.title}! This blog is dedicated to sharing knowledge,
            insights, and experiences in the world of technology and web development.
          </p>
          
          <h2>About the Author</h2>
          <p>
            Hi there! I'm {config.author}, a passionate web developer and technology enthusiast.
            I created this blog to share my journey, lessons learned, and helpful tips with
            fellow developers and tech enthusiasts.
          </p>
          <p>
            My goal is to provide valuable content that helps you learn new skills, solve
            challenging problems, and stay up-to-date with the latest trends in web development
            and technology.
          </p>
          
          <h2>Topics Covered</h2>
          <p>
            This blog covers a wide range of topics including:
          </p>
          <ul>
            <li>Frontend Development (React, Vue, Angular)</li>
            <li>Backend Development (Node.js, Python, etc.)</li>
            <li>Web Performance Optimization</li>
            <li>UI/UX Design Principles</li>
            <li>Developer Tools and Productivity</li>
            <li>Industry Best Practices</li>
          </ul>
          
          <h2>Connect with Me</h2>
          <p>
            I love connecting with fellow developers and readers! Feel free to reach out
            through any of my social media channels:
          </p>
          <ul>
            {config.social.twitter && (
              <li>
                <a 
                  href={`https://twitter.com/${config.social.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </li>
            )}
            {config.social.github && (
              <li>
                <a 
                  href={`https://github.com/${config.social.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
            )}
            {config.social.linkedin && (
              <li>
                <a 
                  href={`https://linkedin.com/in/${config.social.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  )
}

export default About