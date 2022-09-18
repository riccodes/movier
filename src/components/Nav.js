import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Stack} from "@mui/material";
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';
import SubscriptionsRoundedIcon from '@mui/icons-material/SubscriptionsRounded';
import WhatshotRoundedIcon from '@mui/icons-material/WhatshotRounded';
import {searchRoute, trendingRoute, watchlistRoute} from "../routes/routes";

const Nav = () => {
    const navigateTo = useNavigate()

    const navVariants = [
        {route: searchRoute, variant: "contained"},
        {route: watchlistRoute, variant: "text"},
        {route: trendingRoute, variant: "text"}
    ]

    const [variants, setVariants] = useState(navVariants)

    const navigate = (route) => {

        const newVariants = variants.map(v => {
            if (v.route === route){
                v.variant = "contained"
            } else {
                v.variant = "text"
            }

            return v
        })

        setVariants(newVariants)
        navigateTo(route)
    }

    return (
        <Stack direction="row">
            <Button
                sx={{marginBottom: "8px"}}
                variant={variants.find(v => v.route === searchRoute).variant}
                startIcon={<ManageSearchRoundedIcon/>}
                onClick={() => navigate(searchRoute)}>
                Search
            </Button>
            <Button
                sx={{marginBottom: "8px"}}
                variant={variants.find(v => v.route === watchlistRoute).variant}
                startIcon={<SubscriptionsRoundedIcon/>}
                onClick={() => navigate(watchlistRoute)}>
                Watchlist
            </Button>
            <Button
                sx={{marginBottom: "8px"}}
                variant={variants.find(v => v.route === trendingRoute).variant}
                startIcon={<WhatshotRoundedIcon/>}
                onClick={() => navigate(trendingRoute)}>
                Trending
            </Button>
        </Stack>
    )
}

export default Nav