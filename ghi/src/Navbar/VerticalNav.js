import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import PublicIcon from "@mui/icons-material/Public";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TuneIcon from "@mui/icons-material/Tune";
import GroupsIcon from "@mui/icons-material/Groups";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import DiscFullIcon from '@mui/icons-material/DiscFull';
import ListSubheader from "@mui/material/ListSubheader";

import { Link } from "react-router-dom";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/home">
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
    <ListItemButton component={Link} to="/search">
      <ListItemIcon>
        <SearchIcon />
      </ListItemIcon>
      <ListItemText primary="Search" />
    </ListItemButton>
    <ListItemButton component={Link} to="/">
      <ListItemIcon>
        <PublicIcon />
      </ListItemIcon>
      <ListItemText primary="Explore" />
    </ListItemButton>
    <ListItemButton component={Link} to="/posts">
      <ListItemIcon>
        <AddBoxIcon />
      </ListItemIcon>
      <ListItemText primary="Create" />
    </ListItemButton>
    <ListItemButton component={Link} to="/groups">
      <ListItemIcon>
        <GroupsIcon />
      </ListItemIcon>
      <ListItemText primary="Groups" />
    </ListItemButton>
    <ListItemButton component={Link} to="/groups/create">
      <ListItemIcon>
        <GroupsIcon />
      </ListItemIcon>
      <ListItemText primary="Create Group" />
    </ListItemButton>
    <ListItemButton component={Link} to="/spotifyplaylist">
      <ListItemIcon>
        <PlaylistAddIcon />
      </ListItemIcon>
      <ListItemText primary="Playlists" />
    </ListItemButton>
    <ListItemButton component={Link} to ="/player">
      <ListItemIcon>
        <DiscFullIcon />
      </ListItemIcon>
      <ListItemText primary="Player" />
    </ListItemButton>
    <ListItemButton component={Link} to ="/aesthetics">
      <ListItemIcon>
        <DiscFullIcon />
      </ListItemIcon>
      <ListItemText primary="Stable Diffusion" />
    </ListItemButton>
  </React.Fragment>

);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div">Accounts and Settings</ListSubheader>
    <ListItemButton component={Link} to="/settings">
      <ListItemIcon>
        <TuneIcon />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItemButton>
    <ListItemButton component={Link} to="/selfprofile">
      <ListItemIcon>
        <AccountCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Account" />
    </ListItemButton>
  </React.Fragment>
);
