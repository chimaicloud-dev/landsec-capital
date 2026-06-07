import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/context/AuthContext";
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
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function ProtectedRoute({ component: Component, path }: { component: any, path: string }) {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  if (!isAuthenticated) {
    setLocation("/login");
    return null;
  }

  return (
    <Route path={path}>
      <DashboardLayout>
        <Component />
      </DashboardLayout>
    </Route>
  );
}

function Router() {
  const { isAuthenticated } = useAuth();
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/about" component={About} />
      <Route path="/terms" component={Terms} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      
      <Route path="/dashboard">
        {() => {
          if (!isAuthenticated) {
            return <Login />;
          }
          return (
            <DashboardLayout>
              <Overview />
            </DashboardLayout>
          );
        }}
      </Route>
      <ProtectedRoute path="/dashboard/investments" component={Investments} />
      <ProtectedRoute path="/dashboard/transactions" component={Transactions} />
      <ProtectedRoute path="/dashboard/documents" component={Documents} />
      <ProtectedRoute path="/dashboard/profile" component={Profile} />
      <ProtectedRoute path="/dashboard/support" component={Support} />
      <ProtectedRoute path="/dashboard/deposit" component={Deposit} />
      <ProtectedRoute path="/dashboard/kyc" component={KYC} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
