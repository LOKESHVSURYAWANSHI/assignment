import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getBlogs, getMyBlogs, createBlog, updateBlog, deleteBlog } from "../api/api";

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingBlog, setEditingBlog] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [isMyBlogFilter, setIsMyBlogFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Check if user is authenticated
  const isAuthenticated = !!localStorage.getItem("token");

  // Fetch blogs from API
  const fetchBlogs = async () => {
    setLoading(true);
    setError("");
    try {
      const res = isMyBlogFilter ? await getMyBlogs() : await getBlogs();
      setBlogs(res.data);
    } catch (err) {
      const errorMessage = err.response?.status === 401
        ? "Please log in to view your blogs"
        : err.response?.data?.message || "Error fetching blogs";
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle My Blog button click
  const handleMyBlogClick = () => {
    setIsMyBlogFilter(!isMyBlogFilter);
  };

  useEffect(() => {
    fetchBlogs();
  }, [isMyBlogFilter]);

  // Create new blog
  const handleCreate = async () => {
    if (!title || !content) return;
    try {
      await createBlog({ title, content });
      setTitle("");
      setContent("");
      fetchBlogs();
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Error creating blog";
      alert(errorMessage);
    }
  };

  // Start editing blog
  const startEdit = (blog) => {
    setEditingBlog(blog._id);
    setEditTitle(blog.title);
    setEditContent(blog.content);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingBlog(null);
    setEditTitle("");
    setEditContent("");
  };

  // Update blog
  const handleUpdate = async () => {
    if (!editTitle || !editContent) return;
    try {
      await updateBlog(editingBlog, { title: editTitle, content: editContent });
      setEditingBlog(null);
      setEditTitle("");
      setEditContent("");
      fetchBlogs();
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Error updating blog";
      alert(errorMessage);
    }
  };

  // Delete blog
  const handleDelete = async (id) => {
    try {
      await deleteBlog(id);
      fetchBlogs();
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Error deleting blog";
      alert(errorMessage);
    }
  };

  return (
    <>
      <Navbar onMyBlogClick={handleMyBlogClick} isAuthenticated={isAuthenticated} />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold text-green-600 mb-2">My Blogs</h1>
              <p className="text-gray-600">Manage and create your personal blogs</p>
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Dashboard</h2>

            {/* Add new blog */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Create New Blog</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Blog title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                />
                <textarea
                  placeholder="Blog content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
                  rows="4"
                />
                <button
                  onClick={handleCreate}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Add Blog
                </button>
              </div>
            </div>
          </div>

          {/* Blog list */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Blogs</h3>
            {blogs.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <p className="text-gray-500 text-lg">No blogs yet. Create your first blog above!</p>
              </div>
            ) : (
              blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-200"
                >
                  {editingBlog === blog._id ? (
                    <>
                      <div className="space-y-4 mb-4">
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                          placeholder="Edit title"
                        />
                        <textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
                          rows="4"
                          placeholder="Edit content"
                        />
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={handleUpdate}
                          className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{blog.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{blog.content}</p>
                        <p className="text-sm text-gray-500 mt-2">By: <span className="font-medium">{blog.author}</span></p>
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => startEdit(blog)}
                          className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                          Edit Blog
                        </button>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
