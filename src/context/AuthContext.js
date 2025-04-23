"use client";
import { createContext, useState, useEffect, useContext } from "react";
import Popup from "@/src/components/Popup";

export const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  login: async () => {},
  logout: () => {},
  openAuthPopup: () => {},
  isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);
  const [authPopupMode, setAuthPopupMode] = useState(null); // для отслеживания открытого попапа

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token) {
      setIsAuthenticated(true);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Ошибка входа");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      setIsAuthenticated(true);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Произошла неизвестная ошибка";
      console.error(message);
      alert(message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
  };

  const openAuthPopup = (mode) => {
    setAuthPopupMode(mode); // например, "login", "register" и т.д.
    // можно связать это с каким-то внешним состоянием или модальным окном
    setIsAuthPopupOpen(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        openAuthPopup,
        authPopupMode, // если нужно использовать где-то
      }}
    >
      {children}
      {isAuthPopupOpen && (
        <Popup 
          onClose={() => setIsAuthPopupOpen(false)} 
          initialMode={authPopupMode} 
        />
      )}
    </AuthContext.Provider>
  );
};
