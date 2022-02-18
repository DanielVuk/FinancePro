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
        {
            id: 3,
            name: "Travel",
            type: ["expense"],
            color: "blue",
            icon: "travel",
        },
        {
            id: 4,
            name: "Job",
            type: ["income"],
            color: "yellow",
            icon: "work",
        },
        {
            id: 5,
            name: "Gas",
            type: ["expense"],
            color: "cyan",
            icon: "fuel",
        },
        {
            id: 6,
            name: "Clothes",
            type: ["expense"],
            color: "orange",
            icon: "cloth",
        },
        {
            id: 7,
            name: "Friends",
            type: ["income", "expense"],
            color: "white",
            icon: "family",
        },
        {
            id: 8,
            name: "Trade",
            type: ["income", "expense"],
            color: "purple",
            icon: "dolar",
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
