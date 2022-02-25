import { LocalizationProvider, MobileDateTimePicker } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDateFns";
import {
    Box,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Select,
    Stack,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../Store";
import AppInput from "../AppInput";
import ModalButtons from "../Buttons/ModalButtons";
import GetIcon from "../GetIcon";
const TransactionForm = ({
    action = "add",
    onClose,
    onConfirm,
    open,
    title,
    transaction = null,
}) => {
    const [state] = useContext(Context);

    const [type, setType] = useState("income");
    const [categoryId, setCategoryId] = useState("");
    const [toWalletId, setToWalletId] = useState("");
    const [fromWalletId, setFromWalletId] = useState("");
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState(new Date());
    const [note, setNote] = useState("");

    useEffect(() => {
        if (action === "add") {
            setType("income");
            setCategoryId("");
            setToWalletId("");
            setFromWalletId("");
            setAmount(0);
            setDate(new Date());
            setNote("");
        } else if (action === "edit") {
            if (transaction) {
                setType(transaction.type);
                setCategoryId(transaction.categoryId);
                setToWalletId(transaction.toWalletId);
                setFromWalletId(transaction.fromWalletId);
                setAmount(transaction.amount);
                setDate(transaction.date);
                setNote(transaction.note);
            }
        }
    }, [open]);

    const handleType = (event, newType) => {
        if (newType === null) return;
        setType("income");
        setCategoryId("");
        setToWalletId("");
        setFromWalletId("");
        setAmount(0);
        setDate(new Date());
        setNote("");

        setType(newType);
    };

    const handleCategory = (event) => {
        setCategoryId(event.target.value);
    };

    const handleToWallet = (event) => {
        setToWalletId(event.target.value);
    };

    const handleFromWallet = (event) => {
        setFromWalletId(event.target.value);
    };

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                onConfirm({
                    categoryId,
                    type,
                    toWalletId,
                    fromWalletId,
                    amount,
                    date,
                    note,
                });
            }}
        >
            <Grid container alignItems="center" direction="column">
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    {title}
                </Typography>
                <ToggleButtonGroup
                    exclusive
                    fullWidth
                    onChange={handleType}
                    sx={{ marginY: "25px" }}
                    value={type}
                >
                    <ToggleButton value="income" color="success">
                        <Typography>Income</Typography>
                    </ToggleButton>
                    <ToggleButton value="expense" color="error">
                        <Typography>Expense</Typography>
                    </ToggleButton>
                    <ToggleButton value="transfer" color="info">
                        <Typography>Transfer</Typography>
                    </ToggleButton>
                </ToggleButtonGroup>

                <Stack spacing={3} sx={{ width: "500px" }}>
                    {type !== "transfer" ? (
                        <FormControl fullWidth required>
                            <InputLabel id="categoryLabel">Category</InputLabel>
                            <Select
                                labelId="categoryLabel"
                                value={categoryId}
                                label="Category"
                                onChange={handleCategory}
                            >
                                {type === "income"
                                    ? state.categories
                                          .filter((c) =>
                                              c.type.includes("income")
                                          )
                                          .map((category) => (
                                              <MenuItem
                                                  key={category.id}
                                                  value={category.id}
                                              >
                                                  <SelectItem
                                                      category={category}
                                                  />
                                              </MenuItem>
                                          ))
                                    : state.categories
                                          .filter((c) =>
                                              c.type.includes("expense")
                                          )
                                          .map((category) => (
                                              <MenuItem
                                                  key={category.id}
                                                  value={category.id}
                                              >
                                                  <SelectItem
                                                      category={category}
                                                  />
                                              </MenuItem>
                                          ))}
                            </Select>
                        </FormControl>
                    ) : null}

                    {type !== "expense" ? (
                        <FormControl fullWidth required>
                            <InputLabel id="toWalletLabel">
                                To Wallet
                            </InputLabel>
                            <Select
                                labelId="toWalletLabel"
                                value={toWalletId}
                                label="To Wallet"
                                onChange={handleToWallet}
                            >
                                {state.wallets
                                    .filter((w) => w.id !== fromWalletId)
                                    .map((wallet) => (
                                        <MenuItem
                                            key={wallet.id}
                                            value={wallet.id}
                                        >
                                            {wallet.name}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    ) : null}

                    {type !== "income" ? (
                        <FormControl fullWidth required>
                            <InputLabel id="fromWalletLabel">
                                From Wallet
                            </InputLabel>
                            <Select
                                labelId="fromWalletLabel"
                                value={fromWalletId}
                                label="From Wallet"
                                onChange={handleFromWallet}
                            >
                                {state.wallets
                                    .filter((w) => w.id !== toWalletId)
                                    .map((wallet) => (
                                        <MenuItem
                                            key={wallet.id}
                                            value={wallet.id}
                                        >
                                            {wallet.name}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    ) : null}

                    <Typography fontWeight="bold" variant="h6">
                        Transaction Details:
                    </Typography>

                    <AppInput
                        label="Amount"
                        placeholder="amount"
                        value={amount}
                        required
                        setValue={setAmount}
                        type="number"
                        InputProps={{
                            inputProps: { min: 0 },
                            startAdornment: (
                                <InputAdornment position="start">
                                    <GetIcon iconName="sendTo" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <MobileDateTimePicker
                            label="Date and Time"
                            value={date}
                            onChange={(newValue) => {
                                setDate(newValue);
                            }}
                            inputFormat="MMM dd, yyy HH':'mm'"
                            readOnly={action === "edit"}
                            minDate={new Date()}
                            renderInput={(params) => <TextField {...params} />}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <GetIcon
                                            iconName="date"
                                            color="black"
                                            size="medium"
                                        />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </LocalizationProvider>

                    <AppInput
                        label="Note"
                        placeholder="note"
                        value={note}
                        required
                        setValue={setNote}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <GetIcon
                                        iconName="other"
                                        color="black"
                                        size="medium"
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Stack>

                <ModalButtons onClose={onClose} />
            </Grid>
        </form>
    );
};

export default TransactionForm;

const SelectItem = ({ category }) => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
            }}
        >
            <ListItemIcon>
                <GetIcon
                    iconName={category.icon}
                    color="primary.main"
                    size="medium"
                />
            </ListItemIcon>
            <ListItemText
                sx={{
                    marginLeft: "-10px",
                }}
                primary={category.name}
            />
        </Box>
    );
};
