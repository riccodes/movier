import React from "react";
import FilterBar from "../components/FilterBar";
import {Alert, Grid} from "@mui/material";
import SettingsSuggestTwoToneIcon from "@mui/icons-material/SettingsSuggestTwoTone";
import MovieCard from "../components/MovieCard";

export const Search = ({
                           setDisplayMessage,
                           setMovies,
                           isMessageDisplay,
                           alertMessage,
                           movies,
                           setSnackbar,
                           setTrailerOpen,
                           setTrailer
                       }) => {
    return (
        <>
            <FilterBar
                setDisplayMessage={setDisplayMessage}
                setMovies={setMovies}
            />
            {isMessageDisplay && (
                <Alert sx={{marginBottom: "32px"}} icon={<SettingsSuggestTwoToneIcon fontSize="inherit"/>}>
                    {alertMessage}
                </Alert>
            )}
            <Grid container maxWidth="xl" columns={{xs: 2, sm: 8, md: 20}}>
                {movies?.map(movie =>
                    <MovieCard
                        key={movie.id}
                        setDisplayMessage={setDisplayMessage}
                        setMovies={setMovies}
                        setSnackbar={setSnackbar}
                        setTrailerOPen={setTrailerOpen}
                        setTrailer={setTrailer}
                        movie={movie}
                        movies={movies}
                    />)}
            </Grid>
        </>
    )
}

export default Search