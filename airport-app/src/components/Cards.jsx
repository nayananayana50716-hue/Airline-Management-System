import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Cards.css";
import {
  FaPlane,
  FaUsers,
  FaClipboardList,
  FaUserShield,
  FaWpforms,
} from "react-icons/fa";

function Cards() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const cardsData = [
    { title: "Flights", value: 120, icon: FaPlane, path: "/flights" },
    { title: "Passengers", value: 500, icon: FaUsers, path: "/passengers" },
    { title: "Booking", value: 80, icon: FaClipboardList, path: "/booking" },
    { title: "Admin", value: 1, icon: FaUserShield, path: "/admin" },
    { title: "Flight Form", value: "-", icon: FaWpforms, path: "/flightform" },
    { title: "Flight List", value: "-", icon: FaPlane, path: "/flightlist" },
    { title: "Booking Form", value: "-", icon: FaWpforms, path: "/bookingform" },
    { title: "Booking List", value: "-", icon: FaClipboardList, path: "/bookinglist" },
  ];

  return (
    <div className={`cards-container ${show ? "show" : ""}`}>
      {cardsData.map((card) => {
        const Icon = card.icon;

        return (
          <div
            className="card"
            key={card.path}
            onClick={() => navigate(card.path)}
          >
            <div className="card-icon">
              <Icon />
            </div>

            <div className="card-content">
              <h3>{card.title}</h3>
              <p>{card.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Cards;