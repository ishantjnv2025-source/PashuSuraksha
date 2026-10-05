import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../api/authService";
import { MOCK_USERS } from "../api/mockData";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        } else {
          // Default initial session for hackathon demo to Farmer
          setUser(MOCK_USERS[0]);
        }
      } catch (err) {
        console.error("Auth init error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const loggedUser = await authService.login(credentials);
      setUser(loggedUser);
      return loggedUser;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const registeredUser = await authService.register(userData);
      setUser(registeredUser);
      return registeredUser;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  // Quick switch role utility for effortless evaluation & testing
  const switchRole = (role) => {
    const targetUser = MOCK_USERS.find(u => u.role === role) || {
      id: "usr_" + role,
      name: `Demo ${role.toUpperCase()}`,
      role: role,
      email: `${role}@pashusuraksha.gov.in`,
      phone: "+91 98000 00000",
      district: "Pune",
      state: "Maharashtra"
    };
    setUser(targetUser);
    localStorage.setItem("pashusuraksha_current_user", JSON.stringify(targetUser));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
