import { Box, Card, IconButton, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { Context } from "../Store";
import GetIcon from "./GetIcon";

const dateFormat = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
});
const timeFromat = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
});

const Transaction = ({ transaction, onDelete, onEdit, onSelect }) => {
    const [state] = useContext(Context);

    let categoryIndex = state.categories.findIndex(
        (item) => item.id === transaction.categoryId
    );

    let toWalletIndex = state.wallets.findIndex(
        (item) => item.id === transaction.toWalletId
    );
    let fromWalletIndex = state.wallets.findIndex(
        (item) => item.id === transaction.fromWalletId
    );

    return (
        <Card
            onClick={onSelect}
            sx={{
                display: { md: "flex", sm: "block" },
                alignItems: "center",
                width: { md: "100%", sm: "62%", xs: "100%" },
                borderRadius: 5,
                margin: "0 23px 23px 23px",
                boxShadow: 3,
                backgroundColor: "#F7F6FA",
                justifyContent: "space-between",
                padding: "15px",
            }}
        >
            <Box sx={{ display: "flex" }}>
                <Box
                    mr={1}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "white",
                        height: "50px",
                        width: "50px",
                        border: "4px solid",

                        borderColor:
                            categoryIndex !== -1
                                ? state.categories[categoryIndex].color
                                : "primay.main",
                        borderRadius: "25px",
                    }}
                >
                    <GetIcon
                        iconName={
                            categoryIndex === -1
                                ? "dolar"
                                : state.categories[categoryIndex].icon
                        }
                        color="primary.main"
                        size="large"
                    />
                </Box>
                <Stack>
                    <Typography sx={{ fontWeight: "bold" }}>
                        {categoryIndex !== -1
                            ? state.categories[categoryIndex].name
                            : "Transfer"}
                    </Typography>
                    <Typography noWrap>
                        {dateFormat.format(transaction.date)}{" "}
                        {timeFromat.format(transaction.date)}
                    </Typography>
                </Stack>
            </Box>
            <Typography noWrap sx={{ margin: { xs: "2px 0", md: "0 10px" } }}>
                {transaction.note}
            </Typography>
            <Box
                sx={{
                    display: { sm: "flex", xs: "block" },
                    alignItems: "center",
                }}
            >
                <Box sx={{ marginRight: "15px" }}>
                    {toWalletIndex !== -1 ? (
                        <Typography noWrap>
                            To:{" "}
                            {transaction.toWalletId && (
                                <strong>
                                    {state.wallets[toWalletIndex].name}
                                </strong>
                            )}
                        </Typography>
                    ) : null}
                    {fromWalletIndex !== -1 ? (
                        <Typography noWrap>
                            From:{" "}
                            <strong>
                                {state.wallets[fromWalletIndex].name}
                            </strong>
                        </Typography>
                    ) : null}
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        color={"primary.main"}
                        sx={{
                            fontWeight: "bold",
                            marginRight: "15px",
                        }}
                    >
                        {transaction.amount}
                    </Typography>
                    <IconButton
                        onClick={onDelete}
                        sx={{
                            backgroundColor: "background.default",
                        }}
                    >
                        <GetIcon iconName="delete" color="error.main" />
                    </IconButton>
                    <IconButton
                        onClick={onEdit}
                        sx={{
                            backgroundColor: "background.default",
                            margin: "3px 15px",
                        }}
                    >
                        <GetIcon iconName="edit" color="primary.main" />
                    </IconButton>
                </Box>
            </Box>
        </Card>
    );
};

export default Transaction;
