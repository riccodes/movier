import React from "react";
import {Grid} from "@mui/material";
import MovieCard from "./MovieCard";

const MovieList = ({ movies }) => {
    return (
        <Grid container maxWidth="xl" columns={{xs: 2, sm: 8, md: 20}}>
            {movies?.map(movie => <MovieCard key={movie.id} movie={movie}/> )}
        </Grid>
    )
}

export default MovieList