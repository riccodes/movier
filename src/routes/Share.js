import React, {useEffect} from "react";
import MovieList from "../components/MovieList";
import {useParams} from "react-router-dom";
import {useTMDB} from "../context/TMDBContext";

const Share = () => {

    let {movieId} = useParams()

    const tmdb = useTMDB()
    const {getMovieById, movie} = tmdb

    useEffect(()=> { getMovieById(movieId) }, [movieId])

    return <MovieList movies={[ movie ]}/>
}

export default Share