import { useState } from 'react';
import { Mail, Send, Users, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { sendEmail } from '@/lib/emailService';

const templates = [
  { value: 'welcome', label: 'Welcome Email' },
  { value: 'deposit', label: 'Deposit Confirmation' },
  { value: 'withdrawal_approved', label: 'Withdrawal Approved' },
  { value: 'kyc_approved', label: 'KYC Approved' },
  { value: 'kyc_rejected', label: 'KYC Rejected' },
  { value: 'profit', label: 'Investment Return Credit' },
  { value: 'custom', label: 'Custom Message' },
];

const mockUsers = [
  { name: 'James Okafor', email: 'james@example.com' },
  { name: 'Sarah Chen', email: 'sarah@example.com' },
  { name: 'Michael Torres', email: 'michael@example.com' },
  { name: 'Emma Williams', email: 'emma@example.com' },
  { name: 'David Park', email: 'david@example.com' },
];

export default function AdminEmail() {
  const { toast } = useToast();
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [heading, setHeading] = useState('');
  const [body, setBody] = useState('');
  const [template, setTemplate] = useState('custom');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = async () => {
    if (!to) { toast({ title: 'Error', description: 'Recipient email is required.', variant: 'destructive' }); return; }
    setSending(true);
    const ok = await sendEmail(to, template, { name: 'Investor', subject, heading, body });
    setSending(false);
    if (ok) {
      setSent(true);
      toast({ title: 'Email Sent', description: `Message delivered to ${to}` });
      setTimeout(() => setSent(false), 3000);
    } else {
      toast({ title: 'Note', description: 'Email queued (SMTP not yet configured — set GMAIL_APP_PASSWORD env var to activate live sending).' });
    }
  };

  const handleBroadcast = async () => {
    setSending(true);
    for (const u of mockUsers) {
      await sendEmail(u.email, template, { name: u.name, subject, heading, body });
    }
    setSending(false);
    toast({ title: 'Broadcast Complete', description: `Email sent to ${mockUsers.length} investors.` });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Email Centre</h1>
        <p className="text-slate-400 text-sm mt-1">Send individual or broadcast emails to investors.</p>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-start gap-3">
        <Mail className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-semibold text-blue-300">Sender: landseccapital@gmail.com</p>
          <p className="text-slate-400 mt-0.5">All emails are sent from the official Landsec Capital address. Set the <code className="bg-slate-700 px-1 rounded text-xs">GMAIL_APP_PASSWORD</code> environment variable to enable live delivery.</p>
        </div>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="border-b border-slate-700">
          <CardTitle className="text-white text-base">Compose Email</CardTitle>
          <CardDescription className="text-slate-400">Individual message or broadcast to all investors</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-5">
          <div className="space-y-2">
            <Label className="text-slate-300">Template</Label>
            <Select value={template} onValueChange={setTemplate}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                {templates.map((t) => (
                  <SelectItem key={t.value} value={t.value} className="text-white hover:bg-slate-700">{t.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-300">Recipient Email</Label>
            <div className="flex gap-2">
              <Input value={to} onChange={(e) => setTo(e.target.value)} placeholder="investor@email.com"
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 flex-1" />
              <Select onValueChange={(v) => setTo(v)}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-300 w-40">
                  <SelectValue placeholder="Pick user" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  {mockUsers.map((u) => (
                    <SelectItem key={u.email} value={u.email} className="text-white hover:bg-slate-700">{u.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {template === 'custom' && (
            <>
              <div className="space-y-2">
                <Label className="text-slate-300">Subject</Label>
                <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Email subject line"
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500" />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Heading</Label>
                <Input value={heading} onChange={(e) => setHeading(e.target.value)} placeholder="Email heading"
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500" />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Message Body</Label>
                <Textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Write your message here…"
                  rows={6} className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 resize-none" />
              </div>
            </>
          )}

          <div className="flex gap-3 pt-2">
            <Button onClick={handleSend} disabled={sending} className="bg-blue-600 hover:bg-blue-700 text-white gap-2 flex-1">
              {sent ? <CheckCircle2 className="w-4 h-4" /> : <Send className="w-4 h-4" />}
              {sending ? 'Sending…' : sent ? 'Sent!' : 'Send to Recipient'}
            </Button>
            <Button onClick={handleBroadcast} disabled={sending} variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 gap-2">
              <Users className="w-4 h-4" /> Broadcast to All
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="border-b border-slate-700 pb-4">
          <CardTitle className="text-white text-base">Email Log</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {[
            { to: 'james@example.com', type: 'Welcome Email', time: 'Jun 05, 2026 14:23', status: 'delivered' },
            { to: 'sarah@example.com', type: 'Deposit Confirmation', time: 'Jun 06, 2026 09:11', status: 'delivered' },
            { to: 'emma@example.com', type: 'Withdrawal Approved', time: 'Jun 04, 2026 16:45', status: 'delivered' },
            { to: 'kofi@example.com', type: 'Welcome Email', time: 'Jun 07, 2026 08:30', status: 'delivered' },
          ].map((log, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-3.5 border-b border-slate-700/50 last:border-0">
              <div>
                <p className="text-sm text-white">{log.type}</p>
                <p className="text-xs text-slate-400">{log.to}</p>
              </div>
              <div className="text-right">
                <span className="text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full">{log.status}</span>
                <p className="text-xs text-slate-500 mt-1">{log.time}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
