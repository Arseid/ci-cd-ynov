import api from './postAxiosInstance';

export const fetchPosts = async () => {
    try {
        const response = await api.get('/posts');
        return response.data.posts;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
}

export const addPost = async (post) => {
    try {
        await api.post('/posts', post);
    } catch (error) {
        console.error("Error adding post:", error);
        throw error;
    }
};