import './App.css';
import {discover} from "../api/api";
import {useEffect, useState} from "react";
import {Card, CardContent, CardMedia, Container, ImageList, Typography} from "@mui/material";

function App() {

    const [movies, setMovies] = useState([])

    useEffect(() => {
        discover().then(response => {
            setMovies(response.data)
        })
    }, [])

    return (
        <ImageList cols={6} maxWidth="xl">
            {movies.map(movie => (
                <Card>
                    <CardMedia
                        component="img"
                        image={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                        alt={movie.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {movie.title}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </ImageList>
    )
}

export default App;
