import React from "react";
import FilterBar from "../components/FilterBar";
import {Grid} from "@mui/material";
import MovieCard from "../components/MovieCard";

export const Search = ({ setMovies, movies }) => {

    return (
        <>
            <FilterBar setMovies={setMovies} />
            <Grid container maxWidth="xl" columns={{xs: 2, sm: 8, md: 20}}>
                {movies?.map(movie =>
                    <MovieCard
                        key={movie.id}
                        setMovies={setMovies}
                        movie={movie}
                        movies={movies}
                    />)}
            </Grid>
        </>
    )
}

export default Search