import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Download, Search, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const mockTransactions = [
  { id: 'TRX-9821', date: '2026-10-15', desc: 'Q3 Dividend Payment', type: 'Credit', amount: 120.50, status: 'Pending' },
  { id: 'TRX-9754', date: '2026-09-01', desc: 'Bank Transfer (Barclays)', type: 'Credit', amount: 2000.00, status: 'Completed' },
  { id: 'TRX-9632', date: '2026-07-15', desc: 'Q2 Dividend Payment', type: 'Credit', amount: 118.20, status: 'Completed' },
  { id: 'TRX-9510', date: '2026-06-30', desc: 'Plan Upgrade Fee', type: 'Debit', amount: 50.00, status: 'Completed' },
  { id: 'TRX-9488', date: '2026-04-15', desc: 'Q1 Dividend Payment', type: 'Credit', amount: 115.00, status: 'Completed' },
  { id: 'TRX-9345', date: '2026-03-01', desc: 'Additional Investment', type: 'Credit', amount: 5000.00, status: 'Completed' },
  { id: 'TRX-9211', date: '2026-01-15', desc: 'Q4 Dividend Payment', type: 'Credit', amount: 110.00, status: 'Completed' },
  { id: 'TRX-9105', date: '2025-10-15', desc: 'Q3 Dividend Payment', type: 'Credit', amount: 105.00, status: 'Completed' },
  { id: 'TRX-9002', date: '2025-07-15', desc: 'Q2 Dividend Payment', type: 'Credit', amount: 100.00, status: 'Completed' },
  { id: 'TRX-8854', date: '2025-04-15', desc: 'Q1 Dividend Payment', type: 'Credit', amount: 95.00, status: 'Completed' },
  { id: 'TRX-8722', date: '2025-01-15', desc: 'Q4 Dividend Payment', type: 'Credit', amount: 90.00, status: 'Completed' },
  { id: 'TRX-8610', date: '2024-10-15', desc: 'Q3 Dividend Payment', type: 'Credit', amount: 85.00, status: 'Completed' },
  { id: 'TRX-8505', date: '2024-07-15', desc: 'Q2 Dividend Payment', type: 'Credit', amount: 80.00, status: 'Completed' },
  { id: 'TRX-8401', date: '2024-05-01', desc: 'Account Setup Fee', type: 'Debit', amount: 25.00, status: 'Completed' },
  { id: 'TRX-8399', date: '2024-05-01', desc: 'Initial Investment', type: 'Credit', amount: 5000.00, status: 'Completed' },
];

export default function Transactions() {
  const [filter, setFilter] = useState<'All' | 'Credit' | 'Debit'>('All');
  const [search, setSearch] = useState('');
  const { toast } = useToast();

  const filteredTransactions = mockTransactions.filter(t => {
    const matchesFilter = filter === 'All' || t.type === filter;
    const matchesSearch = t.desc.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleExport = () => {
    toast({
      title: 'Export Started',
      description: 'Statement downloading as PDF...'
    });
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Transaction History</h1>
          <p className="text-muted-foreground mt-1">View and download your investment activity and dividend payments.</p>
        </div>
        <Button onClick={handleExport} variant="outline" className="bg-white"><Download className="w-4 h-4 mr-2" /> Export Statement</Button>
      </div>

      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex gap-2">
              {(['All', 'Credit', 'Debit'] as const).map(f => (
                <Button 
                  key={f} 
                  variant={filter === f ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setFilter(f)}
                  className={filter === f ? '' : 'bg-background'}
                >
                  {f}
                </Button>
              ))}
            </div>
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search transactions..." 
                className="pl-9 bg-background" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border/50 overflow-hidden">
            <Table>
              <TableHeader className="bg-secondary/50">
                <TableRow>
                  <TableHead className="w-[120px]">Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((trx) => (
                    <TableRow key={trx.id}>
                      <TableCell className="font-medium text-muted-foreground">{trx.date}</TableCell>
                      <TableCell className="font-semibold">{trx.desc}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{trx.id}</TableCell>
                      <TableCell className={`text-right font-bold ${trx.type === 'Credit' ? 'text-green-600' : 'text-foreground'}`}>
                        {trx.type === 'Credit' ? '+' : '-'}£{trx.amount.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline" className={
                          trx.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' : 
                          'bg-amber-50 text-amber-700 border-amber-200'
                        }>
                          {trx.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                      No transactions found matching your criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}