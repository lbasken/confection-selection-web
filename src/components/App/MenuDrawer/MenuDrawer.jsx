import React from "react";
import {Link} from "react-router-dom";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import {MenuItem} from "@mui/material";
import useAuth from "../../../hooks/useAuth.js";
import "./MenuDrawer.css";

export default function MenuDrawer() {

  const {user} = useAuth();

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({...state, [anchor]: open});
  };

  const list = (anchor) => (
    <Box
      sx={{width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250}}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <MenuItem><Link to="/">Home</Link></MenuItem>
      </List>
      <Divider />
      <List>
        <MenuItem><Link to="/user-contests">Contests</Link></MenuItem>
        <MenuItem><Link to="/contests">Contest Cards (Under Construction)</Link></MenuItem>
        {user?.role === "admin" && <MenuItem><Link to="/admin-contests">Manage Contests</Link></MenuItem>}
        {user?.role === "admin" && <MenuItem><Link to="/invite-user">Invite User</Link></MenuItem>}
      </List>
    </Box>
  );

  return <div className="menu-drawer">
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button className="menu-icon" onClick={toggleDrawer(anchor, true)}><MenuIcon /></Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>;
}
