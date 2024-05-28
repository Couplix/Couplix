import { BrowserRouter,Routes, Route } from "react-router-dom";
import Home from "./page/Home";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<h1>About</h1>} />

                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
