import React from "react";
import {Grid} from "@mui/material";
import MovieCard from "../components/MovieCard";
import {useTMDB} from "../context/TMDBContext";

const Trending = () => {

    const tmdb = useTMDB()
    const {trending} = tmdb

    return (
        <>
            <Grid container maxWidth="xl" columns={{xs: 2, sm: 8, md: 20}}>
                {trending?.map(movie => <MovieCard key={movie.id} movie={movie}/> )}
            </Grid>
        </>
    )
}

export default Trending