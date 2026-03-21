import re

html_content = open('index.html', 'r', encoding='utf-8').read()

# 1. Update features-grid CSS
old_feat_css = """.features-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1px;background:var(--gray200);border:1px solid var(--gray200);border-radius:var(--r3);overflow:hidden;margin-top:3.5rem}
.feat-card{background:var(--white);padding:2.25rem;transition:var(--trans);position:relative}
.feat-card:hover{background:var(--bluelighter)}
.feat-card::after{content:'';position:absolute;top:0;left:0;width:0;height:3px;background:var(--blue);transition:0.35s ease}
.feat-card:hover::after{width:100%}
.feat-num{font-family:var(--mono);font-size:0.68rem;color:var(--gray400);margin-bottom:1.25rem}
.feat-icon{width:40px;height:40px;background:var(--bluelight);border-radius:var(--r);display:flex;align-items:center;justify-content:center;margin-bottom:1.125rem;font-size:1.1rem}
.feat-h3{font-family:var(--serif);font-size:1.275rem;font-weight:600;margin-bottom:0.6rem;line-height:1.3}
.feat-p{font-size:0.85rem;color:var(--gray600);line-height:1.72}
.feat-link{display:inline-flex;align-items:center;gap:0.3rem;font-size:0.78rem;color:var(--blue);margin-top:1.125rem;font-weight:500;cursor:pointer;transition:var(--trans)}
.feat-link:hover{gap:0.5rem}"""

new_feat_css = """/* FEATURES PREMIUM */
.features-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1.5rem;margin-top:4rem}
.feat-card{background:var(--white);padding:2.75rem 2rem;border:1px solid var(--gray200);border-radius:var(--r2);transition:all 0.4s cubic-bezier(0.16,1,0.3,1);position:relative;box-shadow:0 4px 16px rgba(0,0,0,0.02)}
.feat-card:hover{transform:translateY(-5px);border-color:rgba(0,102,255,0.3);box-shadow:0 12px 32px rgba(0,102,255,0.08)}
.feat-card::after{content:'';position:absolute;top:0;left:0;width:0;height:4px;background:var(--blue);transition:0.4s ease;border-radius:var(--r2) 0 0 0}
.feat-card:hover::after{width:100%;border-radius:var(--r2) var(--r2) 0 0}
.feat-num{font-family:var(--mono);font-size:0.72rem;color:var(--blue);font-weight:600;margin-bottom:1.5rem;letter-spacing:0.05em;text-transform:uppercase}
.feat-icon{width:56px;height:56px;background:linear-gradient(135deg,var(--bluelight),var(--white));border:1px solid rgba(0,102,255,0.1);box-shadow:0 2px 12px rgba(0,102,255,0.06);border-radius:1rem;display:flex;align-items:center;justify-content:center;margin-bottom:1.5rem;font-size:1.5rem}
.feat-h3{font-family:var(--serif);font-size:1.35rem;font-weight:600;margin-bottom:0.75rem;line-height:1.3}
.feat-p{font-size:0.9rem;color:var(--gray600);line-height:1.75}
.feat-link{display:inline-flex;align-items:center;gap:0.4rem;font-size:0.875rem;color:var(--blue);margin-top:1.5rem;font-weight:600;cursor:pointer;transition:var(--trans)}
.feat-link:hover{gap:0.6rem}"""

html_content = html_content.replace(old_feat_css, new_feat_css)
html_content = html_content.replace(".theme-dark .features-grid { background: var(--gray800); border-color: var(--gray800); }", "")


# 2. Update how-steps CSS
old_how_css = """.how-steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.375rem;margin-top:3.5rem}
.how-step{background:var(--white);border:1px solid var(--gray200);border-radius:var(--r2);padding:2rem;transition:var(--trans)}
.how-step:hover{border-color:var(--blue);box-shadow:0 4px 20px rgba(0,102,255,0.08)}
.how-step-num{font-family:var(--mono);font-size:0.72rem;font-weight:500;color:var(--blue);background:var(--bluelight);display:inline-block;padding:0.25rem 0.65rem;border-radius:2rem;margin-bottom:1.25rem}
.how-step h3{font-family:var(--serif);font-size:1.125rem;font-weight:600;margin-bottom:0.55rem}
.how-step p{font-size:0.84rem;color:var(--gray600);line-height:1.72}"""

new_how_css = """/* HOW NYAI WORKS TIMELINE */
.how-steps{display:flex;flex-direction:column;gap:2rem;position:relative;max-width:860px;margin:4.5rem auto 0;padding-left:1rem}
.how-steps::before{content:'';position:absolute;top:0;bottom:0;left:3rem;width:2px;background:linear-gradient(to bottom,var(--blue),rgba(0,102,255,0.1));z-index:0}
.how-step{display:flex;align-items:flex-start;gap:2.5rem;position:relative;z-index:1;transition:all 0.4s ease}
.how-step:hover{transform:translateX(5px)}
.how-step-num{font-family:var(--mono);font-size:1.15rem;font-weight:700;color:var(--white)!important;background:var(--blue)!important;width:64px;height:64px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;border:4px solid var(--white)!important;box-shadow:0 4px 16px rgba(0,102,255,0.25);padding:0!important;margin:0!important}
.how-content{background:var(--white);border:1px solid var(--gray200);border-radius:var(--r2);padding:2.5rem;flex:1;box-shadow:0 4px 20px rgba(0,0,0,0.03);transition:all 0.4s ease}
.how-step:hover .how-content{border-color:rgba(0,102,255,0.3);box-shadow:0 8px 32px rgba(0,102,255,0.08)}
.how-step h3{font-family:var(--serif);font-size:1.35rem;font-weight:600;margin-bottom:0.75rem}
.how-step p{font-size:0.95rem;color:var(--gray600);line-height:1.75}
.theme-dark .how-content{background:var(--navy2);border-color:rgba(255,255,255,0.08)}
.theme-dark .how-step-num{border-color:var(--navy)!important}
@media(max-width:768px){
  .how-steps::before{left:2rem}
  .how-step{gap:1.25rem}
  .how-step-num{width:48px;height:48px;font-size:0.9rem;border-width:3px}
  .how-content{padding:1.5rem}
}"""

html_content = html_content.replace(old_how_css, new_how_css)

# 3. Update the how-steps HTML to use .how-content wrappers
old_how_html = """<div class="how-step"><div class="how-step-num">Step 01</div><h3>Describe Your Matter</h3><p>Type your question or upload documents. NyAI understands Indian legal context from first principles.</p></div>
        <div class="how-step"><div class="how-step-num">Step 02</div><h3>AI Analyses & Researches</h3><p>NyAI searches its curated Indian law corpus — SCI, HCs, statutes, SEBI, RBI — and synthesises relevant authority.</p></div>
        <div class="how-step"><div class="how-step-num">Step 03</div><h3>Get Cited Answers</h3><p>Receive structured, citation-backed responses with risk flags, precedent summaries, and recommended next steps.</p></div>
        <div class="how-step"><div class="how-step-num">Step 04</div><h3>Export & Collaborate</h3><p>Export to Word, share with your team, or integrate with your firm's document management system.</p></div>"""

new_how_html = """<div class="how-step">
          <div class="how-step-num">01</div>
          <div class="how-content">
            <h3>Describe Your Matter</h3>
            <p>Type your question or upload documents. NyAI understands Indian legal context from first principles.</p>
          </div>
        </div>
        <div class="how-step">
          <div class="how-step-num">02</div>
          <div class="how-content">
            <h3>AI Analyses & Researches</h3>
            <p>NyAI searches its curated Indian law corpus — SCI, HCs, statutes, SEBI, RBI — and synthesises relevant authority.</p>
          </div>
        </div>
        <div class="how-step">
          <div class="how-step-num">03</div>
          <div class="how-content">
            <h3>Get Cited Answers</h3>
            <p>Receive structured, citation-backed responses with risk flags, precedent summaries, and recommended next steps.</p>
          </div>
        </div>
        <div class="how-step">
          <div class="how-step-num">04</div>
          <div class="how-content">
            <h3>Export & Collaborate</h3>
            <p>Export to Word, share with your team, or integrate with your firm's document management system.</p>
          </div>
        </div>"""

html_content = html_content.replace(old_how_html, new_how_html)

open('index.html', 'w', encoding='utf-8').write(html_content)
