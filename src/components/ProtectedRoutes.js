import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Context, initialState } from "../Store";

const ProtectedRoutes = () => {
    const [setState] = useContext(Context);

    let token = localStorage.getItem("token");

    const tokenExpiration = localStorage.getItem("tokenExpiration");
    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 0) {
        localStorage.clear();
    } else {
        setTimeout(() => {
            setState(initialState);
            localStorage.clear();
        }, expiresIn);
    }

    return token ? <Outlet /> : <Navigate to="/auth" />;
};

export default ProtectedRoutes;
