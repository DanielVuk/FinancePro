import { Box, Grid, Typography } from "@mui/material";
import { useRef } from "react";
import Carousel from "react-elastic-carousel";
import category from "../../assets/categories.png";
import finance from "../../assets/finance.png";
import wallet from "../../assets/wallet.png";

const changeColor =
    "invert(15%) sepia(99%) saturate(3867%) hue-rotate(253deg) brightness(101%) contrast(106%)";

const content = [
    {
        id: 0,
        image: wallet,
        title: "Wallets",
        desc: "Create wallets so you can keep track of your total balance",
    },
    {
        id: 1,
        image: category,
        title: "Categories",
        desc: "Create categories to know where you spend your money and how you make it",
    },
    {
        id: 2,
        image: finance,
        title: "Analytics",
        desc: "Analytics provides an analysis of the movement of account balances, categories and transactions",
    },
];

const WelcomeCarousel = () => {
    const carouselRef = useRef(null);
    let resetTimeout;

    const reset = (index) => {
        clearTimeout(resetTimeout);
        if (index + 1 === content.length) {
            resetTimeout = setTimeout(() => {
                carouselRef.current.goTo(0);
            }, 3000);
        }
    };
    return (
        <Box sx={{ display: { xs: "none", lg: "block" } }}>
            <Carousel
                ref={carouselRef}
                enableAutoPlay
                autoPlaySpeed={3000}
                onNextEnd={({ index }) => reset(index)}
            >
                {content.map((item) => (
                    <Grid
                        container
                        sx={{ backgroundColor: "white", borderRadius: 5 }}
                        key={item.id}
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
