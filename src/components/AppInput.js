import { TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const color = "#5D2DFD";

const theme = createTheme({
    palette: {
        primary: {
            main: color,
        },
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                input: {
                    color: color,
                    fontWeight: 600,
                },
            },
        },
    },
});

const AppInput = ({
    value,
    setValue,
    placeholder,
    type = "text",
    ...otherProps
}) => {
    return (
        <ThemeProvider theme={theme}>
            <TextField
                value={value}
                onChange={(event) => {
                    setValue(event.target.value);
                }}
                // color="primary"
                placeholder={placeholder}
                type={type}
                {...otherProps}
            />
        </ThemeProvider>
    );
};

export default AppInput;
