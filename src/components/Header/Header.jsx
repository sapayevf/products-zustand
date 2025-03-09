import { Link, NavLink } from "react-router-dom";
import "./Header.scss";
import { useAuthStore } from "../../store/store";

const Header = () => {
  const { user, logout } = useAuthStore();

  return (
    <header className="container header">
      <div>
        <Link className="products" to="/">
          Products
        </Link>
      </div>
      <div className="nav">
        {user ? (
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
            <button className="link" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <NavLink className="link" to="/login">
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
