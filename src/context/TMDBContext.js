import React, {useState} from 'react'
import {useEffect} from "react";
import tmdb from "themoviedb-javascript-library";
import {handleError, handleSuccess} from "../util";
import {api_key, getTrending, images_host, tmdb_host} from "../api/api";
import {useFilters} from "./FilterContext";
import {sanitizeResults} from "../util/utils";

tmdb.common.api_key = api_key;
tmdb.common.base_uri = tmdb_host;
tmdb.common.images_uri = images_host;

const TMDBContext = React.createContext()

function TMDBProvider({children}) {

    const filters = useFilters()
    const {certificationState, genreState, personState, ratingState, sortState, yearState} = filters
    const {certification} = certificationState
    const {genre} = genreState
    const {person} = personState
    const {rating} = ratingState
    const {sort} = sortState
    const {year} = yearState

    const [movies, setMovies] = useState([])
    const [trending, setTrending] = useState([])
    const [trendingTimeWindow, setTrendingTimeWindow] = useState("day")

    useEffect(() => {
        getTrending("movie", trendingTimeWindow).then(response => {
            setTrending(sanitizeResults(response.data.results))
        })
    }, [trendingTimeWindow])


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
                "vote_average.gte": rating
            },
            res => handleSuccess(res, "results", (results) => setMovies(sanitizeResults(results))),
            handleError
        )

    }, [certification, genre, person, rating, sort, year])

    const value = {movies, setMovies, trending, setTrending, setTrendingTimeWindow}
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