import React from "react";
import {AppBar, Toolbar, Typography} from "@mui/material";

const TopBar = () => {

    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <Typography variant="h6" color="inherit" component="div">
                    MovieR
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default TopBar