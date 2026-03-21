import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleLogin = (e: React.FormEvent) => {
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

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 1.5rem' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '2.5rem' }}
        >
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '1.25rem', marginBottom: '2rem' }}>
            NyAI
          </Link>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Welcome back</h1>
          <p style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem' }}>Sign in to access your legal assistant</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card"
          style={{ padding: '2rem' }}
        >
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--muted-foreground)', display: 'block', marginBottom: '0.5rem', letterSpacing: '0.04em' }}>
                EMAIL ADDRESS
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }} />
                <input type="email" placeholder="name@example.com" required style={inputStyle} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--muted-foreground)', letterSpacing: '0.04em' }}>PASSWORD</label>
                <span style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)', cursor: 'pointer' }}>Forgot password?</span>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }} />
                <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" required style={inputStyle} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)', padding: 0 }}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', marginTop: '0.25rem', fontSize: '0.92rem' }}>
              Sign In <ArrowRight size={16} />
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
            <p style={{ color: 'var(--muted-foreground)', fontSize: '0.85rem' }}>
              Don't have an account?{' '}
              <Link to="/register" style={{ color: '#fff', fontWeight: 600 }}>Create one free</Link>
            </p>
          </div>
        </motion.div>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--muted-foreground)', fontSize: '0.78rem' }}>
          By continuing, you agree to our{' '}
          <Link to="/legal/terms-of-service" style={{ color: '#fff' }}>Terms of Service</Link> and{' '}
          <Link to="/legal/privacy-policy" style={{ color: '#fff' }}>Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
