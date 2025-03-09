import { createRoot } from "react-dom/client";
import "./index.css";
import Header from "./components/Header/Header";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Add from "./pages/Add/Add";
import Cart from "./pages/Cart/Cart";
import LikedCard from "./pages/LikedCard/LikedCard";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";

const App = () => {
  const location = useLocation();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/likedcard" element={<LikedCard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
