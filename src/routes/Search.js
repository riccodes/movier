import React from "react";
import FilterBar from "../components/FilterBar";
import {useTMDB} from "../context/TMDBContext";
import MovieList from "../components/MovieList";
import Loader from "../components/Loader";

export const Search = () => {

    const {movies} = useTMDB()

    return (
        <>
            <FilterBar />
            <Loader><MovieList movies={movies}/></Loader>
        </>
    )
}

export default Search