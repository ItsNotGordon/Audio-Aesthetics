import React, { useState } from 'react';
import SpotifyPlayer from './SpotifyPlayer';
import useUserDetails from './useUserDetails';
import SongSearch from './SongSearch';

const MySpotifyComponent = () => {
    const userDetails = useUserDetails();
    const [currentTrackUri, setCurrentTrackUri] = useState(null);
    const [searchResults, setSearchResults] = useState([]);

    const handleSongSelect = (track) => {
        setCurrentTrackUri(track.uri);
    };

    return (
        <div>
            <SongSearch onSearchResult={setSearchResults} />
            <div>
                {searchResults && searchResults.map(track => (
                    <div key={track.id} onClick={() => handleSongSelect(track)}>
                        <img src={track.album.images[0].url} alt={track.name} style={{ height: '64px', width: '64px'}} />
                        <div>{track.name} by {track.artists.map(artist => artist.name).join(', ')}</div>
                    </div>
                ))}
            </div>
            {userDetails && userDetails.spotify_access_token && (
                <SpotifyPlayer
                    token={userDetails.spotify_access_token}
                    play={!!currentTrackUri}
                    uris={currentTrackUri ? [currentTrackUri] : []}
                />
            )}
        </div>
    )
};

export default MySpotifyComponent;
