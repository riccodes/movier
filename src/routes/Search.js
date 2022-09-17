import React from "react";
import FilterBar from "../components/FilterBar";
import {Grid} from "@mui/material";
import MovieCard from "../components/MovieCard";
import {useTMDB} from "../context/TMDBContext";

export const Search = () => {

    const tmdb = useTMDB()
    const {movies} = tmdb

    return (
        <>
            <FilterBar />
            <Grid container maxWidth="xl" columns={{xs: 2, sm: 8, md: 20}}>
                {movies?.map(movie => <MovieCard key={movie.id} movie={movie}/> )}
            </Grid>
        </>
    )
}

export default Search