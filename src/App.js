import React, {useEffect, useState} from 'react';
import RegistrationForm from './components/registrationForm/RegistrationForm';
import UserList from './components/userList/UserList';
import './App.css';
import axios from 'axios';

function App() {
    const [users, setUsers] = useState([]);
    const port = process.env.REACT_APP_SERVER_PORT || 8000;
    const [usersCount, setUsersCount] = useState(0);

    useEffect(() => {
        const countUsers = async () => {
            try {
                const api = axios.create({
                   baseURL: `http://localhost:${port}`,
                });
                const response = await api.get('/users');
                setUsersCount(response.data.utilisateurs.length);
            } catch (error) {
                console.error('Error fetching users count:', error);
            }
        }
        countUsers();
    }, [port]);

    const addUser = (user) => {
        const updatedUsers = [...users, user];
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
    };

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        setUsers(storedUsers);
    }, []);

    return (
        <div className="App">
            <header className="App-Header">
                <h1>Users Manager</h1>
                <p>{usersCount} user(s) already registered</p>
            </header>
            <div className="App-Body">
                <div className="component">
                    <RegistrationForm addUser={addUser} />
                </div>
                <div className="component">
                    <UserList users={users} />
                </div>
            </div>
        </div>
    );
}

export default App;
