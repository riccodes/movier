import React from "react";
import FilterBar from "../components/FilterBar";
import {useTMDB} from "../context/TMDBContext";
import MovieList from "../components/MovieList";

export const Search = () => {

    const tmdb = useTMDB()
    const {movies} = tmdb

    return (
        <>
            <FilterBar />
            <MovieList movies={movies}/>
        </>
    )
}

export default Search