import React, { useState, useEffect } from 'react';
import useToken from "@galvanize-inc/jwtdown-for-react";


export default function SpotifyProfile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [ loggedInUser, setLoggedInUser ] = useState(null);
    const { token } = useToken();

    useEffect(() => {
        console.log(token)
        const fetchUserData = async () => {
            const response = await fetch('http://localhost:8000/api/user/details', {
                credentials: "include",
            });
            if (response.ok) {
                const data = await response.json();
                console.log("Data:", data);
                setLoggedInUser(data.spotify_access_token);
                console.log(data.spotify_access_token)
            }
        };
        fetchUserData();
        console.log(loggedInUser)
        fetch('http://localhost:8000/spotify/user/profile', {
            headers: {
                'Authorization': `Bearer ${loggedInUser}`
            },
            credentials: 'include',
        })
        .then(response => {
            console.log(response)
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
            console.error('Error:', error);
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
