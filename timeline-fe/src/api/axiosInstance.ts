import axios from 'axios';

// Create an Axios instance with default settings
const axiosInstance = axios.create({
  baseURL: 'http://localhost:1337/api', // Replace with your actual Strapi backend URL
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`, // Use API token from environment variables
  },
});

export default axiosInstance;
