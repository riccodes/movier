import './App.css';
import {useEffect, useState} from "react";
import {Alert, Container, Grid, Slider, Stack, Typography} from "@mui/material";
import SettingsSuggestTwoToneIcon from '@mui/icons-material/SettingsSuggestTwoTone';
import MovieCard from "./MovieCard";
import tmdb from "themoviedb-javascript-library";
import Selector from "./Selector";

function App() {

    tmdb.common.api_key = "28fa7353824f928bc291c6978cfb86c6";
    tmdb.common.base_uri = "https://api.themoviedb.org/3/";
    tmdb.common.images_uri = "https://image.tmdb.org/t/p/";

    const sorts = [
        { key: "pop.desc", name : "popularity.desc", label : "popularity desc"},
        { key: "pop.asc", name : "popularity.asc", label : "popularity asc"},
        { key: "rel.desc", name : "release_date.desc", label : "release date desc"},
        { key: "rel.asc", name : "release_date.asc", label : "release date asc"},
        { key: "vot.desc", name : "vote_average.desc", label : "vote average desc"},
        { key: "vot.asc", name : "vote_average.asc", label : "vote average asc"}
    ]

    const minYear = 1881
    const currentYear = new Date().getFullYear()
    const [movies, setMovies] = useState([])
    const [genres, setGenres] = useState([])
    const [certifications, setCertifications] = useState([])
    const [selectedGenre, setSelectedGenre] = useState({name: ""})
    const [selectedSort, setSelectedSort] = useState(sorts.find(sort => sort.key === "pop.desc"))
    const [selectedCertification, setSelectedCertification] = useState({certification: ""})
    const [year, setYear] = useState("")
    const [alertMessage, setAlertMessage] = useState()
    const [isMessageDisplay, setIsMessageDisplay] = useState()
    const jsonify = string => JSON.parse(string)

    useEffect(() => {
        setIsMessageDisplay(false)
        setAlertMessage(null)

        tmdb.discover.getMovies({
                watch_region: "US",
                with_genres: selectedGenre.id,
                primary_release_year: year,
                sort_by: selectedSort.name,
                certification_country: "US",
                "certification.gte": selectedCertification.certification
            },
            (response) => { setMovies(jsonify(response).results) },
            (error) => { console.error(error) }
        )
    }, [selectedCertification, selectedGenre, selectedSort, year])

    useEffect(() => {
        tmdb.genres.getMovieList({},
            (response) => { setGenres(jsonify(response).genres) },
            (error) => { console.error(error) }
        )

        tmdb.certifications.getMovieList(
            (response) => { setCertifications(jsonify(response).certifications.US) },
            (error) => { console.error(error) }
            )
    }, [])

    const handleYearSelect = newValue => setYear(newValue)
    const handleGenreSelect = e => {
        const genre = genres.find(genre => genre.name === e.target.value)
        setSelectedGenre(genre)
    }
    const handleSortSelect = e => setSelectedSort(sorts.find(sort => sort.name === e.target.value))
    const handleCertificationSelect = e =>
        setSelectedCertification(certifications.find(cert => cert.certification === e.target.value))

    const setDisplayMessage = (show, message) => {
        setAlertMessage(message)
        setIsMessageDisplay(show)
    }

    return (
        <Container sx={{marginTop: "16px"}} maxWidth="xl">
            <Typography sx={{marginBottom: "16px"}} variant="h3">
                MovieR <Typography variant="overline">by riccodes</Typography>
            </Typography>
            <Selector
                handleSelection={handleGenreSelect}
                label="Genres"
                items={genres}
                target="name"
                value={selectedGenre.name}/>
            <Selector
                handleSelection={handleSortSelect}
                label="Sort By"
                items={sorts}
                target="name"
                value={selectedSort.name}/>
            <Selector
                handleSelection={handleCertificationSelect}
                label="Rating" items={certifications}
                target="certification"
                value={selectedCertification.certification}/>
            <Stack spacing={2} direction="row" sx={{mb: 1}} alignItems="center">
                {minYear}
                <Slider
                    sx={{margin: "32px"}}
                    aria-label="Set year"
                    defaultValue={currentYear}
                    valueLabelDisplay="on"
                    onChangeCommitted={(_, newValue) => handleYearSelect(newValue)}
                    step={1}
                    min={minYear}
                    max={currentYear}/>
                {currentYear}
            </Stack>
            {isMessageDisplay && (
                <Alert sx={{marginBottom: "32px"}}
                       icon={<SettingsSuggestTwoToneIcon fontSize="inherit"/>}>{alertMessage}</Alert>
            )}
            <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 2, sm: 8, md: 20}}>
                {movies?.map(movie =>
                    <MovieCard
                        setDisplayMessage={setDisplayMessage}
                        setMovies={setMovies}
                        movie={movie}/>)}
            </Grid>
        </Container>
    )
}

export default App;
