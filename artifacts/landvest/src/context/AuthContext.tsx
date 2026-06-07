import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { sendEmail } from '@/lib/emailService';

export interface User {
  id: string;
  name: string;
  email: string;
  plan: string;
  investedAmount: number;
  balance: number;
  totalReturns: number;
  joinDate: string;
  lastProfitAt: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => boolean;
  register: (name: string, email: string, pass: string, plan?: string) => void;
  logout: () => void;
  updateUser: (u: Partial<User>) => void;
}

const PLAN_RETURNS: Record<string, number> = {
  'Foundation Plan': 0.00027,
  'Growth Plan': 0.00041,
  'Prestige Plan': 0.00055,
  'Heritage Plan': 0.00082,
};

const MS_24H = 24 * 60 * 60 * 1000;

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const saveUser = (u: User) => {
    localStorage.setItem('landsec_user', JSON.stringify(u));
    setUser(u);
  };

  const applyProfit = (u: User): User => {
    const now = Date.now();
    const elapsed = now - (u.lastProfitAt || now);
    const periods = Math.floor(elapsed / MS_24H);
    if (periods < 1) return u;

    const rate = PLAN_RETURNS[u.plan] ?? PLAN_RETURNS['Foundation Plan'];
    const periodReturn = u.investedAmount * rate;
    const totalReturn = periodReturn * periods;
    const updated: User = {
      ...u,
      balance: (u.balance || 0) + totalReturn,
      totalReturns: (u.totalReturns || 0) + totalReturn,
      lastProfitAt: u.lastProfitAt + periods * MS_24H,
    };

    sendEmail(u.email, 'profit', {
      name: u.name,
      amount: totalReturn.toFixed(2),
      period: periods === 1 ? '24-Hour Return' : `${periods}-Day Return`,
      plan: u.plan,
      newBalance: ((updated.balance || 0) + updated.investedAmount).toFixed(2),
    });

    return updated;
  };

  useEffect(() => {
    const stored = localStorage.getItem('landsec_user');
    if (stored) {
      const u: User = JSON.parse(stored);
      const withProfit = applyProfit(u);
      if (withProfit !== u) saveUser(withProfit);
      else setUser(u);
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    timerRef.current = setInterval(() => {
      const stored = localStorage.getItem('landsec_user');
      if (!stored) return;
      const u: User = JSON.parse(stored);
      const updated = applyProfit(u);
      if (updated !== u) saveUser(updated);
    }, 60 * 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [user?.id]);

  const login = (email: string, _pass: string) => {
    const storedUser = localStorage.getItem('landsec_user');
    if (storedUser) {
      const u: User = JSON.parse(storedUser);
      const withProfit = applyProfit(u);
      if (withProfit !== u) saveUser(withProfit);
      else setUser(u);
      return true;
    }
    const newUser: User = {
      id: Math.random().toString(36).substring(7),
      name: 'Demo Investor',
      email,
      plan: 'Foundation Plan',
      investedAmount: 5000,
      balance: 0,
      totalReturns: 0,
      joinDate: new Date().toISOString(),
      lastProfitAt: Date.now(),
    };
    saveUser(newUser);
    return true;
  };

  const register = (name: string, email: string, _pass: string, plan = 'Foundation Plan') => {
    const newUser: User = {
      id: Math.random().toString(36).substring(7),
      name,
      email,
      plan,
      investedAmount: 5000,
      balance: 0,
      totalReturns: 0,
      joinDate: new Date().toISOString(),
      lastProfitAt: Date.now(),
    };
    saveUser(newUser);
    sendEmail(email, 'welcome', { name, email, plan });
  };

  const logout = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    saveUser(updated);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
