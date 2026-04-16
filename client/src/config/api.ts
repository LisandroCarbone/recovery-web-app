import axios from 'axios';

const api = axios.create({
    baseURL: 'https://recovery-web-app-backend.up.railway.app/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
