import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, User, ArrowRight, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/chat');
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.85rem 1rem 0.85rem 3rem',
    background: 'var(--muted)',
    border: '1.5px solid var(--border)',
    borderRadius: '0.6rem',
    color: 'var(--foreground)',
    fontSize: '0.95rem',
  };

  const benefits = [
    'Free access to all AI legal tools',
    'Connect with verified lawyers',
    'Save and track your legal queries',
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 1.5rem' }}>
      <div className="responsive-grid-2" style={{ width: '100%', maxWidth: '820px', alignItems: 'center' }}>
        {/* Left side info */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.35rem', marginBottom: '2.5rem' }}>
            <Shield size={26} /> NyAI
          </Link>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            Start your legal journey with confidence
          </h1>
          <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.7, marginBottom: '2rem', fontSize: '0.95rem' }}>
            Join 50,000+ Indians who use NyAI to understand their rights and navigate the legal system easily.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {benefits.map((b, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <CheckCircle2 size={18} style={{ color: '#4ade80', flexShrink: 0 }} />
                <span style={{ color: 'var(--muted-foreground)', fontSize: '0.92rem' }}>{b}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right side form */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
          <div className="glass-card" style={{ padding: '2.25rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>Create your account</h2>
            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div>
                <label style={{ fontSize: '0.83rem', fontWeight: 600, color: 'var(--muted-foreground)', display: 'block', marginBottom: '0.5rem', letterSpacing: '0.02em' }}>FULL NAME</label>
                <div style={{ position: 'relative' }}>
                  <User size={17} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }} />
                  <input type="text" placeholder="John Doe" required style={inputStyle} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.83rem', fontWeight: 600, color: 'var(--muted-foreground)', display: 'block', marginBottom: '0.5rem', letterSpacing: '0.02em' }}>EMAIL ADDRESS</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={17} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }} />
                  <input type="email" placeholder="name@example.com" required style={inputStyle} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.83rem', fontWeight: 600, color: 'var(--muted-foreground)', display: 'block', marginBottom: '0.5rem', letterSpacing: '0.02em' }}>PASSWORD</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={17} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }} />
                  <input type={showPassword ? 'text' : 'password'} placeholder="Min. 8 characters" required style={inputStyle} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)', padding: 0 }}>
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.95rem', marginTop: '0.25rem', fontSize: '0.95rem' }}>
                Create Free Account <ArrowRight size={17} />
              </button>
            </form>

            <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
              <p style={{ color: 'var(--muted-foreground)', fontSize: '0.88rem' }}>
                Already have an account?{' '}
                <Link to="/login" style={{ color: 'var(--foreground)', fontWeight: 600 }}>Sign in</Link>
              </p>
            </div>
          </div>

          <p style={{ textAlign: 'center', marginTop: '1.25rem', color: 'var(--muted-foreground)', fontSize: '0.8rem' }}>
            By signing up, you agree to our{' '}
            <span style={{ color: 'var(--foreground)', cursor: 'pointer' }}>Terms</span> and{' '}
            <span style={{ color: 'var(--foreground)', cursor: 'pointer' }}>Privacy Policy</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
