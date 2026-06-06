import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  plan: string;
  investedAmount: number;
  joinDate: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => boolean;
  register: (name: string, email: string, pass: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('landsec_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, pass: string) => {
    // Mock login that accepts anything as long as we have a stored user
    const storedUser = localStorage.getItem('landsec_user');
    if (storedUser) {
      const u = JSON.parse(storedUser);
      setUser(u);
      return true;
    } else {
      // Create a default user if none exists just for the demo
      const newUser = {
        id: Math.random().toString(36).substring(7),
        name: 'Demo Investor',
        email,
        plan: 'Foundation Plan',
        investedAmount: 5000,
        joinDate: new Date().toISOString()
      };
      localStorage.setItem('landsec_user', JSON.stringify(newUser));
      setUser(newUser);
      return true;
    }
  };

  const register = (name: string, email: string, pass: string) => {
    const newUser = {
      id: Math.random().toString(36).substring(7),
      name,
      email,
      plan: 'Foundation Plan',
      investedAmount: 5000,
      joinDate: new Date().toISOString()
    };
    localStorage.setItem('landsec_user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
    // keeping it in localstorage to simulate returning user
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
