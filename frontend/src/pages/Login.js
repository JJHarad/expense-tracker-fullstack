import { useState } from "react";
import API from "../services/api";

function Login() {
  const [user, setUser] = useState({ username: "", password: "" });

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", user);
      localStorage.setItem("token", res.data);
      window.location.href = "/home";
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="Username"
        onChange={(e) =>
          setUser({ ...user, username: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setUser({ ...user, password: e.target.value })
        }
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;