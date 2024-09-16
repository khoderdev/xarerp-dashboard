// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:3333",
// });

// export default api;
import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:3333",
  baseURL: "https://inventory-manager-backend-egws.onrender.com",
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
