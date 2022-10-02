import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack
} from "@mui/material";
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';
import SubscriptionsRoundedIcon from '@mui/icons-material/SubscriptionsRounded';
import WhatshotRoundedIcon from '@mui/icons-material/WhatshotRounded';
import {searchRoute, trendingRoute, watchlistRoute} from "../routes/routes";
import {getPalette, themeList} from "../theme/palettes";
import {getRandom} from "../util";

const Nav = ({ setPalette }) => {
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
        <Stack
            spacing={{xs: 1, sm: 2, md: 3}}
            sx={{marginBottom: "8px"}}
            direction={{xs: 'column', sm: 'row'}} >
            <Stack direction="row" sx={{marginBottom: "8px"}}>
                <Button
                    variant={variants.find(v => v.route === searchRoute).variant}
                    color={variants.find(v => v.route === searchRoute).color}
                    startIcon={<ManageSearchRoundedIcon/>}
                    onClick={() => navigate(searchRoute)}>
                    Search
                </Button>
                <Button
                    variant={variants.find(v => v.route === trendingRoute).variant}
                    color={variants.find(v => v.route === trendingRoute).color}
                    startIcon={<WhatshotRoundedIcon/>}
                    onClick={() => navigate(trendingRoute)}>
                    Trending
                </Button>
                <Button
                    variant={variants.find(v => v.route === watchlistRoute).variant}
                    color={variants.find(v => v.route === watchlistRoute).color}
                    startIcon={<SubscriptionsRoundedIcon/>}
                    onClick={() => navigate(watchlistRoute)}>
                    Watchlist
                </Button>
            </Stack>
            <FormControl sx={{m: 1, minWidth: 120}}>
                <InputLabel id="select-label">Themes</InputLabel>
                <Select
                    size="small"
                    labelId="select-theme"
                    id="theme"
                    label="Themes"
                    onChange={(e) => setPalette(getPalette(e.target.value))}
                >
                    {themeList.map(item =>
                        <MenuItem key={`${getRandom()}-${item.id}`} value={item.id}>{item.name}</MenuItem>)}
                </Select>
            </FormControl>
        </Stack>
    )
}

export default Nav