import React from "react";
import {Accordion, AccordionDetails, AccordionSummary, CardContent, Typography} from "@mui/material";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
import WatchProvs from "./WatchProvs";

const Providers = ({providers}) => {
    if (providers) {

        let totalProviders = 0
        if (providers["rent"]) totalProviders += providers["rent"].length
        if (providers["free"]) totalProviders += providers["free"].length
        if (providers["flatrate"]) totalProviders += providers["flatrate"].length

        if (totalProviders > 0) {
            return (
                <CardContent>
                    <Accordion variant="outlined" elevation={0}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreTwoToneIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography variant="caption">Where to watch [{totalProviders}]</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <WatchProvs provs={providers["free"]} label="Free"/>
                            <WatchProvs provs={providers["flatrate"]} label="Streaming"/>
                            <WatchProvs provs={providers["rent"]} label="Rent"/>
                        </AccordionDetails>
                    </Accordion>
                </CardContent>
            )
        }
    }

    return <div/>
}

export default Providers