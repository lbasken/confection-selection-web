import React from "react";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import {MenuItem} from "@mui/material";
import "./MenuDrawer.css";

export default function MenuDrawer() {
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

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <MenuItem><Link to="/">Home</Link></MenuItem>
            </List>
            <Divider />
            <List>
                {/*<MenuItem><Link to="/contestants">Contestant List</Link></MenuItem>*/}
                {/*<MenuItem><Link to="/vote">Vote Here</Link></MenuItem>*/}
                <MenuItem><Link to="/user-contests">My Contests</Link></MenuItem>
                <MenuItem><Link to="/admin-contests">Admin - All Contests</Link></MenuItem>
            </List>
        </Box>
    );

    return (
        <div>
            {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button className="menu-icon" onClick={toggleDrawer(anchor, true)}><MenuIcon /></Button>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}