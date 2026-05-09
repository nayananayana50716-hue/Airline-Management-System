import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import QRCode from "qrcode";
import "./Passengers.css";

function Passengers() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const showMessage = location.state?.success;

  /* =========================
     LOAD BOOKINGS
  ========================= */

  useEffect(() => {
    const storedBookings =
      JSON.parse(localStorage.getItem("bookings")) || [];

    setBookings(storedBookings);
  }, []);

  /* =========================
     DELETE BOOKING
  ========================= */

  const handleDelete = (index) => {
    const updated = bookings.filter((_, i) => i !== index);

    setBookings(updated);

    localStorage.setItem("bookings", JSON.stringify(updated));
  };

  /* =========================
     EDIT BOOKING
  ========================= */

  const handleEdit = (index) => {
    navigate("/booking", {
      state: {
        editData: bookings[index],
        index,
      },
    });
  };

  /* =========================
     BACK BUTTON
  ========================= */

  const handleBack = () => {
    navigate(-1);
  };

  /* =========================
     DOWNLOAD PDF TICKET
  ========================= */

  const downloadTicket = async (booking) => {
    const doc = new jsPDF();

    /* QR DATA */

    const qrData = `
Passenger: ${booking.name}
Flight: ${booking.flight?.name}
From: ${booking.flight?.from}
To: ${booking.flight?.to}
Time: ${booking.flight?.time}
Seat: ${booking.seatNumber}
    `;

    const qrImage = await QRCode.toDataURL(qrData);

    /* HEADER */

    doc.setFillColor(30, 41, 59);
    doc.rect(0, 0, 210, 40, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text("✈ Airline Ticket", 65, 25);

    /* RESET COLOR */

    doc.setTextColor(0, 0, 0);

    /* PASSENGER DETAILS */

    doc.setFontSize(14);

    doc.text(`Passenger : ${booking.name}`, 20, 60);

    doc.text(
      `Flight : ${booking.flight?.name}`,
      20,
      75
    );

    doc.text(
      `Route : ${booking.flight?.from} → ${booking.flight?.to}`,
      20,
      90
    );

    doc.text(
      `Time : ${booking.flight?.time}`,
      20,
      105
    );

    doc.text(
      `Seat : ${booking.seatNumber}`,
      20,
      120
    );

    /* QR CODE */

    doc.addImage(qrImage, "PNG", 140, 60, 45, 45);

    doc.setFontSize(12);
    doc.text("Boarding Pass", 145, 115);

    /* SAVE PDF */

    doc.save(`${booking.name}_ticket.pdf`);
  };

  /* =========================
     SEARCH FILTER
  ========================= */

  const filteredBookings = bookings.filter((b) =>
    `
    ${b.name}
    ${b.flight?.name}
    ${b.flight?.from}
    ${b.flight?.to}
    `
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="passengers-container">

      <h2 className="title">
        👥 Passenger Details
      </h2>

      {/* SUCCESS MESSAGE */}

      {showMessage && (
        <div className="success-msg">
          ✅ Booking Successful!
        </div>
      )}

      {/* SEARCH */}

      <div className="search-box">
        <input
          type="text"
          placeholder="🔍 Search passenger, flight, route..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* NO DATA */}

      {filteredBookings.length === 0 ? (

        <p className="no-data">
          No matching bookings
        </p>

      ) : (

        <div className="card-container">

          {filteredBookings.map((b, i) => (

            <div key={i} className="card">

              {/* PASSENGER INFO */}

              <div className="card-info">

                <h3>
                  {b.name || "Passenger"}
                </h3>

                <p>
                  <strong>Flight:</strong>{" "}
                  {b.flight?.name}
                </p>

                <p>
                  <strong>Route:</strong>{" "}
                  {b.flight?.from} → {b.flight?.to}
                </p>

                <p>
                  <strong>Time:</strong>{" "}
                  {b.flight?.time}
                </p>

                <p>
                  <strong>Seat:</strong>{" "}
                  {b.seatNumber}
                </p>

                <p>
                  <strong>Payment:</strong>{" "}
                  {b.payment}
                </p>

              </div>

              {/* BUTTONS */}

              <div className="btn-group">

                <button
                  className="edit-btn"
                  onClick={() => handleEdit(i)}
                >
                  ✏ Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(i)}
                >
                  ❌ Delete
                </button>

                <button
                  className="ticket-btn"
                  onClick={() => downloadTicket(b)}
                >
                  🎟 Ticket
                </button>

                <button
                  className="back-btn"
                  onClick={handleBack}
                >
                  ⬅ Back
                </button>

              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Passengers;