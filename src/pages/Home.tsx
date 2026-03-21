import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Search, FileText, Shield, Workflow, CheckCircle2, TrendingUp, Lock, Zap, Users, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/* ─── ANIMATION HELPERS ─── */
const fadeIn = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55 },
};

const stagger = (delay: number) => ({
  ...fadeIn,
  transition: { ...fadeIn.transition, delay },
});

/* ─── COUNT-UP HOOK ─── */
const CountUp = ({ end, suffix = '', prefix = '' }: { end: number; suffix?: string; prefix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1400;
        const startTime = performance.now();
        const step = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * end));
          if (progress < 1) requestAnimationFrame(step);
          else setCount(end);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

/* ═══════════════════════════════════════════════════════ */

const Home: React.FC = () => {
  /* ─── CAPABILITIES DATA ─── */
  const capabilities = [
    {
      icon: <Search size={24} />,
      title: 'Legal Research',
      desc: 'Search across thousands of statutes, case laws, and regulatory frameworks in seconds. Surface relevant precedents with AI-powered semantic understanding.',
      tag: 'Research',
    },
    {
      icon: <FileText size={24} />,
      title: 'Contract Analysis',
      desc: 'Automatically review contracts, identify key clauses, flag risks, and extract obligations. Reduce review time from hours to minutes.',
      tag: 'Review',
    },
    {
      icon: <Shield size={24} />,
      title: 'Due Diligence',
      desc: 'Conduct comprehensive due diligence across corporate records, compliance history, and regulatory filings with structured AI analysis.',
      tag: 'Compliance',
    },
    {
      icon: <Workflow size={24} />,
      title: 'Workflow Automation',
      desc: 'Automate routine legal workflows — from document drafting to client intake — reducing manual effort and operational overhead.',
      tag: 'Automation',
    },
  ];

  /* ─── HOW IT WORKS ─── */
  const steps = [
    {
      step: '01',
      title: 'Connect Your Data',
      desc: 'Securely connect your legal databases, document repositories, and internal knowledge bases. NyAI integrates with your existing infrastructure.',
      icon: <Lock size={22} />,
    },
    {
      step: '02',
      title: 'AI Processes & Analyzes',
      desc: 'Our purpose-built AI reads, understands, and cross-references legal documents — identifying patterns, risks, and actionable insights.',
      icon: <Zap size={22} />,
    },
    {
      step: '03',
      title: 'Review & Act',
      desc: 'Receive structured outputs your team can immediately act on — summaries, risk scores, draft documents, and recommended next steps.',
      icon: <CheckCircle2 size={22} />,
    },
    {
      step: '04',
      title: 'Continuously Improve',
      desc: 'NyAI learns from your workflows and feedback, becoming more accurate and aligned with your firm\'s standards over time.',
      icon: <TrendingUp size={22} />,
    },
  ];

  /* ─── CASE STUDIES / METRICS ─── */
  const metrics = [
    { value: 85, suffix: '%', label: 'Reduction in research time', desc: 'Average across enterprise deployments' },
    { value: 10, suffix: 'x', label: 'Faster contract review', desc: 'Compared to manual review processes' },
    { value: 99, suffix: '.7%', label: 'Accuracy rate', desc: 'On legal section identification' },
    { value: 40, suffix: '%', label: 'Cost savings', desc: 'On operational legal workflows' },
  ];

  const testimonials = [
    {
      quote: 'NyAI reduced our contract review cycle from 3 days to under 4 hours. The accuracy and depth of analysis exceeded our expectations.',
      name: 'Priya Sharma',
      role: 'General Counsel',
      company: 'Tata Legal Services',
    },
    {
      quote: 'We deployed NyAI for due diligence on a major acquisition. It surfaced regulatory risks our team had initially missed — in a fraction of the time.',
      name: 'Rajesh Kapoor',
      role: 'Managing Partner',
      company: 'Kapoor & Associates LLP',
    },
    {
      quote: 'The workflow automation capabilities alone justified the investment. Our paralegal team now focuses on high-value work instead of document sorting.',
      name: 'Anita Desai',
      role: 'Head of Legal Operations',
      company: 'Reliance Industries',
    },
  ];

  /* ─── TRUSTED BY LOGOS ─── */
  const trustedBy = [
    'Tata Group', 'Reliance', 'Infosys', 'Wipro', 'HDFC Bank', 'Mahindra',
  ];

  /* ─── SECURITY BADGES ─── */
  const securityItems = [
    { icon: <Shield size={22} />, title: 'SOC 2 Type II', desc: 'Certified compliance with rigorous data security standards' },
    { icon: <Lock size={22} />, title: 'GDPR Compliant', desc: 'Full adherence to international data privacy regulations' },
    { icon: <CheckCircle2 size={22} />, title: 'ISO 27001', desc: 'Information security management system certified' },
    { icon: <Users size={22} />, title: 'Enterprise SSO', desc: 'SAML 2.0, OAuth, and Active Directory integration' },
  ];

  return (
    <div>
      {/* ═══════════ HERO SECTION ═══════════ */}
      <section className="hero-gradient" style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingTop: '100px',
        paddingBottom: '4rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Subtle grid background */}
        <div className="grid-pattern" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ maxWidth: '820px', margin: '0 auto' }}
          >
            <div className="section-label" style={{ marginBottom: '1.5rem' }}>Enterprise AI for Legal & Professional Services</div>

            <h1 style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.035em',
              marginBottom: '1.75rem',
              color: '#fff',
            }}>
              Reduce Manual Work.<br />
              Increase Legal Precision.
            </h1>

            <p className="hero-description" style={{
              fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
              color: 'var(--muted-foreground)',
              maxWidth: '620px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.75,
              fontWeight: 400,
            }}>
              NyAI is an enterprise AI platform purpose-built for legal research, contract analysis, due diligence, and workflow automation — delivering measurable efficiency gains across your legal operations.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link to="/register" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>
                Request a Demo <ArrowRight size={16} />
              </Link>
              <Link to="/about" className="btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>
                Learn How It Works
              </Link>
            </div>

            <p style={{ marginTop: '2.5rem', fontSize: '0.82rem', color: 'var(--muted-foreground)', letterSpacing: '0.02em' }}>
              Trusted by leading law firms and Fortune 500 legal departments
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ TRUSTED BY ═══════════ */}
      <section style={{
        padding: '4rem 0',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        background: 'var(--background-secondary)',
      }}>
        <div className="container">
          <p style={{ textAlign: 'center', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted-foreground)', marginBottom: '2rem' }}>
            Trusted by industry leaders
          </p>
          <div className="trusted-logos" style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            gap: '3.5rem', flexWrap: 'wrap', opacity: 0.4,
          }}>
            {trustedBy.map((name) => (
              <motion.div key={name} {...fadeIn} style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>
                {name}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CAPABILITIES ═══════════ */}
      <section style={{ padding: '8rem 0' }}>
        <div className="container">
          <motion.div {...fadeIn} style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="section-label">Capabilities</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1rem', lineHeight: 1.15 }}>
              Purpose-built AI for<br />legal and professional services
            </h2>
            <p style={{ color: 'var(--muted-foreground)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.75, fontSize: '1rem' }}>
              Every capability is designed around the specific needs of legal professionals — accuracy, speed, and compliance assurance.
            </p>
          </motion.div>

          <div className="capabilities-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1.25rem',
          }}>
            {capabilities.map((cap, idx) => (
              <motion.div key={idx} {...stagger(idx * 0.08)} className="glass-card" style={{
                padding: '2.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{
                    width: '48px', height: '48px',
                    background: 'var(--accent-dim)',
                    border: '1px solid rgba(79, 125, 243, 0.15)',
                    borderRadius: '12px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--accent)',
                  }}>
                    {cap.icon}
                  </div>
                  <span style={{
                    fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.06em',
                    color: 'var(--muted-foreground)', textTransform: 'uppercase',
                    background: 'var(--muted)', padding: '0.2rem 0.65rem', borderRadius: '2rem',
                    border: '1px solid var(--border)',
                  }}>
                    {cap.tag}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>{cap.title}</h3>
                <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.7, fontSize: '0.92rem' }}>{cap.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', marginTop: 'auto' }}>
                  Learn More <ChevronRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ HOW NYAI WORKS ═══════════ */}
      <section style={{ padding: '8rem 0', background: 'var(--background-secondary)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <motion.div {...fadeIn} style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
            <div className="section-label">How It Works</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1rem', lineHeight: 1.15 }}>
              From data to decisions,<br />in four steps
            </h2>
            <p style={{ color: 'var(--muted-foreground)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.75, fontSize: '1rem' }}>
              NyAI integrates seamlessly into your existing workflows. No disruption, just transformation.
            </p>
          </motion.div>

          <div className="steps-grid" style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem',
          }}>
            {steps.map((s, idx) => (
              <motion.div key={idx} {...stagger(idx * 0.1)} style={{
                position: 'relative',
                padding: '2rem 1.75rem',
                background: 'var(--background-card)',
                border: '1px solid var(--border)',
                borderRadius: '1rem',
                display: 'flex', flexDirection: 'column', gap: '1rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px',
                    background: 'var(--accent-dim)', border: '1px solid rgba(79,125,243,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--accent)',
                  }}>
                    {s.icon}
                  </div>
                  <span style={{
                    fontSize: '2.5rem', fontWeight: 900, color: 'rgba(255,255,255,0.04)',
                    lineHeight: 1, letterSpacing: '-0.04em', userSelect: 'none',
                  }}>
                    {s.step}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>{s.title}</h3>
                <p style={{ color: 'var(--muted-foreground)', fontSize: '0.88rem', lineHeight: 1.7 }}>{s.desc}</p>

                {/* Connector arrow (except last) */}
                {idx < steps.length - 1 && (
                  <div className="desktop-only" style={{
                    position: 'absolute', right: '-16px', top: '50%', transform: 'translateY(-50%)',
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: 'var(--background)', border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 5,
                  }}>
                    <ChevronRight size={14} style={{ color: 'var(--muted-foreground)' }} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeIn} style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Link to="/register" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>
              Request a Demo <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ METRICS & RESULTS ═══════════ */}
      <section style={{ padding: '6rem 0', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <motion.div {...fadeIn} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="section-label">Results</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15 }}>
              Measurable impact across<br />every deployment
            </h2>
          </motion.div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem',
          }}>
            {metrics.map((m, idx) => (
              <motion.div key={idx} {...stagger(idx * 0.08)} style={{
                padding: '2rem 1.75rem',
                background: 'var(--background-card)',
                border: '1px solid var(--border)',
                borderRadius: '1rem',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '3rem', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '0.75rem', color: 'var(--accent)' }}>
                  <CountUp end={m.value} suffix={m.suffix} />
                </div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.3rem', color: '#fff' }}>{m.label}</h3>
                <p style={{ color: 'var(--muted-foreground)', fontSize: '0.8rem' }}>{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CASE STUDIES / TESTIMONIALS ═══════════ */}
      <section style={{ padding: '8rem 0', background: 'var(--background-secondary)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <motion.div {...fadeIn} style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="section-label">Case Studies</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15 }}>
              What our clients say
            </h2>
            <p style={{ color: 'var(--muted-foreground)', maxWidth: '480px', margin: '1rem auto 0', lineHeight: 1.75, fontSize: '1rem' }}>
              Real outcomes from legal teams deploying NyAI in production environments.
            </p>
          </motion.div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem',
          }}>
            {testimonials.map((t, idx) => (
              <motion.div key={idx} {...stagger(idx * 0.08)} className="glass-card" style={{
                padding: '2.25rem', display: 'flex', flexDirection: 'column',
              }}>
                {/* Quote mark */}
                <div style={{ fontSize: '3rem', lineHeight: 1, color: 'var(--accent)', fontFamily: 'Georgia, serif', marginBottom: '0.5rem', opacity: 0.5 }}>"</div>
                <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.75, fontSize: '0.95rem', flex: 1, marginBottom: '1.5rem' }}>
                  {t.quote}
                </p>
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem', color: '#fff' }}>{t.name}</div>
                  <div style={{ color: 'var(--muted-foreground)', fontSize: '0.82rem', marginTop: '0.15rem' }}>
                    {t.role} · {t.company}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ SECURITY & TRUST ═══════════ */}
      <section style={{ padding: '8rem 0', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="responsive-grid-2">
            <motion.div {...fadeIn}>
              <div className="section-label">Security & Compliance</div>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: '1.25rem' }}>
                Enterprise-grade security <br />you can trust
              </h2>
              <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.8, marginBottom: '1.25rem', fontSize: '0.95rem' }}>
                NyAI is built from the ground up for enterprise environments. Your data is encrypted at rest and in transit, processed in isolated environments, and never used for model training.
              </p>
              <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '2rem' }}>
                We maintain the highest industry certifications and undergo regular third-party audits to ensure your data remains private and secure.
              </p>
              <Link to="/register" className="btn-accent" style={{ padding: '0.85rem 1.75rem' }}>
                Request Security Whitepaper <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div {...fadeIn} transition={{ delay: 0.15 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {securityItems.map((item, idx) => (
                  <div key={idx} style={{
                    padding: '1.5rem',
                    background: 'var(--background-card)',
                    border: '1px solid var(--border)',
                    borderRadius: '0.875rem',
                  }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '10px',
                      background: 'var(--accent-dim)', border: '1px solid rgba(79,125,243,0.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: '0.85rem', color: 'var(--accent)',
                    }}>
                      {item.icon}
                    </div>
                    <h4 style={{ fontWeight: 700, fontSize: '0.92rem', marginBottom: '0.35rem', color: '#fff' }}>{item.title}</h4>
                    <p style={{ color: 'var(--muted-foreground)', fontSize: '0.82rem', lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section style={{
        padding: '8rem 0',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Gradient glow */}
        <div style={{
          position: 'absolute', top: '-40%', left: '50%', transform: 'translateX(-50%)',
          width: '600px', height: '400px',
          background: 'radial-gradient(ellipse, var(--accent-glow) 0%, transparent 70%)',
          pointerEvents: 'none', opacity: 0.5,
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div {...fadeIn}>
            <div className="section-label">Get Started</div>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 800, letterSpacing: '-0.03em',
              marginBottom: '1.25rem', lineHeight: 1.15,
            }}>
              Ready to transform your<br />legal operations?
            </h2>
            <p style={{
              color: 'var(--muted-foreground)', maxWidth: '520px',
              margin: '0 auto 2.5rem', lineHeight: 1.75, fontSize: '1.05rem',
            }}>
              See how NyAI can deliver measurable efficiency gains for your organization. Schedule a personalized demo with our team.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link to="/register" className="btn-primary" style={{ padding: '1.1rem 2.5rem', fontSize: '1.05rem' }}>
                Request a Demo <ArrowRight size={16} />
              </Link>
              <Link to="/about" className="btn-secondary" style={{ padding: '1.1rem 2.5rem', fontSize: '1.05rem' }}>
                Contact Sales
              </Link>
            </div>
            <p style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>
              No commitment required · Personalized walkthrough · Enterprise pricing
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
