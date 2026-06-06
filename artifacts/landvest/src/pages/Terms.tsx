import { useState, useEffect, useRef } from 'react';
import { Landmark, FileText, Shield, AlertTriangle, Cookie, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const sections = [
  {
    id: 'terms',
    label: 'Terms of Service',
    icon: FileText,
    content: [
      {
        heading: '1. Account Registration',
        body: 'By registering an account with Landsec Capital, you represent that you are at least 18 years of age and capable of entering into a legally binding agreement. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate.',
      },
      {
        heading: '2. Investment Terms',
        body: 'Investments made through the platform are subject to the specific terms outlined in each respective investment plan. Minimum investment amounts apply. Once capital is deployed, it may be subject to lock-up periods during which withdrawals are restricted.',
      },
      {
        heading: '3. Returns and Distributions',
        body: 'Projected returns are targets and are not guaranteed. Distributions are typically calculated and paid quarterly, subject to portfolio performance and board approval. We reserve the right to reinvest distributions if so elected by the user.',
      },
      {
        heading: '4. Withdrawal Policy',
        body: 'Withdrawal requests must be submitted in accordance with the liquidity terms of your specific investment plan. Early withdrawals may be subject to penalties or may be denied if sufficient liquidity is unavailable.',
      },
      {
        heading: '5. Termination',
        body: 'We reserve the right to suspend or terminate your account at any time for violation of these Terms, suspicion of fraudulent activity, or at the request of regulatory authorities.',
      },
      {
        heading: '6. Governing Law',
        body: 'These terms are governed by and construed in accordance with the laws of England and Wales. Any disputes arising out of or relating to these terms shall be subject to the exclusive jurisdiction of the courts of London, England.',
      },
    ],
  },
  {
    id: 'privacy',
    label: 'Privacy Policy',
    icon: Shield,
    content: [
      {
        heading: '1. Data Collection',
        body: 'We collect personal information necessary to provide our services, including name, email, address, financial information, and identity verification documents required for KYC/AML compliance.',
      },
      {
        heading: '2. Data Use',
        body: 'Your data is used to manage your account, process investments, distribute returns, and communicate important updates regarding your portfolio and our services.',
      },
      {
        heading: '3. Data Storage',
        body: 'Information is stored on secure, encrypted servers. We implement industry-standard security measures to protect against unauthorized access, alteration, or destruction of your personal data.',
      },
      {
        heading: '4. Third Party Sharing',
        body: 'We do not sell your data. We may share necessary information with trusted third-party service providers (such as payment processors and identity verification services) solely for the purpose of facilitating our services.',
      },
      {
        heading: '5. Your Rights (GDPR)',
        body: 'Under GDPR, you have the right to access, correct, delete, or restrict the processing of your personal data. You may also request data portability. To exercise these rights, please contact our Data Protection Officer.',
      },
      {
        heading: '6. Contact DPO',
        body: 'For privacy-related inquiries, please email dpo@landseccapital.com.',
      },
    ],
  },
  {
    id: 'risk',
    label: 'Risk Disclosure',
    icon: AlertTriangle,
    content: [
      {
        heading: '1. Capital at Risk',
        body: 'Investing in real estate involves risk. The value of your investment can go down as well as up, and you may get back less than you invested. Your capital is at risk.',
      },
      {
        heading: '2. Past Performance',
        body: 'Past performance is not a reliable indicator of future results. Projected yields are targets based on historical data and market analysis, but they are not guaranteed.',
      },
      {
        heading: '3. Illiquidity Risk',
        body: 'Real estate is inherently an illiquid asset class. While we endeavor to provide liquidity according to plan terms, there may be periods where withdrawals are delayed due to market conditions.',
      },
      {
        heading: '4. Property Market Risk',
        body: 'Returns are dependent on the UK commercial and residential property markets. Factors such as economic downturns, changes in interest rates, and shifts in demand can negatively impact asset valuations and rental income.',
      },
      {
        heading: '5. Regulatory Risk',
        body: 'Changes in UK law, tax regulations, or FCA policies could affect the operation of Landsec Capital or the net returns delivered to investors.',
      },
    ],
  },
  {
    id: 'cookies',
    label: 'Cookie Policy',
    icon: Cookie,
    content: [
      {
        heading: '1. What Cookies We Use',
        body: 'We use essential cookies to enable basic site functionality, such as user authentication and secure sessions. We also use analytical cookies to understand how users interact with our platform, helping us improve the experience.',
      },
      {
        heading: '2. How to Manage Them',
        body: 'You can manage or disable cookies through your browser settings. Please note that disabling essential cookies may impact your ability to log in or use certain features of the Landsec Capital platform.',
      },
    ],
  },
];

export default function Terms() {
  const [activeSection, setActiveSection] = useState('terms');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );

    sections.forEach(({ id }) => {
      const el = sectionRefs.current[id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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

      <section className="pt-32 pb-12 border-b border-border bg-secondary/20">
        <div className="container mx-auto px-6">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-3">Legal Documents</h1>
          <p className="text-muted-foreground">Last updated: June 2026 &mdash; Landsec Capital Ltd, 100 Victoria Street, London SW1E 5JL</p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        <div className="flex gap-12">

          {/* Sticky Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-28 space-y-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">Documents</p>
              {sections.map(({ id, label, icon: Icon }) => {
                const isActive = activeSection === id;
                return (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all text-left ${
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

          {/* Mobile section nav */}
          <div className="lg:hidden w-full mb-8 flex gap-2 overflow-x-auto pb-2">
            {sections.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
                  activeSection === id
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </div>

          {/* Content */}
          <main className="flex-1 max-w-3xl space-y-20">
            {sections.map(({ id, label, icon: Icon, content }) => (
              <section
                key={id}
                id={id}
                ref={(el) => { sectionRefs.current[id] = el; }}
                className="scroll-mt-32"
              >
                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-border">
                  <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="font-serif text-3xl font-bold">{label}</h2>
                </div>

                <div className="space-y-8">
                  {content.map((item, i) => (
                    <div key={i} className="pl-6 border-l-2 border-border hover:border-primary/50 transition-colors">
                      <h3 className="text-base font-semibold text-foreground mb-2">{item.heading}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.body}</p>
                    </div>
                  ))}
                </div>
              </section>
            ))}

            <div className="py-12 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">
                Questions about these documents? Contact us at{' '}
                <a href="mailto:legal@landseccapital.com" className="text-primary hover:underline">legal@landseccapital.com</a>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
