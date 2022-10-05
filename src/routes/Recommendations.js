import React from "react";
import {useTMDB} from "../context/TMDBContext";
import MovieList from "../components/MovieList";

const Recommendations = () => {

    const tmdb = useTMDB()
    const {movies} = tmdb

    return <MovieList movies={movies}/>
}

export default Recommendations