import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../../store/store";
import "./Login.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const login = useProductStore((state) => state.login);

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://dummyjson.com/auth/login", {
        username,
        password,
      });

      console.log("Login response:", res.data); 

      localStorage.setItem("accessToken", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data)); 
      login(res.data); 

      navigate("/");
    } catch (error) {
      console.error("Login xatosi:", error);
      alert("Login yoki parol noto‘g‘ri!");
    }
  };

  return (
    <div className="container login">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
