import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Sparkles, Zap, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassSurface from '../components/ui/GlassSurface';

interface Plan {
  name: string;
  price: string;
  period: string;
  desc: string;
  icon: React.ReactNode;
  features: string[];
  highlight?: boolean;
  badge?: string;
  cta: string;
}

const plans: Plan[] = [
  {
    name: 'Basic',
    price: '₹0',
    period: 'Forever Free',
    desc: 'Perfect for individuals exploring their legal rights and getting started with AI assistance.',
    icon: <Zap size={24} />,
    cta: 'Get Started Free',
    features: [
      '5 AI legal queries per day',
      'Basic IPC section identification',
      'Access to legal search',
      'General legal information',
      'Community support',
    ],
  },
  {
    name: 'Standard',
    price: '₹499',
    period: '/month',
    desc: 'Ideal for citizens who need regular legal guidance and want to connect with verified lawyers.',
    icon: <Sparkles size={24} />,
    highlight: true,
    badge: 'Best for Most Cases',
    cta: 'Start 7-Day Free Trial',
    features: [
      'Unlimited AI legal queries',
      'Detailed case analysis with precedents',
      'Priority lawyer matching',
      'Document checklist generation',
      'Multi-language support',
      'Email support within 24hrs',
      'Case history & saved analyses',
    ],
  },
  {
    name: 'Pro',
    price: '₹1,499',
    period: '/month',
    desc: 'For professionals, businesses, and those handling complex legal matters requiring in-depth support.',
    icon: <Crown size={24} />,
    cta: 'Contact Sales',
    features: [
      'Everything in Standard',
      'Unlimited detailed case reports',
      'Priority verified lawyer network',
      'Advanced multi-act legal analysis',
      'Dedicated account manager',
      'API access for integrations',
      'Custom legal document templates',
      'Phone & video support',
    ],
  },
];

const Pricing: React.FC = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Hero */}
      <section style={{ padding: '6rem 0 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="section-label">Pricing</div>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 800, marginBottom: '1.5rem',
              letterSpacing: '-0.03em', lineHeight: 1.1,
              fontFamily: '"Playfair Display", Georgia, serif',
            }}>
              Simple, Transparent<br />
              <span style={{ WebkitTextStroke: '1.5px var(--foreground)', color: 'transparent' }}>
                Pricing
              </span>
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--muted-foreground)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.75 }}>
              Choose the plan that fits your needs. No hidden fees, cancel anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Plans */}
      <section style={{ padding: '4rem 0 8rem' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            alignItems: 'stretch',
          }}>
            {plans.map((plan, idx) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: idx * 0.12 }}
                className="glass-card"
                style={{
                  padding: '2.5rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  border: plan.highlight ? '2px solid rgba(255,255,255,0.25)' : undefined,
                  boxShadow: plan.highlight ? '0 0 60px rgba(255,255,255,0.06)' : undefined,
                }}
              >
                {/* Highlight glow */}
                {plan.highlight && (
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '200px',
                    background: 'radial-gradient(ellipse 100% 100% at 50% -20%, rgba(255,255,255,0.08) 0%, transparent 70%)',
                    pointerEvents: 'none',
                  }} />
                )}

                {/* Badge */}
                {plan.badge && (
                  <div style={{
                    position: 'absolute', top: '1.25rem', right: '1.25rem',
                    background: 'var(--amber-dim)',
                    border: '1px solid rgba(245, 158, 11, 0.35)',
                    color: 'var(--amber)',
                    padding: '0.3rem 0.85rem',
                    borderRadius: '2rem',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.02em',
                  }}>
                    {plan.badge}
                  </div>
                )}

                {/* Icon */}
                <div style={{
                  width: '52px', height: '52px', borderRadius: '14px',
                  background: plan.highlight ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${plan.highlight ? 'rgba(255,255,255,0.15)' : 'var(--glass-border)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1.5rem',
                  color: plan.highlight ? 'var(--accent-blue)' : 'var(--foreground)',
                }}>
                  {plan.icon}
                </div>

                {/* Name */}
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>{plan.name}</h3>

                {/* Price */}
                <div style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
                  <span style={{
                    fontSize: '3rem', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1,
                    color: 'var(--success-green)',
                  }}>
                    {plan.price}
                  </span>
                  <span style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem', fontWeight: 500 }}>
                    {plan.period}
                  </span>
                </div>

                {/* Desc */}
                <p style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                  {plan.desc}
                </p>

                {/* Divider */}
                <div style={{ height: '1px', background: 'var(--border)', marginBottom: '1.75rem' }} />

                {/* Features */}
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1 }}>
                  {plan.features.map((feature, i) => (
                    <li key={i} style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-start', fontSize: '0.9rem' }}>
                      <div style={{
                        width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0, marginTop: '1px',
                        background: plan.highlight ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${plan.highlight ? 'rgba(255,255,255,0.15)' : 'var(--glass-border)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Check size={12} strokeWidth={3} style={{ color: plan.highlight ? 'var(--accent-blue)' : 'var(--foreground)', opacity: 0.9 }} />
                      </div>
                      <span style={{ color: 'var(--muted-foreground)', lineHeight: 1.5 }}>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <GlassSurface 
                  borderRadius={999} 
                  displace={plan.highlight ? 5 : 3} 
                  backgroundOpacity={plan.highlight ? 0.2 : 0.1} 
                  brightness={plan.highlight ? 55 : 45}
                  style={{ marginTop: '2rem', width: '100%', background: plan.highlight ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.02)' }}
                >
                  <Link
                    to="/register"
                    style={{
                      width: '100%',
                      textAlign: 'center',
                      justifyContent: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      padding: '0.9rem 1.5rem',
                      color: '#fff',
                    }}
                  >
                    {plan.cta} <ArrowRight size={16} />
                  </Link>
                </GlassSurface>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ-like bottom section */}
      <section style={{ padding: '6rem 0', background: 'rgba(0,0,0,0.2)' }}>
        <div className="container" style={{ maxWidth: '740px', textAlign: 'center' }}>
          <motion.div {...fadeInUp}>
            <div className="section-label">Questions?</div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
              Not sure which plan is right?
            </h2>
            <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.75, marginBottom: '2.5rem', fontSize: '1rem' }}>
              Start with the free Basic plan — no credit card needed. Upgrade anytime as your needs grow. Our AI will always recommend the right plan based on your usage.
            </p>
            <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
              <GlassSurface 
                borderRadius={999} 
                displace={4} 
                backgroundOpacity={1} 
                brightness={62}
                style={{ background: '#BD2020' }}
              >
                <Link to="/chat" style={{ padding: '0.85rem 1.75rem', fontSize: '0.95rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Ask NyAI <ArrowRight size={16} />
                </Link>
              </GlassSurface>
              <GlassSurface borderRadius={999} displace={3} backgroundOpacity={0.1} brightness={45}>
                <Link to="/about" style={{ padding: '0.85rem 1.75rem', fontSize: '0.95rem', fontWeight: 600, color: '#fff' }}>
                  Contact Us
                </Link>
              </GlassSurface>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
