import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Phone, Mail, Briefcase, Award, Clock, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Lawyer {
  id: string;
  name: string;
  title: string;
  specialization: string[];
  location: string;
  experience: number;
  rating: number;
  reviews: number;
  bio: string;
  phone: string;
  email: string;
  availability: string;
  education: string;
  languages: string[];
  successRate: string;
}

const demoLawyers: Lawyer[] = [
  {
    id: '1', name: 'Adv. Prashant Mehta', title: 'Senior Criminal Defense Lawyer',
    specialization: ['Criminal Law', 'Bail Matters', 'FIR Defense'], location: 'Mumbai, Maharashtra',
    experience: 18, rating: 4.9, reviews: 312,
    bio: 'With 18+ years of experience at the Bombay High Court, Adv. Mehta has handled over 800 criminal cases, including complex multi-accused trials.',
    phone: '+91 98201 54321', email: 'prashant.mehta@nyai.in', availability: 'Mon–Sat, 10am–6pm',
    education: 'LLM (Criminal Law) – Mumbai University', languages: ['English', 'Hindi', 'Marathi'], successRate: '94%',
  },
  {
    id: '2', name: 'Adv. Sunita Rao', title: 'Family & Matrimonial Law Expert',
    specialization: ['Divorce', 'Child Custody', 'Domestic Violence'], location: 'Bangalore, Karnataka',
    experience: 12, rating: 4.8, reviews: 198,
    bio: 'Adv. Sunita Rao is a compassionate advocate specializing in family disputes and women\'s rights. She has successfully handled 500+ family matters.',
    phone: '+91 97410 88765', email: 'sunita.rao@nyai.in', availability: 'Mon–Fri, 9am–5pm',
    education: 'BA LLB – National Law School, Bangalore', languages: ['English', 'Kannada', 'Hindi'], successRate: '91%',
  },
  {
    id: '3', name: 'Adv. Rajiv Kapoor', title: 'Corporate & Contract Law Specialist',
    specialization: ['Corporate Law', 'Contract Disputes', 'Mergers & Acquisitions'], location: 'Delhi, NCT',
    experience: 22, rating: 4.7, reviews: 456,
    bio: 'Adv. Rajiv Kapoor is one of Delhi\'s most sought-after corporate lawyers with expertise in business law and M&A transactions.',
    phone: '+91 99110 23456', email: 'rajiv.kapoor@nyai.in', availability: 'Mon–Sat, 11am–7pm',
    education: 'LLM (Corporate Law) – Delhi University', languages: ['English', 'Hindi', 'Punjabi'], successRate: '89%',
  },
  {
    id: '4', name: 'Adv. Meera Krishnaswamy', title: 'Property & Real Estate Lawyer',
    specialization: ['Property Law', 'Land Disputes', 'RERA Matters'], location: 'Chennai, Tamil Nadu',
    experience: 15, rating: 4.9, reviews: 271,
    bio: 'Adv. Meera is an authority on real estate law in South India, handling RERA disputes, title verification, and landlord-tenant matters.',
    phone: '+91 98400 67890', email: 'meera.krishnaswamy@nyai.in', availability: 'Tue–Sun, 10am–5pm',
    education: 'BA LLB – School of Excellence in Law, Chennai', languages: ['English', 'Tamil', 'Telugu'], successRate: '96%',
  },
  {
    id: '5', name: 'Adv. Arjun Singh Bhatia', title: 'Cyber & IT Law Advocate',
    specialization: ['Cyber Crime', 'Data Protection', 'IT Act Cases'], location: 'Hyderabad, Telangana',
    experience: 9, rating: 4.8, reviews: 142,
    bio: 'A new-age tech-savvy lawyer, Adv. Arjun specializes in cyber crime, online fraud, identity theft, and digital defamation cases.',
    phone: '+91 96000 11223', email: 'arjun.bhatia@nyai.in', availability: 'Mon–Fri, 10am–6pm',
    education: 'LLM (IT Law) – NALSAR University, Hyderabad', languages: ['English', 'Hindi', 'Telugu'], successRate: '88%',
  },
];

const LawyerCard: React.FC<{ lawyer: Lawyer; index: number }> = ({ lawyer, index }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="glass-card"
      style={{ padding: '1.75rem' }}
    >
      {/* Top Row */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
        {/* Avatar */}
        <div style={{
          width: '56px', height: '56px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.3rem', fontWeight: 700, flexShrink: 0,
          color: '#fff'
        }}>
          {lawyer.name.split(' ')[1]?.charAt(0) ?? lawyer.name.charAt(0)}
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div>
              <h3 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.15rem', color: '#fff' }}>{lawyer.name}</h3>
              <p style={{ color: 'var(--muted-foreground)', fontSize: '0.82rem', fontWeight: 400 }}>{lawyer.title}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: 'rgba(255,255,255,0.06)', borderRadius: '0.4rem', padding: '0.3rem 0.6rem', border: '1px solid var(--border)', flexShrink: 0 }}>
              <Star size={12} fill="rgba(255,255,255,0.7)" color="rgba(255,255,255,0.7)" />
              <span style={{ fontWeight: 600, fontSize: '0.85rem', color: '#fff' }}>{lawyer.rating}</span>
              <span style={{ color: 'var(--muted-foreground)', fontSize: '0.75rem' }}>({lawyer.reviews})</span>
            </div>
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.65rem' }}>
            {lawyer.specialization.map(s => (
              <span key={s} style={{
                background: 'rgba(255,255,255,0.06)',
                color: '#fff',
                border: '1px solid var(--border)',
                padding: '0.15rem 0.55rem', borderRadius: '2rem',
                fontSize: '0.7rem', fontWeight: 500
              }}>{s}</span>
            ))}
          </div>

          {/* Meta */}
          <div style={{ display: 'flex', gap: '1.25rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--muted-foreground)', fontSize: '0.8rem' }}>
              <MapPin size={12} /> {lawyer.location}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--muted-foreground)', fontSize: '0.8rem' }}>
              <Briefcase size={12} /> {lawyer.experience} yrs
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--muted-foreground)', fontSize: '0.8rem' }}>
              <Award size={12} /> {lawyer.successRate}
            </div>
          </div>
        </div>
      </div>

      {/* Expandable */}
      <motion.div
        initial={false}
        animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
        style={{ overflow: 'hidden' }}
        transition={{ duration: 0.3 }}
      >
        <div style={{ paddingTop: '1.25rem', borderTop: '1px solid var(--border)', marginTop: '1.25rem' }}>
          <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.7, fontSize: '0.88rem', marginBottom: '1rem' }}>{lawyer.bio}</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.65rem', marginBottom: '1.25rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '0.6rem', padding: '0.75rem 0.85rem', border: '1px solid var(--border)' }}>
              <p style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.2rem' }}>Education</p>
              <p style={{ fontSize: '0.85rem', fontWeight: 500, color: '#fff' }}>{lawyer.education}</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '0.6rem', padding: '0.75rem 0.85rem', border: '1px solid var(--border)' }}>
              <p style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.2rem' }}>Languages</p>
              <p style={{ fontSize: '0.85rem', fontWeight: 500, color: '#fff' }}>{lawyer.languages.join(', ')}</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '0.6rem', padding: '0.75rem 0.85rem', border: '1px solid var(--border)' }}>
              <p style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.2rem' }}>Availability</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', fontWeight: 500, color: '#fff' }}>
                <Clock size={12} /> {lawyer.availability}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a href={`tel:${lawyer.phone}`} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.82rem', borderRadius: '999px' }}>
              <Phone size={13} /> {lawyer.phone}
            </a>
            <a href={`mailto:${lawyer.email}`} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.82rem', borderRadius: '999px' }}>
              <Mail size={13} /> Email
            </a>
          </div>
        </div>
      </motion.div>

      {/* Toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          marginTop: '1rem', color: 'var(--muted-foreground)', fontSize: '0.8rem',
          display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 500,
          transition: 'color 0.2s', padding: 0,
        }}
        onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted-foreground)')}
      >
        {expanded ? <><ChevronUp size={14} /> Hide Details</> : <><ChevronDown size={14} /> View Details & Contact</>}
      </button>
    </motion.div>
  );
};

const Lawyers: React.FC = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 25 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Hero */}
      <section style={{ padding: '6rem 0', textAlign: 'center' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="section-label">Verified Legal Experts</div>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 700, marginBottom: '1.5rem',
              letterSpacing: '-0.03em', lineHeight: 1.1,
            }}>
              Find the Right Lawyer<br />For Your Case
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--muted-foreground)', maxWidth: '580px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
              Our network of verified, experienced lawyers across India are ready to help you navigate your legal journey.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link to="/chat" className="btn-primary" style={{ padding: '0.85rem 1.75rem', fontSize: '0.95rem' }}>
                Get AI-Matched <ArrowRight size={16} />
              </Link>
              <Link to="/search" className="btn-secondary" style={{ padding: '0.85rem 1.75rem', fontSize: '0.95rem' }}>
                Search by Specialty
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '2.5rem 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1.5rem', textAlign: 'center' }}>
            {[
              { value: '1,200+', label: 'Verified Lawyers' },
              { value: '28', label: 'States Covered' },
              { value: '50+', label: 'Practice Areas' },
              { value: '4.8★', label: 'Average Rating' },
            ].map((stat, idx) => (
              <motion.div key={idx} {...fadeInUp} transition={{ delay: idx * 0.06 }}>
                <div style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.25rem', color: '#fff' }}>{stat.value}</div>
                <div style={{ color: 'var(--muted-foreground)', fontSize: '0.82rem' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lawyers List */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <motion.div {...fadeInUp} style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <div className="section-label">Our Network</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
              Featured Lawyers
            </h2>
            <p style={{ color: 'var(--muted-foreground)', marginTop: '1rem', maxWidth: '480px', margin: '1rem auto 0', lineHeight: 1.7, fontSize: '0.92rem' }}>
              All lawyers in our network are verified for credentials, bar council registration, and client reviews.
            </p>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {demoLawyers.map((lawyer, idx) => (
              <LawyerCard key={lawyer.id} lawyer={lawyer} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '6rem 0', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <motion.div {...fadeInUp}>
            <div className="section-label">Need Help Choosing?</div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 700, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
              Let AI match you with the perfect lawyer
            </h2>
            <p style={{ color: 'var(--muted-foreground)', marginBottom: '2rem', maxWidth: '480px', margin: '0 auto 2rem', lineHeight: 1.7, fontSize: '0.92rem' }}>
              Describe your issue to NyAI and get instantly matched with verified lawyers specializing in your exact matter.
            </p>
            <Link to="/chat" className="btn-primary" style={{ fontSize: '1rem', padding: '0.9rem 2rem' }}>
              Start with AI Lawbot <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Lawyers;
