import React from 'react';
import { Link, useLocation } from 'wouter';
import { Landmark, LayoutDashboard, TrendingUp, ArrowLeftRight, FileText, User, LifeBuoy, LogOut, Menu } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/investments', label: 'My Investments', icon: TrendingUp },
  { href: '/dashboard/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { href: '/dashboard/documents', label: 'Documents', icon: FileText },
  { href: '/dashboard/profile', label: 'Profile', icon: User },
  { href: '/dashboard/support', label: 'Support', icon: LifeBuoy },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const { user, logout } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    setLocation('/login');
  };

  const NavLinks = () => (
    <div className="flex flex-col space-y-1">
      {navItems.map((item) => {
        const isActive = location === item.href;
        return (
          <Link key={item.href} href={item.href}>
            <span className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'}`}>
              <item.icon className="w-5 h-5" />
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-sidebar text-sidebar-foreground border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <Landmark className="w-6 h-6 text-primary" />
          <span className="font-serif font-bold text-xl tracking-tight">Landsec</span>
        </div>
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-sidebar-foreground">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-sidebar text-sidebar-foreground border-sidebar-border p-0 w-72">
            <div className="flex flex-col h-full">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-8">
                  <Landmark className="w-8 h-8 text-primary" />
                  <span className="font-serif font-bold text-2xl tracking-tight">Landsec</span>
                </div>
                <NavLinks />
              </div>
              <div className="mt-auto p-4 border-t border-sidebar-border">
                <div className="flex items-center gap-3 mb-4 px-2">
                  <Avatar>
                    <AvatarFallback className="bg-primary/20 text-primary">{user?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{user?.name}</span>
                    <span className="text-xs text-sidebar-foreground/60">{user?.plan}</span>
                  </div>
                </div>
                <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent" onClick={handleLogout}>
                  <LogOut className="w-5 h-5 mr-3" /> Log Out
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border fixed top-0 bottom-0 left-0">
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center gap-2 mb-10 pl-2">
            <Landmark className="w-8 h-8 text-primary" />
            <span className="font-serif font-bold text-2xl tracking-tight">Landsec</span>
          </div>
          <NavLinks />
          <div className="mt-auto pt-6 border-t border-sidebar-border">
            <div className="flex items-center gap-3 mb-6 px-2">
              <Avatar>
                <AvatarFallback className="bg-primary/20 text-primary font-bold">{user?.name.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-semibold truncate">{user?.name}</span>
                <span className="text-xs text-sidebar-foreground/60 truncate">{user?.plan}</span>
              </div>
            </div>
            <Button variant="ghost" className="w-full justify-start text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground" onClick={handleLogout}>
              <LogOut className="w-5 h-5 mr-3" /> Log Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}