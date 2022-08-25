import './App.css';
import {discover} from "../api/api";
import {useEffect, useState} from "react";
import {ImageList} from "@mui/material";
import MovieCard from "./MovieCard";

function App() {

    const [movies, setMovies] = useState([])

    useEffect(() => {
        discover().then(response => {
            setMovies(response.data.results)
        })
    }, [])

    return (
        <ImageList rowHeight="auto" cols={5} maxWidth="xl">
            {movies.map( movie => <MovieCard movie={movie}/> )}
        </ImageList>
    )
}

export default App;
