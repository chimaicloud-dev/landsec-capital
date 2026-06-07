import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, Landmark, TrendingUp, ShieldCheck, ArrowRight, CheckCircle2, ChevronRight, Scale, Users, Globe2, Briefcase, PlayCircle, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';

// Images generated
import londonSkyline from '../assets/images/london-skyline.png';
import officeInterior from '../assets/images/office-interior.png';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function Landing() {
  useEffect(() => {
    (window as any)._smartsupp = (window as any)._smartsupp || {};
    (window as any)._smartsupp.key = 'c038fd511a40336176c94e97d366564036af3d95';
    (window as any).smartsupp = (window as any).smartsupp || function (...args: any[]) {
      ((window as any).smartsupp._ = (window as any).smartsupp._ || []).push(args);
    };

    const script = document.createElement('script');
    script.id = 'smartsupp-script';
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.async = true;
    script.src = 'https://www.smartsuppchat.com/loader.js?';
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById('smartsupp-script');
      if (el) el.remove();
      const widget = document.getElementById('chat-application');
      if (widget) widget.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Landmark className="w-8 h-8 text-primary" />
            <span className="font-serif font-bold text-2xl tracking-tight">Landsec Capital</span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-medium text-sm">
            <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
            <a href="#portfolio" className="hover:text-primary transition-colors">Portfolio</a>
            <a href="#plans" className="hover:text-primary transition-colors">Investment Plans</a>
            <a href="#impact" className="hover:text-primary transition-colors">Our Impact</a>
          </div>
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

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/20 z-10" />
          <img src={londonSkyline} alt="London Skyline" className="w-full h-full object-cover object-center" />
        </div>
        
        <div className="container relative z-20 mx-auto px-6">
          <div className="max-w-3xl">
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
              <Badge className="mb-6 bg-primary/20 text-primary-foreground hover:bg-primary/30 border-primary/30 py-1.5 px-4 text-sm font-semibold tracking-wide uppercase">
                Premier UK REIT
              </Badge>
              <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight mb-6">
                Invest in the Foundation of <span className="text-primary">Tomorrow's London</span>
              </h1>
              <p className="text-xl md:text-2xl text-foreground/80 mb-10 leading-relaxed font-light">
                Institutional-grade real estate investments for visionaries. Join a FTSE-caliber heritage trust managing $10B+ in prime urban assets.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <Button size="lg" className="h-14 px-8 text-lg font-semibold w-full sm:w-auto shadow-lg shadow-primary/20">
                    Explore Plans <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-semibold w-full sm:w-auto bg-background/50 backdrop-blur-sm border-border">
                  Request Prospectus
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-foreground text-background py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { label: "Assets Under Management", value: "$10B+" },
              { label: "Portfolio Occupancy", value: "97%" },
              { label: "Years of Heritage", value: "80+" },
              { label: "Active Developments", value: "50+" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-start border-l border-primary/30 pl-6">
                <span className="font-serif text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</span>
                <span className="text-sm md:text-base font-medium text-background/70 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explainer Video Section */}
      <section className="py-24 bg-gradient-to-b from-background to-secondary/30 relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">See How Landsec Capital Works</h2>
            <p className="text-lg text-foreground/80">
              Watch our short overview to understand how we generate returns for our investors through prime UK real estate.
            </p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full relative rounded-2xl overflow-hidden shadow-2xl border border-primary/20 bg-black"
          >
            <video 
              src="/explainer.mp4" 
              controls 
              className="w-full aspect-video object-cover"
              poster={officeInterior}
            >
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>
      </section>

      {/* Video Guide — How It Works */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 py-1 px-4 text-xs font-semibold tracking-widest uppercase">Step-by-Step Guide</Badge>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">How to Get Started</h2>
            <p className="text-foreground/70 text-lg">Follow the guide below — from registration to your first return.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Steps */}
            <div className="space-y-4">
              {[
                {
                  step: '01',
                  title: 'Create Your Account',
                  desc: 'Register in under 2 minutes. Enter your name, email, choose an investment plan, and set a secure password.',
                  icon: Users,
                },
                {
                  step: '02',
                  title: 'Verify Your Identity (KYC)',
                  desc: 'Complete our quick identity check — submit a government-issued ID and proof of address. Verification is typically instant.',
                  icon: ShieldCheck,
                },
                {
                  step: '03',
                  title: 'Add Funds & Invest',
                  desc: 'Deposit via cryptocurrency (BTC, ETH, USDT, USDC) or bank wire. Funds are credited automatically once your transaction confirms.',
                  icon: Briefcase,
                },
                {
                  step: '04',
                  title: 'Withdraw Your Returns',
                  desc: 'Request a withdrawal from your dashboard at any time. Returns are paid quarterly to your nominated account or crypto wallet.',
                  icon: TrendingUp,
                },
              ].map(({ step, title, desc, icon: Icon }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-5 p-5 rounded-xl border border-border/50 bg-card hover:border-primary/30 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-primary tracking-widest">STEP {step}</span>
                    </div>
                    <h3 className="font-serif font-bold text-lg mb-1">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}

              <div className="pt-2">
                <Link href="/register">
                  <Button size="lg" className="w-full sm:w-auto h-12 px-8 font-semibold">
                    Get Started Now <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Video */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="sticky top-28 rounded-2xl overflow-hidden border border-primary/20 shadow-2xl bg-black"
            >
              <div className="bg-secondary/30 px-5 py-3 flex items-center gap-2 border-b border-border/50">
                <PlayCircle className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold">Full Investor Guide</span>
              </div>
              <video
                src="/explainer.mp4"
                controls
                className="w-full aspect-video object-cover"
                poster={officeInterior}
              >
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About / Heritage */}
      <section id="about" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">A Legacy of <br/>Architectural Excellence</h2>
              <div className="w-20 h-1.5 bg-primary mb-8 rounded-full" />
              <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
                Founded over 80 years ago, Landsec Capital stands as a pillar of the UK real estate market. Headquartered in London, we possess a FTSE-caliber heritage built on foresight, stability, and unyielding standards.
              </p>
              <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
                As a regulated UK REIT, we offer tax-efficient, income-distributing investment vehicles backed by physical, prime assets. From Piccadilly-area cornerstones to destination retail developments rivaling Bluewater, our portfolio defines the modern urban landscape.
              </p>
              <ul className="space-y-4">
                {[
                  "Regulated & Tax-Efficient UK REIT",
                  "Consistent Income Distributions",
                  "Deep London Market Expertise"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-medium">
                    <CheckCircle2 className="text-primary w-6 h-6 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div 
              className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img src={officeInterior} alt="Premium Office Interior" className="w-full h-full object-cover" />
              <div className="absolute inset-0 border border-primary/20 rounded-2xl pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Focus / Approach */}
      <section id="portfolio" className="py-24 bg-foreground text-background">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-white">Strategic Asset Allocation</h2>
            <p className="text-lg text-background/70">Our acquisition and development strategy targets four core pillars of the UK urban economy.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Briefcase, title: "Prime Office", desc: "Grade-A corporate spaces in Zone 1 London and major regional hubs." },
              { icon: Globe2, title: "Destination Retail", desc: "High-footfall flagship retail assets including Bluewater-class centers." },
              { icon: Building2, title: "Mixed-Use Urban", desc: "Transformative regeneration projects creating self-sustaining neighborhoods." },
              { icon: Users, title: "Residential Pipeline", desc: "High-yield build-to-rent developments addressing the UK housing deficit." }
            ].map((pillar, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-card/5 border border-white/10 p-8 rounded-xl hover:bg-card/10 transition-colors"
              >
                <pillar.icon className="w-10 h-10 text-primary mb-6" />
                <h3 className="font-serif text-xl font-bold text-white mb-3">{pillar.title}</h3>
                <p className="text-sm text-background/60 leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Plans */}
      <section id="plans" className="py-24 bg-secondary border-y border-border">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Investment Pathways</h2>
            <p className="text-lg text-foreground/70">Structured opportunities for discerning investors. Choose the plan that aligns with your capital objectives and timeline.</p>
          </div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* Plan 1 */}
            <motion.div variants={fadeIn}>
              <Card className="h-full flex flex-col hover:border-primary/50 transition-colors">
                <CardHeader>
                  <h3 className="font-serif text-2xl font-bold">Foundation Plan</h3>
                  <div className="mt-4 pb-4 border-b border-border">
                    <span className="text-4xl font-bold text-primary">8%</span>
                    <span className="text-sm font-medium text-muted-foreground ml-2">Annual Return</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Min. Investment</span>
                      <span className="font-semibold">$5,000</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Term Length</span>
                      <span className="font-semibold">12 Months</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Focus Area</span>
                      <span className="font-semibold text-right">Residential & Mixed-use</span>
                    </div>
                  </div>
                  <ul className="space-y-3 text-sm text-foreground/80">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5" /> Core stable assets</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5" /> Quarterly distributions</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5" /> Accessible entry point</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/register" className="w-full">
                    <Button className="w-full" variant="outline">Select Plan</Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Plan 2 */}
            <motion.div variants={fadeIn}>
              <Card className="h-full flex flex-col border-primary shadow-xl shadow-primary/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                  Most Popular
                </div>
                <CardHeader className="bg-primary/5">
                  <h3 className="font-serif text-2xl font-bold">Growth Plan</h3>
                  <div className="mt-4 pb-4 border-b border-primary/20">
                    <span className="text-4xl font-bold text-primary">12%</span>
                    <span className="text-sm font-medium text-muted-foreground ml-2">Annual Return</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow bg-primary/5 pt-6">
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Min. Investment</span>
                      <span className="font-semibold">$25,000</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Term Length</span>
                      <span className="font-semibold">24 Months</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Focus Area</span>
                      <span className="font-semibold text-right">Premium Office & Retail</span>
                    </div>
                  </div>
                  <ul className="space-y-3 text-sm text-foreground/80">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5" /> High-yield commercial</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5" /> Central London focus</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5" /> Priority liquidity options</li>
                  </ul>
                </CardContent>
                <CardFooter className="bg-primary/5 pb-6">
                  <Link href="/register" className="w-full">
                    <Button className="w-full">Select Plan</Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Plan 3 */}
            <motion.div variants={fadeIn}>
              <Card className="h-full flex flex-col hover:border-primary/50 transition-colors">
                <CardHeader>
                  <h3 className="font-serif text-2xl font-bold">Premier Plan</h3>
                  <div className="mt-4 pb-4 border-b border-border">
                    <span className="text-4xl font-bold text-primary">16%</span>
                    <span className="text-sm font-medium text-muted-foreground ml-2">Annual Return</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Min. Investment</span>
                      <span className="font-semibold">$100,000</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Term Length</span>
                      <span className="font-semibold">36 Months</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Focus Area</span>
                      <span className="font-semibold text-right">Iconic Urban Regeneration</span>
                    </div>
                  </div>
                  <ul className="space-y-3 text-sm text-foreground/80">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5" /> Landmark developments</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5" /> Capital appreciation focus</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5" /> Dedicated relationship manager</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/register" className="w-full">
                    <Button className="w-full" variant="outline">Select Plan</Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Plan 4 */}
            <motion.div variants={fadeIn}>
              <Card className="h-full flex flex-col bg-foreground text-background border-none">
                <CardHeader>
                  <h3 className="font-serif text-2xl font-bold text-white">Institutional Plan</h3>
                  <div className="mt-4 pb-4 border-b border-background/20">
                    <span className="text-4xl font-bold text-primary">Custom</span>
                    <span className="text-sm font-medium text-background/60 ml-2">Return Profile</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="space-y-4 mb-6 text-background/90">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-background/60">Min. Investment</span>
                      <span className="font-semibold text-white">$500,000+</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-background/60">Term Length</span>
                      <span className="font-semibold text-white">Flexible</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-background/60">Focus Area</span>
                      <span className="font-semibold text-white text-right">Portfolio Co-investment</span>
                    </div>
                  </div>
                  <ul className="space-y-3 text-sm text-background/80">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5" /> Bespoke advisory services</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5" /> Direct board access</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5" /> Tailored risk structuring</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/register" className="w-full">
                    <Button className="w-full bg-white text-foreground hover:bg-white/90">Contact Advisors</Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Security & Trust Section */}
      <section id="impact" className="py-24 bg-background border-t border-border">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              className="order-2 lg:order-1 relative rounded-2xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                <img src={londonSkyline} alt="London Architecture" className="w-full h-full object-cover saturate-0 opacity-80 mix-blend-multiply" />
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
              </div>
            </motion.div>
            <motion.div className="order-1 lg:order-2" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="w-8 h-8 text-primary" />
                <h2 className="font-serif text-3xl md:text-4xl font-bold">Uncompromising Governance</h2>
              </div>
              <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
                Institutional-grade investing requires institutional-grade oversight. Landsec Capital operates under the strict regulatory framework of a UK Real Estate Investment Trust (REIT), ensuring maximum transparency and tax efficiency for our partners.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Scale className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <h4 className="font-bold mb-1">FCA Regulated Structure</h4>
                    <p className="text-sm text-foreground/70">Adhering to the highest standards of financial conduct and reporting.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <TrendingUp className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <h4 className="font-bold mb-1">Mandatory Income Distribution</h4>
                    <p className="text-sm text-foreground/70">By law, 90% of property rental income is distributed to shareholders annually.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/5 mix-blend-multiply" />
        <div className="container relative z-10 mx-auto px-6 max-w-4xl">
          <h2 className="font-serif text-4xl md:text-6xl font-bold mb-8 text-white">Ready to build your legacy?</h2>
          <p className="text-xl md:text-2xl mb-10 text-white/90 font-medium">
            Join the ranks of discerning investors participating in the future of the UK's most valuable real estate.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register">
              <Button size="lg" variant="default" className="bg-black text-white hover:bg-black/80 h-14 px-8 text-lg w-full sm:w-auto">
                Open an Account
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black h-14 px-8 text-lg w-full sm:w-auto">
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background/60 py-16 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <Landmark className="w-8 h-8 text-primary" />
                <span className="font-serif font-bold text-2xl text-white tracking-tight">Landsec Capital</span>
              </div>
              <p className="max-w-md text-sm leading-relaxed mb-4">
                A premier UK-based real estate investment trust (REIT) owning, developing, and managing major urban property assets across London and key UK cities. Regulated, transparent, and built for generational wealth.
              </p>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>100 Victoria Street, London SW1E 5JL, United Kingdom</span>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Investments</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#plans" className="hover:text-primary transition-colors">Foundation Plan</a></li>
                <li><a href="#plans" className="hover:text-primary transition-colors">Growth Plan</a></li>
                <li><a href="#plans" className="hover:text-primary transition-colors">Premier Plan</a></li>
                <li><a href="#plans" className="hover:text-primary transition-colors">Institutional Plan</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#portfolio" className="hover:text-primary transition-colors">Our Portfolio</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">News & Insights</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Support</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-xs">
            <p>&copy; 2026 Landsec Capital. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}