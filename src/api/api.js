import axios from "axios";

const api_key = "28fa7353824f928bc291c6978cfb86c6"
const language= "en-US"

const fakeDiscoverUrl = "http://localhost:3001/discover"
const host = "https://api.themoviedb.org/3"

const discoverUrl = "/discover/movie/?api_key=28fa7353824f928bc291c6978cfb86c6&language=en-US&sort_by=popularity.desc&include_video=true&primary_release_year=2022&with_keywords=hot&vote_average.gte=7.9"
const watchListUrl = "/movie/16/watch/providers?api_key=28fa7353824f928bc291c6978cfb86c6&language=en-US"
const fakeWatchListUrl ="http://localhost:3001/watchProviders"

// export const getMovie = id => {
//     axios.get(`${fakeDiscoverUrl}/movie/${id}`, { params: { api_key, language } }).then(response => {
//             return response.data
//         })
// }

export const discover = () => axios.get(fakeDiscoverUrl)

export const getWatchProviders = id => axios.get(fakeWatchListUrl)