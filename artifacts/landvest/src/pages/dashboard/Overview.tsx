import React from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, Award, Calendar, ArrowUpRight, Plus, FileText, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'wouter';

const chartData = [
  { month: 'Jan', value: 5000 },
  { month: 'Feb', value: 5040 },
  { month: 'Mar', value: 5100 },
  { month: 'Apr', value: 5180 },
  { month: 'May', value: 5240 },
  { month: 'Jun', value: 5310 },
  { month: 'Jul', value: 5400 },
  { month: 'Aug', value: 5480 },
  { month: 'Sep', value: 5550 },
  { month: 'Oct', value: 5620 },
  { month: 'Nov', value: 5700 },
  { month: 'Dec', value: 5800 },
];

const recentActivities = [
  { id: 1, type: 'Credit', desc: 'Q4 Dividend Payment', amount: '+$120.00', date: '2 days ago', status: 'Completed' },
  { id: 2, type: 'Investment', desc: 'Foundation Plan Allocation', amount: '$5,000.00', date: '1 month ago', status: 'Completed' },
  { id: 3, type: 'Fee', desc: 'Account Setup Fee', amount: '-$25.00', date: '1 month ago', status: 'Completed' },
  { id: 4, type: 'Deposit', desc: 'Bank Transfer (Barclays)', amount: '+$5,025.00', date: '1 month ago', status: 'Completed' },
];

export default function Overview() {
  const { user } = useAuth();
  const today = format(new Date(), 'EEEE, MMMM do, yyyy');
  const investedAmount = user?.investedAmount || 5000;
  const currentValue = investedAmount * 1.08;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Good morning, {user?.name.split(' ')[0]}</h1>
          <p className="text-muted-foreground mt-1">{today}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="hidden sm:flex"><FileText className="w-4 h-4 mr-2" /> Statements</Button>
          <Button><Plus className="w-4 h-4 mr-2" /> Add Funds</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/50 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-primary" />
              </div>
              <Badge variant="outline" className="text-xs bg-background">Total Invested</Badge>
            </div>
            <h3 className="text-3xl font-bold font-serif mb-1">${investedAmount.toLocaleString()}</h3>
            <p className="text-sm text-muted-foreground">Initial principal</p>
          </CardContent>
        </Card>
        
        <Card className="border-border/50 shadow-sm bg-gradient-to-br from-background to-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs font-semibold text-green-600 flex items-center bg-green-100 px-2 py-1 rounded-md">
                <ArrowUpRight className="w-3 h-3 mr-1" /> 8.0%
              </span>
            </div>
            <h3 className="text-3xl font-bold font-serif mb-1">${currentValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
            <p className="text-sm text-primary font-medium">Current portfolio value</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <Award className="w-5 h-5 text-secondary-foreground" />
              </div>
            </div>
            <h3 className="text-xl font-bold font-serif mb-1 truncate">{user?.plan}</h3>
            <p className="text-sm text-muted-foreground mt-2">Active Strategy</p>
            <Link href="/dashboard/investments" className="text-xs font-medium text-primary hover:underline mt-2 inline-block">Upgrade Plan &rarr;</Link>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <Calendar className="w-5 h-5 text-secondary-foreground" />
              </div>
            </div>
            <h3 className="text-xl font-bold font-serif mb-1">Oct 15, 2026</h3>
            <p className="text-sm text-muted-foreground mt-2">Next Scheduled Payout</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="col-span-1 lg:col-span-2 shadow-sm border-border/50">
          <CardHeader>
            <CardTitle className="font-serif">Portfolio Performance</CardTitle>
            <CardDescription>12-month trailing value</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} tickFormatter={(val) => `$${val}`} dx={-10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                    itemStyle={{ color: 'hsl(var(--foreground))', fontWeight: 'bold' }}
                    formatter={(value: number) => [`$${value}`, 'Value']}
                  />
                  <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="font-serif text-lg">Recent Activity</CardTitle>
            </div>
            <Link href="/dashboard/transactions" className="text-xs font-medium text-primary hover:underline">View All</Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 mt-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === 'Credit' || activity.type === 'Deposit' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      <Activity className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{activity.desc}</p>
                      <p className="text-xs text-muted-foreground">{activity.date}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-bold ${
                    activity.type === 'Credit' || activity.type === 'Deposit' ? 'text-green-600' : 'text-foreground'
                  }`}>
                    {activity.amount}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Needed for Badge usage in Overview without importing specifically if it's missing in some files.
// But better to import it:
import { Badge } from '@/components/ui/badge';