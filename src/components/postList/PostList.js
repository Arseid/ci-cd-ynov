import React from 'react';

const PostList = ({ posts, className }) => {
    return (
        <div>
            <h2>Liste des Posts</h2>
            <ul className={className}>
                {posts.map((post) => (
                    <li key={post._id} style={{marginBottom: '1em', border: '1px solid #ccc', padding: '1em'}}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <div><strong>Auteur:</strong> {post.author}</div>
                        <div><strong>Date:</strong> {post.date ? new Date(post.date).toLocaleString() : 'N/A'}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;
