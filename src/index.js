import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";

import NavBar from "./components/NavBar";
import Wallets from "./pages/Wallets";
import Transactions from "./pages/Transactions";
import Categories from "./pages/Categories";
import NotFound from "./pages/NotFound";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppTheme } from "./AppTheme";

ReactDOM.render(
    <ThemeProvider theme={AppTheme}>
        <React.StrictMode>
            <CssBaseline />
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/wallets" element={<Wallets />} />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    </ThemeProvider>,
    document.getElementById("root")
);
