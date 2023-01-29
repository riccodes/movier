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
        "logo_path": "/c7nw5oRfx5iZfyX0QmtOK0pbVaJ.jpg",
        "provider_name": "Epix",
        "provider_id": 34
    },
    {
        "logo_path": "/eWp5LdR4p4uKL0wACBBXapDV2lB.jpg",
        "provider_name": "Starz",
        "provider_id": 43
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

function FilterProvider({children}) {

    const [genre, setGenre] = useState({genre: {name : ""}})
    const [sort, setSort] = useState(sorts.find(sort => sort.key === "pop.desc"))
    const [rating, setRating] = useState(0)
    const [year, setYear] = useState(0)
    const [person, setPerson] = useState({person: {id: "", name: ""}})
    const [watchProvider, setWatchProvider] = useState({provider_name: ""})
    const [certification, setCertification] = useState({certification: {certification: ""}})

    const value = {
        certification, setCertification,
        genre, setGenre,
        person, setPerson,
        rating, setRating,
        sort, setSort,
        year, setYear,
        watchProvider, setWatchProvider,
        watchProviderList
    }
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