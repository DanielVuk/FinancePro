import DeleteIcon from "@mui/icons-material/Delete";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Box, IconButton, Typography } from "@mui/material";

const Wallet = ({ balance, color, name, onDelete, onEdit }) => {
    const walletStyle = {
        backgroundColor: "#F7F6FA",
        borderRadius: 5,
        padding: 1.5,
        boxShadow: 3,
        minWidth: "250px",
        margin: "10px ",
        "&:hover": {
            cursor: "pointer",
            transform: "scale(1.03)",
            backgroundColor: "#F1ECFD",
        },
    };

    return (
        <Box mx={1.5} sx={walletStyle}>
            <Box
                sx={{
                    backgroundColor: color,
                    border: "2px solid black",
                    height: "25px",
                    width: "35px",
                    borderRadius: 4,
                }}
            ></Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {name}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {balance}
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
                        sx={{ backgroundColor: "#F1ECFD", marginLeft: "15px" }}
                    >
                        <EditRoundedIcon fontSize="inherit" color="primary" />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};
export default Wallet;
