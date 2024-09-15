import api from "../services/axios";

export const useApi = () => ({
  /*===== Dashboard =====*/

  getData: async (targetDate: number) => {
    const response = await api.get(`/v1/dashboard/${targetDate}`);
    return response.data;
  },

  /*===== Register / Tables =====*/

  getRegisters: async (endpoint: string, currentPage: number, query = "") => {
    const response = await api.get(
      `/v1/${endpoint}/get/?page=${currentPage}&q=${query}`
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
    const response = await api
      .delete(`/v1/${endpoint}/${id}`)
      .catch((error) => {
        return error.response;
      });
    return response.data;
  },

  /*===== Authentication =====*/

  validateToken: async (token: string) => {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await api.post("/validate");
    return response.data;
  },

  signin: async (email: string, password: string) => {
    const response = await api.post("/login", { email, password });
    return response.data;
  },

  logout: async () => {
    return {
      status: true,
    };
  },
});
// // // import api from "../services/axios";

// // // export const useApi = () => ({
// // //   /*===== Dashboard =====*/

// // //   getData: async (targetDate: number) => {
// // //     try {
// // //       const response = await api.get(`/v1/dashboard/${targetDate}`);
// // //       return response.data;
// // //     } catch (error) {
// // //       handleError(error);
// // //     }
// // //   },

// // //   /*===== Register / Tables =====*/

// // //   getRegisters: async (endpoint: string, currentPage: number, query = "") => {
// // //     try {
// // //       const response = await api.get(
// // //         `/v1/${endpoint}/get/?page=${currentPage}&q=${query}`
// // //       );
// // //       return response.data;
// // //     } catch (error) {
// // //       handleError(error);
// // //     }
// // //   },

// // //   fetchAllData: async (endpoint: string, currentPage: number, query = "") => {
// // //     try {
// // //       const response = await api.get(
// // //         `/v1/${endpoint}/?page=${currentPage}&q=${query}`
// // //       );
// // //       return response.data;
// // //     } catch (error) {
// // //       handleError(error);
// // //     }
// // //   },

// // //   createRegister: async (endpoint: string, data: object) => {
// // //     try {
// // //       const response = await api.post(`/v1/${endpoint}`, { ...data });
// // //       return response.data;
// // //     } catch (error) {
// // //       handleError(error);
// // //     }
// // //   },

// // //   updateRegister: async (endpoint: string, id: string, data: object) => {
// // //     try {
// // //       const response = await api.put(`/v1/${endpoint}/${id}`, { ...data });
// // //       return response.data;
// // //     } catch (error) {
// // //       handleError(error);
// // //     }
// // //   },

// // //   deleteRegister: async (endpoint: string, id: string) => {
// // //     try {
// // //       const response = await api.delete(`/v1/${endpoint}/${id}`);
// // //       return response.data;
// // //     } catch (error) {
// // //       handleError(error);
// // //     }
// // //   },

// // //   /*===== Authentication =====*/

// // //   validateToken: async (token: string) => {
// // //     api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// // //     try {
// // //       const response = await api.post("/validate");
// // //       return response.data;
// // //     } catch (error) {
// // //       handleError(error);
// // //     }
// // //   },

// // //   signin: async (email: string, password: string) => {
// // //     try {
// // //       const response = await api.post("/login", { email, password });
// // //       return response.data;
// // //     } catch (error) {
// // //       handleError(error);
// // //     }
// // //   },

// // //   logout: async () => {
// // //     return {
// // //       status: true,
// // //     };
// // //   },
// // // });

// // // const handleError = (error: any) => {
// // //   if (error.response) {
// // //     switch (error.response.status) {
// // //       case 401:
// // //         // Handle unauthorized access, e.g., redirect to login
// // //         console.error("Unauthorized: Please log in again.");
// // //         break;
// // //       // Handle other status codes as needed
// // //       default:
// // //         console.error(
// // //           `Error: ${error.response.status} ${error.response.statusText}`
// // //         );
// // //     }
// // //   } else {
// // //     console.error("Error: No response received from server.");
// // //   }
// // // };

// // // ////////////////////////////////
// // // ////////////////////////////////
// // // ////////////////////////////////
// // // ////////////////////////////////
// // // ////////////////////////////////

// // // import api from "../services/axios";

// // // // Utility function to set the Authorization header
// // // const setAuthHeader = (token: any) => {
// // //   api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// // // };

// // // // Main API hook
// // // export const useApi = () => {
// // //   return {
// // //     /*===== Dashboard =====*/
// // //     getData: async (targetDate: any, token: any) => {
// // //       setAuthHeader(token); // Ensure token is set before the request
// // //       try {
// // //         const response = await api.get(`/v1/dashboard/${targetDate}`);
// // //         return response.data;
// // //       } catch (error) {
// // //         handleError(error);
// // //       }
// // //     },

// // //     /*===== Register / Tables =====*/
// // //     getRegisters: async (endpoint: any, currentPage: any, query = "", token: any) => {
// // //       setAuthHeader(token); // Ensure token is set before the request
// // //       try {
// // //         const response = await api.get(
// // //           `/v1/${endpoint}/get/?page=${currentPage}&q=${query}`
// // //         );
// // //         return response.data;
// // //       } catch (error) {
// // //         handleError(error);
// // //       }
// // //     },

// // //     fetchAllData: async (endpoint: any, currentPage: any, query = "", token: any) => {
// // //       setAuthHeader(token); // Ensure token is set before the request
// // //       try {
// // //         const response = await api.get(
// // //           `/v1/${endpoint}/?page=${currentPage}&q=${query}`
// // //         );
// // //         return response.data;
// // //       } catch (error) {
// // //         handleError(error);
// // //       }
// // //     },

// // //     createRegister: async (endpoint: any, data: any, token: any) => {
// // //       setAuthHeader(token); // Ensure token is set before the request
// // //       try {
// // //         const response = await api.post(`/v1/${endpoint}`, data);
// // //         return response.data;
// // //       } catch (error) {
// // //         handleError(error);
// // //       }
// // //     },

// // //     updateRegister: async (endpoint: any, id: any, data: any, token: any) => {
// // //       setAuthHeader(token); // Ensure token is set before the request
// // //       try {
// // //         const response = await api.put(`/v1/${endpoint}/${id}`, data);
// // //         return response.data;
// // //       } catch (error) {
// // //         handleError(error);
// // //       }
// // //     },

// // //     deleteRegister: async (endpoint: any, id: any, token: any) => {
// // //       setAuthHeader(token); // Ensure token is set before the request
// // //       try {
// // //         const response = await api.delete(`/v1/${endpoint}/${id}`);
// // //         return response.data;
// // //       } catch (error) {
// // //         handleError(error);
// // //       }
// // //     },

// // //     /*===== Authentication =====*/
// // //     validateToken: async (token: any) => {
// // //       setAuthHeader(token); // Ensure token is set before the request
// // //       try {
// // //         const response = await api.post("/validate");
// // //         return response.data;
// // //       } catch (error) {
// // //         handleError(error);
// // //       }
// // //     },

// // //     signin: async (email: any, password: any) => {
// // //       try {
// // //         const response = await api.post("/login", { email, password });
// // //         return response.data;
// // //       } catch (error) {
// // //         handleError(error);
// // //       }
// // //     },

// // //     logout: async () => {
// // //       // Clear the Authorization header on logout
// // //       delete api.defaults.headers.common["Authorization"];
// // //       return { status: true };
// // //     },
// // //   };
// // // };

// // // // Centralized error handler
// // // const handleError = (error: unknown) => {
// // //   if (error.response) {
// // //     switch (error.response.status) {
// // //       case 401:
// // //         console.error("Unauthorized: Please log in again.");
// // //         // Optionally redirect to login or handle token refresh
// // //         break;
// // //       case 403:
// // //         console.error(
// // //           "Forbidden: You do not have permission to access this resource."
// // //         );
// // //         break;
// // //       case 404:
// // //         console.error("Not Found: The requested resource was not found.");
// // //         break;
// // //       case 500:
// // //         console.error(
// // //           "Internal Server Error: Something went wrong on the server."
// // //         );
// // //         break;
// // //       // Handle other status codes as needed
// // //       default:
// // //         console.error(
// // //           `Error: ${error.response.status} ${error.response.statusText}`
// // //         );
// // //     }
// // //   } else {
// // //     console.error("Error: No response received from server.");
// // //   }
// // // };
// import api from "../services/axios";

// export const useApi = () => {
//   const setAuthToken = (token: string) => {
//     api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   };

//   return {
//     /*===== Dashboard =====*/
//     getData: async (targetDate: number) => {
//       const response = await api.get(`/v1/dashboard/${targetDate}`);
//       return response.data;
//     },

//     /*===== Register / Tables =====*/
//     getRegisters: async (endpoint: string, currentPage: number, query = "") => {
//       const response = await api.get(
//         `/v1/${endpoint}/get/?page=${currentPage}&q=${query}`
//       );
//       return response.data;
//     },

//     fetchAllData: async (endpoint: string, currentPage: number, query = "") => {
//       const response = await api.get(
//         `/v1/${endpoint}/?page=${currentPage}&q=${query}`
//       );
//       return response.data;
//     },

//     createRegister: async (endpoint: string, data: object) => {
//       const response = await api
//         .post(`/v1/${endpoint}`, { ...data })
//         .catch((error) => {
//           console.error("Create register failed:", error);
//           return error.response;
//         });
//       return response.data;
//     },

//     updateRegister: async (endpoint: string, id: string, data: object) => {
//       const response = await api
//         .put(`/v1/${endpoint}/${id}`, { ...data })
//         .catch((error) => {
//           console.error("Update register failed:", error);
//           return error.response;
//         });
//       return response.data;
//     },

//     deleteRegister: async (endpoint: string, id: string) => {
//       const response = await api
//         .delete(`/v1/${endpoint}/${id}`)
//         .catch((error) => {
//           console.error("Delete register failed:", error);
//           return error.response;
//         });
//       return response.data;
//     },

//     /*===== Authentication =====*/
//     validateToken: async (token: string) => {
//       setAuthToken(token); // Set token for validation request
//       try {
//         const response = await api.post("/validate");
//         return response.data;
//       } catch (error) {
//         console.error("Validate token failed:", error);
//         throw error;
//       }
//     },

//     signin: async (email: string, password: string) => {
//       const response = await api.post("/login", { email, password });
//       return response.data;
//     },

//     logout: async () => {
//       return {
//         status: true,
//       };
//     },

//     setAuthToken, // Export the method to set the token
//   };
// };
