import React, {useEffect, useState} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
import WatchProvs from "./WatchProvs";
import {useFilters} from "../context/FilterContext";

const Providers = ({providers}) => {
    const {watchProviderList} = useFilters()

    const [netflix, setNetflix] = useState(false)
    const [hulu, setHulu] = useState(false)
    const [hbo, setHbo] = useState(false)

    useEffect(()=> {
        if(providers["flatrate"] && providers["flatrate"].find(prov => prov.provider_id === watchProviderList[0].provider_id)){
            setNetflix(true)
        }
        if(providers["flatrate"] && providers["flatrate"].find(prov => prov.provider_id === watchProviderList[1].provider_id)){
            setHulu(true)
        }
        if(providers["flatrate"] && providers["flatrate"].find(prov => prov.provider_id === watchProviderList[2].provider_id)){
            setHbo(true)
        }
    }, [watchProviderList, providers])

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
                                    alt={watchProviderList[0].name}
                                    style={{marginLeft: "4px"}}
                                    width="23"
                                    src={`https://image.tmdb.org/t/p/w200${watchProviderList[1].logo_path}`}/>
                            }
                            { hbo &&
                                <img
                                    alt={watchProviderList[0].name}
                                    style={{marginLeft: "4px"}}
                                    width="23"
                                    src={`https://image.tmdb.org/t/p/w200${watchProviderList[2].logo_path}`}/>
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