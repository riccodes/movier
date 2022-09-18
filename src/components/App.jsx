import './css/App.css';
import React, {useEffect} from "react";
import {Alert, Container, Snackbar} from "@mui/material";
import Trailer from "./Trailer";
import {useCommon} from "../context/CommonContext";
import WatchList from "../routes/WatchList";
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import Search from "../routes/Search";
import Recommendations from "../routes/Recommendations";
import Trending from "../routes/Trending";
import Nav from "./Nav";
import {recommendationsRoute, searchRoute, trendingRoute, watchlistRoute} from "../routes/routes";

function App() {

    const common = useCommon()
    const {alert, recommendation, setAlert, snackBar, setSnackBar} = common

    const location = useLocation()

    useEffect(()=> {
        const {pathname} = location

        switch (pathname){
            case watchlistRoute :
                setAlert({isOpen: true, message: "Watchlist"})
                break
            case recommendationsRoute :
                setAlert({isOpen: true, message: `Recommendations based on: ${recommendation}`})
                break
            case trendingRoute :
                setAlert({isOpen: true, message: "Trending today"})
                break
            default :
                setAlert({isOpen: false, message: ""})
        }


    }, [location])

    return (
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
                <Alert sx={{marginBottom: "32px"}} icon={alert.icon}>
                    {alert.message}
                </Alert>
            )}

            <Routes>
                <Route path="/" element={<Navigate to={searchRoute} />} />
                <Route path={searchRoute} element={ <Search /> }/>
                <Route path={watchlistRoute} element={ <WatchList /> } />
                <Route path={recommendationsRoute} element={ <Recommendations /> } />
                <Route path={trendingRoute} element={ <Trending /> } />
            </Routes>
        </Container>
    )
}

export default App;
