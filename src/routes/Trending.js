import React, {useState} from "react";
import {Chip, Typography} from "@mui/material";
import {useTMDB} from "../context/TMDBContext";
import MovieList from "../components/MovieList";
import Loader from "../components/Loader";

const Trending = () => {

    const activeChip = {color:"primary", variant: "filled"}
    const inactiveChip = {color:"secondary", variant: "outlined"}

    const tmdb = useTMDB()
    const {trending, topRated, setTrending, setTrendingTimeWindow} = tmdb

    const [dailyChip, setDailyChip] = useState(activeChip)
    const [weeklyChip, setWeeklyChip] = useState(inactiveChip)
    const [topRatedChip, setTopRatedChip] = useState(inactiveChip)

    const handleChipState = label => {

        switch (label){
            case "day":
                setDailyChip(activeChip)
                setWeeklyChip(inactiveChip)
                setTopRatedChip(inactiveChip)
                setTrendingTimeWindow(label)
                break
            case "week":
                setDailyChip(inactiveChip)
                setWeeklyChip(activeChip)
                setTopRatedChip(inactiveChip)
                setTrendingTimeWindow(label)
                break
            case "topRated":
                setDailyChip(inactiveChip)
                setWeeklyChip(inactiveChip)
                setTopRatedChip(activeChip)
                setTrending(topRated)
                break
            default:
                break

        }
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
            <Chip
                size="small"
                color={topRatedChip.color}
                variant={topRatedChip.variant}
                sx={{margin: "4px"}}
                label={"Top Rated"}
                onClick={() => { handleChipState("topRated") }}
            />
            <Loader><MovieList movies={trending} /></Loader>
        </>
    )
}

export default Trending