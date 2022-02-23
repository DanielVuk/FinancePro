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
import { dateFormat, timeFormat } from "../components/DateTimeFormat";
import DeleteForm from "../components/Forms/DeleteForm";
import TransactionForm from "../components/Forms/TransactionForm";
import GetIcon from "../components/GetIcon";
import { Context } from "../Store";

const Transactions = () => {
    const [state, setState] = useContext(Context);
    const [selectionModel, setSelectionModel] = useState([]);

    const [addTransactionModal, setAddTransactionModal] = useState(false);
    const [deleteTransactionModal, setDeleteTransactionModal] = useState(false);

    const [rows, setRows] = useState([]);

    useEffect(() => {
        setRows(
            state.transactions.map((t) => ({
                id: t.id,
                col1: t.type,
                col2: `${dateFormat.format(t.date)} ${timeFormat.format(
                    t.date
                )}`,
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

    const addTransaction = (transaction) => {
        let newTransaction = {
            id: state.transactions[state.transactions.length - 1].id + 1,
            ...transaction,
        };

        let newTransactions = [...state.transactions, newTransaction];

        setState({ ...state, transactions: newTransactions });

        setAddTransactionModal(false);
    };

    const deleteTransaction = () => {
        let newTransactions = [...state.transactions];

        selectionModel.forEach((item) => {
            newTransactions = newTransactions.filter((t) => t.id !== item);
        });

        setState({ ...state, transactions: newTransactions });

        setDeleteTransactionModal(false);
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
                    onConfirm={addTransaction}
                    open={addTransactionModal}
                    title="Create New Transaction"
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
        </Container>
    );
};

export default Transactions;
