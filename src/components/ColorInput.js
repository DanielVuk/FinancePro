import { Box, Typography } from "@mui/material";
import { ColorPicker } from "material-ui-color";
import GetIcon from "./GetIcon";

const ColorInput = ({ title, value, onChange }) => {
    return (
        <Box
            sx={{
                border: "1px solid lightgrey",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                height: "56px",
                justifyContent: "space-between",
                paddingRight: "10px",
            }}
            fullWidth
        >
            <Box ml={2} sx={{ display: "flex" }}>
                <GetIcon iconName="palette" color={value} size="medium" />
                <Typography ml={1.5} sx={{ color: "#5D2DFD", fontWeight: 600 }}>
                    {title}
                </Typography>
            </Box>

            <ColorPicker
                value={value}
                hideTextfield
                disableAlpha
                defaultValue="black"
                onChange={onChange}
            />
        </Box>
    );
};

export default ColorInput;
