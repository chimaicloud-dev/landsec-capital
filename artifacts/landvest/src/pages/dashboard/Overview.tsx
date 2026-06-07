import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, Award, Lock, ArrowUpRight, Plus, FileText, Activity, Clock, CheckCircle2, ArrowUpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'wouter';

const PLAN_DAILY_RATE: Record<string, number> = {
  'Foundation Plan':    8  / 100 / 365,
  'Growth Plan':        12 / 100 / 365,
  'Premier Plan':       16 / 100 / 365,
  'Prestige Plan':      16 / 100 / 365,
  'Institutional Plan': 20 / 100 / 365,
  'Heritage Plan':      20 / 100 / 365,
};

const PLAN_ANNUAL_RATE: Record<string, number> = {
  'Foundation Plan': 8, 'Growth Plan': 12, 'Premier Plan': 16,
  'Prestige Plan': 16, 'Institutional Plan': 20, 'Heritage Plan': 20,
};

export default function Overview() {
  const { user, isCapitalMatured, daysToMaturity } = useAuth();
  const today = format(new Date(), 'EEEE, MMMM do, yyyy');

  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const profit = user?.withdrawableProfit || 0;
  const capital = user?.investedAmount || 5000;
  const totalReturns = user?.totalReturns || 0;
  const matured = isCapitalMatured();
  const days = daysToMaturity();
  const maturityDate = user?.maturityDate
    ? new Date(user.maturityDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : '—';

  const dailyRate = PLAN_DAILY_RATE[user?.plan || ''] ?? PLAN_DAILY_RATE['Foundation Plan'];
  const annualRate = PLAN_ANNUAL_RATE[user?.plan || ''] ?? 8;
  const dailyProfit = capital * dailyRate;

  const lastProfitAt = user?.lastProfitAt || now;
  const elapsedMs = now - lastProfitAt;
  const nextCycleMs = 24 * 60 * 60 * 1000;
  const progressPct = Math.min(100, (elapsedMs / nextCycleMs) * 100);
  const remainingMs = Math.max(0, nextCycleMs - elapsedMs);
  const hrs = Math.floor(remainingMs / 3600000);
  const mins = Math.floor((remainingMs % 3600000) / 60000);
  const secs = Math.floor((remainingMs % 60000) / 1000);
  const nextCycleLabel = `${hrs.toString().padStart(2,'0')}:${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;

  const chartData = Array.from({ length: 12 }, (_, i) => ({
    month: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i],
    value: Math.round(capital * Math.pow(1 + annualRate / 100 / 12, i + 1)),
  }));

  const recentActivities = [
    { type: 'Credit', desc: '24h Profit Cycle', amount: `+$${dailyProfit.toFixed(2)}`, date: '24 hours ago' },
    { type: 'Credit', desc: '24h Profit Cycle', amount: `+$${dailyProfit.toFixed(2)}`, date: '2 days ago' },
    { type: 'Investment', desc: `${user?.plan} Allocation`, amount: `$${capital.toLocaleString()}`, date: 'At start' },
    { type: 'Deposit', desc: 'Initial Deposit', amount: `+$${capital.toLocaleString()}`, date: 'At start' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Good morning, {user?.name.split(' ')[0]}</h1>
          <p className="text-muted-foreground mt-1">{today}</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/documents">
            <Button variant="outline" className="hidden sm:flex"><FileText className="w-4 h-4 mr-2" /> Statements</Button>
          </Link>
          <Link href="/dashboard/deposit">
            <Button><Plus className="w-4 h-4 mr-2" /> Add Funds</Button>
          </Link>
        </div>
      </div>

      {/* 4 stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Withdrawable profit */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Card className="border-green-500/30 bg-green-500/5 shadow-sm h-full">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-green-500/15 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-green-500" />
                </div>
                <Badge className="bg-green-500/20 text-green-500 border-green-500/30 text-xs">Withdrawable</Badge>
              </div>
              <h3 className="text-3xl font-bold font-serif mb-1 text-green-500">${profit.toFixed(2)}</h3>
              <p className="text-sm text-muted-foreground">Profit Balance</p>
              <Link href="/dashboard/withdraw">
                <Button size="sm" className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white text-xs gap-1">
                  <ArrowUpCircle className="w-3.5 h-3.5" /> Withdraw Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Locked capital */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.08 }}>
          <Card className="border-border/50 shadow-sm h-full">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  {matured ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Lock className="w-5 h-5 text-muted-foreground" />}
                </div>
                {matured
                  ? <Badge className="bg-green-500/20 text-green-500 border-green-500/30 text-xs">Matured</Badge>
                  : <Badge variant="outline" className="text-xs">{days}d left</Badge>
                }
              </div>
              <h3 className="text-3xl font-bold font-serif mb-1">${capital.toLocaleString()}</h3>
              <p className="text-sm text-muted-foreground">Invested Capital</p>
              <p className="text-xs text-muted-foreground mt-2">
                {matured ? 'Capital available for redemption' : `Unlocks ${maturityDate}`}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Plan / rate */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.16 }}>
          <Card className="border-border/50 shadow-sm h-full">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-semibold text-green-600 flex items-center bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-md">
                  <ArrowUpRight className="w-3 h-3 mr-1" /> {annualRate}% p.a.
                </span>
              </div>
              <h3 className="text-xl font-bold font-serif mb-1 truncate">{user?.plan}</h3>
              <p className="text-sm text-muted-foreground">Active Plan</p>
              <p className="text-xs text-primary font-medium mt-2">+${dailyProfit.toFixed(2)}/day</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Next profit cycle countdown */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.24 }}>
          <Card className="border-border/50 shadow-sm h-full">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <Clock className="w-5 h-5 text-secondary-foreground" />
                </div>
              </div>
              <h3 className="text-2xl font-bold font-mono mb-1 tabular-nums">{nextCycleLabel}</h3>
              <p className="text-sm text-muted-foreground">Next Profit Cycle</p>
              <div className="mt-3 w-full bg-secondary rounded-full h-1.5 overflow-hidden">
                <div className="bg-primary h-1.5 rounded-full transition-all duration-1000" style={{ width: `${progressPct}%` }} />
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">{progressPct.toFixed(0)}% complete</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Total earnings summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Returns Earned', value: `$${totalReturns.toFixed(2)}`, color: 'text-green-500' },
          { label: 'Portfolio Value', value: `$${(capital + totalReturns).toFixed(2)}`, color: 'text-foreground' },
          { label: 'Maturity Date', value: maturityDate, color: 'text-foreground' },
        ].map(({ label, value, color }) => (
          <Card key={label} className="border-border/50 shadow-sm">
            <CardContent className="p-4 text-center">
              <p className={`text-xl font-bold font-serif ${color}`}>{value}</p>
              <p className="text-xs text-muted-foreground mt-1">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <Card className="col-span-1 lg:col-span-2 shadow-sm border-border/50">
          <CardHeader>
            <CardTitle className="font-serif">Projected Portfolio Growth</CardTitle>
            <CardDescription>{annualRate}% annual return — 12-month outlook</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[260px] w-full">
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
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} tickFormatter={(v) => `$${v}`} dx={-10} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                    itemStyle={{ color: 'hsl(var(--foreground))', fontWeight: 'bold' }}
                    formatter={(v: number) => [`$${v.toLocaleString()}`, 'Projected Value']}
                  />
                  <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Activity */}
        <Card className="shadow-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="font-serif text-lg">Recent Activity</CardTitle>
            </div>
            <Link href="/dashboard/transactions" className="text-xs font-medium text-primary hover:underline">View All</Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-5 mt-3">
              {recentActivities.map((a, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      a.type === 'Credit' || a.type === 'Deposit' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-secondary text-secondary-foreground'
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
