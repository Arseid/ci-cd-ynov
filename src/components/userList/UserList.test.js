import { render, screen, waitFor } from '@testing-library/react';
import UserList from './UserList';
import axios from 'axios';
jest.mock('axios');

describe('UserList Component', () => {
    it('fetches and displays users', async () => {
        const data = {
            data: {
                utilisateurs: [
                    {
                        id: '1',
                        name: 'John',
                        surname: 'Doe',
                        email: 'john.doe@example.com'
                    },
                    {
                        id: '2',
                        name: 'Jane',
                        surname: 'Doe',
                        email: 'jane.doe@example.com'
                    }
                ],
            },
        };

        axios.get.mockImplementationOnce(() => Promise.resolve(data));
        render(<UserList />);

        await waitFor(() => {
            expect(screen.getByText(/john doe - john.doe@example.com/i)).toBeInTheDocument();
            expect(screen.getByText(/jane doe - jane.doe@example.com/i)).toBeInTheDocument();
        });
    });

    it('handles fetch error', async () => {
        axios.get.mockImplementationOnce(() => Promise.reject(new Error('Network Error')));
        render(<UserList />);

        await waitFor(() => {
            expect(screen.queryByText(/john doe/i)).not.toBeInTheDocument();
            expect(screen.queryByText(/jane doe/i)).not.toBeInTheDocument();
        });
    });
});