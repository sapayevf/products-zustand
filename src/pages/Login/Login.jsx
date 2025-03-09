import { useState } from "react";
import { useAuthStore } from "../../store/store";
import { useNavigate } from "react-router-dom";
import "./Login.scss"

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(username, password);
    navigate("/");
  };

  return (
    <div className="container login">
      <h2>Kirish</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username kiriting"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br /><br />
        <input
          type="password"
          placeholder="Parol kiriting"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br /><br />
        <button type="submit">Kirish</button>
      </form>
    </div>
  );
};

export default Login;
