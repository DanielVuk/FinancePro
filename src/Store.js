import React, { useState } from "react";

const initialState = {
    wallets: [
        {
            id: 1,
            name: "Gotovina",
            balance: 8000,
            color: "green",
        },
        {
            id: 2,
            name: "Ziro",
            balance: 40000,
            color: "red",
        },
        {
            id: 3,
            name: "Tekuci",
            balance: 2000,
            color: "yellow",
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
