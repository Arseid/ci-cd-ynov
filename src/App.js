import React, {useEffect, useState} from 'react';
import RegistrationForm from './components/registrationForm/RegistrationForm';
import UserList from './components/userList/UserList';

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
        <div>
            <RegistrationForm addUser={addUser} />
            <UserList users={users} />
        </div>
    );
}

export default App;
