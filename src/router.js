import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Wallets from "./pages/Wallets";
import Transactions from "./pages/Transactions";
import Categories from "./pages/Categories";
import NotFound from "./pages/NotFound";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wallets" element={<Wallets />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default Router;
