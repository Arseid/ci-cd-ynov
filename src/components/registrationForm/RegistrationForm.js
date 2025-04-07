import React, { useState, useEffect } from 'react';
import { validateForm } from '../../utils/validation';
import Toastr from '../toastr/Toastr';

const RegistrationForm = ({ addUser }) => {
    const [form, setForm] = useState({
        name: '',
        surname: '',
        email: '',
        birthdate: '',
        city: '',
        postalCode: ''
    });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [successful, setSuccessful] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const validationErrors = validateForm(form);
        setErrors(validationErrors);
        setIsFormValid(Object.keys(validationErrors).length === 0);
    }, [form]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        setTouched({ ...touched, [name]: true });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid) {
            addUser(form);
            setSuccessful(true);
            setForm({ name: '', surname: '', email: '', birthdate: '', city: '', postalCode: '' });
            setTouched({});
        }
    };

    return (
        <div>
            <h2>Formulaire d'inscription</h2>
            {successful && <Toastr message="Registration successful!"/>}
            <form onSubmit={handleSubmit}>
                {['name', 'surname', 'email', 'birthdate', 'city', 'postalCode'].map((field) => (
                    <div key={field}>
                        <label htmlFor={field}>{field}</label>
                        <input
                            id={field}
                            type={field === 'birthdate' ? 'date' : 'text'}
                            name={field}
                            value={form[field]}
                            onChange={handleChange}
                        />
                        {touched[field] && errors[field] && <span>{errors[field]}</span>}
                    </div>
                ))}
                <button type="submit" disabled={!isFormValid}>Sauvegarder</button>
            </form>
        </div>
    );
};

export default RegistrationForm;
