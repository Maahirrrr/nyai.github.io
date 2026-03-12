import React from 'react';
import { Phone, Mail, MapPin, Briefcase, Languages } from 'lucide-react';
import type { Lawyer } from '../data/lawyers';

interface LawyerCardProps {
  lawyer: Lawyer;
}

const LawyerCard: React.FC<LawyerCardProps> = ({ lawyer }) => {
  return (
    <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1rem', transition: 'all 0.3s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>{lawyer.name}</h3>
          <p style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem' }}>{lawyer.specialization.join(', ')}</p>
        </div>
        <div style={{ background: 'var(--foreground)', color: 'var(--background)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: 700 }}>
          {lawyer.experience} YRS EXP
        </div>
      </div>
      
      <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.5, color: 'var(--muted-foreground)' }}>
        {lawyer.bio}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--muted-foreground)' }}>
          <MapPin size={16} /> <span>{lawyer.location}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--muted-foreground)' }}>
          <Briefcase size={16} /> <span>{lawyer.fees}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--muted-foreground)' }}>
          <Languages size={16} /> <span>{lawyer.languages.slice(0, 2).join(', ')}</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button 
          onClick={() => window.open(`tel:${lawyer.phone}`)}
          className="btn-primary" 
          style={{ flex: 1, padding: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}
        >
          <Phone size={14} /> Call
        </button>
        <button 
          onClick={() => window.open(`mailto:${lawyer.email}`)}
          className="btn-secondary" 
          style={{ flex: 1, padding: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}
        >
          <Mail size={14} /> Email
        </button>
      </div>
    </div>
  );
};

export default LawyerCard;
