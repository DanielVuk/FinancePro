import Router from "./router";
import { Context } from "./Store";

import NavBar from "./components/NavBar";
import { useContext, useEffect } from "react";
import { auth } from "./firebase";
import { useNavigate, useLocation } from "react-router-dom";

const App = () => {
    const [state, setState] = useContext(Context);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setState({ ...state, user: user });
            } else {
                setState({ ...state, user: user });
                if (location.pathname !== "/auth") {
                    navigate("/auth", { replace: true });
                }
            }
        });
    }, []);

    return (
        <>
            {state.user && <NavBar />}
            <Router />
        </>
    );
};

export default App;
