import { Card, Typography } from "@mui/material";
import { useContext } from "react";
import Carousel from "react-elastic-carousel";
import { Context } from "../../Store";
import AddButton from "../Buttons/AddButton";
import Category from "../Category";

const breakPointsForCategories = [
    { width: 1, itemsToShow: 2 },
    { width: 550, itemsToShow: 4 },
    { width: 768, itemsToShow: 6 },
    { width: 1200, itemsToShow: 8 },
];

const CategoriesCarousel = ({ onAdd, onDelete, onEdit, onSelect }) => {
    const [state] = useContext(Context);
    return (
        <>
            <Typography
                my={4}
                variant="h4"
                color="text.secondary"
                sx={{ fontWeight: "bold" }}
            >
                Categories: {state.categories.length}
            </Typography>
            <Carousel breakPoints={breakPointsForCategories}>
                <AddButton
                    onClick={onAdd}
                    height="190px"
                    width="120px"
                    transition="transform 0.5s"
                    transform="scale(1.1)"
                />
                {state.categories.map((category) => (
                    <Card
                        key={category.id}
                        onClick={() => onSelect(category)}
                        sx={{
                            backgroundColor: "transparent",
                            boxShadow: 0,
                        }}
                    >
                        <Category
                            color={category.color}
                            iconName={category.icon}
                            name={category.name}
                            onDelete={onDelete}
                            onEdit={onEdit}
                        />
                    </Card>
                ))}
            </Carousel>
        </>
    );
};

export default CategoriesCarousel;
