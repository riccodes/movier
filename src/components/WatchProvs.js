import React from "react";
import {Box, Typography} from "@mui/material";

const WatchProvs = ({provs, label}) => {
    if (provs)
        return (
            <Box sx={{marginBottom: "4px"}}>
                <Typography variant="subtitle2">{label}</Typography>
                <Typography variant="caption">
                    {provs.map(p => p.provider_name + ", ")}
                </Typography>
            </Box>
        )
    else return <div/>
}

export default WatchProvs