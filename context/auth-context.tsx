"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize from localStorage and create demo account if not exists
  useEffect(() => {
    const initializeAuth = () => {
      try {
        // Check if users list exists, if not create with demo account
        const storedUsers = localStorage.getItem("PixelMart_users");
        if (!storedUsers) {
          const demoUsers = [
            {
              id: "demo-1",
              email: "demo@PixelMart.com",
              password: "demo123",
              name: "Demo User",
            },
          ];
          localStorage.setItem("PixelMart_users", JSON.stringify(demoUsers));
        }

        // Check if current user is logged in
        const storedUser = localStorage.getItem("PixelMart_users");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("[v0] Error initializing auth:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const users = JSON.parse(localStorage.getItem("WearMart_users") || "[]");
      console.log("[v0] Stored users:", users);
      console.log("[v0] Attempting login with:", { email, password });

      const foundUser = users.find(
        (u: any) => u.email === email && u.password === password,
      );
      console.log("[v0] Found user:", foundUser);

      if (!foundUser) {
        throw new Error("Invalid email or password");
      }

      const userData = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
      };
      setUser(userData);
      localStorage.setItem("PixelMart_users", JSON.stringify(userData));
    } catch (error) {
      throw error;
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const users = JSON.parse(localStorage.getItem("WearMart_users") || "[]");

      if (users.some((u: any) => u.email === email)) {
        throw new Error("Email already registered");
      }

      const newUser = {
        id: Date.now().toString(),
        email,
        password,
        name,
      };

      users.push(newUser);
      localStorage.setItem("PixelMart_users", JSON.stringify(users));

      const userData = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      };
      setUser(userData);
      localStorage.setItem("PixelMart_users", JSON.stringify(userData));
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("PixelMart_users");
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
