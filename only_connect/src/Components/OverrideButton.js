import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const theme = createMuiTheme({
    overrides: {
        // Style sheet name ⚛️
        MuiButton: {
            // Name of the rule
            text: {
                // Some CSS
                background: "#F3F0EF",
                borderRadius: 3,
                border: 0,
                color: "#1D2036",
                height: 70,
                padding: "0 30px",
                boxShadow: "0 3px 5px 2px #000000",
                width: 250,
                fontSize: "x-large",
            },
        },
    },
});

function OverridesCss(props) {
    return (
        <ThemeProvider theme={theme}>
            <Button onClick={props.onClick}>{props.children}</Button>
        </ThemeProvider>
    );
}

export default OverridesCss;
