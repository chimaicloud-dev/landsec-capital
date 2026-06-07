import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Download, FileCheck, FileArchive, Shield, Eye, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Doc {
  id: number;
  name: string;
  date: string;
  size: string;
  category: string;
  icon: typeof FileText;
  pages: number;
  imageUrl?: string;
}

const mockDocuments: Doc[] = [
  { id: 1,  name: 'Q1 2026 Investment Statement',           date: 'Apr 15, 2026', size: '1.2 MB', category: 'statements',   icon: FileText,    pages: 8 },
  { id: 2,  name: 'Q4 2025 Investment Statement',           date: 'Jan 15, 2026', size: '1.1 MB', category: 'statements',   icon: FileText,    pages: 8 },
  { id: 3,  name: 'Q3 2025 Investment Statement',           date: 'Oct 15, 2025', size: '1.1 MB', category: 'statements',   icon: FileText,    pages: 8 },
  { id: 4,  name: 'Q2 2025 Investment Statement',           date: 'Jul 15, 2025', size: '1.0 MB', category: 'statements',   icon: FileText,    pages: 7 },
  { id: 5,  name: 'Q1 2025 Investment Statement',           date: 'Apr 15, 2025', size: '1.0 MB', category: 'statements',   icon: FileText,    pages: 7 },
  { id: 6,  name: 'Q4 2024 Investment Statement',           date: 'Jan 15, 2025', size: '0.9 MB', category: 'statements',   icon: FileText,    pages: 6 },
  { id: 7,  name: 'Q3 2024 Investment Statement',           date: 'Oct 15, 2024', size: '0.9 MB', category: 'statements',   icon: FileText,    pages: 6 },
  { id: 8,  name: 'Q2 2024 Investment Statement',           date: 'Jul 15, 2024', size: '0.9 MB', category: 'statements',   icon: FileText,    pages: 6 },
  { id: 9,  name: 'Q1 2024 Investment Statement',           date: 'Apr 15, 2024', size: '0.8 MB', category: 'statements',   icon: FileText,    pages: 6 },
  { id: 10, name: 'Q4 2023 Investment Statement',           date: 'Jan 15, 2024', size: '0.8 MB', category: 'statements',   icon: FileText,    pages: 5 },
  { id: 11, name: 'Q4 2022 Investment Statement',           date: 'Jan 15, 2023', size: '0.7 MB', category: 'statements',   icon: FileText,    pages: 5 },
  { id: 12, name: 'Q4 2021 Investment Statement',           date: 'Jan 15, 2022', size: '0.7 MB', category: 'statements',   icon: FileText,    pages: 5 },
  { id: 13, name: 'Q4 2020 Investment Statement',           date: 'Jan 15, 2021', size: '0.6 MB', category: 'statements',   icon: FileText,    pages: 4 },
  { id: 14, name: 'Q4 2019 Investment Statement',           date: 'Jan 15, 2020', size: '0.6 MB', category: 'statements',   icon: FileText,    pages: 4 },
  { id: 15, name: 'Q4 2018 Investment Statement',           date: 'Jan 15, 2019', size: '0.5 MB', category: 'statements',   icon: FileText,    pages: 4 },
  { id: 16, name: 'Q4 2017 Investment Statement',           date: 'Jan 15, 2018', size: '0.5 MB', category: 'statements',   icon: FileText,    pages: 4 },
  { id: 17, name: 'Q4 2016 Investment Statement',           date: 'Jan 15, 2017', size: '0.5 MB', category: 'statements',   icon: FileText,    pages: 3 },
  { id: 18, name: 'Inaugural Annual Statement 2015',        date: 'Dec 31, 2015', size: '0.4 MB', category: 'statements',   icon: FileText,    pages: 3 },
  { id: 19, name: 'Annual Tax Summary 2025',                date: 'Jan 31, 2026', size: '2.4 MB', category: 'tax',          icon: FileArchive, pages: 12 },
  { id: 20, name: 'Annual Tax Summary 2024',                date: 'Jan 31, 2025', size: '2.3 MB', category: 'tax',          icon: FileArchive, pages: 11 },
  { id: 21, name: 'Annual Tax Summary 2023',                date: 'Jan 31, 2024', size: '2.2 MB', category: 'tax',          icon: FileArchive, pages: 10 },
  { id: 22, name: 'Annual Tax Summary 2022',                date: 'Jan 31, 2023', size: '2.0 MB', category: 'tax',          icon: FileArchive, pages: 10 },
  { id: 23, name: 'Annual Tax Summary 2021',                date: 'Jan 31, 2022', size: '1.9 MB', category: 'tax',          icon: FileArchive, pages: 9  },
  { id: 24, name: 'Annual Tax Summary 2020',                date: 'Jan 31, 2021', size: '1.8 MB', category: 'tax',          icon: FileArchive, pages: 9  },
  { id: 25, name: 'Annual Tax Summary 2015–2019',           date: 'Jan 31, 2020', size: '4.5 MB', category: 'tax',          icon: FileArchive, pages: 45 },
  {
    id: 26,
    name: 'Certificate of Incorporation — Companies House',
    date: 'Feb 15, 2001',
    size: '0.8 MB',
    category: 'certificates',
    icon: FileCheck,
    pages: 1,
    imageUrl: '/certificates/certificate-of-incorporation.jpeg',
  },
  { id: 27, name: 'Original Certificate of Investment',                date: 'Oct 01, 2015', size: '0.5 MB', category: 'certificates', icon: FileCheck, pages: 1 },
  { id: 28, name: 'Certificate of Investment — Foundation Plan',       date: 'May 01, 2024', size: '0.8 MB', category: 'certificates', icon: FileCheck, pages: 2 },
  { id: 29, name: 'Certificate of Investment — Additional Deposit',    date: 'Mar 01, 2026', size: '0.8 MB', category: 'certificates', icon: FileCheck, pages: 2 },
  { id: 30, name: 'Certificate of Good Standing',                      date: 'Jun 01, 2026', size: '0.6 MB', category: 'certificates', icon: FileCheck, pages: 1 },
  { id: 31, name: 'Terms and Conditions (v2.1)',    date: 'Jan 01, 2026', size: '3.5 MB', category: 'legal', icon: Shield, pages: 18 },
  { id: 32, name: 'Privacy Policy (v2.0)',          date: 'Jan 01, 2026', size: '1.2 MB', category: 'legal', icon: Shield, pages: 8  },
  { id: 33, name: 'Investor Agreement — Original',  date: 'Oct 01, 2015', size: '2.8 MB', category: 'legal', icon: Shield, pages: 14 },
  { id: 34, name: 'Investor Agreement — Current',   date: 'Jan 01, 2024', size: '3.1 MB', category: 'legal', icon: Shield, pages: 16 },
];

function DocViewer({ doc, onClose }: { doc: Doc; onClose: () => void }) {
  const lines = Array.from({ length: Math.max(doc.pages * 6, 15) }, (_, i) => i);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-card border border-border rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
              <doc.icon className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground truncate max-w-xs">{doc.name}</p>
              <p className="text-xs text-muted-foreground">{doc.pages} page{doc.pages !== 1 ? 's' : ''} · {doc.size}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
              {doc.imageUrl ? 'CERTIFICATE' : 'PDF'}
            </Badge>
            <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-destructive/10 hover:text-destructive">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto bg-neutral-100 dark:bg-neutral-900 p-6 rounded-b-2xl">
          {doc.imageUrl ? (
            /* Real certificate image */
            <div className="flex flex-col items-center gap-4">
              <div className="w-full max-w-2xl rounded-xl overflow-hidden shadow-2xl border border-border/30">
                <img
                  src={doc.imageUrl}
                  alt={doc.name}
                  className="w-full h-auto object-contain"
                  draggable={false}
                />
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Issued by Companies House, Cardiff · Incorporated 15 February 2001
              </p>
            </div>
          ) : (
            /* Generic PDF mock */
            <div className="bg-white shadow-md mx-auto max-w-xl rounded p-10 space-y-4 min-h-[500px]">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <div>
                  <p className="text-lg font-serif font-bold text-gray-900">Landsec Capital Ltd</p>
                  <p className="text-xs text-gray-500">100 Victoria Street, London SW1E 5JL</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                  <doc.icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <h2 className="text-xl font-serif font-bold text-gray-800">{doc.name}</h2>
              <p className="text-xs text-gray-500">Date: {doc.date} · Reference: LC-{doc.id.toString().padStart(5, '0')}</p>
              <div className="space-y-2 pt-2">
                {lines.map((_, i) => (
                  <div key={i} className={`h-2.5 rounded bg-gray-200 ${i % 7 === 0 ? 'w-2/3' : i % 5 === 0 ? 'w-4/5' : 'w-full'}`} />
                ))}
              </div>
              <div className="pt-6 border-t border-gray-200 flex items-center justify-between">
                <p className="text-xs text-gray-400">Document ID: LC-{doc.id.toString().padStart(5, '0')} · {doc.pages} pages</p>
                <p className="text-xs text-gray-400">&copy; 2026 Landsec Capital</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Documents() {
  const { toast } = useToast();
  const [viewing, setViewing] = useState<Doc | null>(null);

  const handleDownload = (name: string) => {
    toast({ title: 'Download Started', description: `Downloading ${name}…` });
  };

  const DocumentList = ({ filter }: { filter: string }) => {
    const docs = filter === 'all' ? mockDocuments : mockDocuments.filter((d) => d.category === filter);

    if (docs.length === 0) {
      return (
        <div className="text-center py-12 bg-card rounded-lg border border-border/50">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">No documents found</p>
          <p className="text-sm text-muted-foreground mt-1">There are no documents in this category yet.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {docs.map((doc) => (
          <Card key={doc.id} className={`hover:border-primary/40 transition-colors border-border/50 ${doc.imageUrl ? 'ring-1 ring-primary/20' : ''}`}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 ${doc.imageUrl ? 'bg-primary/15' : 'bg-secondary'}`}>
                <doc.icon className={`w-5 h-5 ${doc.imageUrl ? 'text-primary' : 'text-primary'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm truncate">{doc.name}</p>
                  {doc.imageUrl && (
                    <Badge className="bg-primary/15 text-primary border-primary/25 text-[10px] px-1.5 py-0 flex-shrink-0">Official</Badge>
                  )}
                </div>
                <div className="flex gap-3 text-xs text-muted-foreground mt-0.5">
                  <span>{doc.date}</span>
                  <span>·</span>
                  <span>{doc.size}</span>
                  <span>·</span>
                  <span>{doc.pages}p</span>
                </div>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <Button
                  variant="ghost" size="icon"
                  className="w-8 h-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                  onClick={() => setViewing(doc)}
                  title="View"
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost" size="icon"
                  className="w-8 h-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                  onClick={() => handleDownload(doc.name)}
                  title="Download"
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {viewing && <DocViewer doc={viewing} onClose={() => setViewing(null)} />}

      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Document Library</h1>
        <p className="text-muted-foreground mt-1">Access your statements, certificates, tax documents, and legal agreements — dating back to our founding in 2001.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Statements',    count: mockDocuments.filter(d => d.category === 'statements').length,   color: 'text-blue-400'   },
          { label: 'Tax Documents', count: mockDocuments.filter(d => d.category === 'tax').length,          color: 'text-green-400'  },
          { label: 'Certificates',  count: mockDocuments.filter(d => d.category === 'certificates').length, color: 'text-purple-400' },
          { label: 'Legal',         count: mockDocuments.filter(d => d.category === 'legal').length,        color: 'text-amber-400'  },
        ].map(({ label, count, color }) => (
          <div key={label} className="bg-card border border-border/50 rounded-xl p-4 text-center">
            <p className={`text-2xl font-bold ${color}`}>{count}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6 bg-secondary/50 flex-wrap h-auto gap-1">
          <TabsTrigger value="all">All ({mockDocuments.length})</TabsTrigger>
          <TabsTrigger value="statements">Statements</TabsTrigger>
          <TabsTrigger value="tax">Tax</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="legal">Legal</TabsTrigger>
        </TabsList>

        <TabsContent value="all"          className="mt-0"><DocumentList filter="all" /></TabsContent>
        <TabsContent value="statements"   className="mt-0"><DocumentList filter="statements" /></TabsContent>
        <TabsContent value="tax"          className="mt-0"><DocumentList filter="tax" /></TabsContent>
        <TabsContent value="certificates" className="mt-0"><DocumentList filter="certificates" /></TabsContent>
        <TabsContent value="legal"        className="mt-0"><DocumentList filter="legal" /></TabsContent>
      </Tabs>
    </div>
  );
}
