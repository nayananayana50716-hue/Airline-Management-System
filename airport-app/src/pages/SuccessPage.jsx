import { useLocation, useNavigate } from "react-router-dom";
import "./SuccessPage.css";

function SuccessPage() {

  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state?.booking;

  // IF NO BOOKING
  if (!booking) {
    return (
      <div className="success-container">

        <h2>No Booking Found</h2>

        <button onClick={() => navigate("/dashboard")}>
          Go Home
        </button>

      </div>
    );
  }

  return (

    <div className="success-container">

      <div className="success-card">

        <h1>✈ Booking Successful</h1>

        <h2>{booking.name}</h2>

        <p>🎫 PNR: {booking.pnr}</p>

        <p>💺 Seat: {booking.seatNumber}</p>

        <p>🧳 Seat Type: {booking.seatType}</p>

        <p>💳 Payment: {booking.payment}</p>

        <button onClick={() => navigate("/dashboard")}>
          Back To Dashboard
        </button>

      </div>

    </div>
  );
}

export default SuccessPage;