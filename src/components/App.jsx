import './css/App.css';
import {useEffect, useState} from "react";
import {Alert, Container, Snackbar, Stack} from "@mui/material";
import tmdb from "themoviedb-javascript-library";
import {handleError, handleSuccess} from "../util";
import Trailer from "./Trailer";
import {api_key, images_host, tmdb_host} from "../api/api";
import {Link, Navigate, Route, Routes} from "react-router-dom";
import Search from "../routes/Search";
import {useFilters} from "../context/FilterContext";
import {useCommon} from "../context/CommonContext";
import FilterBar from "./FilterBar";
import {useWatchList} from "../context/WatchListContext";
import WatchList from "../routes/WatchList";

function App() {

    tmdb.common.api_key = api_key;
    tmdb.common.base_uri = tmdb_host;
    tmdb.common.images_uri = images_host;

    const watchList = useWatchList()
    const {state} = watchList
    const movieList = state.movieList

    const filters = useFilters()
    const {certificationState, genreState, personState, ratingState, sortState, yearState} = filters
    const {certification} = certificationState
    const {genre} = genreState
    const {person} = personState
    const {rating} = ratingState
    const {sort} = sortState
    const {year} = yearState

    const common = useCommon()
    const {alertState, snackBarState} = common
    const {snackBar, setSnackBar} = snackBarState
    const {setAlert} = alertState

    //TODO-FIX move to MovieContext
    const [movies, setMovies] = useState([])

    const showWatchList = () => {
        setMovies(movieList)
    }

    useEffect(() => {
        setAlert(false, null)

        tmdb.discover.getMovies({
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
            res => handleSuccess(res, "results", setMovies), handleError
        )
    }, [certification, genre, person, rating, sort, year, setAlert])

    return (
        <Container sx={{marginTop: "16px"}} maxWidth="xl">
            <Snackbar
                open={snackBar.isOpen}
                onClose={() => setSnackBar( false, "" )}
            >
                <Alert severity="success">
                    {snackBar.message}
                </Alert>
            </Snackbar>
            <Trailer/>

            {/*<Stack direction="row">*/}
            {/*    <Link style={{margin: "8px"}} to="/search">Search</Link>*/}
            {/*    <Link onClick={showWatchList} style={{margin: "8px"}} to="/watchlist">Watch List</Link>*/}
            {/*</Stack>*/}

            {/*<Routes>*/}
            {/*    <Route path="/search" element={*/}
            {/*        <Search movies={movies} setMovies={setMovies}/>*/}
            {/*    }/>*/}
            {/*    <Route*/}
            {/*        path="/watchlist"*/}
            {/*        element={*/}
            {/*            <WatchList movies={movies} setMovies={setMovies} />*/}
            {/*        } />*/}
            {/*</Routes>*/}
            {/*/!*TODO-ADD /watchlist Route *!/*/}
            {/*TODO-ADD /top Route */}
        </Container>
    )
}

export default App;
