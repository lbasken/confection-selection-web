import "./BasicAppBar.css";
import MenuDrawer from "../MenuDrawer/MenuDrawer.jsx";
import LoginLogoutButton from "../LoginLogoutButton.jsx";
import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom";

export default function BasicAppBar() {

  return <div className="basic-app-bar">
    <AppBar>
      <Toolbar className="appbar">
        {/*<MenuDrawer />*/}
        <Typography className="typography" variant="h6" component="div" sx={{flexGrow: 1}}>
          <Link to="/">Confection-Selection</Link>
        </Typography>
        <LoginLogoutButton />
      </Toolbar>
    </AppBar>
  </div>;

}
