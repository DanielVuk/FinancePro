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
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import icon from "../assets/icon.png";
import { Context, initialState } from "../Store";
import GetIcon from "./GetIcon";

const NavBar = () => {
    const [state, setState] = useContext(Context);
    const navigate = useNavigate();
    const location = useLocation();

    const [selectedTab, setSelectedTab] = useState(
        location.pathname !== "/auth" ? location.pathname : "/"
    );
    const [toggle, setToggle] = useState(false);
    const [collapse, setCollapse] = useState(false);

    useEffect(() => {
        if (location.pathname !== "/auth") setSelectedTab(location.pathname);
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

    const handleLogOut = async () => {
        setState(initialState);
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
                            <GetIcon iconName="menu" color="primary.main" />
                        </IconButton>
                    </Box>
                    <Box
                        mt={2}
                        sx={{ visibility: { md: "visible", xs: "hidden" } }}
                    >
                        <Tabs value={selectedTab} onChange={handleTabChange}>
                            <Tab value="/" label="Home" />
                            <Tab value="/transactions" label="Transactions" />
                            <Tab value="/analytics" label="Analytics" />
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
                        <GetIcon iconName="exit" color="primary.main" />
                    </IconButton>
                </Box>
            </Toolbar>
            {collapse && (
                <Box
                    mt={-6}
                    sx={{
                        visibility: { md: "hidden", xs: "visible" },
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Slide in={toggle} timeout={toggle ? 500 : 0}>
                        <Tabs
                            value={selectedTab}
                            onChange={handleTabChange}
                            orientation={
                                window.innerWidth < 900
                                    ? "vertical"
                                    : "horizontal"
                            }
                        >
                            <Tab value="/" label="Home" />
                            <Tab value="/transactions" label="Transactions" />
                            <Tab value="/analytics" label="Analytics" />
                        </Tabs>
                    </Slide>
                </Box>
            )}
        </AppBar>
    );
};
export default NavBar;
