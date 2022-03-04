import { Stack, Typography } from "@mui/material";
import ModalButtons from "../Buttons/ModalButtons";
const DeleteForm = ({ onClose, onDelete, Title }) => {
    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                onDelete();
            }}
        >
            <Stack spacing={5} sx={{ alignItems: "center" }}>
                <Typography sm={12} variant="h4" sx={{ fontWeight: "bold" }}>
                    {Title}
                </Typography>
                <Typography variant="h6">
                    Once deleted cannot be recovered. <br />
                    All related transactions will be deleted.
                </Typography>

                <ModalButtons onClose={onClose} />
            </Stack>
        </form>
    );
};

export default DeleteForm;
