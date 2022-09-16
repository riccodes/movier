import React from "react";
import FilterBar from "../components/FilterBar";
import {Alert, Grid} from "@mui/material";
import SettingsSuggestTwoToneIcon from "@mui/icons-material/SettingsSuggestTwoTone";
import MovieCard from "../components/MovieCard";
import {useCommon} from "../context/CommonContext";

export const Search = ({ setMovies, movies }) => {

    const common = useCommon()
    const {alertState} = common
    const {alert} = alertState

    return (
        <>
            <FilterBar setMovies={setMovies} />
            {alert.isOpen && (
                <Alert sx={{marginBottom: "32px"}} icon={<SettingsSuggestTwoToneIcon fontSize="inherit"/>}>
                    {alert.message}
                </Alert>
            )}
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

export default Search