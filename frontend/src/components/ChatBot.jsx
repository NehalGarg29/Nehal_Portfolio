import React, { useState, useRef, useEffect } from 'react';

const SUGGESTIONS = [
    "What's her tech stack?",
    "Tell me about her experience",
    "What projects has she built?",
    "Is she open to opportunities?",
];

const WELCOME = "Hi! I'm Nehal's AI assistant 👋 Ask me anything about her background, skills, or projects!";

// Map keywords → section IDs
const SECTION_MAP = [
    { id: 'experience', label: 'Experience', keywords: ['experience', 'intern', 'internship', 'job', 'work', 'company', 'allyvia', 'zofai', 'essell', 'hammer', 'nyadeko', 'worked', 'career', 'role'] },
    { id: 'projects', label: 'Projects', keywords: ['project', 'built', 'emotunes', 'artsyapi', 'applego', 'hospital', 'smart room', 'android', 'app', 'github'] },
    { id: 'skills', label: 'Skills', keywords: ['skill', 'tech stack', 'stack', 'language', 'framework', 'tool', 'python', 'react', 'golang', 'go', 'kotlin', 'tensorflow', 'docker', 'aws', 'gcp', 'technology'] },
    { id: 'publications', label: 'Publications', keywords: ['publication', 'paper', 'research', 'published', 'ijraset', 'ijisrt', 'blockchain', 'journal'] },
    { id: 'about', label: 'About', keywords: ['about', 'education', 'school', 'usc', 'university', 'degree', 'gpa', 'study', 'background', 'southern california', 'ggsipu', 'college', 'masters', 'bachelor'] },
    { id: 'contact', label: 'Contact', keywords: ['contact', 'email', 'reach', 'hire', 'connect', 'opportunity', 'recruiter', 'available', 'open to'] },
];

function detectSection(text) {
    const lower = text.toLowerCase();
    for (const s of SECTION_MAP) {
        if (s.keywords.some(kw => lower.includes(kw))) return s;
    }
    return null;
}

function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function ChatBot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([{ role: 'model', text: WELCOME, section: null }]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const bottomRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (open) {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [open, messages]);

    const send = async (text) => {
        const msg = text || input.trim();
        if (!msg || loading) return;

        const section = detectSection(msg);
        setInput('');
        setShowSuggestions(false);
        setMessages(prev => [...prev, { role: 'user', text: msg, section: null }]);
        setLoading(true);

        // Auto-scroll to detected section after a short delay
        if (section) {
            setTimeout(() => scrollToSection(section.id), 600);
        }

        try {
            const history = messages.filter(m => m.role !== 'model' || m.text !== WELCOME);
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: msg, history }),
            });
            const data = await res.json();
            setMessages(prev => [...prev, {
                role: 'model',
                text: data.reply || 'Sorry, something went wrong.',
                section,
            }]);
        } catch {
            setMessages(prev => [...prev, { role: 'model', text: 'Connection error. Please try again.', section: null }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Floating button */}
            <button
                className="chatbot-fab"
                onClick={() => setOpen(o => !o)}
                aria-label="Open chat assistant"
            >
                {open ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.03 2 11c0 2.7 1.24 5.12 3.2 6.8L4 22l4.44-1.48C9.55 20.83 10.74 21 12 21c5.52 0 10-4.03 10-9s-4.48-9-10-9zm1 13h-2v-2h2v2zm0-4h-2V7h2v4z" />
                    </svg>
                )}
            </button>

            {/* Chat window */}
            {open && (
                <div className="chatbot-window">
                    {/* Header */}
                    <div className="chatbot-header">
                        <div className="chatbot-header-info">
                            <div className="chatbot-avatar">NG</div>
                            <div>
                                <div className="chatbot-title">Nehal's Assistant</div>
                                <div className="chatbot-subtitle">● Online · Ask me anything</div>
                            </div>
                        </div>
                        <button className="chatbot-close" onClick={() => setOpen(false)} aria-label="Close">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="chatbot-messages">
                        {messages.map((m, i) => (
                            <div key={i}>
                                <div className={`chatbot-msg ${m.role === 'user' ? 'chatbot-msg-user' : 'chatbot-msg-bot'}`}>
                                    {m.text}
                                </div>
                                {/* Jump button on bot messages with a detected section */}
                                {m.role === 'model' && m.section && (
                                    <button
                                        className="chatbot-jump"
                                        onClick={() => scrollToSection(m.section.id)}
                                    >
                                        ↓ Jump to {m.section.label}
                                    </button>
                                )}
                            </div>
                        ))}
                        {loading && (
                            <div className="chatbot-msg chatbot-msg-bot chatbot-typing">
                                <span /><span /><span />
                            </div>
                        )}

                        {/* Quick suggestions */}
                        {showSuggestions && !loading && (
                            <div className="chatbot-suggestions">
                                {SUGGESTIONS.map((s, i) => (
                                    <button key={i} className="chatbot-suggestion" onClick={() => send(s)}>{s}</button>
                                ))}
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    {/* Input */}
                    <div className="chatbot-input-row">
                        <input
                            ref={inputRef}
                            className="chatbot-input"
                            type="text"
                            placeholder="Ask about Nehal..."
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && send()}
                            disabled={loading}
                        />
                        <button
                            className="chatbot-send"
                            onClick={() => send()}
                            disabled={!input.trim() || loading}
                            aria-label="Send"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
