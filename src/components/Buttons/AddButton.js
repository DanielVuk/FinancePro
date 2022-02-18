import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { Button } from "@mui/material";

const AddButton = ({
    onClick,
    height,
    width,
    transition,
    transform,
    margin = "15px",
}) => {
    return (
        <Button
            onClick={onClick}
            sx={{
                backgroundColor: "#F7F6FA",
                boxShadow: 3,
                "&:hover": {
                    backgroundColor: "#F7F6FA",
                    boxShadow: 4,
                    transition: transition,
                    transform: transform,
                },
                margin: margin,
                borderRadius: 5,
                height: height,
                width: width,
            }}
        >
            <AddCircleOutlineRoundedIcon fontSize="large" />
        </Button>
    );
};

export default AddButton;
