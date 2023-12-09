import React, { useState } from 'react';
// import { TextField, Button, Box, Card, CardContent, Typography } from '@mui/material';



const SongSearch = ({ onSearchResult }) => {
    const [query, setQuery] = useState('');

    const handleSearch = async () => {
        try{
            const response = await fetch(`${process.env.REACT_APP_API_HOST}/spotify/search?query=${encodeURIComponent(query)}&type=track`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            onSearchResult(data.tracks.items); // Pass results to parent component
        } catch (error) {
            console.error('Error fetching search results:', error)
        }
    };

    return (
        <div>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
            <button onClick={handleSearch}></button>
        </div>
    );
};

//     return (
//         <Box>
//             <Card variant="outlined" sx={{ p: 2 }}>
//                 <CardContent>
//                     <Typography variant="h5" gutterBottom>
//                         Search Spotify
//                     </Typography>
//                     <Box sx={{ display: 'flex', gap: 2 }}>
//                         <TextField
//                             label="Search"
//                             variant="outlined"
//                             fullWidth
//                             value={query}
//                             onChange={(e) => setQuery(e.target.value)}
//                         />
//                         <Button>
//                             Search
//                         </Button>
//                     </Box>
//                 </CardContent>
//             </Card>
//         </Box>
//     );
// };

export default SongSearch;
