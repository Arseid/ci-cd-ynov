import { render, screen } from '@testing-library/react';
import App from './App';

test('renders registration form and user list', () => {
  render(<App />);
  expect(screen.getByText(/Formulaire d'inscription/i)).toBeInTheDocument();
  expect(screen.getByText(/Liste des inscrits/i)).toBeInTheDocument();
});