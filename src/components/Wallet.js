import DeleteIcon from "@mui/icons-material/Delete";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Box, Card, IconButton, Typography } from "@mui/material";

const Wallet = ({ wallet, onDelete, onEdit, selected, onSelect }) => {
    const walletStyle = {
        backgroundColor:
            selected && selected.id === wallet.id ? "#F1ECFD" : "#F7F6FA",
        borderRadius: 5,
        padding: 1.5,
        boxShadow: 3,
        minWidth: "250px",
        margin: "15px ",
        "&:hover": {
            cursor: "pointer",
            backgroundColor: "#F1ECFD",
            transition: "transform 0.5s",
            transform: "scale(1.03)",
        },
        transform: selected && selected.id === wallet.id ? "scale(1.1)" : null,
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
                {wallet.balance}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6">HRK</Typography>
                <Box>
                    <IconButton
                        onClick={onDelete}
                        sx={{ backgroundColor: "#F1ECFD" }}
                    >
                        <DeleteIcon
                            fontSize="inherit"
                            sx={{ color: "#FF6D6D" }}
                        />
                    </IconButton>
                    <IconButton
                        onClick={onEdit}
                        sx={{
                            backgroundColor: "#F1ECFD",
                            marginLeft: "15px",
                        }}
                    >
                        <EditRoundedIcon fontSize="inherit" color="primary" />
                    </IconButton>
                </Box>
            </Box>
        </Card>
    );
};
export default Wallet;
