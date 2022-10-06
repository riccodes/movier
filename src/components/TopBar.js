import React, {useEffect, useState} from "react";
import {AppBar, Toolbar, Typography} from "@mui/material";
import {toTop} from "../util/utils";
import {recommendationsRoute, searchRoute, trendingRoute, watchlistRoute} from "../routes/routes";
import {useLocation} from "react-router-dom";

const TopBar = () => {

    const location = useLocation()
    const [subtitle, setSubtitle] = useState("")

    useEffect(()=> {
        const {pathname} = location
        toTop()

        switch (pathname){
            case "/" + recommendationsRoute:
                setSubtitle("Recommended")
                break
            case "/" + trendingRoute:
                setSubtitle("Trending")
                break
            case "/" + watchlistRoute:
                setSubtitle("Watchlist")
                break
            case "/" + searchRoute:
                setSubtitle("Search")
                break
            default:
                setSubtitle("")
        }

    }, [location])

    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <Typography variant="h6" color="inherit" component="div">
                    MovieR - {subtitle}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default TopBar