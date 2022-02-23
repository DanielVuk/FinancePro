import { Container, Grid, Stack, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import AppModal from "../components/AppModal";
import CategoriesCarousel from "../components/Carousels/CategoriesCarousel";
import TransactionsCarousel from "../components/Carousels/TransactionsCarousel";
import WalletsCarousel from "../components/Carousels/WalletsCarousel";
import CategoryForm from "../components/Forms/CategoryForm";
import DeleteForm from "../components/Forms/DeleteForm";
import TransactionForm from "../components/Forms/TransactionForm";
import WalletForm from "../components/Forms/WalletForm";
import { getTotalBalance } from "../Functions/updateWallets";
import { Context } from "../Store";

const Home = () => {
    const [state, setState] = useContext(Context);

    const [addWalletModal, setAddWalletModal] = useState(false);
    const [deleteWalletModal, setDeleteWalletModal] = useState(false);
    const [editWalletModal, setEditWalletModal] = useState(false);

    const [addCategoryModal, setAddCategoryModal] = useState(false);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
    const [editCategoryModal, setEditCategoryModal] = useState(false);

    const [addTransactionModal, setAddTransactionModal] = useState(false);
    const [deleteTransactionModal, setDeleteTransactionModal] = useState(false);
    const [editTransactionModal, setEditTransactionModal] = useState(false);

    const [selectedWallet, setSelectedWallet] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedTransaction, setSelectedTransaction] = useState();

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

    const addTransaction = (transaction) => {
        let newTransaction = {
            id: state.transactions[state.transactions.length - 1].id + 1,
            ...transaction,
        };
        let newTransactions = [...state.transactions, newTransaction];

        setState({ ...state, transactions: newTransactions });

        setAddTransactionModal(false);
    };

    const editTransaction = (transaction) => {
        let index = state.transactions.findIndex(
            (item) => item.id === selectedTransaction.id
        );
        let tempTransactions = [...state.transactions];

        tempTransactions[index] = {
            id: selectedTransaction.id,
            ...transaction,
        };

        setState({ ...state, transactions: tempTransactions });

        setEditTransactionModal(false);
    };

    const deleteTransaction = () => {
        let newTransactions = [...state.transactions].filter(
            (t) => t.id !== selectedTransaction.id
        );

        setState({ ...state, transactions: newTransactions });

        setDeleteTransactionModal(false);
    };

    return (
        <Grid
            container
            maxWidth="fluid"
            justifyContent="center"
            sx={{ minWidth: "550px" }}
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
                        {getTotalBalance(state)}
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
                        wallet !== selectedWallet
                            ? setSelectedWallet(wallet)
                            : setSelectedWallet("");
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
                        category !== selectedCategory
                            ? setSelectedCategory(category)
                            : setSelectedCategory("");
                    }}
                    selected={selectedCategory}
                />

                <TransactionsCarousel
                    onAdd={() => {
                        setAddTransactionModal(true);
                    }}
                    onDelete={() => setDeleteTransactionModal(true)}
                    onEdit={() => setEditTransactionModal(true)}
                    onSelect={(transaction) => {
                        setSelectedTransaction(transaction);
                    }}
                    selectedCategory={selectedCategory}
                    selectedWallet={selectedWallet}
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
                    category={selectedCategory}
                    onClose={() => setEditCategoryModal(false)}
                    onConfirm={editCategory}
                    open={editCategoryModal}
                    title="Edit Category"
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

            <AppModal
                open={addTransactionModal}
                onClose={() => setAddTransactionModal(false)}
            >
                <TransactionForm
                    onClose={() => setAddTransactionModal(false)}
                    onConfirm={addTransaction}
                    open={addTransactionModal}
                    title="Create New Transaction"
                />
            </AppModal>

            <AppModal
                open={editTransactionModal}
                onClose={() => setEditTransactionModal(false)}
            >
                <TransactionForm
                    action="edit"
                    onClose={() => setEditTransactionModal(false)}
                    onConfirm={editTransaction}
                    open={editTransactionModal}
                    title="Edit Transaction"
                    transaction={selectedTransaction}
                />
            </AppModal>

            <AppModal
                open={deleteTransactionModal}
                onClose={() => setDeleteTransactionModal(false)}
            >
                <DeleteForm
                    onClose={() => setDeleteTransactionModal(false)}
                    onDelete={deleteTransaction}
                    Title={
                        <>Are you sure you want to delete the transaction?</>
                    }
                />
            </AppModal>
        </Grid>
    );
};

export default Home;
