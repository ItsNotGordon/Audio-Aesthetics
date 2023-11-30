import React, { useState, useEffect } from 'react';
import useToken from "@galvanize-inc/jwtdown-for-react";


const SpotifyProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useToken();

    useEffect(() => {
        fetch('http://localhost:8000/spotify/user/profile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response error')
                }
                return response.json();
            })
            .then(data => {
                setProfile(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, [token]);

    if (loading) return <div>Loading ...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Spotify Profile</h2>
            {profile && (
                <div>
                    <p><strong>Name:</strong> {profile.display_name}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <img src={profile.images[0]?.url} alt={profile.display_name} />
                    <p><strong>Followers:</strong> {profile.followers.total}</p>
                </div>
            )}
        </div>
    );
};

export default SpotifyProfile;
