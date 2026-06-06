import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Landmark } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function Terms() {
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
              <Button variant="ghost" className="hidden sm:inline-flex" data-testid="link-login">Log In</Button>
            </Link>
            <Link href="/register">
              <Button data-testid="link-register">Invest Now</Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Terms of Service & Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: June 2026</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6 max-w-5xl">
          <Tabs defaultValue="terms" className="w-full">
            <TabsList className="w-full justify-start overflow-x-auto bg-transparent border-b rounded-none p-0 h-auto space-x-6">
              <TabsTrigger value="terms" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 py-3">Terms of Service</TabsTrigger>
              <TabsTrigger value="privacy" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 py-3">Privacy Policy</TabsTrigger>
              <TabsTrigger value="risk" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 py-3">Risk Disclosure</TabsTrigger>
              <TabsTrigger value="cookies" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 py-3">Cookie Policy</TabsTrigger>
            </TabsList>
            
            <div className="mt-8 prose prose-slate max-w-none dark:prose-invert">
              <TabsContent value="terms" className="space-y-6">
                <h2 className="text-2xl font-serif font-bold">Terms of Service</h2>
                <div>
                  <h3 className="text-lg font-bold">1. Account Registration</h3>
                  <p>By registering an account with Landsec Capital, you represent that you are at least 18 years of age and capable of entering into a legally binding agreement. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold">2. Investment Terms</h3>
                  <p>Investments made through the platform are subject to the specific terms outlined in each respective investment plan. Minimum investment amounts apply. Once capital is deployed, it may be subject to lock-up periods during which withdrawals are restricted.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold">3. Returns and Distributions</h3>
                  <p>Projected returns are targets and are not guaranteed. Distributions are typically calculated and paid quarterly, subject to portfolio performance and board approval. We reserve the right to reinvest distributions if so elected by the user.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold">4. Withdrawal Policy</h3>
                  <p>Withdrawal requests must be submitted in accordance with the liquidity terms of your specific investment plan. Early withdrawals may be subject to penalties or may be denied if sufficient liquidity is unavailable.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold">5. Termination</h3>
                  <p>We reserve the right to suspend or terminate your account at any time for violation of these Terms, suspicion of fraudulent activity, or at the request of regulatory authorities.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold">6. Governing Law</h3>
                  <p>These terms are governed by and construed in accordance with the laws of England and Wales. Any disputes arising out of or relating to these terms shall be subject to the exclusive jurisdiction of the courts of London, England.</p>
                </div>
              </TabsContent>

              <TabsContent value="privacy" className="space-y-6">
                <h2 className="text-2xl font-serif font-bold">Privacy Policy</h2>
                <div>
                  <h3 className="text-lg font-bold">1. Data Collection</h3>
                  <p>We collect personal information necessary to provide our services, including name, email, address, financial information, and identity verification documents required for KYC/AML compliance.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold">2. Data Use</h3>
                  <p>Your data is used to manage your account, process investments, distribute returns, and communicate important updates regarding your portfolio and our services.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold">3. Data Storage</h3>
                  <p>Information is stored on secure, encrypted servers. We implement industry-standard security measures to protect against unauthorized access, alteration, or destruction of your personal data.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold">4. Third Party Sharing</h3>
                  <p>We do not sell your data. We may share necessary information with trusted third-party service providers (such as payment processors and identity verification services) solely for the purpose of facilitating our services.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold">5. Your Rights (GDPR)</h3>
                  <p>Under GDPR, you have the right to access, correct, delete, or restrict the processing of your personal data. You may also request data portability. To exercise these rights, please contact our Data Protection Officer.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold">6. Contact DPO</h3>
                  <p>For privacy-related inquiries, please email dpo@landseccapital.com.</p>
                </div>
              </TabsContent>

              <TabsContent value="risk" className="space-y-6">
                <h2 className="text-2xl font-serif font-bold">Risk Disclosure</h2>
                <div>
                  <h3 className="text-lg font-bold">1. Capital at Risk</h3>
                  <p>Investing in real estate involves risk. The value of your investment can go down as well as up, and you may get back less than you invested. Your capital is at risk.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold">2. Past Performance</h3>
                  <p>Past performance is not a reliable indicator of future results. Projected yields are targets based on historical data and market analysis, but they are not guaranteed.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold">3. Illiquidity Risk</h3>
                  <p>Real estate is inherently an illiquid asset class. While we endeavor to provide liquidity according to plan terms, there may be periods where withdrawals are delayed due to market conditions.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold">4. Property Market Risk</h3>
                  <p>Returns are dependent on the UK commercial and residential property markets. Factors such as economic downturns, changes in interest rates, and shifts in demand can negatively impact asset valuations and rental income.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold">5. Regulatory Risk</h3>
                  <p>Changes in UK law, tax regulations, or FCA policies could affect the operation of Landsec Capital or the net returns delivered to investors.</p>
                </div>
              </TabsContent>

              <TabsContent value="cookies" className="space-y-6">
                <h2 className="text-2xl font-serif font-bold">Cookie Policy</h2>
                <div>
                  <h3 className="text-lg font-bold">1. What Cookies We Use</h3>
                  <p>We use essential cookies to enable basic site functionality, such as user authentication and secure sessions. We also use analytical cookies to understand how users interact with our platform, helping us improve the experience.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold">2. How to Manage Them</h3>
                  <p>You can manage or disable cookies through your browser settings. Please note that disabling essential cookies may impact your ability to log in or use certain features of the Landsec Capital platform.</p>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
