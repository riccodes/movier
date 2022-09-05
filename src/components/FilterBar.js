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
import Selector from "./Selector";
import {currentYear, generatePersonsOptions, handleError, handleSuccess, jsonify, minYear, sorts} from "../util";
import GradeTwoToneIcon from "@mui/icons-material/GradeTwoTone";
import {useWatchList} from "../context/WatchListContext";
import tmdb from "themoviedb-javascript-library";

const FilterBar = ({
                       selectedCertification,
                       selectedGenre,
                       selectedSort,
                       setSelectedCertification,
                       setSelectedGenre,
                       setMovies,
                       setSelectedPerson,
                       setSelectedRating,
                       setSelectedSort,
                       setYear
                   }) => {

    const watchList = useWatchList()

    const [persons, setPersons] = useState([])
    const [personQuery, setPersonQuery] = useState()
    const [genres, setGenres] = useState([])
    const [certifications, setCertifications] = useState([])

    useEffect(() => {
        tmdb.search.getPerson({query: personQuery}, res => handleSuccess(res, "results", setPersons), handleError)
    }, [personQuery])

    useEffect(() => {
        tmdb.genres.getMovieList({}, res => handleSuccess(res, "genres", setGenres), handleError)
        tmdb.certifications.getMovieList((response) => setCertifications(jsonify(response).certifications.US), handleError)
    }, [])

    const handleYearSelect = newValue => setYear(newValue)
    const handleGenreSelect = e => {
        const genre = genres.find(genre => genre.name === e.target.value)
        setSelectedGenre(genre)
    }
    const handleSortSelect = e => setSelectedSort(sorts.find(sort => sort.name === e.target.value))
    const handleCertificationSelect = e => setSelectedCertification(certifications.find(cert => cert.certification === e.target.value))
    const showWatchList = () => {
        const {state} = watchList
        setMovies(state.movieList)
    }
    const handleQueryChange = e => {
        const val = e.target.value

        if (val?.length > 1) setPersonQuery(val)
    }
    const handlePersonSelect = (e, newValue) => {
        if (newValue)
            setSelectedPerson(persons.find(person => person.name === newValue))
    }
    const handleRatingSelect = e => {
        if (e) setSelectedRating(e.target.value)
    }

    return (
        <Accordion defaultExpanded square sx={{marginBottom: "16px"}} elevation={6}>
            <AccordionSummary
                expandIcon={<ExpandMoreTwoToneIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <FilterAltTwoToneIcon color="action"/>
                <Typography>
                    Filters
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Stack
                    direction={{xs: 'column', sm: 'row'}}
                    spacing={{xs: 0, sm: 2, md: 4}}
                    alignItems="center">
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
                </Stack>
                <Stack
                    sx={{marginBottom: "8px"}}
                    direction={{xs: 'column', sm: 'row'}}
                    spacing={{xs: 0, sm: 2, md: 4}}
                    alignItems="center">
                    <FormControl fullWidth>
                        <Autocomplete
                            disablePortal
                            id="search-person"
                            options={generatePersonsOptions(persons)}
                            onInputChange={handleQueryChange}
                            onChange={handlePersonSelect}
                            renderInput={(params) => <TextField {...params} label="Search by person"/>}
                        />
                    </FormControl>
                </Stack>
                <Stack direction={{xs: 'column', sm: 'row'}}
                       spacing={{xs: 1, sm: 2, md: 4}}
                       sx={{marginBottom: "32px"}}
                       alignItems="center">

                    {minYear}

                    <Slider
                        aria-label="Set year"
                        defaultValue={0}
                        valueLabelDisplay="on"
                        onChangeCommitted={(_, newValue) => handleYearSelect(newValue)}
                        step={1}
                        min={minYear}
                        max={currentYear}/>

                    {currentYear}

                    <Stack alignItems="center">
                        <Typography variant="subtitle1">Minimum Rating</Typography>
                        <Rating
                            onClick={handleRatingSelect}
                            name="rating-selector"
                            defaultValue={0}
                            max={10}/>
                    </Stack>
                </Stack>
                <Button
                    fullWidth
                    startIcon={<GradeTwoToneIcon/>}
                    variant="outlined"
                    onClick={showWatchList}>
                    View Watch List
                </Button>
            </AccordionDetails>
        </Accordion>
    )
}

export default FilterBar