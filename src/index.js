import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Store } from "./Store";

import App from "./App";
import { AppTheme } from "./AppTheme";

ReactDOM.render(
    //<React.StrictMode>
    <ThemeProvider theme={AppTheme}>
        <CssBaseline />
        <BrowserRouter>
            <Store>
                <App />
            </Store>
        </BrowserRouter>
    </ThemeProvider>,
    //</React.StrictMode>,
    document.getElementById("root")
);
