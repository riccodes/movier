import './css/App.css';
import {useEffect, useState} from "react";
import {Alert, Container, Snackbar} from "@mui/material";
import tmdb from "themoviedb-javascript-library";
import {handleError, handleSuccess, sorts} from "../util";
import Trailer from "./Trailer";
import {api_key, images_host, tmdb_host} from "../api/api";
import {Navigate, Route, Routes} from "react-router-dom";
import Search from "../routes/Search";

function App() {

    tmdb.common.api_key = api_key;
    tmdb.common.base_uri = tmdb_host;
    tmdb.common.images_uri = images_host;

    const [movies, setMovies] = useState([])
    const [selectedGenre, setSelectedGenre] = useState({name: ""})
    const [selectedRating, setSelectedRating] = useState(0)
    const [selectedPerson, setSelectedPerson] = useState({id: "", name: ""})
    const [selectedSort, setSelectedSort] = useState(sorts.find(sort => sort.key === "pop.desc"))
    const [selectedCertification, setSelectedCertification] = useState({certification: ""})
    const [snackbarMessage, setSnackbarMessage] = useState("")
    const [snackbarOpen, setSnackbarOpen] = useState()
    const [year, setYear] = useState("")
    const [alertMessage, setAlertMessage] = useState()
    const [isMessageDisplay, setIsMessageDisplay] = useState()
    const [trailerOpen, setTrailerOpen] = useState(false)
    const [trailer, setTrailer] = useState({})

    useEffect(() => {
        setIsMessageDisplay(false)
        setAlertMessage(null)

        tmdb.discover.getMovies({
                language: "en-US",
                certification_country: "US",
                watch_region: "US",
                with_genres: selectedGenre.id,
                with_people: selectedPerson.id,
                primary_release_year: year,
                sort_by: selectedSort.name,
                "certification.gte": selectedCertification.certification,
                "vote_average.gte": selectedRating
            },
            res => handleSuccess(res, "results", setMovies), handleError
        )
    }, [selectedCertification, selectedGenre, selectedPerson, selectedRating, selectedSort, year])

    const setDisplayMessage = (show, message) => {
        setAlertMessage(message)
        setIsMessageDisplay(show)
    }
    const setSnackbar = (isOpen, message) => {
        setSnackbarOpen(isOpen)
        setSnackbarMessage(message)
    }

    return (
        <Container sx={{marginTop: "16px"}} maxWidth="xl">
            <Snackbar
                open={snackbarOpen}
                onClose={() => setSnackbar(false, "")}
            >
                <Alert severity="success">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <Trailer open={trailerOpen} setTrailerOpen={setTrailerOpen} trailer={trailer}/>
            <Routes>
                <Route path="/" element={<Navigate to="/search" />} />
                <Route path="/search" element={
                    <Search
                        isMessageDisplay={isMessageDisplay}
                        alertMessage={alertMessage}
                        movies={movies}
                        selectedGenre={selectedGenre}
                        selectedPerson={selectedPerson}
                        selectedCertification={selectedCertification}
                        selectedRating={selectedRating}
                        selectedSort={selectedSort}
                        setSelectedSort={setSelectedSort}
                        setYear={setYear}
                        setSelectedRating={setSelectedRating}
                        setMovies={setMovies}
                        setSnackbar={setSnackbar}
                        setSelectedGenre={setSelectedGenre}
                        setSelectedPerson={setSelectedPerson}
                        setTrailerOpen={setTrailerOpen}
                        setTrailer={setTrailer}
                        setSelectedCertification={setSelectedCertification}
                        setDisplayMessage={setDisplayMessage}
                        year={year}
                    />
                }/>
            </Routes>
        </Container>
    )
}

export default App;
