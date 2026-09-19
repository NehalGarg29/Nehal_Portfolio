import React, { useState } from 'react';

const FORMSPREE_ID = 'YOUR_FORMSPREE_ID';

export default function Contact({ portfolio }) {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(form),
            });
            if (res.ok) { setStatus('success'); setForm({ name: '', email: '', message: '' }); }
            else setStatus('error');
        } catch { setStatus('error'); }
    };

    const socials = [
        {
            label: 'GitHub',
            href: portfolio?.github,
            color: '#1e1b4b',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
            ),
        },
        {
            label: 'LinkedIn',
            href: portfolio?.linkedin,
            color: '#0077b5',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" />
                </svg>
            ),
        },
        {
            label: 'Email',
            href: 'mailto:nehalgarg@usc.edu',
            color: '#7c3aed',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                </svg>
            ),
        },
    ];

    return (
        <section id="contact">
            <div className="section-header">
                <h2 className="section-title">Contact</h2>
                <div className="section-divider" />
            </div>

            {/* Tagline */}
            <p className="contact-tagline">Let's build something amazing together ✨</p>

            <div className="contact-grid">
                {/* LEFT panel */}
                <div className="contact-info">
                    {/* Availability badge */}
                    <div className="contact-avail-card">
                        <div className="avail-ring">
                            <div className="avail-dot" />
                        </div>
                        <div>
                            <div className="avail-title">Available for Opportunities</div>
                            <div className="avail-sub">Full-time · May 2026 · Los Angeles, CA</div>
                            <div className="avail-sub">⚡ Responds within 24 hrs</div>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="contact-description">
                        Whether it's a job opportunity, a collaboration, or just a chat —
                        I love connecting with people who are building cool things.
                    </p>

                    {/* Social cards */}
                    <div className="contact-socials">
                        {socials.map(s => (
                            <a
                                key={s.label}
                                href={s.href}
                                target={s.href?.startsWith('mailto') ? undefined : '_blank'}
                                rel="noreferrer"
                                className="contact-social-card"
                                style={{ '--social-color': s.color }}
                            >
                                <span className="social-icon-wrap">{s.icon}</span>
                                <span className="social-label">{s.label}</span>
                                <svg className="social-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                                </svg>
                            </a>
                        ))}
                    </div>

                    {/* Resume download */}
                    <a href="/Nehal_Garg_Resume_.pdf" download="Nehal_Garg_Resume_.pdf" className="contact-resume-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Download Resume
                    </a>
                </div>

                {/* RIGHT — glassy form */}
                <div className="contact-form-wrap">
                    <div className="contact-form-header">
                        <h3 className="contact-form-title">Send a Message</h3>
                        <p className="contact-form-sub">I read every message and reply personally.</p>
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Name</label>
                                <input className="form-input" type="text" placeholder="Jane Smith" value={form.name}
                                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input className="form-input" type="email" placeholder="jane@company.com" value={form.email}
                                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Message</label>
                            <textarea className="form-input form-textarea" placeholder="Tell me about the opportunity or just say hi! 👋"
                                value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required rows={5} />
                        </div>

                        {status === 'success' && <div className="form-success">✅ Sent! I'll get back to you soon.</div>}
                        {status === 'error' && <div className="form-error">❌ Something went wrong — try emailing directly.</div>}

                        <button type="submit" className="form-submit-btn" disabled={status === 'sending'}>
                            {status === 'sending' ? (
                                <>
                                    <span className="form-spinner" />
                                    Sending…
                                </>
                            ) : (
                                <>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                                    </svg>
                                    Send Message
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
