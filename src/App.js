import React, {useEffect, useState} from 'react';
import RegistrationForm from './components/registrationForm/RegistrationForm';
import UserList from './components/userList/UserList';
import './App.css';
import {fetchUsers} from "./api/api";

function App() {
    const [users, setUsers] = useState([]);
    const [usersCount, setUsersCount] = useState(0);

    const loadUsers = async () => {
        try {
            const utilisateurs = await fetchUsers();
            setUsers(utilisateurs);
            setUsersCount(utilisateurs.length);
        } catch (error) {
            console.error('Error loading users:', error);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <div className="App">
            <header className="App-Header">
                <h1>Users Manager</h1>
                <p>{usersCount} user(s) already registered</p>
            </header>
            <div className="App-Body">
                <div className="component">
                    <RegistrationForm onSuccess={loadUsers}/>
                </div>
                <div className="component">
                    <UserList users={users} />
                </div>
            </div>
        </div>
    );
}

export default App;
