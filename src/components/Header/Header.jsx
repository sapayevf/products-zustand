import { Link, NavLink } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <header className="container header">
      <div>
        <Link className="products" to="/">
          Products
        </Link>
      </div>
      <div className="nav">
        <NavLink className="link" to="/add">
          Add
        </NavLink>
        <NavLink className="link" to="/cart">
          Cart
        </NavLink>
        <NavLink className="link" to="/likedcard">
          Liked
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
