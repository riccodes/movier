import './App.css';
import {discover} from "../api/api";
import {useEffect, useState} from "react";
import {Container, ImageList, Slider, Stack} from "@mui/material";
import MovieCard from "./MovieCard";

function App() {

    const minYear = 1881
    const currentYear = new Date().getFullYear()
    const [movies, setMovies] = useState([])
    const [year, setYear] = useState("")

    useEffect(() => {
        discover(year).then(response => { setMovies(response.data.results) })
    }, [year])

    const handleSliderChange = newValue => {
        setYear(newValue)
    }

    return (
        <Container maxWidth="xl">
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            {minYear}
            <Slider
                sx={{margin: "32px"}}
                aria-label="Set year"
                defaultValue={currentYear}
                valueLabelDisplay="on"
                onChangeCommitted={(_, newValue) => handleSliderChange(newValue)}
                step={1}
                min={minYear}
                max={currentYear}/>
            {currentYear}
        </Stack>
        <ImageList rowHeight="auto" cols={5} maxWidth="xl">
            {movies.map( movie => <MovieCard movie={movie}/> )}
        </ImageList>
        </Container>
    )
}

export default App;
