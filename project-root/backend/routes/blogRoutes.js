const express = require("express");
const {
  getBlogs,
  getMyBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Get all blogs
router.get("/", getBlogs);

// Get user's own blogs
router.get("/my-blogs", protect, getMyBlogs);

// Get single blog
router.get("/:id", getBlog);

// Create new blog
router.post("/", protect, createBlog);

// Update blog
router.put("/:id", protect, updateBlog);

// Delete blog
router.delete("/:id", protect, deleteBlog);

module.exports = router;
