import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useToken from "@galvanize-inc/jwtdown-for-react";

const UserProfile = ({ userId }) => {
    const [userProfile, setUserProfile] = useState(null);
    const [error, setError] = useState(null);
    const { token } = useToken();
    const navigate = useNavigate();

    const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=4d6c7eae97cd480fb1088393ebd8f107&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

    useEffect(() => {
        if (token) {
            fetch(`http://localhost:8000/api/users/${userId}`, {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(data => setUserProfile(data))
            .catch(error => setError(error.message));
        } else {
            navigate('/signin');
        }
    }, [userId, token, navigate]);

    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            {userProfile ? (
                <div>
                    <h2>{userProfile.username}'s Profile</h2>
                    <p>Name: {userProfile.first_name} {userProfile.last_name}</p>
                    <p>Email: {userProfile.email}</p>
                    {userProfile.img_url && <img src={userProfile.img_url} alt="Profile" />}
                    <a className="btn btn-success" href={AUTH_URL}>
                        Link profile with Spotify
                    </a>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default UserProfile;
