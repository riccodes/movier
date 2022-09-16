import * as React from 'react'
import {sorts} from "../util";

const FilterContext = React.createContext()

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

    // NOTE: you *might* need to memoize this value
    // Learn more in http://kcd.im/optimize-context
    const value = {certificationState, genreState, personState, ratingState, sortState, yearState}
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