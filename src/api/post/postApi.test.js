import { fetchPosts, addPost } from './postApi';
import api from './postAxiosInstance';

jest.mock('./postAxiosInstance', () => ({
    get: jest.fn(),
    post: jest.fn(),
}));

describe('Post API', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('fetchPosts should call GET /posts and return data', async () => {
        const fakeResponse = {
            data: [{ title: 'Post 1', content: 'Content 1' }]
        };
        api.get.mockResolvedValue(fakeResponse);

        const posts = await fetchPosts();
        expect(api.get).toHaveBeenCalledWith('/posts');
        expect(posts).toEqual(fakeResponse.data.posts);
    });

    test('addPost should call POST /posts', async () => {
        const post = { title: 'New Post', content: 'New Content' };
        api.post.mockResolvedValue({});

        await addPost(post);
        expect(api.post).toHaveBeenCalledWith('/posts', post);
    });

    test('fetchPosts should throw on error', async () => {
        api.get.mockRejectedValue(new Error('fetch error'));

        await expect(fetchPosts()).rejects.toThrow('fetch error');
    });

    test('addPost should throw on error', async () => {
        const post = { title: 'New Post', content: 'New Content' };
        api.post.mockRejectedValue(new Error('add error'));

        await expect(addPost(post)).rejects.toThrow('add error');
    });
});
