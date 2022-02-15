import { Box, IconButton, Modal, Slide } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const style = {
    position: "absolute",
    top: "35%",
    left: "35%",
    width: 700,
    bgcolor: "background.paper",
    borderRadius: 5,
    boxShadow: 20,
    p: 4,
};

const AppModal = ({ open, onClose, onConfirm, children }) => {
    return (
        <Modal keepMounted open={open} onClose={onClose}>
            <Slide in={open}>
                <Box sx={style}>
                    {children}

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-around",
                            width: "100%",
                        }}
                    >
                        <IconButton
                            onClick={onClose}
                            sx={{ backgroundColor: "#F1ECFD" }}
                        >
                            <CancelOutlinedIcon
                                fontSize="inherit"
                                color="primary"
                            />
                        </IconButton>
                        <IconButton
                            onClick={onConfirm}
                            sx={{ backgroundColor: "#F1ECFD" }}
                        >
                            <CheckRoundedIcon
                                fontSize="inherit"
                                color="primary"
                            />
                        </IconButton>
                    </Box>
                </Box>
            </Slide>
        </Modal>
    );
};

export default AppModal;
