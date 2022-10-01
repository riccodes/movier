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
        {route: searchRoute, variant: "contained", color: "primary"},
        {route: watchlistRoute, variant: "text", color: "secondary"},
        {route: trendingRoute, variant: "text", color: "secondary"}
    ]

    const [variants, setVariants] = useState(navVariants)

    const navigate = (route) => {

        const newVariants = variants.map(v => {
            if (v.route === route){
                v.variant = "contained"
                v.color = "primary"
            } else {
                v.variant = "text"
                v.color = "secondary"
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
                color={variants.find(v => v.route === searchRoute).color}
                startIcon={<ManageSearchRoundedIcon/>}
                onClick={() => navigate(searchRoute)}>
                Search
            </Button>
            <Button
                sx={{marginBottom: "8px"}}
                variant={variants.find(v => v.route === trendingRoute).variant}
                color={variants.find(v => v.route === trendingRoute).color}
                startIcon={<WhatshotRoundedIcon/>}
                onClick={() => navigate(trendingRoute)}>
                Trending
            </Button>
            <Button
                sx={{marginBottom: "8px"}}
                variant={variants.find(v => v.route === watchlistRoute).variant}
                color={variants.find(v => v.route === watchlistRoute).color}
                startIcon={<SubscriptionsRoundedIcon/>}
                onClick={() => navigate(watchlistRoute)}>
                Watchlist
            </Button>
        </Stack>
    )
}

export default Nav