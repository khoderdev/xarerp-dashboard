import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { User } from "../../types/User";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [loadingValidation, setLoadingValidation] = useState(true);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const api = useApi();

  useEffect(() => {
    const validateToken = async () => {
      try {
        const storageData = localStorage.getItem("token");
        if (storageData) {
          const data = await api.validateToken(storageData);
          if (data.user) {
            setUser(data.user);
            setPermissions(data.user.permissions.split(","));
          }
        }
      } catch (err: any) {
        console.log(err.response.data);
        if (!err.response.data.isValid) {
          localStorage.removeItem("token");
          window.location.href = "/";
        }
      } finally {
        setLoadingValidation(false);
      }
    };
    validateToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signin = async (email: string, password: string) => {
    try {
      const data = await api.signin(email, password);
      if (data.user && data.token) {
        setUser(data.user);
        setToken(data.token);
        setPermissions(data.user.permissions.split(","));
        return true;
      }
    } catch (err) {
      return false;
    }
    return false;
  };

  const signout = async () => {
    setUser(null);
    setToken("");
    await api.logout();
  };

  const setToken = (token: string) => {
    localStorage.setItem("token", token);
  };

  return (
    <AuthContext.Provider
      value={{ user, signin, signout, loadingValidation, permissions }}
    >
      {children}
    </AuthContext.Provider>
  );
};
// import { useEffect, useState } from "react";
// import { useApi } from "../../hooks/useApi";
// import { User } from "../../types/User";
// import { AuthContext } from "./AuthContext";

// export const AuthProvider = ({ children }: { children: JSX.Element }) => {
//   const [loadingValidation, setLoadingValidation] = useState(true);
//   const [permissions, setPermissions] = useState<string[]>([]);
//   const [user, setUser] = useState<User | null>(null);
//   const api = useApi();

//   useEffect(() => {
//     const validateToken = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (token) {
//           api.setAuthToken(token); // Set token in api instance
//           const data = await api.validateToken(token);
//           if (data.user) {
//             setUser(data.user);
//             setPermissions(data.user.permissions.split(","));
//           }
//         }
//       } catch (err: any) {
//         console.log(err.response.data);
//         if (!err.response.data.isValid) {
//           localStorage.removeItem("token");
//           window.location.href = "/";
//         }
//       } finally {
//         setLoadingValidation(false);
//       }
//     };
//     validateToken();
//   }, [api]);

//   const signin = async (email: string, password: string) => {
//     try {
//       const data = await api.signin(email, password);
//       if (data.user && data.token) {
//         setUser(data.user);
//         setToken(data.token);
//         setPermissions(data.user.permissions.split(","));
//         return true;
//       }
//     } catch (err) {
//       return false;
//     }
//     return false;
//   };

//   const signout = async () => {
//     setUser(null);
//     setToken(""); // Clear token from localStorage and API
//     await api.logout();
//   };

//   const setToken = (token: string) => {
//     localStorage.setItem("token", token);
//     api.setAuthToken(token); // Set token in api instance
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, signin, signout, loadingValidation, permissions }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
// import { useEffect, useState } from "react";
// import { useApi } from "../../hooks/useApi";
// import { User } from "../../types/User";
// import { AuthContext } from "./AuthContext";

// export const AuthProvider = ({ children }: { children: JSX.Element }) => {
//   const [loadingValidation, setLoadingValidation] = useState(true);
//   const [permissions, setPermissions] = useState<string[]>([]);
//   const [user, setUser] = useState<User | null>(null);
//   const api = useApi();

//   useEffect(() => {
//     const validateToken = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (token) {
//           api.setAuthToken(token); // Set token in api instance
//           const data = await api.validateToken(token);
//           if (data && data.user) { // Check if data and data.user are defined
//             setUser(data.user);
//             setPermissions(data.user.permissions.split(","));
//           } else {
//             // Handle case where data or data.user is undefined
//             localStorage.removeItem("token");
//             window.location.href = "/";
//           }
//         } else {
//           // No token found, redirect to home
//           window.location.href = "/";
//         }
//       } catch (err: any) {
//         console.error("Token validation failed:", err); // Improved error logging
//         localStorage.removeItem("token");
//         window.location.href = "/";
//       } finally {
//         setLoadingValidation(false);
//       }
//     };
//     validateToken();
//   }, [api]);

//   const signin = async (email: string, password: string) => {
//     try {
//       const data = await api.signin(email, password);
//       if (data.user && data.token) {
//         setUser(data.user);
//         setToken(data.token);
//         setPermissions(data.user.permissions.split(","));
//         return true;
//       }
//     } catch (err) {
//       console.error("Sign-in failed:", err); // Improved error logging
//       return false;
//     }
//     return false;
//   };

//   const signout = async () => {
//     setUser(null);
//     setToken(""); // Clear token from localStorage and API
//     await api.logout();
//   };

//   const setToken = (token: string) => {
//     localStorage.setItem("token", token);
//     api.setAuthToken(token); // Set token in api instance
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, signin, signout, loadingValidation, permissions }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
