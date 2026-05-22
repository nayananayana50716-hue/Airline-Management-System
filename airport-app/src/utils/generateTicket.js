import jsPDF from "jspdf";

const generateTicket = async ({
  name,
  flightNumber,
  from,
  to,
  seatNumber,
  price
}) => {

  const doc = new jsPDF();

  // TITLE
  doc.setFontSize(20);
  doc.text("✈ AIRLINE E-TICKET", 55, 20);

  doc.setFontSize(12);
  doc.text("--------------------------------", 20, 30);

  // DETAILS
  doc.text(`Passenger: ${name}`, 20, 45);
  doc.text(`Flight Number: ${flightNumber}`, 20, 55);
  doc.text(`From: ${from}`, 20, 65);
  doc.text(`To: ${to}`, 20, 75);
  doc.text(`Seat Number: ${seatNumber}`, 20, 85);
  doc.text(`Price: ₹${price}`, 20, 95);

  doc.text("--------------------------------", 20, 110);

  doc.text(
    `Date: ${new Date().toLocaleString()}`,
    20,
    125
  );

  doc.text("Thank you for booking with us ✈", 20, 140);

  // DOWNLOAD PDF
  doc.save("ticket.pdf");
};

export default generateTicket;