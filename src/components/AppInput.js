import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { TextField, Icon, InputAdornment } from "@mui/material";

const color = purple[500];

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
