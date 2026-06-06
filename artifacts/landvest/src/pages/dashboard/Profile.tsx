import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Mail, Phone, MapPin, Key } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function Profile() {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [phone, setPhone] = useState('+44 7700 900077');
  const [address, setAddress] = useState('100 Victoria Street, London SW1E 5JL, United Kingdom');
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: 'Profile Updated', description: 'Your personal details have been saved successfully.' });
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPass || !newPass || !confirmPass) {
      toast({ title: 'Error', description: 'Please fill in all password fields', variant: 'destructive' });
      return;
    }
    if (newPass !== confirmPass) {
      toast({ title: 'Error', description: 'New passwords do not match', variant: 'destructive' });
      return;
    }
    toast({ title: 'Password Updated', description: 'Your password has been changed successfully.' });
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Profile & Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account details and preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Summary */}
        <div className="space-y-6">
          <Card className="border-border/50 shadow-sm overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-primary/80 to-blue-800"></div>
            <CardContent className="px-6 pb-6 pt-0 relative">
              <Avatar className="w-24 h-24 border-4 border-card -mt-12 mb-4 bg-muted text-3xl">
                <AvatarFallback className="bg-secondary text-secondary-foreground font-serif">{user?.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold font-serif">{user?.name}</h2>
              <p className="text-muted-foreground text-sm mb-4">{user?.email}</p>
              
              <div className="space-y-4 pt-4 border-t border-border/50">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">KYC Status</span>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none"><ShieldCheck className="w-3 h-3 mr-1" /> Verified</Badge>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Member Since</span>
                  <span className="font-semibold">{new Date(user?.joinDate || Date.now()).toLocaleDateString('en-GB', { year: 'numeric', month: 'short' })}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Forms */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="font-serif">Personal Details</CardTitle>
              <CardDescription>Update your contact information and address.</CardDescription>
            </CardHeader>
            <CardContent>
              <form id="profile-form" onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue={user?.name} disabled className="bg-muted" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" defaultValue={user?.email} disabled className="bg-muted" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="phone" value={phone} onChange={e => setPhone(e.target.value)} className="pl-9" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Residential Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="address" value={address} onChange={e => setAddress(e.target.value)} className="pl-9" />
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="border-t border-border/50 pt-6">
              <Button type="submit" form="profile-form">Save Changes</Button>
            </CardFooter>
          </Card>

          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="font-serif">Preferences</CardTitle>
              <CardDescription>Manage your notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="notif1" defaultChecked />
                <label htmlFor="notif1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Email me when a new document is available
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="notif2" defaultChecked />
                <label htmlFor="notif2" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Email me when a dividend is paid
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="notif3" />
                <label htmlFor="notif3" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Receive monthly portfolio performance reports
                </label>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm border-destructive/20">
            <CardHeader>
              <CardTitle className="font-serif text-destructive flex items-center gap-2">
                <Key className="w-5 h-5" /> Security
              </CardTitle>
              <CardDescription>Update your password to keep your account secure.</CardDescription>
            </CardHeader>
            <CardContent>
              <form id="password-form" onSubmit={handleUpdatePassword} className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <Label htmlFor="currentPass">Current Password</Label>
                  <Input id="currentPass" type="password" value={currentPass} onChange={e => setCurrentPass(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPass">New Password</Label>
                  <Input id="newPass" type="password" value={newPass} onChange={e => setNewPass(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPass">Confirm New Password</Label>
                  <Input id="confirmPass" type="password" value={confirmPass} onChange={e => setConfirmPass(e.target.value)} />
                </div>
              </form>
            </CardContent>
            <CardFooter className="border-t border-border/50 pt-6">
              <Button type="submit" form="password-form" variant="destructive">Update Password</Button>
            </CardFooter>
          </Card>

        </div>
      </div>
    </div>
  );
}