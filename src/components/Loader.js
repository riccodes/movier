import React from "react";
import {Skeleton, Stack} from "@mui/material";
import MovieCard from "./MovieCard";
import {mockMovie} from "../util/Constants";
import {useCommon} from "../context/CommonContext";
import {getRandom} from "../util";

const Loader = ({children}) => {

    const skets = ["", "", "", "", ""]
    const {loading} = useCommon()

    return loading
        ?
        <Stack spacing={{xs: 1, sm: 2, md: 3}} direction={{xs: "column", sm: "row", md: "row"}}>
            {
                skets.map(() => (
                    <Skeleton key={getRandom()} animation="wave" variant="rectangular">
                        <MovieCard movie={mockMovie}/>
                    </Skeleton>
                ))
            }
        </Stack>
        :
        children

}

export default Loader