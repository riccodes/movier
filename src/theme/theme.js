import {createTheme, experimental_sx as sx} from "@mui/material";

//fixme make this not garbage
export const getTheme = (palette, mode = "light") => createTheme({
    palette: {
        mode,
        ...(mode === 'light')
            ? {
                text: {
                    primary: "#333333",
                    secondary: "#666666"
                },
            }
            : {
                text: {
                    primary: "#eeeeee",
                    secondary: "#ccccccc"
                }
            },
        primary: {
            main: palette.primary
        },
        secondary: {
            main: palette.secondary
        },
        success: {
            main: palette.primary
        },
        info: {
            main: palette.info
        },
        error: {
            main: palette.error
        },
        // action : {
        //     active: palette.primary,
        //     hover: palette.hover,
        // },
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
