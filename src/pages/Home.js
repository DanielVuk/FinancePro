import { Container, Grid, Stack, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import AppModal from "../components/AppModal";
import CategoriesCarousel from "../components/Carousels/CategoriesCarousel";
import WalletsCarousel from "../components/Carousels/WalletsCarousel";
import DeleteForm from "../components/Forms/DeleteForm";
import WalletForm from "../components/Forms/WalletForm";
import { Context } from "../Store";

const Home = () => {
    const [state, setState] = useContext(Context);

    const [addWalletModal, setAddWalletModal] = useState(false);
    const [deleteWalletModal, setDeleteWalletModal] = useState(false);
    const [editWalletModal, setEditWalletModal] = useState(false);

    const [selectedWallet, setSelectedWallet] = useState();
    const [selectedCategory, setSelectedCategory] = useState();

    const addWallet = (wallet) => {
        let newWallet = {
            id: state.wallets[state.wallets.length - 1].id + 1,
            ...wallet,
        };
        let newWallets = [...state.wallets, newWallet];
        setState({ ...state, wallets: newWallets });
        console.log(state);
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
            sx={{ minWidth: "428px" }}
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
            <Container maxWidth="xl" sx={{ minWidth: "320px" }}>
                <WalletsCarousel
                    onAdd={() => {
                        setAddWalletModal(true);
                    }}
                    onDelete={() => {
                        setDeleteWalletModal(true);
                    }}
                    onEdit={() => {
                        setEditWalletModal(true);
                    }}
                    onSelect={(wallet) => {
                        setSelectedWallet(wallet);
                        console.log(wallet.name);
                    }}
                />
                <CategoriesCarousel
                    onAdd={() => {
                        //TODO: add modal
                        //  setAddWalletModal(true);
                    }}
                    onDelete={() => {
                        //TODO: ADD MODAL
                        setDeleteWalletModal(true);
                    }}
                    onEdit={() => {
                        //TODO: ADD MODAL
                        setEditWalletModal(true);
                    }}
                    onSelect={(category) => {
                        setSelectedCategory(category);
                        console.log(category.name);
                    }}
                />
            </Container>

            <AppModal
                open={addWalletModal}
                onClose={() => {
                    setAddWalletModal(false);
                }}
            >
                <WalletForm
                    title="Create New Wallet"
                    onClose={() => setAddWalletModal(false)}
                    onConfirm={addWallet}
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
                    action="edit"
                    title="Edit Wallet"
                    onClose={() => setEditWalletModal(false)}
                    onConfirm={editWallet}
                    open={editWalletModal}
                    wallet={selectedWallet}
                />
            </AppModal>
            <AppModal
                open={deleteWalletModal}
                onClose={() => setDeleteWalletModal(false)}
            >
                <DeleteForm
                    onClose={() => setDeleteWalletModal(false)}
                    onDelete={deleteWallet}
                    Title={
                        <>
                            Delete wallet{" "}
                            {selectedWallet && selectedWallet.name}?
                        </>
                    }
                />
            </AppModal>
        </Grid>
    );
};

export default Home;
