import React, { useEffect, useState } from 'react';

const Account = () => {
    const [userData, setUserData] = useState(null);

    const profileUrl = `http://localhost:8000/api/users/1`
    useEffect(() => {
        fetch(profileUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Bad Response')
                }
                return response.json()
            })
            .then((data) => {
                setUserData(data);
            })
            .catch((error) => {
                console.error('Error fetching user details', error);
            });
    }, []);

    if (!userData) {
        return <div>Loading...</div>;
    }
    const { id, username, first_name, last_name, email, img_url } = userData;

    return (
        <div>
            <h1>Account</h1>
            <img src={img_url} alt="User's Profile Picture" width="200" height="200" />
            <p>Username: {username}</p>
            <p>First Name: {first_name}</p>
            <p>Last Name: {last_name}</p>
            <p>Email: {email}</p>
        </div>
    );
};

export default Account;
