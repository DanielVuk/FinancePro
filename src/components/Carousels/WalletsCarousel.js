import { SettingsInputAntennaTwoTone } from "@mui/icons-material";
import { Chip, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import Carousel from "react-elastic-carousel";
import { Context } from "../../Store";
import AddButton from "../Buttons/AddButton";
import GetIcon from "../GetIcon";
import Wallet from "../Wallet";

const breakPointsForWallets = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
];

const WalletsCarousel = ({ onAdd, onDelete, onEdit, onSelect, selected }) => {
    const [state] = useContext(Context);

    return (
        <>
            <Stack
                mt={-13}
                mb={2}
                direction="row"
                spacing={1}
                alignItems="center"
            >
                <Typography variant="h4" sx={{ color: "white" }}>
                    Wallets: {state.wallets.length}
                </Typography>
                {selected && (
                    <Chip
                        sx={{ paddingLeft: "5px", color: selected.color }}
                        icon={<GetIcon iconName="circle" size="medium" />}
                        label={selected.name}
                        onDelete={() => onSelect("")}
                    />
                )}
            </Stack>
            <Carousel breakPoints={breakPointsForWallets}>
                <AddButton
                    onClick={onAdd}
                    height="153px"
                    width="250px"
                    margin="15px"
                    transition="transform 0.5s"
                    transform="scale(1.03)"
                />
                {state.wallets.map((wallet) => (
                    <Wallet
                        key={wallet.id}
                        onSelect={() => {
                            onSelect(wallet);
                        }}
                        wallet={wallet}
                        onDelete={onDelete}
                        onEdit={onEdit}
                        selected={selected}
                    />
                ))}
            </Carousel>
        </>
    );
};

export default WalletsCarousel;
