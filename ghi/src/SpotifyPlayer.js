import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

const MySpotifyPlayer = ({ accessToken, trackUri }) => {
    return (
        accessToken ? (
            <SpotifyPlayer
                token={accessToken}
                uris={trackUri ? [trackUri] : []}
            />
        ) : null
    );
};

export default MySpotifyPlayer;


// export default function Player({ accessToken, trackUri}) {
//     const [play, setPlay] = useState(false);

//     useEffect(() => {
//         setPlay(!!trackUri);

//     }, [trackUri]);

//     if(!accessToken) return null;

//     return (
//         <SpotifyPlayer
//             token={accessToken}
//             callback={state => {
//                 if (!state.isPlaying) setPlay(false);
//             }}
//             play={play}
//             uris={trackUri ? [trackUri] : []}
//         />
//     );
// }
