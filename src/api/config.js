import axios from 'axios';

// Use environment variable for production, or fallback to 5001 for local development
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

// Debugging: see which URL is being used in the browser console
console.log('InsightIQ API Connection:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;

