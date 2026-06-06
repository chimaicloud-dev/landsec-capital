import { motion } from 'framer-motion';
import { Landmark, ShieldCheck, TrendingUp, History, Quote, Linkedin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const team = [
  {
    name: 'James Whitmore',
    title: 'Chief Executive Officer',
    bio: '20+ years in UK commercial property, formerly at Goldman Sachs Real Estate.',
    initials: 'JW'
  },
  {
    name: 'Sarah Pemberton',
    title: 'Chief Investment Officer',
    bio: 'Former head of REIT strategy at Aviva Investors.',
    initials: 'SP'
  },
  {
    name: 'Michael Chen',
    title: 'Chief Financial Officer',
    bio: 'Chartered accountant, ex-KPMG real estate advisory.',
    initials: 'MC'
  },
  {
    name: 'Alexandra Reid',
    title: 'Chief Operating Officer',
    bio: 'Operations specialist, formerly at British Land.',
    initials: 'AR'
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <Landmark className="w-8 h-8 text-primary" />
              <span className="font-serif font-bold text-2xl tracking-tight">Landsec Capital</span>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-8 font-medium text-sm">
            <Link href="/about"><span className="hover:text-primary transition-colors cursor-pointer">About Us</span></Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="hidden sm:inline-flex" data-testid="link-login">Log In</Button>
            </Link>
            <Link href="/register">
              <Button data-testid="link-register">Invest Now</Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-gradient-to-b from-blue-900 to-background text-white overflow-hidden">
        <div className="container relative z-20 mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight mb-6">
              About Landsec Capital
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-light">
              Democratizing access to institutional-grade UK real estate investment.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="font-serif text-4xl font-bold">Our Story</h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
            <p className="text-lg text-foreground/80 leading-relaxed text-left">
              Landsec Capital was founded with a singular vision: to democratize access to institutional-grade UK real estate investment. For decades, the most lucrative and stable property portfolios in London and major regional hubs were exclusively available to pension funds, sovereign wealth, and ultra-high-net-worth individuals.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed text-left">
              We believed it was time to change the paradigm. By leveraging modern investment structuring and deep market expertise, we have opened the doors to these premier assets. Now, individual investors can participate in the growth and stability of prime UK real estate alongside the institutions. 
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed text-left font-medium">
              Headquarters: 100 Victoria Street, London SW1E 5JL
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-secondary/50">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl font-bold text-center mb-16">Leadership Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <Card key={i} className="bg-background border-none shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 rounded-full bg-primary/10 text-primary flex items-center justify-center text-3xl font-bold mx-auto mb-6">
                    {member.initials}
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-sm font-medium text-primary mb-4">{member.title}</p>
                  <p className="text-sm text-muted-foreground mb-6 h-16">{member.bio}</p>
                  <Linkedin className="w-5 h-5 text-muted-foreground mx-auto hover:text-primary transition-colors cursor-pointer" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl font-bold text-center mb-16">Why Choose Us</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <ShieldCheck className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">FCA Regulated</h3>
              <p className="text-muted-foreground">Operating under the highest standards of UK financial conduct.</p>
            </div>
            <div className="text-center">
              <Landmark className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">$10B+ Portfolio</h3>
              <p className="text-muted-foreground">Managing prime assets across the UK.</p>
            </div>
            <div className="text-center">
              <History className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">80+ Years Heritage</h3>
              <p className="text-muted-foreground">A legacy of architectural and investment excellence.</p>
            </div>
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Quarterly Returns</h3>
              <p className="text-muted-foreground">Consistent income distributions to our investors.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-blue-950 text-white text-center">
        <div className="container mx-auto px-6">
          <Quote className="w-12 h-12 text-white/20 mx-auto mb-8" />
          <h2 className="font-serif text-3xl md:text-5xl font-bold max-w-4xl mx-auto leading-tight">
            "To build long-term wealth for our investors by owning and operating the most resilient real estate in the UK."
          </h2>
        </div>
      </section>
    </div>
  );
}
