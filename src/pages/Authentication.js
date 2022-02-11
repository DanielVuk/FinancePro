import React, { useState } from "react";
import { Grid, Box, Link, Container } from "@mui/material";
import logo from "../assets/logo.png";
import AppInput from "../components/AppInput.js";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import AppButton from "../components/common/AppButton";
import Divider from "@mui/material/Divider";
import AppModal from "../components/common/AppModal";

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
    const [open, setOpen] = useState(false);

    const openSignupModal = () => {
        setOpen(true);
    };

    return (
        <Container
            maxWidth="fluid"
            sx={{ bgcolor: "#F1ECFD", height: "100vh " }}
        >
            <AppModal open={open} onClose={() => setOpen(false)} />
            <Grid container spacing={0}>
                <Grid container item xs={12} sm={6} style={alignCenter}>
                    <Box
                        component="img"
                        src={logo}
                        sx={{ maxWidth: "50%" }}
                    ></Box>
                </Grid>
                <Grid container item xs={12} sm={6} style={alignCenter}>
                    <Box
                        component="div"
                        textAlign="center"
                        sx={{
                            border: "1px solid #7F5DF0",
                            backgroundColor: "#fff",
                            boxShadow: 3,
                            borderRadius: "3px",
                            padding: "1.5rem",
                            margin: "1rem",
                            width: "400px",
                        }}
                    >
                        <AppInput
                            placeholder="Email address"
                            icon={<EmailIcon />}
                            required
                        />
                        <AppInput
                            placeholder="Password"
                            icon={<LockIcon />}
                            type="password"
                        />
                        <AppButton
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
    );
};

export default UserAuth;
