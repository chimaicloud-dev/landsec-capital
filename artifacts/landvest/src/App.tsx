import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { AdminProvider, useAdmin } from "@/context/AdminContext";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import About from "@/pages/About";
import Terms from "@/pages/Terms";
import DashboardLayout from "@/components/DashboardLayout";
import Overview from "@/pages/dashboard/Overview";
import Investments from "@/pages/dashboard/Investments";
import Transactions from "@/pages/dashboard/Transactions";
import Documents from "@/pages/dashboard/Documents";
import Profile from "@/pages/dashboard/Profile";
import Support from "@/pages/dashboard/Support";
import Deposit from "@/pages/dashboard/Deposit";
import KYC from "@/pages/dashboard/KYC";
import Withdraw from "@/pages/dashboard/Withdraw";
import NotFound from "@/pages/not-found";

import AdminLayout from "@/components/AdminLayout";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminDeposits from "@/pages/admin/AdminDeposits";
import AdminWithdrawals from "@/pages/admin/AdminWithdrawals";
import AdminKYC from "@/pages/admin/AdminKYC";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminEmail from "@/pages/admin/AdminEmail";
import AdminPayment from "@/pages/admin/AdminPayment";
import AdminHomepage from "@/pages/admin/AdminHomepage";
import AdminSettings from "@/pages/admin/AdminSettings";

const queryClient = new QueryClient();

function ProtectedRoute({ component: Component, path }: { component: any; path: string }) {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  if (!isAuthenticated) { setLocation("/login"); return null; }
  return (
    <Route path={path}>
      <DashboardLayout><Component /></DashboardLayout>
    </Route>
  );
}

function AdminRoute({ component: Component, path }: { component: any; path: string }) {
  const { isAdminAuthenticated, isAdminLoading } = useAdmin();
  const [, setLocation] = useLocation();
  if (isAdminLoading) return null;
  if (!isAdminAuthenticated) { setLocation("/admin"); return null; }
  return (
    <Route path={path}>
      <AdminLayout><Component /></AdminLayout>
    </Route>
  );
}

function Router() {
  const { isAuthenticated } = useAuth();
  const { isAdminAuthenticated } = useAdmin();

  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/about" component={About} />
      <Route path="/terms" component={Terms} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />

      <Route path="/dashboard">
        {() => {
          if (!isAuthenticated) return <Login />;
          return <DashboardLayout><Overview /></DashboardLayout>;
        }}
      </Route>
      <ProtectedRoute path="/dashboard/investments" component={Investments} />
      <ProtectedRoute path="/dashboard/transactions" component={Transactions} />
      <ProtectedRoute path="/dashboard/documents" component={Documents} />
      <ProtectedRoute path="/dashboard/profile" component={Profile} />
      <ProtectedRoute path="/dashboard/support" component={Support} />
      <ProtectedRoute path="/dashboard/deposit" component={Deposit} />
      <ProtectedRoute path="/dashboard/kyc" component={KYC} />
      <ProtectedRoute path="/dashboard/withdraw" component={Withdraw} />

      {/* Admin Panel */}
      <Route path="/admin">
        {() => {
          if (isAdminAuthenticated) { window.location.replace('/admin/dashboard'); return null; }
          return <AdminLogin />;
        }}
      </Route>
      <AdminRoute path="/admin/dashboard" component={AdminDashboard} />
      <AdminRoute path="/admin/deposits" component={AdminDeposits} />
      <AdminRoute path="/admin/withdrawals" component={AdminWithdrawals} />
      <AdminRoute path="/admin/kyc" component={AdminKYC} />
      <AdminRoute path="/admin/users" component={AdminUsers} />
      <AdminRoute path="/admin/email" component={AdminEmail} />
      <AdminRoute path="/admin/payment" component={AdminPayment} />
      <AdminRoute path="/admin/homepage" component={AdminHomepage} />
      <AdminRoute path="/admin/settings" component={AdminSettings} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AdminProvider>
        <AuthProvider>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </AuthProvider>
      </AdminProvider>
    </QueryClientProvider>
  );
}

export default App;
