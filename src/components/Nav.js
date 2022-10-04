import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {
    Button,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Stack
} from "@mui/material";
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';
import SubscriptionsRoundedIcon from '@mui/icons-material/SubscriptionsRounded';
import WhatshotRoundedIcon from '@mui/icons-material/WhatshotRounded';
import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';
import Brightness7RoundedIcon from '@mui/icons-material/Brightness7Rounded';
import {recommendationsRoute, searchRoute, trendingRoute, watchlistRoute} from "../routes/routes";
import { themeList} from "../theme/palettes";
import {getRandom} from "../util";
import {useCommon} from "../context/CommonContext";

const Nav = ({ cookies, themeMode, setThemeMode }) => {
    const navigateTo = useNavigate()
    const location = useLocation()
    const common = useCommon()

    const savePalette = e => {
        cookies.set('theme', e.target.value, {path: '/'});
    }

    const setTheme = () => {
        const mode = themeMode === "light" ? "dark" : "light"
        setThemeMode(mode)
    }

    const getTheme = () => cookies.get("theme") !== null ? cookies.get("theme") : "candy"

    const clearVariants = [
        {route: searchRoute, variant: "text", color: "secondary"},
        {route: watchlistRoute, variant: "text", color: "secondary"},
        {route: trendingRoute, variant: "text", color: "secondary"}
    ]

    const [variants, setVariants] = useState(clearVariants)

    const setCurrentNav = route =>{
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
            direction={{xs: 'column', sm: 'row'}} >
            <Stack direction="row" sx={{marginBottom: "8px"}}>
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
            </Stack>
            <FormControl sx={{m: 1, minWidth: 120}}>
                <InputLabel id="select-label">Themes</InputLabel>
                {/*fixme default value should not be hardcoded*/}
                {/*todo add to overflow menu??*/}
                <Select
                    size="small"
                    labelId="select-theme"
                    id="theme"
                    label="Themes"
                    defaultValue={getTheme}
                    onChange={savePalette}
                >
                    {themeList.map(item =>
                        <MenuItem key={`${getRandom()}-${item.id}`} value={item.id}>{item.name}</MenuItem>)}
                </Select>
            </FormControl>
            <IconButton sx={{ ml: 1 }} onClick={setTheme} color="inherit">
                {themeMode === 'dark' ? <Brightness7RoundedIcon /> : <ModeNightRoundedIcon />}
            </IconButton>
        </Stack>
    )
}

export default Nav