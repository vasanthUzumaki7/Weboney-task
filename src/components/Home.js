import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = ({ authenticatedUser, logout, setAuthenticatedUser }) => {
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({ email: '', username: '', password: '' });

    useEffect(() => {
        if (editMode) {
            setFormData({
                email: authenticatedUser.email,
                username: authenticatedUser.username,
                password: '' // Leave password empty for security reasons
            });
        }
    }, [editMode, authenticatedUser]);

    const handleCancelClick = () => {
      // Revert formData to the original authenticatedUser data
      setFormData({
          email: authenticatedUser.email,
          username: authenticatedUser.username,
          password: ''
      });
      setEditMode(false);
  };

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // Assuming the backend expects the user ID to update the account
        const updateData = { ...formData, id: authenticatedUser._id };
        try {
            const response = await axios.put('http://localhost:5000/account/update', updateData);
            // Update the local storage and state with the new user data
            localStorage.setItem('authenticatedUser', JSON.stringify(response.data.account));
            setAuthenticatedUser(response.data.account);
            setEditMode(false);
        } catch (error) {
            console.error('Error during update:', error);
        }
    };

    return (
        <div className='dashboard'>
           {!editMode && (
                <>
                    <h1> Welcome to Dashboard {authenticatedUser.username}</h1>
                    
                    <div>
                    <button onClick={logout}>Logout</button>
                    <button onClick={handleEditClick}>Edit</button>
                   </div>
                </>
            )}

            {editMode && (
                <form className="form1" style={{ backgroundColor: "black" }} onSubmit={handleFormSubmit}>
                    <h1 style={{color:"white"}}>Update Account</h1>
                    <input
                        type="text"
                        className="form-input"
                        placeholder='Username'
                        name="username"
                        value={formData.username}
                        onChange={handleFormChange}
                        required
                    />
                    <input
                        type="email"
                        className="form-input"
                        placeholder='Email'
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder='Password'
                        className="form-input"
                        value={formData.password}
                        onChange={handleFormChange}
                    />
                    <button type="submit">Update</button>
                     <button type="button" onClick={handleCancelClick}>Cancel</button>
                </form>
            )}
        </div>
    );
};

export default Home;
