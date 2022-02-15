import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

import {
    Box,
    Button,
    Grid,
    Stack,
    Typography,
    IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AppModal from "../components/modals/AppModal";
import AppInput from "../components/AppInput";
import { ColorPicker } from "material-ui-color";

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

    const addWallet = (wallet) => {
        var newWallet = { id: wallets.length + 1, ...wallet };
        let newWallets = [...wallets, newWallet];
        setWallets(newWallets);

        setAddWalletModal(false);
    };

    const deleteWallet = () => {
        let newWallets = [...wallets].filter((w) => w.id !== selectedWallet.id);
        setWallets(newWallets);

        setDeleteWalletModal(false);
    };

    const editWallet = (wallet) => {
        var index = wallets.findIndex((item) => item.id === selectedWallet.id);
        let tempWallets = [...wallets];
        tempWallets[index] = { id: selectedWallet.id, ...wallet };
        setWallets(tempWallets);

        setEditWalletModal(false);
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
                        {wallets.reduce(
                            (prev, curr) => prev + +curr.balance,
                            0
                        )}
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
                                onClick={() => {
                                    setAddWalletModal(true);
                                }}
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
                                        setSelectedWallet(wallet);
                                        setDeleteWalletModal(true);
                                    }}
                                    onEdit={() => {
                                        setSelectedWallet(wallet);
                                        setEditWalletModal(true);
                                    }}
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
                }}
            >
                <WalletForm
                    title="Create New Wallet"
                    onConfirm={addWallet}
                    onClose={() => setAddWalletModal(false)}
                    open={addWalletModal}
                    wallet={selectedWallet}
                />
            </AppModal>

            <AppModal
                open={editWalletModal}
                onClose={() => {
                    setEditWalletModal(false);
                }}
            >
                <WalletForm
                    title="Edit Wallet"
                    action="edit"
                    onConfirm={editWallet}
                    onClose={() => setEditWalletModal(false)}
                    open={editWalletModal}
                    wallet={selectedWallet}
                />
            </AppModal>

            <AppModal
                open={deleteWalletModal}
                onClose={() => setDeleteWalletModal(false)}
            >
                <Typography sm={12} variant="h4">
                    Are you sure you want to delete wallet{" "}
                    {selectedWallet && selectedWallet.name}?
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

const WalletForm = ({
    title,
    action = "add",
    onConfirm,
    onClose,
    open,
    wallet = null,
}) => {
    const [walletName, setWalletName] = useState("");
    const [walletBalance, setWalletBalance] = useState(0);
    const [walletColor, setWalletColor] = useState("black");

    useEffect(() => {
        if (action == "add") {
            setWalletName("");
            setWalletBalance(0);
            setWalletColor("black");
        } else if (action == "edit") {
            if (wallet) {
                setWalletName(wallet.name);
                setWalletBalance(wallet.balance);
                setWalletColor(wallet.color);
            }
        }
    }, [open]);

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                onConfirm({
                    name: walletName,
                    balance: walletBalance,
                    color: walletColor,
                });
            }}
        >
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
                        required
                        setValue={setWalletName}
                        sx={{ marginBottom: 5 }}
                    />

                    <AppInput
                        value={walletBalance}
                        setValue={setWalletBalance}
                        type="number"
                        required
                        sx={{ marginBottom: 5 }}
                        disabled={action === "edit"}
                        placeholder="Current balance"
                    />

                    <Box
                        sx={{
                            border: "1px solid lightgrey",
                            borderRadius: "4px",
                            display: "flex",
                            alignItems: "center",
                            height: "56px",
                            justifyContent: "space-between",
                        }}
                        fullWidth
                    >
                        <Typography
                            ml={1.5}
                            sx={{ color: "#5D2DFD", fontWeight: 600 }}
                        >
                            Wallet color: {walletColor}
                        </Typography>

                        <ColorPicker
                            value={walletColor}
                            hideTextfield
                            defaultValue="black"
                            onChange={(event) => {
                                setWalletColor(event.css.backgroundColor);
                            }}
                        />
                    </Box>

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
                            type="submit"
                            sx={{ backgroundColor: "#F1ECFD" }}
                        >
                            <CheckRoundedIcon
                                fontSize="inherit"
                                color="primary"
                            />
                        </IconButton>
                    </Box>
                </Stack>
            </Grid>
        </form>
    );
};
