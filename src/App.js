import React, {useEffect, useState} from 'react';
import RegistrationForm from './components/registrationForm/RegistrationForm';
import UserList from './components/userList/UserList';
import './App.css';

function App() {
    const [users, setUsers] = useState([]);

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
            <div className="component">
                <RegistrationForm addUser={addUser} />
            </div>
            <div className="component">
                <UserList users={users} />
            </div>
        </div>
    );
}

export default App;
