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
                background: "linear-gradient(45deg, #dfa3e6 30%, #ffffff 90%)",
                borderRadius: 3,
                border: 0,
                color: "black",
                height: 70,
                padding: "0 30px",
                boxShadow: "0 3px 5px 2px #7e5a82",
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
