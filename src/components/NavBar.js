import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuIcon from "@mui/icons-material/Menu";
import {
    AppBar,
    Avatar,
    Box,
    IconButton,
    Slide,
    Tab,
    Tabs,
    Toolbar,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import icon from "../assets/icon.png";

const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [selectedTab, setSelectedTab] = useState(location.pathname);
    const [toggle, setToggle] = useState(false);
    const [collapse, setCollapse] = useState(false);

    useEffect(() => {
        setSelectedTab(location.pathname);
    }, [location.pathname]);

    const handleMenuOpen = () => {
        if (collapse === true) {
            setTimeout(() => {
                setCollapse(false);
            }, 300);
        } else {
            setCollapse(true);
        }

        setToggle((toggle) => !toggle);
    };

    const handleTabChange = (event, newValue) => {
        navigate(newValue);
        handleMenuOpen();
    };

    const handleLogOut = () => {
        navigate("/auth");
    };

    return (
        <AppBar
            position="static"
            color="transparent"
            sx={{ boxShadow: 1, minWidth: "320px" }}
        >
            <Toolbar>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                    }}
                >
                    <Box sx={{ display: "flex" }}>
                        <Avatar
                            src={icon}
                            sx={{
                                width: 50,
                                height: 50,
                                WebkitFilter: "brightness(0)",
                                "&:hover": {
                                    transition: "transform 0.3s",
                                    transform: "scale(1.2)",
                                },
                            }}
                        />

                        <IconButton
                            size="large"
                            onClick={handleMenuOpen}
                            color="inherit"
                            sx={{
                                display: { xs: "flex", md: "none" },
                                "&:hover": {
                                    transition: "transform 0.4s",
                                    transform: "scale(1.2)",
                                },
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                    <Box
                        mt={2}
                        sx={{
                            display: { md: "flex", xs: "none" },
                        }}
                    >
                        <Tabs value={selectedTab} onChange={handleTabChange}>
                            <Tab value="/" label="Home" />
                            <Tab value="/transactions" label="Transactions" />
                        </Tabs>
                    </Box>

                    <IconButton
                        size="large"
                        onClick={handleLogOut}
                        sx={{
                            "&:hover": {
                                transition: "transform 0.4s",
                                transform: "scale(1.2)",
                            },
                        }}
                    >
                        <LogoutRoundedIcon fontSize="inherit" />
                    </IconButton>
                </Box>
            </Toolbar>
            {collapse && (
                <Box
                    mt={-6}
                    sx={{
                        display: { xs: "flex", md: "none" },
                        justifyContent: "center",
                    }}
                >
                    <Slide
                        in={toggle}
                        style={{ transformOrigin: "0 0 0" }}
                        {...(toggle ? { timeout: 500 } : {})}
                    >
                        <Tabs
                            value={selectedTab}
                            onChange={handleTabChange}
                            orientation="vertical"
                        >
                            <Tab value="/" label="Home" />
                            <Tab value="/wallets" label="Wallets" />
                            <Tab value="/transactions" label="Transactions" />
                            <Tab value="/categories" label="Categories" />
                        </Tabs>
                    </Slide>
                </Box>
            )}
        </AppBar>
    );
};
export default NavBar;
