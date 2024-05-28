import { BrowserRouter,Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Box from "./page/Box";
import BoxChange from "./page/BoxWithChange";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/box" element={<Box />} />
                <Route path="/boxChange" element={<BoxChange />} />

                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
