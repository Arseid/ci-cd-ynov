import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegistrationForm from './RegistrationForm';
import axios from 'axios';
jest.mock('axios');

describe('RegistrationForm Component', () => {
    it('should display validation errors', async () => {
        render(<RegistrationForm />);
        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: '123' } });
        fireEvent.change(screen.getByLabelText(/surname/i), { target: { value: '123' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid-email' } });
        fireEvent.change(screen.getByLabelText(/birthdate/i), { target: { value: '2020-01-01' } });
        fireEvent.change(screen.getByLabelText(/city/i), { target: { value: '123' } });
        fireEvent.change(screen.getByLabelText(/postalCode/i), { target: { value: '123' } });
        fireEvent.click(screen.getByText(/sauvegarder/i));
        await waitFor(() => {
            expect(screen.getByText(/nom invalide/i)).toBeInTheDocument();
            expect(screen.getByText(/prénom invalide/i)).toBeInTheDocument();
            expect(screen.getByText(/email invalide/i)).toBeInTheDocument();
            expect(screen.getByText(/vous devez avoir au moins 18 ans/i)).toBeInTheDocument();
            expect(screen.getByText(/ville invalide/i)).toBeInTheDocument();
            expect(screen.getByText(/code postal invalide/i)).toBeInTheDocument();
        });
    });

    it('should submit the form successfully', async () => {
        axios.post.mockResolvedValueOnce({});
        render(<RegistrationForm />);
        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText(/surname/i), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(screen.getByLabelText(/birthdate/i), { target: { value: '2000-01-01' } });
        fireEvent.change(screen.getByLabelText(/city/i), { target: { value: 'Paris' } });
        fireEvent.change(screen.getByLabelText(/postalCode/i), { target: { value: '75000' } });
        fireEvent.click(screen.getByText(/sauvegarder/i));
        await waitFor(() => {
            expect(screen.getByText(/you have been registered/i)).toBeInTheDocument();
        });
    });
});