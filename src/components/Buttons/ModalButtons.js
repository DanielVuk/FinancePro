import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { IconButton, Stack } from "@mui/material";

const ModalButtons = ({ onClose }) => {
    return (
        <Stack direction="row" spacing={8} mt={3}>
            <IconButton onClick={onClose} sx={{ backgroundColor: "#F1ECFD" }}>
                <CloseRoundedIcon fontSize="inherit" color="primary" />
            </IconButton>
            <IconButton type="submit" sx={{ backgroundColor: "#F1ECFD" }}>
                <CheckRoundedIcon fontSize="inherit" color="primary" />
            </IconButton>
        </Stack>
    );
};

export default ModalButtons;
