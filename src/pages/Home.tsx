import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Scale, Search, Users, ShieldCheck, Star, BookOpen, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassSurface from '../components/ui/GlassSurface';

const Home: React.FC = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const features = [
    {
      icon: <Scale size={32} />,
      title: 'AI Case Analysis',
      desc: 'Describe your legal situation in plain language. NyAI instantly identifies relevant IPC sections, constitutional provisions, and legal precedents.',
      iconColor: 'var(--ai-purple)', iconBg: 'var(--ai-purple-dim)', iconBorder: 'rgba(168, 85, 247, 0.2)'
    },
    {
      icon: <Search size={32} />,
      title: 'Smart Legal Search',
      desc: 'Search across thousands of Indian laws, acts, and regulations with our intelligent semantic search engine.',
      iconColor: 'var(--trust-blue)', iconBg: 'var(--trust-blue-dim)', iconBorder: 'rgba(59, 130, 246, 0.2)'
    },
    {
      icon: <Users size={32} />,
      title: 'Verified Lawyer Network',
      desc: 'Connect with experienced lawyers vetted for credentials and expertise, filtered by your location and legal matter.',
      iconColor: 'var(--success-green)', iconBg: 'var(--success-green-dim)', iconBorder: 'rgba(34, 197, 94, 0.2)'
    },
    {
      icon: <ShieldCheck size={32} />,
      title: 'Confidential & Secure',
      desc: 'Your legal queries are processed with enterprise-grade security and strict data confidentiality standards.',
      iconColor: 'var(--trust-blue)', iconBg: 'var(--trust-blue-dim)', iconBorder: 'rgba(59, 130, 246, 0.2)'
    },
    {
      icon: <BookOpen size={32} />,
      title: 'Legal Education',
      desc: 'Access plain-language explanations of your rights, legal processes, and what to expect in court.',
      iconColor: 'var(--amber)', iconBg: 'var(--amber-dim)', iconBorder: 'rgba(245, 158, 11, 0.2)'
    },
    {
      icon: <Briefcase size={32} />,
      title: 'Document Guidance',
      desc: 'Get guidance on the documents and evidence you need to build a strong legal case.',
      iconColor: 'var(--success-green)', iconBg: 'var(--success-green-dim)', iconBorder: 'rgba(34, 197, 94, 0.2)'
    }
  ];

  const stats = [
    { value: '500+', end: 500, suffix: '+', label: 'IPC Sections Covered' },
    { value: '1,200+', end: 1200, suffix: '+', label: 'Verified Lawyers' },
    { value: '28', end: 28, suffix: '', label: 'States Supported' },
    { value: '50K+', end: 50, suffix: 'K+', label: 'Cases Analyzed' },
  ];

  const CountUp = ({ end, suffix }: { end: number; suffix: string }) => {
    const [count, setCount] = useState(0);
    const [done, setDone] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);
    const started = useRef(false);
    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1200;
          const startTime = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(step);
            else { setCount(end); setDone(true); }
          };
          requestAnimationFrame(step);
        }
      }, { threshold: 0.3 });
      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, [end]);
    return (
      <span ref={ref} style={{ color: done ? 'var(--success-green)' : 'var(--foreground)', transition: 'color 0.4s ease' }}>
        {count.toLocaleString()}{suffix}
      </span>
    );
  };

  const testimonials = [
    { name: 'Priya Sharma', role: 'Small Business Owner, Mumbai', text: 'NyAI helped me understand my tenant-landlord dispute in minutes. The legal clarity was remarkable.', stars: 5 },
    { name: 'Rajesh Kumar', role: 'Engineer, Bangalore', text: 'Found the perfect family lawyer within my budget using NyAI. The AI analysis was spot-on.', stars: 5 },
    { name: 'Anita Patel', role: 'Teacher, Ahmedabad', text: 'I was confused about a consumer complaint. NyAI walked me through every step clearly.', stars: 5 },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        textAlign: 'center',
        paddingTop: '80px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background gradient */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.05) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="section-label">AI-Powered Legal Platform for India</div>
            
            <h1 className="hero-title" style={{ 
              fontSize: 'clamp(3.5rem, 15vw, 5rem)', 
              fontWeight: 800, 
              lineHeight: 1.05, 
              letterSpacing: '-0.045em', 
              marginBottom: '1rem',
            }}>
              Justice Made <br />
              <span style={{ WebkitTextStroke: '1px var(--foreground)', color: 'transparent', opacity: 0.8 }}>
                Accessible.
              </span>
            </h1>
            
            <p className="hero-description" style={{ 
              fontSize: 'clamp(0.9rem, 2vw + 0.4rem, 1.15rem)', 
              color: 'var(--muted-foreground)', 
              maxWidth: '680px', 
              margin: '0 auto 2.5rem', 
              lineHeight: 1.5,
              fontWeight: 400,
              padding: '0 1.5rem'
            }}>
              NyAI helps Indian citizens understand their legal rights, analyze cases with AI, and connect with verified lawyers — all in one platform.
            </p>
            
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
              <GlassSurface 
                borderRadius={999} 
                displace={4} 
                mixBlendMode="screen" 
                backgroundOpacity={0.25} 
                brightness={62}
                style={{ transition: 'transform 0.3s ease' }}
                className="hero-cta-primary"
              >
                <Link to="/register" style={{ fontSize: '1rem', padding: '1rem 2.2rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Get Started Free <ArrowRight size={18} />
                </Link>
              </GlassSurface>

              <GlassSurface 
                borderRadius={999} 
                displace={3} 
                mixBlendMode="screen" 
                backgroundOpacity={0.1} 
                brightness={45}
                style={{ transition: 'transform 0.3s ease' }}
                className="hero-cta-secondary"
              >
                <Link to="/chat" style={{ fontSize: '1rem', padding: '1rem 2.2rem', fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Try the Lawbot
                </Link>
              </GlassSurface>
            </div>

            <p style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--muted-foreground)' }}>
              Trusted by 50,000+ users
            </p>
          </motion.div>
        </div>

        {/* Scroll down indicator — mouse animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{
            position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
            cursor: 'pointer',
          }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <div style={{
            width: '26px', height: '42px', borderRadius: '13px',
            border: '2px solid var(--muted-foreground)',
            display: 'flex', justifyContent: 'center', paddingTop: '8px',
            opacity: 0.6,
          }}>
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: '4px', height: '8px', borderRadius: '2px',
                background: 'var(--muted-foreground)',
              }}
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '4rem 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            {stats.map((stat, idx) => (
              <motion.div key={idx} {...fadeInUp} transition={{ duration: 0.5, delay: idx * 0.1 }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--foreground)' }}>
                  <CountUp end={stat.end} suffix={stat.suffix} />
                </div>
                <div style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '8rem 0' }}>
        <div className="container">
          <motion.div {...fadeInUp} style={{ marginBottom: '4rem', textAlign: 'center' }}>
            <div className="section-label">Features</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
              Everything you need for legal clarity
            </h2>
            <p style={{ color: 'var(--muted-foreground)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
              From understanding a law to finding the right lawyer, NyAI provides professional-grade legal tools for everyone.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {features.map((f, idx) => (
              <motion.div
                key={idx}
                {...fadeInUp}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="glass-card"
                style={{ padding: '2rem' }}
              >
                <div style={{ 
                  width: '56px', height: '56px', 
                  background: f.iconBg,
                  borderRadius: '14px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  marginBottom: '1.25rem',
                  border: `1px solid ${f.iconBorder}`,
                  color: f.iconColor,
                }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.6rem' }}>{f.title}</h3>
                <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.65, fontSize: '0.95rem' }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Scrollytelling Timeline */}
      <section style={{ padding: '8rem 0', background: 'rgba(0,0,0,0.25)' }}>
        <div className="container">
          <motion.div {...fadeInUp} style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <div className="section-label">How It Works</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em', marginTop: '0.5rem' }}>
              Legal help in 3 simple steps
            </h2>
            <p style={{ color: 'var(--muted-foreground)', marginTop: '1rem', maxWidth: '520px', margin: '1rem auto 0', lineHeight: 1.75 }}>
              No legal jargon. No confusing processes. Just clear, actionable guidance from AI to advocate.
            </p>
          </motion.div>

          <div style={{ maxWidth: '820px', margin: '0 auto', position: 'relative' }}>
            {/* Vertical connecting line */}
            <div className="timeline-line" style={{
              position: 'absolute', left: '39px', top: '60px', bottom: '60px', width: '2px',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
              zIndex: 0
            }} />

            {[
              {
                step: '01',
                title: 'Describe Your Legal Issue',
                desc: 'Tell NyAI about your situation in plain, everyday language. No legal knowledge required — just describe what happened. Our AI understands context and nuance.',
                detail: 'Available in English, Hindi, and regional languages soon.',
                icon: '💬'
              },
              {
                step: '02',
                title: 'Receive Instant AI Analysis',
                desc: 'NyAI instantly identifies relevant IPC sections, constitutional provisions, acts, and legal precedents that apply to your specific situation.',
                detail: 'Analysis powered by 500+ IPC sections and thousands of precedents.',
                icon: '⚡'
              },
              {
                step: '03',
                title: 'Connect with a Verified Lawyer',
                desc: 'Get matched with experienced lawyers in your city who specialize in your exact legal matter. Browse profiles, contact directly, and get the professional help you deserve.',
                detail: '1,200+ verified lawyers across 28 states.',
                icon: '🤝'
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.65, delay: idx * 0.15 }}
                className="timeline-item"
                style={{ display: 'flex', gap: '2rem', marginBottom: idx < 2 ? '4rem' : '0', position: 'relative', zIndex: 1 }}
              >
                {/* Step circle */}
                <div style={{ flexShrink: 0 }}>
                  <div className="timeline-icon" style={{
                    width: '80px', height: '80px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.04))',
                    border: '2px solid rgba(255,255,255,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.75rem',
                    boxShadow: '0 0 30px rgba(255,255,255,0.05)'
                  }}>
                    {item.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="glass-card" style={{ flex: 1, padding: '2rem 2.25rem' }}>
                  <div className="timeline-step" style={{
                    fontSize: '4rem', fontWeight: 900,
                    color: 'rgba(255,255,255,0.05)',
                    lineHeight: 1, marginBottom: '-0.5rem',
                    letterSpacing: '-0.04em', userSelect: 'none'
                  }}>
                    {item.step}
                  </div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.75rem', letterSpacing: '-0.01em' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.75, marginBottom: '1rem', fontSize: '0.97rem' }}>
                    {item.desc}
                  </p>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '2rem', padding: '0.3rem 0.9rem',
                    fontSize: '0.78rem', color: 'var(--accent-blue)', fontWeight: 600
                  }}>
                    {item.detail}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeInUp} transition={{ delay: 0.4 }} style={{ textAlign: 'center', marginTop: '5rem' }}>
            <Link to="/chat" className="btn-primary" style={{ fontSize: '1rem', padding: '1rem 2rem' }}>
              Try It Now — It's Free <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* AI Demo */}
      <section style={{ padding: '8rem 0' }}>
        <div className="container responsive-grid-2">
          <motion.div {...fadeInUp}>
            <div className="section-label">Live AI Demo</div>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              Instant legal analysis powered by AI
            </h2>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                'Supports all major Indian laws — IPC, CrPC, CPC, and more',
                'Real-time identification of applicable sections',
                'Step-by-step recommended actions',
                'Explains legal terms in plain language'
              ].map((point, idx) => (
                <li key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <ShieldCheck size={20} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--success-green)' }} />
                  <span style={{ color: 'var(--muted-foreground)', lineHeight: 1.6 }}>{point}</span>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: '2.5rem' }}>
              <Link to="/chat" className="btn-primary">Try the AI Lawbot <ArrowRight size={16} /></Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#EF4444' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#F59E0B' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22C55E' }}></div>
                <span style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)', marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--ai-purple)', display: 'inline-block' }} />
                  NyAI Lawbot
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: 'var(--muted)', borderRadius: '0.75rem', padding: '0.875rem 1rem', alignSelf: 'flex-end', maxWidth: '80%' }}>
                  <p style={{ fontSize: '0.9rem' }}>My landlord is refusing to return my security deposit after I moved out.</p>
                </div>
                <div style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: '0.75rem', padding: '0.875rem 1rem', maxWidth: '90%' }}>
                  <p style={{ fontSize: '0.9rem', marginBottom: '0.75rem', color: 'var(--muted-foreground)' }}>Based on your situation, the following applies:</p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                    <span style={{ background: 'var(--trust-blue)', color: '#fff', padding: '0.2rem 0.65rem', borderRadius: '2rem', fontSize: '0.72rem', fontWeight: 700 }}>Section 106, TP Act</span>
                    <span style={{ background: 'var(--ai-purple-dim)', border: '1px solid rgba(168,85,247,0.3)', color: 'var(--ai-purple)', padding: '0.2rem 0.65rem', borderRadius: '2rem', fontSize: '0.72rem', fontWeight: 600 }}>Rent Control Act</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)' }}>📋 Send a written legal notice. If not resolved in 15 days, file a case in Consumer Forum or Small Claims Court.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '8rem 0', background: 'rgba(0,0,0,0.15)' }}>
        <div className="container">
          <motion.div {...fadeInUp} style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="section-label">Testimonials</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
              Trusted by citizens across India
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {testimonials.map((t, idx) => (
              <motion.div key={idx} {...fadeInUp} transition={{ delay: idx * 0.1 }} className="glass-card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.25rem' }}>
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} size={16} fill="var(--amber)" color="var(--amber)" />
                  ))}
                </div>
                <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '0.95rem' }}>"{t.text}"</p>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{t.name}</div>
                  <div style={{ color: 'var(--muted-foreground)', fontSize: '0.83rem', marginTop: '0.2rem' }}>{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '8rem 0', textAlign: 'center' }}>
        <div className="container">
          <motion.div {...fadeInUp}>
            <div className="section-label">Get Started Today</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
              Ready to understand your rights?
            </h2>
            <p style={{ color: 'var(--muted-foreground)', marginBottom: '2.5rem', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 2.5rem' }}>
              Join thousands of citizens who are using NyAI to navigate the Indian legal system with confidence.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/register" className="btn-primary" style={{ fontSize: '1.05rem', padding: '1.1rem 2.25rem' }}>
                Create Free Account <ArrowRight size={18} />
              </Link>
              <Link to="/about" className="btn-secondary" style={{ fontSize: '1.05rem', padding: '1.1rem 2.25rem' }}>
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
