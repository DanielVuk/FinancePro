import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import { ColorPicker } from "material-ui-color";
import { useEffect, useState } from "react";
import AppInput from "../AppInput";

const WalletForm = ({
    action = "add",
    onClose,
    onConfirm,
    open,
    title,
    wallet = null,
}) => {
    const [walletName, setWalletName] = useState("");
    const [walletBalance, setWalletBalance] = useState(0);
    const [walletColor, setWalletColor] = useState("black");

    useEffect(() => {
        if (action === "add") {
            setWalletName("");
            setWalletBalance(0);
            setWalletColor("black");
        } else if (action === "edit") {
            if (wallet) {
                setWalletName(wallet.name);
                setWalletBalance(wallet.balance);
                setWalletColor(wallet.color);
            }
        }
    }, [open]);

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                onConfirm({
                    name: walletName,
                    balance: walletBalance,
                    color: walletColor,
                });
            }}
        >
            <Grid container alignItems="center" direction="column">
                <Typography sm={12} variant="h4" sx={{ fontWeight: "bold" }}>
                    {title}
                </Typography>
                <Stack
                    my={5}
                    sx={{
                        width: "500px",
                    }}
                >
                    <AppInput
                        label="Name"
                        placeholder="Wallet name"
                        value={walletName}
                        required
                        setValue={setWalletName}
                        sx={{ marginBottom: 5 }}
                    />
                    <AppInput
                        label="Balance"
                        value={walletBalance}
                        setValue={setWalletBalance}
                        type="number"
                        required
                        sx={{ marginBottom: 5 }}
                        disabled={action === "edit"}
                        placeholder="Current balance"
                    />
                    <Box
                        sx={{
                            border: "1px solid lightgrey",
                            borderRadius: "4px",
                            display: "flex",
                            alignItems: "center",
                            height: "56px",
                            justifyContent: "space-between",
                            paddingRight: "10px",
                        }}
                        fullWidth
                    >
                        <Typography
                            ml={1.5}
                            sx={{ color: "#5D2DFD", fontWeight: 600 }}
                        >
                            Wallet color
                        </Typography>

                        <ColorPicker
                            value={walletColor}
                            hideTextfield
                            defaultValue="black"
                            onChange={(event) => {
                                setWalletColor(event.css.backgroundColor);
                            }}
                        />
                    </Box>
                </Stack>
                <Stack direction="row" spacing={8}>
                    <IconButton
                        onClick={onClose}
                        sx={{ backgroundColor: "#F1ECFD" }}
                    >
                        <CloseRoundedIcon fontSize="inherit" color="primary" />
                    </IconButton>
                    <IconButton
                        type="submit"
                        sx={{ backgroundColor: "#F1ECFD" }}
                    >
                        <CheckRoundedIcon fontSize="inherit" color="primary" />
                    </IconButton>
                </Stack>
            </Grid>
        </form>
    );
};

export default WalletForm;
