import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import KIAImage from "../assets/KIAImage.jpg.png";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const user = users.find((u) => u.email === email);

    if (!user) {
      alert("User not found. Please register!");
      return;
    }

    if (user.password !== password) {
      alert("Incorrect password!");
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));

    alert("Login Successful!");
    navigate("/dashboard");
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