import React, {useEffect, useState} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Autocomplete,
    Button,
    FormControl,
    Rating,
    Slider,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone';
import BackspaceTwoToneIcon from '@mui/icons-material/BackspaceTwoTone';
import Selector from "./Selector";
import {
    currentYear,
    generateMoviesOptions,
    generatePersonsOptions,
    handleError,
    handleSuccess,
    jsonify,
    minYear,
    sorts
} from "../util";
import tmdbApi from "themoviedb-javascript-library";
import {useFilters} from "../context/FilterContext";
import {sanitizeResults} from "../util/utils";
import {useTMDB} from "../context/TMDBContext";
import IconSelector from "./IconSelector";

const FilterBar = () => {

    const tmdb = useTMDB()
    const {setMovies} = tmdb

    const filters = useFilters()
    const {watchProvider, setWatchProvider, watchProviderList} = filters
    const {certificationState, genreState, personState, ratingState, sortState, yearState} = filters
    const {certification, setCertification} = certificationState
    const {genre, setGenre} = genreState
    const {person, setPerson} = personState
    const {rating, setRating} = ratingState
    const {sort, setSort} = sortState
    const {year, setYear} = yearState

    const MINIMUM_RATING = "Minimum Rating"

    const [persons, setPersons] = useState([])
    const [movieResults, setMovieResults] = useState([])
    const [ratingLabel, setRatingLabel] = useState("Minimum Rating")
    const [personQuery, setPersonQuery] = useState()
    const [movieQuery, setMovieQuery] = useState("")
    const [genres, setGenres] = useState([])
    const [certifications, setCertifications] = useState([])

    const handleMovieResults = results => {
        const newResults = results.map(r => r.original_title)
        setMovieResults(newResults)
        setMovies(sanitizeResults(results))
    }

    useEffect(() => {
        tmdbApi.search.getMovie({query: movieQuery}, res => handleSuccess(res, "results", handleMovieResults), handleError)
    }, [movieQuery])

    useEffect(() => {
        tmdbApi.search.getPerson({query: personQuery}, res => handleSuccess(res, "results", setPersons), handleError)
    }, [personQuery])

    useEffect(() => {
        tmdbApi.genres.getMovieList({}, res => handleSuccess(res, "genres", setGenres), handleError)
        tmdbApi.certifications.getMovieList(res => setCertifications(jsonify(res).certifications.US), handleError)
    }, [])

    //fixme consider moving all filter functions to FilterContext
    const handleYearSelect = e => setYear(e.target.value)
    const handleGenreSelect = e => {
        const g = genres.find(gen => gen.name === e.target.value)
        setGenre(g)
    }
    const handleSortSelect = e => setSort(sorts.find(sort => sort.name === e.target.value))
    const handleWatchProviderSelect = e => setWatchProvider(watchProviderList.find(prov => prov.provider_name === e.target.value))
    const handleCertificationSelect = e => setCertification(certifications.find(cert => cert.certification === e.target.value))

    const handlePersonQueryChange = (e, newValue) => {
        if (newValue?.length > 2) setPersonQuery(newValue)
    }
    const handleMovieQueryChange = (e, newValue) => {
        if (newValue?.length > 2) setMovieQuery(newValue)
    }
    const handlePersonSelect = (e, newValue) => {
        if (newValue)
            setPerson(persons.find(p => p.name === newValue))
    }

    const handleRatingSelect = e => {
        if (e) {
            const newRating = e?.target?.value

            setRating(newRating)
            setRatingLabel(`${MINIMUM_RATING}: ${newRating}`)
        }
    }

    //fixme move to FilterContext
    const clearFilters = () => {
        setPerson("")
        setCertification("")
        setGenre("")
        setRating(0)
        setRatingLabel(MINIMUM_RATING)
        setSort(sorts.find(sort => sort.key === "pop.desc"))
        setYear("")
        setMovieQuery("")
        setWatchProvider({provider_name: ""})
    }

    return (
        <Accordion defaultExpanded sx={{marginBottom: "16px"}} elevation={3}>
            <AccordionSummary
                expandIcon={<ExpandMoreTwoToneIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <FilterAltTwoToneIcon/>
                <Typography>Filters</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Button
                    fullWidth
                    sx={{marginBottom: "8px", marginTop: "2px"}}
                    startIcon={ <BackspaceTwoToneIcon/> }
                    onClick={ clearFilters }
                    color="secondary"
                    variant="contained">
                    Clear All Fields
                </Button>
                <Stack
                    direction={{xs: 'column', sm: 'row'}}
                    spacing={{xs: 0, sm: 2, md: 4}}
                    alignItems="center">
                    <Selector
                        handleSelection={handleGenreSelect}
                        label="Genres"
                        items={genres}
                        target="name"
                        value={genre.name}/>
                    <Selector
                        handleSelection={handleSortSelect}
                        label="Sort By"
                        items={sorts}
                        target="name"
                        value={sort.name}/>
                    <Selector
                        handleSelection={handleCertificationSelect}
                        label="Certifications" items={certifications}
                        target="certification"
                        value={certification.certification}/>
                    <IconSelector
                        handleSelection={handleWatchProviderSelect}
                        label="Watch On" items={watchProviderList}
                        target="provider_name"
                        value={watchProvider.provider_name}/>
                </Stack>
                <Stack
                    direction={{xs: 'column', sm: 'row'}}
                    spacing={{xs: 0, sm: 2, md: 4}}
                    alignItems="center">
                    <FormControl fullWidth>
                        <Autocomplete
                            sx={{marginBottom: "8px"}}
                            disablePortal
                            id="search-person"
                            options={generatePersonsOptions(persons)}
                            onInputChange={handlePersonQueryChange}
                            onChange={handlePersonSelect}
                            value={person.name}
                            renderInput={(params) => <TextField {...params} label="Search by person"/>}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <Autocomplete
                            disablePortal
                            id="search-movie"
                            sx={{marginBottom: "8px"}}
                            options={generateMoviesOptions(movieResults)}
                            onInputChange={handleMovieQueryChange}
                            onChange={handleMovieQueryChange}
                            value={movieQuery}
                            renderInput={(params) => <TextField {...params} label="Search by Movie Title"/>}
                        />
                    </FormControl>
                </Stack>
                <Stack direction={{xs: 'column', sm: 'row'}}
                       spacing={{xs: 1, sm: 2, md: 4}}
                       sx={{marginBottom: "32px"}}
                       alignItems="center">

                    {minYear}

                    <Slider
                        value={year}
                        aria-label="Set year"
                        defaultValue={0}
                        valueLabelDisplay="on"
                        onChange={handleYearSelect}
                        step={1}
                        min={minYear}
                        max={currentYear}/>

                    {currentYear}

                    <Stack alignItems="center">
                        <Typography variant="subtitle1">{ratingLabel}</Typography>
                        <Rating
                            onClick={handleRatingSelect}
                            name="rating-selector"
                            max={10}
                            value={rating}/>
                    </Stack>
                </Stack>
            </AccordionDetails>
        </Accordion>
    )
}

export default FilterBar