import React from "react";
import {Grid} from "@mui/material";
import MovieCard from "../components/MovieCard";
import {useTMDB} from "../context/TMDBContext";

export const WatchList = () => {
    console.log('watchlist')
    const tmdb = useTMDB()
    const {movies, setMovies} = tmdb.state
    console.log(movies)
    return (
        <>
            <Grid container maxWidth="xl" columns={{xs: 2, sm: 8, md: 20}}>
                {movies?.map(movie =>
                    <MovieCard
                        key={movie.id}
                        setMovies={setMovies}
                        movie={movie}
                        movies={movies}
                    />)}
            </Grid>
        </>
    )
}

export default WatchList