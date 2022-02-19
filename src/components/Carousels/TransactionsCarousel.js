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

const TransactionsCarousel = () => {
    const [state] = useContext(Context);

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
                <Box>
                    <IconButton
                    // onClick={onAdd}
                    >
                        <GetIcon
                            iconName="add"
                            color="primary.main"
                            size="large"
                        />
                    </IconButton>
                </Box>
            </Box>
            <Carousel breakPoints={breakPointsForTransactions} verticalMode>
                {state.transactions.map((transaction) => (
                    <Transaction
                        key={transaction.id}
                        transaction={transaction}
                    />
                ))}
            </Carousel>
        </>
    );
};

export default TransactionsCarousel;
