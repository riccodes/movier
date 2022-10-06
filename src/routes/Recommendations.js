import React from "react";
import {useTMDB} from "../context/TMDBContext";
import MovieList from "../components/MovieList";
import Loader from "../components/Loader";

const Recommendations = () => {

    const {movies} = useTMDB()

    return <Loader><MovieList movies={movies}/></Loader>
}

export default Recommendations