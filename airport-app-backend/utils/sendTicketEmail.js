import transporter from "../config/email.js";

export const sendTicketEmail = async (user, booking, flight) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "✈ Your Flight Ticket Confirmation",

    html: `
      <h2>✈ Booking Confirmed</h2>

      <p><b>Name:</b> ${user.name}</p>
      <p><b>Flight:</b> ${flight.flightNumber}</p>
      <p><b>From:</b> ${flight.from}</p>
      <p><b>To:</b> ${flight.to}</p>
      <p><b>Seat:</b> ${booking.seatNumber}</p>
      <p><b>Price:</b> ₹${flight.price}</p>

      <br/>
      <h3>Thank you for booking with us ✈</h3>
    `,
  });
};