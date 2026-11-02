import os

file_path = "/home/maahir/.gemini/antigravity/scratch/nyai.github.io/index.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update :root variables for light colors
old_root = """  --white:#FFFFFF;
  --offwhite:#F7F5F2;
  --lightborder:#E8E4DF;
  --lighttext:#3A3632;
  --lightmuted:#7A7470;"""

new_root = """  --white:#FFFFFF;
  --offwhite:#13161D;
  --lightborder:rgba(255,255,255,0.08);
  --lighttext:#F5F7FA;
  --lightmuted:#848B98;"""

if old_root in content:
    content = content.replace(old_root, new_root)
    print("1. Root variables updated")

# 2. Update white sections and page heroes
old_white_sec = """.section-dark{padding:7rem 0;background:var(--black)}
.section-dark2{padding:7rem 0;background:var(--dark)}
.section-white{padding:7rem 0;background:var(--white)}
.section-off{padding:7rem 0;background:var(--offwhite);border-top:1px solid var(--lightborder)}
.reveal{opacity:0;transform:translateY(24px);transition:opacity .65s ease,transform .65s ease}
.reveal.visible{opacity:1;transform:translateY(0)}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}

/* PAGE HEROES */
.page-hero-dark{padding:9rem 0 5rem;background:var(--black);border-bottom:1px solid var(--border)}
.page-hero-white{padding:9rem 0 5rem;background:var(--white);border-bottom:1px solid var(--lightborder)}
.phi{max-width:1440px;margin:0 auto;padding:0 2.5rem}
.p-h1-dark{font-family:var(--serif);font-size:clamp(2.5rem,5vw,4.5rem);font-weight:500;line-height:1.08;letter-spacing:-0.75px;color:var(--cream);margin-bottom:1.25rem}
.p-h1-light{font-family:var(--serif);font-size:clamp(2.5rem,5vw,4.5rem);font-weight:500;line-height:1.08;letter-spacing:-0.75px;color:var(--lighttext);margin-bottom:1.25rem}
.p-sub-dark{font-size:1rem;color:var(--cream3);line-height:1.75;font-weight:300;max-width:64ch}
.p-sub-light{font-size:1rem;color:var(--lightmuted);line-height:1.75;font-weight:300;max-width:64ch}"""

new_white_sec = """.section-dark{padding:7rem 0;background:var(--black)}
.section-dark2{padding:7rem 0;background:var(--dark)}
.section-white{padding:7rem 0;background:var(--dark2);border-top:1px solid var(--border)}
.section-off{padding:7rem 0;background:var(--dark);border-top:1px solid var(--border)}
.reveal{opacity:0;transform:translateY(24px);transition:opacity .65s ease,transform .65s ease}
.reveal.visible{opacity:1;transform:translateY(0)}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}

/* PAGE HEROES */
.page-hero-dark{padding:9rem 0 5rem;background:var(--black);border-bottom:1px solid var(--border)}
.page-hero-white{padding:9rem 0 5rem;background:var(--black);border-bottom:1px solid var(--border)}
.phi{max-width:1440px;margin:0 auto;padding:0 2.5rem}
.p-h1-dark{font-family:var(--serif);font-size:clamp(2.5rem,5vw,4.5rem);font-weight:500;line-height:1.08;letter-spacing:-0.75px;color:var(--cream);margin-bottom:1.25rem}
.p-h1-light{font-family:var(--serif);font-size:clamp(2.5rem,5vw,4.5rem);font-weight:500;line-height:1.08;letter-spacing:-0.75px;color:var(--cream);margin-bottom:1.25rem}
.p-sub-dark{font-size:1rem;color:var(--cream3);line-height:1.75;font-weight:300;max-width:64ch}
.p-sub-light{font-size:1rem;color:var(--cream3);line-height:1.75;font-weight:300;max-width:64ch}"""

if old_white_sec in content:
    content = content.replace(old_white_sec, new_white_sec)
    print("2. White section CSS updated")

# 3. Update Chat CSS
idx_c1 = content.find("/* ── CHAT ── */")
idx_c2 = content.find("/* ── LOW COGNITIVE LOAD: DIRECTIVE ACTION BAR ── */")
if idx_c1 != -1 and idx_c2 != -1:
    new_chat_css = """/* ── CHAT ── */
#page-chat.active {
  display: flex;
  flex-direction: column;
  height: 100vh;
  height: 100dvh;
  min-height: 0;
  padding-top: 0;
  overflow: hidden;
}
.chat-layout {
  display: flex;
  flex: 1;
  overflow: hidden;
  height: 100%;
}
.chat-sidebar {
  width: 260px;
  background: #0d0f14;
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  padding: 1.15rem 0.85rem 0.85rem;
  flex-shrink: 0;
  overflow: hidden;
  gap: 0.35rem;
  height: 100%;
}
.chat-sidebar-brand {
  padding: 0.15rem 0.4rem 0.75rem;
  display: flex;
  align-items: center;
}
.chat-sidebar-brand a {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  text-decoration: none;
  color: var(--cream);
  font-family: var(--serif);
  font-size: 1.45rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  transition: opacity 0.2s;
}
.chat-sidebar-brand a:hover {
  opacity: 0.85;
}
.chat-sidebar-brand .csb-scale {
  font-size: 1.35rem;
  color: var(--accent);
}
.chat-sidebar-header {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.chat-new-btn {
  background: rgba(255, 255, 255, 0.04);
  color: var(--cream);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.62rem 0.85rem;
  border-radius: 6px;
  font-size: 0.82rem;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
  font-family: var(--sans);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.chat-new-btn:hover {
  border-color: rgba(255, 255, 255, 0.22);
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
}
.chat-new-btn-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.cnb-plus {
  font-size: 1.1rem;
  line-height: 1;
  font-weight: 400;
  color: var(--cream2);
}
.chat-sidebar-section-title {
  font-size: 0.75rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.45);
  padding: 0.85rem 0.5rem 0.25rem;
  letter-spacing: 0.02em;
}
.chat-hist {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding-right: 2px;
  min-height: 0;
}
.chat-hist::-webkit-scrollbar { width: 3px; }
.chat-hist::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

.chi {
  padding: 0.55rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.65);
  transition: all 0.15s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  border: none;
  background: transparent;
}
.chi:hover {
  background: rgba(255, 255, 255, 0.04);
  color: #fff;
}
.chi.active {
  background: #1b1c21;
  color: #fff;
}
.chi-label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 400;
  user-select: none;
}
.chi.active .chi-label {
  font-weight: 500;
}
.chi-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.15s;
  flex-shrink: 0;
}
.chi:hover .chi-actions,
.chi.active .chi-actions {
  opacity: 1;
}
.chi-btn {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  transition: all 0.15s;
}
.chi-btn:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
}
.chi-btn-del:hover {
  color: #f27878;
}
.chi-rename-input {
  width: 100%;
  background: #14161b;
  border: 1px solid var(--accent);
  border-radius: 3px;
  padding: 0.2rem 0.4rem;
  font-size: 0.78rem;
  color: var(--cream);
  font-family: var(--sans);
  outline: none;
}
.chat-sidebar-footer {
  padding-top: 0.75rem;
  border-top: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-top: auto;
}
.csf-brand {
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.55);
  font-weight: 500;
}
.csf-disclaimer {
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.35);
  line-height: 1.45;
}
.csf-status {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding-top: 0.25rem;
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.45);
  font-family: var(--mono);
  cursor: pointer;
}
.chat-engine-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #4cc38a;
  display: inline-block;
  box-shadow: 0 0 6px rgba(76, 195, 138, 0.6);
}
.chat-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1.5rem;
  border-bottom: 1px solid var(--border);
  background: var(--dark);
  flex-shrink: 0;
}
.chat-topbar-sub {
  font-size: 0.72rem;
  font-weight: 400;
  color: var(--cream3);
  font-family: var(--sans);
}
.chat-back-home-btn {
  font-size: 0.74rem;
  color: var(--cream2);
  text-decoration: none;
  padding: 0.32rem 0.65rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 4px;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: rgba(255, 255, 255, 0.03);
}
.chat-back-home-btn:hover {
  color: #fff;
  border-color: rgba(255, 255, 255, 0.28);
  background: rgba(255, 255, 255, 0.08);
}
"""
    content = content[:idx_c1] + new_chat_css + "\n" + content[idx_c2:]
    print("3. Chat CSS updated")

# 4. Update Chat HTML Sidebar & Topbar & Input Area
old_chat_sidebar_html = """    <div class="chat-sidebar">
      <div class="chat-sidebar-header">
        <button class="chat-new-btn" onclick="clearChat()" title="Start New Consultation (⌘K / Ctrl+K)">
          <span class="chat-new-btn-left">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            <span>New Consultation</span>
          </span>
          <kbd class="chat-kbd">⌘K</kbd>
        </button>
      </div>

      <div class="chat-search-wrap">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chat-search-icon">
          <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="text" id="chat-search-input" class="chat-search-input" placeholder="Search case files, acts..." oninput="filterConversations(this.value)" autocomplete="off">
        <button id="chat-search-clear" class="chat-search-clear" onclick="clearConversationSearch()" style="display:none">×</button>
      </div>

      <div class="chat-hist" id="chat-hist">
        <!-- populated by JS -->
      </div>

      <!-- Low Cognitive Load Footer -->
      <div class="chat-sidebar-footer">
        <button class="chat-footer-status" onclick="openHermesSettings()" title="Hermes Gateway Settings">
          <span id="chat-engine-dot" class="chat-engine-dot"></span>
          <span id="chat-engine-label">Hermes Gateway</span>
        </button>
        <span class="chat-footer-legal">BCI Rule 36</span>
      </div>
    </div>"""

new_chat_sidebar_html = """    <div class="chat-sidebar">
      <!-- Top Brand matching User Screenshot -->
      <div class="chat-sidebar-brand">
        <a href="#home" title="NyAI — Return to Overview">
          <span class="csb-scale">⚖</span>
          <span class="csb-name">NyAI</span>
        </a>
      </div>

      <!-- Action Button -->
      <div class="chat-sidebar-header">
        <button class="chat-new-btn" onclick="clearChat()" title="New Conversation">
          <span class="chat-new-btn-left">
            <span class="cnb-plus">+</span>
            <span>New Conversation</span>
          </span>
        </button>
      </div>

      <!-- Section Title -->
      <div class="chat-sidebar-section-title">Recent</div>

      <!-- Conversation List -->
      <div class="chat-hist" id="chat-hist">
        <!-- populated by JS -->
      </div>

      <!-- Footer matching user screenshot -->
      <div class="chat-sidebar-footer">
        <div class="csf-brand">NyAI · Indian Law AI</div>
        <div class="csf-disclaimer">Responses are for informational purposes only and do not constitute legal advice. Always verify citations.</div>
        <div class="csf-status" onclick="openHermesSettings()" title="Hermes AI Gateway Status">
          <span id="chat-engine-dot" class="chat-engine-dot"></span>
          <span id="chat-engine-label">Hermes Gateway Online</span>
        </div>
      </div>
    </div>"""

if old_chat_sidebar_html in content:
    content = content.replace(old_chat_sidebar_html, new_chat_sidebar_html)
    print("4. Chat sidebar HTML updated")
else:
    print("4. Chat sidebar HTML not matched exactly")

# 5. Update Chat Topbar to include Overview back button
old_topbar_html = """        <div style="display:flex;align-items:center;gap:0.5rem">
          <button id="hermes-status-btn" onclick="openHermesSettings()" title="Configure Hermes Agent Gateway" style="background:var(--dark3);border:1px solid var(--border);padding:0.35rem 0.75rem;border-radius:4px;font-size:0.7rem;font-family:var(--mono);color:var(--cream2);display:inline-flex;align-items:center;gap:0.4rem;cursor:pointer">
            <span id="hermes-dot" style="width:6px;height:6px;border-radius:50%;background:#4cc38a;display:inline-block"></span>
            <span id="hermes-status-text">Hermes Gateway</span>
          </button>
          <button onclick="openHermesSettings()" title="Hermes & Engine Settings" style="background:var(--dark3);border:1px solid var(--border);width:30px;height:30px;border-radius:4px;display:flex;align-items:center;justify-content:center;color:var(--cream3);cursor:pointer">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          </button>
        </div>"""

new_topbar_html = """        <div style="display:flex;align-items:center;gap:0.6rem">
          <button id="hermes-status-btn" onclick="openHermesSettings()" title="Configure Hermes Agent Gateway" style="background:var(--dark3);border:1px solid var(--border);padding:0.35rem 0.75rem;border-radius:4px;font-size:0.7rem;font-family:var(--mono);color:var(--cream2);display:inline-flex;align-items:center;gap:0.4rem;cursor:pointer">
            <span id="hermes-dot" style="width:6px;height:6px;border-radius:50%;background:#4cc38a;display:inline-block"></span>
            <span id="hermes-status-text">Hermes Gateway</span>
          </button>
          <button onclick="openHermesSettings()" title="Hermes & Engine Settings" style="background:var(--dark3);border:1px solid var(--border);width:30px;height:30px;border-radius:4px;display:flex;align-items:center;justify-content:center;color:var(--cream3);cursor:pointer">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          </button>
          <a href="#home" class="chat-back-home-btn" title="Return to Overview Website">← Overview</a>
        </div>"""

if old_topbar_html in content:
    content = content.replace(old_topbar_html, new_topbar_html)
    print("5. Chat topbar HTML updated")

# 6. Update chat-ir composer: textarea first, attachment button & send on right
old_chat_ir_html = """        <div class="chat-ir">
          <button class="chat-attach-btn" id="chat-attach-btn" onclick="handleFileAttach()" title="Attach PDF or legal document (max 20MB)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
          </button>
          <input type="file" id="chat-file-input" style="display:none" accept=".pdf,.doc,.docx,.txt,.rtf" multiple onchange="handleFileSelect(event)"/>
          <textarea class="chat-ta" id="chat-input" placeholder="Ask anything about Indian law, statutory sections, or advocate discovery..." rows="1" onkeydown="handleKey(event)" oninput="autoResize(this)"></textarea>
          <button class="chat-sb" id="chat-send" onclick="sendMsg()">↑</button>
        </div>"""

new_chat_ir_html = """        <div class="chat-ir">
          <textarea class="chat-ta" id="chat-input" placeholder="Ask anything about Indian law, statutory sections, or advocate discovery..." rows="1" onkeydown="handleKey(event)" oninput="autoResize(this)"></textarea>
          <button class="chat-attach-btn" id="chat-attach-btn" onclick="handleFileAttach()" title="Attach PDF or legal document (max 20MB)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
          </button>
          <input type="file" id="chat-file-input" style="display:none" accept=".pdf,.doc,.docx,.txt,.rtf" multiple onchange="handleFileSelect(event)"/>
          <button class="chat-sb" id="chat-send" onclick="sendMsg()" title="Send consultation query">↑</button>
        </div>"""

if old_chat_ir_html in content:
    content = content.replace(old_chat_ir_html, new_chat_ir_html)
    print("6. Chat composer IR updated")

# 7. Update showPage to hide navbar during chat mode
old_showpage_nav = """    // 6. Footer & Nav Behavior
    var footer = document.getElementById('global-footer');
    if (footer) {
        if (targetId === 'chat') {
            footer.style.display = 'none';
        } else {
            footer.style.display = 'block';
        }
    }"""

new_showpage_nav = """    // 6. Footer & Nav Behavior
    var footer = document.getElementById('global-footer');
    var nav = document.getElementById('nav');
    if (footer) {
        if (targetId === 'chat') {
            footer.style.display = 'none';
        } else {
            footer.style.display = 'block';
        }
    }
    if (nav) {
        if (targetId === 'chat') {
            nav.style.display = 'none';
            document.body.classList.add('chat-mode');
        } else {
            nav.style.display = 'flex';
            document.body.classList.remove('chat-mode');
        }
    }"""

if old_showpage_nav in content:
    content = content.replace(old_showpage_nav, new_showpage_nav)
    print("7. showPage nav toggling updated")

# 8. Update conversation titles and seeds
idx_seed1 = content.find("// Seed sample conversations if none exist")
idx_seed2 = content.find("function saveConvs()")
if idx_seed1 != -1 and idx_seed2 != -1:
    new_seeds = """// Seed sample conversations matching authentic NyAI screenshot
var DEFAULT_CONVERSATIONS = [
  { id: 'c0', title: 'i killed a person of...', category: 'criminal', messages: SEED_CONVERSATION_MESSAGES['c0'].slice() },
  { id: 'c1', title: 'IBC Section 29A el...', category: 'corporate', messages: SEED_CONVERSATION_MESSAGES['c1'].slice() },
  { id: 'c2', title: 'SEBI AIF Category...', category: 'sebi', messages: SEED_CONVERSATION_MESSAGES['c2'].slice() },
  { id: 'c3', title: 'SHA drag-along cl...', category: 'corporate', messages: SEED_CONVERSATION_MESSAGES['c3'].slice() },
  { id: 'c4', title: 'Income Tax s56(2)...', category: 'tax', messages: SEED_CONVERSATION_MESSAGES['c4'].slice() }
];

if (!conversations || conversations.length === 0 || (conversations[0] && conversations[0].title.indexOf('Ahmedabad') !== -1)) {
  conversations = DEFAULT_CONVERSATIONS;
  activeConvId = 'c0';
  saveConvs();
} else {
  // Ensure titles match user screenshot
  var titleMap = {
    'c0': 'i killed a person of...',
    'c1': 'IBC Section 29A el...',
    'c2': 'SEBI AIF Category...',
    'c3': 'SHA drag-along cl...',
    'c4': 'Income Tax s56(2)...'
  };
  var upgradedAny = false;
  conversations.forEach(function(c) {
    if (titleMap[c.id] && c.title !== titleMap[c.id]) {
      c.title = titleMap[c.id];
      upgradedAny = true;
    }
    if (SEED_CONVERSATION_MESSAGES[c.id] && (!c.messages || c.messages.length === 0)) {
      c.messages = SEED_CONVERSATION_MESSAGES[c.id].slice();
      upgradedAny = true;
    }
  });
  if (upgradedAny) saveConvs();
}

"""
    content = content[:idx_seed1] + new_seeds + content[idx_seed2:]
    print("8. Seed conversations updated")

# 9. Update renderSidebar function to match user screenshot (no meta row, clean active state)
idx_rs1 = content.find("function renderSidebar()")
idx_rs2 = content.find("function escapeHtml(s)")
if idx_rs1 != -1 and idx_rs2 != -1:
    new_rendersidebar = """function renderSidebar() {
  var hist = document.getElementById('chat-hist');
  if (!hist) return;
  hist.innerHTML = '';

  var filtered = conversations.filter(function(conv) {
    if (conversationSearchQuery) {
      var t = (conv.title || '').toLowerCase();
      var msgSnippet = (conv.messages || []).map(function(m){ return m.content || ''; }).join(' ').toLowerCase();
      if (t.indexOf(conversationSearchQuery) === -1 && msgSnippet.indexOf(conversationSearchQuery) === -1) {
        return false;
      }
    }
    return true;
  });

  if (filtered.length === 0) {
    var empty = document.createElement('div');
    empty.style.padding = '1.25rem 0.5rem';
    empty.style.textAlign = 'center';
    empty.style.fontSize = '0.72rem';
    empty.style.color = 'var(--cream3)';
    empty.textContent = conversationSearchQuery ? 'No matching matters found' : 'No conversations yet';
    hist.appendChild(empty);
    return;
  }

  filtered.forEach(function(conv) {
    var item = document.createElement('div');
    item.className = 'chi' + (conv.id === activeConvId ? ' active' : '');
    item.dataset.id = conv.id;

    var label = document.createElement('span');
    label.className = 'chi-label';
    label.textContent = conv.title;
    label.title = conv.title;

    var renameBtn = document.createElement('button');
    renameBtn.className = 'chi-btn';
    renameBtn.title = 'Rename';
    renameBtn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>';
    renameBtn.addEventListener('click', function(e) { startRename(conv.id, e); });

    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'chi-btn chi-btn-del';
    deleteBtn.title = 'Delete';
    deleteBtn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>';
    deleteBtn.addEventListener('click', function(e) { deleteConv(conv.id, e); });

    var actions = document.createElement('span');
    actions.className = 'chi-actions';
    actions.appendChild(renameBtn);
    actions.appendChild(deleteBtn);

    item.appendChild(label);
    item.appendChild(actions);

    item.addEventListener('click', function(e) {
      if (e.target.closest('.chi-actions') || e.target.closest('input')) return;
      loadConv(conv.id);
    });

    hist.appendChild(item);
  });
}

"""
    content = content[:idx_rs1] + new_rendersidebar + content[idx_rs2:]
    print("9. renderSidebar updated")

# 10. Update formatSmartConversationTitle
idx_f1 = content.find("function formatSmartConversationTitle(text) {")
idx_f2 = content.find("function detectConversationCategory(title, text) {")
if idx_f1 != -1 and idx_f2 != -1:
    new_fmt = """function formatSmartConversationTitle(text) {
  if (!text) return 'New Conversation';
  var clean = text.replace(/[\\r\\n\\t]+/g, ' ').replace(/\\s+/g, ' ').trim();
  if (clean.length > 25) {
    return clean.slice(0, 22).trim() + '...';
  }
  return clean;
}

"""
    content = content[:idx_f1] + new_fmt + content[idx_f2:]
    print("10. formatSmartConversationTitle updated")

# 11. Update introductory text in c0 assistant message if needed
if "Based on your situation in Ahmedabad" not in content:
    old_c0_head = "content: '### Emergency Criminal Defense Advisory & Constitutional Directives\\n\\n' +"
    new_c0_head = "content: '### Emergency Criminal Defense Advisory & Constitutional Protections\\n\\n' +\n        'Based on your situation in Ahmedabad, this matter involves serious cognizable offenses under the Bharatiya Nyaya Sanhita 2023 (BNS) and Bharatiya Nagarik Suraksha Sanhita 2023 (BNSS) [replacing IPC & CrPC]. Here are your fundamental constitutional rights, emergency procedural steps, and verified criminal defense advocates in Ahmedabad.\\n\\n' +"
    if old_c0_head in content:
        content = content.replace(old_c0_head, new_c0_head)
        print("11. c0 intro text updated")

# Save final content
with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("ALL UPDATES SUCCESSFULLY APPLIED TO index.html!")
