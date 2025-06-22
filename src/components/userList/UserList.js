import React from 'react';
import {useAuth} from "../../contexts/AuthContext";

const UserList = ({ users, onDelete }) => {
    const { user } = useAuth();

    return (
        <div>
            <h2>Liste des inscrits</h2>
            <ul>
                {users.map((u, index) => (
                    <li key={index}>
                        {u.name} {u.surname} - {u.email}
                        {user && (
                            <button
                                style={{ marginLeft: '10px' }}
                                onClick={() => onDelete(u)}
                            >
                                Supprimer
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;