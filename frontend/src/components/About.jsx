import React, { useEffect, useRef } from 'react';

export default function About({ portfolio }) {
    const sectionRef = useRef(null);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
                el.querySelectorAll('.reveal-child').forEach((child, i) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, i * 150);
                });
            }
        }, { threshold: 0.08 });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    const childStyle = {
        opacity: 0,
        transform: 'translateY(24px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
    };

    return (
        <section id="about" ref={sectionRef}>
            <div className="section-header reveal-child" style={{ ...childStyle }}>
                <h2 className="section-title">About Me</h2>
                <div className="section-divider" />
            </div>

            <div className="about-grid">
                <div className="about-text reveal-child" style={{ ...childStyle }}>
                    <p>
                        Hey! I'm <strong>Nehal Garg</strong>, a software engineer based in <strong>Los Angeles, CA</strong>,
                        holding an <strong>MS in Computer Science from USC</strong> (Graduated May 2026, GPA 3.63).
                    </p>
                    <p>
                        I love building things — from full-stack web apps using <strong>React</strong> and <strong>Node.js</strong>,
                        to AI systems with <strong>TensorFlow</strong> and <strong>OpenCV</strong>, to efficient backend services
                        in <strong>Go</strong> and <strong>Python</strong>. I care about clean code, fast systems, and great UX.
                    </p>
                    <p>
                        With 4 internships across the US and India, I've shipped production features,
                        cut latency by 35%, improved real-time reliability for 10K+ users, and published
                        research in distributed systems and decentralized finance.
                    </p>
                    <p>
                        🟢 <strong>Open to collaborations and full-time opportunities</strong> starting May 2026.
                    </p>
                </div>

                <div className="edu-cards reveal-child" style={{ ...childStyle }}>
                    {portfolio?.education?.map((edu, i) => (
                        <div key={i} className="edu-card">
                            <div className="edu-degree">{edu.degree}</div>
                            <div className="edu-school">{edu.school}</div>
                            <div className="edu-meta">
                                <span className="edu-gpa">GPA: {edu.gpa}</span>
                                <span>{edu.period}</span>
                                {edu.status && (
                                    <span style={{
                                        background: 'rgba(0,255,136,0.15)',
                                        color: 'var(--accent)',
                                        border: '1px solid rgba(0,255,136,0.4)',
                                        borderRadius: '4px',
                                        padding: '2px 8px',
                                        fontSize: '0.72rem',
                                        fontWeight: '600',
                                        letterSpacing: '0.05em',
                                        textTransform: 'uppercase'
                                    }}>✓ {edu.status}</span>
                                )}
                            </div>
                            <div style={{ marginTop: '0.6rem', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                                {edu.courses}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
