import { Box, Container, Stack, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useContext } from "react";
import { Pie } from "react-chartjs-2";
import { Context } from "../Store";

import {
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getWalletBalance } from "../Functions/updateWallets";

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

const Analytics = () => {
    const [state] = useContext(Context);

    const data = {
        labels: state.categories.map((c) => c.name),
        datasets: [
            {
                label: "# of Votes",
                data: state.categories.map(
                    (c) =>
                        state.transactions.filter((t) => t.categoryId === c.id)
                            .length
                ),
                backgroundColor: state.categories.map((c) => c.color),
                borderColor: state.categories.map((c) => c.color),
                borderWidth: 1,
            },
        ],
    };
    const walletsPie = {
        labels: state.wallets.map((w) => w.name),
        datasets: [
            {
                label: "# of Votes",
                data: state.wallets.map((w) =>
                    getWalletBalance(w, state.transactions)
                ),
                backgroundColor: state.wallets.map(
                    () =>
                        "#" + Math.floor(Math.random() * 16777215).toString(16)
                ),
                borderWidth: 1,
            },
        ],
    };

    return (
        <Container maxWidth="xl">
            <Stack
                mb={20}
                sx={{
                    width: "400px",
                    height: "400px",
                    alignItems: "center",
                }}
            >
                <Typography my={3} variant="h5">
                    Transactions By Category
                </Typography>
                <Pie data={data} />
            </Stack>
            <Box
                sx={{
                    width: "400px",
                    height: "400px",
                    alignItems: "center",
                }}
            >
                <Pie data={walletsPie} />
            </Box>
        </Container>
    );
};

export default Analytics;
