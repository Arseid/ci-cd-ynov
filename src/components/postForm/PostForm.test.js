import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PostForm from './PostForm';
import * as postApi from '../../api/post/postApi';

jest.mock('../../api/post/postApi');

describe('PostForm', () => {
  const fillAndSubmit = async () => {
    fireEvent.change(screen.getByLabelText(/Titre/i), { target: { value: 'Mon titre' } });
    fireEvent.change(screen.getByLabelText(/Contenu/i), { target: { value: 'Mon contenu' } });
    fireEvent.change(screen.getByLabelText(/Auteur/i), { target: { value: 'Alice' } });
    fireEvent.click(screen.getByRole('button', { name: /Créer/i }));
  };

  it('affiche le formulaire', () => {
    render(<PostForm />);
    expect(screen.getByTestId('post-form')).toBeInTheDocument();
    expect(screen.getByLabelText(/Titre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contenu/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Auteur/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Créer/i })).toBeDisabled();
  });

  it('active le bouton quand tous les champs sont remplis', () => {
    render(<PostForm />);
    fireEvent.change(screen.getByLabelText(/Titre/i), { target: { value: 'Titre' } });
    fireEvent.change(screen.getByLabelText(/Contenu/i), { target: { value: 'Contenu' } });
    fireEvent.change(screen.getByLabelText(/Auteur/i), { target: { value: 'Auteur' } });
    expect(screen.getByRole('button', { name: /Créer/i })).not.toBeDisabled();
  });

  it('appelle addPost et affiche le toastr de succès', async () => {
    postApi.addPost.mockResolvedValueOnce({});
    render(<PostForm />);
    await fillAndSubmit();
    await waitFor(() => {
      expect(postApi.addPost).toHaveBeenCalledWith({ title: 'Mon titre', content: 'Mon contenu', author: 'Alice' });
      expect(screen.getByText(/Post creation successful!/i)).toBeInTheDocument();
    });
  });

  it('affiche le toastr d\'erreur si addPost échoue', async () => {
    postApi.addPost.mockRejectedValueOnce(new Error('Erreur'));
    render(<PostForm />);
    await fillAndSubmit();
    await waitFor(() => {
      expect(screen.getByText(/Erreur lors de la création du post/i)).toBeInTheDocument();
    });
  });

  it('appelle onSuccess après succès', async () => {
    postApi.addPost.mockResolvedValueOnce({});
    const onSuccess = jest.fn();
    render(<PostForm onSuccess={onSuccess} />);
    await fillAndSubmit();
    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled();
    });
  });
}); 