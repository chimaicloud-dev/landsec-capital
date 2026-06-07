import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, Award, ArrowUpRight, Plus, FileText, Activity, ArrowUpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'wouter';

const PLAN_ANNUAL_RATE: Record<string, number> = {
  'Foundation Plan': 8, 'Growth Plan': 12, 'Premier Plan': 16,
  'Prestige Plan': 16, 'Institutional Plan': 20, 'Heritage Plan': 20,
};

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12)  return 'Good morning';
  if (hour >= 12 && hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function Overview() {
  const { user, isCapitalMatured, daysToMaturity } = useAuth();

  const [greeting, setGreeting] = useState(getGreeting());
  const [today, setToday] = useState(format(new Date(), 'EEEE, MMMM do, yyyy'));

  useEffect(() => {
    const tick = setInterval(() => {
      setGreeting(getGreeting());
      setToday(format(new Date(), 'EEEE, MMMM do, yyyy'));
    }, 60 * 1000);
    return () => clearInterval(tick);
  }, []);

  const profit       = user?.withdrawableProfit || 0;
  const capital      = user?.investedAmount || 5000;
  const totalReturns = user?.totalReturns || 0;
  const annualRate   = PLAN_ANNUAL_RATE[user?.plan || ''] ?? 8;
  const portfolioValue = capital + totalReturns;

  const chartData = Array.from({ length: 12 }, (_, i) => ({
    month: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i],
    value: Math.round(capital * Math.pow(1 + annualRate / 100 / 12, i + 1)),
  }));

  const dailyProfit = capital * (annualRate / 100 / 365);

  const recentActivities = [
    { type: 'Credit',     desc: '24h Profit Cycle',             amount: `+$${dailyProfit.toFixed(2)}`, date: '24 hours ago' },
    { type: 'Credit',     desc: '24h Profit Cycle',             amount: `+$${dailyProfit.toFixed(2)}`, date: '2 days ago'   },
    { type: 'Investment', desc: `${user?.plan} Allocation`,     amount: `$${capital.toLocaleString()}`, date: 'At start'    },
    { type: 'Deposit',    desc: 'Initial Deposit',              amount: `+$${capital.toLocaleString()}`, date: 'At start'   },
  ];

  return (
    <div className="space-y-8 max-w-3xl mx-auto">

      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">
            {greeting}, {user?.name.split(' ')[0]}
          </h1>
          <p className="text-muted-foreground mt-1">{today}</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/deposit">
            <Button className="gap-2"><Plus className="w-4 h-4" /> Add Funds</Button>
          </Link>
          <Link href="/dashboard/documents">
            <Button variant="outline" className="hidden sm:flex gap-2"><FileText className="w-4 h-4" /> Statements</Button>
          </Link>
        </div>
      </div>

      {/* Stacked stat cards — matches screenshot layout */}
      <div className="flex flex-col gap-4">

        {/* Card 1 — Total Invested */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <Card className="border-border/50 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-primary" />
                </div>
                <Badge variant="outline" className="text-xs bg-background">Total Invested</Badge>
              </div>
              <h3 className="text-4xl font-bold font-serif mb-1">${capital.toLocaleString()}</h3>
              <p className="text-sm text-muted-foreground">Initial principal</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Card 2 — Portfolio Value */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.07 }}>
          <Card className="border-border/50 shadow-sm bg-gradient-to-br from-background to-primary/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-semibold text-green-600 flex items-center bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-md">
                  <ArrowUpRight className="w-3 h-3 mr-1" /> {annualRate}.0%
                </span>
              </div>
              <h3 className="text-4xl font-bold font-serif mb-1 text-primary">
                ${portfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h3>
              <p className="text-sm text-primary font-medium">Current portfolio value</p>
              {profit > 0 && (
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Withdrawable profit</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-green-500">${profit.toFixed(2)}</span>
                    <Link href="/dashboard/withdraw">
                      <Button size="sm" variant="ghost" className="h-6 px-2 text-xs text-green-500 hover:text-green-400 gap-1">
                        <ArrowUpCircle className="w-3 h-3" /> Withdraw
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Card 3 — Active Plan */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.14 }}>
          <Card className="border-border/50 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <Award className="w-5 h-5 text-secondary-foreground" />
                </div>
              </div>
              <h3 className="text-2xl font-bold font-serif mb-1">{user?.plan}</h3>
              <p className="text-sm text-muted-foreground mt-1">Active Strategy</p>
              <Link href="/dashboard/investments" className="text-xs font-medium text-primary hover:underline mt-3 inline-block">
                Upgrade Plan &rarr;
              </Link>
            </CardContent>
          </Card>
        </motion.div>

      </div>

      {/* Chart + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="col-span-1 lg:col-span-2 shadow-sm border-border/50">
          <CardHeader>
            <CardTitle className="font-serif">Projected Portfolio Growth</CardTitle>
            <CardDescription>{annualRate}% annual return — 12-month outlook</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} tickFormatter={(v) => `$${v}`} dx={-10} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                    itemStyle={{ color: 'hsl(var(--foreground))', fontWeight: 'bold' }}
                    formatter={(v: number) => [`$${v.toLocaleString()}`, 'Projected Value']}
                  />
                  <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2.5} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-serif text-lg">Recent Activity</CardTitle>
            <Link href="/dashboard/transactions" className="text-xs font-medium text-primary hover:underline">View All</Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-5 mt-3">
              {recentActivities.map((a, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                      a.type === 'Credit' || a.type === 'Deposit'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                        : 'bg-secondary text-secondary-foreground'
                    }`}>
                      <Activity className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{a.desc}</p>
                      <p className="text-xs text-muted-foreground">{a.date}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-bold ${
                    a.type === 'Credit' || a.type === 'Deposit' ? 'text-green-500' : 'text-foreground'
                  }`}>{a.amount}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
