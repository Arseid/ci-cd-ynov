import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users`);
                setUsers(response.data.utilisateurs);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div>
            <h2>Liste des inscrits</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name} {user.surname} - {user.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;