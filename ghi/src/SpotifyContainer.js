import React, { useState } from 'react';
import SpotifyPlayer from './SpotifyPlayer';
import SongSearch from './SongSearch';
import useUserDetails from './useUserDetails';


const SpotifyContainer = () => {
    const [trackUri, setTrackUri] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const userDetails = useUserDetails();
    const token = userDetails?.spotify_access_token;


    const handleSearchResult = (tracks) => {
        setSearchResults(tracks)
    };

    const handleSelectTrack = (uri) => {
        setTrackUri(uri);
    };

    return (
        <div>
            <SongSearch onSearchResult={handleSearchResult} />
            <div>
                {searchResults.map(track => (
                    <div key={track.id} onClick={() => handleSelectTrack(track.uri)}>
                        <img src={track.album.images[0].url} alt={track.name} style={{ height: '64px', width: '64px' }} />
                        {track.name} - {track.artists[0].name}
                    </div>
                ))}
            </div>
            <SpotifyPlayer token={token} trackUri={trackUri} />
        </div>
    );
};

export default SpotifyContainer;
