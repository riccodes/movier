import React from "react";
import {useWatchList} from "../context/WatchListContext";
import MovieList from "../components/MovieList";
import Loader from "../components/Loader";

const WatchList = () => {

    const list = useWatchList()
    const {watchlist} = list

    return <Loader><MovieList movies={watchlist}/></Loader>
}

export default WatchList