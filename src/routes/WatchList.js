import React from "react";
import {useWatchList} from "../context/WatchListContext";
import MovieList from "../components/MovieList";

const WatchList = () => {

    const list = useWatchList()
    const {watchlist} = list

    return <MovieList movies={watchlist}/>
}

export default WatchList