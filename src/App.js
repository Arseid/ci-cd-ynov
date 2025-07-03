import React, {useEffect, useState} from 'react';
import RegistrationForm from './components/registrationForm/RegistrationForm';
import UserList from './components/userList/UserList';
import './App.css';
import {deleteUser, fetchUsers} from "./api/user/userApi";
import LoginForm from "./components/loginForm/LoginForm";
import {useAuth} from "./contexts/AuthContext";
import PostList from './components/postList/PostList';
import PostForm from './components/postForm/PostForm';
import { fetchPosts } from "./api/post/postApi";

function App() {
    const [users, setUsers] = useState([]);
    const [usersCount, setUsersCount] = useState(0);
    const [posts, setPosts] = useState([]);
    const [postsCount, setPostsCount] = useState(0);
    const {user, logout} = useAuth();

    const loadUsers = async () => {
        try {
            const utilisateurs = await fetchUsers();
            setUsers(utilisateurs);
            setUsersCount(utilisateurs.length);
        } catch (error) {
            console.error('Error loading users:', error);
        }
    };

    const loadPosts = async () => {
        try {
            const data = await fetchPosts();
            setPosts(data);
            setPostsCount(data.length);
        } catch (error) {
            console.error('Error loading posts:', error);
        }
    };

    useEffect(() => {
        loadUsers();
        loadPosts();
    }, []);

    const handleDeleteUser = async (userToDelete) => {
        try {
            await deleteUser(userToDelete);
            await loadUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="App">
            <div className="App-Section">
                <header className="App-Header">
                    <h1>Users Section</h1>
                    <p>{usersCount} user(s) already registered</p>
                </header>
                <div className="App-Body">
                    <div className="component">
                        {!user ? (
                            <LoginForm />
                        ) : (
                            <div>
                                <p>Logged in as <strong>{user.email}</strong></p>
                                <button onClick={logout}>Logout</button>
                            </div>
                        )}
                    </div>
                    <div className="component">
                        <RegistrationForm onSuccess={loadUsers} />
                    </div>
                    <div className="component">
                        <UserList users={users} onDelete={handleDeleteUser} />
                    </div>
                </div>
            </div>

            <div className="App-Section">
                <header className="App-Header">
                    <h1>Posts Section</h1>
                    <p>{postsCount} post(s) already registered</p>
                </header>
                <div className="App-Body">
                    <div className="component">
                        <PostForm onSuccess={loadPosts} />
                    </div>
                    <div className="component">
                        <PostList posts={posts} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
