import * as React from 'react'

const FilterContext = React.createContext()

function yearReducer(state = [], action) {

    switch (action.type) {
        case 'setYear': {
            return {...state, year:action.data}
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

function ratingReducer(state = [], action) {

    switch (action.type) {
        case 'setRating': {
            return {...state, rating:action.data}
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

function FilterProvider({children}) {

    const setYear = year => {
        dispatch({type: 'setYear', data: year})
    }
    const setRating = rating => {
        ratingDispatch({type: 'setRating', data: rating})
    }
    const [yearState, dispatch] = React.useReducer(yearReducer, {year : 0, setYear: setYear})
    const [ratingState, ratingDispatch] = React.useReducer(ratingReducer, {rating : "", setRating: setRating})

    // NOTE: you *might* need to memoize this value
    // Learn more in http://kcd.im/optimize-context
    const value = {ratingState, yearState}
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