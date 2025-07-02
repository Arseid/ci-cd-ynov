import React from 'react';
import { render, screen } from '@testing-library/react';
import PostList from './PostList';

describe('PostList', () => {
  const mockPosts = [
    {
      _id: '1',
      title: 'Premier post',
      content: 'Contenu du premier post',
      author: 'Alice',
      date: '2024-06-01T12:00:00Z',
    },
    {
      _id: '2',
      title: 'Deuxième post',
      content: 'Contenu du deuxième post',
      author: 'Bob',
      date: '2024-06-02T15:30:00Z',
    },
  ];

  it('affiche la liste des posts', () => {
    render(<PostList posts={mockPosts} />);
    expect(screen.getByText('Liste des Posts')).toBeInTheDocument();
    expect(screen.getByText('Premier post')).toBeInTheDocument();
    expect(screen.getByText('Contenu du premier post')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Deuxième post')).toBeInTheDocument();
    expect(screen.getByText('Contenu du deuxième post')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('affiche "N/A" si la date est absente', () => {
    const postsSansDate = [{ ...mockPosts[0], date: undefined }];
    render(<PostList posts={postsSansDate} />);
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('affiche une liste vide sans erreur', () => {
    render(<PostList posts={[]} />);
    expect(screen.getByText('Liste des Posts')).toBeInTheDocument();
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });
}); 