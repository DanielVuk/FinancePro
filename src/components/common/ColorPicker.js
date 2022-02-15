import React from "react";
import { ColorPicker } from "material-ui-color";

const CustomColorPicker = ({ color = "red", setColor }) => {
    return (
        <ColorPicker
            value={color}
            hideTextfield
            onChange={(event) => {
                setColor(event.css.backgroundColor);
            }}
        />
    );
};

export default CustomColorPicker;
