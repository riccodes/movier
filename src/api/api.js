import axios from "axios";

const api_key = "28fa7353824f928bc291c6978cfb86c6"
const language= "en-US"

const fakeHost = "http://localhost:3001"
const host = "https://api.themoviedb.org/3"

// const discoverUrl = "https://api.themoviedb.org/3/discover/movie/?api_key=28fa7353824f928bc291c6978cfb86c6&language=en-US&sort_by=popularity.desc&include_video=true&primary_release_year=2022&with_keywords=hot&vote_average.gte=7.9"
const discoverUrl = "http://localhost:3001/discover/"

export const getMovie = id => {
    axios.get(`${fakeHost}/movie/${id}`, { params: { api_key, language } }).then(response => {
            return response.data
        })
}

export const discover = () => axios.get(discoverUrl)