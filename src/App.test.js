import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders registration form and user list', () => {
  render(<App />);
  expect(screen.getByText(/Formulaire d'inscription/i)).toBeInTheDocument();
  expect(screen.getByText(/Liste des inscrits/i)).toBeInTheDocument();
});

test('adds user to localStorage', () => {
  render(<App />);

  const user = { name: 'John', surname: 'Doe', email: 'john.doe@example.com', birthdate: '2000-01-01', city: 'Paris', postalCode: '75000' };

  fireEvent.change(screen.getByLabelText(/^name$/i), { target: { value: user.name } });
  fireEvent.change(screen.getByLabelText(/^surname$/i), { target: { value: user.surname } });
  fireEvent.change(screen.getByLabelText(/^email$/i), { target: { value: user.email } });
  fireEvent.change(screen.getByLabelText(/^birthdate$/i), { target: { value: user.birthdate } });
  fireEvent.change(screen.getByLabelText(/^city$/i), { target: { value: user.city } });
  fireEvent.change(screen.getByLabelText(/^postalCode$/i), { target: { value: user.postalCode } });

  fireEvent.submit(screen.getByText(/Sauvegarder/i));

  const storedUsers = JSON.parse(localStorage.getItem('users'));
  expect(storedUsers).toContainEqual(user);
});

test('loads users from localStorage', () => {
  const users = [
      { name: 'Jane', surname: 'Doe', email: 'jane.doe@example.com', birthdate: '1995-05-05', city: 'Lyon', postalCode: '69000' }
  ];
  localStorage.setItem('users', JSON.stringify(users));

  render(<App />);

  expect(screen.getByText(/Jane Doe/i)).toBeInTheDocument();
});