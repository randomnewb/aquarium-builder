import { blue } from "@mui/material/colors";

const defaultTheme = {
    components: {
        MuiPaper: {
            defaultProps: {
                style: {
                    backgroundColor: "#0F506E",
                    color: "#FFFFFF",
                    padding: 30,
                },
            },
        },
        MuiOutlinedInput: {
            defaultProps: {
                style: {
                    color: "#000000",
                },
            },
        },
        MuiInputLabel: {
            defaultProps: {
                style: {
                    color: "#000000",
                },
            },
        },
        MuiTypography: {
            defaultProps: {},
            variants: [
                {
                    props: { variant: "header" },
                    style: {
                        fontSize: "25px",
                        padding: 50,
                    },
                },
            ],
        },
        MuiButton: {
            defaultProps: {},
            variants: [
                {
                    props: { variant: "card" },
                    style: {
                        maxWidth: "150px",
                        maxHeight: "100px",
                        minWidth: "150px",
                        minHeight: "75px",
                        fontSize: "25px",
                        textTransform: "none",
                        backgroundColor: "#EAB06E",
                        color: "#000000",
                        "&:hover": {
                            backgroundColor: "#F2DDA6",
                            color: "black",
                        },
                    },
                },
                {
                    props: { variant: "action" },
                    style: {
                        maxWidth: "400px",
                        maxHeight: "100px",
                        minWidth: "300px",
                        minHeight: "75px",
                        fontSize: "25px",
                        textTransform: "none",
                        backgroundColor: "#EAB06E",
                        color: "#000000",
                        "&:hover": {
                            backgroundColor: "#F2DDA6",
                            color: "black",
                        },
                    },
                },
                {
                    props: { variant: "list" },
                    style: {
                        textTransform: "none",
                        backgroundColor: "#EAB06E",
                        color: "black",
                        "&:hover": {
                            backgroundColor: "#F2DDA6",
                            color: "black",
                        },
                    },
                },
            ],
        },
    },
};

export default defaultTheme;
