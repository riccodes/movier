import axios from "axios";

const api_key = "28fa7353824f928bc291c6978cfb86c6"
const language= "en-US"

const host = "https://api.themoviedb.org/3"
//example
//?sort_by=popularity.desc&include_video=true&primary_release_year=2022&with_keywords=hot&vote_average.gte=7.9
const discoverUrl = "/discover/movie/"
const watchListUrl = id => `/movie/${id}/watch/providers`

//TODO-ADD implement mirage
const fakeWatchListUrl ="http://localhost:3001/watchProviders"
const fakeDiscoverUrl = "http://localhost:3001/discover"

// export const getMovie = id => {
//     axios.get(`${fakeDiscoverUrl}/movie/${id}`, { params: { api_key, language } }).then(response => {
//             return response.data
//         })
// }

export const discover = (year = "") => axios.get(host + discoverUrl,
    { params: {
            api_key,
            language,
            primary_release_year: year
    }})

export const getWatchProviders = id => axios.get(host + watchListUrl(id), { params: { api_key, language } })