import re

html = open('index.html', 'r', encoding='utf-8').read()

# 1. Inject Theme Dark CSS
css_dark = """
/* DARK THEME */
.theme-dark { background: var(--navy); color: var(--white); }
.theme-dark .section-h2, .theme-dark .hero-h1, .theme-dark h3, .theme-dark .hc-title, .theme-dark .value-h3, .theme-dark .security-h3, .theme-dark .team-name, .theme-dark .blog-title, .theme-dark .price-amount, .theme-dark .nav-logo { color: var(--white); }
.theme-dark .section-sub, .theme-dark .hero-sub, .theme-dark .feat-p, .theme-dark .how-step p, .theme-dark .value-p, .theme-dark .security-p, .theme-dark .team-bio, .theme-dark .blog-excerpt, .theme-dark .price-desc, .theme-dark .price-period { color: rgba(255,255,255,0.65); }
.theme-dark .feat-card, .theme-dark .how-step, .theme-dark .testi-card, .theme-dark .security-card, .theme-dark .value-card, .theme-dark .team-card, .theme-dark .price-card:not(.pop), .theme-dark .blog-card, .theme-dark .hero-stat, .theme-dark .hero-card, .theme-dark .cert-badge { background: var(--navy2); border-color: rgba(255,255,255,0.1); }
.theme-dark .feat-card:hover, .theme-dark .how-step:hover, .theme-dark .testi-card:hover, .theme-dark .security-card:hover, .theme-dark .team-card:hover, .theme-dark .blog-card:hover, .theme-dark .cert-badge:hover, .theme-dark .price-card:not(.pop):hover { border-color: var(--blue); background: #232326; box-shadow: 0 8px 32px rgba(0,0,0,0.5); }
.theme-dark .hero-badge, .theme-dark .hc-badge, .theme-dark .how-step-num, .theme-dark .blog-cat, .theme-dark .price-tag, .theme-dark .price-period { background: rgba(0,102,255,0.15); color: #99BBFF; border-color: rgba(0,102,255,0.2); }
.theme-dark .btn-outline { background: transparent; border-color: rgba(255,255,255,0.2); color: var(--white); }
.theme-dark .btn-outline:hover { background: rgba(255,255,255,0.05); border-color: var(--white); }
.theme-dark .trusted-logos div { color: rgba(255,255,255,0.3); }
.theme-dark .trusted-logos div:hover { color: rgba(255,255,255,0.7); }
.theme-dark .feat-icon, .theme-dark .security-icon { background: rgba(0,102,255,0.1); }
.theme-dark .testi-quote { color: rgba(255,255,255,0.9); }
.theme-dark .sec-badge { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1); color: rgba(255,255,255,0.6); }
.theme-dark .sec-badge:hover { color: var(--blue); border-color: var(--blue); }
.theme-dark .hc-query { background: rgba(255,255,255,0.03); border-color: rgba(255,255,255,0.1); color: rgba(255,255,255,0.7); }
.theme-dark .hc-item { background: rgba(0,102,255,0.08); }
.theme-dark .hci-text { color: rgba(255,255,255,0.8); }
.theme-dark .pbtn-o { color: var(--white); border-color: rgba(255,255,255,0.2); }
.theme-dark .pbtn-o:hover { border-color: var(--white); background: rgba(255,255,255,0.05); }
.theme-dark .price-compare td { color: rgba(255,255,255,0.7); border-color: rgba(255,255,255,0.08); }
.theme-dark .price-compare tr:hover td { background: rgba(255,255,255,0.03); }
.theme-dark .price-compare th { color: rgba(255,255,255,0.4); border-bottom-color: rgba(255,255,255,0.15); }
.theme-dark .ckn { color: rgba(255,255,255,0.2); }
.theme-dark .blog-img { background: #0a0a0c; }
.theme-dark .value-card { background: rgba(0,102,255,0.05); border-left-color: var(--blue); }
.theme-dark .value-card:nth-child(even) { background: rgba(255,255,255,0.03); border-left-color: rgba(255,255,255,0.2); }
.theme-dark .hero-stat .num { color: var(--white); }
.theme-dark .hero-stat .label { color: rgba(255,255,255,0.5); }
.theme-dark .features-grid { background: var(--gray800); border-color: var(--gray800); }
/* End Dark Theme */
</style>
"""
html = html.replace('</style>', css_dark)

# 2. Re-arrange and alternate section classes
# We will find every <section ...> or <div class="platform-section ..."> and alternate their theme-dark assignment
# Wait, "one page in white other in black other in white then black". 
# They might also mean the .page wrappers themselves.
# If they mean the literal pages, we can just alternate the sections within each page anyway, 
# because that creates the "one page in white, other in black" effect beautifully.
html = re.sub(r'<section\s+id="hero"[^>]*>', r'<section id="hero" style="min-height:100vh;background:linear-gradient(155deg,#F4F7FF 0%,var(--white) 55%,#F4F7FF 100%);display:flex;align-items:center;justify-content:center;text-align:center;padding-top:72px;position:relative;overflow:hidden">', html)

# Alternate them simply by identifying tags
# We'll just do it manually for precision because regex might miss the style attrs:
html = html.replace('<section id="trusted">', '<section id="trusted" class="theme-dark">')
html = html.replace('<section id="how">', '<section id="how" class="theme-dark">')
html = html.replace('<section class="section-pad" style="background:var(--gray50);border-top:1px solid var(--gray200)">', '<section class="section-pad theme-dark">')

# Platform page
html = html.replace('<div class="platform-section"><div class="platform-inner"><div class="platform-row rev">', '<div class="platform-section theme-dark"><div class="platform-inner"><div class="platform-row rev">')
# About page
html = html.replace('<div style="padding:5rem 0;background:var(--gray50);border-top:1px solid var(--gray200)">', '<div class="theme-dark" style="padding:5rem 0">')

# 3. Inject new pages (Privacy / Terms)
pages_markup = """
<!-- =================== PRIVACY =================== -->
<div id="page-privacy" class="page">
  <div class="page-hero theme-dark"><div class="container" style="text-align:center;max-width:800px;margin:0 auto"><h2 class="section-h2">Privacy Policy</h2><p class="section-sub" style="margin:0.875rem auto 0">Last updated: March 2026</p></div></div>
  <div class="section-pad"><div class="container" style="max-width:800px;color:var(--gray600);line-height:1.75;font-size:0.95rem">
    <h3 style="font-family:var(--serif);font-size:1.5rem;font-weight:600;color:var(--navy);margin-bottom:1rem">1. Data Collection</h3><p style="margin-bottom:2rem">We collect only the necessary data required to operate the NyAI platform. Your queries, uploaded documents, and generated responses are processed in-memory and are not retained by our servers after your session terminates, unless you explicitly opt-in to chat history retention.</p>
    <h3 style="font-family:var(--serif);font-size:1.5rem;font-weight:600;color:var(--navy);margin-bottom:1rem">2. Legal Privilege & Confidentiality</h3><p style="margin-bottom:2rem">NyAI acts purely as an automated processor of your data. We do not use your proprietary prompts or uploaded legal documents to train our core foundation models, ensuring your attorney-client privilege is never compromised.</p>
    <h3 style="font-family:var(--serif);font-size:1.5rem;font-weight:600;color:var(--navy);margin-bottom:1rem">3. Security</h3><p style="margin-bottom:2rem">All internet traffic to & from our application is encrypted via TLS 1.3 protocol. Data stored at rest is encrypted with AES-256. We undergo independent SOC 2 Type II audits annually.</p>
  </div></div>
  <footer><div class="footer-inner"><div class="footer-top"><div><div class="footer-brand">Ny<span>AI</span></div></div></div></div></footer>
</div>

<!-- =================== TERMS =================== -->
<div id="page-terms" class="page">
  <div class="page-hero"><div class="container" style="text-align:center;max-width:800px;margin:0 auto"><h2 class="section-h2">Terms of Service</h2><p class="section-sub" style="margin:0.875rem auto 0">Effective Date: March 2026</p></div></div>
  <div class="section-pad theme-dark"><div class="container" style="max-width:800px;color:rgba(255,255,255,0.7);line-height:1.75;font-size:0.95rem">
    <h3 style="font-family:var(--serif);font-size:1.5rem;font-weight:600;color:var(--white);margin-bottom:1rem">1. Acceptance of Terms</h3><p style="margin-bottom:2rem">By accessing the NyAI platform, you acknowledge and agree to abide by these Terms of Service. NyAI is a technology platform, and its output does not constitute qualified legal advice.</p>
    <h3 style="font-family:var(--serif);font-size:1.5rem;font-weight:600;color:var(--white);margin-bottom:1rem">2. Permitted Use</h3><p style="margin-bottom:2rem">You agree to use NyAI only for legitimate legal, academic, or corporate enterprise research. Attempting to reverse-engineer our proprietary models, scrape judgment databases, or exploit platform endpoints is strictly prohibited.</p>
    <h3 style="font-family:var(--serif);font-size:1.5rem;font-weight:600;color:var(--white);margin-bottom:1rem">3. Disclaimer of Liability</h3><p style="margin-bottom:2rem">While NyAI strives for utmost precision using Indian legal databases, AI models may occasionally generate inaccurate citations or incomplete analyses. Users — as qualified advocates or professionals — must independently verify all AI outputs before relying on them.</p>
  </div></div>
  <footer class="theme-dark"><div class="footer-inner"><div class="footer-top"><div><div class="footer-brand">Ny<span>AI</span></div></div></div></div></footer>
</div>
"""
# Insert right before the <!-- =================== CHAT =================== --> wrapper
html = html.replace('<!-- =================== CHAT =================== -->', pages_markup + '\n<!-- =================== CHAT =================== -->')

# Update footer links across all footers
html = html.replace('<li><a href="#">Privacy Policy</a></li>', '<li><a href="#" onclick="showPage(\'privacy\')">Privacy Policy</a></li>')
html = html.replace('<li><a href="#">Privacy</a></li>', '<li><a href="#" onclick="showPage(\'privacy\')">Privacy Policy</a></li>')
html = html.replace('<li><a href="#">Terms of Service</a></li>', '<li><a href="#" onclick="showPage(\'terms\')">Terms of Service</a></li>')
html = html.replace('<li><a href="#">Terms</a></li>', '<li><a href="#" onclick="showPage(\'terms\')">Terms of Service</a></li>')

open('index.html', 'w', encoding='utf-8').write(html)
