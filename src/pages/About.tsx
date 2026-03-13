import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, BookOpen, Shield, Award, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const team = [
    { name: 'Mahir Kadia', role: 'Chief Executive Officer (CEO)', bio: 'Visionary leader driving NyAI\'s mission to democratize legal access across India. Mahir combines deep passion for technology and justice to build India\'s most trusted AI legal platform.' },
    { name: 'Mahek Maradiya', role: 'CFO & Founder', bio: 'The financial architect and founding force behind NyAI. Mahek\'s strategic business acumen and commitment to accessible justice laid the foundation for everything NyAI stands for.' },
    { name: 'Tirth Nagar', role: 'Co-Founder', bio: 'A tech innovator at heart, Tirth co-founded NyAI with a focus on building robust AI infrastructure and ensuring the platform delivers accuracy and reliability to every Indian citizen.' },
  ];

  const values = [
    { icon: <Shield size={28} />, title: 'Privacy First', desc: 'Your legal queries are never shared. End-to-end encrypted and fully confidential.', color: 'var(--trust-blue)', bg: 'var(--trust-blue-dim)', border: 'rgba(59,130,246,0.2)' },
    { icon: <Award size={28} />, title: 'Accuracy Guaranteed', desc: 'Our legal database is reviewed by practicing advocates and updated regularly.', color: 'var(--success-green)', bg: 'var(--success-green-dim)', border: 'rgba(34,197,94,0.2)' },
    { icon: <Zap size={28} />, title: 'Instant Insights', desc: 'Real-time AI analysis delivers legal clarity in seconds, not days.', color: 'var(--ai-purple)', bg: 'var(--ai-purple-dim)', border: 'rgba(168,85,247,0.2)' },
    { icon: <Users size={28} />, title: 'Citizen First', desc: 'Designed for every Indian citizen — not just the privileged few with legal connections.', color: 'var(--amber)', bg: 'var(--amber-dim)', border: 'rgba(245,158,11,0.2)' },
    { icon: <Target size={28} />, title: 'Mission Driven', desc: 'We exist to ensure justice is never out of reach due to a lack of information.', color: '#DC2626', bg: 'rgba(220,38,38,0.1)', border: 'rgba(220,38,38,0.2)' },
    { icon: <BookOpen size={28} />, title: 'Continuously Learning', desc: 'Our AI improves with every interaction, staying current with legal amendments.', color: 'var(--trust-blue)', bg: 'var(--trust-blue-dim)', border: 'rgba(59,130,246,0.2)' },
  ];

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Hero */}
      <section style={{ padding: '6rem 0', textAlign: 'center', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.07) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="section-label">Our Story</div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.03em', lineHeight: 1.1, fontFamily: '"Playfair Display", Georgia, serif' }}>
              Making Legal Help Available<br />to Every <span style={{ WebkitTextStroke: '1.5px var(--foreground)', color: 'transparent' }}>Indian Citizen</span>
            </h1>
            <p style={{ fontSize: '1.15rem', color: 'var(--muted-foreground)', maxWidth: '700px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
              NyAI was born from a simple observation: most Indians don't know their legal rights and can't afford to find out. We set out to change that — with AI, transparency, and a relentless commitment to justice.
            </p>
            <Link to="/chat" className="btn-primary">
              Experience NyAI <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={{ padding: '6rem 0', background: 'rgba(0,0,0,0.15)' }}>
        <div className="container">
          <div className="responsive-grid-2" style={{ alignItems: 'center' }}>
            <motion.div {...fadeInUp}>
              <div className="section-label">Our Mission</div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)', fontWeight: 800, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
                Closing the justice gap in India
              </h2>
              <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.8, marginBottom: '1rem', fontSize: '1rem' }}>
                Over 80% of Indians who face legal issues never seek professional help — not because they don't need it, but because they don't know where to start, or can't afford it.
              </p>
              <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.8, fontSize: '1rem' }}>
                NyAI's mission is to be the first point of legal contact for every Indian, providing instant, accurate, and accessible legal information — in plain language.
              </p>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
              <div className="section-label">Our Vision</div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)', fontWeight: 800, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
                A legally empowered India
              </h2>
              <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.8, marginBottom: '1rem', fontSize: '1rem' }}>
                We envision an India where every citizen understands their rights, can identify when those rights are violated, and knows exactly what steps to take.
              </p>
              <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.8, fontSize: '1rem' }}>
                By combining AI, legal expertise, and an extensive lawyer network, NyAI is building the infrastructure for legal equality in the 21st century.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <motion.div {...fadeInUp} style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="section-label">Our Values</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
              The principles that guide us
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {values.map((v, idx) => (
              <motion.div key={idx} {...fadeInUp} transition={{ delay: idx * 0.08 }} className="glass-card" style={{ padding: '1.75rem' }}>
                <div style={{ width: '50px', height: '50px', background: v.bg, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.1rem', border: `1px solid ${v.border}`, color: v.color }}>
                  {v.icon}
                </div>
                <h3 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1.05rem', color: v.color }}>{v.title}</h3>
                <p style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem', lineHeight: 1.65 }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '6rem 0', background: 'rgba(0,0,0,0.15)' }}>
        <div className="container">
          <motion.div {...fadeInUp} style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="section-label">The Team</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
              Built by people who care about justice
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {team.map((member, idx) => (
              <motion.div key={idx} {...fadeInUp} transition={{ delay: idx * 0.1 }} className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                <div style={{
                  width: '72px', height: '72px', borderRadius: '50%',
                  background: idx === 0 ? 'var(--trust-blue-dim)' : idx === 1 ? 'var(--amber-dim)' : 'var(--success-green-dim)',
                  border: `2px solid ${idx === 0 ? 'rgba(59,130,246,0.4)' : idx === 1 ? 'rgba(245,158,11,0.4)' : 'rgba(34,197,94,0.4)'}`,
                  color: idx === 0 ? 'var(--trust-blue)' : idx === 1 ? 'var(--amber)' : 'var(--success-green)',
                  margin: '0 auto 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', fontWeight: 800
                }}>
                  {member.name.charAt(0)}
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.25rem' }}>{member.name}</h3>
                <div style={{
                  display: 'inline-block',
                  background: idx === 0 ? 'var(--trust-blue-dim)' : idx === 1 ? 'var(--amber-dim)' : 'var(--success-green-dim)',
                  color: idx === 0 ? 'var(--trust-blue)' : idx === 1 ? 'var(--amber)' : 'var(--success-green)',
                  border: `1px solid ${idx === 0 ? 'rgba(59,130,246,0.3)' : idx === 1 ? 'rgba(245,158,11,0.3)' : 'rgba(34,197,94,0.3)'}`,
                  fontSize: '0.78rem', marginBottom: '1rem', fontWeight: 600,
                  padding: '0.2rem 0.75rem', borderRadius: '2rem'
                }}>{member.role}</div>
                <p style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem', lineHeight: 1.65 }}>{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '6rem 0', textAlign: 'center' }}>
        <div className="container">
          <motion.div {...fadeInUp}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
              Join thousands fighting for their rights
            </h2>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/register" className="btn-primary">Get Started Free <ArrowRight size={16} /></Link>
              <Link to="/chat" className="btn-secondary">Try the Lawbot</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
