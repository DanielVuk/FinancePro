import DeleteIcon from "@mui/icons-material/Delete";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Box, IconButton, Typography } from "@mui/material";
import GetIcon from "./GetIcon";

const Category = ({ color, iconName, name, onDelete, onEdit }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "190px",
                width: "120px",
                borderRadius: 4,
                justifyContent: "center",
                alignItems: "center",
                margin: "14px ",
                boxShadow: 3,
                border: "2px solid",
                borderColor: color,
                backgroundColor: "#F7F6FA",
                "&:hover": {
                    cursor: "pointer",
                    transform: "scale(1.1)",
                    backgroundColor: "#F1ECFD",
                    border: "4px solid",
                    borderColor: color,
                },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    height: "66px",
                    width: "66px",
                    borderRadius: "30px",
                }}
            >
                <GetIcon iconName={iconName} color="primary.main" />
            </Box>

            <Typography
                variant="button"
                mt={3}
                // sx={{ WebkitFilter: "invert(100%)", color: color }}
            >
                {name}
            </Typography>
            <Box>
                <IconButton
                    onClick={onDelete}
                    sx={{ backgroundColor: "#F1ECFD" }}
                >
                    <DeleteIcon fontSize="inherit" sx={{ color: "#FF6D6D" }} />
                </IconButton>
                <IconButton
                    onClick={onEdit}
                    sx={{ backgroundColor: "#F1ECFD", marginLeft: "15px" }}
                >
                    <EditRoundedIcon fontSize="inherit" color="primary.main" />
                </IconButton>
            </Box>
        </Box>
    );
};

export default Category;
