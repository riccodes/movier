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
                       selectedPerson,
                       selectedRating,
                       selectedSort,
                       setDisplayMessage,
                       setSelectedCertification,
                       setSelectedGenre,
                       setMovies,
                       setSelectedPerson,
                       setSelectedRating,
                       setSelectedSort,
                       setYear,
                       year
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
        tmdb.certifications.getMovieList(res => setCertifications(jsonify(res).certifications.US), handleError)
    }, [])

    const handleYearSelect = e => setYear(e.target.value)
    const handleGenreSelect = e => {
        const genre = genres.find(genre => genre.name === e.target.value)
        setSelectedGenre(genre)
    }
    const handleSortSelect = e => setSelectedSort(sorts.find(sort => sort.name === e.target.value))
    const handleCertificationSelect = e => setSelectedCertification(certifications.find(cert => cert.certification === e.target.value))
    const showWatchList = () => {
        setDisplayMessage(false, "")
        setMovies(watchList.state.movieList)
    }
    const handleQueryChange = (e, newValue) => {
        if (newValue?.length > 2) setPersonQuery(newValue)
    }
    const handlePersonSelect = (e, newValue) => {
        if (newValue)
            setSelectedPerson(persons.find(person => person.name === newValue))
    }
    const handleRatingSelect = e => {
        if (e) setSelectedRating(e.target.value)
    }
    const clearFilters = () => {
        setSelectedPerson("")
        setSelectedCertification("")
        setSelectedGenre("")
        setSelectedRating(0)
        setSelectedSort(sorts.find(sort => sort.key === "pop.desc"))
        setYear("")
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
                <Button fullWidth onClick={clearFilters}>Clear</Button>
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
                            value={selectedPerson.name}
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
                        <Typography variant="subtitle1">Minimum Rating</Typography>
                        <Rating
                            onClick={handleRatingSelect}
                            name="rating-selector"
                            max={10}
                            value={selectedRating}/>
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