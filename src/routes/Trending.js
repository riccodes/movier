import React, {useState} from "react";
import {Chip, Grid} from "@mui/material";
import MovieCard from "../components/MovieCard";
import {useTMDB} from "../context/TMDBContext";

const Trending = () => {

    const tmdb = useTMDB()
    const {trending, setTrendingTimeWindow} = tmdb
    const [dailyChip, setDailyChip] = useState({color:"primary", variant: "outlined"})
    const [weeklyChip, setWeeklyChip] = useState({color:"default", variant: "filled"})

    const handleChipState = label => {

        if(label === "day"){
            setDailyChip({color:"primary", variant: "filled"})
            setWeeklyChip({color:"default", variant: "outlined"})
        } else if(label === "week"){
            setDailyChip({color:"default", variant: "outlined"})
            setWeeklyChip({color:"primary", variant: "filled"})
        }

        setTrendingTimeWindow(label)
    }

    return (
        <>
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
            <Grid container maxWidth="xl" columns={{xs: 2, sm: 8, md: 20}}>
                {trending?.map(movie => <MovieCard key={movie.id} movie={movie}/> )}
            </Grid>
        </>
    )
}

export default Trending