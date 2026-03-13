import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, Circle, Rocket, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProgressUpdates: React.FC = () => {
  const updates = [
    {
      title: 'Midnight Indigo UI Overhaul',
      date: 'March 2026',
      desc: 'Launched a completely redesigned interface with the Midnight Indigo and Vanilla Cream color palette, enhanced typography, and professional-grade UX across all pages.',
      status: 'completed',
      tag: 'Design'
    },
    {
      title: 'AI Model Expansion — v2.0',
      date: 'February 2026',
      desc: 'Integrated 500+ additional IPC sections, CrPC provisions, and constitutional articles. Response accuracy improved by 38% based on user feedback and testing.',
      status: 'completed',
      tag: 'AI'
    },
    {
      title: 'Legal Search Database',
      date: 'January 2026',
      desc: 'Launched the searchable legal database covering major Indian laws, acts, and IPC sections with plain-language explanations and punishment details.',
      status: 'completed',
      tag: 'Feature'
    },
    {
      title: 'Lawyer Verification System',
      date: 'December 2025',
      desc: 'Implemented a multi-step verification flow for lawyers joining the platform. All listed professionals are now verified with Bar Council records.',
      status: 'completed',
      tag: 'Trust & Safety'
    },
    {
      title: 'Lawyer Dashboard (Beta)',
      date: 'Q2 2026',
      desc: 'A dedicated portal for lawyers to manage consultation requests, schedule meetings, track case inquiries, and build their public profile on NyAI.',
      status: 'pending',
      tag: 'Coming Soon'
    },
    {
      title: 'Multi-Language Support',
      date: 'Q2 2026',
      desc: 'Hindi, Tamil, Telugu, Marathi, and Bengali language support planned. Making NyAI accessible to citizens who are not comfortable in English.',
      status: 'pending',
      tag: 'Coming Soon'
    },
    {
      title: 'NyAI Mobile App (Android & iOS)',
      date: 'Q3 2026',
      desc: 'Native mobile application with push notifications, offline mode for common legal queries, and deeper integration with location services for lawyer discovery.',
      status: 'pending',
      tag: 'Coming Soon'
    },
    {
      title: 'Document Analysis',
      date: 'Q4 2026',
      desc: 'Upload a contract, legal notice, or FIR and let NyAI analyze it for key clauses, legal obligations, and potential red flags.',
      status: 'pending',
      tag: 'AI'
    },
  ];

  const completed = updates.filter(u => u.status === 'completed').length;
  const total = updates.length;

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
      {/* Header */}
      <section style={{ padding: '5rem 0 3rem' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="section-label">Product Roadmap</div>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
              Progress Updates
            </h1>
            <p style={{ color: 'var(--muted-foreground)', maxWidth: '580px', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              Follow our journey as we build the most comprehensive legal assistance platform for Indian citizens.
            </p>

            {/* Progress Bar */}
            <div className="glass-card" style={{ padding: '1.5rem 2rem', maxWidth: '480px', display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Platform Milestones</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)' }}>{completed}/{total}</span>
                </div>
                <div style={{ height: '6px', background: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(completed / total) * 100}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    style={{ height: '100%', background: 'var(--foreground)', borderRadius: '3px' }}
                  />
                </div>
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{Math.round((completed / total) * 100)}%</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: '2rem 0 8rem' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <div style={{ position: 'relative', paddingLeft: '3rem' }}>
            <div style={{ position: 'absolute', left: '11px', top: '12px', bottom: '12px', width: '2px', background: 'var(--border)' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {updates.map((update, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.07 }}
                  style={{ position: 'relative' }}
                >
                  {/* Timeline dot */}
                  <div style={{
                    position: 'absolute',
                    left: 'calc(-3rem - 1px)',
                    top: '1.5rem',
                    width: '24px',
                    height: '24px',
                    background: 'var(--background)',
                    border: `2px solid ${update.status === 'completed' ? 'var(--success)' : 'var(--border)'}`,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: update.status === 'completed' ? '#4ade80' : 'var(--muted-foreground)'
                  }}>
                    {update.status === 'completed'
                      ? <CheckCircle2 size={14} />
                      : <Circle size={14} />
                    }
                  </div>

                  <div className="glass-card" style={{ padding: '1.75rem 2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', gap: '1rem', flexWrap: 'wrap' }}>
                      <div>
                        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', marginBottom: '0.3rem' }}>
                          <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{update.title}</h3>
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem', flexShrink: 0 }}>
                        <span style={{
                          background: update.status === 'completed' ? 'rgba(74, 222, 128, 0.12)' : 'rgba(240,231,213,0.08)',
                          color: update.status === 'completed' ? '#4ade80' : 'var(--muted-foreground)',
                          border: `1px solid ${update.status === 'completed' ? 'rgba(74,222,128,0.3)' : 'var(--border)'}`,
                          padding: '0.2rem 0.6rem',
                          borderRadius: '2rem',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                        }}>
                          {update.status === 'completed' ? '✓ Completed' : '⏳ Planned'}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--muted-foreground)', fontSize: '0.8rem' }}>
                          <Clock size={12} /> {update.date}
                        </div>
                      </div>
                    </div>
                    <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.7, fontSize: '0.93rem' }}>{update.desc}</p>
                    <div style={{ marginTop: '1rem' }}>
                      <span style={{ background: 'var(--muted)', color: 'var(--muted-foreground)', padding: '0.2rem 0.65rem', borderRadius: '2rem', fontSize: '0.76rem' }}>
                        {update.tag}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card"
            style={{ marginTop: '4rem', padding: '2.5rem', textAlign: 'center' }}
          >
            <Rocket size={36} style={{ margin: '0 auto 1rem', opacity: 0.7 }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>Have a feature suggestion?</h3>
            <p style={{ color: 'var(--muted-foreground)', marginBottom: '1.75rem', maxWidth: '460px', margin: '0 auto 1.75rem', lineHeight: 1.65 }}>
              We build NyAI for citizens. If there's a legal feature you'd find useful, tell us and we'll prioritize it.
            </p>
            <Link to="/chat" className="btn-primary">
              Contact Us via Lawbot <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProgressUpdates;
