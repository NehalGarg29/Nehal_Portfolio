import React, { useEffect, useRef } from 'react';

export default function Experience({ experience }) {
    const itemRefs = useRef([]);

    useEffect(() => {
        const observers = itemRefs.current.map((el, i) => {
            if (!el) return null;
            const obs = new IntersectionObserver(
                ([e]) => { if (e.isIntersecting) el.classList.add('visible'); },
                { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
            );
            obs.observe(el);
            return obs;
        });
        return () => observers.forEach(o => o?.disconnect());
    }, [experience]);

    return (
        <section id="experience">
            <div className="section-header">
                <h2 className="section-title">Experience</h2>
                <div className="section-divider" />
            </div>

            <div className="timeline">
                {experience?.map((exp, i) => (
                    <div
                        key={i}
                        className="timeline-item"
                        ref={el => itemRefs.current[i] = el}
                        style={{ transitionDelay: `${i * 0.1}s` }}
                    >
                        <div className="timeline-dot" />
                        <div className="exp-card">
                            <div className="exp-header">
                                <div>
                                    <div className="exp-title">{exp.title}</div>
                                    <div className="exp-company">{exp.company}</div>
                                </div>
                                <div className="exp-meta">
                                    <span className="exp-period">{exp.period}</span>
                                    <span className="exp-location">{exp.location}</span>
                                </div>
                            </div>
                            <div className="exp-stack">
                                {exp.stack?.split(', ').map((tech, j) => (
                                    <span key={j} className="stack-tag">{tech}</span>
                                ))}
                            </div>
                            <ul className="exp-bullets">
                                {exp.bullets?.map((b, j) => <li key={j}>{b}</li>)}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
