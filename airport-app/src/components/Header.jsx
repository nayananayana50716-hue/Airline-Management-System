import "./Header.css";
import { useNavigate } from "react-router-dom";

function Header() {

  const navigate = useNavigate();

  return (
    <div className="header">
      <h2>✈ Airline Dashboard</h2>

      <div className="header-right">
        <span className="admin">👤 Admin</span>
      
      

        {/* ADMIN BUTTON */}
        <button
          className="admin-btn"
          onClick={() => navigate("/admin")}
        >
          Admin
        </button>

        {/* LOGOUT BUTTON */}
        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Header;