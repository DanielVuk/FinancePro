import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
    Box,
    Card,
    Grid,
    IconButton,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import AppInput from "../AppInput";
import ColorInput from "../ColorInput";
import GetIcon from "../GetIcon";

const categoryIcons = ["delete", "palette"];

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
                                        console.log(item);
                                        setIcon(item);
                                    }}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        boxShadow: 0,
                                        width: "60px",
                                        height: "60px",

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
                <Stack direction="row" spacing={8} mt={3}>
                    <IconButton
                        onClick={onClose}
                        sx={{ backgroundColor: "#F1ECFD" }}
                    >
                        <CloseRoundedIcon fontSize="inherit" color="primary" />
                    </IconButton>
                    <IconButton
                        type="submit"
                        sx={{ backgroundColor: "#F1ECFD" }}
                    >
                        <CheckRoundedIcon fontSize="inherit" color="primary" />
                    </IconButton>
                </Stack>
            </Grid>
        </form>
    );
};

export default CategoryForm;
