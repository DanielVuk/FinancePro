import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Context } from "../Store";

const ProtectedRoutes = () => {
    const [state, setState] = useContext(Context);
    const token = localStorage.getItem("token");
    return token ? <Outlet /> : <Navigate to="/auth" />;
};

export default ProtectedRoutes;
