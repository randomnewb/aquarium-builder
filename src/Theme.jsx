import createMuiTheme from "@material-ui/core";

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#2C5F2D",
        },
        secondary: {
            main: "#97BC62",
        },
    },

    typography: {
        fontFamily: "Times New Roman",
        fontSize: 15,
        h1: {
            // incase h1 needs to have a separate fontFamily
            fontFamily: "Roboto",
            fontSize: 15,
        },
    },

    shape: {
        borderRadius: 0,
    },
});
