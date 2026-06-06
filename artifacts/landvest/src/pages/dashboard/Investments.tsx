import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/context/AuthContext';
import { CheckCircle2, Info, TrendingUp, Calculator } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const plans = [
  {
    id: 'foundation',
    name: 'Foundation Plan',
    returnRate: 8,
    minInvestment: 5000,
    term: '12 Months',
    features: ['Core stable assets', 'Quarterly distributions', 'Accessible entry point'],
  },
  {
    id: 'growth',
    name: 'Growth Plan',
    returnRate: 12,
    minInvestment: 25000,
    term: '24 Months',
    features: ['High-yield commercial', 'Central London focus', 'Priority liquidity options'],
    popular: true,
  },
  {
    id: 'premier',
    name: 'Premier Plan',
    returnRate: 16,
    minInvestment: 100000,
    term: '36 Months',
    features: ['Landmark developments', 'Capital appreciation focus', 'Dedicated relationship manager'],
  },
  {
    id: 'institutional',
    name: 'Institutional Plan',
    returnRate: 'Custom',
    minInvestment: 500000,
    term: 'Flexible',
    features: ['Bespoke advisory services', 'Direct board access', 'Tailored risk structuring'],
  },
];

export default function Investments() {
  const { user } = useAuth();
  const { toast } = useToast();
  const currentPlan = plans.find(p => p.name === user?.plan) || plans[0];
  
  const [calcAmount, setCalcAmount] = useState<number>(25000);
  const [calcPlan, setCalcPlan] = useState<string>('growth');

  const selectedCalcPlan = plans.find(p => p.id === calcPlan);
  const calcRate = typeof selectedCalcPlan?.returnRate === 'number' ? selectedCalcPlan.returnRate : 0;

  const handleUpgrade = (planName: string) => {
    toast({
      title: 'Upgrade Initiated',
      description: `Your request to upgrade to ${planName} is being processed. An advisor will contact you shortly.`
    });
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">My Investments</h1>
        <p className="text-muted-foreground mt-1">Manage your active plans and explore upgrade opportunities.</p>
      </div>

      {/* Active Plan Hero */}
      <Card className="bg-gradient-to-r from-primary to-blue-700 text-primary-foreground border-none shadow-lg">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <Badge className="bg-white/20 hover:bg-white/30 text-white border-none mb-4">Active Plan</Badge>
              <h2 className="text-4xl font-serif font-bold mb-2">{currentPlan.name}</h2>
              <p className="text-primary-foreground/80 max-w-xl">
                You are currently generating returns through our {currentPlan.name.toLowerCase()} portfolio.
                This plan focuses on long-term stability with quarterly dividend distributions.
              </p>
            </div>
            <div className="bg-black/20 p-6 rounded-xl min-w-[250px]">
              <div className="text-sm text-primary-foreground/80 mb-1">Target Annual Return</div>
              <div className="text-4xl font-bold font-serif mb-4">{currentPlan.returnRate}%</div>
              <div className="flex justify-between items-center text-sm border-t border-white/20 pt-3">
                <span className="text-primary-foreground/80">Term Length</span>
                <span className="font-semibold">{currentPlan.term}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Plans */}
      <div>
        <h3 className="text-xl font-serif font-bold mb-4">Available Pathways</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => {
            const isActive = plan.name === currentPlan.name;
            return (
              <Card key={plan.id} className={`flex flex-col h-full ${isActive ? 'border-primary shadow-md' : 'hover:border-primary/30'}`}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="font-serif text-lg">{plan.name}</CardTitle>
                    {plan.popular && <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">Popular</Badge>}
                  </div>
                  <div className="mt-4 pb-4 border-b border-border">
                    <span className="text-3xl font-bold text-primary">{plan.returnRate}{typeof plan.returnRate === 'number' ? '%' : ''}</span>
                    <span className="text-xs font-medium text-muted-foreground ml-2">Annual Return</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Min. Investment</span>
                      <span className="font-semibold">{typeof plan.minInvestment === 'number' ? `£${plan.minInvestment.toLocaleString()}` : plan.minInvestment}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Term Length</span>
                      <span className="font-semibold">{plan.term}</span>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant={isActive ? "outline" : "default"} 
                    className="w-full"
                    disabled={isActive}
                    onClick={() => handleUpgrade(plan.name)}
                  >
                    {isActive ? 'Current Plan' : 'Upgrade Plan'}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Investment Calculator */}
      <Card className="border-border/50">
        <CardHeader className="border-b border-border/50 bg-secondary/30">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-primary" />
            <CardTitle className="font-serif">Investment Projection Calculator</CardTitle>
          </div>
          <CardDescription>Estimate your potential returns over time.</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="amount">Initial Investment Amount (£)</Label>
                <Input 
                  id="amount" 
                  type="number" 
                  value={calcAmount} 
                  onChange={(e) => setCalcAmount(Number(e.target.value))}
                  min={5000}
                />
              </div>
              <div className="space-y-2">
                <Label>Investment Plan</Label>
                <Select value={calcPlan} onValueChange={setCalcPlan}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Plan" />
                  </SelectTrigger>
                  <SelectContent>
                    {plans.filter(p => typeof p.returnRate === 'number').map(p => (
                      <SelectItem key={p.id} value={p.id}>{p.name} ({p.returnRate}%)</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-start gap-2 text-xs text-muted-foreground bg-secondary/50 p-3 rounded-md">
                <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <p>Projections are based on target returns and assume all dividends are reinvested annually.</p>
              </div>
            </div>
            
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[1, 2, 3].map((year) => {
                const projectedValue = calcAmount * Math.pow(1 + calcRate / 100, year);
                const totalProfit = projectedValue - calcAmount;
                return (
                  <Card key={year} className="bg-card shadow-sm border-border/50 text-center flex flex-col justify-center py-6">
                    <h4 className="text-sm font-semibold text-muted-foreground mb-4">Year {year} Projection</h4>
                    <div className="text-2xl font-serif font-bold text-foreground mb-2">
                      £{projectedValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-sm font-medium text-green-600">
                      +£{totalProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })} Profit
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}