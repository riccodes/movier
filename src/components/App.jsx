import './css/App.css';
import React, {useEffect} from "react";
import {Alert, Container, Snackbar, Stack} from "@mui/material";
import Trailer from "./Trailer";
import {useCommon} from "../context/CommonContext";
import WatchList from "../routes/WatchList";
import {Link, Route, Routes, useLocation} from "react-router-dom";
import Search from "../routes/Search";
import SettingsSuggestTwoToneIcon from "@mui/icons-material/SettingsSuggestTwoTone";
import Recommendations from "../routes/Recommendations";

function App() {

    const common = useCommon()
    const {alert, recommendation, setAlert, snackBar, setSnackBar} = common

    const location = useLocation()

    useEffect(()=> {
        const {pathname} = location

        switch (pathname){
            case "/watchlist" :
                setAlert({isOpen: true, message: "Watchlist"})
                break
            case "/recommendations" :
                setAlert({isOpen: true, message: `Recommendations based on: ${recommendation}`})
                break
            default :
                setAlert({isOpen: false, message: ""})
        }


    }, [location])

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
                <Link style={{margin: "8px"}} to="/watchlist">Watchlist</Link>
            </Stack>
            {alert.isOpen && (
                <Alert sx={{marginBottom: "32px"}} icon={<SettingsSuggestTwoToneIcon fontSize="inherit"/>}>
                    {alert.message}
                </Alert>
            )}

            <Routes>
                <Route path="/search" element={ <Search /> }/>
                <Route path="/watchlist" element={ <WatchList /> } />
                <Route path="/Recommendations" element={ <Recommendations /> } />
            </Routes>

            {/*TODO-ADD /top Route */}
        </Container>
    )
}

export default App;
