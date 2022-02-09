import { Grid, Box } from "@mui/material";
import logo from "./assets/logo.png";
import AppInput from "./components/AppInput";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

const alignCenter = {
    justifyContent: "center",
    alignItems: "center",
};

const App = () => {
    return (
        <Grid container spacing={0}>
            <Grid container item xs={12} sm={6} style={alignCenter}>
                <Box component="img" src={logo} sx={{ maxWidth: "50%" }}></Box>
            </Grid>
            <Grid container item xs={12} sm={6} style={alignCenter}>
                <Box
                    component="div"
                    sx={{
                        border: "1px solid #7F5DF0",
                        boxShadow: 3,
                        borderRadius: "3px",
                        padding: "1.5rem",
                        margin: "1rem",
                    }}
                >
                    <AppInput
                        placeholder="Email address"
                        icon={<EmailIcon />}
                        required
                    />
                    <AppInput
                        placeholder="Password"
                        icon={<LockIcon />}
                        type="password"
                    />
                </Box>
            </Grid>
        </Grid>
    );
};

export default App;
