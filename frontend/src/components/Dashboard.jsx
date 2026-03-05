import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [profile, setProfile] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        phone: '',
        bio: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/profile', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProfile(response.data.profile);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching profile:', error);
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:5000/api/profile', profile, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setIsEditing(false);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error updating profile');
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete('http://localhost:5000/api/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                localStorage.removeItem('token');
                window.location.href = '/login';
            } catch (error) {
                console.error('Error deleting account:', error);
                alert('Error deleting account');
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="dashboard-container">
            <h2>Dashboard</h2>

            <div className="profile-section">
                <h3>Profile Information</h3>

                {!isEditing ? (
                    <div className="profile-display">
                        <p><strong>Username:</strong> {profile.username}</p>
                        <p><strong>Email:</strong> {profile.email}</p>
                        <p><strong>First Name:</strong> {profile.first_name || 'Not set'}</p>
                        <p><strong>Last Name:</strong> {profile.last_name || 'Not set'}</p>
                        <p><strong>Phone:</strong> {profile.phone || 'Not set'}</p>
                        <p><strong>Bio:</strong> {profile.bio || 'Not set'}</p>

                        <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                    </div>
                ) : (
                    <form onSubmit={handleUpdateProfile} className="profile-form">
                        <div>
                            <label>First Name:</label>
                            <input
                                type="text"
                                name="first_name"
                                value={profile.first_name}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label>Last Name:</label>
                            <input
                                type="text"
                                name="last_name"
                                value={profile.last_name}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label>Phone:</label>
                            <input
                                type="text"
                                name="phone"
                                value={profile.phone}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label>Bio:</label>
                            <textarea
                                name="bio"
                                value={profile.bio}
                                onChange={handleInputChange}
                                rows="4"
                            />
                        </div>

                        <button type="submit">Update Profile</button>
                        <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                    </form>
                )}
            </div>

            <div className="actions">
                <button onClick={handleLogout}>Logout</button>
                <button onClick={handleDeleteAccount} className="delete-btn">Delete Account</button>
            </div>
        </div>
    );
};

export default Dashboard;
