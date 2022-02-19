import { Button } from "@mui/material";
import GetIcon from "../GetIcon";

const AddButton = ({
    onClick,
    height,
    width,
    transition,
    transform,
    margin,
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
            <GetIcon iconName="add" size="large" />
        </Button>
    );
};

export default AddButton;
