import React, {useCallback, useEffect, useState} from "react";
import _ from "lodash";

const ScrollContext = React.createContext()

function ScrollProvider ({ children })  {

    const [y, setY] = useState(window.scrollY)
    const [isShowFab, setIsShowFab] = useState(false)
    const [isShowNav, setIsShowNav] = useState(true)

    const handleScroll = useCallback(e => {
            const window = e.currentTarget;

            if (y > window.scrollY) {
                setIsShowFab(true)
            } else if (y < window.scrollY) {
                setIsShowFab(false)
                setIsShowNav(false)
            }

            setY(window.scrollY)
        }, [y]
    )

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)

        return () => {
            window.addEventListener("scroll", _.debounce(() => {
                setIsShowFab(false)
                setIsShowNav(true)
            }, 2000))
        }
    }, [y, handleScroll])

    const value = {isShowFab, isShowNav}

    return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
}

function useScroll() {
    const context = React.useContext(ScrollContext)
    if (context === undefined) {
        throw new Error('useScroll must be used within a ScrollProvider')
    }
    return context
}

export {ScrollProvider, useScroll}
