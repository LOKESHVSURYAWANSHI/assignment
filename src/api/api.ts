import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Type definitions
export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface CreateBlogData {
  title: string;
  content: string;
  author: string;
}

export interface UpdateBlogData {
  title?: string;
  content?: string;
}

// Auth API functions
export const registerUser = (data: RegisterData) => api.post("/auth/register", data);
export const loginUser = (data: LoginData) => api.post("/auth/login", data);

// Profile API functions
export const getProfile = () => api.get("/profile");

// Blog API functions
export const getBlogs = () => api.get("/blogs");
export const createBlog = (data: CreateBlogData) => api.post("/blogs", data);
export const updateBlog = (id: string, data: UpdateBlogData) => api.put(`/blogs/${id}`, data);
export const deleteBlog = (id: string) => api.delete(`/blogs/${id}`);

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
  createBlog,
  updateBlog,
  deleteBlog,
};
