import axios from "axios";
import AdminRoute from "./Components/AdminRoute";
import AdminFlights from "./Pages/AdminFlights";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default API;