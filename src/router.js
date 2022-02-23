import { Route, Routes } from "react-router-dom";
import Analytics from "./pages/Analytics";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Transactions from "./pages/Transactions";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default Router;
