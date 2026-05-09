import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "./Bookinglist.css";

function BookingList() {
  const [bookings, setBookings] = useState([]);



  const handleDelete = (index) => {
    const updated = bookings.filter((_, i) => i !== index);
    localStorage.setItem("bookings", JSON.stringify(updated));
    setBookings(updated);
  };

  const generatePDF = (booking) => {
    const doc = new jsPDF();

    doc.text("✈ Flight Ticket", 20, 20);
    doc.text(`PNR: ${booking.pnr}`, 20, 30);
    doc.text(`Flight: ${booking.flight.name}`, 20, 40);
    doc.text(`${booking.flight.from} → ${booking.flight.to}`, 20, 50);

    doc.text(`Name: ${booking.name}`, 20, 60);
    doc.text(`Seat: ${booking.seatNumber}`, 20, 70);
    doc.text(`Payment: ${booking.payment}`, 20, 80);

    doc.save(`${booking.name}_ticket.pdf`);
  };

  return (
    <div>
      <h2>Booking List</h2>

      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        bookings.map((b, index) => (
          <div key={index} className="boarding-card">

            <div className="left">
              <h3>{b.flight.name}</h3>
              <p>{b.flight.from} → {b.flight.to}</p>

              <p>Name: {b.name}</p>
              <p>Phone: {b.phone}</p>

              <p>Seat: {b.seatNumber}</p>
              <p>PNR: {b.pnr}</p>

              <button onClick={() => handleDelete(index)}>Delete</button>
              <button onClick={() => generatePDF(b)}>Download PDF</button>
            </div>

            <div className="right">
              <h4>BOARDING PASS</h4>
            </div>

          </div>
        ))
      )}
    </div>
  );
}

export default BookingList;