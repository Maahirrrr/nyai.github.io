import React from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const legalContent: Record<string, { title: string; lastUpdated: string; sections: { heading: string; body: string }[] }> = {
  'privacy-policy': {
    title: 'Privacy Policy',
    lastUpdated: 'March 10, 2026',
    sections: [
      {
        heading: 'Information We Collect',
        body: 'We collect information you provide directly, such as your name, email address, and location when you create an account. When you use NyAI\'s legal analysis tools, we process the text of your queries to provide accurate legal information. We also automatically collect usage data, device information, and IP addresses to improve our services.',
      },
      {
        heading: 'How We Use Your Information',
        body: 'Your information is used to provide and improve our AI legal analysis services, match you with verified lawyers in your area, personalize your experience, and communicate important service updates. We never sell your personal data to third parties.',
      },
      {
        heading: 'Data Security',
        body: 'We employ enterprise-grade encryption (AES-256) for data at rest and TLS 1.3 for data in transit. All legal queries are processed in secure, isolated environments. We conduct regular security audits and penetration testing to ensure your data remains protected.',
      },
      {
        heading: 'Data Retention',
        body: 'Your account data is retained as long as your account is active. Legal query history is stored for 12 months to enable case tracking, after which it is automatically anonymized. You may request deletion of your data at any time through your account settings.',
      },
      {
        heading: 'Third-Party Sharing',
        body: 'We share your information only with verified lawyers you choose to connect with, and only the details necessary for your consultation. We may also share anonymized, aggregated data with research partners to improve legal AI technology in India.',
      },
      {
        heading: 'Your Rights',
        body: 'Under applicable Indian data protection laws, you have the right to access, correct, or delete your personal data. You can export your data at any time. To exercise these rights, contact us at privacy@nyai.in.',
      },
    ],
  },
  'terms-of-service': {
    title: 'Terms of Service',
    lastUpdated: 'March 10, 2026',
    sections: [
      {
        heading: 'Acceptance of Terms',
        body: 'By accessing or using NyAI\'s platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. We reserve the right to modify these terms at any time, and continued use constitutes acceptance of updated terms.',
      },
      {
        heading: 'Nature of Service',
        body: 'NyAI provides AI-powered legal information and lawyer matching services. Our AI analysis is intended for informational purposes only and does not constitute legal advice. NyAI is not a law firm, does not provide legal representation, and no attorney-client relationship is formed through use of our platform.',
      },
      {
        heading: 'User Accounts',
        body: 'You are responsible for maintaining the confidentiality of your account credentials. You must provide accurate and complete information during registration. You must be at least 18 years old to use NyAI. One person may not maintain more than one account.',
      },
      {
        heading: 'Acceptable Use',
        body: 'You agree not to use NyAI for any unlawful purpose, to harass or harm others, to submit false or misleading information, or to attempt to gain unauthorized access to our systems. Misuse of the platform may result in immediate account termination.',
      },
      {
        heading: 'Lawyer Network',
        body: 'Lawyers listed on NyAI are independent professionals verified for bar council registration and credentials. NyAI facilitates connections but is not responsible for the quality of legal services provided by individual lawyers. Any engagement with a lawyer is a separate agreement between you and the lawyer.',
      },
      {
        heading: 'Limitation of Liability',
        body: 'NyAI shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform. Our total liability shall not exceed the amount paid by you in the 12 months preceding the claim. This limitation applies to the fullest extent permitted by Indian law.',
      },
    ],
  },
  disclaimer: {
    title: 'Disclaimer',
    lastUpdated: 'March 10, 2026',
    sections: [
      {
        heading: 'Not Legal Advice',
        body: 'The information provided by NyAI, including AI-generated legal analysis, IPC section identification, and recommended actions, is for general informational purposes only. It should not be construed as legal advice. Every legal situation is unique, and outcomes depend on specific facts and circumstances that AI cannot fully evaluate.',
      },
      {
        heading: 'No Attorney-Client Relationship',
        body: 'Use of NyAI does not create an attorney-client relationship between you and NyAI or any lawyer listed on our platform. An attorney-client relationship is only formed when you directly engage a lawyer and both parties agree to the representation.',
      },
      {
        heading: 'Accuracy of Information',
        body: 'While we strive to keep our legal database accurate and up-to-date with the latest amendments to Indian law, we make no warranties or representations about the completeness, accuracy, or reliability of the information provided. Laws change frequently, and interpretations may vary across jurisdictions.',
      },
      {
        heading: 'Consult a Professional',
        body: 'We strongly recommend consulting a qualified, licensed advocate before making any legal decisions or taking legal action based on information obtained through NyAI. For urgent legal matters, always seek immediate professional counsel.',
      },
      {
        heading: 'Jurisdictional Limitations',
        body: 'NyAI\'s analysis is based on Indian law, including central and state-level legislation. It may not account for local bylaws, recent court orders, or jurisdiction-specific interpretations. Users outside India should seek legal counsel in their respective jurisdictions.',
      },
    ],
  },
  'cookie-policy': {
    title: 'Cookie Policy',
    lastUpdated: 'March 10, 2026',
    sections: [
      {
        heading: 'What Are Cookies',
        body: 'Cookies are small text files stored on your device when you visit our website. They help us provide a better user experience by remembering your preferences, keeping you signed in, and understanding how you use our platform.',
      },
      {
        heading: 'Essential Cookies',
        body: 'These cookies are necessary for the website to function properly. They enable core features such as user authentication, session management, and security. You cannot opt out of essential cookies as the platform cannot function without them.',
      },
      {
        heading: 'Analytics Cookies',
        body: 'We use analytics cookies to understand how visitors interact with NyAI. This includes pages visited, time spent on the platform, and feature usage patterns. This data is aggregated and anonymized, helping us improve our services.',
      },
      {
        heading: 'Preference Cookies',
        body: 'These cookies remember your settings and preferences, such as language selection, theme preferences, and your location for lawyer matching. They enhance your experience by providing personalized content.',
      },
      {
        heading: 'Managing Cookies',
        body: 'You can control and manage cookies through your browser settings. Most browsers allow you to block or delete cookies. However, please note that disabling certain cookies may limit the functionality of NyAI. For detailed instructions, refer to your browser\'s help documentation.',
      },
      {
        heading: 'Updates to This Policy',
        body: 'We may update this Cookie Policy from time to time to reflect changes in our practices or applicable regulations. We will notify you of significant changes through our platform or via email.',
      },
    ],
  },
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const Legal: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const page = slug ? legalContent[slug] : null;

  if (!page) {
    return (
      <div style={{ paddingTop: '80px', textAlign: 'center', padding: '12rem 2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>Page Not Found</h1>
        <p style={{ color: 'var(--muted-foreground)', marginBottom: '2rem' }}>The legal page you're looking for doesn't exist.</p>
        <Link to="/" className="btn-primary">Go Home</Link>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Header */}
      <section style={{ padding: '5rem 0 3rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="container" style={{ maxWidth: '780px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--muted-foreground)', fontSize: '0.85rem', marginBottom: '2rem', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--foreground)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted-foreground)')}
            >
              <ArrowLeft size={15} /> Back to Home
            </Link>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1rem', fontFamily: '"Playfair Display", Georgia, serif' }}>
              {page.title}
            </h1>
            <p style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem' }}>
              Last updated: {page.lastUpdated}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: '2rem 0 8rem' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {page.sections.map((section, idx) => (
              <motion.div key={idx} {...fadeInUp} transition={{ duration: 0.5, delay: idx * 0.06 }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1rem', letterSpacing: '-0.01em' }}>
                  {section.heading}
                </h2>
                <p style={{ color: 'var(--muted-foreground)', lineHeight: 1.85, fontSize: '0.95rem' }}>
                  {section.body}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Contact info */}
          <motion.div {...fadeInUp} style={{ marginTop: '5rem', padding: '2rem', borderTop: '1px solid var(--border)' }}>
            <p style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem', lineHeight: 1.75 }}>
              If you have any questions about this {page.title.toLowerCase()}, please contact us at{' '}
              <span style={{ color: 'var(--foreground)', fontWeight: 600 }}>legal@nyai.in</span>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Legal;
