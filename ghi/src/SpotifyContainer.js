import React, { useState } from 'react';
import SpotifyPlayer from './SpotifyPlayer';
import SongSearch from './SongSearch';
import useUserDetails from './useUserDetails';
import { Box, Grid, Card, CardContent, Typography } from '@mui/material';


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
        <Box sx={{ display: 'flex', flexDirection: 'column'}}>
            <SpotifyPlayer token={token} trackUri={trackUri} />
            <SongSearch onSearchResult={handleSearchResult} />
            <Grid container spacing={2} justifyContent="center">
                {searchResults.map(track => (
                    <Grid item xs={12} sm={6} md={4} key={track.id}>
                        <Card onClick={() => handleSelectTrack(track.uri)} sx={{ cursor: 'pointer' }}>
                            <CardContent>
                                <img src={track.album.images[0].url} alt={track.name} style={{ width: '100%', height: 'auto' }} />
                                <Typography variant="h6">{track.name}</Typography>
                                <Typography variant="body2">{track.artists[0].name}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
};

export default SpotifyContainer;


    // return (
    //     <div>
    //         <SongSearch onSearchResult={handleSearchResult} />
    //         <div>
    //             {searchResults.map(track => (
    //                 <div key={track.id} onClick={() => handleSelectTrack(track.uri)}>
    //                     <img src={track.album.images[0].url} alt={track.name} style={{ height: '64px', width: '64px' }} />
    //                     {track.name} - {track.artists[0].name}
    //                 </div>
    //             ))}
    //         </div>
    //         <SpotifyPlayer token={token} trackUri={trackUri} />
    //     </div>
    // );
