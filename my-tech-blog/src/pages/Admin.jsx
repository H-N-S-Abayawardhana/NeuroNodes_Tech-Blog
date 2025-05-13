// src/pages/Admin.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import PostEditor from '../components/PostEditor';

const Admin = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('newPost'); // 'newPost', 'posts', 'settings'
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  // This would normally load posts from a backend
  // For this implementation, we'll mock this behavior
  useEffect(() => {
    // In a real implementation, you would import all MD files
    // This is just a placeholder to show the structure
    const mockPosts = [
      { 
        id: 'example-post', 
        title: 'Example Post', 
        date: '2025-05-13',
        excerpt: 'This is an example post for demonstration.'
      }
    ];
    
    setPosts(mockPosts);
  }, []);

  const handleEditPost = (post) => {
    // In a real app, you would load the post content from the .md file
    // Here we're just setting up the structure
    setSelectedPost({
      ...post,
      content: '# This is the content\n\nYou would load the actual content from the file.'
    });
    setActiveTab('editPost');
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin header */}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <a href="/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
              View Blog
            </a>
            <button 
              onClick={handleLogout}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      
      {/* Admin content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {/* Tab navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex -mb-px space-x-8">
            <button
              onClick={() => {
                setActiveTab('newPost');
                setSelectedPost(null);
              }}
              className={`${
                activeTab === 'newPost'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } py-4 px-1 border-b-2 font-medium text-sm`}
            >
              New Post
            </button>
            <button
              onClick={() => setActiveTab('posts')}
              className={`${
                activeTab === 'posts'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Posts
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`${
                activeTab === 'settings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Settings
            </button>
          </nav>
        </div>
        
        {/* Tab content */}
        <div>
          {/* New Post tab */}
          {activeTab === 'newPost' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Create New Post</h2>
              <PostEditor />
            </div>
          )}
          
          {/* Edit Post tab */}
          {activeTab === 'editPost' && selectedPost && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Edit Post</h2>
              <PostEditor initialPost={selectedPost} />
            </div>
          )}
          
          {/* Posts list tab */}
          {activeTab === 'posts' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">All Posts</h2>
              
              {posts.length === 0 ? (
                <p className="text-gray-500">No posts yet. Create your first post!</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full border-separate">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="sticky top-0 z-10 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                          Title
                        </th>
                        <th scope="col" className="sticky top-0 z-10 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                          Date
                        </th>
                        <th scope="col" className="sticky top-0 z-10 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {posts.map((post) => (
                        <tr key={post.id} className="hover:bg-gray-50">
                          <td className="py-4 px-4 text-sm text-gray-900">
                            {post.title}
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-500">
                            {new Date(post.date).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-4 text-sm font-medium space-x-2">
                            <button
                              onClick={() => handleEditPost(post)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Edit
                            </button>
                            <a
                              href={`/post/${post.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-green-600 hover:text-green-900"
                            >
                              View
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
          
          {/* Settings tab */}
          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Blog Settings</h2>
              <div className="bg-white shadow rounded-lg p-6">
                <p className="text-gray-500 mb-4">
                  Blog settings are stored in <code>src/config.js</code>. 
                  For this static implementation, edit that file directly to update your blog settings.
                </p>
                
                <div className="mt-6 border-t border-gray-200 pt-4">
                  <h3 className="text-lg font-medium">Password Management</h3>
                  <p className="text-gray-500 mt-2">
                    For security reasons, you should set your admin password in a <code>.env</code> file.
                  </p>
                  <pre className="bg-gray-100 p-3 rounded mt-2 text-sm">
                    <code>
                      # .env file<br/>
                      VITE_ADMIN_PASSWORD=your_secure_password
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;