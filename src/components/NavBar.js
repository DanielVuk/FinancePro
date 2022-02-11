import { React, useState, useEffect } from "react";
import { AppBar, Toolbar, Avatar, Tab, Tabs } from "@mui/material";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import icon from "../assets/icon.png";
import { Box } from "@mui/system";

const NavBar = () => {
    const location = useLocation();
    let navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState(location.pathname);

    useEffect(() => {
        const setTab = () => {
            setSelectedTab(location.pathname);
        };
        setTab();
    });

    const handelChange = (event, newValue) => {
        navigate(newValue);
        setSelectedTab(newValue);
    };

    return (
        <>
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
                        <Avatar
                            src={icon}
                            sx={{
                                width: 50,
                                height: 50,
                                WebkitFilter: "brightness(0)",
                            }}
                        />
                        <Box component="div" mt={2}>
                            <Tabs value={selectedTab} onChange={handelChange}>
                                <Tab value="/" label="Home" />
                                <Tab value="/wallets" label="Wallets" />
                                <Tab
                                    value="/transactions"
                                    label="Transactions"
                                />
                                <Tab value="/categories" label="Categories" />
                            </Tabs>
                        </Box>
                        <Avatar
                            src={icon}
                            sx={{
                                width: 50,
                                height: 50,
                                WebkitFilter: "brightness(0)",
                            }}
                        />
                    </Box>
                </Toolbar>
            </AppBar>
            <Outlet />
        </>
    );
};

export default NavBar;
