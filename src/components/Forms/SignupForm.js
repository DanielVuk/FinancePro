import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import AppInput from "../AppInput";
import AppButton from "../Buttons/AppButton";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import useSnackBar from "../CustomSnackBar";
import { useNavigate } from "react-router-dom";
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
    const { SnackBar, openSnackBarHelper } = useSnackBar();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    useEffect(() => {
        setEmail("");
        setPassword("");
        setConfirmPass("");
    }, [open]);

    const register = async () => {
        if (password !== confirmPass) {
            openSnackBarHelper(`The confirmed password is incorrect`, "error");
            return;
        }
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            navigate("/", { replace: true });
        } catch (error) {
            if (
                error.message ===
                "Firebase: Error (auth/network-request-failed)."
            )
                openSnackBarHelper("Account already exists.", "error");
            else {
                openSnackBarHelper(error.message, "error");
            }
        }
    };

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                register();
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
