import axios from 'axios';

const port = process.env.REACT_APP_SERVER_PORT || 8000;
const api = axios.create({
    baseURL: `http://localhost:${port}`,
});

export const fetchUsers = async () => {
    try {
        const response = await api.get('/users');
        return response.data.utilisateurs;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const addUser = async (user) => {
    try {
        await api.post('/users', user);
    } catch (error) {
        console.error("Error adding user:", error);
        throw error;
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await api.post('/login', { email, password });
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};