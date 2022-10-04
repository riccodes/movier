import './css/App.css';
import React, {useEffect, useState} from "react";
import {Alert, Container, Snackbar, ThemeProvider} from "@mui/material";
import Trailer from "./Trailer";
import {useCommon} from "../context/CommonContext";
import WatchList from "../routes/WatchList";
import {Navigate, Route, Routes} from "react-router-dom";
import Search from "../routes/Search";
import Recommendations from "../routes/Recommendations";
import Trending from "../routes/Trending";
import Nav from "./Nav";
import {recommendationsRoute, searchRoute, trendingRoute, watchlistRoute} from "../routes/routes";
import {getTheme} from "../theme/theme";
import Cookies from 'universal-cookie';
import {candy, getPalette} from "../theme/palettes";

function App() {

    const cookies = new Cookies();
    const [palette, setPalette] = useState(candy)

    useEffect(()=> {
        if(cookies.get("theme") !== null) {
            setPalette(getPalette(cookies.get('theme')))
        }
    }, [ palette ])

    cookies.addChangeListener(cookie => { setPalette(getPalette(cookie.value)) })

    const theme = getTheme(palette)

    const common = useCommon()
    const {alert, snackBar, setSnackBar} = common

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
                <Nav cookies={cookies} />
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
