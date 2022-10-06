import React, {useEffect, useState} from 'react'
import tmdb from "themoviedb-javascript-library";
import {handleError, handleSuccess} from "../util";
import {api_key, getTrending, images_host, tmdb_host} from "../api/api";
import {useFilters} from "./FilterContext";
import {sanitizeResults} from "../util/utils";
import {useCommon} from "./CommonContext";
import tmdbApi from "themoviedb-javascript-library";
import {useNavigate} from "react-router-dom";

tmdb.common.api_key = api_key;
tmdb.common.base_uri = tmdb_host;
tmdb.common.images_uri = images_host;

const TMDBContext = React.createContext()

function TMDBProvider({children}) {

    const navigate = useNavigate()

    const { certification, genre, person, rating, sort, year, watchProvider} = useFilters()

    const {setLoading, setRecommendation, setSnackBar} = useCommon()

    const [movies, setMovies] = useState([])
    const [trending, setTrending] = useState([])
    const [topRated, setTopRated] = useState([])
    const [trendingTimeWindow, setTrendingTimeWindow] = useState("day")

    const handleTopRatedChange = (res) => {
        setTopRated(sanitizeResults(res))
        setLoading(false)
    }

    const handleFilterChange = (res) => {
        setMovies(sanitizeResults(res))
        setLoading(false)
    }

    const handleRecommendations = (results, movie) => {
        if (results.length > 0) {
            setRecommendation(movie.title)
            setMovies(sanitizeResults(results))
            navigate("/recommendations")
        } else {
            setSnackBar({isOpen: true, message: "No recommendations found"})
        }

        setLoading(false)
    }

    useEffect(() => {
        setLoading(true)
        tmdb.movies.getTopRated({},
            res => handleSuccess(res, "results", handleTopRatedChange),
            handleError
        )
    }, [setLoading])

    useEffect(() => {
        setLoading(true)
        getTrending("movie", trendingTimeWindow).then(response => {
            setTrending(sanitizeResults(response.data.results))
            setLoading(false)
        })
    }, [trendingTimeWindow, setLoading])

    useEffect(() => {
        tmdb.discover.getMovies(
            {
                language: "en-US",
                certification_country: "US",
                watch_region: "US",
                with_genres: genre.id,
                with_people: person.id,
                primary_release_year: year,
                sort_by: sort.name,
                "certification.gte": certification.certification,
                "vote_average.gte": rating,
                "with_watch_providers": watchProvider.provider_id
            },
            res => handleSuccess(res, "results", handleFilterChange),
            handleError
        )

    }, [certification, genre, person, rating, sort, year, watchProvider])

    const getMovieById = (movieId, handleMovie) => {
        setLoading(true)

        const handleMovieIdChange = res => {
            handleMovie(res)
            setLoading(false)
        }

        tmdb.movies.getById( {id: movieId}, handleMovieIdChange, handleError )
    }

    const getRecommendations = (movie) => {
        setLoading(true)
        return tmdbApi.movies.getRecommendations(
            {id: movie.id},
            (res) => handleSuccess(res, "results", (results) => handleRecommendations(results,movie)),
            handleError
        )
    }

    const value = {
        movies, setMovies, trending, topRated, setTrending, setTrendingTimeWindow,
        getMovieById,
        getRecommendations
    }

    return <TMDBContext.Provider value={value}>{children}</TMDBContext.Provider>
}

function useTMDB() {
    const context = React.useContext(TMDBContext)
    if (context === undefined) {
        throw new Error('useWatchList must be used within a WatchListProvider')
    }
    return context
}

export {TMDBProvider, useTMDB}