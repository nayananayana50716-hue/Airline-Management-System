import { useLocation, useNavigate } from "react-router-dom";
import "./SuccessPage.css";

function SuccessPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const booking = state?.booking;

  if (!booking) {
    return <h2>No Booking Found</h2>;
  }

  return (
    <div className="success-container">
      <h1>✅ Booking Successful</h1>

      <div className="ticket">
        <h2>Passenger Details</h2>

        <p><strong>Name:</strong> {booking.name}</p>
        <p><strong>Age:</strong> {booking.age}</p>
        <p><strong>Gender:</strong> {booking.gender}</p>
        <p><strong>Phone:</strong> {booking.phone}</p>

        <h2>Flight Details</h2>

        <p><strong>Flight:</strong> {booking.flight.name}</p>
        <p><strong>From:</strong> {booking.flight.from}</p>
        <p><strong>To:</strong> {booking.flight.to}</p>
        <p><strong>Departure:</strong> {booking.flight.departure}</p>
        <p><strong>Price:</strong> ₹{booking.flight.price}</p>

        <h2>Seat & Payment</h2>

        <p><strong>Seat Type:</strong> {booking.seatType}</p>
        <p><strong>Seat Number:</strong> {booking.seatNumber}</p>
        <p><strong>Payment:</strong> {booking.payment}</p>

        <h2>PNR</h2>

        <p>{booking.pnr}</p>
      </div>

      <button onClick={() => navigate("/")}>
        Back to Dashboard
      </button>
    </div>
  );
}

export default SuccessPage;