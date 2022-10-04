
export const themeList = [
    {id:"candy", name:"candy"},
    {id:"ice", name:"ice"},
    {id:"mintCoffee", name:"mint coffee"},
    {id:"scholar", name:"scholar"},
    {id:"bloodOrange", name:"blood orange"}
]

export const getPalette = id => {
    switch (id){
        case "candy": return candy
        case "ice": return ice
        case "mintCoffee": return mintCoffee
        case "scholar": return scholar
        case "bloodOrange": return bloodOrange

        default: return candy
    }
}

export const candy = {
    primary : "#EF476F",
    secondary : "#26547C",
    error : "#C73E1D",
    info : "#FFD166",
    hover : "#FDECF0"
}

export const ice = {
    primary : "#0077b6",
    secondary : "#90E0EF",
    error : "#601700",
    info : "#601700",
    hover : "#EDFAFD"
}

export const mintCoffee = {
    primary : "#11C229",
    secondary : "#503302",
    error : "#A31818",
    info : "#F2A929",
    hover : "#ECFDEF"
}

export const scholar = {
    primary : "#23967F",
    secondary : "#14213E",
    error : "#A44A3F",
    info : "#FCA311",
    hover : "#EEFBF9"
}

export const bloodOrange = {
    primary : "#AD2831",
    secondary : "#F57606",
    error : "#79151C",
    info : "#404E4F",
    hover : "#FBEEEF"
}
