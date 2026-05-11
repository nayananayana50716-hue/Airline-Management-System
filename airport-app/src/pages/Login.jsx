import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api"; // 👈 IMPORTANT (your axios file)
import KIAImage from "../assets/KIAImage.jpg.png";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ UPDATED LOGIN FUNCTION (BACKEND CONNECTED)
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = { email, password };

      // 🔥 CALL BACKEND API
      const res = await API.post("/users/login", data);

      // 💾 STORE TOKEN + USER
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful!");

      // 🚀 GO TO DASHBOARD
      navigate("/dashboard");

    } catch (error) {
      console.log(error);
      alert("Login failed! Check email/password or backend.");
    }
  };

  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url(${KIAImage})` }}
    >
      <form className="login-box" onSubmit={handleLogin}>
        <h2>Welcome Back</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        <p>
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")}>
            Register
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;