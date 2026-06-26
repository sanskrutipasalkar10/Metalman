import { useState, useEffect } from "react";

export interface User {
  email: string;
  username: string;
  role: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("metalman_user");
    const token = localStorage.getItem("metalman_token");
    if (savedUser && token) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
      }
    }
    setLoading(false);
  }, []);

  const login = (token: string, userData: User) => {
    localStorage.setItem("metalman_token", token);
    localStorage.setItem("metalman_user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("metalman_token");
    localStorage.removeItem("metalman_user");
    setUser(null);
  };

  return { user, loading, login, logout, isAuthenticated: !!user };
};
