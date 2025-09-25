const Blog = require("../models/Blog");

// @desc Get all blogs
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get user's own blogs
const getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ authorEmail: req.user.email }).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get single blog
const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Create new blog
const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = await Blog.create({
      title,
      content,
      author: req.user.name, // Use authenticated user's name
      authorEmail: req.user.email, // Use authenticated user's email for security
      canDelete: true, // Explicitly set to true
    });
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update blog
const updateBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check if the current user is the author of the blog using email for security
    if (blog.authorEmail !== req.user.email) {
      return res.status(403).json({ message: "Not authorized to update this blog" });
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete blog
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check if the current user is the author of the blog using email for security
    if (blog.authorEmail !== req.user.email) {
      return res.status(403).json({ message: "Not authorized to delete this blog" });
    }

    // Check if the blog can be deleted (allow if canDelete is true or undefined for existing blogs)
    if (blog.canDelete === false) {
      return res.status(403).json({ message: "Blog can only be deleted once" });
    }

    // Set canDelete to false and delete the blog
    blog.canDelete = false;
    await blog.save();
    await blog.deleteOne();
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getBlogs, getMyBlogs, getBlog, createBlog, updateBlog, deleteBlog };
