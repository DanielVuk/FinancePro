import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
    AppBar,
    Toolbar,
    Avatar,
    Tab,
    Tabs,
    IconButton,
    Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import icon from "../assets/icon.png";

const NavBar = () => {
    const location = useLocation();
    let navigate = useNavigate();

    const [selectedTab, setSelectedTab] = useState(location.pathname);

    useEffect(() => {
        const setTab = () => {
            setSelectedTab(location.pathname);
        };
        setTab();
    }, []);

    const handleMenuOpen = () => {};

    const handelTabChange = (event, newValue) => {
        navigate(newValue);
        setSelectedTab(newValue);
    };

    return (
        <AppBar position="static" color="transparent" sx={{ boxShadow: 1 }}>
            <Toolbar>
                <Box
                    component="div"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                    }}
                >
                    <Box component="div" sx={{ display: "flex" }}>
                        <Avatar
                            src={icon}
                            sx={{
                                width: 50,
                                height: 50,
                                WebkitFilter: "brightness(0)",
                            }}
                        />
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenuOpen}
                            color="inherit"
                            sx={{
                                display: { xs: "flex", md: "none" },
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                    <Box
                        component="div"
                        mt={2}
                        sx={{
                            display: { md: "flex", xs: "none" },
                        }}
                    >
                        <Tabs value={selectedTab} onChange={handelTabChange}>
                            <Tab value="/" label="Home" />
                            <Tab value="/wallets" label="Wallets" />
                            <Tab value="/transactions" label="Transactions" />
                            <Tab value="/categories" label="Categories" />
                        </Tabs>
                    </Box>

                    <IconButton size="large">
                        <LogoutRoundedIcon fontSize="inherit" />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
