import { render, screen } from '@testing-library/react';
import UserList from './UserList';

test('renders user list', () => {
    const users = [
        { name: 'John', surname: 'Doe', email: 'john.doe@example.com' },
        { name: 'Jane', surname: 'Doe', email: 'jane.doe@example.com' }
    ];
    render(<UserList users={users} />);
    expect(screen.getByText(/John Doe - john.doe@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Jane Doe - jane.doe@example.com/i)).toBeInTheDocument();
});