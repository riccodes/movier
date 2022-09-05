import './css/App.css';
import {useEffect, useState} from "react";
import {Alert, Container, Grid, Snackbar} from "@mui/material";
import SettingsSuggestTwoToneIcon from '@mui/icons-material/SettingsSuggestTwoTone';
import MovieCard from "./MovieCard";
import tmdb from "themoviedb-javascript-library";
import {handleError, handleSuccess, sorts} from "../util";
import Trailer from "./Trailer";
import FilterBar from "./FilterBar";

function App() {

    tmdb.common.api_key = "28fa7353824f928bc291c6978cfb86c6";
    tmdb.common.base_uri = "https://api.themoviedb.org/3/";
    tmdb.common.images_uri = "https://image.tmdb.org/t/p/";

    const [movies, setMovies] = useState([])
    const [selectedGenre, setSelectedGenre] = useState({name: ""})
    const [selectedRating, setSelectedRating] = useState(0)
    const [selectedPerson, setSelectedPerson] = useState({id: ""})
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
            <FilterBar
                selectedCertification={selectedCertification}
                selectedGenre={selectedGenre}
                selectedRating={selectedRating}
                selectedSort={selectedSort}
                setMovies={setMovies}
                setSelectedCertification={setSelectedCertification}
                setSelectedGenre={setSelectedGenre}
                setSelectedPerson={setSelectedPerson}
                setSelectedRating={setSelectedRating}
                setSelectedSort={setSelectedSort}
                setYear={setYear}
                year={year}
            />
            {isMessageDisplay && (
                <Alert sx={{marginBottom: "32px"}} icon={<SettingsSuggestTwoToneIcon fontSize="inherit"/>}>
                    {alertMessage}
                </Alert>
            )}
            <Grid container maxWidth="xl" columns={{xs: 2, sm: 8, md: 20}} >
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
        </Container>
    )
}

export default App;
