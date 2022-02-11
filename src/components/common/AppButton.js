import { Button } from "@mui/material";
import React from "react";

const AppButton = ({ children, color, size, sx, variant, ...otherProps }) => {
    return (
        <Button size={size} variant={variant} sx={sx} {...otherProps}>
            {children}
        </Button>
    );
};

export default AppButton;
