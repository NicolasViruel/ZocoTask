import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";

export const AuthContext = createContext();

//creamos el hook para traer todos los datos que tenemos dentro de AuthProvider
//solo importando useAuth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const singup = async (user) => {
    try {
      const res = await registerRequest(user);
      const { token } = res.data;
      localStorage.setItem("authToken", token); // token en localStorage
      setUser(res.data);
      if (res.data.role === "admin") {
        setIsAdmin(true);
      }
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      const { token } = res.data;
      localStorage.setItem("authToken", token);
      setIsAuthenticated(true);
      setUser(res.data);
      if (res.data.role === "admin") {
        setIsAdmin(true);
      }
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken"); // Eliminar
    setIsAuthenticated(false);
    setUser(null);
    setIsAdmin(false);
  };

  //contador para minimizar los errores
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  //cargamos la applicacion para que quede el estado del login
  useEffect(() => {
    async function checkLogin() {
      const token = localStorage.getItem("authToken"); // Obtener token

      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }

      try {
        const res = await verifyTokenRequest(token);

        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        if (res.data.role === "admin") {
          setIsAdmin(true);
        }
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        singup,
        signin,
        loading,
        user,
        isAuthenticated,
        errors,
        logout,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
