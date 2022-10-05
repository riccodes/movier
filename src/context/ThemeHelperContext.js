import * as React from 'react'
import {useEffect, useState} from "react";
import Cookies from "universal-cookie";
import {candy, getPalette} from "../theme/palettes";
import {getTheme} from "../theme/theme";

const ThemeHelperContext = React.createContext()

function ThemeHelperProvider({children}) {

    const cookies = new Cookies();

    const [palette, setPalette] = useState(candy)
    const [themeMode, setThemeMode] = useState("light")

    cookies.addChangeListener(cookie => {
        if(cookie.name === "theme"){
            setPalette(getPalette(cookies.get('theme')))
        }

        if(cookie.name === "themeMode"){
            setThemeMode(cookies.get("themeMode"))
        }
    })

    useEffect(()=> {
        if(cookies.get("theme") !== null) {
            setPalette(getPalette(cookies.get('theme')))
        }

        if(cookies.get("themeMode") !== null && cookies.get("themeMode") !== undefined) {
            setThemeMode(cookies.get("themeMode"))
        }

    }, [palette, themeMode])

    const setThemeOnCookie = (e) => {
        cookies.set('theme', e.target.value, {path: '/'})
    }

    const toggleThemeMode = () => {
        const mode = themeMode === "light" ? "dark" : "light"
        cookies.set('themeMode', mode, {path: '/'})
    }

    const theme = getTheme(palette, themeMode)

    const value = {
        cookies,
        palette,
        setPalette,
        themeMode,
        setThemeMode,
        theme,
        toggleThemeMode,
        setThemeOnCookie
    }
    return <ThemeHelperContext.Provider value={value}>{children}</ThemeHelperContext.Provider>
}

function useThemeHelper() {
    const context = React.useContext(ThemeHelperContext)
    if (context === undefined) {
        throw new Error('useThemeHelper must be used within a ThemeHelperProvider')
    }
    return context
}

export {ThemeHelperProvider, useThemeHelper}