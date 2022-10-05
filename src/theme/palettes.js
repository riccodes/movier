
export const themeList = [
    {id:"candy", name:"candy"},
    {id:"ice", name:"ice"},
    {id:"mintCoffee", name:"mint coffee"},
    {id:"scholar", name:"scholar"},
    {id:"bloodOrange", name:"blood orange"},
    {id:"nebula", name:"nebula"}
]

export const getPalette = id => {
    switch (id){
        case "candy": return candy
        case "ice": return ice
        case "mintCoffee": return mintCoffee
        case "scholar": return scholar
        case "bloodOrange": return bloodOrange
        case "nebula": return nebula

        default: return candy
    }
}

export const ice = {
    name: "ice",
    primary : "#0077b6",
    secondary : "#90E0EF",
    error : "#E97286",
    info : "#FF7247",
    hover : "#EDFAFD"
}

export const candy = {
    name: "candy",
    primary : "#F0567A",
    secondary : "#26547C",
    error : "#E87A5E",
    info : "#F4F750",
    hover : "#FDECF0"
}

export const scholar = {
    name: "scholar",
    primary : "#23967F",
    secondary : "#32539A",
    error : "#A44A3F",
    info : "#FCA311",
    hover : "#EEFBF9"
}

export const mintCoffee = {
    name: "mint coffee",
    primary : "#11C229",
    secondary : "#754806",
    error : "#DF2A2A",
    info : "#F2A929",
    hover : "#ECFDEF"
}

export const bloodOrange = {
    name: "blood orange",
    primary : "#D03943",
    secondary : "#EF7306",
    error : "#79151C",
    info : "#404E4F",
    hover : "#FBEEEF"
}

export const nebula = {
    name: "nebula",
    primary : "#543285",
    secondary : "#C841BF",
    error : "#A52927",
    info : "#B8874B",
    hover : "#FBEEEF"
}
