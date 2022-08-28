import React, {useEffect, useState} from "react";
import {Button, Card, CardActions, CardContent, CardMedia, Chip, Grid, Stack, Typography} from "@mui/material";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import {getWatchProviders} from "../api/api";
import tmdb from "themoviedb-javascript-library";
import {getYear, handleError, handleSuccess, jsonify} from "../util";
import WatchProvider from "./WatchProvider";

const MovieCard = ({movie, setDisplayMessage, setMovies, setTrailer, setTrailerOPen}) => {

    const [providers, setProviders] = useState()
    const [trailers, setTrailers] = useState([])

    const setTrailerModal = () => {
        if (trailers.length > 0) {
            const trailer = trailers.filter(video => video.type === "Trailer")

            if(trailer.length > 0)
                setTrailer(trailer[0])
            else
                setTrailer(trailers[0])

            setTrailerOPen(true)
        }
    }

    useEffect(() => {
        getWatchProviders(movie.id).then(providers => {
            setProviders(providers.data.results["US"])
        })
    }, [movie.id])

    useEffect(() => {
        setTrailerModal()
    }, [trailers])

    const setMessage = response => {
        if (response.results.length > 0)
            setDisplayMessage(true, `Recommendations based on ${movie.title}`)
        else
            alert('no recommendations found')
    }

    const getRecommendations = () => tmdb.movies.getRecommendations(
        {id: movie.id},
        (res) => handleSuccess(res, "results", setMovies, () => setMessage(jsonify(res))),
        handleError
    )

    const getTrailers = () => tmdb.movies.getVideos(
        {id: movie.id},
        res => handleSuccess(res, "results", setTrailers),
        handleError
    )

    const renderProviders = () => {
        if (providers) {
            return (
                <CardContent sx={{background: "#efefef"}}>
                    <WatchProvider provs={providers["free"]} label="Free"/>
                    <WatchProvider provs={providers["flatrate"]} label="Streaming"/>
                    <WatchProvider provs={providers["rent"]} label="Rent"/>
                    <WatchProvider provs={providers?.buy} label="Buy"/>
                </CardContent>
            )
        }

        return <div/>
    }

    return (
        <Grid xs={2} sm={4} md={4}>
            <Card variant="elevation" sx={{margin: "8px"}}>
                <CardMedia
                    component="img"
                    src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                    alt={movie.title}/>
                <CardContent>
                    <Stack
                        direction="row"
                        justifyContent="space-evenly"
                        alignItems="flex-start"
                        spacing={2}
                    >
                        <Typography gutterBottom variant="subtitle1">
                            {movie.title} ({getYear(movie.release_date)})
                        </Typography>
                        <Chip
                            color="info"
                            label={movie.vote_average}
                            icon={<StarRateRoundedIcon/>}/>
                    </Stack>
                </CardContent>
                <CardContent>
                    <Typography variant="caption" color="text.secondary">
                        {movie.overview}
                    </Typography>
                </CardContent>
                {renderProviders()}
                <CardActions>
                    <Button onClick={getRecommendations} size="small">Recommendations</Button>
                    <Button onClick={getTrailers} size="small">Trailer</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default MovieCard