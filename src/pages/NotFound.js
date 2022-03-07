import { Container, Link, Typography } from "@mui/material";
import React from "react";

const NotFound = () => {
    return (
        <Container
            maxWidth="xl"
            sx={{
                height: "50vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Typography variant="h5">
                Page not found. Click {<Link href="/">here</Link>} for home.
            </Typography>
        </Container>
    );
};

export default NotFound;
