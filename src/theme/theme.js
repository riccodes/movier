import {createTheme} from "@mui/material";
import {mintCoffee} from "./palettes";

export const {info} = mintCoffee
const {hover, primary, secondary, error} = mintCoffee

export const theme = createTheme({
    palette: {
        primary: {
            main: primary,
            contrastText: "#ffffff"
        },
        secondary: {
            main: secondary
        },
        success : {
            main : primary
        },
        info: {
            main: info,
            contrastText: secondary
        },
        error:{
            main: error
        },
        action : {
            active: primary,
            hover,
        },
        text : {
            primary: "#333333",
            secondary: "#666666"
        },
    }
});
