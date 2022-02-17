import DeleteIcon from "@mui/icons-material/Delete";

const GetIcon = ({ iconName }) => {
    switch (iconName) {
        case "delete":
            return <DeleteIcon fontSize="large" />;
        default:
            return null;
    }
};

export default GetIcon;
