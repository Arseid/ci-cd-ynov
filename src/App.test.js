import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import App from './App';
import * as api from './api/api';

jest.mock('./api/api');

describe('App Component', () => {
  const initialUsers = [
    {
      name: 'Jane',
      surname: 'Doe',
      email: 'jane.doe@example.com',
      birthdate: '1995-05-05',
      city: 'Lyon',
      postal_code: '69000'
    }
  ];

  beforeEach(() => {
    api.fetchUsers.mockResolvedValue(initialUsers);
    api.addUser.mockResolvedValue({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the registration form and user list', async () => {
    render(<App />);

    expect(screen.getByText(/Formulaire d'inscription/i)).toBeInTheDocument();
    expect(screen.getByText(/Users Manager/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Jane Doe/i)).toBeInTheDocument();
      expect(screen.getByText(/1 user\(s\) already registered/i)).toBeInTheDocument();
    });
  });

  it('should add a user and refreshes the user list from API', async () => {
    render(<App />);

    const newUser = {
      name: 'John',
      surname: 'Smith',
      email: 'john.smith@example.com',
      birthdate: '2000-01-01',
      city: 'Paris',
      postal_code: '75000'
    };

    fireEvent.change(screen.getByLabelText(/^name$/i), { target: { value: newUser.name } });
    fireEvent.change(screen.getByLabelText(/^surname$/i), { target: { value: newUser.surname } });
    fireEvent.change(screen.getByLabelText(/^email$/i), { target: { value: newUser.email } });
    fireEvent.change(screen.getByLabelText(/^birthdate$/i), { target: { value: newUser.birthdate } });
    fireEvent.change(screen.getByLabelText(/^city$/i), { target: { value: newUser.city } });
    fireEvent.change(screen.getByLabelText(/^postal_code$/i), { target: { value: newUser.postal_code } });

    const updatedUsers = [...initialUsers, newUser];
    api.fetchUsers.mockResolvedValueOnce(updatedUsers); // simulate refresh

    fireEvent.submit(screen.getByText(/Sauvegarder/i));

    await waitFor(() => {
      expect(api.addUser).toHaveBeenCalledWith(newUser);
      expect(api.fetchUsers).toHaveBeenCalledTimes(2);
      expect(screen.getByText(/John Smith/i)).toBeInTheDocument();
      expect(screen.getByText(/2 user\(s\) already registered/i)).toBeInTheDocument();
    });
  });

  it('should display an error when fetchUsers fails', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    api.fetchUsers.mockRejectedValueOnce(new Error('Erreur API'));
    render(<App />);

    await waitFor(() => {
      expect(api.fetchUsers).toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
          'Error loading users:',
          expect.any(Error)
      );
    });
  });
})