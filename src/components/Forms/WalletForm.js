import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Grid, IconButton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AppInput from "../AppInput";
import ColorInput from "../ColorInput";

const WalletForm = ({
    action = "add",
    onClose,
    onConfirm,
    open,
    title,
    wallet = null,
}) => {
    const [name, setName] = useState("");
    const [balance, setBalance] = useState(0);
    const [color, setColor] = useState("black");

    useEffect(() => {
        if (action === "add") {
            setName("");
            setBalance(0);
            setColor("black");
        } else if (action === "edit") {
            if (wallet) {
                setName(wallet.name);
                setBalance(wallet.balance);
                setColor(wallet.color);
            }
        }
    }, [open]);

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                onConfirm({
                    name: name,
                    balance: balance,
                    color: color,
                });
            }}
        >
            <Grid container alignItems="center" direction="column">
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
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
                        value={name}
                        required
                        setValue={setName}
                        sx={{ marginBottom: 5 }}
                    />
                    <AppInput
                        label="Balance"
                        value={balance}
                        setValue={setBalance}
                        type="number"
                        required
                        sx={{ marginBottom: 5 }}
                        disabled={action === "edit"}
                        placeholder="Current balance"
                    />
                    <ColorInput
                        title="Wallet color"
                        value={color}
                        onChange={(event) => {
                            setColor(event.css.backgroundColor);
                        }}
                    />
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
