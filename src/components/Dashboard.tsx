import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { profileAPI, blogAPI, createBlog, updateBlog, deleteBlog } from '../api/api';
import type { User, Blog } from '../api/api';
import Navbar from './Navbar.tsx';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Blog creation state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Blog editing state
  const [editingBlog, setEditingBlog] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  // Blog filter state
  const [showMyBlogs, setShowMyBlogs] = useState(false);

  // Filtered blogs based on filter state
  const filteredBlogs = showMyBlogs ? blogs.filter(blog => blog.author === user?.name) : blogs;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [profileResponse, blogsResponse] = await Promise.all([
        profileAPI.getProfile(),
        blogAPI.getBlogs(),
      ]);
      setProfile(profileResponse.data);
      setBlogs(blogsResponse.data);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  // Create new blog
  const handleCreate = async () => {
    if (!title || !content) return;
    try {
      await createBlog({ title, content, author: user?.name || '' });
      setTitle('');
      setContent('');
      fetchData(); // Refresh blogs
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error creating blog');
    }
  };

  // Start editing blog
  const startEdit = (blog: Blog) => {
    setEditingBlog(blog._id);
    setEditTitle(blog.title);
    setEditContent(blog.content);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingBlog(null);
    setEditTitle('');
    setEditContent('');
  };

  // Update blog
  const handleUpdate = async () => {
    if (!editingBlog || !editTitle || !editContent) return;
    try {
      await updateBlog(editingBlog, { title: editTitle, content: editContent });
      setEditingBlog(null);
      setEditTitle('');
      setEditContent('');
      fetchData(); // Refresh blogs
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error updating blog');
    }
  };

  // Delete blog
  const handleDelete = async (id: string) => {
    try {
      await deleteBlog(id);
      fetchData(); // Refresh blogs
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error deleting blog');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-secondary-600 text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50">
      <Navbar />
      {/* Header */}
      <header className="bg-gradient-to-r from-white to-secondary-100 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-8">
            <h1 className="text-4xl font-extrabold text-secondary-900">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-secondary-700 text-lg">Welcome, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="bg-error hover:bg-red-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-8 bg-red-100 border border-error text-error px-6 py-4 rounded-lg shadow">
            {error}
          </div>
        )}

        <div className="px-4 py-6 sm:px-0">
          {/* Profile Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-6">Profile</h2>
            <div className="bg-white overflow-hidden shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300">
              <div className="px-6 py-8 sm:p-8">
                <dl className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                  <div>
                    <dt className="text-lg font-semibold text-secondary-600">Name</dt>
                    <dd className="mt-2 text-xl text-secondary-900">{profile?.name}</dd>
                  </div>
                  <div>
                    <dt className="text-lg font-semibold text-secondary-600">Email</dt>
                    <dd className="mt-2 text-xl text-secondary-900">{profile?.email}</dd>
                  </div>
                  <div>
                    <dt className="text-lg font-semibold text-secondary-600">Member since</dt>
                    <dd className="mt-2 text-xl text-secondary-900">
                      {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* Add New Blog Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-6">Create New Blog</h2>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Blog title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                />
                <textarea
                  placeholder="Blog content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
                  rows={4}
                />
                <button
                  onClick={handleCreate}
                  className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Add Blog
                </button>
              </div>
            </div>
          </div>

          {/* Blogs Section */}
          <div>
            <h2 className="text-3xl font-bold text-secondary-900 mb-6">Blogs</h2>
            {/* Filter UI */}
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={showMyBlogs}
                  onChange={(e) => setShowMyBlogs(e.target.checked)}
                  disabled={!user}
                  className="mr-2"
                />
                <span className="text-secondary-700">Show only my blogs</span>
              </label>
            </div>
            {filteredBlogs.length === 0 ? (
              <div className="bg-white overflow-hidden shadow-lg rounded-xl">
                <div className="px-6 py-8 sm:p-8 text-center">
                  <p className="text-secondary-500 text-lg">
                    {showMyBlogs ? 'No blogs found for your filter. Create your first blog!' : 'No blogs found. Create your first blog!'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredBlogs.map((blog) => (
                  <div key={blog._id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-200">
                    {editingBlog === blog._id ? (
                      <>
                        <div className="space-y-4 mb-4">
                          <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                            placeholder="Edit title"
                          />
                          <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
                            rows={4}
                            placeholder="Edit content"
                          />
                        </div>
                        <div className="flex space-x-3">
                          <button
                            onClick={handleUpdate}
                            className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-md hover:shadow-lg"
                          >
                            Save Changes
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="flex-1 bg-secondary-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-secondary-600 transition-all duration-200 shadow-md hover:shadow-lg"
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="mb-4">
                          <h3 className="text-xl font-bold text-secondary-800 mb-2">{blog.title}</h3>
                          <p className="text-secondary-600 leading-relaxed">{blog.content}</p>
                          <p className="text-sm text-secondary-500 mt-2">By: <span className="font-medium">{blog.author}</span></p>
                        </div>
                        <div className="flex space-x-3">
                          <button
                            onClick={() => startEdit(blog)}
                            className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-md hover:shadow-lg"
                          >
                            Edit Blog
                          </button>
                          <button
                            onClick={() => handleDelete(blog._id)}
                            className="flex-1 bg-gradient-to-r from-error to-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

