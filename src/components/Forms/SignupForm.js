import { Box, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { registerUser } from "../../rest/auth";
import { Context } from "../../Store";
import AppInput from "../AppInput";
import AppButton from "../Buttons/AppButton";
import useSnackBar from "../CustomSnackBar";

const createBtnStyles = {
    backgroundColor: "#A2D202",
    fontWeight: "700",
    textTransform: "none",
    marginTop: "32px",
    "&:hover": {
        backgroundColor: "#63B530",
    },
};

const SignupForm = ({ open }) => {
    const [state, setState] = useContext(Context);
    const navigate = useNavigate();

    const { SnackBar, openSnackBarHelper } = useSnackBar();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    useEffect(() => {
        setEmail("");
        setPassword("");
        setConfirmPass("");
    }, [open]);

    const handleRegister = async () => {
        if (password !== confirmPass) {
            openSnackBarHelper(
                `The confirmed password is incorrect `,
                "warning"
            );
            return;
        }
        try {
            setState({ ...state, loading: true });
            let result = await registerUser(email, password);
            setState({
                ...state,
                user: {
                    token: result.data.idToken,
                    id: result.data.localId,
                },
                loading: false,
            });

            const expiresIn = +result.data.expiresIn * 1000;
            const expirationDate = new Date().getTime() + expiresIn;

            localStorage.setItem("tokenExpiration", expirationDate);
            localStorage.setItem("token", result.data.idToken);
            localStorage.setItem("userId", result.data.localId);

            navigate("/", { replace: true });
        } catch (error) {
            openSnackBarHelper(error.message, "error");
            setState({ ...state, loading: false });
        }
    };

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                handleRegister();
            }}
        >
            <Grid
                container
                direction="column"
                alignItems="center"
                width="500px"
            >
                <Typography
                    noWrap
                    color="primary"
                    fontWeight="bold"
                    mb={2}
                    variant="h4"
                >
                    Sign Up
                </Typography>
                <Box
                    mb={2}
                    component="img"
                    src={logo}
                    sx={{ maxWidth: "200px" }}
                />
                <AppInput
                    fullWidth
                    placeholder="Email address"
                    required
                    setValue={setEmail}
                    type="email"
                    value={email}
                />
                <AppInput
                    fullWidth
                    placeholder="Password"
                    required
                    setValue={setPassword}
                    sx={{ margin: "32px 0" }}
                    type="password"
                    value={password}
                    InputProps={{
                        inputProps: { minLength: 6, maxLength: 12 },
                    }}
                />
                <AppInput
                    fullWidth
                    required
                    placeholder="Confirm password"
                    setValue={setConfirmPass}
                    type="password"
                    value={confirmPass}
                />
                <AppButton
                    variant="contained"
                    type="submit"
                    size="large"
                    sx={createBtnStyles}
                >
                    Register
                </AppButton>
            </Grid>
            <SnackBar />
        </form>
    );
};

export default SignupForm;
