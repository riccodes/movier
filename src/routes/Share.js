import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import tmdb from "themoviedb-javascript-library";
import {handleError, jsonify} from "../util";
import MovieList from "../components/MovieList";
import Loader from "../components/Loader";

const Share = () => {
    const {movieId} = useParams()
    const [movie, setMovie] = useState([])

    useEffect(() => {
        tmdb.movies.getById({id: movieId}, (res)=> setMovie(jsonify(res)), handleError)
    }, [movieId])

    return <Loader><MovieList movies={[ movie ]}/></Loader>
}

export default Share