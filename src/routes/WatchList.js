import React from "react";
import {Grid} from "@mui/material";
import MovieCard from "../components/MovieCard";
import {useWatchList} from "../context/WatchListContext";

const WatchList = () => {

    const list = useWatchList()
    const {watchlist} = list

    return (
        <>
            <Grid container maxWidth="xl" columns={{xs: 2, sm: 8, md: 20}}>
                {watchlist?.map(movie => <MovieCard key={movie.id} movie={movie}/> )}
            </Grid>
        </>
    )
}

export default WatchList