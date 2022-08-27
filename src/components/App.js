import './App.css';
import {useEffect, useState} from "react";
import {Alert, Container, FormControl, Grid, InputLabel, MenuItem, Select, Slider, Stack} from "@mui/material";
import SettingsSuggestTwoToneIcon from '@mui/icons-material/SettingsSuggestTwoTone';
import MovieCard from "./MovieCard";
import tmdb from "themoviedb-javascript-library";

function App() {

    tmdb.common.api_key = "28fa7353824f928bc291c6978cfb86c6";
    tmdb.common.base_uri = "https://api.themoviedb.org/3/";
    tmdb.common.images_uri = "https://image.tmdb.org/t/p/";

    const minYear = 1881
    const currentYear = new Date().getFullYear()
    const [movies, setMovies] = useState([])
    const [genres, setGenres] = useState([])
    const [selectedGenre, setSelectedGenre] = useState({name: ""})
    const [year, setYear] = useState("")
    const [alertMessage, setAlertMessage] = useState()
    const [isMessageDisplay, setIsMessageDisplay] = useState()
    const jsonify = string => JSON.parse(string)

    useEffect(() => {
        setIsMessageDisplay(false)
        setAlertMessage(null)

        tmdb.discover.getMovies({
                watch_region: "US",
                with_genres: selectedGenre.id,
                primary_release_year: year,
                sort_by: "popularity.desc"
            },
            (response) => { setMovies(jsonify(response).results) },
            (error) => { console.error(error) }
        )
    }, [year, selectedGenre])

    useEffect(() => {
        tmdb.genres.getMovieList({},
            (response) => { setGenres(jsonify(response).genres) },
            (error) => { console.error(error) }
        )
    }, [])

    const handleYearSelect = newValue => setYear(newValue)
    const handleGenreSelect = e => {
        const genre = genres.find(genre => genre.name === e.target.value)
        setSelectedGenre(genre)
    }
    const setDisplayMessage = (show, message) => {
        setAlertMessage(message)
        setIsMessageDisplay(show)
    }

    return (
        <Container sx={{marginTop: "16px"}} maxWidth="xl">
            <FormControl fullWidth>
                <InputLabel id="genre-select-label">Genre</InputLabel>
                <Select
                    labelId="genre-select-label"
                    id="genre-select"
                    value={selectedGenre.name}
                    label="Genre selection"
                    onChange={handleGenreSelect}
                >
                    {genres.map(genre => <MenuItem key={genre.id} value={genre.name}>{genre.name}</MenuItem>)}
                </Select>
            </FormControl>
            <Stack spacing={2} direction="row" sx={{mb: 1}} alignItems="center">
                {minYear}
                <Slider
                    sx={{margin: "32px"}}
                    aria-label="Set year"
                    defaultValue={currentYear}
                    valueLabelDisplay="on"
                    onChangeCommitted={(_, newValue) => handleYearSelect(newValue)}
                    step={1}
                    min={minYear}
                    max={currentYear}/>
                {currentYear}
            </Stack>
            {isMessageDisplay && (
                <Alert sx={{marginBottom: "32px"}} icon={<SettingsSuggestTwoToneIcon fontSize="inherit" />}>{alertMessage}</Alert>
            )}
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 20 }}>
                {movies?.map(movie =>
                    <MovieCard
                        setDisplayMessage={setDisplayMessage}
                        setMovies={setMovies}
                        movie={movie}/>)}
            </Grid>
        </Container>
    )
}

export default App;
