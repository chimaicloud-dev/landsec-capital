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
  login: (email: string, pass: string) => Promise<AuthResult>;
  register: (name: string, email: string, pass: string, plan?: string, country?: string, phone?: string) => Promise<AuthResult>;
  logout: () => void;
  updateUser: (u: Partial<User>) => void;
  withdrawProfit: (amount: number) => boolean;
  isCapitalMatured: () => boolean;
  daysToMaturity: () => number;
}

export interface AuthResult {
  ok: boolean;
  error?: string;
  status?: number;
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

  const saveUser = (u: User) => setUser(u);

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
    fetch('/api/user/session', { credentials: 'include' })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => { if (data?.user) setUser(data.user); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!user) return;
    timerRef.current = setInterval(() => {
      const updated = applyProfit(user);
      if (updated !== user) setUser(updated);
    }, 60 * 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [user?.id]);

  const login = async (email: string, pass: string) => {
    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password: pass }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) return { ok: false, error: data?.error, status: response.status };
      if (!data?.user) return { ok: false, error: 'The server returned an invalid response.' };
      setUser(data.user);
      return { ok: true };
    } catch {
      return { ok: false, error: 'Unable to reach the authentication server.' };
    }
  };

  const register = async (name: string, email: string, pass: string, plan = 'Foundation Plan', country = '', phone = '') => {
    try {
      const response = await fetch('/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, email, password: pass, plan, country, phone }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) return { ok: false, error: data?.error, status: response.status };
      if (!data?.user) return { ok: false, error: 'The server returned an invalid response.' };
      setUser(data.user);
      sendEmail(email, 'welcome', { name, email, plan });
      return { ok: true };
    } catch {
      return { ok: false, error: 'Unable to reach the authentication server.' };
    }
  };

  const logout = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    void fetch('/api/user/logout', { method: 'POST', credentials: 'include' });
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
