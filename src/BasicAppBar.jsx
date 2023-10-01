import React from "react";
import MenuDrawer from "./MenuDrawer.jsx";
import LoginLogoutButton from "./LoginLogoutButton.jsx";
import ScrollingNewsfeed from "./ScrollingNewsfeed.jsx";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function BasicAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar>
                <Toolbar>
                    <MenuDrawer />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <ScrollingNewsfeed />
                    </Typography>
                    <LoginLogoutButton />
                </Toolbar>
            </AppBar>
        </Box>
    );
}