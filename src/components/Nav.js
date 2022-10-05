import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Button, ButtonGroup, IconButton, Stack, Tooltip} from "@mui/material";
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';
import SubscriptionsRoundedIcon from '@mui/icons-material/SubscriptionsRounded';
import WhatshotRoundedIcon from '@mui/icons-material/WhatshotRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import {recommendationsRoute, searchRoute, trendingRoute, watchlistRoute} from "../routes/routes";
import {useCommon} from "../context/CommonContext";
import OverFlowMenu from "./OverFlowMenu";

const Nav = () => {
    const navigateTo = useNavigate()
    const location = useLocation()
    const common = useCommon()

    const clearVariants = [
        {route: searchRoute, variant: "text", color: "secondary"},
        {route: watchlistRoute, variant: "text", color: "secondary"},
        {route: trendingRoute, variant: "text", color: "secondary"}
    ]

    const [variants, setVariants] = useState(clearVariants)

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const setCurrentNav = route => {
        const newVariants = variants.map(v => {
            if (v.route === route) {
                v.variant = "contained"
                v.color = "primary"
            } else {
                v.variant = "text"
                v.color = "secondary"
            }

            return v
        })

        setVariants(newVariants)
    }

    useEffect(()=> {
        const {pathname} = location
        const {setAlert, recommendation} = common

        setAlert({isOpen: false, message: ""})

        switch (pathname){
            case "/" + recommendationsRoute:
                setAlert({isOpen: true, message: `Recommendations based on: ${recommendation}`})
                setVariants(clearVariants)
                window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                break
            case "/" + trendingRoute:
                setCurrentNav(trendingRoute)
                break
            case "/" + watchlistRoute:
                setCurrentNav(watchlistRoute)
                break
            case "/" + searchRoute:
                setCurrentNav(searchRoute)
                break
            default:
                setVariants(clearVariants)
        }

    }, [location])

    return (
        <Stack
            spacing={{xs: 1, sm: 2, md: 3}}
            sx={{marginBottom: "8px"}}
            direction="row" >
            <ButtonGroup>
                <Button
                    size="small"
                    variant={variants.find(v => v.route === searchRoute).variant}
                    color={variants.find(v => v.route === searchRoute).color}
                    startIcon={<ManageSearchRoundedIcon/>}
                    onClick={() => navigateTo(searchRoute)}>
                    Search
                </Button>
                <Button
                    size="small"
                    variant={variants.find(v => v.route === trendingRoute).variant}
                    color={variants.find(v => v.route === trendingRoute).color}
                    startIcon={<WhatshotRoundedIcon/>}
                    onClick={() => navigateTo(trendingRoute)}>
                    Trending
                </Button>
                <Button
                    size="small"
                    variant={variants.find(v => v.route === watchlistRoute).variant}
                    color={variants.find(v => v.route === watchlistRoute).color}
                    startIcon={<SubscriptionsRoundedIcon/>}
                    onClick={() => navigateTo(watchlistRoute)}>
                    Watchlist
                </Button>
            </ButtonGroup>
            <Tooltip disableFocusListener title="Menu" placement="top">
                <IconButton
                    id="menu-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    color="secondary"
                    size="small"
                    hidden={true} aria-label="menu">
                    <MoreVertRoundedIcon/>
                </IconButton>
            </Tooltip>
            <OverFlowMenu open={open} anchorEl={anchorEl} setAnchorEl={setAnchorEl}/>
        </Stack>
    )
}

export default Nav