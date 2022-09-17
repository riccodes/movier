import React from "react";
import {Grid} from "@mui/material";
import MovieCard from "../components/MovieCard";
import {useWatchList} from "../context/WatchListContext";
import {useTMDB} from "../context/TMDBContext";

const WatchList = () => {

    const watchList = useWatchList()
    const {movieList} = watchList.state

    const tmdb = useTMDB()
    const {setMovies} = tmdb

    return (
        <>
            <Grid container maxWidth="xl" columns={{xs: 2, sm: 8, md: 20}}>
                {movieList?.map(movie =>
                    <MovieCard
                        key={movie.id}
                        setMovies={setMovies}
                        movie={movie}
                        movies={movieList}
                    />)}
            </Grid>
        </>
    )
}

export default WatchList