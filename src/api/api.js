import axios from "axios";

export const api_key = "28fa7353824f928bc291c6978cfb86c6"
export const language = "en-US"
export const tmdb_host = "https://api.themoviedb.org/3/"
export const images_host = "https://image.tmdb.org/t/p/"

const watchListUrl = id => `/movie/${id}/watch/providers`
const trendingUrl = (media_type, time_window) => `/trending/${media_type}/${time_window}`

export const getWatchProviders = id => axios.get(tmdb_host + watchListUrl(id), {params: {api_key, language}})
export const getTrending = (mediaType, timeWindow) =>
    axios.get(tmdb_host + trendingUrl(mediaType, timeWindow), {params: {api_key, language}})
