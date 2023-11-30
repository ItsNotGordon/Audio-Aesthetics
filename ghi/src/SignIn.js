import React, { useState } from 'react';

const SignIn = () => {
  const apiUrl = 'http://localhost:8000'; // FastAPI backend URL
  const redirectUrl = '/account'; // Redirect URL after successful login

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignIn = async () => {
    try {
      const response = await fetch(`${apiUrl}/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Authentication successful, parse the response
        const data = await response.json();

        // Store the access token securely (e.g., in a cookie or local storage)
        document.cookie = `access_token=${data.access_token}; Path=/; Secure; HttpOnly; SameSite=Strict`;

        // Redirect to the account page or any other authorized route
        window.location.href = redirectUrl;
      } else {
        console.error('Authentication Failed');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="button" onClick={handleSignIn}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
