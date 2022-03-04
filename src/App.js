import { useContext } from "react";
import NavBar from "./components/NavBar";
import Router from "./router";
import { Context } from "./Store";

const App = () => {
    const [state] = useContext(Context);
    return (
        <>
            {state.user && <NavBar />}
            <Router />
        </>
    );
};

export default App;
