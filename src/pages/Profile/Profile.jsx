import { useNavigate } from "react-router-dom";
import { useProductStore } from "../../store/store";
import "./Profile.scss";

const Profile = () => {
  const user = {
    username: "emilys",
    email: "emily@example.com",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  };

  const navigate = useNavigate();

  const logout = useProductStore((state) => state.logout);

  const handleLogOut = () => {
    navigate("/login");
    logout();
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img className="profile-avatar" src={user.avatar} alt="User Avatar" />
        <h2 className="profile-username">{user.username}</h2>
        <p className="profile-email">{user.email}</p>
        <button className="logout-btn" onClick={handleLogOut}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
