import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Home from './components/Home';
import axios from 'axios';
import Navbar from './components/Navbar';

function App() {
    const [authenticatedUser, setAuthenticatedUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [userData, setUserData] = useState({ username: '', password: '' });
    const [formData, setFormData] = useState({ email: '', username: '', password: '' });
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleChange = (e, setData) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const userHandleChange = e => handleChange(e, setUserData);

    const userHandleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/account/login', userData);
            setAuthenticatedUser(response.data.account);
            setAuthenticated(true);
            localStorage.setItem('authenticatedUser', JSON.stringify(response.data.account));
            setMessage('Login successful!');
            setTimeout(() => {
                setMessage('');
            }, 5000);
            navigate('/home');
        } catch (error) {
            console.error('Error during login:', error);
            setMessage('Invalid username and password');
        }
        setUserData({ username: '', password: '' });
    };

    const formChange = e => handleChange(e, setFormData);

    const formSubmit = async e => {
        e.preventDefault();
        const { email, username, password } = formData;

        if (!username || !email || !password) {
            setMessage('Please fill in the form');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/account/newaccount', { email, username, password });
            setMessage('Registration successful!');
            setTimeout(() => {
                setMessage('');
            }, 5000);
            navigate('/');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setMessage(error.response.data.message);
            } else {
                setMessage('Registration failed. Please try again.');
            }
            console.error('Error during registration:', error);
        }

        setFormData({ email: '', username: '', password: '' });
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('authenticatedUser');
        if (storedUser) {
            setAuthenticatedUser(JSON.parse(storedUser));
            setAuthenticated(true);
        }
    }, []);

    const logout = () => {
        setAuthenticatedUser(null);
        setAuthenticated(false);
        localStorage.removeItem('authenticatedUser');
        setMessage('');
        navigate('/');
    };

    return (
        <>
            <Routes>
                <Route
                    path="/register"
                    element={<Register message={message} formData={formData} handleChange={formChange} handleSubmit={formSubmit} />}
                />
                <Route
                    path="/home"
                    element={
                        authenticated ? (
                            <Home authenticatedUser={authenticatedUser} setAuthenticatedUser={setAuthenticatedUser} logout={logout} formData={formData} handleChange={formChange} handleSubmit={formSubmit} />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
                <Route
                    path="/"
                    element={
                        authenticated ? (
                            <Navigate to="/home" />
                        ) : (
                            <Login userData={userData} handleChange={userHandleChange} handleSubmit={userHandleSubmit} message={message} />
                        )
                    }
                />
            </Routes>
            
        </>
    );
}

export default App;
