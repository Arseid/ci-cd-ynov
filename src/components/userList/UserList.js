import React from 'react';

const UserList = ({ users }) => {
    return (
        <div>
            <h2>Liste des inscrits</h2>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>{user.name} {user.surname} - {user.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;