import { useContext, useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import NavBar from "./components/NavBar";
import { getUserCategories } from "./rest/categories";
import { getUserTransactions } from "./rest/transactions";
import { getUserWallets } from "./rest/wallets";
import Router from "./router";
import { Context } from "./Store";

const App = () => {
    const [state, setState] = useContext(Context);

    useEffect(async () => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        let wallets = await getUserWallets(token, userId);
        let categories = await getUserCategories(token, userId);
        let transactions = await getUserTransactions(token, userId);

        setState({
            loading: false,
            user: {
                token,
                id: userId,
            },
            wallets: wallets,
            categories: categories,
            transactions: transactions,
        });
    }, []);

    return (
        <>
            {state.user && <NavBar />}
            <Router />
            <LoadingSpinner loading={state.loading} />
        </>
    );
};

export default App;
