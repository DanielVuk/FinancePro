import { Container, Typography } from "@mui/material";
import React, { useContext } from "react";
import { Context } from "../Store";

const Wallets = () => {
    const [state] = useContext(Context);
    return (
        <Container maxWidth="xl" sx={{ backgroundColor: "white" }}>
            <Typography m={10} variant="h3">
                Wallets: {state.wallets.length}
            </Typography>
        </Container>
    );
};

export default Wallets;
