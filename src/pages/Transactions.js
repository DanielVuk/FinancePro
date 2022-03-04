import { Box, Container } from "@mui/material";
import {
    DataGrid,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton,
} from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import AppModal from "../components/AppModal";
import AppButton from "../components/Buttons/AppButton";
import useSnackBar from "../components/CustomSnackBar";
import { dateFormat, timeFormat } from "../components/DateTimeFormat";
import DeleteForm from "../components/Forms/DeleteForm";
import TransactionForm from "../components/Forms/TransactionForm";
import GetIcon from "../components/GetIcon";
import {
    addTransaction,
    deleteTransaction,
    editTransaction,
} from "../rest/transactions";
import { Context } from "../Store";

const Transactions = () => {
    const [state, setState] = useContext(Context);
    const [selectionModel, setSelectionModel] = useState([]);

    const { SnackBar, openSnackBarHelper } = useSnackBar();
    const [rows, setRows] = useState([]);

    const [addTransactionModal, setAddTransactionModal] = useState(false);
    const [editTransactionModal, setEditTransactionModal] = useState(false);
    const [deleteTransactionModal, setDeleteTransactionModal] = useState(false);

    useEffect(() => {
        setRows(
            state.transactions.map((t) => ({
                id: t.id,
                col1: t.type,
                col2: `${dateFormat.format(
                    new Date(t.date)
                )} ${timeFormat.format(new Date(t.date))}`,
                col3:
                    t.categoryId !== ""
                        ? state.categories.find((c) => c.id === t.categoryId)
                              .name
                        : "-",
                col4:
                    t.toWalletId !== ""
                        ? state.wallets.find((w) => w.id === t.toWalletId).name
                        : "-",
                col5:
                    t.fromWalletId !== ""
                        ? state.wallets.find((w) => w.id === t.fromWalletId)
                              .name
                        : "-",
                col6: t.amount + " HRK",
                col7: t.note,
            }))
        );
    }, [state.transactions]);

    const columns = [
        { field: "col1", headerName: "Type", minWidth: 150, flex: 1 },
        { field: "col2", headerName: "Date", minWidth: 220, flex: 1 },
        { field: "col3", headerName: "Category", minWidth: 220, flex: 1 },
        { field: "col4", headerName: "To Wallet", minWidth: 150, flex: 1 },
        { field: "col5", headerName: "From Wallet", minWidth: 150, flex: 1 },
        { field: "col6", headerName: "Amount", minWidth: 150, flex: 1 },
        { field: "col7", headerName: "Note", minWidth: 330, flex: 1 },
    ];

    const handleAddTransaction = async (transaction) => {
        try {
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

            setState({ ...state, transactions: newTransactions });

            setAddTransactionModal(false);

            openSnackBarHelper(`Transaction is successfully added!`);
        } catch (error) {
            openSnackBarHelper(error.message, "error");
        }
    };

    const handleEditTransaction = async (transaction) => {
        try {
            let result = await editTransaction(
                { ...transaction, userId: state.user.id },
                selectionModel[0],
                state.user.token
            );

            let index = state.transactions.findIndex(
                (item) => item.id === selectionModel[0]
            );
            let tempTransactions = [...state.transactions];

            tempTransactions[index] = {
                id: selectionModel[0],
                ...result.data,
            };

            setState({ ...state, transactions: tempTransactions });

            setEditTransactionModal(false);

            openSnackBarHelper(`Transaction is successfully edited!`);
        } catch (error) {
            openSnackBarHelper(error.message, "error");
        }
    };

    const handleDeleteTransaction = async () => {
        try {
            selectionModel.forEach(async (item) => {
                await deleteTransaction(
                    state.transactions.filter((t) => t.id === item)[0].id,
                    state.user.token
                );

                let newTransactions = [...state.transactions];
                selectionModel.forEach((item) => {
                    newTransactions = newTransactions.filter(
                        (t) => t.id !== item
                    );
                });

                setState({ ...state, transactions: newTransactions });

                setDeleteTransactionModal(false);

                openSnackBarHelper(`Transaction(s) is successfully deleted!`);
            });
        } catch (error) {
            openSnackBarHelper(error.message, "error");
        }
    };

    const CustomToolbar = () => {
        return (
            <GridToolbarContainer>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport />
                <AppButton
                    onClick={() => {
                        setAddTransactionModal(true);
                    }}
                    startIcon={<GetIcon iconName="add" />}
                >
                    ADD
                </AppButton>
                {selectionModel.length === 1 ? (
                    <AppButton
                        onClick={() => {
                            setEditTransactionModal(true);
                        }}
                        startIcon={<GetIcon iconName="edit" />}
                    >
                        EDIT
                    </AppButton>
                ) : null}
                {selectionModel.length > 0 ? (
                    <AppButton
                        onClick={() => {
                            setDeleteTransactionModal(true);
                        }}
                        startIcon={<GetIcon iconName="delete" />}
                    >
                        DELETE
                    </AppButton>
                ) : null}
            </GridToolbarContainer>
        );
    };

    return (
        <Container maxWidth="xl">
            <Box
                mt={5}
                sx={{
                    backgroundColor: "white",
                    width: "100%",
                    borderRadiu: 1,
                }}
            >
                <Box
                    p={1}
                    sx={{
                        display: "flex",
                        height: "100%",
                    }}
                >
                    <Box sx={{ flexGrow: 1 }}>
                        <DataGrid
                            columns={columns}
                            rows={rows}
                            components={{ Toolbar: CustomToolbar }}
                            autoHeight
                            checkboxSelection
                            onSelectionModelChange={(newSelectionModel) => {
                                setSelectionModel(newSelectionModel);
                            }}
                            selectionModel={selectionModel}
                            sx={{
                                "& .green": {
                                    backgroundColor: "#F0F5EF",
                                },
                                "& .red": {
                                    backgroundColor: "#FDF4F4",
                                },
                                "& .grey": {
                                    backgroundColor: "#EDF5FB",
                                },
                            }}
                            getRowClassName={(params) => {
                                if (params.row.col1 === "income") {
                                    return "green";
                                }
                                if (params.row.col1 === "expense") {
                                    return "red";
                                }
                                if (params.row.col1 === "transfer") {
                                    return "grey";
                                }
                            }}
                        />
                    </Box>
                </Box>
            </Box>

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
                    transaction={state.transactions.find(
                        (t) => t.id === selectionModel[0]
                    )}
                />
            </AppModal>
            <AppModal
                open={deleteTransactionModal}
                onClose={() => setDeleteTransactionModal(false)}
            >
                <DeleteForm
                    onClose={() => setDeleteTransactionModal(false)}
                    onDelete={handleDeleteTransaction}
                    Title={
                        <>Are you sure you want to delete the transaction?</>
                    }
                />
            </AppModal>
            <SnackBar />
        </Container>
    );
};

export default Transactions;
