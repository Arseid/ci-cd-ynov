import { fetchUsers, addUser, loginUser, deleteUser } from './userApi';
import api from "./userAxiosInstance";

jest.mock('./userAxiosInstance', () => ({
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn()
}));

describe('User API', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('fetchUsers should call GET /users and return data', async () => {
        const fakeResponse = {
            data: {
                utilisateurs: [{ name: 'Jane', surname: 'Doe' }]
            }
        };
        api.get.mockResolvedValue(fakeResponse);

        const users = await fetchUsers();
        expect(api.get).toHaveBeenCalledWith('/users');
        expect(users).toEqual(fakeResponse.data.utilisateurs);
    });

    test('addUser should call POST /users', async () => {
        const user = { name: 'John' };
        api.post.mockResolvedValue({});

        await addUser(user);
        expect(api.post).toHaveBeenCalledWith('/users', user);
    });

    test('loginUser should call POST /login and return token', async () => {
        const credentials = { email: 'a@a.com', password: 'test' };
        const fakeResponse = { data: 'fake-jwt-token' };
        api.post.mockResolvedValue(fakeResponse);

        const token = await loginUser(credentials.email, credentials.password);
        expect(api.post).toHaveBeenCalledWith('/login', credentials);
        expect(token).toBe('fake-jwt-token');
    });

    test('deleteUser should call DELETE /users/{id} with auth header', async () => {
        const user = { id: 42 };
        const token = 'fake-token';

        localStorage.setItem('token', token);
        api.delete.mockResolvedValue({});

        await deleteUser(user);
        expect(api.delete).toHaveBeenCalledWith(`/users/42`, {
            headers: { Authorization: `Bearer ${token}` }
        });
    });

    test('fetchUsers should throw on error', async () => {
        api.get.mockRejectedValue(new Error('fetch error'));

        await expect(fetchUsers()).rejects.toThrow('fetch error');
    });

    test('addUser should throw on error', async () => {
        const user = { name: 'John' };
        const mockError = new Error('add error');
        api.post.mockRejectedValue(mockError);

        await expect(addUser(user)).rejects.toThrow('add error');
    });

    test('loginUser should throw on error', async () => {
        const credentials = { email: 'a@a.com', password: 'wrong' };
        const mockError = new Error('login error');
        api.post.mockRejectedValue(mockError);

        await expect(loginUser(credentials.email, credentials.password)).rejects.toThrow('login error');
    });

    test('deleteUser should throw on error', async () => {
        const user = { id: 123 };
        api.delete.mockRejectedValue(new Error('delete error'));

        await expect(deleteUser(user)).rejects.toThrow('delete error');
    });
});
