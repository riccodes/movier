import React, {useEffect, useState} from "react";
import {Chip, Typography} from "@mui/material";
import {useTMDB} from "../context/TMDBContext";
import MovieList from "../components/MovieList";
import Loader from "../components/Loader";
import {getWatchProviders} from "../api/api";

const Trending = () => {

    const activeChip = {color:"primary", variant: "filled"}
    const inactiveChip = {color:"secondary", variant: "outlined"}

    const {trending, topRated, setTrending, setTrendingTimeWindow} = useTMDB()

    const [dailyChip, setDailyChip] = useState(activeChip)
    const [weeklyChip, setWeeklyChip] = useState(inactiveChip)
    const [topRatedChip, setTopRatedChip] = useState(inactiveChip)
    const [netflixChip, setNetflixChip] = useState(inactiveChip)

    async function getTrendingForProvider(providerId) {
         return await trending.filter(m => {
            return getWatchProviders(m.id).then(res => {
                if(res.data.results["US"]?.flatrate?.some(p => p.provider_id === providerId)){
                    return m
                } else {
                    return null
                }
            })
        })
    }

    useEffect(() => {
        if(netflixChip.color === "primary")
            getTrendingForProvider(8).then(r => setTrending(r))
    }, [netflixChip])

    const handleChipState = label => {

        switch (label){
            case "day":
                setDailyChip(activeChip)
                setWeeklyChip(inactiveChip)
                setTopRatedChip(inactiveChip)
                setNetflixChip(inactiveChip)
                setTrendingTimeWindow(label)
                break
            case "week":
                setDailyChip(inactiveChip)
                setWeeklyChip(activeChip)
                setTopRatedChip(inactiveChip)
                setNetflixChip(inactiveChip)
                setTrendingTimeWindow(label)
                break
            case "topRated":
                setDailyChip(inactiveChip)
                setWeeklyChip(inactiveChip)
                setTopRatedChip(activeChip)
                setNetflixChip(inactiveChip)
                setTrending(topRated)
                break
            case "netflix":
                setDailyChip(inactiveChip)
                setWeeklyChip(inactiveChip)
                setTopRatedChip(inactiveChip)
                setNetflixChip(activeChip)
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
            <Chip
                size="small"
                color={topRatedChip.color}
                variant={topRatedChip.variant}
                sx={{margin: "4px"}}
                label={"Netflix"}
                onClick={() => { handleChipState("netflix") }}
            />
            <Loader><MovieList movies={trending} /></Loader>
        </>
    )
}

export default Trending