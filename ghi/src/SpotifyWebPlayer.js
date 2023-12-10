import React, { useEffect, useState } from 'react';
// import useUserDetails from './useUserDetails';

const SpotifyWebPlayer = ({ token, uris }) => {
    // const userDetails = useUserDetails();
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        if (window.Spotify && token) {
            const spotifyPlayer = new window.Spotify.Player({
                name: 'Audio Aesthetics Player',
                getOAuthToken: cb => { cb(token); },
                volume: 0.5
            });

            spotifyPlayer.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID:', device_id);
            });

            spotifyPlayer.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline:', device_id);
            });

            spotifyPlayer.connect();

            // setPlayer(spotifyPlayer);
            if (uris.length > 0) {
                spotifyPlayer.addListener('ready', ({ device_id }) => {
                    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
                        method: 'PUT',
                        body: JSON.stringify({ uris: uris }),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });
                });
            }
        }
    }, [token, uris]);

    //pause play etc

    return null;
};

export default SpotifyWebPlayer;
