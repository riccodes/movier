import * as React from 'react'
import {sorts} from "../util";
import {useState} from "react";

const FilterContext = React.createContext()

const watchProviderList = [
    {
        "logo_path": "/t2yyOv40HZeVlLjYsCsPHnWLk4W.jpg",
        "provider_name": "Netflix",
        "provider_id": 8
    },
    {
        "logo_path": "/zxrVdFjIjLqkfnwyghnfywTn3Lh.jpg",
        "provider_name": "Hulu",
        "provider_id": 15
    },
    {
        "logo_path": "/Ajqyt5aNxNGjmF9uOfxArGrdf3X.jpg",
        "provider_name": "HBO Max",
        "provider_id": 384
    },
    {
        "logo_path": "/emthp39XA2YScoYL1p0sdbAH2WA.jpg",
        "provider_name": "Amazon Prime Video",
        "provider_id": 9
    },
    {
        "logo_path": "/7rwgEs15tFwyR9NPQ5vpzxTj19Q.jpg",
        "provider_name": "Disney Plus",
        "provider_id": 337
    },
    {
        "logo_path": "/oIkQkEkwfmcG7IGpRR1NB8frZZM.jpg",
        "provider_name": "YouTube",
        "provider_id": 192
    },
    {
        "logo_path": "/jPXksae158ukMLFhhlNvzsvaEyt.jpg",
        "provider_name": "fuboTV",
        "provider_id": 257
    },
    {
        "logo_path": "/8VCV78prwd9QzZnEm0ReO6bERDa.jpg",
        "provider_name": "Peacock",
        "provider_id": 386
    },
    {
        "logo_path": "/tbEdFQDwx5LEVr8WpSeXQSIirVq.jpg",
        "provider_name": "Google Play Movies",
        "provider_id": 3
    },
    {
        "logo_path": "/z0h7mBHwm5KfMB2MKeoQDD2ngEZ.jpg",
        "provider_name": "The Roku Channel",
        "provider_id": 207
    }
]

//fixme remove all these reducers
function certificationReducer(state, action) {

    switch (action.type) {
        case 'setCert': {
            return {...state, certification: action.data}
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

function genreReducer(state, action) {

    switch (action.type) {
        case 'setGenre': {
            return {...state, genre:action.data}
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

function personReducer (state, action) {

    switch (action.type) {
        case 'setPerson': {
            return {...state, person:action.data}
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

function ratingReducer(state, action) {

    switch (action.type) {
        case 'setRating': {
            return {...state, rating:action.data}
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

function sortReducer(state, action) {

    switch (action.type) {
        case 'setSort': {
            return {...state, sort: action.data}
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

function yearReducer(state, action) {

    switch (action.type) {
        case 'setYear': {
            return {...state, year:action.data}
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

function FilterProvider({children}) {

    const setCertification = cert => {
        certificationDispatch({type: 'setCert', data: cert})
    }
    const setGenre = genre => {
        genreDispatch({type: 'setGenre', data: genre})
    }
    const setPerson = person => {
        personDispatch({type: 'setPerson', data: person})
    }
    const setRating = rating => {
        ratingDispatch({type: 'setRating', data: rating})
    }
    const setSort = sort => {
        sortDispatch({type: 'setSort', data: sort})
    }
    const setYear = year => {
        yearDispatch({type: 'setYear', data: year})
    }
    const [certificationState, certificationDispatch] = React.useReducer(certificationReducer, {certification: {certification: ""}, setCertification: setCertification})
    const [genreState, genreDispatch] = React.useReducer(genreReducer, {genre: {name : ""}, setGenre: setGenre})
    const [personState, personDispatch] = React.useReducer(personReducer, {person: {id: "", name: ""}, setPerson: setPerson})
    const [ratingState, ratingDispatch] = React.useReducer(ratingReducer, {rating : "", setRating: setRating})
    const [sortState, sortDispatch] = React.useReducer(sortReducer, {sort: sorts.find(sort => sort.key === "pop.desc"), setSort: setSort})
    const [yearState, yearDispatch] = React.useReducer(yearReducer, {year : 0, setYear: setYear})

    //fixme CHANGE ALL ATTRIBUTES TO THIS FORMAT
    const [watchProvider, setWatchProvider] = useState({provider_name: ""})

    // NOTE: you *might* need to memoize this value
    // Learn more in http://kcd.im/optimize-context
    const value = {certificationState, genreState, personState, ratingState, sortState, yearState, watchProvider, setWatchProvider, watchProviderList}
    return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}

function useFilters() {
    const context = React.useContext(FilterContext)
    if (context === undefined) {
        throw new Error('useFilters must be used within a FilterProvider')
    }
    return context
}

export {FilterProvider, useFilters}