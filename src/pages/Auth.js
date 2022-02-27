import {
    Box,
    Container,
    Divider,
    Grid,
    InputAdornment,
    Link,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import AppInput from "../components/AppInput.js";
import AppModal from "../components/AppModal";
import AppButton from "../components/Buttons/AppButton";
import WelcomeCarousel from "../components/Carousels/WelcomeCarousel";
import SignupForm from "../components/Forms/SignupForm";
import GetIcon from "../components/GetIcon";

const alignCenter = {
    justifyContent: "center",
    alignItems: "center",
};

const loginBtnStyles = {
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
            <Container maxWidth="xl">
                <Grid container spacing={{ xs: 0, md: 10 }}>
                    <Grid container item xs={12} md={6} style={alignCenter}>
                        <Box
                            component="img"
                            src={logo}
                            sx={{
                                maxWidth: {
                                    xs: "350px",
                                    sm: "350px",
                                    md: "540px",
                                },
                                minWidth: {
                                    xs: "300px",
                                    sm: "350px",
                                    md: "540px",
                                },
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
                                maxWidth: { xs: "350px", md: "450px" },
                                minWidth: { xs: "300px", md: "450px" },
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
                                            <GetIcon
                                                iconName="email"
                                                color="primary.main"
                                                size="medium"
                                            />
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
                                            <GetIcon
                                                iconName="lock"
                                                color="primary.main"
                                                size="medium"
                                            />
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
                                sx={loginBtnStyles}
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
                <WelcomeCarousel />
            </Container>
            <AppModal open={open} onClose={() => setOpen(false)}>
                <SignupForm open={openSignupModal} />
            </AppModal>
        </Container>
    );
};

export default UserAuth;
