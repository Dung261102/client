import axios from 'axios';

const URL = process.env.NODE_ENV !== 'development' ? 'https://blog-app-nd-server.onrender.com' : 'http://localhost:5000';

export const fetchPosts = () => axios.get(`${URL}/posts`);
export const createPost = (payload) => axios.post(`${URL}/posts`, payload);
export const updatePost = (payload) =>
    axios.post(`${URL}/posts/update`, payload);
// Thêm hàm xóa bài viết
export const deletePost = (postId) =>
    axios.delete(`${URL}/posts/${postId}`);
