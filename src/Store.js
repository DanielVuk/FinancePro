import React, { useState } from "react";

const initialState = {
    user: null,
    wallets: [],
    categories: [
        {
            id: 1,
            name: "Car",
            type: ["income", "expense"],
            color: "green",
            icon: "car",
        },
        {
            id: 2,
            name: "Food",
            type: ["expense"],
            color: "black",
            icon: "restaurant",
        },
    ],

    transactions: [
        // {
        //     id: 1,
        //     amount: 500,
        //     categoryId: 1,
        //     toWalletId: 1,
        //     fromWalletId: "",
        //     date: new Date().setDate(new Date().getDate() - 8),
        //     note: "Uplata",
        //     type: "income",
        // },
        // {
        //     id: 2,
        //     amount: 1000,
        //     categoryId: 2,
        //     toWalletId: "",
        //     fromWalletId: 2,
        //     date: new Date(),
        //     note: "Placen racun",
        //     type: "expense",
        // },
        // {
        //     id: 3,
        //     amount: 500,
        //     categoryId: 4,
        //     toWalletId: 1,
        //     fromWalletId: "",
        //     date: new Date().setDate(new Date().getDate() - 10),
        //     note: "Uplata",
        //     type: "income",
        // },
        // {
        //     id: 4,
        //     amount: 1000,
        //     categoryId: 4,
        //     toWalletId: 2,
        //     fromWalletId: "",
        //     date: new Date().setDate(new Date().getDate() - 15),
        //     note: "Placen racun",
        //     type: "income",
        // },
        // {
        //     id: 5,
        //     amount: 200,
        //     categoryId: "",
        //     toWalletId: 1,
        //     fromWalletId: 2,
        //     date: new Date(),
        //     note: "Prijenos plaracnje racun za telekomunikacije i server",
        //     type: "transfer",
        // },
    ],
};

const Context = React.createContext();

const Store = ({ children }) => {
    const [state, setState] = useState(initialState);

    return (
        <Context.Provider value={[state, setState]}>
            {children}
        </Context.Provider>
    );
};

export { Store, Context };
