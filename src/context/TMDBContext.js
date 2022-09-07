import * as React from 'react'

const TMDBContext = React.createContext()

//TODO-ADD: persist watchlist across sessions
function TMDBReducer(state, action) {
    switch (action.type) {
        case 'save': {
            return {movieList: [...state.movieList, action.data]}
        }
        case 'delete': {
            return {movieList: state.movieList.filter(m => m.id !== action.data.id)}
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

function TMDBProvider({children}) {
    const [state, dispatch] = React.useReducer(TMDBReducer, {movieList: []})
    // NOTE: you *might* need to memoize this value
    // Learn more in http://kcd.im/optimize-context
    const value = {state, dispatch}
    return <TMDBContext.Provider value={value}>{children}</TMDBContext.Provider>
}

function useTMDB() {
    const context = React.useContext(TMDBContext)
    if (context === undefined) {
        throw new Error('useWatchList must be used within a WatchListProvider')
    }
    return context
}

export {TMDBProvider, useTMDB}