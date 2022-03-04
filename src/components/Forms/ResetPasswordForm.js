import { Grid, InputAdornment, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { resetPassword } from "../../rest/auth";
import AppInput from "../AppInput";
import ModalButtons from "../Buttons/ModalButtons";
import GetIcon from "../GetIcon";

const ResetPasswordForm = ({ open, onClose }) => {
    const [email, setEmail] = useState("");

    useEffect(() => {
        setEmail("");
    }, [open]);

    return (
        <form
            onSubmit={async (event) => {
                event.preventDefault();
                try {
                    await resetPassword(email);
                    alert("Check email for next steps");
                    onClose();
                } catch (error) {
                    alert("Email not found.");
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
