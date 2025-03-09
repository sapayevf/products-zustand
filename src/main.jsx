import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Add from "./pages/Add/Add";
import Cart from "./pages/Cart/Cart";
import LikedCard from "./pages/LikedCard/LikedCard";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";

const App = () => {
  const location = useLocation();

  const hideHeaderPaths = ["/login", "/profile"];
  const hideHeader = hideHeaderPaths.includes(location.pathname);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/likedcard" element={<LikedCard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

const Root = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

createRoot(document.getElementById("root")).render(<Root />);
