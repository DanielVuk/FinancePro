import { Box, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import AppInput from "../AppInput";
import AppButton from "../Buttons/AppButton";

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
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    useEffect(() => {
        setName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPass("");
    }, [open]);

    return (
        <form>
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
                <Box component="img" src={logo} sx={{ maxWidth: "200px" }} />
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    my={4}
                    sx={{ width: "500px" }}
                >
                    <AppInput
                        placeholder="First name"
                        required
                        setValue={setName}
                        value={name}
                    />
                    <AppInput
                        placeholder="Last name"
                        required
                        setValue={setLastName}
                        value={lastName}
                    />
                </Stack>
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
                    size="large"
                    sx={createBtnStyles}
                >
                    Register
                </AppButton>
            </Grid>
        </form>
    );
};

export default SignupForm;
