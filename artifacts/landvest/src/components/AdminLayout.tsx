import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Landmark, LayoutDashboard, ArrowDownCircle, ArrowUpCircle, ShieldCheck, Users, Mail, Settings, LogOut, Menu, Globe, CreditCard, ChevronRight } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/deposits', label: 'Deposit Approvals', icon: ArrowDownCircle },
  { href: '/admin/withdrawals', label: 'Withdrawal Approvals', icon: ArrowUpCircle },
  { href: '/admin/kyc', label: 'KYC Approvals', icon: ShieldCheck },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/email', label: 'Email Centre', icon: Mail },
  { href: '/admin/payment', label: 'Payment Details', icon: CreditCard },
  { href: '/admin/homepage', label: 'Homepage Editor', icon: Globe },
  { href: '/admin/settings', label: 'Admin Settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const { admin, adminLogout, deposits, withdrawals, kycRequests } = useAdmin();
  const [open, setOpen] = useState(false);

  const pendingCount = (arr: { status: string }[]) => arr.filter((x) => x.status === 'pending').length;

  const handleLogout = () => { adminLogout(); setLocation('/admin'); };

  const NavLinks = () => (
    <div className="flex flex-col space-y-0.5">
      {navItems.map(({ href, label, icon: Icon }) => {
        const isActive = location === href;
        let badge = 0;
        if (href === '/admin/deposits') badge = pendingCount(deposits);
        if (href === '/admin/withdrawals') badge = pendingCount(withdrawals);
        if (href === '/admin/kyc') badge = pendingCount(kycRequests);

        return (
          <Link key={href} href={href}>
            <span className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer group ${isActive ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700/60 hover:text-white'}`}>
              <span className="flex items-center gap-3">
                <Icon className="w-4 h-4" />
                {label}
              </span>
              {badge > 0 && (
                <Badge className="bg-red-500 text-white text-xs h-5 min-w-5 px-1.5 rounded-full">{badge}</Badge>
              )}
            </span>
          </Link>
        );
      })}
    </div>
  );

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-slate-900">
      <div className="p-5 border-b border-slate-700">
        <div className="flex items-center gap-2 mb-1">
          <Landmark className="w-7 h-7 text-blue-400" />
          <span className="font-serif font-bold text-xl text-white">Landsec Admin</span>
        </div>
        <span className="text-xs text-red-400 font-semibold tracking-widest uppercase">Control Panel</span>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        <NavLinks />
      </div>
      <div className="p-4 border-t border-slate-700">
        <div className="px-3 py-2 mb-2">
          <p className="text-xs font-semibold text-white truncate">{admin?.name}</p>
          <p className="text-xs text-slate-400 truncate">{admin?.email}</p>
          <span className="text-xs text-blue-400 font-medium capitalize">{admin?.role}</span>
        </div>
        <Button variant="ghost" size="sm" className="w-full justify-start text-slate-400 hover:bg-slate-700 hover:text-white" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" /> Log Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Desktop sidebar */}
      <div className="hidden md:flex w-60 flex-col fixed top-0 bottom-0 left-0 bg-slate-900 border-r border-slate-700">
        <SidebarContent />
      </div>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900 border-b border-slate-700 flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <Landmark className="w-6 h-6 text-blue-400" />
          <span className="font-serif font-bold text-lg text-white">Landsec Admin</span>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white"><Menu className="w-5 h-5" /></Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-60 border-slate-700">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      <main className="flex-1 md:ml-60 pt-16 md:pt-0 min-h-screen">
        <div className="p-6 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
