import api from './postAxiosInstance';

test('should create an axios instance with correct baseURL', () => {
  expect(api.defaults.baseURL).toBe(process.env.REACT_APP_POSTS_SERVER_BASE_URL);
});