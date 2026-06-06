import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Clock, Send, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const faqs = [
  {
    q: "How are returns calculated?",
    a: "Returns are calculated quarterly based on the net rental income and capital appreciation of the underlying property portfolio. We employ independent RICS-certified valuers to assess portfolio value."
  },
  {
    q: "When will I receive my returns?",
    a: "Distributions are made quarterly, on the 15th of January, April, July, and October. Funds are deposited directly to your linked bank account or reinvested depending on your chosen preference."
  },
  {
    q: "Can I withdraw my investment early?",
    a: "Early withdrawal is subject to a 2% exit fee and a 30-day notice period to ensure portfolio liquidity management. Institutional plans may have customized lock-up periods."
  },
  {
    q: "Is my investment protected?",
    a: "Your investments are backed by physical prime UK property assets. Furthermore, Landsec Capital is fully FCA-regulated, ensuring institutional-grade governance and compliance."
  },
  {
    q: "How do I upgrade my plan?",
    a: "Visit the 'My Investments' section in your dashboard, select your desired plan, and click 'Upgrade'. Your dedicated relationship manager will contact you to finalize the details."
  },
  {
    q: "What documents do I need for KYC?",
    a: "To comply with UK regulations, we require a valid government-issued ID (Passport or Driving License) and a proof of address (utility bill or bank statement dated within the last 3 months)."
  }
];

export default function Support() {
  const { toast } = useToast();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSendTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) {
      toast({ title: 'Error', description: 'Please fill in all fields', variant: 'destructive' });
      return;
    }
    toast({ title: 'Message Sent', description: 'Our support team will respond within 24 hours.' });
    setSubject('');
    setMessage('');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Support & Help Center</h1>
        <p className="text-muted-foreground mt-1">Get assistance with your account, investments, or general inquiries.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col: Contact Info & Form */}
        <div className="space-y-6">
          <Card className="bg-primary text-primary-foreground shadow-lg border-none">
            <CardHeader>
              <CardTitle className="font-serif text-2xl text-white">Contact Us</CardTitle>
              <CardDescription className="text-primary-foreground/80">Direct access to our client services team.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-2 rounded-full"><Mail className="w-5 h-5 text-white" /></div>
                <div>
                  <h4 className="font-semibold text-white">Email</h4>
                  <p className="text-sm text-primary-foreground/80">support@landseccapital.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-2 rounded-full"><Phone className="w-5 h-5 text-white" /></div>
                <div>
                  <h4 className="font-semibold text-white">Phone</h4>
                  <p className="text-sm text-primary-foreground/80">+44 20 7946 0958</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-2 rounded-full"><MapPin className="w-5 h-5 text-white" /></div>
                <div>
                  <h4 className="font-semibold text-white">Office Address</h4>
                  <p className="text-sm text-primary-foreground/80">100 Victoria Street<br />London SW1E 5JL<br />United Kingdom</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-2 rounded-full"><Clock className="w-5 h-5 text-white" /></div>
                <div>
                  <h4 className="font-semibold text-white">Office Hours</h4>
                  <p className="text-sm text-primary-foreground/80">Mon-Fri 9:00 AM - 6:00 PM GMT</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="font-serif">Send a Message</CardTitle>
              <CardDescription>Submit a ticket and we'll get back to you.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSendTicket} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input 
                    id="subject" 
                    placeholder="e.g. Dividend Inquiry" 
                    value={subject} 
                    onChange={e => setSubject(e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="How can we help you?" 
                    className="min-h-[120px]"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full mt-2"><Send className="w-4 h-4 mr-2" /> Submit Ticket</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Col: FAQs */}
        <div className="lg:col-span-2">
          <Card className="border-border/50 shadow-sm h-full">
            <CardHeader>
              <CardTitle className="font-serif text-2xl">Frequently Asked Questions</CardTitle>
              <CardDescription>Quick answers to common questions about Landsec Capital.</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger className="text-left font-medium hover:text-primary transition-colors">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}