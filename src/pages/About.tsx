import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, BookOpen, Shield, Award, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 25 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  const team = [
    { name: 'Mahir Kadia', role: 'Chief Executive Officer (CEO)', bio: 'Visionary leader driving NyAI\'s mission to democratize legal access across India. Mahir combines deep passion for technology and justice to build India\'s most trusted AI legal platform.' },
    { name: 'Mahek Maradiya', role: 'CFO & Founder', bio: 'The financial architect and founding force behind NyAI. Mahek\'s strategic business acumen and commitment to accessible justice laid the foundation for everything NyAI stands for.' },
    { name: 'Tirth Nagar', role: 'Co-Founder', bio: 'A tech innovator at heart, Tirth co-founded NyAI with a focus on building robust AI infrastructure and ensuring the platform delivers accuracy and reliability to every Indian citizen.' },
  ];

  const values = [
    { icon: <Shield size={24} />, title: 'Privacy First', desc: 'Your legal queries are never shared. End-to-end encrypted and fully confidential.' },
    { icon: <Award size={24} />, title: 'Accuracy Guaranteed', desc: 'Our legal database is reviewed by practicing advocates and updated regularly.' },
    { icon: <Zap size={24} />, title: 'Instant Insights', desc: 'Real-time AI analysis delivers legal clarity in seconds, not days.' },
    { icon: <Users size={24} />, title: 'Citizen First', desc: 'Designed for every Indian citizen — not just the privileged few with legal connections.' },
    { icon: <Target size={24} />, title: 'Mission Driven', desc: 'We exist to ensure justice is never out of reach due to a lack of information.' },
    { icon: <BookOpen size={24} />, title: 'Continuously Learning', desc: 'Our AI improves with every interaction, staying current with legal amendments.' },
  ];

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Hero */}
      <section style={{ padding: '6rem 0', textAlign: 'center' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="section-label">Our Story</div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 700, marginBottom: '1.5rem', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Making Legal Help Available<br />to Every Indian Citizen
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--muted-foreground)', maxWidth: '640px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
              NyAI was born from a simple observation: most Indians don't know their legal rights and can't afford to find out. We set out to change that — with AI, transparency, and a relentless commitment to justice.
            </p>
            <Link to="/chat" className="btn-primary" style={{ padding: '0.85rem 1.75rem', fontSize: '0.95rem' }}>
              Experience NyAI <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={{ padding: '6rem 0', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="responsive-grid-2" style={{ alignItems: 'start' }}>
            <motion.div {...fadeInUp}>
              <div className="section-label">Our Mission</div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 700, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
                Closing the justice gap in India
              </h2>
              <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.8, marginBottom: '1rem', fontSize: '0.95rem' }}>
                Over 80% of Indians who face legal issues never seek professional help — not because they don't need it, but because they don't know where to start, or can't afford it.
              </p>
              <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.8, fontSize: '0.95rem' }}>
                NyAI's mission is to be the first point of legal contact for every Indian, providing instant, accurate, and accessible legal information — in plain language.
              </p>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.15 }}>
              <div className="section-label">Our Vision</div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 700, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
                A legally empowered India
              </h2>
              <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.8, marginBottom: '1rem', fontSize: '0.95rem' }}>
                We envision an India where every citizen understands their rights, can identify when those rights are violated, and knows exactly what steps to take.
              </p>
              <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.8, fontSize: '0.95rem' }}>
                By combining AI, legal expertise, and an extensive lawyer network, NyAI is building the infrastructure for legal equality in the 21st century.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '6rem 0', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <motion.div {...fadeInUp} style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="section-label">Our Values</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
              The principles that guide us
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {values.map((v, idx) => (
              <motion.div key={idx} {...fadeInUp} transition={{ delay: idx * 0.06 }} className="glass-card" style={{ padding: '1.75rem' }}>
                <div style={{ width: '44px', height: '44px', background: 'rgba(255,255,255,0.06)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', border: '1px solid var(--border)', color: '#fff' }}>
                  {v.icon}
                </div>
                <h3 style={{ fontWeight: 600, marginBottom: '0.4rem', fontSize: '1rem', color: '#fff' }}>{v.title}</h3>
                <p style={{ color: 'var(--muted-foreground)', fontSize: '0.88rem', lineHeight: 1.65 }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '6rem 0', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <motion.div {...fadeInUp} style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="section-label">The Team</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
              Built by people who care about justice
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {team.map((member, idx) => (
              <motion.div key={idx} {...fadeInUp} transition={{ delay: idx * 0.08 }} className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid var(--border)',
                  color: '#fff',
                  margin: '0 auto 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 700
                }}>
                  {member.name.charAt(0)}
                </div>
                <h3 style={{ fontWeight: 600, fontSize: '1.05rem', marginBottom: '0.25rem', color: '#fff' }}>{member.name}</h3>
                <div style={{
                  display: 'inline-block',
                  background: 'transparent',
                  color: 'var(--muted-foreground)',
                  border: '1px solid var(--border)',
                  fontSize: '0.75rem', marginBottom: '1rem', fontWeight: 500,
                  padding: '0.2rem 0.7rem', borderRadius: '2rem'
                }}>{member.role}</div>
                <p style={{ color: 'var(--muted-foreground)', fontSize: '0.88rem', lineHeight: 1.65 }}>{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '6rem 0', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <motion.div {...fadeInUp}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
              Join thousands fighting for their rights
            </h2>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link to="/register" className="btn-primary" style={{ padding: '0.85rem 1.75rem', fontSize: '0.95rem' }}>
                Get Started <ArrowRight size={16} />
              </Link>
              <Link to="/chat" className="btn-secondary" style={{ padding: '0.85rem 1.75rem', fontSize: '0.95rem' }}>
                Try the Lawbot
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
