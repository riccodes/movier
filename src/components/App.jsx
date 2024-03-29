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
import {recommendationsRoute, searchRoute, shareRoute, trendingRoute, watchlistRoute} from "../routes/routes";
import {useThemeHelper} from "../context/ThemeHelperContext";
import BottomNav from "./BottomNav";
import Scroller from "./Scroller";
import {ScrollProvider} from "../context/ScrollContext";

function App() {

    const themeHelper = useThemeHelper()
    const {theme} = themeHelper

    const common = useCommon()
    const {alert, snackBar, setSnackBar} = common

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <ScrollProvider>
                <Scroller/>
            </ScrollProvider>
            <Container sx={{marginTop: "16px"}} maxWidth="xl">
                {/*fixme this glitches out sometimes*/}
                <Trailer/>
                <Snackbar
                    open={snackBar.isOpen}
                    onClose={() => setSnackBar({isOpen: false, message: ""})}
                >
                    <Alert severity="success">
                        {snackBar.message}
                    </Alert>
                </Snackbar>
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
                <ScrollProvider>
                    <BottomNav />
                </ScrollProvider>
            </Container>
        </ThemeProvider>
    )
}

export default App;
