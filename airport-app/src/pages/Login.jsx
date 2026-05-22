import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import KIAImage from "../assets/KIAImage.jpg.png";
import "./Login.css";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // LOGIN FUNCTION
 const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post("/users/login", {
      email: email.trim(),
      password,
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    alert("Login Successful");
    navigate("/dashboard");

  } catch (error) {
    alert(error.response?.data?.message || "Login failed");
  }
};

  return (

    <div
      className="login-container"
      style={{
        backgroundImage: `url(${KIAImage})`,
      }}
    >

      <form
        className="login-box"
        onSubmit={handleLogin}
      >

        <h2>Welcome Back</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        <button type="submit">
          Login
        </button>

        <p>
          Don't have an account?{" "}

          <span
            onClick={() =>
              navigate("/register")
            }
          >
            Register
          </span>

        </p>

      </form>

    </div>
  );
}

export default Login;