import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import {
    Box,
    Container,
    Divider,
    Grid,
    Icon,
    InputAdornment,
    Link,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import AppInput from "../components/AppInput.js";
import AppModal from "../components/AppModal";
import AppButton from "../components/Buttons/AppButton";

const alignCenter = {
    justifyContent: "center",
    alignItems: "center",
};

const logInBtnStyles = {
    backgroundColor: "#5D2DFD",
    fontWeight: "700",
    textTransform: "none",
    "&:hover": {
        backgroundColor: "#7F5DF0",
    },
};

const linkButton = {
    fontSize: "0.8rem",
    mt: 1.5,
    mb: 4,
};

const createBtnStyles = {
    backgroundColor: "#A2D202",
    fontWeight: "700",
    textTransform: "none",
    mt: 1.5,
    "&:hover": {
        backgroundColor: "#63B530",
    },
};

const UserAuth = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const openSignupModal = () => {
        setOpen(true);
    };

    return (
        <Container maxWidth="fluid" sx={{ height: "100vh " }}>
            <AppModal open={open} onClose={() => setOpen(false)} />
            <Container maxWidth="xl">
                <Grid container spacing={0}>
                    <Grid container item xs={12} md={6} style={alignCenter}>
                        <Box
                            component="img"
                            src={logo}
                            sx={{
                                maxWidth: { xs: "350px", md: "500px" },
                                minWidth: { xs: "300px", md: "500px" },
                            }}
                        ></Box>
                    </Grid>
                    <Grid container item xs={12} md={6} style={alignCenter}>
                        <Box
                            textAlign="center"
                            sx={{
                                border: "1px solid #7F5DF0",
                                backgroundColor: "#fff",
                                boxShadow: 3,
                                borderRadius: "3px",
                                padding: "1.5rem",
                                margin: "1rem",
                                maxWidth: { xs: "350px", md: "400px" },
                                minWidth: { xs: "300px", md: "400px" },
                            }}
                        >
                            <AppInput
                                value={email}
                                setValue={setEmail}
                                placeholder="Email address"
                                required
                                fullWidth
                                sx={{ marginBottom: "15px" }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Icon color="primary">
                                                <EmailIcon />
                                            </Icon>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <AppInput
                                value={password}
                                setValue={setPassword}
                                placeholder="Password"
                                fullWidth
                                sx={{ marginBottom: "15px" }}
                                type="password"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Icon color="primary">
                                                <LockIcon />
                                            </Icon>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <AppButton
                                onClick={() => {
                                    console.log("email " + email);
                                    console.log("password " + password);
                                    navigate("/");
                                }}
                                variant="contained"
                                sx={logInBtnStyles}
                                fullWidth
                            >
                                Log in
                            </AppButton>
                            <Link
                                component="button"
                                color="#7F5DF0"
                                sx={linkButton}
                                onClick={() => {
                                    console.info("I'm a button.");
                                }}
                            >
                                Forgot password?
                            </Link>
                            <Divider variant="fullWidth" />
                            <AppButton
                                variant="contained"
                                size="large"
                                sx={createBtnStyles}
                                onClick={openSignupModal}
                            >
                                Create Account
                            </AppButton>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Container>
    );
};

export default UserAuth;
