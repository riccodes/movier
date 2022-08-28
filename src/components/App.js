import './App.css';
import {useEffect, useState} from "react";
import {
    Alert,
    Autocomplete,
    Box,
    Container,
    FormControl,
    Grid,
    Slider,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import SettingsSuggestTwoToneIcon from '@mui/icons-material/SettingsSuggestTwoTone';
import MovieCard from "./MovieCard";
import tmdb from "themoviedb-javascript-library";
import Selector from "./Selector";
import {currentYear, generatePersonsOptions, handleError, handleSuccess, jsonify, minYear, sorts} from "../util";

function App() {

    tmdb.common.api_key = "28fa7353824f928bc291c6978cfb86c6";
    tmdb.common.base_uri = "https://api.themoviedb.org/3/";
    tmdb.common.images_uri = "https://image.tmdb.org/t/p/";

    const [movies, setMovies] = useState([])
    const [genres, setGenres] = useState([])
    const [persons, setPersons] = useState([])
    const [personQuery, setPersonQuery] = useState()
    const [certifications, setCertifications] = useState([])
    const [selectedGenre, setSelectedGenre] = useState({name: ""})
    const [selectedPerson, setSelectedPerson] = useState({id: ""})
    const [selectedSort, setSelectedSort] = useState(sorts.find(sort => sort.key === "pop.desc"))
    const [selectedCertification, setSelectedCertification] = useState({certification: ""})
    const [year, setYear] = useState("")
    const [alertMessage, setAlertMessage] = useState()
    const [isMessageDisplay, setIsMessageDisplay] = useState()

    useEffect(() => {
        setIsMessageDisplay(false)
        setAlertMessage(null)

        tmdb.discover.getMovies({
                certification_country: "US",
                watch_region: "US",
                with_genres: selectedGenre.id,
                with_people: selectedPerson.id,
                primary_release_year: year,
                sort_by: selectedSort.name,
                "certification.gte": selectedCertification.certification
            },
            res => handleSuccess(res, "results", setMovies), handleError
        )
    }, [selectedCertification, selectedGenre, selectedPerson, selectedSort, year])

    useEffect(() => {
        tmdb.genres.getMovieList({}, res => handleSuccess(res, "genres", setGenres), handleError)
        tmdb.certifications.getMovieList((response) => setCertifications(jsonify(response).certifications.US), handleError)
    }, [])

    useEffect(() => {
        tmdb.search.getPerson({query: personQuery},res => handleSuccess(res, "results", setPersons), handleError)
    }, [personQuery])

    const handleYearSelect = newValue => setYear(newValue)
    const handleGenreSelect = e => {
        const genre = genres.find(genre => genre.name === e.target.value)
        setSelectedGenre(genre)
    }
    const handleSortSelect = e => setSelectedSort(sorts.find(sort => sort.name === e.target.value))
    const handleCertificationSelect = e => setSelectedCertification(certifications.find(cert => cert.certification === e.target.value))
    const setDisplayMessage = (show, message) => {
        setAlertMessage(message)
        setIsMessageDisplay(show)
    }
    const handleQueryChange = e => {
        const val = e.target.value

        if (val?.length > 1) setPersonQuery(val)
    }
    const handlePersonSelect = (e, newValue) => {
        if (newValue)
            setSelectedPerson(persons.find(person => person.name === newValue))
    }

    return (
        <Container sx={{marginTop: "16px"}} maxWidth="xl">
            <Typography sx={{marginBottom: "16px"}} variant="h3">
                MovieR <Typography variant="overline">by riccodes</Typography>
            </Typography>
            <Box component="form">
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
            </Box>
            <FormControl fullWidth>
                <Autocomplete
                    sx={{marginTop: "16px"}}
                    disablePortal
                    fullWidth
                    id="search-person"
                    options={generatePersonsOptions(persons)}
                    onInputChange={handleQueryChange}
                    onChange={handlePersonSelect}
                    renderInput={(params) => <TextField {...params} label="Search for by person"/>}
                />
            </FormControl>
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
            <Grid item container spacing={{xs: 2, md: 3}} columns={{xs: 2, sm: 8, md: 20}}>
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
