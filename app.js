(function() {
'use strict';

// ── All functions on window so inline handlers and dynamic HTML can call them ──

var chatHistory = [];
var isLoading = false;
var tc = 0;

var noFooterPages = ['chat', 'signin'];

window.showPage = function(n) {
  document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });
  var t = document.getElementById('page-' + n);
  if (!t) return;
  t.classList.add('active');
  window.scrollTo(0, 0);
  var footer = document.getElementById('global-footer');
  if (footer) footer.style.display = noFooterPages.indexOf(n) !== -1 ? 'none' : 'block';
  document.querySelectorAll('.nav-links a').forEach(function(a) { a.classList.remove('active'); });
  var navEl = document.getElementById('nav-' + n);
  if (navEl) navEl.classList.add('active');
  if (n === 'chat') setTimeout(function() { var inp = document.getElementById('chat-input'); if (inp) inp.focus(); }, 100);
  checkReveal();
  closeMob();
};

window.toggleMobile = function() { document.getElementById('mobile-menu').classList.toggle('open'); };
window.closeMob = function() { document.getElementById('mobile-menu').classList.remove('open'); };

window.checkReveal = function() {
  document.querySelectorAll('.reveal').forEach(function(el) {
    if (el.getBoundingClientRect().top < window.innerHeight - 60) el.classList.add('visible');
  });
};

window.setActive = function(el) {
  document.querySelectorAll('.cap-item').forEach(function(i) { i.classList.remove('active'); });
  el.classList.add('active');
};

window.toggleFaq = function(el) {
  var wasOpen = el.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(function(f) { f.classList.remove('open'); });
  if (!wasOpen) el.classList.add('open');
};

window.filterRes = function(cat, btn) {
  document.querySelectorAll('.rf-btn').forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
  document.querySelectorAll('.rc').forEach(function(card) {
    card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
  });
};

window.subscribeNewsletter = function() {
  var email = document.getElementById('newsletter-email').value.trim();
  if (!email || email.indexOf('@') === -1) { alert('Please enter a valid email address.'); return; }
  alert('Subscribed! You\'ll receive your first NyAI weekly digest next Monday.\n\nEmail: ' + email);
  document.getElementById('newsletter-email').value = '';
};

window.applyRole = function(role) {
  var email = prompt('Apply for: ' + role + '\n\nEnter your email address to receive the application form:');
  if (!email) return;
  if (email.indexOf('@') === -1) { alert('Please enter a valid email address.'); return; }
  alert('Application received!\n\nRole: ' + role + '\nEmail: ' + email + '\n\nOur team will be in touch within 3 business days.\n\n— NyAI Talent Team');
};

window.handleSignin = function() {
  var email = document.getElementById('signin-email').value.trim();
  var pass = document.getElementById('signin-pass').value;
  if (!email || email.indexOf('@') === -1) { alert('Please enter a valid email address.'); return; }
  if (!pass || pass.length < 6) { alert('Please enter your password (min 6 characters).'); return; }
  showPage('chat');
};

window.autoResize = function(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 140) + 'px';
};

window.handleKey = function(e) {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMsg(); }
};

window.sendSugg = function(btn) {
  document.getElementById('chat-input').value = btn.textContent.trim();
  sendMsg();
};

window.clearChat = function() {
  chatHistory = [];
  var msgs = document.getElementById('chat-msgs');
  if (!msgs) return;
  msgs.innerHTML = '<div class="chat-welcome" id="chat-welcome">' +
    '<div class="cwl">NyAI</div>' +
    '<p>Your AI legal research assistant for Indian law. Ask about judgments, statutes, regulations, contracts, or any legal question.</p>' +
    '<div class="chat-sugg-wrap">' +
    '<button class="chat-sugg" onclick="sendSugg(this)">What are the Section 29A eligibility criteria under IBC?</button>' +
    '<button class="chat-sugg" onclick="sendSugg(this)">Explain SEBI insider trading regulations under PIT Regulations 2015</button>' +
    '<button class="chat-sugg" onclick="sendSugg(this)">Key issues drafting a drag-along clause in an Indian SHA</button>' +
    '</div></div>';
};

window.sendMsg = async function() {
  if (isLoading) return;
  var input = document.getElementById('chat-input');
  var text = input.value.trim();
  if (!text) return;
  var w = document.getElementById('chat-welcome');
  if (w) w.remove();
  input.value = '';
  input.style.height = 'auto';
  addMsg(text, 'user');
  chatHistory.push({ role: 'user', content: text });
  isLoading = true;
  document.getElementById('chat-send').disabled = true;
  var tid = addTyping();
  try {
    var res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: 'You are NyAI, an expert Indian legal research and drafting assistant. You are deeply knowledgeable about Indian statutes (Companies Act 2013, IBC 2016, IT Act 2000, SEBI regulations, FEMA, Income Tax Act, GST laws, CPC, CrPC, BNS, BNSS, BSA, Contract Act, Transfer of Property Act), Indian courts (Supreme Court of India, all 25 High Courts, NCLAT, SAT, ITAT, NCLT, TDSAT), and Indian regulatory bodies (SEBI, RBI, MCA, IRDAI, CCI, TRAI). Be precise, cite specific section numbers and case names, use **bold** for key references, structure complex answers with ## headings, flag risks, and remind users to verify citations before court use.',
        messages: chatHistory
      })
    });
    var data = await res.json();
    removeTyping(tid);
    if (data.content && data.content[0]) {
      var reply = data.content[0].text;
      chatHistory.push({ role: 'assistant', content: reply });
      addMsg(reply, 'ai');
    } else {
      addMsg('I apologise — I encountered an issue. Please try again.', 'ai');
    }
  } catch(e) {
    removeTyping(tid);
    addMsg('Connection error — please try again.', 'ai');
  }
  isLoading = false;
  document.getElementById('chat-send').disabled = false;
};

function addMsg(text, role) {
  var msgs = document.getElementById('chat-msgs');
  var d = document.createElement('div');
  d.className = 'msg ' + role;
  var av = document.createElement('div');
  av.className = 'msg-av ' + role;
  av.textContent = role === 'ai' ? 'N' : 'U';
  var b = document.createElement('div');
  b.className = 'msg-bubble ' + role;
  b.innerHTML = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^### (.+)$/gm, '<h3 style="font-family:var(--serif);font-size:1.05rem;font-weight:500;margin:.75rem 0 .3rem;color:var(--cream)">$1</h3>')
    .replace(/^## (.+)$/gm, '<h3 style="font-family:var(--serif);font-size:1.1rem;font-weight:500;margin:.875rem 0 .3rem;color:var(--cream)">$1</h3>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>');
  d.appendChild(av);
  d.appendChild(b);
  msgs.appendChild(d);
  msgs.scrollTop = msgs.scrollHeight;
}

function addTyping() {
  var id = 'ty-' + (++tc);
  var msgs = document.getElementById('chat-msgs');
  var d = document.createElement('div');
  d.className = 'msg ai';
  d.id = id;
  d.innerHTML = '<div class="msg-av ai">N</div><div class="msg-bubble ai" style="padding:0"><div class="typing-dots"><span></span><span></span><span></span></div></div>';
  msgs.appendChild(d);
  msgs.scrollTop = msgs.scrollHeight;
  return id;
}

function removeTyping(id) {
  var el = document.getElementById(id);
  if (el) el.remove();
}

window.renameChat = function(btn, e) {
  e.stopPropagation();
  var chiText = btn.closest('.chi').querySelector('.chi-text');
  var newName = prompt('Rename conversation:', chiText.textContent);
  if (newName !== null && newName.trim() !== '') {
    chiText.textContent = newName.trim();
  }
};

window.deleteChat = function(btn, e) {
  e.stopPropagation();
  if (confirm('Delete this conversation?')) {
    btn.closest('.chi').remove();
  }
};

// ── INIT after DOM ready ──
document.addEventListener('DOMContentLoaded', function() {
  window.scrollTo(0, 0);
  window.addEventListener('scroll', checkReveal);
  setTimeout(checkReveal, 100);

  // Careers email button
  var ceb = document.getElementById('careers-email-btn');
  if (ceb) {
    ceb.addEventListener('click', function() {
      window.location.href = 'mai' + 'lto:careers' + '@nyai.in';
    });
  }

  // Show home, hide footer for chat/signin
  
});

})();