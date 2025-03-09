import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Header.scss";
import { useProductStore } from "../../store/store";

const Header = () => {
  const user = useProductStore((state) => state.user);
  const isAuthenticated = useProductStore((state) => state.isAuthenticated);
  const logout = useProductStore((state) => state.logout);
  const navigate = useNavigate();

  console.log("🟢 Header render bo‘ldi.");
  console.log("🔹 isAuthenticated:", isAuthenticated);
  console.log("🔹 User:", user);

  const handleLogOut = () => {
    navigate("/login");
    logout();
  };

  return (
    <header className="container header">
      <div>
        <Link className="products" to="/">
          Products
        </Link>
      </div>
      <div className="nav">
        {isAuthenticated ? (
          <>
            <NavLink className="link" to="/add">
              Add
            </NavLink>
            <NavLink className="link" to="/cart">
              Cart
            </NavLink>
            <NavLink className="link" to="/likedcard">
              Liked
            </NavLink>
            <NavLink className="link" to="/profile">
              Profile
            </NavLink>
            <button className="link" onClick={handleLogOut}>
              Logout
            </button>
          </>
        ) : (
          <Link className="link" to="/login">
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
