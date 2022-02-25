import { Box, IconButton, Typography } from "@mui/material";
import { useContext } from "react";
import Carousel from "react-elastic-carousel";
import { Context } from "../../Store";
import GetIcon from "../GetIcon";
import Transaction from "../Transaction";

const breakPointsForTransactions = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 1 },
    { width: 768, itemsToShow: 6 },
    { width: 1200, itemsToShow: 8 },
];

const TransactionsCarousel = ({
    onAdd,
    onDelete,
    onEdit,
    onSelect,
    selectedCategory,
    selectedWallet,
}) => {
    const [state] = useContext(Context);

    let transactionsToShow = state.transactions
        .filter((t) =>
            selectedWallet !== ""
                ? t.toWalletId === selectedWallet.id ||
                  t.fromWalletId === selectedWallet.id
                : true
        )
        .filter((t) =>
            selectedCategory !== ""
                ? t.categoryId === selectedCategory.id
                : true
        );

    return (
        <>
            <Box display={"flex"} alignItems="center">
                <Typography
                    my={4}
                    variant="h4"
                    color="text.secondary"
                    sx={{ fontWeight: "bold" }}
                >
                    Transactions: {state.transactions.length}
                </Typography>
                {state.wallets.length > 0 && state.categories.length > 0 ? (
                    <Box>
                        <IconButton onClick={onAdd}>
                            <GetIcon
                                iconName="add"
                                color="primary.main"
                                size="large"
                            />
                        </IconButton>
                    </Box>
                ) : null}
            </Box>
            {transactionsToShow.length === 0 ? (
                <Typography
                    my={5}
                    variant="h5"
                    align="center"
                    color="primary.main"
                >
                    There are no transactions to show.
                </Typography>
            ) : (
                <Carousel breakPoints={breakPointsForTransactions} verticalMode>
                    {transactionsToShow.map((transaction) => (
                        <Transaction
                            key={transaction.id}
                            onSelect={() => {
                                onSelect(transaction);
                            }}
                            transaction={transaction}
                            onDelete={onDelete}
                            onEdit={onEdit}
                        />
                    ))}
                </Carousel>
            )}
        </>
    );
};

export default TransactionsCarousel;
