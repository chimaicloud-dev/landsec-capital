import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Download, FileCheck, FileArchive, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const mockDocuments = [
  { id: 1, name: 'Q1 2026 Investment Statement', date: 'Apr 15, 2026', size: '1.2 MB', category: 'statements', icon: FileText },
  { id: 2, name: 'Q4 2025 Investment Statement', date: 'Jan 15, 2026', size: '1.1 MB', category: 'statements', icon: FileText },
  { id: 3, name: 'Annual Tax Summary 2025', date: 'Jan 31, 2026', size: '2.4 MB', category: 'tax', icon: FileArchive },
  { id: 4, name: 'Annual Tax Summary 2024', date: 'Jan 31, 2025', size: '2.3 MB', category: 'tax', icon: FileArchive },
  { id: 5, name: 'Certificate of Investment - Foundation', date: 'May 01, 2024', size: '0.8 MB', category: 'certificates', icon: FileCheck },
  { id: 6, name: 'Certificate of Investment - Additional', date: 'Mar 01, 2026', size: '0.8 MB', category: 'certificates', icon: FileCheck },
  { id: 7, name: 'Terms and Conditions (v2.1)', date: 'Jan 01, 2026', size: '3.5 MB', category: 'legal', icon: Shield },
  { id: 8, name: 'Investment Risk Disclosure', date: 'May 01, 2024', size: '1.5 MB', category: 'legal', icon: Shield },
];

export default function Documents() {
  const { toast } = useToast();

  const handleDownload = (filename: string) => {
    toast({
      title: 'Download Started',
      description: `Downloading ${filename}...`
    });
  };

  const DocumentList = ({ filter }: { filter: string }) => {
    const docs = filter === 'all' ? mockDocuments : mockDocuments.filter(d => d.category === filter);
    
    if (docs.length === 0) {
      return (
        <div className="text-center py-12 bg-card rounded-lg border border-border/50">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium text-foreground">No documents found</h3>
          <p className="text-sm text-muted-foreground mt-1">There are no documents in this category yet.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {docs.map((doc) => (
          <Card key={doc.id} className="hover:border-primary/40 transition-colors shadow-sm border-border/50">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                  <doc.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="overflow-hidden">
                  <h4 className="font-semibold text-sm truncate">{doc.name}</h4>
                  <div className="flex gap-3 text-xs text-muted-foreground mt-1">
                    <span>{doc.date}</span>
                    <span>•</span>
                    <span>{doc.size}</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10 hover:text-primary" onClick={() => handleDownload(doc.name)}>
                <Download className="w-5 h-5" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Document Library</h1>
        <p className="text-muted-foreground mt-1">Access your statements, tax documents, and legal agreements.</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6 bg-secondary/50">
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="statements">Statements</TabsTrigger>
          <TabsTrigger value="tax">Tax</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="legal">Legal</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0"><DocumentList filter="all" /></TabsContent>
        <TabsContent value="statements" className="mt-0"><DocumentList filter="statements" /></TabsContent>
        <TabsContent value="tax" className="mt-0"><DocumentList filter="tax" /></TabsContent>
        <TabsContent value="certificates" className="mt-0"><DocumentList filter="certificates" /></TabsContent>
        <TabsContent value="legal" className="mt-0"><DocumentList filter="legal" /></TabsContent>
      </Tabs>
    </div>
  );
}