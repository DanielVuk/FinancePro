import { Container, Grid, Stack, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import AppModal from "../components/AppModal";
import CategoriesCarousel from "../components/Carousels/CategoriesCarousel";
import TransactionsCarousel from "../components/Carousels/TransactionsCarousel";
import WalletsCarousel from "../components/Carousels/WalletsCarousel";
import CategoryForm from "../components/Forms/CategoryForm";
import DeleteForm from "../components/Forms/DeleteForm";
import WalletForm from "../components/Forms/WalletForm";
import { Context } from "../Store";
const Home = () => {
    const [state, setState] = useContext(Context);

    const [addWalletModal, setAddWalletModal] = useState(false);
    const [deleteWalletModal, setDeleteWalletModal] = useState(false);
    const [editWalletModal, setEditWalletModal] = useState(false);

    const [addCategoryModal, setAddCategoryModal] = useState(false);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
    const [editCategoryModal, setEditCategoryModal] = useState(false);

    const [selectedWallet, setSelectedWallet] = useState();
    const [selectedCategory, setSelectedCategory] = useState();

    const addWallet = (wallet) => {
        let newWallet = {
            id: state.wallets[state.wallets.length - 1].id + 1,
            ...wallet,
        };
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
        let index = state.wallets.findIndex(
            (item) => item.id === selectedWallet.id
        );
        let tempWallets = [...state.wallets];
        tempWallets[index] = { id: selectedWallet.id, ...wallet };
        setState({ ...state, wallets: tempWallets });

        setEditWalletModal(false);
    };

    const addCategory = (category) => {
        let newCategory = {
            id: state.categories[state.categories.length - 1].id + 1,
            ...category,
        };
        let newCategories = [...state.categories, newCategory];
        setState({ ...state, categories: newCategories });

        setAddCategoryModal(false);
    };

    const editCategory = (category) => {
        let index = state.categories.findIndex(
            (item) => item.id === selectedCategory.id
        );
        let tempCategories = [...state.categories];
        tempCategories[index] = { id: selectedCategory.id, ...category };
        setState({ ...state, categories: tempCategories });

        setEditCategoryModal(false);
    };

    const deleteCategory = () => {
        let newCategories = [...state.categories].filter(
            (w) => w.id !== selectedCategory.id
        );
        setState({ ...state, categories: newCategories });

        setDeleteCategoryModal(false);
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
                    }}
                    selected={selectedWallet}
                />
                <CategoriesCarousel
                    onAdd={() => {
                        setAddCategoryModal(true);
                    }}
                    onDelete={() => {
                        setDeleteCategoryModal(true);
                    }}
                    onEdit={() => {
                        setEditCategoryModal(true);
                    }}
                    onSelect={(category) => {
                        setSelectedCategory(category);
                    }}
                    selected={selectedCategory}
                />

                <TransactionsCarousel />
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

            <AppModal
                open={addCategoryModal}
                onClose={() => setAddCategoryModal(false)}
            >
                <CategoryForm
                    title="Create New Category"
                    onClose={() => setAddCategoryModal(false)}
                    onConfirm={addCategory}
                    open={addCategoryModal}
                />
            </AppModal>
            <AppModal
                open={editCategoryModal}
                onClose={() => setEditCategoryModal(false)}
            >
                <CategoryForm
                    action="edit"
                    title="Edit Category"
                    onClose={() => setEditCategoryModal(false)}
                    onConfirm={editCategory}
                    open={editCategoryModal}
                    category={selectedCategory}
                />
            </AppModal>
            <AppModal
                open={deleteCategoryModal}
                onClose={() => setDeleteCategoryModal(false)}
            >
                <DeleteForm
                    onClose={() => setDeleteCategoryModal(false)}
                    onDelete={deleteCategory}
                    Title={
                        <>
                            Delete category{" "}
                            {selectedCategory && selectedCategory.name}?
                        </>
                    }
                />
            </AppModal>
        </Grid>
    );
};

export default Home;
