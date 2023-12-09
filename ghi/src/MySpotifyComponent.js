import React, { useEffect, useState } from 'react';
import SpotifyWebPlayer from 'react-spotify-web-playback';

const SpotifyPlayer = () => {
    const [token, setToken] = useState(null);
    const [deviceId, setDeviceId] = useState(null);
  useEffect(() => {
    // Fetch or set your Spotify access token
    // You might want to use a library like `react-redux` for managing state
    // or any other state management solution.
    // For simplicity, we're setting the token directly here.
    // Replace '[Your access token]' with your actual access token.
    // Note: Ensure the token is valid and has the required scopes.
    setToken("BQCM_Mb3E7HrsmTHxdY2ncxcA4zdpFopr1CIE8G5NmRG94f2NbZq7UrHXXhgdVU7C9Xz84cM7IwoBpeufWvdb1V40019E343csv52U3XNauz0TGy24WBsHkIJBhGUsEPyvCs1HVx9BzRtT5M9yvApEUR6JDAY9dFwhPoD7_JxAe8uOTThPxOLVtABO2YCndl79Z5YrAtlhN4rfrY3VRJ6V7cYgIjIsZd1NbRV07xkTR9TD_XifUn-umBaJN-enbG3jEmwtaPCAsCDJNW_40ThwnupGGe9hqrtLX32Uwk");
    setDeviceId("c98fce128c702509372775883f5d66f3ed79f996")
  }, []);

  const handleReady = ({ device_id }) => {
    console.log('Ready with Device ID', device_id);
  };

  const handleNotReady = ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
  };

  const handleInitializationError = ({ message }) => {
    console.error(message);
  };

  const handleAuthenticationError = ({ message }) => {
    console.error(message);
  };

  const handleAccountError = ({ message }) => {
    console.error(message);
  };

  return (
    <SpotifyWebPlayer
      token={token}
      name="Web Playback SDK React Player"
      volume={0.5}
      onReady={handleReady}
      onNotReady={handleNotReady}
      onInitializationError={handleInitializationError}
      onAuthenticationError={handleAuthenticationError}
      onAccountError={handleAccountError}
    />
  );
};

export default SpotifyPlayer;
