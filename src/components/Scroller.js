import React, {useCallback, useEffect, useState} from "react";
import _ from "lodash";
import {Fab, Slide} from "@mui/material";
import UpIcon from "@mui/icons-material/KeyboardArrowUp";
import {toTop} from "../util/utils";
import {useTheme} from '@mui/material/styles';

const Scroller = () => {

    const theme = useTheme()

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    const [y, setY] = useState(window.scrollY)
    const [isShowFab, setIsShowFab] = useState(true)

    const handleScroll = useCallback(e => {
            const window = e.currentTarget;

            if (y > window.scrollY) {
                setIsShowFab(false)
            } else if (y < window.scrollY) {
                setIsShowFab(false)
            }

            setY(window.scrollY)
        }, [y]
    )

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)

        return () => {
            window.addEventListener("scroll", _.debounce(() => { setIsShowFab(true) }, 600))
        }
    }, [y])

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