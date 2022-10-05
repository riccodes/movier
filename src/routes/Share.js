import React, {useEffect, useState} from "react";
import MovieList from "../components/MovieList";
import {useParams} from "react-router-dom";
import tmdb from "themoviedb-javascript-library";
import {handleError, jsonify} from "../util";

const Share = () => {

    let {movieId} = useParams()

    const [movie, setMovie] = useState()

    useEffect(()=> {
        tmdb.movies.getById( {id: movieId}, res => setMovie(jsonify(res)), handleError )
        console.log(movie)
    }, [movieId])

    if(movie)
        return <MovieList movies={[ movie ]}/>
    else
        return <div>Loading...</div>
}

export default Share