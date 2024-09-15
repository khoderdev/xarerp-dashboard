import axios from "axios";

const api = axios.create({
  baseURL: "https://inventory-manager-backend-egws.onrender.com",
});

export default api;
