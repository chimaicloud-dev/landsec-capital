import { useState } from 'react';
import { useLocation } from 'wouter';
import { Landmark, Eye, EyeOff, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAdmin } from '@/context/AdminContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const { adminLogin } = useAdmin();
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const ok = adminLogin(email, pass);
    if (ok) {
      setLocation('/admin/dashboard');
    } else {
      setError('Invalid credentials. Access denied.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Landmark className="w-10 h-10 text-blue-400" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-white mb-1">Landsec Capital</h1>
          <p className="text-xs text-red-400 tracking-widest font-semibold uppercase">Admin Control Panel</p>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8">
          <div className="flex items-center gap-2 mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <ShieldAlert className="w-4 h-4 text-red-400 flex-shrink-0" />
            <p className="text-xs text-red-400 font-medium">Restricted access. Authorised personnel only.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label className="text-slate-300 text-sm">Admin Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500"
                placeholder="admin@landseccapital.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300 text-sm">Password</Label>
              <div className="relative">
                <Input
                  type={show ? 'text' : 'password'}
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 pr-10"
                  placeholder="••••••••••••"
                  required
                />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11">
              Sign In to Admin Panel
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-600 mt-6">
          This panel is monitored and all access is logged. Unauthorised access is a criminal offence.
        </p>
      </div>
    </div>
  );
}
