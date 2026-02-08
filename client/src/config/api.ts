import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api', // Fallback to proxy in dev if var is missing
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
