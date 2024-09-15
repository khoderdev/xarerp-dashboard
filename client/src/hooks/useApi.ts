import api, { setAuthToken } from "../services/axios";

export const useApi = () => {
  const token = localStorage.getItem("token"); // Retrieve token from localStorage
  setAuthToken(token || ""); // Set the token for all API requests

  return {
    /*===== Dashboard =====*/
    getData: async (targetDate: number) => {
      const response = await api.get(`/v1/dashboard/${targetDate}`);
      return response.data;
    },

    /*===== Register / Tables =====*/
    getRegisters: async (endpoint: string, currentPage: number, query = "") => {
      const response = await api.get(
        `/v1/${endpoint}/?page=${currentPage}&q=${query}`
      );
      return response.data;
    },

    fetchAllData: async (endpoint: string, currentPage: number, query = "") => {
      const response = await api.get(
        `/v1/${endpoint}/?page=${currentPage}&q=${query}`
      );
      return response.data;
    },

    createRegister: async (endpoint: string, data: object) => {
      const response = await api
        .post(`/v1/${endpoint}`, { ...data })
        .catch((error) => {
          return error.response;
        });
      return response.data;
    },

    updateRegister: async (endpoint: string, id: string, data: object) => {
      const response = await api
        .put(`/v1/${endpoint}/${id}`, { ...data })
        .catch((error) => {
          return error.response;
        });
      return response.data;
    },

    deleteRegister: async (endpoint: string, id: string) => {
      console.log("endpoint and id", endpoint, id);
      const response = await api
        .delete(`/v1/${endpoint}/${id}`)
        .catch((error) => {
          return error.response;
        });
      return response.data;
    },

    /*===== Authentication =====*/
    validateToken: async (token: string) => {
      setAuthToken(token); // Update the token
      const response = await api.post("/validate");
      return response.data;
    },

    signin: async (email: string, password: string) => {
      const response = await api.post("/login", { email, password });
      return response.data;
    },

    logout: async () => {
      localStorage.removeItem("token"); // Remove token on logout
      setAuthToken(""); // Clear the token in headers
      return { status: true };
    },
  };
};
