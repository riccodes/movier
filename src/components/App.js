import './App.css';
import {discover, getGenreList} from "../api/api";
import {useEffect, useState} from "react";
import {Container, FormControl, Grid, InputLabel, MenuItem, Select, Slider, Stack} from "@mui/material";
import MovieCard from "./MovieCard";

function App() {

    const minYear = 1881
    const currentYear = new Date().getFullYear()
    const [movies, setMovies] = useState([])
    const [genres, setGenres] = useState([])
    const [selectedGenre, setSelectedGenre] = useState({name: ""})
    const [year, setYear] = useState("")

    useEffect(() => {
        discover().then(response => {
            setMovies(response.data.results)
        })
    }, [year, selectedGenre])

    useEffect(() => {
        getGenreList().then(response => {
            setGenres(response.data.genres)
        })
    }, [])

    const handleYearSelect = newValue => setYear(newValue)
    const handleGenreSelect = e => {
        const genreId = genres.find(genre => genre.name === e.target.value)
        setSelectedGenre(genreId)
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
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 20 }}>
                {movies.map(movie => <MovieCard movie={movie}/>)}
            </Grid>
        </Container>
    )
}

export default App;
