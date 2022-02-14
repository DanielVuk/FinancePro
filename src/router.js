import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Categories from "./pages/Categories";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Transactions from "./pages/Transactions";
import Wallets from "./pages/Wallets";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wallets" element={<Wallets />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default Router;
