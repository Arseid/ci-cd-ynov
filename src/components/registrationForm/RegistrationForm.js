import React, { useState } from 'react';
import { validateForm } from '../../validation';
import Toastr from '../toastr/Toastr';
import axios from 'axios';

const RegistrationForm = () => {
    const [form, setForm] = useState({
        name: '',
        surname: '',
        email: '',
        birthdate: '',
        city: '',
        postalCode: ''
    });
    const [errors, setErrors] = useState({});
    const [successful, setSuccessful] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm(form);
        if (Object.keys(validationErrors).length === 0) {
            try {
                await axios.post(`${process.env.REACT_APP_SERVER_URL}/users`, form);
                setSuccessful(true);
                setForm({ name: '', surname: '', email: '', birthdate: '', city: '', postalCode: '' });
            } catch (error) {
                console.error(error);
            }
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div>
            {successful && <Toastr setSuccessful={setSuccessful} />}
            <form onSubmit={handleSubmit}>
                {['name', 'surname', 'email', 'birthdate', 'city', 'postalCode'].map((field) => (
                    <div key={field}>
                        <label>{field}</label>
                        <input
                            type={field === 'birthdate' ? 'date' : 'text'}
                            name={field}
                            value={form[field]}
                            onChange={handleChange}
                        />
                        {errors[field] && <span>{errors[field]}</span>}
                    </div>
                ))}
                <button type="submit" disabled={Object.keys(validateForm(form)).length > 0}>Sauvegarder</button>
            </form>
        </div>
    );
};

export default RegistrationForm;