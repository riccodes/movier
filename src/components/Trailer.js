import React from "react";
import {Button, Dialog, DialogActions} from "@mui/material";
import {SET_DISPLAY, useCommon} from "../context/CommonContext";

const Trailer = () => {

    const common = useCommon()
    const {trailerState} = common
    const {isOpen, trailer, setTrailerData} = trailerState

    return(
        <Dialog
            fullWidth
            maxWidth="lg"
            onClose={()=> setTrailerData(SET_DISPLAY, false)}
            open={isOpen}>
                <iframe
                    height="600"
                    src={`https://www.youtube.com/embed/${trailer?.key}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={trailer.name}
                />
            <DialogActions>
                <Button aria-label="Close" onClick={()=> setTrailerData(SET_DISPLAY, false)}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default Trailer