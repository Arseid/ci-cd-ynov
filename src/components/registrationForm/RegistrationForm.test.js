import { render, screen, fireEvent } from '@testing-library/react';
import RegistrationForm from './RegistrationForm';

test('renders registration form', () => {
    render(<RegistrationForm addUser={() => {}} />);
    expect(screen.getByText(/Formulaire d'inscription/i)).toBeInTheDocument();
});

test('validates form fields', () => {
    render(<RegistrationForm addUser={() => {}} />);
    fireEvent.change(screen.getByLabelText(/^name$/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/^surname$/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/^email$/i), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByLabelText(/^birthdate$/i), { target: { value: '2015-01-01' } });
    fireEvent.change(screen.getByLabelText(/^city$/i), { target: { value: 'Paris' } });
    fireEvent.change(screen.getByLabelText(/^postalCode$/i), { target: { value: '75000' } });
    fireEvent.submit(screen.getByText(/Sauvegarder/i));
    expect(screen.getByText(/Email invalide./i)).toBeInTheDocument();
    expect(screen.getByText(/Vous devez avoir au moins 18 ans./i)).toBeInTheDocument();
});

test('submits form when valid', () => {
    const addUser = jest.fn();
    render(<RegistrationForm addUser={addUser} />);
    fireEvent.change(screen.getByLabelText(/^name$/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/^surname$/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/^email$/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/^birthdate$/i), { target: { value: '2000-01-01' } });
    fireEvent.change(screen.getByLabelText(/^city$/i), { target: { value: 'Paris' } });
    fireEvent.change(screen.getByLabelText(/^postalCode$/i), { target: { value: '75000' } });
    fireEvent.submit(screen.getByText(/Sauvegarder/i));
    expect(addUser).toHaveBeenCalledWith({
        name: 'John',
        surname: 'Doe',
        email: 'john.doe@example.com',
        birthdate: '2000-01-01',
        city: 'Paris',
        postalCode: '75000'
    });
    expect(screen.getByText(/Registration successful!/i)).toBeInTheDocument();
});