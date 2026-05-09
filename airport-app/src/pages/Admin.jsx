import { useNavigate } from "react-router-dom";
import "./Admin.css";

function Admin() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div className="admin-wrapper">

      {/* CONTENT ONLY */}
      <div className="admin-content">

        <h2 className="welcome">
          Welcome Admin 👋 {user?.name || "Admin"}
        </h2>

        <div className="cards">

          <div className="card">
            <h3>✈ Flights</h3>
            <p>120</p>
          </div>

          <div className="card">
            <h3>📄 Bookings</h3>
            <p>540</p>
          </div>

          <div className="card">
            <h3>👨‍👩‍👧 Passengers</h3>
            <p>980</p>
          </div>

          <div className="card">
            <h3>💰 Revenue</h3>
            <p>$25,000</p>
          </div>

        </div>

        <div className="actions">

          <button onClick={() => navigate("/flightform")}>
            ➕ Add Flight
          </button>

          <button onClick={() => navigate("/flightlist")}>
            📋 Flight List
          </button>

          <button onClick={() => navigate("/bookingform")}>
            🧾 Booking Form
          </button>

          <button onClick={() => navigate("/bookinglist")}>
            📑 Booking List
          </button>

        </div>

      </div>

    </div>
  );
}

export default Admin;