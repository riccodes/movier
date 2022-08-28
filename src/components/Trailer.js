import React from "react";
import {Dialog} from "@mui/material";

const Trailer = ({ open, setTrailerOpen, trailer }) => {
    return(
        <Dialog
            fullWidth
            maxWidth="lg"
            onClose={()=> setTrailerOpen(false)}
            open={open}>
                <iframe
                    height="600"
                    src={`https://www.youtube.com/embed/${trailer?.key}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={trailer.name}
                />
        </Dialog>
    )
}

export default Trailer