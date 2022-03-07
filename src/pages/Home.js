import { Container, Grid, Stack, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import AppModal from "../components/AppModal";
import CategoriesCarousel from "../components/Carousels/CategoriesCarousel";
import TransactionsCarousel from "../components/Carousels/TransactionsCarousel";
import WalletsCarousel from "../components/Carousels/WalletsCarousel";
import useSnackBar from "../components/CustomSnackBar";
import CategoryForm from "../components/Forms/CategoryForm";
import DeleteForm from "../components/Forms/DeleteForm";
import TransactionForm from "../components/Forms/TransactionForm";
import WalletForm from "../components/Forms/WalletForm";
import { getTotalBalance } from "../functions/updateWallets";
import { addCategory, deleteCategory, editCategory } from "../rest/categories";
import {
    addTransaction,
    deleteTransaction,
    editTransaction,
} from "../rest/transactions";
import { addWallet, deleteWallet, editWallet } from "../rest/wallets";
import { Context } from "../Store";

const Home = () => {
    const [state, setState] = useContext(Context);

    const { SnackBar, openSnackBarHelper } = useSnackBar();

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

    console.log("State: ", state);

    const handleAddWallet = async (wallet) => {
        try {
            setState({ ...state, loading: true });
            let result = await addWallet(
                wallet,
                state.user.token,
                state.user.id
            );

            let newWallet = {
                id: result.data.name,
                userId: state.user.id,
                ...wallet,
            };

            let newWallets = [...state.wallets, newWallet];
            setState({ ...state, wallets: newWallets, loading: false });
            setAddWalletModal(false);

            openSnackBarHelper(`${wallet.name} is successfully created!`);
        } catch (error) {
            openSnackBarHelper(error.message, "error");
            setState({ ...state, loading: false });
        }
    };

    const handleDeleteWallet = async () => {
        try {
            setState({ ...state, loading: true });
            await deleteWallet(selectedWallet.id, state.user.token);

            let transactionsForDelete = [...state.transactions].filter(
                (t) =>
                    t.toWalletId === selectedWallet.id ||
                    t.fromWalletId === selectedWallet.id
            );

            transactionsForDelete.forEach(async (t) => {
                await deleteTransaction(t.id, state.user.token);
            });

            let newWallets = [...state.wallets].filter(
                (w) => w.id !== selectedWallet.id
            );

            let newTransactions = [...state.transactions].filter(
                (t) =>
                    t.toWalletId !== selectedWallet.id &&
                    t.fromWalletId !== selectedWallet.id
            );

            setState({
                ...state,
                wallets: newWallets,
                transactions: newTransactions,
                loading: false,
            });

            setSelectedWallet("");

            setDeleteWalletModal(false);

            openSnackBarHelper(
                `${selectedWallet.name} is successfully deleted!`
            );
        } catch (error) {
            openSnackBarHelper(error.message, "error");
            setState({ ...state, loading: false });
        }
    };

    const handleEditWallet = async (wallet) => {
        try {
            setState({ ...state, loading: true });
            let result = await editWallet(
                { ...wallet, userId: state.user.id },
                selectedWallet.id,
                state.user.token
            );

            let index = state.wallets.findIndex(
                (item) => item.id === selectedWallet.id
            );
            let tempWallets = [...state.wallets];

            tempWallets[index] = { id: selectedWallet.id, ...result.data };

            setState({ ...state, wallets: tempWallets, loading: false });
            setSelectedWallet(tempWallets[index]);
            setEditWalletModal(false);

            openSnackBarHelper(`${wallet.name} is successfully edited!`);
        } catch (error) {
            openSnackBarHelper(error.message, "error");
            setState({ ...state, loading: false });
        }
    };

    const handleAddCategory = async (category) => {
        try {
            setState({ ...state, loading: true });
            let result = await addCategory(
                category,
                state.user.token,
                state.user.id
            );

            let newCategory = {
                id: result.data.name,
                userId: state.user.id,
                ...category,
            };

            let newCategories = [...state.categories, newCategory];
            setState({ ...state, categories: newCategories, loading: false });

            setAddCategoryModal(false);

            openSnackBarHelper(`${category.name} is successfully added!`);
        } catch (error) {
            openSnackBarHelper(error.message, "error");
            setState({ ...state, loading: false });
        }
    };

    const handleDeleteCategory = async () => {
        try {
            setState({ ...state, loading: true });
            await deleteCategory(selectedCategory.id, state.user.token);

            let transactionsForDelete = [...state.transactions].filter(
                (t) => t.categoryId === selectedCategory.id
            );
            transactionsForDelete.forEach(async (t) => {
                await deleteTransaction(t.id, state.user.token);
            });

            let newCategories = [...state.categories].filter(
                (w) => w.id !== selectedCategory.id
            );

            let newTransactions = [...state.transactions].filter(
                (t) => t.categoryId !== selectedCategory.id
            );

            setState({
                ...state,
                loading: false,
                categories: newCategories,
                transactions: newTransactions,
            });

            setSelectedCategory("");

            openSnackBarHelper(
                `${selectedCategory.name} is successfully deleted!`
            );

            setDeleteCategoryModal(false);
        } catch (error) {
            openSnackBarHelper(error.message, "error");
            setState({ ...state, loading: false });
        }
    };

    const handleEditCategory = async (category) => {
        try {
            setState({ ...state, loading: true });
            let result = await editCategory(
                { ...category, userId: state.user.id },
                selectedCategory.id,
                state.user.token
            );

            let index = state.categories.findIndex(
                (item) => item.id === selectedCategory.id
            );

            let tempCategories = [...state.categories];

            tempCategories[index] = { id: selectedCategory.id, ...result.data };

            setState({ ...state, categories: tempCategories, loading: false });
            setSelectedCategory(tempCategories[index]);
            setEditCategoryModal(false);

            openSnackBarHelper(`${category.name} is successfully edited!`);
        } catch (error) {
            openSnackBarHelper(error.message, "error");
            setState({ ...state, loading: false });
        }
    };

    const handleAddTransaction = async (transaction) => {
        try {
            setState({ ...state, loading: true });
            let result = await addTransaction(
                transaction,
                state.user.token,
                state.user.id
            );

            let newTransaction = {
                id: result.data.name,
                userId: state.user.id,
                ...transaction,
            };

            let newTransactions = [...state.transactions, newTransaction];

            setState({
                ...state,
                transactions: newTransactions,
                loading: false,
            });

            setAddTransactionModal(false);

            openSnackBarHelper(`Transaction is successfully added!`);
        } catch (error) {
            openSnackBarHelper(error.message, "error");
            setState({ ...state, loading: false });
        }
    };

    const handleEditTransaction = async (transaction) => {
        try {
            setState({ ...state, loading: true });
            let result = await editTransaction(
                { ...transaction, userId: state.user.id },
                selectedTransaction.id,
                state.user.token
            );

            let index = state.transactions.findIndex(
                (item) => item.id === selectedTransaction.id
            );
            let tempTransactions = [...state.transactions];

            tempTransactions[index] = {
                id: selectedTransaction.id,
                ...result.data,
            };

            setState({
                ...state,
                transactions: tempTransactions,
                loading: false,
            });

            setEditTransactionModal(false);

            openSnackBarHelper(`Transaction is successfully edited!`);
        } catch (error) {
            openSnackBarHelper(error.message, "error");
            setState({ ...state, loading: false });
        }
    };

    const handleDeleteTransaction = async () => {
        try {
            setState({ ...state, loading: true });
            await deleteTransaction(selectedTransaction.id, state.user.token);

            let newTransactions = [...state.transactions].filter(
                (t) => t.id !== selectedTransaction.id
            );

            setState({
                ...state,
                transactions: newTransactions,
                loading: false,
            });

            setDeleteTransactionModal(false);

            openSnackBarHelper(`Transaction is successfully deleted!`);
        } catch (error) {
            openSnackBarHelper(error.message, "error");
            setState({ ...state, loading: false });
        }
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
                    onConfirm={handleAddWallet}
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
                    onConfirm={handleEditWallet}
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
                    onDelete={handleDeleteWallet}
                    title={
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
                    onConfirm={handleAddCategory}
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
                    onConfirm={handleEditCategory}
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
                    onDelete={handleDeleteCategory}
                    title={
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
                    onConfirm={handleAddTransaction}
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
                    onConfirm={handleEditTransaction}
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
                    onDelete={handleDeleteTransaction}
                    title={
                        <>Are you sure you want to delete the transaction?</>
                    }
                />
            </AppModal>

            <SnackBar />
        </Grid>
    );
};

export default Home;
