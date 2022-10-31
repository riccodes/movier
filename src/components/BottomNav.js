import React, {useEffect, useState} from "react";
import {BottomNavigation, BottomNavigationAction, Paper, Slide} from "@mui/material";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SubscriptionsRoundedIcon from '@mui/icons-material/SubscriptionsRounded';
import WhatshotRoundedIcon from '@mui/icons-material/WhatshotRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import {recommendationsRoute, searchRoute, trendingRoute, watchlistRoute} from "../routes/routes";
import {useLocation, useNavigate} from "react-router-dom";
import {useCommon} from "../context/CommonContext";
import OverFlowMenu from "./OverFlowMenu";
import {toTop} from "../util/utils";
import {useScroll} from "../context/ScrollContext";

const BottomNav = () => {
    const location = useLocation()
    const common = useCommon()
    const navigate = useNavigate()
    const {isShowNav} = useScroll()

    const [value, setValue] = useState()

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    useEffect(()=> {
        const {pathname} = location
        const {setAlert, recommendation} = common

        setAlert({isOpen: false, message: ""})
        toTop()

        switch (pathname){
            case "/" + recommendationsRoute:
                setValue(null)
                setAlert({isOpen: true, message: `Recommendations based on: ${recommendation}`})
                break
            case "/" + trendingRoute:
                setValue(1)
                break
            case "/" + watchlistRoute:
                setValue(2)
                break
            case "/" + searchRoute:
                setValue(0)
                break
            default:
                setValue(null)
        }

    }, [location])

    return isShowNav
        ?
        <Slide direction="up" in={isShowNav} mountOnEnter unmountOnExit>
            <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={value}
                >
                    <BottomNavigationAction
                        onClick={() => navigate(searchRoute)}
                        label="Search"
                        icon={<SearchRoundedIcon/>}/>
                    <BottomNavigationAction
                        onClick={()=> navigate(trendingRoute)}
                        label="Top"
                        icon={<WhatshotRoundedIcon/>}/>
                    <BottomNavigationAction
                        onClick={() => navigate(watchlistRoute)}
                        label="watchlist"
                        icon={<SubscriptionsRoundedIcon/>}/>
                    <BottomNavigationAction
                        onClick={handleMenuClick}
                        icon={<MoreVertRoundedIcon/>}/>
                </BottomNavigation>
                <OverFlowMenu open={open} anchorEl={anchorEl} setAnchorEl={setAnchorEl}/>
            </Paper>
        </Slide>
        :
        <div/>
}

export default BottomNav