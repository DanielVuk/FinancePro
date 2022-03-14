import {
    Box,
    Container,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from "@mui/material";
import {
    ArcElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from "chart.js";
import { useContext, useEffect, useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import { getWalletBalance } from "../components/UpdateWallets";
import { Context } from "../Store";

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const CheckType = (category, type) => {
    if (category.type.includes(type)) {
        return true;
    }
    return false;
};

const TransactionsCountByCategory = (state, type) => {
    let labels = state.categories
        .filter((c) => CheckType(c, type))
        .map((c) => c.name);

    let datasets = [
        {
            data: state.categories
                .filter((c) => CheckType(c, type))
                .map(
                    (c) =>
                        state.transactions.filter((t) => t.categoryId === c.id)
                            .length
                ),
            backgroundColor: state.categories.map((c) => c.color),
            borderColor: state.categories.map((c) => c.color),
            borderWidth: 1,
        },
    ];

    return {
        labels,
        datasets,
    };
};

const TransactionsSumByCategory = (state, type) => {
    let labels = state.categories
        .filter((c) => CheckType(c, type))
        .map((c) => c.name);

    let datasets = [
        {
            data: state.categories
                .filter((c) => CheckType(c, type))
                .map((c) =>
                    state.transactions
                        .filter((t) => t.categoryId === c.id)
                        .reduce(
                            (previousValue, currentValue) =>
                                +previousValue + +currentValue.amount,
                            0
                        )
                ),
            backgroundColor: state.categories.map((c) => c.color),
            borderColor: state.categories.map((c) => c.color),
            borderWidth: 1,
        },
    ];

    return {
        labels,
        datasets,
    };
};

const Analytics = () => {
    const [state] = useContext(Context);

    const [type, setType] = useState("income");
    const [typeOfData, setTypeOfData] = useState("count");

    const [labels, setLabels] = useState([]);
    const [datasets, setDatasets] = useState([]);

    useEffect(() => {
        let labels;
        let datasets;

        if (typeOfData === "count") {
            let countData = TransactionsCountByCategory(state, type);
            labels = countData.labels;
            datasets = countData.datasets;
        } else {
            let sumData = TransactionsSumByCategory(state, type);
            labels = sumData.labels;
            datasets = sumData.datasets;
        }
        setLabels(labels);
        setDatasets(datasets);
    }, [typeOfData, type]);

    const Chart1data = {
        labels: labels,
        datasets: datasets,
    };

    const walletsPie = {
        labels: state.wallets.map((w) => w.name),
        datasets: [
            {
                data: state.wallets.map((w) =>
                    getWalletBalance(w, state.transactions)
                ),
                backgroundColor: state.wallets.map((w) => w.color),
                borderWidth: 1,
            },
        ],
    };

    const getBalanceToDate = (start) => {
        const today = new Date();
        const prevDate = new Date().setDate(today.getDate() - start);

        const toDate = new Date(prevDate);

        let transactions = state.transactions.filter(
            (t) => new Date(t.date) < toDate
        );

        let balance = 0;
        state.wallets.forEach((wallet) => {
            balance += +getWalletBalance(wallet, transactions);
        });
        return balance;
    };

    const getBalanceToDatePerWallet = (start, wallet) => {
        const today = new Date();
        const prevDate = new Date().setDate(today.getDate() - start);

        const toDate = new Date(prevDate);

        let transactions = state.transactions.filter(
            (t) => new Date(t.date) < toDate
        );

        return getWalletBalance(wallet, transactions);
    };

    const lineChartData = {
        labels: ["last 4 week", "last 3 week", "last 2 week", "last 1 week"],
        datasets: [
            {
                label: "All wallets",
                data: [
                    getBalanceToDate(21),
                    getBalanceToDate(14),
                    getBalanceToDate(7),
                    getBalanceToDate(0),
                ],
                fill: false,
                borderColor: "#5D2DFD",
            },
            ...state.wallets.map((wallet) => ({
                label: wallet.name,
                data: [
                    getBalanceToDatePerWallet(21, wallet),
                    getBalanceToDatePerWallet(14, wallet),
                    getBalanceToDatePerWallet(7, wallet),
                    getBalanceToDatePerWallet(0, wallet),
                ],
                fill: false,
                borderColor: wallet.color,
            })),
        ],
    };

    return (
        <Container maxWidth="xl" sx={{ minWidth: "520px" }}>
            <Grid container sx={{ paddingBottom: "200px" }}>
                <Grid mt={5} item xs={12} sx={{ backgroundColor: "white" }}>
                    <Line
                        data={lineChartData}
                        options={{
                            responsive: true,
                            plugins: {
                                title: {
                                    display: true,
                                    text: "Wallet balances over the past 4 weeks",
                                },
                            },
                        }}
                    />
                </Grid>
                <Grid
                    container
                    item
                    xs={12}
                    md={6}
                    sx={{ justifyContent: "center", alignItems: "center" }}
                    mb={{ xs: 9, md: 0 }}
                >
                    {state.wallets.length ? (
                        <Box width={300} height={300}>
                            <Typography align="center" mt={3} variant="h6">
                                Total Balance Per Wallet
                            </Typography>
                            <Pie data={walletsPie} />
                        </Box>
                    ) : null}
                </Grid>
                <Grid
                    container
                    item
                    xs={12}
                    md={6}
                    sx={{
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {state.transactions.length > 0 ? (
                        <Box width={300} height={300}>
                            <Typography align="center" mt={3} variant="h6">
                                Transactions By Category
                            </Typography>
                            <Pie data={Chart1data} />
                            <ToggleButtonGroup
                                fullWidth
                                value={type}
                                onChange={() =>
                                    type === "income"
                                        ? setType("expense")
                                        : setType("income")
                                }
                                sx={{ margin: "10px 0" }}
                            >
                                <ToggleButton value="income" color="success">
                                    <Typography>Income</Typography>
                                </ToggleButton>
                                <ToggleButton value="expense" color="error">
                                    <Typography>Expense</Typography>
                                </ToggleButton>
                            </ToggleButtonGroup>
                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                            >
                                <Typography color="primary">
                                    Show data:
                                </Typography>
                                <RadioGroup
                                    row
                                    value={typeOfData}
                                    onChange={(event) => {
                                        event.target.value === "count"
                                            ? setTypeOfData("count")
                                            : setTypeOfData("sum");
                                    }}
                                >
                                    <FormControlLabel
                                        value="sum"
                                        control={<Radio />}
                                        label="by sum"
                                    />
                                    <FormControlLabel
                                        value="count"
                                        control={<Radio />}
                                        label="by count"
                                    />
                                </RadioGroup>
                            </Stack>
                        </Box>
                    ) : null}
                </Grid>
            </Grid>
        </Container>
    );
};

export default Analytics;
