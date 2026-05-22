import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import API from "../api/api";

function Register() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    Firstname: "",
    Lastname: "",
    Age: "",
    PhoneNumber: "",
    Email: "",
    Password: "",
    Role: "user",
  });

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // REGISTER FUNCTION
  const registerFun = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post("/users/register", {
        Firstname: user.Firstname,
        Lastname: user.Lastname,
        Age: Number(user.Age),
        PhoneNumber: user.PhoneNumber,
        Email: user.Email.trim(),
        Password: user.Password,
        Role: user.Role,
      });

      console.log(res.data);

      alert(res.data.message);

      navigate("/login");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  return (

    <div className="register-container">

      <form
        className="register-form"
        onSubmit={registerFun}
      >

        <h2>Create Account</h2>

        <input
          type="text"
          name="Firstname"
          placeholder="First Name"
          value={user.Firstname}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="Lastname"
          placeholder="Last Name"
          value={user.Lastname}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="Age"
          placeholder="Age"
          value={user.Age}
          onChange={handleChange}
        />

        <input
          type="text"
          name="PhoneNumber"
          placeholder="Phone Number"
          value={user.PhoneNumber}
          onChange={handleChange}
        />

        <input
          type="email"
          name="Email"
          placeholder="Email Address"
          value={user.Email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="Password"
          placeholder="Password"
          value={user.Password}
          onChange={handleChange}
          required
        />

        <select
          name="Role"
          value={user.Role}
          onChange={handleChange}
        >
          <option value="user">
            User
          </option>

          <option value="admin">
            Admin
          </option>
        </select>

        <button type="submit">
          Register
        </button>

        <p
          onClick={() => navigate("/login")}
          className="login-link"
        >
          Already have an account? Login
        </p>

      </form>

    </div>
  );
}

export default Register;