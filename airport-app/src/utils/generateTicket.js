import jsPDF from "jspdf";

const generateTicket = (booking) => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("✈ Airline Boarding Pass", 20, 20);

  doc.setFontSize(12);

  doc.text(`Passenger: ${booking.name}`, 20, 40);
  doc.text(`Flight: ${booking.flightNumber}`, 20, 50);
  doc.text(`Route: ${booking.from} → ${booking.to}`, 20, 60);
  doc.text(`Seat: ${booking.seatNumber}`, 20, 70);
  doc.text(`Price: ₹${booking.price}`, 20, 80);

  doc.text(
    `Date: ${new Date().toLocaleDateString()}`,
    20,
    90
  );

  doc.save("boarding-pass.pdf");
};

export default generateTicket;