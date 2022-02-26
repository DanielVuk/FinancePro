import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Carousel from "react-elastic-carousel";
import wallet from "../../assets/wallet.png";
import category from "../../assets/categories.png";
import finance from "../../assets/finance.png";

const changeColor =
    "invert(15%) sepia(99%) saturate(3867%) hue-rotate(253deg) brightness(101%) contrast(106%)";

const content = [
    {
        image: wallet,
        title: "Wallets",
        desc: "Create wallets so you can keep track of your total balance",
    },
    {
        image: category,
        title: "Categories",
        desc: "Create categories to know where you spend your money and how you make it",
    },
    {
        image: finance,
        title: "Analytics",
        desc: "Analytics provides an analysis of the movement of account balances, categories and transactions",
    },
];

const WelcomeCarousel = () => {
    return (
        <Box sx={{ display: { xs: "none", lg: "block" } }}>
            <Carousel>
                {content.map((item) => (
                    <Grid
                        container
                        sx={{ backgroundColor: "white", borderRadius: 5 }}
                    >
                        <Grid
                            container
                            item
                            xs={3}
                            sx={{
                                justifyContent: "center",
                                alignItems: "center",
                                minHeight: "350px",
                            }}
                        >
                            <Box
                                component="img"
                                src={item.image}
                                sx={{
                                    maxWidth: "200px",
                                    minWidth: "200px",
                                    WebkitFilter: changeColor,
                                }}
                            />
                        </Grid>
                        <Grid
                            container
                            item
                            direction="column"
                            xs={6}
                            sx={{
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Typography
                                mb={6}
                                color="primary"
                                fontWeight="bold"
                                variant="h4"
                            >
                                {item.title}
                            </Typography>
                            <Typography
                                align="center"
                                color="primary"
                                variant="h5"
                            >
                                {item.desc}
                            </Typography>
                        </Grid>
                        <Grid
                            container
                            item
                            xs={3}
                            sx={{
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Box
                                component="img"
                                src={item.image}
                                sx={{
                                    maxWidth: "200px",
                                    minWidth: "200px",
                                    WebkitFilter: changeColor,
                                    transform: "rotate(40deg)",
                                }}
                            />
                        </Grid>
                    </Grid>
                ))}
            </Carousel>
        </Box>
    );
};

export default WelcomeCarousel;
