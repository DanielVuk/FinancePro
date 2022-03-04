import {
    Box,
    Container,
    Divider,
    Grid,
    InputAdornment,
    Link,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import AppInput from "../components/AppInput.js";
import AppModal from "../components/AppModal";
import AppButton from "../components/Buttons/AppButton";
import WelcomeCarousel from "../components/Carousels/WelcomeCarousel";
import useSnackBar from "../components/CustomSnackBar";
import ResetPasswordForm from "../components/Forms/ResetPasswordForm";
import SignupForm from "../components/Forms/SignupForm";
import GetIcon from "../components/GetIcon";
import { loginUser } from "../rest/auth";
import { getUserCategories } from "../rest/categories";
import { getUserTransactions } from "../rest/transactions";
import { getUserWallets } from "../rest/wallets";
import { Context } from "../Store";

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
    const [state, setState] = useContext(Context);
    const navigate = useNavigate();

    const { SnackBar, openSnackBarHelper } = useSnackBar();
    const [signUpModal, setSignUpModal] = useState(false);
    const [resetPasswordModal, setResetPasswordModal] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            let result = await loginUser(email, password);
            let wallets = await getUserWallets(
                result.data.idToken,
                result.data.localId
            );
            let categories = await getUserCategories(
                result.data.idToken,
                result.data.localId
            );
            let transactions = await getUserTransactions(
                result.data.idToken,
                result.data.localId
            );

            setState({
                user: {
                    email,
                    token: result.data.idToken,
                    id: result.data.localId,
                },
                wallets: wallets,
                categories: categories,
                transactions: transactions,
            });

            navigate("/", { replace: true });
        } catch (error) {
            openSnackBarHelper(error.message, "error");
        }
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
                                type="email"
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
                                onClick={handleLogin}
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
                                onClick={() => setResetPasswordModal(true)}
                            >
                                Forgot password?
                            </Link>
                            <Divider variant="fullWidth" />
                            <AppButton
                                variant="contained"
                                size="large"
                                sx={createBtnStyles}
                                onClick={() => setSignUpModal(true)}
                            >
                                Create Account
                            </AppButton>
                        </Box>
                    </Grid>
                </Grid>
                <WelcomeCarousel />
            </Container>
            <AppModal
                open={resetPasswordModal}
                onClose={() => setResetPasswordModal(false)}
            >
                <ResetPasswordForm
                    open={() => setResetPasswordModal(true)}
                    onClose={() => setResetPasswordModal(false)}
                />
            </AppModal>
            <AppModal open={signUpModal} onClose={() => setSignUpModal(false)}>
                <SignupForm open={() => setSignUpModal(true)} />
            </AppModal>
            <SnackBar />
        </Container>
    );
};

export default UserAuth;
