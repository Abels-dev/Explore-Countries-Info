import { Routes,Route } from "react-router-dom";
import "./app.css";
import HomePage from "./pages/HomePage";
import CountryDetails from "./pages/CountryDetails";

const App = () => {
    return(
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/details/:name" element={<CountryDetails/>}/>
        </Routes>
    )
};

export default App;
