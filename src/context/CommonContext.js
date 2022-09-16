import React from 'react'

const CommonContext = React.createContext()

export const CHANGE_TRAILER = 'changeTrailer';
export const SET_DISPLAY = 'setDisplay';

function snackBarReducer(state, action) {

    switch (action.type) {
        case 'changeSnack': {
            return {...state, snackBar: action.data}
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

function alertReducer(state, action) {

    switch (action.type) {
        case 'changeAlert': {
            return {...state, alert: action.data}
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

function trailerReducer(state, action) {
    console.log(state)
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

    const setSnackBar = (isOpen, message) => {
        const data = {isOpen, message}
        snackBarDispatch({ type: 'changeSnack', data })
    }
    const setAlert = (isOpen, message) => {
        const data = {isOpen, message}
        alertDispatch({ type: 'changeAlert', data })
    }
    const setTrailerData = (type, data) => {
        trailerDispatch({ type, data })
    }

    const [snackBarState, snackBarDispatch] =
        React.useReducer(snackBarReducer, {snackBar: {isOpen: false, message: ""}, setSnackBar})
    const [alertState, alertDispatch] =
        React.useReducer(alertReducer, {alert: {isOpen: false, message: ""}, setAlert})
    const [trailerState, trailerDispatch] =
        React.useReducer(trailerReducer, {isOpen: false, trailer: {name: "", key: ""} , setTrailerData})

    // NOTE: you *might* need to memoize this value
    // Learn more in http://kcd.im/optimize-context
    const value = {alertState, snackBarState, trailerState}
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