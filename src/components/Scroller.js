import React, {useCallback, useEffect, useState} from "react";
import _ from "lodash";
import {Fab} from "@mui/material";
import UpIcon from "@mui/icons-material/KeyboardArrowUp";

const Scroller = () => {
    const toTop = () => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    }

    const [y, setY] = useState(window.scrollY);
    const [isShowFab, setIsShowFab] = useState(true)

    const handleScroll = useCallback(e => {
            const window = e.currentTarget;

            if (y > window.scrollY) {
                setIsShowFab(false)
            } else if (y < window.scrollY) {
                setIsShowFab(false)
            }

            setY(window.scrollY);
        }, [y]
    );

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.addEventListener("scroll", _.debounce(() => { setIsShowFab(true) }, 1000));
        };
    }, [y]);

    return isShowFab
            ?
            <Fab
                onClick={toTop}
                sx={{position: 'fixed', bottom: 60, right: 10}}
                color="primary" aria-label="add">
                <UpIcon/>
            </Fab>
            :
            <div/>
}

export default Scroller