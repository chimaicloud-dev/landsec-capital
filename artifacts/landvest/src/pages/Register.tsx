import { useState } from 'react';
import { useLocation, Link } from 'wouter';
import { Landmark, PlayCircle, ChevronDown, ChevronUp, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

const COUNTRIES = [
  { code: 'GB', name: 'United Kingdom',     dial: '+44'  },
  { code: 'US', name: 'United States',      dial: '+1'   },
  { code: 'AE', name: 'United Arab Emirates', dial: '+971' },
  { code: 'AU', name: 'Australia',          dial: '+61'  },
  { code: 'CA', name: 'Canada',             dial: '+1'   },
  { code: 'CH', name: 'Switzerland',        dial: '+41'  },
  { code: 'CN', name: 'China',              dial: '+86'  },
  { code: 'DE', name: 'Germany',            dial: '+49'  },
  { code: 'FR', name: 'France',             dial: '+33'  },
  { code: 'HK', name: 'Hong Kong',          dial: '+852' },
  { code: 'IN', name: 'India',              dial: '+91'  },
  { code: 'IE', name: 'Ireland',            dial: '+353' },
  { code: 'IT', name: 'Italy',              dial: '+39'  },
  { code: 'JP', name: 'Japan',              dial: '+81'  },
  { code: 'KE', name: 'Kenya',              dial: '+254' },
  { code: 'NG', name: 'Nigeria',            dial: '+234' },
  { code: 'NL', name: 'Netherlands',        dial: '+31'  },
  { code: 'NZ', name: 'New Zealand',        dial: '+64'  },
  { code: 'QA', name: 'Qatar',              dial: '+974' },
  { code: 'SA', name: 'Saudi Arabia',       dial: '+966' },
  { code: 'SG', name: 'Singapore',          dial: '+65'  },
  { code: 'ZA', name: 'South Africa',       dial: '+27'  },
  { code: 'ES', name: 'Spain',              dial: '+34'  },
  { code: 'SE', name: 'Sweden',             dial: '+46'  },
  { code: 'GH', name: 'Ghana',              dial: '+233' },
  { code: 'OTHER', name: 'Other',           dial: ''     },
];

export default function Register() {
  const [name, setName]                     = useState('');
  const [email, setEmail]                   = useState('');
  const [country, setCountry]               = useState('');
  const [dialCode, setDialCode]             = useState('');
  const [phone, setPhone]                   = useState('');
  const [password, setPassword]             = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed]                 = useState(false);
  const [showVideo, setShowVideo]           = useState(false);

  const { register } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleCountryChange = (code: string) => {
    setCountry(code);
    const found = COUNTRIES.find(c => c.code === code);
    setDialCode(found?.dial || '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !country || !phone || !password || !confirmPassword) {
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

  const selectedCountry = COUNTRIES.find(c => c.code === country);

  return (
    <div className="min-h-screen bg-secondary/50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <Landmark className="w-10 h-10 text-primary" />
          <span className="font-serif font-bold text-3xl tracking-tight text-foreground">Landsec Capital</span>
        </Link>

        {/* Video Guide Banner */}
        <div className="mb-4 rounded-xl border border-primary/20 bg-primary/5 overflow-hidden">
          <button
            type="button"
            onClick={() => setShowVideo(!showVideo)}
            className="w-full flex items-center justify-between px-5 py-4 hover:bg-primary/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                <PlayCircle className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground">New to investing? Watch our quick guide</p>
                <p className="text-xs text-muted-foreground">Learn how Landsec Capital works in under 3 minutes</p>
              </div>
            </div>
            {showVideo ? <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />}
          </button>
          <AnimatePresence>
            {showVideo && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5">
                  <video src="/explainer.mp4" controls className="w-full rounded-lg border border-border shadow-sm" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Card className="shadow-xl border-primary/10">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
            <CardDescription className="text-center">
              Begin your institutional real estate investment journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Country */}
              <div className="space-y-2">
                <Label htmlFor="country">Country of Residence</Label>
                <Select value={country} onValueChange={handleCountryChange}>
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent className="max-h-64">
                    {COUNTRIES.map(c => (
                      <SelectItem key={c.code} value={c.code}>
                        {c.name}{c.dial ? ` (${c.dial})` : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex gap-2">
                  <div className="flex items-center min-w-[90px] px-3 rounded-md border border-input bg-background text-sm font-medium text-muted-foreground select-none">
                    <Phone className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                    <span className="tabular-nums">{dialCode || '—'}</span>
                  </div>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="7911 123456"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1"
                  />
                </div>
                {selectedCountry && selectedCountry.code !== 'OTHER' && (
                  <p className="text-xs text-muted-foreground">
                    Enter your number without the country code — we'll add <strong>{dialCode}</strong> automatically.
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-xs text-destructive">Passwords do not match</p>
                )}
              </div>

              {/* Terms */}
              <div className="flex items-start space-x-2 pt-2">
                <Checkbox
                  id="terms"
                  checked={agreed}
                  onCheckedChange={(c) => setAgreed(!!c)}
                />
                <div className="grid gap-1.5 leading-none">
                  <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground">
                    I agree to the{' '}
                    <Link href="/terms" className="text-primary hover:underline font-semibold">Terms & Conditions</Link>
                    {' '}and Privacy Policy
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
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-primary hover:underline">Sign In</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
