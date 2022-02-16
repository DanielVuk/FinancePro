import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import {
    Box,
    Button,
    Card,
    Container,
    Grid,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import { ColorPicker } from "material-ui-color";
import React, { useContext, useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";
import AppInput from "../components/AppInput";
import AppModal from "../components/modals/AppModal";
import { Context } from "../Store";

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
];

const Home = () => {
    const [state, setState] = useContext(Context);

    const [addWalletModal, setAddWalletModal] = useState(false);
    const [deleteWalletModal, setDeleteWalletModal] = useState(false);
    const [editWalletModal, setEditWalletModal] = useState(false);

    const [selectedWallet, setSelectedWallet] = useState();

    const addWallet = (wallet) => {
        let newWallet = { id: state.wallets.length + 1, ...wallet };
        let newWallets = [...state.wallets, newWallet];
        setState({ ...state, wallets: newWallets });

        setAddWalletModal(false);
    };

    const deleteWallet = () => {
        let newWallets = [...state.wallets].filter(
            (w) => w.id !== selectedWallet.id
        );
        setState({ ...state, wallets: newWallets });

        setDeleteWalletModal(false);
    };

    const editWallet = (wallet) => {
        var index = state.wallets.findIndex(
            (item) => item.id === selectedWallet.id
        );
        let tempWallets = [...state.wallets];
        tempWallets[index] = { id: selectedWallet.id, ...wallet };
        setState({ ...state, wallets: tempWallets });

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
                        {state.wallets.reduce(
                            (prev, curr) => prev + +curr.balance,
                            0
                        )}
                    </Typography>
                </Stack>
            </Grid>
            <Container maxWidth="xl">
                <Typography
                    variant="h4"
                    sx={{ color: "white" }}
                    mt={-13}
                    mb={2}
                >
                    Wallets:
                </Typography>
                <Carousel breakPoints={breakPoints}>
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
                            marginBottom: "5px",
                        }}
                    >
                        <AddCircleOutlineRoundedIcon fontSize="large" />
                    </Button>
                    {state.wallets.map((wallet) => (
                        <Card
                            sx={{
                                backgroundColor: "transparent",
                                boxShadow: 0,
                            }}
                        >
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
                        </Card>
                    ))}
                </Carousel>
            </Container>
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
                <Stack spacing={5} sx={{ alignItems: "center" }}>
                    <Typography
                        sm={12}
                        variant="h4"
                        sx={{ fontWeight: "bold" }}
                    >
                        Delete wallet {selectedWallet && selectedWallet.name}?
                    </Typography>
                    <Typography variant="h6">
                        Once deleted cannot be recovered.
                    </Typography>
                    <Stack direction="row" spacing={15}>
                        <IconButton
                            onClick={() => setDeleteWalletModal(false)}
                            sx={{ backgroundColor: "#F1ECFD" }}
                        >
                            <CloseRoundedIcon
                                fontSize="inherit"
                                color="primary"
                            />
                        </IconButton>
                        <IconButton
                            onClick={deleteWallet}
                            sx={{ backgroundColor: "#F1ECFD" }}
                        >
                            <CheckRoundedIcon
                                fontSize="inherit"
                                color="primary"
                            />
                        </IconButton>
                    </Stack>
                </Stack>
            </AppModal>
        </Grid>
    );
};

export default Home;

const Wallet = ({ color, name, balance, onDelete, onEdit }) => {
    const walletStyle = {
        backgroundColor: "#F7F6FA",
        borderRadius: 5,
        padding: 1.5,
        boxShadow: 3,
        minWidth: "250px",
        marginBottom: "5px",
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
        if (action === "add") {
            setWalletName("");
            setWalletBalance(0);
            setWalletColor("black");
        } else if (action === "edit") {
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
                        label="Name"
                        placeholder="Wallet name"
                        value={walletName}
                        required
                        setValue={setWalletName}
                        sx={{ marginBottom: 5 }}
                    />
                    <AppInput
                        label="Balance"
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
                            paddingRight: "10px",
                        }}
                        fullWidth
                    >
                        <Typography
                            ml={1.5}
                            sx={{ color: "#5D2DFD", fontWeight: 600 }}
                        >
                            Wallet color
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
                </Stack>
                <Stack direction="row" spacing={8}>
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
