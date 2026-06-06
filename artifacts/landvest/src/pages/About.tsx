import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Landmark, ShieldCheck, TrendingUp, History, Quote, Linkedin, Users, MapPin, Award, ChevronRight, Building } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const team = [
  {
    name: 'James Whitmore',
    title: 'Chief Executive Officer',
    bio: '20+ years in UK commercial property, formerly at Goldman Sachs Real Estate. Led over $3B in portfolio acquisitions across Central London.',
    initials: 'JW',
  },
  {
    name: 'Sarah Pemberton',
    title: 'Chief Investment Officer',
    bio: 'Former head of REIT strategy at Aviva Investors. Specialist in mixed-use urban regeneration and ESG-aligned asset management.',
    initials: 'SP',
  },
  {
    name: 'Michael Chen',
    title: 'Chief Financial Officer',
    bio: 'Chartered accountant, ex-KPMG real estate advisory. Oversees investor reporting, fund structuring, and FCA compliance.',
    initials: 'MC',
  },
  {
    name: 'Alexandra Reid',
    title: 'Chief Operating Officer',
    bio: 'Operations specialist, formerly at British Land. Manages platform delivery, investor relations, and day-to-day portfolio operations.',
    initials: 'AR',
  },
];

const milestones = [
  { year: '1944', event: 'Founded in post-war London with a focus on rebuilding prime urban real estate.' },
  { year: '1980', event: 'Expanded into commercial office and retail, anchoring the Canary Wharf regeneration.' },
  { year: '2005', event: 'Reached $1B in assets under management, becoming a FTSE-recognised investment vehicle.' },
  { year: '2018', event: 'Launched the investor platform, opening institutional-grade access to individual investors.' },
  { year: '2024', event: 'Surpassed $10B AUM with 97% portfolio occupancy across 50+ active developments.' },
];

const sections = [
  { id: 'story', label: 'Our Story', icon: Building },
  { id: 'mission', label: 'Mission', icon: Award },
  { id: 'milestones', label: 'Milestones', icon: History },
  { id: 'leadership', label: 'Leadership', icon: Users },
  { id: 'why-us', label: 'Why Choose Us', icon: ShieldCheck },
  { id: 'location', label: 'Location', icon: MapPin },
];

export default function About() {
  const [activeSection, setActiveSection] = useState('story');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-25% 0px -60% 0px' }
    );
    sections.forEach(({ id }) => {
      const el = sectionRefs.current[id];
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <Landmark className="w-8 h-8 text-primary" />
              <span className="font-serif font-bold text-2xl tracking-tight">Landsec Capital</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="hidden sm:inline-flex">Log In</Button>
            </Link>
            <Link href="/register">
              <Button>Invest Now</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-gradient-to-b from-blue-950 to-background text-white overflow-hidden">
        <div className="container relative z-20 mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight mb-6">About Landsec Capital</h1>
            <p className="text-xl md:text-2xl text-white/75 max-w-3xl mx-auto font-light">
              Democratizing access to institutional-grade UK real estate investment since 1944.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mobile section nav */}
      <div className="lg:hidden sticky top-20 z-40 bg-background/95 border-b border-border px-4 py-3 flex gap-2 overflow-x-auto">
        {sections.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-all ${
              activeSection === id
                ? 'bg-primary text-primary-foreground border-primary'
                : 'border-border text-muted-foreground'
            }`}
          >
            <Icon className="w-3 h-3" />
            {label}
          </button>
        ))}
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="flex gap-14">

          {/* Sticky Sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-28 space-y-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">Sections</p>
              {sections.map(({ id, label, icon: Icon }) => {
                const isActive = activeSection === id;
                return (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
                      isActive
                        ? 'bg-primary/15 text-primary border border-primary/20'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="flex-1">{label}</span>
                    {isActive && <ChevronRight className="w-3 h-3" />}
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Content */}
          <main className="flex-1 space-y-24 max-w-3xl">

            {/* Our Story */}
            <section id="story" ref={(el) => { sectionRefs.current['story'] = el; }} className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-border">
                <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
                  <Building className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-serif text-3xl font-bold">Our Story</h2>
              </div>
              <div className="space-y-5 text-muted-foreground leading-relaxed text-[15px]">
                <p>
                  Landsec Capital was founded with a singular vision: to democratize access to institutional-grade UK real estate investment. For decades, the most lucrative and stable property portfolios in London and major regional hubs were exclusively available to pension funds, sovereign wealth vehicles, and ultra-high-net-worth individuals.
                </p>
                <p>
                  We believed it was time to change the paradigm. By leveraging modern investment structuring and deep market expertise, we have opened the doors to these premier assets — allowing individual investors to participate in the growth and stability of prime UK real estate alongside the institutions.
                </p>
                <p>
                  Today, Landsec Capital manages over $10B in assets across residential, commercial, mixed-use, and urban regeneration projects throughout the United Kingdom.
                </p>
              </div>
            </section>

            {/* Mission */}
            <section id="mission" ref={(el) => { sectionRefs.current['mission'] = el; }} className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-border">
                <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-serif text-3xl font-bold">Our Mission</h2>
              </div>
              <div className="bg-blue-950/60 border border-primary/20 rounded-2xl p-8">
                <Quote className="w-10 h-10 text-primary/40 mb-4" />
                <p className="font-serif text-2xl font-semibold leading-relaxed text-foreground">
                  "To build long-term wealth for our investors by owning and operating the most resilient real estate in the United Kingdom."
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                {[
                  { title: 'Transparency', desc: 'Every investor sees their exact allocation, returns, and portfolio performance in real time.' },
                  { title: 'Stability', desc: 'We focus on prime, income-generating assets with strong long-term fundamentals.' },
                  { title: 'Access', desc: 'Institutional-quality investments with minimums accessible to serious individual investors.' },
                  { title: 'Integrity', desc: 'FCA-regulated, UK-law governed, and operated to the highest standards of financial conduct.' },
                ].map((v, i) => (
                  <div key={i} className="pl-5 border-l-2 border-primary/40">
                    <h4 className="font-semibold text-foreground mb-1">{v.title}</h4>
                    <p className="text-sm text-muted-foreground">{v.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Milestones */}
            <section id="milestones" ref={(el) => { sectionRefs.current['milestones'] = el; }} className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-border">
                <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
                  <History className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-serif text-3xl font-bold">Milestones</h2>
              </div>
              <div className="relative pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-border">
                {milestones.map((m, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-8 top-1 w-6 h-6 rounded-full bg-primary/15 border-2 border-primary flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-xs font-bold text-primary tracking-wider uppercase">{m.year}</span>
                    <p className="text-muted-foreground mt-1 text-sm leading-relaxed">{m.event}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Leadership */}
            <section id="leadership" ref={(el) => { sectionRefs.current['leadership'] = el; }} className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-border">
                <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-serif text-3xl font-bold">Leadership Team</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                {team.map((member, i) => (
                  <Card key={i} className="border-border/50 shadow-sm">
                    <CardContent className="p-6 flex gap-5">
                      <div className="w-14 h-14 rounded-full bg-primary/15 text-primary flex items-center justify-center text-lg font-bold flex-shrink-0">
                        {member.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-lg font-bold">{member.name}</h3>
                        <p className="text-xs font-semibold text-primary mb-2">{member.title}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{member.bio}</p>
                        <Linkedin className="w-4 h-4 text-muted-foreground mt-3 hover:text-primary transition-colors cursor-pointer" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Why Choose Us */}
            <section id="why-us" ref={(el) => { sectionRefs.current['why-us'] = el; }} className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-border">
                <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-serif text-3xl font-bold">Why Choose Us</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { icon: ShieldCheck, title: 'FCA Regulated', desc: 'Operating under the highest standards of UK financial conduct, with full investor protection measures in place.' },
                  { icon: Landmark, title: '$10B+ Portfolio', desc: 'Proven at scale — managing prime assets across London, Manchester, Birmingham, and Edinburgh.' },
                  { icon: History, title: '80+ Years Heritage', desc: 'A legacy of architectural and investment excellence built on every market cycle since 1944.' },
                  { icon: TrendingUp, title: 'Quarterly Returns', desc: 'Consistent income distributions with transparent reporting on every distribution cycle.' },
                ].map(({ icon: Icon, title, desc }, i) => (
                  <div key={i} className="flex gap-4 p-5 rounded-xl border border-border/50 bg-secondary/20">
                    <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Location */}
            <section id="location" ref={(el) => { sectionRefs.current['location'] = el; }} className="scroll-mt-32 pb-16">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-border">
                <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-serif text-3xl font-bold">Our Location</h2>
              </div>
              <div className="rounded-2xl border border-border/50 overflow-hidden">
                <div className="bg-secondary/30 p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0 mt-1">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Headquarters</h3>
                      <p className="text-muted-foreground">100 Victoria Street</p>
                      <p className="text-muted-foreground">London SW1E 5JL</p>
                      <p className="text-muted-foreground">United Kingdom</p>
                    </div>
                  </div>
                </div>
                <div className="border-t border-border/50 p-6 flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">Investor Relations</p>
                    <a href="mailto:investors@landseccapital.com" className="text-primary text-sm hover:underline">investors@landseccapital.com</a>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">General Enquiries</p>
                    <a href="mailto:hello@landseccapital.com" className="text-primary text-sm hover:underline">hello@landseccapital.com</a>
                  </div>
                  <div>
                    <Link href="/register">
                      <Button size="sm">Open an Account</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
}
