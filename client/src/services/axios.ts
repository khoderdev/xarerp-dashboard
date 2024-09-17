import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, 
  // baseURL: "https://5987-185-76-176-30.ngrok-free.app",
  // baseURL: "https://inventory-manager-6w3b.onrender.com",
  // baseURL: "http://localhost:3333",
});

// Function to set the Bearer token
export const setAuthToken = (token: string) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export default api;
