import React, { useEffect, useRef } from 'react';

const GROUPS = [
    { key: 'languages', label: 'Languages', icon: '💻' },
    { key: 'frameworks', label: 'Frameworks & Libraries', icon: '⚛️' },
    { key: 'tools', label: 'Tools & DevOps', icon: '🛠️' },
    { key: 'ml', label: 'ML / Data Science', icon: '🧠' },
];

export default function Skills({ skills }) {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) el.querySelectorAll('.skill-group').forEach((g, i) => {
                setTimeout(() => g.style.opacity = '1', i * 120);
            });
        }, { threshold: 0.1 });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <section id="skills">
            <div className="section-header">
                <h2 className="section-title">Skills</h2>
                <div className="section-divider" />
            </div>

            <div className="skills-grid" ref={ref}>
                {GROUPS.map(g => (
                    <div key={g.key} className="skill-group" style={{ opacity: 0, transition: 'opacity 0.5s ease' }}>
                        <div className="skill-group-header">
                            <span className="skill-group-icon">{g.icon}</span>
                            <span className="skill-group-title">{g.label}</span>
                        </div>
                        <div className="skill-tags">
                            {skills?.[g.key]?.map((t, i) => (
                                <span key={i} className="skill-tag">{t}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
