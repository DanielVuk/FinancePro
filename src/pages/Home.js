import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import {
    Box,
    Button,
    Grid,
    Stack,
    Typography,
    IconButton,
    FormControl,
} from "@mui/material";
import { ColorPicker } from "material-ui-color";
import React, { useEffect, useState } from "react";
import AppModal from "../components/modals/AppModal";
import AppInput from "../components/AppInput";

const _wallets = [
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
        name: "Tekuci",
        balance: 2000,
        color: "yellow",
    },
];

const Home = () => {
    const [wallets, setWallets] = useState(_wallets);

    const [addWalletModal, setAddWalletModal] = useState(false);
    const [deleteWalletModal, setDeleteWalletModal] = useState(false);
    const [editWalletModal, setEditWalletModal] = useState(false);

    const [selectedWallet, setSelectedWallet] = useState();

    const handleAddWallet = () => {
        var newWallet = { ...selectedWallet, id: wallets.length + 1 };
        let newWallets = [...wallets, newWallet];
        setWallets(newWallets);
        setSelectedWallet();
        setAddWalletModal(false);
    };

    const deleteWallet = () => {
        let newWallets = [...wallets].filter((w) => w.id !== selectedWallet.id);
        setWallets(newWallets);
        setDeleteWalletModal(false);
    };

    const handleDeleteWallet = (wallet) => {
        setSelectedWallet(wallet);
        setDeleteWalletModal(true);
    };

    const editWallet = () => {
        var index = wallets.findIndex((item) => item.id == selectedWallet.id);
        let tempWallets = [...wallets];
        tempWallets[index] = selectedWallet;

        setWallets(tempWallets);
        setSelectedWallet();
        setEditWalletModal(false);
    };

    const handleEditWallet = (wallet) => {
        setSelectedWallet(wallet);
        setEditWalletModal(true);
    };

    return (
        <Grid
            container
            maxWidth="fluid"
            justifyContent="center"
            sx={{ minWidth: "320px" }}
        >
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
                                    minWidth: "250px",
                                    minHeight: "153px",
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
                                    onDelete={() => {
                                        handleDeleteWallet(wallet);
                                    }}
                                    onEdit={() => handleEditWallet(wallet)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Grid>

            <AppModal
                open={addWalletModal}
                onClose={() => {
                    setAddWalletModal(false);
                    setSelectedWallet();
                }}
                onConfirm={handleAddWallet}
            >
                <WalletForm
                    title="Create New Wallet"
                    wallet={selectedWallet}
                    setWallet={setSelectedWallet}
                />
            </AppModal>

            <AppModal
                open={editWalletModal}
                onClose={() => {
                    setEditWalletModal(false);
                    setSelectedWallet();
                }}
                onConfirm={editWallet}
            >
                <WalletForm
                    title="Edit Wallet"
                    wallet={selectedWallet}
                    setWallet={setSelectedWallet}
                    action="edit"
                />
            </AppModal>

            <AppModal
                open={deleteWalletModal}
                onClose={() => setDeleteWalletModal(false)}
                onConfirm={deleteWallet}
            >
                <Typography sm={12} variant="h4">
                    Delete wallet {selectedWallet && selectedWallet.name}
                </Typography>
            </AppModal>
        </Grid>
    );
};

export default Home;

const Wallet = ({ color, name, balance, onDelete, onEdit }) => {
    const walletStyle = {
        backgroundColor: "#F7F6FA",
        borderRadius: 5,
        minWidth: "250px",
        padding: 1.5,
        boxShadow: 3,
    };

    return (
        <Box mx={1.5} sx={walletStyle}>
            <Box
                sx={{
                    backgroundColor: color,
                    border: "2px solid black",
                    height: "25px",
                    width: "35px",
                    borderRadius: 4,
                }}
            ></Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {name}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {balance}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6">HRK</Typography>
                <Box>
                    <IconButton
                        onClick={onEdit}
                        sx={{ backgroundColor: "#F1ECFD" }}
                    >
                        <EditRoundedIcon fontSize="inherit" color="primary" />
                    </IconButton>
                    <IconButton
                        onClick={onDelete}
                        sx={{ backgroundColor: "#F1ECFD", marginLeft: "15px" }}
                    >
                        <DeleteIcon
                            fontSize="inherit"
                            sx={{ color: "#FF6D6D" }}
                        />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};

const WalletForm = ({ title, wallet, setWallet, action = "add" }) => {
    const [walletName, setWalletName] = useState("");
    const [walletBalance, setWalletBalance] = useState(0);
    const [walletColor, setWalletColor] = useState("");

    useEffect(() => {
        if (wallet) {
            setWalletName(wallet.name);
            setWalletBalance(wallet.balance);
            setWalletColor(wallet.color);
        } else {
            setWalletName("");
            setWalletBalance(0);
            setWalletColor("");
        }
    }, [wallet]);

    useEffect(() => {
        let tempWallet = {
            id: null,
            name: walletName,
            balance: walletBalance,
            color: walletColor,
        };
        if (wallet && wallet.id) {
            tempWallet.id = wallet.id;
        }

        setWallet(tempWallet);
    }, [walletName, walletBalance, walletColor]);

    return (
        <Grid container alignItems="center" direction="column">
            <Typography sm={12} variant="h4">
                {title}
            </Typography>
            <Stack
                my={5}
                sx={{
                    width: "500px",
                }}
            >
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
                    disabled={action === "edit"}
                    placeholder="Current balance"
                />

                <ColorPicker
                    value={walletColor}
                    onChange={(event) => {
                        setWalletColor(event.css.backgroundColor);
                    }}
                />
            </Stack>
        </Grid>
    );
};
