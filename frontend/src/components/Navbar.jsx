import React, { useState, useEffect } from 'react';

export default function Navbar({ name }) {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState('');

    useEffect(() => {
        const sections = ['hero', 'about', 'experience', 'projects', 'skills', 'publications', 'contact'];
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
            },
            { rootMargin: '-40% 0px -55% 0px' }
        );
        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    const links = [
        { label: 'About', href: '#about' },
        { label: 'Experience', href: '#experience' },
        { label: 'Projects', href: '#projects' },
        { label: 'Skills', href: '#skills' },
        { label: 'Publications', href: '#publications' },
        { label: 'Contact', href: '#contact' },
    ];

    return (
        <nav className="navbar">
            <a href="#hero" className="nav-logo">
                <img
                    src="/avatar.png"
                    alt="Nehal Garg"
                    className="nav-avatar"
                    onError={(e) => {
                        // Fallback: show initials if image fails
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                    }}
                />
                <div
                    style={{
                        display: 'none',
                        width: '36px', height: '36px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
                        alignItems: 'center', justifyContent: 'center',
                        color: 'white', fontSize: '0.75rem', fontWeight: '700',
                        fontFamily: 'Space Grotesk, sans-serif',
                        border: '2px solid #c4b5fd',
                    }}
                >
                    NG
                </div>

            </a>

            <ul className={`nav-links${open ? ' open' : ''}`}>
                {links.map(l => (
                    <li key={l.label}>
                        <a
                            href={l.href}
                            className={active === l.label.toLowerCase() ? 'active' : ''}
                            onClick={() => setOpen(false)}
                        >
                            {l.label}
                        </a>
                    </li>
                ))}
            </ul>

            <div className="nav-hamburger" onClick={() => setOpen(!open)}>
                <span style={open ? { transform: 'rotate(45deg) translate(5px, 5px)' } : {}} />
                <span style={open ? { opacity: 0 } : {}} />
                <span style={open ? { transform: 'rotate(-45deg) translate(5px, -5px)' } : {}} />
            </div>
        </nav>
    );
}
