import { Button } from "@mui/material";
import React from "react";

const AppButton = ({
    onClick,
    children,
    color,
    size,
    sx,
    variant,
    ...otherProps
}) => {
    return (
        <Button
            onClick={onClick}
            size={size}
            variant={variant}
            sx={sx}
            {...otherProps}
        >
            {children}
        </Button>
    );
};

export default AppButton;
