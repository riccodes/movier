import React from "react";
import {Box, Typography} from "@mui/material";

const WatchProvs = ({provs, label}) => {
    if (provs)
        return (
            <Box sx={{marginBottom: "4px"}}>
                <Typography variant="subtitle2">{label}</Typography>
                    {provs.map(p =>(
                            <div key={p.provider_name}>
                                <img
                                    key={p.provider_name}
                                    style={{marginRight: "4px", verticalAlign: "middle"}}
                                    alt={p.provider_name}
                                    width="20"
                                    src={`https://image.tmdb.org/t/p/w200${p.logo_path}`}/>
                                <Typography variant="caption">{p.provider_name}</Typography>
                            </div>
                        ))}
            </Box>
        )
    else return <div/>
}

export default WatchProvs