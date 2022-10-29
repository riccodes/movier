import React from "react";
import {Fab, Slide} from "@mui/material";
import UpIcon from "@mui/icons-material/KeyboardArrowUp";
import {toTop} from "../util/utils";
import {useTheme} from '@mui/material/styles';
import {useScroll} from "../context/ScrollContext";

const Scroller = () => {

    const theme = useTheme()
    const {isShowFab} = useScroll()

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    return isShowFab
        ? //Show
        <Slide
            direction="up"
            in={isShowFab}
            timeout={ transitionDuration }
            style={{ transitionDelay: `${isShowFab ? transitionDuration.exit : 0}ms` }}
            mountOnEnter unmountOnExit>
            <Fab
                size="small"
                onClick={toTop}
                sx={{position: 'fixed', bottom: 60, right: 10}}
                color="primary" aria-label="add">
                <UpIcon/>
            </Fab>
        </Slide>
        : //Hide
        <div/>
}

export default Scroller