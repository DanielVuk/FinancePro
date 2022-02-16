import Router from "./router";
import { Store } from "./Store";

import NavBar from "./components/NavBar";

const App = () => {
    return (
        <Store>
            <NavBar />
            <Router />
        </Store>
    );
};

export default App;
