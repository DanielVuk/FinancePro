import { Container, Typography } from "@mui/material";
import React from "react";

const Wallets = () => {
    return (
        <Container maxWidth="xl" sx={{ backgroundColor: "white" }}>
            <Typography m={10} variant="h3">
                Wallets:
            </Typography>
        </Container>
    );
};

export default Wallets;
