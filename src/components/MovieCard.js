import React, {useEffect, useState} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Grid,
    Stack,
    Typography
} from "@mui/material";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import {getWatchProviders} from "../api/api";
import {getYear} from "../util";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
import Providers from "./Providers";
import Actions from "./Actions";

const MovieCard = ({ movie }) => {

    const [providers, setProviders] = useState()

    useEffect(() => {
        //fixme maybe move this to the TMDBContext
        getWatchProviders(movie.id)
            .then(res => {
                setProviders(res.data.results["US"])
        })
    }, [movie.id])

    const formatAverage = () => Math.round(parseFloat(movie.vote_average) * 10) / 10

    const determineImage = () => {
        if(movie.backdrop_path) return movie.backdrop_path

        else return movie.poster_path
    }

    return (
        <Grid item xs={2} sm={4} md={4}>
            <Card raised sx={{margin: "8px"}}>
                {/*todo set default image if no backdrop available*/}
                {movie.backdrop_path &&
                    <CardMedia
                        component="img"
                        src={`https://image.tmdb.org/t/p/w300/${determineImage()}`}
                        alt={movie.title}/>
                }
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
                            label={formatAverage()}
                            icon={<StarRateRoundedIcon/>}/>
                    </Stack>
                </CardContent>
                {movie.overview.length > 0 &&
                    <Accordion elevation={0}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreTwoToneIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography variant="body1">Overview</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="caption" color="text.secondary">
                                {movie.overview}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                }
                <Providers providers={providers}/>
                <Actions movie={movie} />
            </Card>
        </Grid>
    )
}

export default MovieCard