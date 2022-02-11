import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TextField, Icon, InputAdornment } from "@mui/material";

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

const AppInput = ({ text, placeholder, icon = null, type = text }) => {
    return (
        <ThemeProvider theme={theme}>
            <TextField
                sx={{ marginBottom: "15px" }}
                fullWidth
                color="primary"
                placeholder={placeholder}
                type={type}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Icon color="primary">{icon}</Icon>
                        </InputAdornment>
                    ),
                }}
            />
        </ThemeProvider>
    );
};

export default AppInput;
