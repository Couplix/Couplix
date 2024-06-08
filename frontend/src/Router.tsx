import { BrowserRouter,Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Header from "./components/Header";
import Review from "./page/Review";

const Router = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/reviews" element={<Review />} />

                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
