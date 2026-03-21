import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, Check } from 'lucide-react';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/chat');
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.85rem 1rem 0.85rem 2.75rem',
    background: '#111',
    border: '1px solid var(--border)',
    borderRadius: '0.5rem',
    color: '#fff',
    fontSize: '0.92rem',
  };

  const benefits = [
    'Free access to all AI legal tools',
    'Connect with verified lawyers',
    'Save and track your legal queries',
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 1.5rem' }}>
      <div className="responsive-grid-2" style={{ width: '100%', maxWidth: '800px', alignItems: 'center' }}>
        {/* Left side */}
        <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '1.25rem', marginBottom: '2.5rem' }}>
            NyAI
          </Link>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            Start your legal journey with confidence
          </h1>
          <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.7, marginBottom: '1.75rem', fontSize: '0.92rem' }}>
            Join 50,000+ Indians who use NyAI to understand their rights and navigate the legal system.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
            {benefits.map((b, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Check size={10} strokeWidth={3} style={{ color: '#fff' }} />
                </div>
                <span style={{ color: 'var(--muted-foreground)', fontSize: '0.88rem' }}>{b}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right side form */}
        <motion.div initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>Create your account</h2>
            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--muted-foreground)', display: 'block', marginBottom: '0.5rem', letterSpacing: '0.04em' }}>FULL NAME</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }} />
                  <input type="text" placeholder="John Doe" required style={inputStyle} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--muted-foreground)', display: 'block', marginBottom: '0.5rem', letterSpacing: '0.04em' }}>EMAIL ADDRESS</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }} />
                  <input type="email" placeholder="name@example.com" required style={inputStyle} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--muted-foreground)', display: 'block', marginBottom: '0.5rem', letterSpacing: '0.04em' }}>PASSWORD</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }} />
                  <input type={showPassword ? 'text' : 'password'} placeholder="Min. 8 characters" required style={inputStyle} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)', padding: 0 }}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', marginTop: '0.25rem', fontSize: '0.92rem' }}>
                Create Free Account <ArrowRight size={16} />
              </button>
            </form>

            <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
              <p style={{ color: 'var(--muted-foreground)', fontSize: '0.85rem' }}>
                Already have an account?{' '}
                <Link to="/login" style={{ color: '#fff', fontWeight: 600 }}>Sign in</Link>
              </p>
            </div>
          </div>

          <p style={{ textAlign: 'center', marginTop: '1.25rem', color: 'var(--muted-foreground)', fontSize: '0.78rem' }}>
            By signing up, you agree to our{' '}
            <Link to="/legal/terms-of-service" style={{ color: '#fff' }}>Terms</Link> and{' '}
            <Link to="/legal/privacy-policy" style={{ color: '#fff' }}>Privacy Policy</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
