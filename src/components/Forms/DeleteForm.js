import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { IconButton, Stack, Typography } from "@mui/material";
const DeleteForm = ({ onClose, onDelete, Title }) => {
    return (
        <Stack spacing={5} sx={{ alignItems: "center" }}>
            <Typography sm={12} variant="h4" sx={{ fontWeight: "bold" }}>
                {Title}
            </Typography>
            <Typography variant="h6">
                Once deleted cannot be recovered.
            </Typography>
            <Stack direction="row" spacing={15}>
                <IconButton
                    onClick={onClose}
                    sx={{ backgroundColor: "#F1ECFD" }}
                >
                    <CloseRoundedIcon fontSize="inherit" color="primary" />
                </IconButton>
                <IconButton
                    onClick={onDelete}
                    sx={{ backgroundColor: "#F1ECFD" }}
                >
                    <CheckRoundedIcon fontSize="inherit" color="primary" />
                </IconButton>
            </Stack>
        </Stack>
    );
};

export default DeleteForm;
