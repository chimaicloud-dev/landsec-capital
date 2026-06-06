import React from 'react';
import { useLocation, Link } from 'wouter';
import { Landmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function Register() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [plan, setPlan] = React.useState('');
  const [agreed, setAgreed] = React.useState(false);
  
  const { register } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword || !plan) {
      toast({ title: 'Error', description: 'Please fill in all fields', variant: 'destructive' });
      return;
    }
    if (password !== confirmPassword) {
      toast({ title: 'Error', description: 'Passwords do not match', variant: 'destructive' });
      return;
    }
    if (!agreed) {
      toast({ title: 'Error', description: 'You must agree to the Terms & Conditions', variant: 'destructive' });
      return;
    }
    
    register(name, email, password);
    toast({ title: 'Account Created', description: 'Welcome to Landsec Capital' });
    setLocation('/dashboard');
  };

  return (
    <div className="min-h-screen bg-secondary/50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <Landmark className="w-10 h-10 text-primary" />
          <span className="font-serif font-bold text-3xl tracking-tight text-foreground">Landsec Capital</span>
        </Link>
        <Card className="shadow-xl border-primary/10">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
            <CardDescription className="text-center">
              Begin your institutional real estate investment journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="investor@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="plan">Select Investment Plan</Label>
                <Select value={plan} onValueChange={setPlan}>
                  <SelectTrigger id="plan">
                    <SelectValue placeholder="Choose a plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="foundation">Foundation Plan (Min £5k)</SelectItem>
                    <SelectItem value="growth">Growth Plan (Min £25k)</SelectItem>
                    <SelectItem value="premier">Premier Plan (Min £100k)</SelectItem>
                    <SelectItem value="institutional">Institutional Plan (Min £500k)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
              <div className="flex items-start space-x-2 pt-2">
                <Checkbox id="terms" checked={agreed} onCheckedChange={(c) => setAgreed(!!c)} />
                <div className="grid gap-1.5 leading-none">
                  <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground">
                    I agree to the Terms & Conditions and Investment Risk Disclaimer
                  </label>
                </div>
              </div>
              <Button type="submit" className="w-full h-11 text-lg font-medium mt-4">
                Create Account
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-border pt-6">
            <p className="text-sm text-muted-foreground">
              Already have an account? <Link href="/login" className="font-semibold text-primary hover:underline">Sign In</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}