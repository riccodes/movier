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
import tmdb from "themoviedb-javascript-library";
import {getYear, handleError, handleSuccess} from "../util";
import WatchProvider from "./WatchProvider";
import {useWatchList} from "../context/WatchListContext";
import {API, graphqlOperation} from "aws-amplify";
import {createMovie} from "../graphql/mutations";

const MovieCard = ({movie, movies, setDisplayMessage, setMovies, setSnackbar, setTrailer, setTrailerOPen}) => {

    const watchList = useWatchList()
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
        tmdb.movies.getVideos(
            {id: movie.id},
            res => handleSuccess(res, "results", parseTrailerResponse),
            handleError
        )

        getWatchProviders(movie.id).then(providers => {
            setProviders(providers.data.results["US"])
        })
    }, [movie.id])

    const handleRecommendations = response => {

        if (response.length > 0){
            setMovies(response)
            setDisplayMessage(true, `Recommendations based on ${movie.title}`)
        }

        else
            setSnackbar(true, "No recommendations found")
    }
    const handleTrailerClick = () => {
        setTrailer(currentTrailer)
        setTrailerOPen(true)
     }

    const getRecommendations = () => tmdb.movies.getRecommendations(
        {id: movie.id},
        (res) => handleSuccess(res, "results", handleRecommendations),
        handleError
    )

    const saveToWatchList = () => {
        // add movie to state
        const {dispatch} = watchList
        dispatch({data: movie, type: "save"})


        const saveMovie = async () => {
            try{
                const watchList = await API.graphql(graphqlOperation(createMovie, {input: movie}))
                return watchList.data.listMovies.items
            } catch (e){
                console.error(e)
            }
        }

        //save move to db
        saveMovie().then(()=> {
            setSnackbar(true, `${movie.title} saved to watch list`)
        })
    }

    const remove = () => {
        const newMovies = movies.filter(m => m.id !== movie.id)
        setMovies(newMovies)
    }

    const renderProviders = () => {
        if (providers) {
            return (
                <CardContent sx={{background: "#efefef"}}>
                    <WatchProvider provs={providers["free"]} label="Free"/>
                    <WatchProvider provs={providers["flatrate"]} label="Streaming"/>
                    <WatchProvider provs={providers["rent"]} label="Rent"/>
                </CardContent>
            )
        }

        return <div/>
    }

    const formatAverage = () => Math.round(parseFloat(movie.vote_average) * 10) / 10

    return (
        <Grid item xs={2} sm={4} md={4}>
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
                        {/*TODO-FIX: Round this value to 1 decimal*/}
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
                    <Tooltip disableFocusListener title="Remove" placement="top">
                        <IconButton onClick={remove} aria-label="removed">
                            <DeleteForeverTwoToneIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip disableFocusListener title="Save to watch list" placement="top">
                        <IconButton onClick={saveToWatchList} aria-label="save to watch list">
                            <GradeTwoToneIcon/>
                        </IconButton>
                    </Tooltip>
                    {/*TODO-ADD show this button only when trailer available */}
                    <Tooltip disableFocusListener title="Get Recommendations" placement="top">
                        <IconButton onClick={getRecommendations} aria-label="get recommendations">
                            <SettingsSuggestTwoToneIcon/>
                        </IconButton>
                    </Tooltip>
                    { isTrailerButtonDisplay &&
                        (<Tooltip disableFocusListener title="Watch trailer" placement="top">
                            <IconButton hidden={true} onClick={handleTrailerClick} aria-label="watch trailer">
                                <OndemandVideoTwoToneIcon/>
                            </IconButton>
                        </Tooltip>)
                    }
                </CardActions>
            </Card>
        </Grid>
    )
}

export default MovieCard