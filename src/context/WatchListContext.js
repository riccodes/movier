import * as React from 'react'

const WatchListContext = React.createContext()

function watchListReducer(state, action) {
    switch (action.type) {
        case 'save': {
            return {movieList: [...state.movieList, action.data]}
        }
        //TODO-FIX test this functionad
        case 'delete': {
            return {movieList: state.movieList.filter(m => m.id !== action.data.id)}
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

function WatchListProvider({children}) {
    const [state, dispatch] = React.useReducer(watchListReducer, {movieList: []})
    // NOTE: you *might* need to memoize this value
    // Learn more in http://kcd.im/optimize-context
    const value = {state, dispatch}
    return <WatchListContext.Provider value={value}>{children}</WatchListContext.Provider>
}

function useWatchList() {
    const context = React.useContext(WatchListContext)
    if (context === undefined) {
        throw new Error('useWatchList must be used within a WatchListProvider')
    }
    return context
}

export {WatchListProvider, useWatchList}