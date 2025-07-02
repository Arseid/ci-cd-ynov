import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import App from './App';
import * as userApi from './api/user/userApi';
import * as postApi from './api/post/postApi';
import {useAuth} from "./contexts/AuthContext";

jest.mock('./api/user/userApi');
jest.mock('./api/post/postApi');

jest.mock('./contexts/AuthContext', () => ({
  useAuth: jest.fn()
}));

const mockUseAuth = (userEmail = null) => {
  useAuth.mockReturnValue({
    user: userEmail ? { email: userEmail } : null,
    logout: jest.fn()
  });
};

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
const initialPosts = [
  {
    _id: '1',
    title: 'Titre post',
    content: 'Contenu post',
    author: 'Alice',
    date: '2024-06-01T12:00:00Z',
  }
];

beforeEach(() => {
  userApi.fetchUsers.mockResolvedValue(initialUsers);
  userApi.addUser.mockResolvedValue({});
  userApi.deleteUser.mockResolvedValue({});
  postApi.fetchPosts.mockResolvedValue(initialPosts);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('App Component', () => {
  it('affiche LoginForm si utilisateur non connecté', () => {
    mockUseAuth();
    render(<App />);
    expect(screen.getByText(/Formulaire de Login/i)).toBeInTheDocument();
    expect(screen.queryByText(/Logged in as/i)).not.toBeInTheDocument();
  });

  it("affiche l'état connecté", async () => {
    mockUseAuth('admin@test.com');
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText((content, element) =>
        element?.textContent === 'Logged in as admin@test.com')
      ).toBeInTheDocument();
    });
  });

  it('affiche la section users et posts avec données initiales', async () => {
    mockUseAuth('admin@test.com');
    render(<App />);
    expect(screen.getByText(/Users Section/i)).toBeInTheDocument();
    expect(screen.getByText(/Posts Section/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/Jane Doe/i)).toBeInTheDocument();
      expect(screen.getByText(/1 user\(s\) already registered/i)).toBeInTheDocument();
      expect(screen.getByText(/1 post\(s\) already registered/i)).toBeInTheDocument();
      expect(screen.getByText('Titre post')).toBeInTheDocument();
      expect(screen.getByText('Contenu post')).toBeInTheDocument();
      expect(screen.getByText('Alice')).toBeInTheDocument();
    });
  });

  it('rafraîchit la liste des users après ajout', async () => {
    mockUseAuth('admin@test.com');
    render(<App />);
    const newUser = {
      name: 'John',
      surname: 'Smith',
      email: 'john.smith@example.com',
      birthdate: '2000-01-01',
      city: 'Paris',
      postal_code: '75000'
    };
    userApi.fetchUsers.mockResolvedValueOnce([...initialUsers, newUser]);
    fireEvent.change(screen.getByLabelText(/^name$/i), { target: { value: newUser.name } });
    fireEvent.change(screen.getByLabelText(/^surname$/i), { target: { value: newUser.surname } });
    fireEvent.change(screen.getByLabelText(/^email$/i), { target: { value: newUser.email } });
    fireEvent.change(screen.getByLabelText(/^birthdate$/i), { target: { value: newUser.birthdate } });
    fireEvent.change(screen.getByLabelText(/^city$/i), { target: { value: newUser.city } });
    fireEvent.change(screen.getByLabelText(/^postal_code$/i), { target: { value: newUser.postal_code } });
    fireEvent.submit(screen.getByText(/Sauvegarder/i));
    await waitFor(() => {
      expect(userApi.addUser).toHaveBeenCalledWith(newUser);
      expect(userApi.fetchUsers).toHaveBeenCalledTimes(2);
      expect(screen.getByText(/John Smith/i)).toBeInTheDocument();
      expect(screen.getByText(/2 user\(s\) already registered/i)).toBeInTheDocument();
    });
  });

  it('rafraîchit la liste des users après suppression', async () => {
    mockUseAuth('admin@test.com');
    userApi.fetchUsers.mockResolvedValueOnce(initialUsers);
    userApi.fetchUsers.mockResolvedValueOnce([]);
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/Jane Doe/)).toBeInTheDocument();
    });
    const deleteButton = screen.getByText(/Supprimer/);
    fireEvent.click(deleteButton);
    await waitFor(() => {
      expect(userApi.deleteUser).toHaveBeenCalledWith(initialUsers[0]);
      expect(userApi.fetchUsers).toHaveBeenCalledTimes(2);
      expect(screen.queryByText(/Jane Doe/)).not.toBeInTheDocument();
      expect(screen.getByText(/0 user\(s\) already registered/)).toBeInTheDocument();
    });
  });

  it('affiche une erreur si fetchUsers échoue', async () => {
    mockUseAuth('admin@test.com');
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    userApi.fetchUsers.mockRejectedValueOnce(new Error('Erreur API'));
    render(<App />);
    await waitFor(() => {
      expect(userApi.fetchUsers).toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error loading users:',
        expect.any(Error)
      );
    });
    consoleErrorSpy.mockRestore();
  });

  it('affiche une erreur si fetchPosts échoue (ligne 36 couverte)', async () => {
    mockUseAuth('admin@test.com');
    postApi.fetchPosts.mockRejectedValueOnce(new Error('Erreur API'));
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<App />);
    await waitFor(() => {
      expect(postApi.fetchPosts).toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error loading posts:',
        expect.any(Error)
      );
    });
    consoleErrorSpy.mockRestore();
  });

  it("affiche une erreur si deleteUser échoue", async () => {
    mockUseAuth('admin@test.com');
    userApi.fetchUsers.mockResolvedValueOnce(initialUsers);
    userApi.deleteUser.mockRejectedValueOnce(new Error('Suppression échouée'));
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/Jane Doe/)).toBeInTheDocument();
    });
    const deleteButton = screen.getByText(/Supprimer/);
    fireEvent.click(deleteButton);
    await waitFor(() => {
      expect(userApi.deleteUser).toHaveBeenCalledWith(initialUsers[0]);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error deleting user:',
        expect.any(Error)
      );
    });
    consoleErrorSpy.mockRestore();
  });
});