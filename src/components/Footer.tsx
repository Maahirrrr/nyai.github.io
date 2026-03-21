import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer style={{
      background: 'var(--background-secondary)',
      borderTop: '1px solid var(--border)',
      paddingTop: '4rem',
    }}>
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', fontWeight: 800, fontSize: '1.2rem' }}>
              NyAI
            </div>
            <p style={{ color: 'var(--muted-foreground)', fontSize: '0.88rem', lineHeight: 1.75, maxWidth: '280px', marginBottom: '1.5rem' }}>
              Enterprise AI platform for legal research, contract analysis, and workflow automation.
            </p>
            <Link to="/register" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
              fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent)',
            }}>
              Request a Demo <ArrowRight size={14} />
            </Link>
          </div>

          {/* Product */}
          <div>
            <h4 style={{ fontWeight: 600, fontSize: '0.82rem', marginBottom: '1.25rem', letterSpacing: '0.08em', color: 'var(--muted-foreground)', textTransform: 'uppercase' }}>Product</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[
                { to: '/', label: 'Platform' },
                { to: '/lawyers', label: 'Lawyers Network' },
                { to: '/search', label: 'Legal Search' },
                { to: '/chat', label: 'AI Assistant' },
                { to: '/pricing', label: 'Pricing' },
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to} style={{ color: 'var(--muted-foreground)', fontSize: '0.85rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted-foreground)')}
                  >{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontWeight: 600, fontSize: '0.82rem', marginBottom: '1.25rem', letterSpacing: '0.08em', color: 'var(--muted-foreground)', textTransform: 'uppercase' }}>Company</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[
                { to: '/about', label: 'About Us' },
                { to: '/legal/privacy-policy', label: 'Privacy Policy' },
                { to: '/legal/terms-of-service', label: 'Terms of Service' },
                { to: '/legal/disclaimer', label: 'Disclaimer' },
              ].map(item => (
                <li key={item.to}>
                  <Link to={item.to} style={{ color: 'var(--muted-foreground)', fontSize: '0.85rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted-foreground)')}
                  >{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 style={{ fontWeight: 600, fontSize: '0.82rem', marginBottom: '1.25rem', letterSpacing: '0.08em', color: 'var(--muted-foreground)', textTransform: 'uppercase' }}>Resources</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[
                { to: '/login', label: 'Sign In' },
                { to: '/register', label: 'Request a Demo' },
                { to: '/legal/cookie-policy', label: 'Cookie Policy' },
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to} style={{ color: 'var(--muted-foreground)', fontSize: '0.85rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted-foreground)')}
                  >{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', paddingBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ color: 'var(--muted-foreground)', fontSize: '0.78rem' }}>
            © {new Date().getFullYear()} NyAI. All rights reserved.
          </span>
          <span style={{ color: 'var(--muted-foreground)', fontSize: '0.78rem' }}>
            Enterprise AI · Built for Legal · Made in India
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
