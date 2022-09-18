import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Stack} from "@mui/material";
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';
import SubscriptionsRoundedIcon from '@mui/icons-material/SubscriptionsRounded';
import WhatshotRoundedIcon from '@mui/icons-material/WhatshotRounded';

const Nav = () => {
    const navigateTo = useNavigate()

    useEffect(()=> {

    })

    const navVariants = {
        "/search" : "text",
        "/watchlist" : "text",
        "/trending" : "text",
    }

    const [variants, setVariants] = useState(navVariants)

    const navigate = (route) => {

        Object.keys(variants).forEach(variant => {
            if(variant === route){
                variants[route] = "outlined"
            } else {
                variants[route] = "outlined"
            }
        })
        console.log(variants)
        setVariants(variants)
        navigateTo(route)
    }

    return (
        <Stack direction="row">
            <Button
                sx={{marginBottom: "4px"}}
                variant={variants["/search"]}
                startIcon={<ManageSearchRoundedIcon/>}
                onClick={() => navigate("/search")}>
                Search
            </Button>
            <Button
                sx={{marginBottom: "4px"}}
                variant={variants["/watchlist"]}
                startIcon={<SubscriptionsRoundedIcon/>}
                onClick={() => navigate("/watchlist")}>
                Watchlist
            </Button>
            <Button
                sx={{marginBottom: "4px"}}
                variant={variants["/trending"]}
                startIcon={<WhatshotRoundedIcon/>}
                onClick={() => navigate("/trending")}>
                Trending
            </Button>
        </Stack>
    )
}

export default Nav