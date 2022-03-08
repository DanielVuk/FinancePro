import { Grid, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { getWalletBalance } from "../../functions/UpdateWallets";
import { Context } from "../../Store";
import AppInput from "../AppInput";
import ModalButtons from "../Buttons/ModalButtons";
import ColorInput from "../ColorInput";

const WalletForm = ({
    action = "add",
    onClose,
    onConfirm,
    open,
    title,
    wallet = null,
}) => {
    const [state] = useContext(Context);

    const [name, setName] = useState("");
    const [balance, setBalance] = useState(0);
    const [color, setColor] = useState("#5D2DFD");

    useEffect(() => {
        if (action === "add") {
            setName("");
            setBalance(0);
            setColor("#5D2DFD");
        } else if (action === "edit") {
            if (wallet) {
                setName(wallet.name);
                setBalance(getWalletBalance(wallet, state.transactions));
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
                    balance: +balance,
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
                <ModalButtons onClose={onClose} />
            </Grid>
        </form>
    );
};

export default WalletForm;
