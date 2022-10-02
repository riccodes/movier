import {createTheme, experimental_sx as sx} from "@mui/material";

export const getTheme = palette => createTheme({
    palette: {
        // mode: 'dark',
        primary: {
            main: palette.primary,
            contrastText: "#ffffff"
        },
        secondary: {
            main: palette.secondary
        },
        success : {
            main : palette.primary
        },
        info: {
            main: palette.info,
            contrastText: palette.secondary
        },
        error:{
            main: palette.error
        },
        action : {
            active: palette.primary,
            hover: palette.hover,
        },
        text : {
            primary: "#333333",
            secondary: "#666666"
        },
    },
    components: {
        MuiRating: {
            styleOverrides: {
                root: sx({
                    color: palette.secondary
                })
            }
        }
    }
});
