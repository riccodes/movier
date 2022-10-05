import './css/App.css';
import React from "react";
import {Alert, Container, CssBaseline, Snackbar, ThemeProvider} from "@mui/material";
import Trailer from "./Trailer";
import {useCommon} from "../context/CommonContext";
import WatchList from "../routes/WatchList";
import {Navigate, Route, Routes} from "react-router-dom";
import Search from "../routes/Search";
import Recommendations from "../routes/Recommendations";
import Trending from "../routes/Trending";
import Share from "../routes/Share";
import Nav from "./Nav";
import {recommendationsRoute, searchRoute, shareRoute, trendingRoute, watchlistRoute} from "../routes/routes";
import {useThemeHelper} from "../context/ThemeHelperContext";

function App() {

    const themeHelper = useThemeHelper()
    const {theme} = themeHelper

    const common = useCommon()
    const {alert, snackBar, setSnackBar} = common

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container sx={{marginTop: "16px"}} maxWidth="xl">
                <Snackbar
                    open={snackBar.isOpen}
                    onClose={() => setSnackBar({isOpen: false, message: ""})}
                >
                    <Alert severity="success">
                        {snackBar.message}
                    </Alert>
                </Snackbar>
                <Trailer/>
                <Nav />
                {alert.isOpen && (
                    <Alert severity="info" sx={{marginBottom: "32px"}} icon={alert.icon}>
                        {alert.message}
                    </Alert>
                )}

                <Routes>
                    <Route path="/" element={<Navigate to={searchRoute}/>}/>
                    <Route index path={searchRoute} element={<Search/>}/>
                    <Route path={watchlistRoute} element={<WatchList/>}/>
                    <Route path={recommendationsRoute} element={<Recommendations/>}/>
                    <Route path={trendingRoute} element={<Trending/>}/>
                    <Route path={`${shareRoute}/:movieId`} element={<Share/>}/>
                </Routes>
            </Container>
        </ThemeProvider>
    )
}

export default App;
