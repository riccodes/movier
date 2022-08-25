import React, {useEffect, useState} from "react";
import {Box, Card, CardContent, CardMedia, Chip, Stack, Typography} from "@mui/material";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import {getWatchProviders} from "../api/api";

const getYear = date => date.slice(0, 4)

const MovieCard = ({ movie }) => {

    const [providers, setProviders] = useState()

    useEffect(() => {
        getWatchProviders(movie.id).then(providers => {
            setProviders(providers.data.results["US"])
        })
    }, [])

    return (
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
                    <Typography gutterBottom variant="h5">
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
                <Box sx={{marginBottom: "4px"}}>
                    <Typography variant="subtitle2">Free</Typography>
                    <Typography variant="caption">
                        {providers?.free?.map(p => p.provider_name + ", ")}
                    </Typography>
                </Box>
                <Box sx={{marginBottom: "4px"}}>
                    <Typography variant="subtitle2">Rent</Typography>
                    <Typography variant="caption">
                        {providers?.rent?.map(p => p.provider_name + ", ")}
                    </Typography>
                </Box>
                <Box sx={{marginBottom: "4px"}}>
                    <Typography variant="subtitle2">Buy</Typography>
                    <Typography variant="caption">
                        {providers?.buy?.map(p => p.provider_name + ", ")}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default MovieCard