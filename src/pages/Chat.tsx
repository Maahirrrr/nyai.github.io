import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Sparkles, Menu, Plus, Pencil, Trash2, X, MessageSquare, Bot } from 'lucide-react';
import { sendToGemini } from '../services/gemini';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  location: string;
  createdAt: number;
}

const STORAGE_KEY = 'nyai-chats';

const defaultWelcome: Message = {
  id: '1',
  type: 'bot',
  content: "Hello! I'm NyAI, your AI-powered legal assistant. I can help you understand Indian laws, identify relevant IPC sections, and connect you with verified lawyers.\n\nTo give you the most relevant help, could you start by telling me your location (city/state)?"
};

const suggestedQuestions = [
  'My landlord won\'t return the deposit',
  'Someone cheated me online',
  'I need help with a cheque bounce case',
  'How do I file for divorce in India?',
];

const loadChats = (): ChatSession[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch { return []; }
};

const saveChats = (chats: ChatSession[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
};

const Chat: React.FC = () => {
  const [chats, setChats] = useState<ChatSession[]>(loadChats);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');

  // Current chat state
  const activeChat = chats.find(c => c.id === activeId) || null;
  const messages = activeChat?.messages || [defaultWelcome];
  const location = activeChat?.location || '';

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const renameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { saveChats(chats); }, [chats]);
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isTyping]);
  useEffect(() => { if (renamingId && renameInputRef.current) renameInputRef.current.focus(); }, [renamingId]);


  // Auto-title from first user message
  const autoTitle = (text: string) => {
    const cleaned = text.replace(/[^\w\s]/g, '').trim();
    return cleaned.length > 40 ? cleaned.slice(0, 40) + '…' : cleaned;
  };

  const startNewChat = () => {
    const newChat: ChatSession = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [defaultWelcome],
      location: '',
      createdAt: Date.now(),
    };
    setChats(prev => [newChat, ...prev]);
    setActiveId(newChat.id);
    setInput('');
    setIsTyping(false);
  };

  const deleteChat = (id: string) => {
    setChats(prev => prev.filter(c => c.id !== id));
    if (activeId === id) setActiveId(null);
  };

  const startRename = (id: string, currentTitle: string) => {
    setRenamingId(id);
    setRenameValue(currentTitle);
  };

  const confirmRename = () => {
    if (renamingId && renameValue.trim()) {
      setChats(prev => prev.map(c => c.id === renamingId ? { ...c, title: renameValue.trim() } : c));
    }
    setRenamingId(null);
  };

  const handleSend = async (messageText?: string) => {
    const text = messageText || input;
    if (!text.trim() || isTyping) return;

    // If no active chat, create one
    let chatId = activeId;
    if (!chatId) {
      const newChat: ChatSession = {
        id: Date.now().toString(),
        title: autoTitle(text),
        messages: [defaultWelcome],
        location: '',
        createdAt: Date.now(),
      };
      setChats(prev => [newChat, ...prev]);
      chatId = newChat.id;
      setActiveId(chatId);
    }

    const userMessage: Message = { id: Date.now().toString(), type: 'user', content: text };

    // Get current messages before updating (for API context)
    const currentChat = chats.find(c => c.id === chatId);
    const historyForApi = (currentChat?.messages || [defaultWelcome]).map(m => ({
      type: m.type,
      content: m.content,
    }));

    setChats(prev => prev.map(c => {
      if (c.id !== chatId) return c;
      const updated = { ...c, messages: [...c.messages, userMessage] };
      if (c.title === 'New Chat') updated.title = autoTitle(text);
      if (c.messages.length === 1 && !c.location) updated.location = text;
      return updated;
    }));

    setInput('');
    setIsTyping(true);

    try {
      const response = await sendToGemini(text, historyForApi);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: response,
      };
      setChats(prev => prev.map(c =>
        c.id === chatId ? { ...c, messages: [...c.messages, botResponse] } : c
      ));
    } catch {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: '⚠️ Something went wrong. Please try again.',
      };
      setChats(prev => prev.map(c =>
        c.id === chatId ? { ...c, messages: [...c.messages, errorMsg] } : c
      ));
    } finally {
      setIsTyping(false);
    }
  };

  const SIDEBAR_WIDTH = 280;

  return (
    <div style={{ height: '100vh', display: 'flex', overflow: 'hidden' }}>
      {/* ── SIDEBAR ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: SIDEBAR_WIDTH, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="chat-sidebar"
            style={{
              height: '100vh',
              background: 'rgba(20, 20, 22, 0.4)',
              backdropFilter: 'blur(50px) saturate(240%)',
              borderRight: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              flexShrink: 0,
              overflow: 'hidden',
              paddingTop: '80px',
              boxShadow: '10px 0 30px rgba(0,0,0,0.5)',
            }}
          >
            {/* Sidebar Header */}
            <div style={{ padding: '1rem 1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--foreground)', letterSpacing: '-0.01em' }}>NyAI Chats</span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  style={{ width: '28px', height: '28px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: 'var(--muted-foreground)', cursor: 'pointer' }}
                >
                  <X size={16} />
                </button>
              </div>
              <button
                onClick={startNewChat}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%',
                  padding: '0.6rem 0.75rem', borderRadius: '0.5rem',
                  background: 'var(--muted)', border: '1px solid var(--border)',
                  color: 'var(--foreground)', fontSize: '0.85rem', fontWeight: 600,
                  cursor: 'pointer', transition: 'background 0.15s'
                }}
              >
                <Plus size={16} /> New Chat
              </button>
            </div>

            {/* Chat List */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem 0.5rem', display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {chats.length === 0 && (
                <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--muted-foreground)', fontSize: '0.82rem' }}>
                  <MessageSquare size={28} style={{ margin: '0 auto 0.5rem', opacity: 0.3 }} />
                  <p>No chats yet</p>
                  <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Start a new conversation</p>
                </div>
              )}
              {chats.map(chat => (
                <div
                  key={chat.id}
                  onClick={() => { setActiveId(chat.id); setRenamingId(null); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.55rem 0.65rem', borderRadius: '0.5rem',
                    background: chat.id === activeId ? 'var(--muted)' : 'transparent',
                    cursor: 'pointer', transition: 'background 0.15s',
                    position: 'relative', minWidth: 0,
                  }}
                >
                  <MessageSquare size={14} style={{ flexShrink: 0, color: 'var(--muted-foreground)', opacity: 0.6 }} />

                  {renamingId === chat.id ? (
                    <input
                      ref={renameInputRef}
                      value={renameValue}
                      onChange={e => setRenameValue(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') confirmRename(); if (e.key === 'Escape') setRenamingId(null); }}
                      onBlur={confirmRename}
                      onClick={e => e.stopPropagation()}
                      style={{
                        flex: 1, minWidth: 0, background: 'var(--background)',
                        border: '1px solid var(--border)', borderRadius: '4px',
                        padding: '0.15rem 0.4rem', color: 'var(--foreground)',
                        fontSize: '0.82rem', outline: 'none',
                      }}
                    />
                  ) : (
                    <span style={{
                      flex: 1, fontSize: '0.82rem', color: chat.id === activeId ? 'var(--foreground)' : 'var(--muted-foreground)',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      fontWeight: chat.id === activeId ? 600 : 400,
                    }}>
                      {chat.title}
                    </span>
                  )}

                  {/* Action buttons — show on active */}
                  {chat.id === activeId && renamingId !== chat.id && (
                    <div style={{ display: 'flex', gap: '2px', flexShrink: 0 }}>
                      <button
                        onClick={e => { e.stopPropagation(); startRename(chat.id, chat.title); }}
                        style={{ width: '24px', height: '24px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: 'var(--muted-foreground)', cursor: 'pointer' }}
                        title="Rename"
                      >
                        <Pencil size={12} />
                      </button>
                      <button
                        onClick={e => { e.stopPropagation(); deleteChat(chat.id); }}
                        style={{ width: '24px', height: '24px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: '#DC2626', cursor: 'pointer' }}
                        title="Delete"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div 
          className="mobile-only"
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 40,
            animation: 'fadeIn 0.2s ease-out'
          }}
        />
      )}

      {/* ── MAIN CHAT AREA ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
        {/* Hamburger toggle */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            style={{
              position: 'fixed', top: '80px', left: '1rem', zIndex: 20,
              width: '36px', height: '36px', borderRadius: '0.5rem',
              background: 'var(--muted)', border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--foreground)', cursor: 'pointer',
            }}
          >
            <Menu size={18} />
          </button>
        )}

        {/* Messages Area */}
        <div style={{ flex: 1, overflowY: 'auto', paddingTop: '90px', paddingBottom: '120px' }}>
          <div className="container" style={{ maxWidth: '800px', padding: '2rem' }}>
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ display: 'flex', justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start', marginBottom: '1.5rem', gap: '0.75rem' }}
                >
                  {msg.type === 'bot' && (
                    <div style={{ 
                      width: '40px', height: '40px', borderRadius: '50%', 
                      background: 'rgba(255,255,255,0.1)', 
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', 
                      flexShrink: 0, marginTop: '2px', overflow: 'hidden',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                    }}>
                      <Bot size={20} style={{ color: 'var(--foreground)' }} />
                    </div>
                  )}

                    <div style={{
                      maxWidth: '80%',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                      perspective: '1000px',
                    }}>
                      <div style={{
                        padding: '1rem 1.4rem',
                        borderRadius: '1.5rem',
                        borderTopLeftRadius: msg.type === 'bot' ? '0.3rem' : '1.5rem',
                        borderTopRightRadius: msg.type === 'user' ? '0.3rem' : '1.5rem',
                        background: msg.type === 'user' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.06)',
                        backdropFilter: 'blur(30px) saturate(220%)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
                        lineHeight: 1.75,
                        fontSize: '0.95rem',
                        color: 'var(--foreground)',
                      }}>
                      {msg.type === 'bot' ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: msg.content
                              // 1. Color Sections Red
                              .replace(/\*\*(Section\s+.*?)\*\*/gi, '<strong style="color: #ef4444">$1</strong>')
                              // 2. Standard Bold for everything else (including lawyer details)
                              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                              // 3. Line breaks and bullets
                              .replace(/\n/g, '<br />')
                              .replace(/• /g, '<span style="margin-left:0.5rem">• </span>')
                          }}
                          style={{ wordBreak: 'break-word' }}
                        />
                      ) : (
                        <span style={{ whiteSpace: 'pre-line' }}>{msg.content}</span>
                      )}
                    </div>
                  </div>

                  {msg.type === 'user' && (
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--muted)', border: '1.5px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                      <User size={18} />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ 
                  width: '40px', height: '40px', borderRadius: '50%', 
                  background: 'rgba(255,255,255,0.1)', 
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  flexShrink: 0, overflow: 'hidden' 
                }}>
                  <Sparkles size={20} style={{ color: 'var(--foreground)' }} />
                </div>
                <div style={{ 
                  padding: '1rem 1.4rem', 
                  background: 'rgba(255, 255, 255, 0.04)', 
                  backdropFilter: 'blur(30px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)', 
                  borderRadius: '1.5rem', 
                  borderTopLeftRadius: '0.3rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem' 
                }}>
                  <Sparkles size={14} style={{ color: 'var(--muted-foreground)', opacity: 0.7 }} />
                  <span style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem' }}>NyAI is thinking...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="chat-input-area" style={{
          position: 'fixed', bottom: 0, right: 0,
          width: sidebarOpen ? `calc(100% - ${SIDEBAR_WIDTH}px)` : '100%',
          background: 'linear-gradient(transparent, var(--background) 25%)',
          padding: '1.5rem 0 1.75rem',
          zIndex: 10,
          transition: 'width 0.25s ease-in-out',
        }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            {/* Suggested questions (shown at start) */}
            {messages.length <= 2 && (
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    style={{
                      background: 'var(--glass)',
                      border: '1px solid var(--glass-border)',
                      color: 'var(--muted-foreground)',
                      padding: '0.4rem 0.85rem',
                      borderRadius: '2rem',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      transition: 'border-color 0.2s',
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div style={{ position: 'relative' }}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder={location ? 'Describe your legal situation...' : 'Enter your city/state to get started...'}
                style={{
                  width: '100%',
                  padding: '1.25rem 4.5rem 1.25rem 1.75rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(40px) saturate(200%)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '999px',
                  color: 'var(--foreground)',
                  fontSize: '1rem',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
                  outline: 'none',
                  transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
                }}
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                style={{
                  position: 'absolute', right: '0.6rem', top: '50%', transform: 'translateY(-50%)',
                  background: input.trim() ? 'var(--foreground)' : 'rgba(255,255,255,0.05)',
                  color: input.trim() ? 'var(--background)' : 'var(--muted-foreground)',
                  width: '42px', height: '42px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  cursor: input.trim() ? 'pointer' : 'not-allowed',
                  border: 'none',
                  boxShadow: input.trim() ? '0 4px 12px rgba(255,255,255,0.2)' : 'none',
                }}
              >
                <Send size={17} />
              </button>
            </div>
            <p style={{ textAlign: 'center', marginTop: '0.5rem', color: 'var(--muted-foreground)', fontSize: '0.72rem' }}>
              NyAI provides general legal information. Consult a qualified lawyer for professional legal advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
