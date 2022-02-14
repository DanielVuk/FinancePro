import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { ColorPicker } from "material-ui-color";
import React, { useState } from "react";
import AppModal from "../components/modals/AppModal";
import AppInput from "../components/AppInput";
const Home = () => {
    const [wallets, setWallets] = useState([
        {
            id: 1,
            name: "Gotovina",
            balance: 4000,
            color: "green",
        },
        {
            id: 2,
            name: "Ziro",
            balance: 40000,
            color: "red",
        },
        {
            id: 3,
            name: "Gotovina",
            balance: 4000,
            color: "green",
        },
    ]);
    const [addWalletModal, setAddWalletModal] = useState(false);
    const [editWalletModal, setEditWalletModal] = useState(false);
    const [deleteWalletModal, setDeleteWalletModal] = useState(false);
    const [walletName, setWalletName] = useState("");
    const [walletBalance, setWalletBalance] = useState(0);
    const [walletColor, setWalletColor] = useState("blue");

    const handleAddWallet = () => {
        let array = [
            ...wallets,
            {
                id: wallets.length + 1,
                name: walletName,
                balance: walletBalance,
                color: walletColor,
            },
        ];
        setWallets(array);
        setAddWalletModal(false);
    };

    return (
        <Grid
            container
            maxWidth="fluid"
            justifyContent="center"
            sx={{ minWidth: "320px" }}
        >
            <AppModal
                open={addWalletModal}
                onClose={() => setAddWalletModal(false)}
            >
                <Grid container alignItems="center" direction="column">
                    <Typography sm={12} variant="h4">
                        Create New Wallet
                    </Typography>
                    <Stack
                        my={5}
                        sx={{
                            width: "500px",
                        }}
                    >
                        {walletName}
                        <AppInput
                            placeholder="Wallet name"
                            value={walletName}
                            setValue={setWalletName}
                            sx={{ marginBottom: 5 }}
                        />

                        <AppInput
                            value={walletBalance}
                            setValue={setWalletBalance}
                            type="number"
                            sx={{ marginBottom: 5 }}
                            placeholder="Current balance"
                        />

                        <ColorPicker
                            value={walletColor}
                            onChange={(event) => {
                                setWalletColor(event.css.backgroundColor);
                            }}
                        />
                    </Stack>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "50%",
                        }}
                    >
                        <IconButton
                            onClick={() => setAddWalletModal(false)}
                            sx={{ backgroundColor: "#F1ECFD" }}
                        >
                            <CancelOutlinedIcon
                                fontSize="inherit"
                                color="primary"
                            />
                        </IconButton>
                        <IconButton
                            onClick={handleAddWallet}
                            sx={{ backgroundColor: "#F1ECFD" }}
                        >
                            <CheckRoundedIcon
                                fontSize="inherit"
                                color="primary"
                            />
                        </IconButton>
                    </Box>
                </Grid>
            </AppModal>

            <Grid
                container
                justifyContent="center"
                alignItems="center"
                sx={{
                    background: "url(banner.png)",
                    height: "30vh",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
            >
                <Stack alignItems="center" mt={-10}>
                    <Typography variant="h4" sx={{ color: "white" }}>
                        Your total balance:
                    </Typography>
                    <Typography variant="h4" sx={{ color: "white" }}>
                        6000
                    </Typography>
                </Stack>
            </Grid>
            <Grid mt={-14} px={4}>
                <Grid item>
                    <Typography variant="h4" sx={{ color: "white" }}>
                        Wallets:
                    </Typography>
                </Grid>
                <Box
                    mt={2}
                    ml={5}
                    sx={{
                        display: "flex",
                    }}
                >
                    <Grid container spacing={3}>
                        <Grid item xs="auto" mx={1.5}>
                            <Button
                                onClick={() => setAddWalletModal(true)}
                                sx={{
                                    backgroundColor: "#F7F6FA",
                                    boxShadow: 3,
                                    "&:hover": {
                                        backgroundColor: "#F7F6FA",
                                        boxShadow: 4,
                                    },
                                    borderRadius: 5,
                                    minWidth: "200px",
                                    minHeight: "136px",
                                }}
                            >
                                <AddCircleOutlineRoundedIcon fontSize="large" />
                            </Button>
                        </Grid>
                        {wallets.map((wallet) => (
                            <Grid item xs="auto" key={wallet.id}>
                                <Wallet
                                    color={wallet.color}
                                    name={wallet.name}
                                    balance={wallet.balance}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Home;

const Wallet = ({ color, name, balance }) => {
    const walletStyle = {
        backgroundColor: "#F7F6FA",
        borderRadius: 5,
        minWidth: "200px",
        padding: 1.5,
        boxShadow: 3,
    };

    return (
        <Box mx={1.5} sx={walletStyle}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box
                    sx={{
                        backgroundColor: color,
                        height: "30px",
                        width: "35px",
                        borderRadius: 4,
                    }}
                ></Box>
                <IconButton
                    aria-label="delete"
                    sx={{ backgroundColor: "#F1ECFD" }}
                >
                    <DeleteIcon fontSize="inherit" sx={{ color: "#FF6D6D" }} />
                </IconButton>
            </Box>
            <Typography mt={-1} variant="h6" sx={{ fontWeight: "bold" }}>
                {name}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography mt={-1} variant="h5" sx={{ fontWeight: "bold" }}>
                    {balance}
                </Typography>

                <IconButton
                    aria-label="delete"
                    sx={{ backgroundColor: "#F1ECFD" }}
                >
                    <EditRoundedIcon fontSize="inherit" color="primary" />
                </IconButton>
            </Box>
            <Typography mt={-3} variant="h6">
                HRK
            </Typography>
        </Box>
    );
};
