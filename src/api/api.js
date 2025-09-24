import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth API functions
export const registerUser = (data) => api.post("/auth/register", data);
export const loginUser = (data) => api.post("/auth/login", data);

// Profile API functions
export const getProfile = () => api.get("/profile");

// Blog API functions
export const getBlogs = () => api.get("/blogs");
export const getMyBlogs = () => api.get("/blogs/my-blogs");
export const createBlog = (data) => {
  // Remove author field as it's set automatically by the backend
  const { author, ...blogData } = data;
  return api.post("/blogs", blogData);
};
export const updateBlog = (id, data) => api.put(`/blogs/${id}`, data);
export const deleteBlog = (id) => api.delete(`/blogs/${id}`);

// Export API objects for backward compatibility
export const authAPI = {
  register: registerUser,
  login: loginUser,
};

export const profileAPI = {
  getProfile,
};

export const blogAPI = {
  getBlogs,
  getMyBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
};
