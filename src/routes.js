import { BrowserRouter, Routes, Route } from "react-router-dom";
// Pages
import Home from "./pages/home";
import AddOrder from "./pages/addOrders";
import ErrorPage from "./pages/error";

export default function Path() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/q?" element={<Home />}></Route>
                <Route path="/addorder" element={<AddOrder />}></Route>
                <Route path="/error" element={<ErrorPage />}></Route>
            </Routes>
        </BrowserRouter>
    )
};