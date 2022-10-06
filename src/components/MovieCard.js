import React, {useEffect, useState} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Chip,
    Grid,
    IconButton,
    Stack,
    Tooltip,
    Typography
} from "@mui/material";
import SubscriptionsRoundedIcon from '@mui/icons-material/SubscriptionsRounded';
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import OndemandVideoRoundedIcon from '@mui/icons-material/OndemandVideoRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import {getWatchProviders} from "../api/api";
import {getYear, handleError, handleSuccess} from "../util";
import {API, graphqlOperation} from "aws-amplify";
import {createMovie, deleteMovie} from "../graphql/mutations";
import {CHANGE_TRAILER, SET_DISPLAY, useCommon} from "../context/CommonContext";
import tmdbApi from "themoviedb-javascript-library";
import {useWatchList} from "../context/WatchListContext";
import {useLocation} from "react-router-dom";
import {useTMDB} from "../context/TMDBContext";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import Providers from "./Providers";

const MovieCard = ({ movie }) => {

    const location = useLocation()

    const {watchlist, setWatchlist} = useWatchList()

    const {getRecommendations} = useTMDB()

    const {setSnackBar, trailerState} = useCommon()
    const {setTrailerData} = trailerState

    const [providers, setProviders] = useState()
    const [isTrailerButtonDisplay, setIsTrailerButtonDisplay] = useState(true)
    const [currentTrailer, setCurrentTrailer] = useState({})

    const parseTrailerResponse = trailers => {
        if (trailers.length > 0) {
            const trailerArray = trailers.filter(video => video.type === "Trailer")

            if (trailerArray.length > 0)
                setCurrentTrailer(trailerArray[0])
            else
                setCurrentTrailer(trailers[0])
        } else {
            setIsTrailerButtonDisplay(false)
        }
    }

    useEffect(() => {
        tmdbApi.movies.getVideos(
            {id: movie.id},
            res => handleSuccess(res, "results", parseTrailerResponse),
            handleError
        )

        getWatchProviders(movie.id).then(providers => {
            setProviders(providers.data.results["US"])
        })

    }, [movie.id])

    const saveToWatchList = () => {
        const saveMovie = async () => {
            try {
                await API.graphql(graphqlOperation(createMovie, {input: movie}))
                setWatchlist([...watchlist, movie])
            } catch (e) {
                console.error(e)
            }
        }

        saveMovie().then(() => {
            setSnackBar({isOpen: true, message: `${movie.title} saved to watch list`})
        })
    }

    const remove = () => {
        const removeMovie = async () => {
            try {
                await API.graphql(graphqlOperation(deleteMovie, {input: {id: movie.id}}))
                setWatchlist(watchlist.filter(m => m.id !== movie.id))
            } catch (e) {
                console.error(e)
            }
        }

        removeMovie().then(() => { setSnackBar({isOpen: true, message:`${movie.title} deleted`}) })
    }

    const handleTrailerClick = () => {
        setTrailerData(CHANGE_TRAILER, currentTrailer)
        setTrailerData(SET_DISPLAY, true)
    }

    const handleShareClick = () => {
        navigator.clipboard.writeText(`https://movier.riccodes.com/share/${movie.id}`)
        setSnackBar({isOpen: true, message: "Link copied to clipboard"})
    }

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
                {/*todo set global toggle for overview and providers*/}
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
                {/*fixme refactor this component*/}
                <CardActions>
                    {location.pathname === "/watchlist" &&
                        <Tooltip disableFocusListener title="Remove" placement="top">
                            <IconButton size="large" color="error" onClick={remove} aria-label="removed">
                                <DeleteRoundedIcon/>
                            </IconButton>
                        </Tooltip>
                    }
                    {location.pathname !== "/watchlist" &&
                        <Tooltip disableFocusListener title="Save to watch list" placement="top">
                            <IconButton size="large" color="primary" onClick={saveToWatchList} aria-label="save to watch list">
                                <SubscriptionsRoundedIcon/>
                            </IconButton>
                        </Tooltip>
                    }
                    <Tooltip disableFocusListener title="Get Recommendations" placement="top">
                        <IconButton color="secondary" size="large" onClick={()=> getRecommendations(movie)} aria-label="get recommendations">
                            <SettingsSuggestRoundedIcon/>
                        </IconButton>
                    </Tooltip>
                    {isTrailerButtonDisplay &&
                        <Tooltip disableFocusListener title="Watch trailer" placement="top">
                            <IconButton color="secondary" size="large" hidden={true} onClick={handleTrailerClick} aria-label="watch trailer">
                                <OndemandVideoRoundedIcon/>
                            </IconButton>
                        </Tooltip>
                    }
                    <Tooltip disableFocusListener title="share movie" placement="top">
                        <IconButton color="secondary" size="large" hidden={true} onClick={handleShareClick} aria-label="share movie">
                            <ShareRoundedIcon/>
                        </IconButton>
                    </Tooltip>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default MovieCard