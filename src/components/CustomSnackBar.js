import { Snackbar, Alert } from "@mui/material";
import { useState } from "react";

const useSnackBar = () => {
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [message, setMessage] = useState();

    const openSnackBarHelper = (message) => {
        setMessage(message);
        setOpenSnackBar(true);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackBar(false);
    };

    const SnackBar = () => {
        return (
            <Snackbar
                open={openSnackBar}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert severity="success">{message}</Alert>
            </Snackbar>
        );
    };

    return {
        openSnackBarHelper,
        SnackBar,
    };
};

export default useSnackBar;
