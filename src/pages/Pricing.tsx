import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Zap, Sparkles, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    icon: <Zap size={22} />,
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
    icon: <Sparkles size={22} />,
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
    icon: <Crown size={22} />,
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
    initial: { opacity: 0, y: 25 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  };

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Hero */}
      <section style={{ padding: '6rem 0 2rem', textAlign: 'center' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="section-label">Pricing</div>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 700, marginBottom: '1.5rem',
              letterSpacing: '-0.03em', lineHeight: 1.1,
            }}>
              Simple, Transparent<br />Pricing
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--muted-foreground)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
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
            gap: '1rem',
            alignItems: 'stretch',
          }}>
            {plans.map((plan, idx) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card"
                style={{
                  padding: '2.25rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  border: plan.highlight ? '1px solid rgba(255,255,255,0.3)' : undefined,
                }}
              >
                {/* Badge */}
                {plan.badge && (
                  <div style={{
                    position: 'absolute', top: '1.25rem', right: '1.25rem',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid var(--border)',
                    color: '#fff',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '2rem',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                  }}>
                    {plan.badge}
                  </div>
                )}

                {/* Icon */}
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1.5rem',
                  color: '#fff',
                }}>
                  {plan.icon}
                </div>

                {/* Name */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem' }}>{plan.name}</h3>

                {/* Price */}
                <div style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
                  <span style={{ fontSize: '2.75rem', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1, color: '#fff' }}>
                    {plan.price}
                  </span>
                  <span style={{ color: 'var(--muted-foreground)', fontSize: '0.88rem', fontWeight: 400 }}>
                    {plan.period}
                  </span>
                </div>

                {/* Desc */}
                <p style={{ color: 'var(--muted-foreground)', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '1.75rem' }}>
                  {plan.desc}
                </p>

                {/* Divider */}
                <div style={{ height: '1px', background: 'var(--border)', marginBottom: '1.5rem' }} />

                {/* Features */}
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
                  {plan.features.map((feature, i) => (
                    <li key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', fontSize: '0.88rem' }}>
                      <div style={{
                        width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0, marginTop: '1px',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid var(--border)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Check size={10} strokeWidth={3} style={{ color: '#fff' }} />
                      </div>
                      <span style={{ color: 'var(--muted-foreground)', lineHeight: 1.5 }}>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  to="/register"
                  className={plan.highlight ? 'btn-primary' : 'btn-secondary'}
                  style={{ marginTop: '2rem', width: '100%', justifyContent: 'center', padding: '0.85rem 1.5rem', fontSize: '0.92rem' }}
                >
                  {plan.cta} <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ-like bottom section */}
      <section style={{ padding: '6rem 0', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: '680px', textAlign: 'center' }}>
          <motion.div {...fadeInUp}>
            <div className="section-label">Questions?</div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 700, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
              Not sure which plan is right?
            </h2>
            <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.75, marginBottom: '2.5rem', fontSize: '0.95rem' }}>
              Start with the free Basic plan — no credit card needed. Upgrade anytime as your needs grow.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link to="/chat" className="btn-primary" style={{ padding: '0.85rem 1.75rem', fontSize: '0.95rem' }}>
                Ask NyAI <ArrowRight size={16} />
              </Link>
              <Link to="/about" className="btn-secondary" style={{ padding: '0.85rem 1.75rem', fontSize: '0.95rem' }}>
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
