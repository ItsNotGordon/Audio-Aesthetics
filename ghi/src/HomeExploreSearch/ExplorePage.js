import React from 'react';

//actually useful react imports
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

//navbar buttons
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import {mainListItems, secondaryListItems} from '../Navbar/VerticalNav';

//page organizers
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

//card
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

//card icons
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';

//other js imports
import {handleLike, handleUnlike} from '../HelpingFunctions/likeFunction';
import { DialogActions } from '@mui/material';

const defaultTheme = createTheme({
  palette: {
    background: {
      default: '#f0f0f0', // Set your desired background color
    },
  },
  typography:{
    fontFamily: [
      'Helvetica',
    ].join(',')
  },
});

const styles = {
  popupImage: {
    maxWidth: '100%',
    height: 'auto',
    width: '100%',
  },
};

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

export default function ExplorePage() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      const userUrl = `${process.env.REACT_APP_API_HOST}/api/users/`
      const userResponse = await fetch(userUrl);
      if (userResponse.ok) {
        const data = await userResponse.json();
        setUsers(data);
      }
      const postsUrl = `${process.env.REACT_APP_API_HOST}/api/posts/`
      const postResponse = await fetch(postsUrl);
      if (postResponse.ok) {
        const data = await postResponse.json();
        setPosts(data);
      }
      const likedPostsUrl = `${process.env.REACT_APP_API_HOST}/api/post`;
      const likedPostsResponse = await fetch(likedPostsUrl, {
        credentials: 'include',
      });

      if (likedPostsResponse.ok) {
        const likedPostsData = await likedPostsResponse.json();
        //this will essentially take likedPostsData and only return the id of the posts that are liked
        const likedPostIds = likedPostsData.map((post) => post.id);
        setLikedPosts(likedPostIds);
      }
    };

    fetchData();
  }, []);

    const handleLikePost = async (postId) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/posts/${postId}/check_like`, {
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          if (!data) {
            handleLike(postId);
            setLikedPosts((prevLikedPosts) => [...prevLikedPosts, postId]);
          }
          else {
            handleUnlike(postId);
            setLikedPosts((prevLikedPosts) =>
              prevLikedPosts.filter((id) => id !== postId)
            );
          }
        }
        else {
          const errorData = await response.json();
          console.error('Failed to check if the post is liked:', errorData.message);
          }
      }
      catch (error) {
        console.error('Error while checking if the post is liked:', error);
      }
    };

  useEffect(() => {
    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
  }, [likedPosts]);

  const handleView = (post) => {
    setSelectedPost(post);
    if (!post.img_url) {
      post.img_url = `https://source.unsplash.com/random?music&${post.id}`;
    }
  };


  const postsItems = posts.sort((a, b) => new Date(b.created_datetime) - new Date(a.created_datetime)).map((post) => (
    <Grid item key={post.id} xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
        }}
        onClick={() => handleView(post)}
      >
        {users.find((user) => user.id === post.created_by) && (
          <Box sx={{ display: 'flex', alignItems: 'center', p: .2 }}>
              <Avatar
                src={users.find((user) => user.id === post.created_by).img_url}
                alt="Profile"
              />
            <Link to={`/profile/${users.find((user) => user.id === post.created_by).id}`}
              style={{ textDecoration: 'none', color: 'blue' }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 'bold',
                  ml: 1,
                }}
              >
                {users.find((user) => user.id === post.created_by).username}
              </Typography>
            </Link>
          </Box>
        )}
        <CardMedia
          component="div"
          sx={{
            pt: '100%',
            position: 'relative',
            overflow: 'hidden',
            '& img': {
              objectFit: 'cover',
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
            },
          }}
          image={post.img_url || `https://source.unsplash.com/random?music&${post.id}`}
        />
      </Card>
    </Grid>
  ));

  const postDetailsDialog = (
    <Dialog
      open={selectedPost !== null}
      onClose={() => setSelectedPost(null)}
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: '#47b4d2',
        },
      }}
    >
      <DialogContent
        sx={{
          backgroundColor: '#47b4d2',
          color: '#11111e',
        }}
      >
        <Grid item xs={12} sm={6}>
          <img
            src={selectedPost?.img_url}
            alt="Post"
            style={styles.popupImage}
          />
          <Typography gutterBottom variant="subtitle2" color="#11111e">
            {new Date(selectedPost?.created_datetime).toLocaleString('en-US', {
              timeZone: 'America/Los_Angeles',
            })}
          </Typography>
          <Typography color="#11111e">{selectedPost?.caption}</Typography>
        </Grid>
      </DialogContent>
      {selectedPost && (
        <DialogActions>
          <Button
            size="small"
            onClick={() => {
              handleLikePost(selectedPost["id"]);
            }}
          >
            {likedPosts.includes(selectedPost["id"]) ? (
              <FavoriteIcon style={{ color: '#fc00d2' }} />
            ) : (
              <FavoriteBorderIcon style={{ color: '#fc00d2' }} />
            )}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );



  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: '24px', // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h4"
                color="inherit"
                noWrap
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  alightItems: 'center',
                  justifyContent:'center',
                }}
              >
                Audio Aesthetics
              </Typography>
              <IconButton color="inherit" component={Link} to="/logout">
                  <LogoutIcon />
              </IconButton>
            </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '20px', // Adjust the height as needed
                    fontWeight: 'bold', // You can adjust the styling as needed
                  }}
                >
                  Audio Aesthetics
                </Typography>
              <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              {mainListItems}
              <Divider sx={{ my: 1 }} />
              {secondaryListItems}
            </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
        <Toolbar />
        <Container sx={{ py: 8, mt: 4}} maxWidth="md">
          <Grid container spacing={3}>
            {postsItems}
          </Grid>
        </Container>
        </Box>
        {postDetailsDialog}
      </Box>
    </ThemeProvider>

    );
}
