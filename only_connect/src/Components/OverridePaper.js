import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const theme = createMuiTheme({
    overrides: {
        // Style sheet name ⚛️
        MuiPaper: {
            // Name of the rule
            background: {
                // Some CSS
                background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                borderRadius: 3,
                border: 0,
                color: "white",
                height: 48,
                padding: "0 30px",
                boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
            },
        },
    },
});

function OverridePaper(props) {
    return (
        <ThemeProvider theme={theme}>
            <Paper elevation={3}>{props.children}</Paper>
        </ThemeProvider>
    );
}

export default OverridePaper;
