import React, {useEffect, useState} from "react";
import {
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
import GradeTwoToneIcon from '@mui/icons-material/GradeTwoTone';
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import SettingsSuggestTwoToneIcon from '@mui/icons-material/SettingsSuggestTwoTone';
import OndemandVideoTwoToneIcon from '@mui/icons-material/OndemandVideoTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import {getWatchProviders} from "../api/api";
import {getYear, handleError, handleSuccess} from "../util";
import WatchProvs from "./WatchProvs";
import {API, graphqlOperation} from "aws-amplify";
import {createMovie, deleteMovie} from "../graphql/mutations";
import {CHANGE_TRAILER, SET_DISPLAY, useCommon} from "../context/CommonContext";
import tmdbApi from "themoviedb-javascript-library";
import {useWatchList} from "../context/WatchListContext";
import {useLocation, useNavigate} from "react-router-dom";
import {useTMDB} from "../context/TMDBContext";
import {sanitizeResults} from "../util/utils";

const MovieCard = ({movie}) => {

    const location = useLocation()
    const navigate = useNavigate()

    const list = useWatchList()
    const {watchlist, setWatchlist} = list

    const tmdb = useTMDB()
    const {setMovies} = tmdb

    const common = useCommon()
    const {setRecommendation, setSnackBar, trailerState} = common
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

    const handleRecommendations = response => {
        if (response.length > 0) {
            setRecommendation(movie.title)
            setMovies(sanitizeResults(response))
            navigate("/recommendations")
        } else
            setSnackBar({isOpen: true, message: "No recommendations found"})
    }

    const getRecommendations = () => tmdbApi.movies.getRecommendations(
        {id: movie.id},
        (res) => handleSuccess(res, "results", handleRecommendations),
        handleError
    )

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

    const renderProviders = () => {
        if (providers) {
            return (
                <CardContent sx={{background: "#efefef"}}>
                    <WatchProvs provs={providers["free"]} label="Free"/>
                    <WatchProvs provs={providers["flatrate"]} label="Streaming"/>
                    <WatchProvs provs={providers["rent"]} label="Rent"/>
                </CardContent>
            )
        }

        return <div/>
    }

    const handleTrailerClick = () => {
        setTrailerData(CHANGE_TRAILER, currentTrailer)
        setTrailerData(SET_DISPLAY, true)
    }

    const formatAverage = () => Math.round(parseFloat(movie.vote_average) * 10) / 10

    const determineImage = () => {
        if(movie.backdrop_path) return movie.backdrop_path

        else return movie.poster_path
    }

    return (
        <Grid item xs={2} sm={4} md={4}>
            <Card raised sx={{margin: "8px"}}>
                <CardMedia
                    component="img"
                    src={`https://image.tmdb.org/t/p/w300/${determineImage()}`}
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
                            label={formatAverage()}
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
                    {location.pathname === "/watchlist" &&
                        <Tooltip disableFocusListener title="Remove" placement="top">
                            <IconButton size="large" color="error" onClick={remove} aria-label="removed">
                                <DeleteForeverTwoToneIcon/>
                            </IconButton>
                        </Tooltip>
                    }
                    {location.pathname !== "/watchlist" &&
                        <Tooltip disableFocusListener title="Save to watch list" placement="top">
                            <IconButton size="large" color="primary" onClick={saveToWatchList} aria-label="save to watch list">
                                <GradeTwoToneIcon/>
                            </IconButton>
                        </Tooltip>
                    }
                    <Tooltip disableFocusListener title="Get Recommendations" placement="top">
                        <IconButton size="large" onClick={getRecommendations} aria-label="get recommendations">
                            <SettingsSuggestTwoToneIcon/>
                        </IconButton>
                    </Tooltip>
                    {isTrailerButtonDisplay &&
                        <Tooltip disableFocusListener title="Watch trailer" placement="top">
                            <IconButton size="large" hidden={true} onClick={handleTrailerClick} aria-label="watch trailer">
                                <OndemandVideoTwoToneIcon/>
                            </IconButton>
                        </Tooltip>
                    }
                </CardActions>
            </Card>
        </Grid>
    )
}

export default MovieCard