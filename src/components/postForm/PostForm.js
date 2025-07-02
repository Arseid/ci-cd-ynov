import React, { useState } from 'react';
import { addPost } from '../../api/post/postApi';
import Toastr from '../toastr/Toastr';

const fields = [
    { name: 'title', label: 'Titre', type: 'text' },
    { name: 'content', label: 'Contenu', type: 'textarea' },
    { name: 'author', label: 'Auteur', type: 'text' }
];

const PostForm = ({ onSuccess }) => {
    const [form, setForm] = useState({
        title: '',
        content: '',
        author: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        setLoading(true);
        try {
            await addPost(form);
            setForm({ title: '', content: '', author: '' });
            setSuccess(true);
            if (onSuccess) onSuccess();
        } catch (err) {
            setError("Erreur lors de la création du post.");
        } finally {
            setLoading(false);
        }
    };

    const allFieldsFilled = Object.values(form).every((v) => v.trim() !== '');

    return (
        <div data-testid="post-form">
            <h2>Créer un Post</h2>
            {success && <Toastr message="Post creation successful!" />}
            {error && <Toastr type="error" message={error} />}
            <form onSubmit={handleSubmit}>
                {fields.map(field => (
                    <div key={field.name}>
                        <label htmlFor={field.name}>{field.label}</label><br />
                        {field.type === 'textarea' ? (
                            <textarea
                                id={field.name}
                                name={field.name}
                                value={form[field.name]}
                                onChange={handleChange}
                                required
                            />
                        ) : (
                            <input
                                type={field.type}
                                id={field.name}
                                name={field.name}
                                value={form[field.name]}
                                onChange={handleChange}
                                required
                            />
                        )}
                    </div>
                ))}
                <button type="submit" disabled={loading || !allFieldsFilled}>Créer</button>
            </form>
        </div>
    );
};

export default PostForm;
