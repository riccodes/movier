import './css/App.css';
import React from "react";
import {Alert, Container, Snackbar, Stack} from "@mui/material";
import Trailer from "./Trailer";
import {useCommon} from "../context/CommonContext";
import {useWatchList} from "../context/WatchListContext";
import WatchList from "../routes/WatchList";
import {Link, Route, Routes} from "react-router-dom";
import Search from "../routes/Search";
import {useTMDB} from "../context/TMDBContext";
import SettingsSuggestTwoToneIcon from "@mui/icons-material/SettingsSuggestTwoTone";

function App() {

    const watchList = useWatchList()
    const {state} = watchList
    const movieList = state.movieList

    const tmdb = useTMDB()
    const {movies, setMovies} = tmdb

    const common = useCommon()
    const {alertState, snackBarState} = common
    const {snackBar, setSnackBar} = snackBarState
    const {alert} = alertState

    //TODO-FIX move to MovieContext
    // const [movies, setMovies] = useState([])

    const showWatchList = () => {
        setMovies(movieList)
    }

    return (
        <Container sx={{marginTop: "16px"}} maxWidth="xl">
            <Snackbar
                open={snackBar.isOpen}
                onClose={() => setSnackBar(false, "")}
            >
                <Alert severity="success">
                    {snackBar.message}
                </Alert>
            </Snackbar>
            <Trailer/>
            <Stack direction="row">
                <Link style={{margin: "8px"}} to="/search">Search</Link>
                <Link onClick={showWatchList} style={{margin: "8px"}} to="/watchlist">Watch List</Link>
            </Stack>
            {alert.isOpen && (
                <Alert sx={{marginBottom: "32px"}} icon={<SettingsSuggestTwoToneIcon fontSize="inherit"/>}>
                    {alert.message}
                </Alert>
            )}

            <Routes>
                <Route path="/search" element={
                    <Search movies={movies} setMovies={setMovies}/>
                }/>
                <Route path="/watchlist" element={
                    <WatchList />
                } />
            </Routes>

            {/*TODO-ADD /top Route */}
        </Container>
    )
}

export default App;
