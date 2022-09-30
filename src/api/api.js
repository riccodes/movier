import axios from "axios";

export const api_key = "28fa7353824f928bc291c6978cfb86c6"
export const language = "en-US"
export const tmdb_host = "https://api.themoviedb.org/3/"
export const images_host = "https://image.tmdb.org/t/p/"

const watch_region = "US"

const watchProvidersUrl = id => `movie/${id}/watch/providers`
const watchProvidersListUrl =  "watch/providers/movie"
const trendingUrl = (media_type, time_window) => `/trending/${media_type}/${time_window}`

export const getWatchProviders = id => axios.get(tmdb_host + watchProvidersUrl(id), {params: {api_key, language}})
export const getWatchProviderList = () => axios.get(tmdb_host + watchProvidersListUrl, {params: {api_key, language, watch_region}})
export const getTrending = (mediaType, timeWindow) =>
    axios.get(tmdb_host + trendingUrl(mediaType, timeWindow), {params: {api_key, language}})
