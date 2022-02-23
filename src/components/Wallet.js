import { Box, Card, IconButton, Typography } from "@mui/material";
import { useContext } from "react";
import { getWalletBalance } from "../Functions/updateWallets";
import { Context } from "../Store";
import GetIcon from "./GetIcon";

const Wallet = ({ wallet, onDelete, onEdit, selected, onSelect }) => {
    const [state] = useContext(Context);

    const walletStyle = {
        backgroundColor:
            selected && selected.id === wallet.id
                ? "background.default"
                : "#F7F6FA",
        borderRadius: 5,
        padding: 1.5,
        boxShadow: 3,
        minWidth: "250px",
        margin: "15px ",
        "&:hover": {
            cursor: "pointer",
            backgroundColor: "background.default",
            transition: "transform 0.5s",
            transform: "scale(1.03)",
        },
        transform: selected && selected.id === wallet.id ? "scale(1.03)" : null,
    };

    return (
        <Card onClick={onSelect} sx={walletStyle}>
            <Box
                sx={{
                    backgroundColor: wallet.color,
                    border: "2px solid black",
                    height: "25px",
                    width: "35px",
                    borderRadius: 4,
                }}
            ></Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {wallet.name}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {getWalletBalance(wallet, state.transactions)}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6">HRK</Typography>
                <Box>
                    <IconButton
                        onClick={onDelete}
                        sx={{ backgroundColor: "background.default" }}
                    >
                        <GetIcon iconName="delete" color="error.main" />
                    </IconButton>
                    <IconButton
                        onClick={onEdit}
                        sx={{
                            backgroundColor: "background.default",
                            marginLeft: "15px",
                        }}
                    >
                        <GetIcon iconName="edit" color="primary.main" />
                    </IconButton>
                </Box>
            </Box>
        </Card>
    );
};
export default Wallet;
