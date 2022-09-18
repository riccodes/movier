import React from "react";
import {Grid} from "@mui/material";
import MovieCard from "../components/MovieCard";
import {useTMDB} from "../context/TMDBContext";

const Recommendations = () => {

    const tmdb = useTMDB()
    const {movies} = tmdb

    return (
        <>
            <Grid container maxWidth="xl" columns={{xs: 2, sm: 8, md: 20}}>
                {movies?.map(movie => <MovieCard key={movie.id} movie={movie}/> )}
            </Grid>
        </>
    )
}

export default Recommendations