import { Card, Typography } from "@mui/material";
import { useContext } from "react";
import Carousel from "react-elastic-carousel";
import { Context } from "../../Store";
import AddButton from "../Buttons/AddButton";
import Wallet from "../Wallet";

const breakPointsForWallets = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
];

const WalletsCarousel = ({ onAdd, onDelete, onEdit, onSelect }) => {
    const [state] = useContext(Context);
    return (
        <>
            <Typography variant="h4" sx={{ color: "white" }} mt={-13} mb={2}>
                Wallets: {state.wallets.length}
            </Typography>
            <Carousel breakPoints={breakPointsForWallets}>
                <AddButton
                    onClick={onAdd}
                    height="153px"
                    width="250px"
                    margin="10px"
                    transform="scale(1.03)"
                />
                {state.wallets.map((wallet) => (
                    <Card
                        key={wallet.id}
                        onClick={() => onSelect(wallet)}
                        sx={{
                            backgroundColor: "transparent",
                            boxShadow: 0,
                        }}
                    >
                        <Wallet
                            balance={wallet.balance}
                            color={wallet.color}
                            name={wallet.name}
                            onDelete={onDelete}
                            onEdit={onEdit}
                        />
                    </Card>
                ))}
            </Carousel>
        </>
    );
};

export default WalletsCarousel;
