import axios from "axios";

const api_key = "28fa7353824f928bc291c6978cfb86c6"
const language = "en-US"

const host = "https://api.themoviedb.org/3"
const discoverUrl = "/discover/movie/"
const genreListUrl = "/genre/movie/list"
const watchListUrl = id => `/movie/${id}/watch/providers`

//TODO-ADD implement mirage
// const fakeWatchListUrl = "http://localhost:3001/watchProviders"
// const fakeDiscoverUrl = "http://localhost:3001/discover"

// export const getMovie = id => {
//     axios.get(`${fakeDiscoverUrl}/movie/${id}`, { params: { api_key, language } }).then(response => {
//             return response.data
//         })
// }

// export const discover = (genre = "", year = "") => axios.get(host + discoverUrl,
//         {
//             params: {
//                 api_key,
//                 language,
//                 watch_region: "US",
//                 with_genres: genre,
//                 primary_release_year: year,
//                 sort_by: "popularity.desc"
//             }
//         })

export const discover = () => axios.get("https://api.themoviedb.org/3/trending/all/day?api_key=28fa7353824f928bc291c6978cfb86c6")

export const getWatchProviders = id => axios.get(host + watchListUrl(id), {params: {api_key, language}})

export const getGenreList = () => axios.get(host + genreListUrl, {params: {api_key}})