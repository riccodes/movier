import React, {useEffect, useState} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
import WatchProvs from "./WatchProvs";
import {useFilters} from "../context/FilterContext";

const Providers = ({ providers }) => {
    const {watchProviderList} = useFilters()

    const [netflix, setNetflix] = useState(false)
    const [hulu, setHulu] = useState(false)
    const [hbo, setHbo] = useState(false)
    const [amazonVideo, setAmazonVideo] = useState(false)
    const [disney, setDisney] = useState(false)
    const [epix, setEpix] = useState(false)
    const [starz, setStarz] = useState(false)

    useEffect(()=> {
        if(providers){
            if(providers["flatrate"]
                && providers["flatrate"].find(prov => prov.provider_id === watchProviderList[0].provider_id)){
                setNetflix(true)
            }
            if(providers["flatrate"]
                && providers["flatrate"].find(prov => prov.provider_id === watchProviderList[1].provider_id)){
                setHulu(true)
            }
            if(providers["flatrate"]
                && providers["flatrate"].find(prov => prov.provider_id === watchProviderList[2].provider_id)){
                setHbo(true)
            }
            if(providers["flatrate"]
                && providers["flatrate"].find(prov => prov.provider_id === watchProviderList[3].provider_id)){
                setAmazonVideo(true)
            }
            if(providers["flatrate"]
                && providers["flatrate"].find(prov => prov.provider_id === watchProviderList[4].provider_id)){
                setDisney(true)
            }
            if(providers["flatrate"]
                && providers["flatrate"].find(prov => prov.provider_id === watchProviderList[5].provider_id)){
                setEpix(true)
            }
            if(providers["flatrate"]
                && providers["flatrate"].find(prov => prov.provider_id === watchProviderList[6].provider_id)){
                setStarz(true)
            }
        }
    }, [providers])

    if (providers) {

        let totalProviders = 0
        if (providers["rent"]) totalProviders += providers["rent"].length
        if (providers["free"]) totalProviders += providers["free"].length
        if (providers["flatrate"]) totalProviders += providers["flatrate"].length

        if (totalProviders > 0) {
            return (
                    <Accordion elevation={0}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreTwoToneIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography variant="body2">Where to watch [{totalProviders}]</Typography>
                            { netflix &&
                                <img
                                    alt={watchProviderList[0].name}
                                    style={{marginLeft: "4px"}}
                                    width="23"
                                    src={`https://image.tmdb.org/t/p/w200${watchProviderList[0].logo_path}`}/>
                            }
                            { hulu &&
                                <img
                                    alt={watchProviderList[1].name}
                                    style={{marginLeft: "4px"}}
                                    width="23"
                                    src={`https://image.tmdb.org/t/p/w200${watchProviderList[1].logo_path}`}/>
                            }
                            { hbo &&
                                <img
                                    alt={watchProviderList[2].name}
                                    style={{marginLeft: "4px"}}
                                    width="23"
                                    src={`https://image.tmdb.org/t/p/w200${watchProviderList[2].logo_path}`}/>
                            }
                            { amazonVideo &&
                                <img
                                    alt={watchProviderList[3].name}
                                    style={{marginLeft: "4px"}}
                                    width="23"
                                    src={`https://image.tmdb.org/t/p/w200${watchProviderList[3].logo_path}`}/>
                            }
                            { disney &&
                                <img
                                    alt={watchProviderList[4].name}
                                    style={{marginLeft: "4px"}}
                                    width="23"
                                    src={`https://image.tmdb.org/t/p/w200${watchProviderList[4].logo_path}`}/>
                            }
                            { epix &&
                                <img
                                    alt={watchProviderList[5].name}
                                    style={{marginLeft: "4px"}}
                                    width="23"
                                    src={`https://image.tmdb.org/t/p/w200${watchProviderList[5].logo_path}`}/>
                            }
                            { starz &&
                                <img
                                    alt={watchProviderList[6].name}
                                    style={{marginLeft: "4px"}}
                                    width="23"
                                    src={`https://image.tmdb.org/t/p/w200${watchProviderList[6].logo_path}`}/>
                            }
                        </AccordionSummary>
                        <AccordionDetails>
                            <WatchProvs provs={providers["free"]} label="Free"/>
                            <WatchProvs provs={providers["flatrate"]} label="Streaming"/>
                            <WatchProvs provs={providers["rent"]} label="Rent"/>
                        </AccordionDetails>
                    </Accordion>
            )
        }
    }

    return <div/>
}

export default Providers