import React, { useState } from "react";

const initialState = {
    wallets: [
        {
            id: 1,
            name: "Gotovina",
            color: "green",
            balance: 8000,
        },
        {
            id: 2,
            name: "Ziro",
            color: "red",
            balance: 40000,
        },
        {
            id: 3,
            name: "Tekuci",
            color: "yellow",
            balance: 2000,
        },
    ],
    categories: [
        { id: 1, name: "Car", type: "Expense", color: "green", icon: "delete" },
        {
            id: 2,
            name: "Food",
            type: "Expense",
            color: "black",
            icon: "delete",
        },
        {
            id: 3,
            name: "Travel",
            type: "Expense",
            color: "blue",
            icon: "delete",
        },
        { id: 4, name: "Job", type: "Income", color: "yellow", icon: "delete" },
        {
            id: 5,
            name: "Gas",
            type: "Expense",
            color: "cyan",
            icon: "delete",
        },
        {
            id: 6,
            name: "Clothes",
            type: "Expense",
            color: "orange",
            icon: "delete",
        },
        {
            id: 7,
            name: "Friends",
            type: "Expense",
            color: "white",
            icon: "delete",
        },
        { id: 8, name: "Jim", type: "Expense", color: "brown", icon: "delete" },
        {
            id: 9,
            name: "Trade",
            type: "Income",
            color: "purple",
            icon: "delete",
        },
        {
            id: 10,
            name: "Crypto",
            type: "Expense",
            color: "lightgray",
            icon: "delete",
        },
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
