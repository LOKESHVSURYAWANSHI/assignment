const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    authorEmail: { type: String, required: true },
    canDelete: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
