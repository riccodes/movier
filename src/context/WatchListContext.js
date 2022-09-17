import * as React from 'react'
import {API, graphqlOperation} from "aws-amplify";
import {listMovies} from "../graphql/queries";
import {useEffect, useState} from "react";
import Amplify from 'aws-amplify'
import awsmobile from "../aws-exports";

Amplify.configure(awsmobile)

const WatchListContext = React.createContext()

const getWatchList = async () => {
    try{
        const watchList = await API.graphql(graphqlOperation(listMovies))
        return watchList.data.listMovies.items
    } catch (e){
        console.error(e)
    }
}

function WatchListProvider({children}) {
    const [watchlist, setWatchlist] = useState([])

    useEffect(()=>{
        getWatchList().then(data => { setWatchlist(data) })
    }, [])

    // NOTE: you *might* need to memoize this value
    // Learn more in http://kcd.im/optimize-context
    const value = {watchlist, setWatchlist}
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