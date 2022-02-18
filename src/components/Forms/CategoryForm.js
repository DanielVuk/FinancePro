import {
    Box,
    Card,
    Grid,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import AppInput from "../AppInput";
import ModalButtons from "../Buttons/ModalButtons";
import ColorInput from "../ColorInput";
import GetIcon from "../GetIcon";

const CategoryForm = ({
    action = "add",
    title,
    onClose,
    onConfirm,
    open,
    category = null,
}) => {
    const [name, setName] = useState("");
    const [type, setType] = useState(["income", "expense"]);
    const [color, setColor] = useState("primary.main");
    const [icon, setIcon] = useState(categoryIcons[0]);

    useEffect(() => {
        if (action === "add") {
            setName("");
            setType(["income", "expense"]);
            setColor("primary.main");
            setIcon(categoryIcons[0]);
        } else if (action === "edit") {
            if (category) {
                setName(category.name);
                setType(category.type);
                setColor(category.color);
                setIcon(category.icon);
            }
        }
    }, [open]);

    const handleTypeChange = (event, newType) => {
        if (newType.length === 0) {
            return;
        }
        console.log(newType);
        setType(newType);
    };

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                onConfirm({ name, type, color, icon });
            }}
        >
            <Grid container alignItems="center" direction="column">
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    {title}
                </Typography>
                <Stack
                    my={3}
                    sx={{
                        width: "500px",
                        alignItems: "center",
                    }}
                >
                    <AppInput
                        label="Name"
                        placeholder="Category name"
                        value={name}
                        required
                        fullWidth
                        setValue={setName}
                        sx={{ marginBottom: 3 }}
                    />
                    <ToggleButtonGroup
                        fullWidth
                        value={type}
                        onChange={handleTypeChange}
                    >
                        <ToggleButton value="income" color="success">
                            <Typography>Income</Typography>
                        </ToggleButton>
                        <ToggleButton value="expense" color="error">
                            <Typography>Expense</Typography>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Stack>
                <Stack
                    sx={{
                        width: "500px",
                    }}
                >
                    <ColorInput
                        title="Category color"
                        value={color}
                        sx={{ width: "100%" }}
                        onChange={(event) => {
                            setColor(event.css.backgroundColor);
                        }}
                    />

                    <Grid container justifyContent="center" mt={3}>
                        {categoryIcons.map((item, index) => (
                            <Grid item xs="auto" m={0.7} key={index}>
                                <Card
                                    onClick={() => {
                                        setIcon(item);
                                    }}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        boxShadow: 1,
                                        width: "60px",
                                        height: "60px",
                                        "&:hover": {
                                            transition: "transform 0.5s",
                                            cursor: "pointer",
                                            transform: "scale(1.5)",
                                        },
                                        backgroundColor:
                                            icon === item ? color : "white",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            backgroundColor: "white",
                                            height: "40px",
                                            width: "40px",
                                            borderRadius: "20px",
                                        }}
                                    >
                                        <GetIcon
                                            iconName={item}
                                            size="large"
                                            color="primary.main"
                                        />
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Stack>
                <ModalButtons onClose={onClose} />
            </Grid>
        </form>
    );
};

export default CategoryForm;

const categoryIcons = [
    "work",
    "fuel",
    "apartment",
    "car",
    "restaurant",
    "food",
    "school",
    "gym",
    "casino",
    "clean",
    "church",
    "family",
    "gift",
    "travel",
    "cloth",
    "bank",
    "drink",
    "laptop",
    "shop",
    "internet",
    "wallet",
    "beach",
    "celebration",
    "dolar",
    "delete",
    "atm",
    "call",
    "other",
];
