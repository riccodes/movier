import React, {useState} from 'react'

const CommonContext = React.createContext()

export const CHANGE_TRAILER = 'changeTrailer';
export const SET_DISPLAY = 'setDisplay';

function trailerReducer(state, action) {

    switch (action.type) {
        case CHANGE_TRAILER: {
            return {...state,  trailer: action.data }
        }
        case SET_DISPLAY: {
            return {...state, isOpen: action.data  }
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

function CommonProvider({children}) {

    const setTrailerData = (type, data) => {
        trailerDispatch({ type, data })
    }

    const [snackBar, setSnackBar] = useState({isOpen: false, message: ""})
    //TODO-FIX add dynamic color
    const [alert, setAlert] = useState({isOpen: false, message: ""})
    const [recommendation, setRecommendation] = useState()

    const [trailerState, trailerDispatch] =
        React.useReducer(trailerReducer, {isOpen: false, trailer: {name: "", key: ""} , setTrailerData})

    // NOTE: you *might* need to memoize this value
    // Learn more in http://kcd.im/optimize-context
    const value = {alert, setAlert, snackBar, setSnackBar, recommendation, setRecommendation, trailerState}
    return <CommonContext.Provider value={value}>{children}</CommonContext.Provider>
}

function useCommon() {
    const context = React.useContext(CommonContext)
    if (context === undefined) {
        throw new Error('useCommon must be used within a CommonProvider')
    }
    return context
}

export {CommonProvider, useCommon}