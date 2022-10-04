import './css/App.css';
import React, {useEffect, useState} from "react";
import {Alert, Container, Snackbar, ThemeProvider} from "@mui/material";
import Trailer from "./Trailer";
import {useCommon} from "../context/CommonContext";
import WatchList from "../routes/WatchList";
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import Search from "../routes/Search";
import Recommendations from "../routes/Recommendations";
import Trending from "../routes/Trending";
import Nav from "./Nav";
import {recommendationsRoute, searchRoute, trendingRoute, watchlistRoute} from "../routes/routes";
import {mintCoffee} from "../theme/palettes";
import {getTheme} from "../theme/theme";

function App() {

    const [palette, setPalette] = useState(mintCoffee)
    const theme = getTheme(palette)

    const common = useCommon()
    const {alert, recommendation, setAlert, snackBar, setSnackBar} = common

    const location = useLocation()

    useEffect(()=> {
        const {pathname} = location

        switch (pathname){
            case recommendationsRoute :
                setAlert({isOpen: true, message: `Recommendations based on: ${recommendation}`})
                break
            default :
                setAlert({isOpen: false, message: ""})
        }


    }, [location, setAlert, recommendation])

    return (
        <ThemeProvider theme={theme}>
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
                <Nav setPalette={setPalette} />
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
                </Routes>
            </Container>
        </ThemeProvider>
    )
}

export default App;
