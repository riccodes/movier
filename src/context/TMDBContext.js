import React, {useState} from 'react'
import {useEffect} from "react";
import tmdb from "themoviedb-javascript-library";
import {handleError, handleSuccess} from "../util";
import {api_key, getTrending, images_host, tmdb_host} from "../api/api";
import {useFilters} from "./FilterContext";
import {sanitizeResults} from "../util/utils";
import {useCommon} from "./CommonContext";

tmdb.common.api_key = api_key;
tmdb.common.base_uri = tmdb_host;
tmdb.common.images_uri = images_host;

const TMDBContext = React.createContext()

function TMDBProvider({children}) {

    const filters = useFilters()
    const { certification, genre, person, ratingState, sortState, yearState, watchProvider} = filters
    const {rating} = ratingState
    const {sort} = sortState
    const {year} = yearState

    const {setLoading} = useCommon()

    const [movies, setMovies] = useState([])
    const [trending, setTrending] = useState([])
    const [topRated, setTopRated] = useState([])
    const [trendingTimeWindow, setTrendingTimeWindow] = useState("day")

    const getMovieById = (movieId, handleMovie) => {
        setLoading(true)

        const handleMovieIdChange = res => {
            handleMovie(res)
            setLoading(false)
        }

        tmdb.movies.getById( {id: movieId}, handleMovieIdChange, handleError )
    }

    const handleTopRatedChange = (res) => {
        setTopRated(sanitizeResults(res))
        setLoading(false)
    }

    const handleFilterChange = (res) => {
        setMovies(sanitizeResults(res))
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

    const value = { movies, setMovies, trending, topRated, setTrending, setTrendingTimeWindow, getMovieById}
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