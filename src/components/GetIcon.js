import DeleteIcon from "@mui/icons-material/Delete";
import PaletteIcon from "@mui/icons-material/Palette";

const GetIcon = ({ iconName, color = null, size = "" }) => {
    switch (iconName) {
        case "delete":
            return <DeleteIcon fontSize="large" sx={{ color: color }} />;
        case "palette":
            return <PaletteIcon fontSize={size} sx={{ color: color }} />;
        default:
            return null;
    }
};

export default GetIcon;
