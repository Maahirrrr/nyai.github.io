import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer style={{ 
      background: 'rgba(25, 25, 28, 0.45)', 
      backdropFilter: 'blur(40px) saturate(220%)', 
      WebkitBackdropFilter: 'blur(40px) saturate(220%)', 
      borderTop: '1px solid var(--border)', 
      borderTopLeftRadius: '3rem', 
      borderTopRightRadius: '3rem', 
      paddingTop: '5rem',
      marginTop: '4rem' 
    }}>
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem', fontWeight: 800, fontSize: '1.2rem' }}>
              <Shield size={22} />
              NyAI
            </div>
            <p style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: '300px' }}>
              India's leading AI-powered legal assistance platform. Making justice accessible for every citizen.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '1.25rem', letterSpacing: '0.04em' }}>Product</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {[
                { to: '/', label: 'Home' },
                { to: '/lawyers', label: 'Lawyers' },
                { to: '/search', label: 'Legal Search' },
                { to: '/chat', label: 'NyAI Lawbot' },
                { to: '/pricing', label: 'Pricing' },
                { to: '/about', label: 'About Us' },
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to} style={{ color: 'var(--muted-foreground)', fontSize: '0.88rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--foreground)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted-foreground)')}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '1.25rem', letterSpacing: '0.04em' }}>Legal</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {[
                { to: '/legal/privacy-policy', label: 'Privacy Policy' },
                { to: '/legal/terms-of-service', label: 'Terms of Service' },
                { to: '/legal/disclaimer', label: 'Disclaimer' },
                { to: '/legal/cookie-policy', label: 'Cookie Policy' },
              ].map(item => (
                <li key={item.to}>
                  <Link to={item.to} style={{ color: 'var(--muted-foreground)', fontSize: '0.88rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--foreground)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted-foreground)')}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '1.25rem', letterSpacing: '0.04em' }}>Account</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {[
                { to: '/login', label: 'Sign In' },
                { to: '/register', label: 'Create Account' },
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to} style={{ color: 'var(--muted-foreground)', fontSize: '0.88rem' }}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.75rem', paddingBottom: '1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ color: 'var(--muted-foreground)', fontSize: '0.82rem' }}>
            © {new Date().getFullYear()} NyAI. All rights reserved.
          </span>
          <span style={{ color: 'var(--muted-foreground)', fontSize: '0.82rem' }}>
            Built for Justice · Made in India 🇮🇳
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
