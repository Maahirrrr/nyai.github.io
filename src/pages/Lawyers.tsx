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
    id: '1',
    name: 'Adv. Prashant Mehta',
    title: 'Senior Criminal Defense Lawyer',
    specialization: ['Criminal Law', 'Bail Matters', 'FIR Defense'],
    location: 'Mumbai, Maharashtra',
    experience: 18,
    rating: 4.9,
    reviews: 312,
    bio: 'With 18+ years of experience at the Bombay High Court, Adv. Mehta has handled over 800 criminal cases, including complex multi-accused trials. Known for his meticulous legal strategy and persuasive courtroom presence.',
    phone: '+91 98201 54321',
    email: 'prashant.mehta@nyai.in',
    availability: 'Mon–Sat, 10am–6pm',
    education: 'LLM (Criminal Law) – Mumbai University',
    languages: ['English', 'Hindi', 'Marathi'],
    successRate: '94%',
  },
  {
    id: '2',
    name: 'Adv. Sunita Rao',
    title: 'Family & Matrimonial Law Expert',
    specialization: ['Divorce', 'Child Custody', 'Domestic Violence'],
    location: 'Bangalore, Karnataka',
    experience: 12,
    rating: 4.8,
    reviews: 198,
    bio: 'Adv. Sunita Rao is a compassionate advocate specializing in family disputes and women\'s rights. She has successfully handled 500+ family matters at the Karnataka High Court and is a certified mediator.',
    phone: '+91 97410 88765',
    email: 'sunita.rao@nyai.in',
    availability: 'Mon–Fri, 9am–5pm',
    education: 'BA LLB – National Law School, Bangalore',
    languages: ['English', 'Kannada', 'Hindi'],
    successRate: '91%',
  },
  {
    id: '3',
    name: 'Adv. Rajiv Kapoor',
    title: 'Corporate & Contract Law Specialist',
    specialization: ['Corporate Law', 'Contract Disputes', 'Mergers & Acquisitions'],
    location: 'Delhi, NCT',
    experience: 22,
    rating: 4.7,
    reviews: 456,
    bio: 'Adv. Rajiv Kapoor is one of Delhi\'s most sought-after corporate lawyers with expertise in business law, shareholder disputes, and M&A transactions. He advises startups, MSMEs, and Fortune 500 companies alike.',
    phone: '+91 99110 23456',
    email: 'rajiv.kapoor@nyai.in',
    availability: 'Mon–Sat, 11am–7pm',
    education: 'LLM (Corporate Law) – Delhi University',
    languages: ['English', 'Hindi', 'Punjabi'],
    successRate: '89%',
  },
  {
    id: '4',
    name: 'Adv. Meera Krishnaswamy',
    title: 'Property & Real Estate Lawyer',
    specialization: ['Property Law', 'Land Disputes', 'RERA Matters'],
    location: 'Chennai, Tamil Nadu',
    experience: 15,
    rating: 4.9,
    reviews: 271,
    bio: 'Adv. Meera is an authority on real estate law in South India, handling RERA disputes, title verification, encumbrance issues, and landlord-tenant matters. She has won landmark judgements in the Madras High Court.',
    phone: '+91 98400 67890',
    email: 'meera.krishnaswamy@nyai.in',
    availability: 'Tue–Sun, 10am–5pm',
    education: 'BA LLB – School of Excellence in Law, Chennai',
    languages: ['English', 'Tamil', 'Telugu'],
    successRate: '96%',
  },
  {
    id: '5',
    name: 'Adv. Arjun Singh Bhatia',
    title: 'Cyber & IT Law Advocate',
    specialization: ['Cyber Crime', 'Data Protection', 'IT Act Cases'],
    location: 'Hyderabad, Telangana',
    experience: 9,
    rating: 4.8,
    reviews: 142,
    bio: 'A new-age tech-savvy lawyer, Adv. Arjun specializes in cyber crime, online fraud, identity theft, and digital defamation cases. He advises individuals, startups, and enterprises on IT Act compliance and data privacy under DPDP Act 2023.',
    phone: '+91 96000 11223',
    email: 'arjun.bhatia@nyai.in',
    availability: 'Mon–Fri, 10am–6pm',
    education: 'LLM (IT Law) – NALSAR University, Hyderabad',
    languages: ['English', 'Hindi', 'Telugu'],
    successRate: '88%',
  },
];

const LawyerCard: React.FC<{ lawyer: Lawyer; index: number }> = ({ lawyer, index }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className="glass-card"
      style={{ padding: '2rem', overflow: 'hidden' }}
    >
      {/* Top Row */}
      <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
        {/* Avatar */}
        <div style={{
          width: '72px', height: '72px', borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent-dim), var(--muted))',
          border: '2px solid var(--glass-border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.6rem', fontWeight: 800, flexShrink: 0,
          color: 'var(--foreground)'
        }}>
          {lawyer.name.split(' ')[1]?.charAt(0) ?? lawyer.name.charAt(0)}
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
            <div>
              <h3 style={{ fontWeight: 800, fontSize: '1.15rem', marginBottom: '0.2rem' }}>{lawyer.name}</h3>
              <p style={{ color: 'var(--muted-foreground)', fontSize: '0.85rem', fontWeight: 500 }}>{lawyer.title}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(255,255,255,0.06)', borderRadius: '0.5rem', padding: '0.35rem 0.75rem', border: '1px solid var(--glass-border)', flexShrink: 0 }}>
              <Star size={14} fill="var(--amber)" color="var(--amber)" />
              <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{lawyer.rating}</span>
              <span style={{ color: 'var(--muted-foreground)', fontSize: '0.8rem' }}>({lawyer.reviews})</span>
            </div>
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.75rem' }}>
            {lawyer.specialization.map(s => (
              <span key={s} style={{
                background: 'rgba(122, 160, 255, 0.1)',
                color: 'var(--accent-blue)',
                border: '1px solid rgba(122, 160, 255, 0.25)',
                padding: '0.2rem 0.65rem', borderRadius: '2rem',
                fontSize: '0.73rem', fontWeight: 600
              }}>{s}</span>
            ))}
          </div>

          {/* Meta */}
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.85rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--muted-foreground)', fontSize: '0.82rem' }}>
              <MapPin size={13} /> {lawyer.location}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--muted-foreground)', fontSize: '0.82rem' }}>
              <Briefcase size={13} /> {lawyer.experience} yrs experience
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--muted-foreground)', fontSize: '0.82rem' }}>
              <Award size={13} /> {lawyer.successRate} success rate
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Details */}
      <motion.div
        initial={false}
        animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
        style={{ overflow: 'hidden' }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
      >
        <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--border)', marginTop: '1.5rem' }}>
          <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.75, fontSize: '0.9rem', marginBottom: '1.25rem' }}>{lawyer.bio}</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem', marginBottom: '1.5rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.15)', borderRadius: '0.75rem', padding: '0.85rem 1rem' }}>
              <p style={{ fontSize: '0.73rem', color: 'var(--muted-foreground)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>Education</p>
              <p style={{ fontSize: '0.88rem', fontWeight: 500 }}>{lawyer.education}</p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.15)', borderRadius: '0.75rem', padding: '0.85rem 1rem' }}>
              <p style={{ fontSize: '0.73rem', color: 'var(--muted-foreground)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>Languages</p>
              <p style={{ fontSize: '0.88rem', fontWeight: 500 }}>{lawyer.languages.join(', ')}</p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.15)', borderRadius: '0.75rem', padding: '0.85rem 1rem' }}>
              <p style={{ fontSize: '0.73rem', color: 'var(--muted-foreground)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>Availability</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem', fontWeight: 500 }}>
                <Clock size={13} /> {lawyer.availability}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a href={`tel:${lawyer.phone}`} className="btn-secondary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <Phone size={14} /> {lawyer.phone}
            </a>
            <a href={`mailto:${lawyer.email}`} className="btn-secondary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <Mail size={14} /> Email
            </a>
          </div>
        </div>
      </motion.div>

      {/* Toggle Button */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          marginTop: '1.25rem',
          background: 'none',
          border: 'none',
          color: 'var(--muted-foreground)',
          fontSize: '0.82rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          cursor: 'pointer',
          fontWeight: 600,
          transition: 'color 0.2s',
          padding: 0,
        }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--foreground)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted-foreground)')}
      >
        {expanded ? <><ChevronUp size={15} /> Hide Details</> : <><ChevronDown size={15} /> View Details & Contact</>}
      </button>
    </motion.div>
  );
};

const Lawyers: React.FC = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Hero */}
      <section style={{ padding: '6rem 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(122, 160, 255, 0.07) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="section-label">Verified Legal Experts</div>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 800, marginBottom: '1.5rem',
              letterSpacing: '-0.03em', lineHeight: 1.1,
              fontFamily: '"Playfair Display", Georgia, serif'
            }}>
              Find the Right Lawyer<br />
              <span style={{ WebkitTextStroke: '1.5px var(--foreground)', color: 'transparent' }}>
                For Your Case
              </span>
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--muted-foreground)', maxWidth: '620px', margin: '0 auto 2.5rem', lineHeight: 1.75 }}>
              Our network of verified, experienced lawyers across India are ready to help you navigate your legal journey with confidence and clarity.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/chat" className="btn-primary">
                Get AI-Matched <ArrowRight size={16} />
              </Link>
              <Link to="/search" className="btn-secondary">
                Search by Specialty
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{ padding: '2.5rem 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'rgba(0,0,0,0.2)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', textAlign: 'center' }}>
            {[
              { value: '1,200+', label: 'Verified Lawyers' },
              { value: '28', label: 'States Covered' },
              { value: '50+', label: 'Practice Areas' },
              { value: '4.8★', label: 'Average Rating' },
            ].map((stat, idx) => (
              <motion.div key={idx} {...fadeInUp} transition={{ delay: idx * 0.07 }}>
                <div style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.3rem' }}>{stat.value}</div>
                <div style={{ color: 'var(--muted-foreground)', fontSize: '0.85rem' }}>{stat.label}</div>
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
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
              Featured Lawyers
            </h2>
            <p style={{ color: 'var(--muted-foreground)', marginTop: '1rem', maxWidth: '520px', margin: '1rem auto 0', lineHeight: 1.7 }}>
              All lawyers in our network are verified for credentials, bar council registration, and client reviews.
            </p>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {demoLawyers.map((lawyer, idx) => (
              <LawyerCard key={lawyer.id} lawyer={lawyer} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '6rem 0', textAlign: 'center', background: 'rgba(0,0,0,0.2)' }}>
        <div className="container">
          <motion.div {...fadeInUp}>
            <div className="section-label">Need Help Choosing?</div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)', fontWeight: 800, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
              Let AI match you with the perfect lawyer
            </h2>
            <p style={{ color: 'var(--muted-foreground)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
              Describe your issue to NyAI and get instantly matched with verified lawyers specializing in your exact matter.
            </p>
            <Link to="/chat" className="btn-primary" style={{ fontSize: '1rem', padding: '1rem 2rem' }}>
              Start with AI Lawbot <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Lawyers;
