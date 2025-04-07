import React, {useState} from 'react';
import RegistrationForm from './components/registrationForm/RegistrationForm';
import UserList from './components/userList/UserList';

function App() {
    const [users, setUsers] = useState([]);

    const addUser = (user) => {
        setUsers([...users, user]);
    };

    return (
        <div>
            <RegistrationForm addUser={addUser} />
            <UserList users={users} />
        </div>
    );
}

export default App;
