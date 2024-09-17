import axios from "axios";

const api = axios.create({
  baseURL: "https://5987-185-76-176-30.ngrok-free.app",
  // baseURL: "https://inventory-manager-6w3b.onrender.com",
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
