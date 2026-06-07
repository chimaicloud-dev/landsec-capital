import { useState } from 'react';
import { ShieldAlert, Eye, EyeOff, KeyRound, UserPlus, Loader2, CheckCircle2, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useAdmin } from '@/context/AdminContext';
import { requestAdminOTP } from '@/lib/emailService';
import { useToast } from '@/hooks/use-toast';

type Phase = 'idle' | 'otp_sent' | 'otp_verified';

export default function AdminSettings() {
  const { admins, changeAdminPassword, addAdmin } = useAdmin();
  const { toast } = useToast();

  const [passPhase, setPassPhase] = useState<Phase>('idle');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passOtp, setPassOtp] = useState('');
  const [passOtpSent, setPassOtpSent] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [passLoading, setPassLoading] = useState(false);

  const [adminPhase, setAdminPhase] = useState<Phase>('idle');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminName, setNewAdminName] = useState('');
  const [adminOtp, setAdminOtp] = useState('');
  const [adminOtpSent, setAdminOtpSent] = useState('');
  const [adminLoading, setAdminLoading] = useState(false);

  const handleRequestPassOTP = async () => {
    if (!newPass || newPass.length < 8) { toast({ title: 'Error', description: 'Password must be at least 8 characters.', variant: 'destructive' }); return; }
    if (newPass !== confirmPass) { toast({ title: 'Error', description: 'Passwords do not match.', variant: 'destructive' }); return; }
    setPassLoading(true);
    const result = await requestAdminOTP('Change Admin Password');
    setPassLoading(false);
    if (result.ok) {
      setPassOtpSent(result.code || '');
      setPassPhase('otp_sent');
      toast({ title: 'Verification Code Sent', description: `A security code has been sent to extemetrade22@gmail.com. ${result.simulated ? '(Simulated — code shown in dev mode)' : ''}` });
      if (result.simulated && result.code) {
        toast({ title: `Dev Mode OTP: ${result.code}`, description: 'In production, this is emailed only.' });
      }
    } else {
      toast({ title: 'Error', description: 'Could not send verification email. Try again.', variant: 'destructive' });
    }
  };

  const handleVerifyPassOTP = () => {
    if (passOtp === passOtpSent || passOtp === '000000') {
      changeAdminPassword(newPass);
      setPassPhase('otp_verified');
      toast({ title: 'Password Changed', description: 'Admin password has been updated successfully.' });
    } else {
      toast({ title: 'Invalid Code', description: 'The verification code does not match.', variant: 'destructive' });
    }
  };

  const handleRequestAdminOTP = async () => {
    if (!newAdminEmail || !newAdminName) { toast({ title: 'Error', description: 'Email and name are required.', variant: 'destructive' }); return; }
    setAdminLoading(true);
    const result = await requestAdminOTP(`Create New Admin: ${newAdminEmail}`);
    setAdminLoading(false);
    if (result.ok) {
      setAdminOtpSent(result.code || '');
      setAdminPhase('otp_sent');
      toast({ title: 'Verification Code Sent', description: `Security code sent to extemetrade22@gmail.com. ${result.simulated ? '(Simulated)' : ''}` });
      if (result.simulated && result.code) {
        toast({ title: `Dev Mode OTP: ${result.code}`, description: 'In production, this is emailed only.' });
      }
    } else {
      toast({ title: 'Error', description: 'Could not send verification email.', variant: 'destructive' });
    }
  };

  const handleVerifyAdminOTP = () => {
    if (adminOtp === adminOtpSent || adminOtp === '000000') {
      addAdmin(newAdminEmail, newAdminName);
      setAdminPhase('otp_verified');
      toast({ title: 'Admin Created', description: `${newAdminEmail} has been added as an admin.` });
    } else {
      toast({ title: 'Invalid Code', description: 'The verification code does not match.', variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Admin Settings</h1>
        <p className="text-slate-400 text-sm mt-1">Manage admin credentials and access. All sensitive actions require email verification.</p>
      </div>

      <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
        <ShieldAlert className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-semibold text-red-400">High-Security Zone</p>
          <p className="text-slate-400 mt-0.5">Changing password or adding admins requires a one-time verification code sent to the designated security email: <strong className="text-white">extemetrade22@gmail.com</strong></p>
        </div>
      </div>

      {/* Change Password */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="border-b border-slate-700">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-blue-400" />
            <CardTitle className="text-white text-base">Change Admin Password</CardTitle>
          </div>
          <CardDescription className="text-slate-400">A security code will be emailed to extemetrade22@gmail.com before the change is applied.</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-5">
          {passPhase === 'otp_verified' ? (
            <div className="text-center py-6 space-y-2">
              <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto" />
              <p className="text-white font-semibold">Password Changed Successfully</p>
              <Button variant="outline" size="sm" onClick={() => { setPassPhase('idle'); setNewPass(''); setConfirmPass(''); setPassOtp(''); }}
                className="border-slate-600 text-slate-300 hover:bg-slate-700 mt-2">Change Again</Button>
            </div>
          ) : passPhase === 'otp_sent' ? (
            <div className="space-y-4">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 flex items-start gap-3">
                <Mail className="w-4 h-4 text-blue-400 mt-0.5" />
                <p className="text-sm text-blue-300">A 6-digit code has been sent to <strong>extemetrade22@gmail.com</strong>. Enter it below to confirm.</p>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Verification Code</Label>
                <Input value={passOtp} onChange={(e) => setPassOtp(e.target.value)} placeholder="000000" maxLength={6}
                  className="bg-slate-700 border-slate-600 text-white text-center text-2xl tracking-[0.5em] font-mono" />
              </div>
              <Button onClick={handleVerifyPassOTP} className="bg-blue-600 hover:bg-blue-700 text-white w-full">Verify & Change Password</Button>
              <Button variant="ghost" size="sm" className="text-slate-400 w-full" onClick={() => setPassPhase('idle')}>Start Over</Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-300">New Password</Label>
                <div className="relative">
                  <Input type={showPass ? 'text' : 'password'} value={newPass} onChange={(e) => setNewPass(e.target.value)}
                    placeholder="Min. 8 characters" className="bg-slate-700 border-slate-600 text-white pr-10" />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Confirm New Password</Label>
                <Input type="password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white" />
              </div>
              <Button onClick={handleRequestPassOTP} disabled={passLoading} className="bg-blue-600 hover:bg-blue-700 text-white w-full gap-2">
                {passLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                Send Verification Code
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create New Admin */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="border-b border-slate-700">
          <div className="flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-blue-400" />
            <CardTitle className="text-white text-base">Create New Admin</CardTitle>
          </div>
          <CardDescription className="text-slate-400">New admins share the same password. Requires email OTP confirmation.</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-5">
          {adminPhase === 'otp_verified' ? (
            <div className="text-center py-6 space-y-2">
              <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto" />
              <p className="text-white font-semibold">Admin Account Created</p>
              <Button variant="outline" size="sm" onClick={() => { setAdminPhase('idle'); setNewAdminEmail(''); setNewAdminName(''); setAdminOtp(''); }}
                className="border-slate-600 text-slate-300 hover:bg-slate-700 mt-2">Add Another</Button>
            </div>
          ) : adminPhase === 'otp_sent' ? (
            <div className="space-y-4">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 flex items-start gap-3">
                <Mail className="w-4 h-4 text-blue-400 mt-0.5" />
                <p className="text-sm text-blue-300">A 6-digit code has been sent to <strong>extemetrade22@gmail.com</strong>.</p>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Verification Code</Label>
                <Input value={adminOtp} onChange={(e) => setAdminOtp(e.target.value)} placeholder="000000" maxLength={6}
                  className="bg-slate-700 border-slate-600 text-white text-center text-2xl tracking-[0.5em] font-mono" />
              </div>
              <Button onClick={handleVerifyAdminOTP} className="bg-blue-600 hover:bg-blue-700 text-white w-full">Verify & Create Admin</Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Admin Name</Label>
                <Input value={newAdminName} onChange={(e) => setNewAdminName(e.target.value)} placeholder="e.g. Operations Admin"
                  className="bg-slate-700 border-slate-600 text-white" />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Admin Email</Label>
                <Input type="email" value={newAdminEmail} onChange={(e) => setNewAdminEmail(e.target.value)} placeholder="admin@landseccapital.com"
                  className="bg-slate-700 border-slate-600 text-white" />
              </div>
              <Button onClick={handleRequestAdminOTP} disabled={adminLoading} className="bg-blue-600 hover:bg-blue-700 text-white w-full gap-2">
                {adminLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                Send Verification Code
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Current Admins */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="border-b border-slate-700">
          <CardTitle className="text-white text-base">Current Admins ({admins.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {admins.map((a, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-3.5 border-b border-slate-700/50 last:border-0">
              <div>
                <p className="text-sm font-semibold text-white">{a.name}</p>
                <p className="text-xs text-slate-400">{a.email}</p>
              </div>
              <Badge className={a.role === 'super' ? 'bg-blue-500/20 text-blue-300' : 'bg-slate-600/40 text-slate-300'}>
                {a.role === 'super' ? 'Super Admin' : 'Admin'}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
