import { Box, Modal, Slide } from "@mui/material";

const style = {
    position: "absolute",
    top: "30%",
    left: "35%",
    width: 700,
    bgcolor: "background.paper",
    borderRadius: 5,
    boxShadow: 20,
    p: 4,
};

const AppModal = ({ open, onClose, children }) => {
    return (
        <Modal keepMounted open={open} onClose={onClose}>
            <Slide in={open}>
                <Box sx={style}>{children}</Box>
            </Slide>
        </Modal>
    );
};

export default AppModal;
