import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { sendEmail } from '@/lib/emailService';

export interface User {
  id: string;
  name: string;
  email: string;
  plan: string;
  investedAmount: number;
  withdrawableProfit: number;
  totalReturns: number;
  investmentStartDate: string;
  maturityDate: string;
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
  withdrawProfit: (amount: number) => boolean;
  isCapitalMatured: () => boolean;
  daysToMaturity: () => number;
}

const PLAN_DAILY_RATE: Record<string, number> = {
  'Foundation Plan':   8  / 100 / 365,
  'Growth Plan':       12 / 100 / 365,
  'Premier Plan':      16 / 100 / 365,
  'Prestige Plan':     16 / 100 / 365,
  'Institutional Plan':20 / 100 / 365,
  'Heritage Plan':     20 / 100 / 365,
};

const PLAN_TERM_DAYS: Record<string, number> = {
  'Foundation Plan':    365,
  'Growth Plan':        730,
  'Premier Plan':      1095,
  'Prestige Plan':     1095,
  'Institutional Plan':1460,
  'Heritage Plan':     1460,
};

const MS_24H = 24 * 60 * 60 * 1000;

function makeMaturityDate(startIso: string, plan: string): string {
  const termDays = PLAN_TERM_DAYS[plan] ?? 365;
  const start = new Date(startIso);
  start.setDate(start.getDate() + termDays);
  return start.toISOString();
}

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

    const rate = PLAN_DAILY_RATE[u.plan] ?? PLAN_DAILY_RATE['Foundation Plan'];
    const periodReturn = u.investedAmount * rate;
    const earned = periodReturn * periods;

    const updated: User = {
      ...u,
      withdrawableProfit: (u.withdrawableProfit || 0) + earned,
      totalReturns: (u.totalReturns || 0) + earned,
      lastProfitAt: (u.lastProfitAt || now) + periods * MS_24H,
    };

    sendEmail(u.email, 'profit', {
      name: u.name,
      amount: earned.toFixed(2),
      period: periods === 1 ? '24-Hour Cycle' : `${periods}-Day Cycle`,
      plan: u.plan,
      newBalance: (updated.withdrawableProfit).toFixed(2),
    });

    return updated;
  };

  useEffect(() => {
    const stored = localStorage.getItem('landsec_user');
    if (stored) {
      let u: User = JSON.parse(stored);
      // Migrate old user objects that lack new fields
      let migrated = false;
      if (!u.withdrawableProfit) { u = { ...u, withdrawableProfit: (u as any).balance || 0 }; migrated = true; }
      if (!u.totalReturns) { u = { ...u, totalReturns: (u as any).balance || 0 }; migrated = true; }
      if (!u.investmentStartDate) { u = { ...u, investmentStartDate: u.joinDate || new Date().toISOString() }; migrated = true; }
      if (!u.maturityDate) { u = { ...u, maturityDate: makeMaturityDate(u.investmentStartDate, u.plan) }; migrated = true; }
      if (!u.lastProfitAt) { u = { ...u, lastProfitAt: Date.now() }; migrated = true; }
      if (migrated) { localStorage.setItem('landsec_user', JSON.stringify(u)); }

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
    const now = new Date().toISOString();
    const newUser: User = {
      id: Math.random().toString(36).substring(7),
      name: 'Demo Investor',
      email,
      plan: 'Foundation Plan',
      investedAmount: 5000,
      withdrawableProfit: 0,
      totalReturns: 0,
      investmentStartDate: now,
      maturityDate: makeMaturityDate(now, 'Foundation Plan'),
      joinDate: now,
      lastProfitAt: Date.now(),
    };
    saveUser(newUser);
    return true;
  };

  const register = (name: string, email: string, _pass: string, plan = 'Foundation Plan') => {
    const now = new Date().toISOString();
    const newUser: User = {
      id: Math.random().toString(36).substring(7),
      name,
      email,
      plan,
      investedAmount: 5000,
      withdrawableProfit: 0,
      totalReturns: 0,
      investmentStartDate: now,
      maturityDate: makeMaturityDate(now, plan),
      joinDate: now,
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
    if (updates.plan && updates.plan !== user.plan) {
      updated.maturityDate = makeMaturityDate(new Date().toISOString(), updates.plan);
      updated.investmentStartDate = new Date().toISOString();
    }
    saveUser(updated);
  };

  const withdrawProfit = (amount: number): boolean => {
    if (!user) return false;
    if (amount <= 0 || amount > user.withdrawableProfit) return false;
    const updated = { ...user, withdrawableProfit: user.withdrawableProfit - amount };
    saveUser(updated);
    sendEmail(user.email, 'withdrawal', {
      name: user.name,
      amount: amount.toFixed(2),
      destination: 'Nominated Account',
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      txRef: `WD-${Date.now()}`,
    });
    return true;
  };

  const isCapitalMatured = (): boolean => {
    if (!user?.maturityDate) return false;
    return Date.now() >= new Date(user.maturityDate).getTime();
  };

  const daysToMaturity = (): number => {
    if (!user?.maturityDate) return 0;
    const diff = new Date(user.maturityDate).getTime() - Date.now();
    return Math.max(0, Math.ceil(diff / MS_24H));
  };

  return (
    <AuthContext.Provider value={{
      user, isAuthenticated: !!user,
      login, register, logout, updateUser,
      withdrawProfit, isCapitalMatured, daysToMaturity,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
