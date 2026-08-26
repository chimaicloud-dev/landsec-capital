import { createContext, useContext, useState, useEffect } from 'react';

const ADMINS_KEY = 'landsec_admins';

export interface AdminUser {
  email: string;
  name: string;
  role: 'super' | 'admin';
}

export interface PendingDeposit {
  id: string;
  userName: string;
  userEmail: string;
  amount: number;
  method: string;
  txRef: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface PendingWithdrawal {
  id: string;
  userName: string;
  userEmail: string;
  amount: number;
  destination: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface PendingKYC {
  id: string;
  userName: string;
  userEmail: string;
  docType: string;
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface AdminContextType {
  admin: AdminUser | null;
  isAdminAuthenticated: boolean;
  isAdminLoading: boolean;
  adminLogin: (email: string, pass: string) => Promise<boolean>;
  adminLogout: () => void;
  deposits: PendingDeposit[];
  withdrawals: PendingWithdrawal[];
  kycRequests: PendingKYC[];
  approveDeposit: (id: string) => void;
  rejectDeposit: (id: string) => void;
  approveWithdrawal: (id: string) => void;
  rejectWithdrawal: (id: string) => void;
  approveKYC: (id: string) => void;
  rejectKYC: (id: string, reason: string) => void;
  admins: AdminUser[];
  addAdmin: (email: string, name: string) => void;
  changeAdminPassword: (newPass: string) => Promise<boolean>;
  paymentDetails: PaymentDetails;
  updatePaymentDetails: (d: PaymentDetails) => void;
  homepageContent: HomepageContent;
  updateHomepageContent: (c: HomepageContent) => void;
}

export interface PaymentDetails {
  btcAddress: string;
  ethAddress: string;
  usdtAddress: string;
  usdcAddress: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  sortCode: string;
  reference: string;
}

export interface HomepageContent {
  heroTitle: string;
  heroSubtitle: string;
  heroCta: string;
  aum: string;
  investors: string;
  avgReturn: string;
  since: string;
}

const defaultPayment: PaymentDetails = {
  btcAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
  ethAddress: '0x742d35Cc6634C0532925a3b8D4C9C4B0e5f2a1b9',
  usdtAddress: 'TQtMZR7iBbMv77FpQZoC4nS7sKhvE5Qx3F',
  usdcAddress: '0x742d35Cc6634C0532925a3b8D4C9C4B0e5f2a1b9',
  bankName: 'Barclays PLC',
  accountName: 'Landsec Capital Ltd',
  accountNumber: '87654321',
  sortCode: '20-00-00',
  reference: 'LSEC-INV',
};

const defaultHomepage: HomepageContent = {
  heroTitle: "Invest in the Foundation of Tomorrow's London",
  heroSubtitle: 'Institutional-grade real estate investments for visionaries. Join a FTSE-caliber heritage trust managing $10B+ in prime urban assets.',
  heroCta: 'Explore Plans',
  aum: '$10.4B',
  investors: '4,200+',
  avgReturn: '9.8%',
  since: '2015',
};

const seedDeposits: PendingDeposit[] = [
  { id: 'DEP-001', userName: 'James Okafor', userEmail: 'james@example.com', amount: 5000, method: 'BTC', txRef: 'bc1q...abc', date: 'Jun 05, 2026', status: 'pending' },
  { id: 'DEP-002', userName: 'Sarah Chen', userEmail: 'sarah@example.com', amount: 12000, method: 'ETH', txRef: '0xabc...123', date: 'Jun 06, 2026', status: 'pending' },
  { id: 'DEP-003', userName: 'Michael Torres', userEmail: 'michael@example.com', amount: 3500, method: 'Bank Transfer', txRef: 'WIRE-445', date: 'Jun 07, 2026', status: 'pending' },
];

const seedWithdrawals: PendingWithdrawal[] = [
  { id: 'WD-001', userName: 'Emma Williams', userEmail: 'emma@example.com', amount: 2500, destination: 'BTC Wallet', date: 'Jun 04, 2026', status: 'pending' },
  { id: 'WD-002', userName: 'David Park', userEmail: 'david@example.com', amount: 8000, destination: 'Bank Account (HSBC)', date: 'Jun 06, 2026', status: 'pending' },
];

const seedKYC: PendingKYC[] = [
  { id: 'KYC-001', userName: 'James Okafor', userEmail: 'james@example.com', docType: 'Passport', submittedDate: 'Jun 05, 2026', status: 'pending' },
  { id: 'KYC-002', userName: 'Maria Santos', userEmail: 'maria@example.com', docType: 'Driving Licence', submittedDate: 'Jun 06, 2026', status: 'pending' },
  { id: 'KYC-003', userName: 'Kofi Mensah', userEmail: 'kofi@example.com', docType: 'National ID', submittedDate: 'Jun 07, 2026', status: 'pending' },
];

const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  const [deposits, setDeposits] = useState<PendingDeposit[]>(seedDeposits);
  const [withdrawals, setWithdrawals] = useState<PendingWithdrawal[]>(seedWithdrawals);
  const [kycRequests, setKycRequests] = useState<PendingKYC[]>(seedKYC);
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>(defaultPayment);
  const [homepageContent, setHomepageContent] = useState<HomepageContent>(defaultHomepage);

  useEffect(() => {
    const storedAdmins = localStorage.getItem(ADMINS_KEY);
    if (storedAdmins) setAdmins(JSON.parse(storedAdmins));
    const pd = localStorage.getItem('landsec_payment_details');
    if (pd) setPaymentDetails(JSON.parse(pd));
    const hp = localStorage.getItem('landsec_homepage_content');
    if (hp) setHomepageContent(JSON.parse(hp));
    fetch('/api/admin/session', { credentials: 'include' })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => { if (data?.admin) setAdmin(data.admin); })
      .catch(() => {})
      .finally(() => setIsAdminLoading(false));
  }, []);

  const adminLogin = async (email: string, pass: string) => {
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password: pass }),
      });
      if (!response.ok) return false;
      const data = await response.json();
      if (!data?.admin?.email) return false;
      setAdmin(data.admin);
      return true;
    } catch {
      return false;
    }
  };

  const adminLogout = () => {
    void fetch('/api/admin/logout', { method: 'POST', credentials: 'include' });
    setAdmin(null);
  };

  const approveDeposit = (id: string) => setDeposits((prev) => prev.map((d) => d.id === id ? { ...d, status: 'approved' } : d));
  const rejectDeposit = (id: string) => setDeposits((prev) => prev.map((d) => d.id === id ? { ...d, status: 'rejected' } : d));
  const approveWithdrawal = (id: string) => setWithdrawals((prev) => prev.map((w) => w.id === id ? { ...w, status: 'approved' } : w));
  const rejectWithdrawal = (id: string) => setWithdrawals((prev) => prev.map((w) => w.id === id ? { ...w, status: 'rejected' } : w));
  const approveKYC = (id: string) => setKycRequests((prev) => prev.map((k) => k.id === id ? { ...k, status: 'approved' } : k));
  const rejectKYC = (id: string, _reason: string) => setKycRequests((prev) => prev.map((k) => k.id === id ? { ...k, status: 'rejected' } : k));

  const addAdmin = (email: string, name: string) => {
    const newAdmin: AdminUser = { email, name, role: 'admin' };
    const updated = [...admins, newAdmin];
    setAdmins(updated);
    localStorage.setItem(ADMINS_KEY, JSON.stringify(updated));
  };

  const changeAdminPassword = async (newPass: string) => {
    const response = await fetch('/api/admin/password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ password: newPass }),
    });
    return response.ok;
  };

  const updatePaymentDetails = (d: PaymentDetails) => {
    setPaymentDetails(d);
    localStorage.setItem('landsec_payment_details', JSON.stringify(d));
  };

  const updateHomepageContent = (c: HomepageContent) => {
    setHomepageContent(c);
    localStorage.setItem('landsec_homepage_content', JSON.stringify(c));
  };

  return (
    <AdminContext.Provider value={{
      admin, isAdminAuthenticated: !!admin, isAdminLoading,
      adminLogin, adminLogout,
      deposits, withdrawals, kycRequests,
      approveDeposit, rejectDeposit,
      approveWithdrawal, rejectWithdrawal,
      approveKYC, rejectKYC,
      admins, addAdmin, changeAdminPassword,
      paymentDetails, updatePaymentDetails,
      homepageContent, updateHomepageContent,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
}
