import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuDrawer from "../MenuDrawer/MenuDrawer.jsx";
import LoginLogoutButton from "../LoginLogoutButton.jsx";
import ScrollingNewsfeed from "../ScrollingNewsfeed.jsx";
import "./BasicAppBar.css";

export default function BasicAppBar() {

  return <div className="basic-app-bar">
    <AppBar>
      <Toolbar className="appbar">
        <MenuDrawer />
        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
          <ScrollingNewsfeed />
        </Typography>
        <LoginLogoutButton />
      </Toolbar>
    </AppBar>
  </div>;

}
