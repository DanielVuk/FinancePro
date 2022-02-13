import ReactDOM from "react-dom";

import { CssBaseline, ThemeProvider } from "@mui/material";

import App from "./App";
import { AppTheme } from "./AppTheme";

ReactDOM.render(
    <ThemeProvider theme={AppTheme}>
        <CssBaseline />
        <App />
    </ThemeProvider>,
    document.getElementById("root")
);
