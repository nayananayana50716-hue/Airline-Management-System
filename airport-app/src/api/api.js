import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// ================= REQUEST INTERCEPTOR =================
API.interceptors.request.use(

  (req) => {

    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },

  (error) => {
    return Promise.reject(error);
  }
);

// ================= RESPONSE INTERCEPTOR =================
API.interceptors.response.use(

  (response) => response,

  (error) => {

    console.error(
      "API Error:",
      error.response?.data || error.message
    );

    // OPTIONAL AUTO LOGOUT
    if (error.response?.status === 401) {

      localStorage.removeItem("token");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;