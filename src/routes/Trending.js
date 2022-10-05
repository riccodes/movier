import React, {useState} from "react";
import {Chip, Typography} from "@mui/material";
import {useTMDB} from "../context/TMDBContext";
import MovieList from "../components/MovieList";

const Trending = () => {

    const activeChip = {color:"primary", variant: "filled"}
    const inactiveChip = {color:"secondary", variant: "outlined"}

    const tmdb = useTMDB()
    const {trending, setTrendingTimeWindow} = tmdb
    const [dailyChip, setDailyChip] = useState(activeChip)
    const [weeklyChip, setWeeklyChip] = useState(inactiveChip)

    const handleChipState = label => {

        if(label === "day"){
            setDailyChip(activeChip)
            setWeeklyChip(inactiveChip)
        } else if(label === "week"){
            setDailyChip(inactiveChip)
            setWeeklyChip(activeChip)
        }

        setTrendingTimeWindow(label)
    }

    return (
        <>
            <Typography variant="caption">Trends: </Typography>
            <Chip
                size="small"
                color={dailyChip.color}
                variant={dailyChip.variant}
                sx={{margin: "4px"}}
                label={"Daily"}
                onClick={() => { handleChipState("day") }}
            />
            <Chip
                size="small"
                color={weeklyChip.color}
                variant={weeklyChip.variant}
                sx={{margin: "4px"}}
                label={"Weekly"}
                onClick={() => { handleChipState("week") }}
            />
           <MovieList movies={trending} />
        </>
    )
}

export default Trending