import { useEffect, useState } from "react";
import API from "../api/api";
import generateTicket from "../utils/generateTicket";
import socket from "../socket";
import SeatSelector from "../components/SeatSelector";

const BookingPage = ({ flight, setFlight }) => {

  const [selectedSeat, setSelectedSeat] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // ===============================
  // JOIN FLIGHT ROOM
  // ===============================
  useEffect(() => {

    if (flight?.id) {
      socket.emit("joinFlight", flight.id);
    }

  }, [flight]);

  // ===============================
  // REALTIME SEAT UPDATE
  // ===============================
  useEffect(() => {

    socket.on("seatUpdated", (updatedSeat) => {

      setFlight((prev) => {

        const updatedSeats =
          prev.seats.map((seat) =>

            seat.number === updatedSeat.seatNumber
              ? { ...seat, isBooked: true }
              : seat
          );

        return {
          ...prev,
          seats: updatedSeats
        };
      });

    });

    return () => {
      socket.off("seatUpdated");
    };

  }, [setFlight]);

  // ===============================
  // BOOK FLIGHT + PAYMENT
  // ===============================
  const handleBook = async () => {

    try {

      if (!selectedSeat) {
        return alert("Please select a seat");
      }

      setLoading(true);

      // ================= CREATE ORDER =================
      const orderRes = await API.post(
        "/payment/create-order",
        {
          amount: flight.price
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const order = orderRes.data;

      // ================= RAZORPAY OPTIONS =================
      const options = {

        key: import.meta.env.VITE_RAZORPAY_KEY,

        amount: order.amount,

        currency: order.currency,

        name: "Airline Management System",

        description: "Flight Booking",

        order_id: order.id,

        handler: async function (response) {

          try {

            // ================= VERIFY PAYMENT =================
            const verify = await API.post(
              "/payment/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }
            );

            if (verify.data.success) {

              // ================= CREATE BOOKING =================
              await API.post(
                "/bookings/create",
                {
                  FlightID: flight.id,
                  SeatNumber: selectedSeat,
                  PaymentID: response.razorpay_payment_id
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                }
              );

              // ================= SOCKET UPDATE =================
              socket.emit("seatBooked", {
                flightId: flight.id,
                seat: {
                  seatNumber: selectedSeat
                }
              });

              // ================= GENERATE TICKET =================
              await generateTicket({
                name: user.Firstname + " " + user.Lastname,
                flightNumber: flight.flightNumber,
                from: flight.source,
                to: flight.destination,
                seatNumber: selectedSeat,
                price: flight.price
              });

              alert("Booking Confirmed 🎉");

            } else {
              alert("Payment Failed");
            }

          } catch (err) {
            console.log(err);
            alert("Verification Failed");
          }
        },

        theme: {
          color: "#3399cc"
        }
      };

      // ================= OPEN RAZORPAY =================
      const razor = new window.Razorpay(options);
      razor.open();

    } catch (err) {

      console.log(err);
      alert("Booking Failed");

    } finally {
      setLoading(false);
    }
  };

  return (

    <div style={{ padding: "20px" }}>

      <h2>✈ Choose Your Seat</h2>

      {/* SEAT SELECTOR */}
      <SeatSelector
        seats={flight.seats}
        selectedSeat={selectedSeat}
        setSelectedSeat={setSelectedSeat}
      />

      <h3>
        Selected Seat: {selectedSeat}
      </h3>

      {/* BOOK BUTTON */}
      <button
        onClick={handleBook}
        disabled={loading}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "#3399cc",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? "Processing..." : "Book Flight"}
      </button>

    </div>
  );
};

export default BookingPage;