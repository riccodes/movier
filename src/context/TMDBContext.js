import * as React from 'react'
import {useEffect} from "react";
import tmdb from "themoviedb-javascript-library";
import {handleError, handleSuccess} from "../util";

const TMDBContext = React.createContext()

function TMDBReducer(state, action) {
    switch (action.type) {
        case 'setMovies': {
            return {movies: action.data}
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}


function TMDBProvider({children}) {

    useEffect(()=>{
        // setAlert(false, null)

        tmdb.discover.getMovies({
                language: "en-US",
                certification_country: "US",
                watch_region: "US"
            },
            res => handleSuccess(res, "results", setMovies), handleError
        )
    }, [])

    const setMovies = movies => {
        dispatch({type: "setMovies", data: movies})
    }

    const [state, dispatch] = React.useReducer(TMDBReducer, {movies: [], setMovies: setMovies})

    const value = {state, dispatch}
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