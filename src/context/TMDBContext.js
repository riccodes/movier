import React, {useState} from 'react'
import {useEffect} from "react";
import tmdb from "themoviedb-javascript-library";
import {handleError, handleSuccess} from "../util";
import {api_key, getTrending, images_host, tmdb_host} from "../api/api";
import {useFilters} from "./FilterContext";

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

    useEffect(()=> {
        getTrending("movie","day").then(response => {
            const results = response.data.results
            const cleanResults = results.map(result => {
                delete result.media_type
                return result
            })

            setTrending(cleanResults)
        })
    }, [])

    useEffect(()=> {
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
            res => handleSuccess(res, "results", setMovies),
            handleError
        )

    }, [certification, genre, person, rating, sort, year])

    const value = {movies, setMovies, trending, setTrending}
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