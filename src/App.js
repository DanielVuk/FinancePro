import { useContext } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import NavBar from "./components/NavBar";
import Router from "./router";
import { Context } from "./Store";

const App = () => {
    const [state] = useContext(Context);
    return (
        <>
            {state.user && <NavBar />}
            <Router />
            <LoadingSpinner loading={state.loading} />
        </>
    );
};

export default App;
