import React, { useEffect, useRef } from 'react';

const PROJECT_ICONS = ['🎵', '🎨', '💻', '🏥'];

export default function Projects({ projects }) {
    const cardRefs = useRef([]);

    useEffect(() => {
        const observers = cardRefs.current.map((el) => {
            if (!el) return null;
            const obs = new IntersectionObserver(
                ([e]) => { if (e.isIntersecting) el.classList.add('visible'); },
                { threshold: 0.1 }
            );
            obs.observe(el);
            return obs;
        });
        return () => observers.forEach(o => o?.disconnect());
    }, [projects]);

    return (
        <section id="projects">
            <div className="section-header">
                <h2 className="section-title">Projects</h2>
                <div className="section-divider" />
            </div>

            <div className="projects-grid">
                {projects?.map((proj, i) => (
                    <div
                        key={i}
                        className="project-card"
                        ref={el => cardRefs.current[i] = el}
                        style={{ transitionDelay: `${(i % 2) * 0.15}s` }}
                    >
                        <span className="project-icon">{proj.icon || PROJECT_ICONS[i % PROJECT_ICONS.length]}</span>
                        <div className="project-name">{proj.name}</div>
                        <div className="project-stack">
                            {proj.stack?.map((tech, j) => (
                                <span key={j} className="project-tag">{tech}</span>
                            ))}
                        </div>
                        <ul className="project-bullets">
                            {proj.bullets?.map((b, j) => <li key={j}>{b}</li>)}
                        </ul>
                        <div className="project-footer">
                            {proj.demoLink && (
                                <a href={proj.demoLink} target="_blank" rel="noreferrer" className="project-link">
                                    <span aria-hidden="true">↗</span>
                                    Live Demo
                                </a>
                            )}
                            <a href={proj.githubLink} target="_blank" rel="noreferrer" className="project-link">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                                </svg>
                                View on GitHub
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
