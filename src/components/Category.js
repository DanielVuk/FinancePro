import { Box, Card, IconButton, Typography } from "@mui/material";
import GetIcon from "./GetIcon";

const Category = ({ category, onDelete, onEdit, onSelect, selected }) => {
    const categoryStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "190px",
        width: "120px",
        borderRadius: 5,
        margin: "23px",
        boxShadow: 3,
        border:
            selected && selected.id === category.id ? "4px solid" : "2px solid",
        borderColor: category.color,
        backgroundColor:
            selected && selected.id === category.id
                ? "background.default"
                : "#F7F6FA",
        "&:hover": {
            cursor: "pointer",
            backgroundColor: "background.default",
            transition: "transform 0.5s",
            border: "4px solid",
            borderColor: category.color,
            transform: "scale(1.1)",
        },
        transform:
            selected && selected.id === category.id ? "scale(1.1)" : null,
    };

    return (
        <Card onClick={onSelect} sx={categoryStyle}>
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
                <GetIcon
                    iconName={category.icon}
                    color="primary.main"
                    size="large"
                />
            </Box>

            <Typography variant="button" mt={3}>
                {category.name}
            </Typography>
            <Box>
                <IconButton
                    onClick={onDelete}
                    sx={{ backgroundColor: "background.default" }}
                >
                    <GetIcon iconName="delete" color="error.main" />
                </IconButton>
                <IconButton
                    onClick={onEdit}
                    sx={{
                        backgroundColor: "background.default",
                        marginLeft: "15px",
                    }}
                >
                    <GetIcon iconName="edit" color="primary.main" />
                </IconButton>
            </Box>
        </Card>
    );
};

export default Category;
