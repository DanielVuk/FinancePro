import { Grid, InputAdornment, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { resetPassword } from "../../rest/auth";
import { Context } from "../../Store";
import AppInput from "../AppInput";
import ModalButtons from "../Buttons/ModalButtons";
import GetIcon from "../GetIcon";

const ResetPasswordForm = ({ open, onClose }) => {
    const [state, setState] = useContext(Context);
    const [email, setEmail] = useState("");

    useEffect(() => {
        setEmail("");
    }, [open]);

    return (
        <form
            onSubmit={async (event) => {
                setState({ ...state, loading: true });
                event.preventDefault();
                try {
                    await resetPassword(email);
                    alert("Check email for next steps");
                    onClose();
                    setState({ ...state, loading: false });
                } catch (error) {
                    alert("Email not found.");
                    setState({ ...state, loading: false });
                }
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
                    Find Your Account
                </Typography>
                <Typography my={3}>
                    Please enter your email address to search for your account.
                </Typography>
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
                <ModalButtons onClose={onClose} />
            </Grid>
        </form>
    );
};

export default ResetPasswordForm;
