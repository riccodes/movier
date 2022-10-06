import React, {useEffect, useState} from "react";
import {CardActions, IconButton, Tooltip} from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import SubscriptionsRoundedIcon from "@mui/icons-material/SubscriptionsRounded";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import OndemandVideoRoundedIcon from "@mui/icons-material/OndemandVideoRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import {useLocation} from "react-router-dom";
import {API, graphqlOperation} from "aws-amplify";
import {createMovie, deleteMovie} from "../graphql/mutations";
import {CHANGE_TRAILER, SET_DISPLAY, useCommon} from "../context/CommonContext";
import {useWatchList} from "../context/WatchListContext";
import {useTMDB} from "../context/TMDBContext";
import tmdbApi from "themoviedb-javascript-library";
import {handleError, handleSuccess} from "../util";

const Actions = ({ movie }) => {
    const location = useLocation()

    const {watchlist, setWatchlist} = useWatchList()

    const {getRecommendations} = useTMDB()

    const {setSnackBar, trailerState} = useCommon()
    const {setTrailerData} = trailerState

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

    useEffect(()=> {
        tmdbApi.movies.getVideos(
            {id: movie.id},
            res => handleSuccess(res, "results", parseTrailerResponse),
            handleError
        )
    })

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

    return (
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
                <IconButton color="secondary" size="large" onClick={() => getRecommendations(movie)}
                            aria-label="get recommendations">
                    <SettingsSuggestRoundedIcon/>
                </IconButton>
            </Tooltip>
            {isTrailerButtonDisplay &&
                <Tooltip disableFocusListener title="Watch trailer" placement="top">
                    <IconButton color="secondary" size="large" hidden={true} onClick={handleTrailerClick}
                                aria-label="watch trailer">
                        <OndemandVideoRoundedIcon/>
                    </IconButton>
                </Tooltip>
            }
            <Tooltip disableFocusListener title="share movie" placement="top">
                <IconButton color="secondary" size="large" hidden={true} onClick={handleShareClick}
                            aria-label="share movie">
                    <ShareRoundedIcon/>
                </IconButton>
            </Tooltip>
        </CardActions>
    )
}

export default Actions