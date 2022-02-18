import { Typography } from "@mui/material";
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

const CategoriesCarousel = ({
    onAdd,
    onDelete,
    onEdit,
    onSelect,
    selected,
}) => {
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
                    margin="23px"
                    transition="transform 0.5s"
                    transform="scale(1.1)"
                />
                {state.categories.map((category) => (
                    <Category
                        key={category.id}
                        category={category}
                        onDelete={onDelete}
                        onEdit={onEdit}
                        onSelect={() => {
                            onSelect(category);
                        }}
                        selected={selected}
                    />
                ))}
            </Carousel>
        </>
    );
};

export default CategoriesCarousel;
