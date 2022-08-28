import React, {useEffect, useState} from "react";
import {Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Grid, Stack, Typography} from "@mui/material";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import {getWatchProviders} from "../api/api";
import tmdb from "themoviedb-javascript-library";

const MovieCard = ({movie, setDisplayMessage, setMovies}) => {

    const getYear = date => (date ? date.slice(0, 4) : "")
    const [providers, setProviders] = useState()

    //TODO-FIX make conditional render of providers
    // const [isProvidersDisplay, setIsProvidersDisplay] = useState(true)

    useEffect(() => {
        getWatchProviders(movie.id).then(providers => {
            setProviders(providers.data.results["US"])
        })
    }, [movie.id])

    const getRecommendations = () => {
        tmdb.movies.getRecommendations({id: movie.id},
            (response) => {
                setMovies(JSON.parse(response).results)
                setDisplayMessage(true, `Recommendations based on ${movie.title}`)
            },
            (error) => { console.error(error) }
        )
    }

    const renderProviders = (provs, label) => {
        if (provs) {
            return (
                <Box sx={{marginBottom: "4px"}}>
                    <Typography variant="subtitle2">{label}</Typography>
                    <Typography variant="caption">
                        {provs?.map(p => p.provider_name + ", ")}
                    </Typography>
                </Box>
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
                    alt={movie.title}
                />
                <CardContent>
                    <Stack
                        direction="row"
                        justifyContent="space-evenly"
                        alignItems="flex-start"
                        spacing={2}
                    >
                        <Typography gutterBottom variant="subtitle1" >
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
                <CardContent sx={{background: "#efefef"}}>
                    {renderProviders(providers?.free, "Free")}
                    {renderProviders(providers?.rent, "Rent")}
                    {renderProviders(providers?.buy, "Buy")}
                </CardContent>
                <CardActions>
                    <Button onClick={getRecommendations} size="small">Recommendations</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default MovieCard