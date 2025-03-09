import { Link, NavLink } from "react-router-dom";
import "./Header.scss";
import { useProductStore } from "../../store/store";

const Header = () => {
  const { user, isAuthenticated, logout } = useProductStore((state) => ({
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    logout: state.logout,
  }));

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
            <button className="link" onClick={logout}>
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
