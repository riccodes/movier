import * as React from 'react'
import {API, graphqlOperation} from "aws-amplify";
import {listMovies} from "../graphql/queries";
import {useEffect} from "react";
import Amplify from 'aws-amplify'
import awsmobile from "../aws-exports";

Amplify.configure(awsmobile)

const WatchListContext = React.createContext()

//TODO-ADD: persist watchlist across sessions
function watchListReducer(state = [], action) {
    console.log(action)
    switch (action.type) {
        case 'retrieve': {
            return {movieList: action.data}
        }
        case 'save': {
            return {movieList: [...state.movieList, action.data]}
        }
        case 'delete': {
            return {movieList: state.movieList.filter(m => m.id !== action.data.id)}
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

const getWatchList = async () => {
    try{
        const watchList = await API.graphql(graphqlOperation(listMovies))
        return watchList.data.listMovies.items
    } catch (e){
        console.error(e)
    }
}

function WatchListProvider({children}) {

    const [state, dispatch] = React.useReducer(watchListReducer, {movieList: []})

    useEffect(()=>{
        getWatchList().then(watchList => {
            dispatch({ type: 'retrieve', data: watchList })
        })
    }, [])

    // NOTE: you *might* need to memoize this value
    // Learn more in http://kcd.im/optimize-context
    const value = {state, dispatch}
    return <WatchListContext.Provider value={value}>{children}</WatchListContext.Provider>
}

function useWatchList() {
    const context = React.useContext(WatchListContext)
    if (context === undefined) {
        throw new Error('useWatchList must be used within a WatchListProvider')
    }
    return context
}

export {WatchListProvider, useWatchList}