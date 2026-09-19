import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

const TITLES = [
    'Software Engineer',
    'Full Stack Developer',
    'AI/ML Engineer',
    'Data Engineer',
    'React & Go Builder',
];

function AvatarScene() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return undefined;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
        camera.position.z = 6.35;

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);

        const avatar = new THREE.Group();
        scene.add(avatar);

        const backplate = new THREE.Mesh(
            new THREE.CircleGeometry(1.43, 64),
            new THREE.MeshBasicMaterial({ color: 0x102d32, transparent: true, opacity: 0.96 })
        );
        backplate.position.z = -0.08;
        avatar.add(backplate);

        const texture = new THREE.TextureLoader().load('/avatar.png');
        const portrait = new THREE.Mesh(
            new THREE.CircleGeometry(1.32, 64),
            new THREE.MeshBasicMaterial({ map: texture, transparent: true })
        );
        avatar.add(portrait);

        const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x8dd3c7, transparent: true, opacity: 0.75 });
        const ring = new THREE.Mesh(new THREE.TorusGeometry(1.58, 0.025, 12, 96), ringMaterial);
        ring.rotation.z = 0.2;
        avatar.add(ring);

        const orbit = new THREE.Mesh(
            new THREE.TorusGeometry(1.78, 0.012, 10, 96),
            new THREE.MeshBasicMaterial({ color: 0x67e8f9, transparent: true, opacity: 0.5 })
        );
        orbit.rotation.x = Math.PI * 0.42;
        orbit.rotation.y = Math.PI * 0.14;
        avatar.add(orbit);

        const node = new THREE.Mesh(
            new THREE.SphereGeometry(0.09, 20, 20),
            new THREE.MeshBasicMaterial({ color: 0xf59e8b })
        );
        node.position.set(1.78, 0.42, 0.1);
        avatar.add(node);

        const resize = () => {
            const { width, height } = canvas.getBoundingClientRect();
            renderer.setSize(width, height, false);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };
        resize();
        window.addEventListener('resize', resize);

        let frame;
        const animate = (time) => {
            const seconds = time * 0.001;
            avatar.position.y = Math.sin(seconds * 1.2) * 0.07;
            avatar.rotation.y = Math.sin(seconds * 0.65) * 0.08;
            avatar.rotation.x = Math.cos(seconds * 0.5) * 0.025;
            ring.rotation.z += 0.002;
            orbit.rotation.z -= 0.0015;
            node.position.y = 0.42 + Math.sin(seconds * 1.8) * 0.08;
            renderer.render(scene, camera);
            frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('resize', resize);
            texture.dispose();
            portrait.geometry.dispose();
            portrait.material.dispose();
            backplate.geometry.dispose();
            backplate.material.dispose();
            ring.geometry.dispose();
            ring.material.dispose();
            orbit.geometry.dispose();
            orbit.material.dispose();
            node.geometry.dispose();
            node.material.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div className="avatar-stage">
            <canvas ref={canvasRef} className="avatar-canvas" aria-label="Animated 3D portrait of Nehal Garg" />
            <div className="avatar-greeting" aria-hidden="true">
                <span className="avatar-greeting-dot" />
                Hi, I&apos;m Nehal!
            </div>
            <div className="avatar-caption">Building through problems</div>
        </div>
    );
}

export default function Hero({ portfolio, githubStats }) {
    const [titleIdx, setTitleIdx] = useState(0);
    const [displayed, setDisplayed] = useState('');
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const target = TITLES[titleIdx];
        let timeout;
        if (!deleting && displayed.length < target.length) {
            timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 80);
        } else if (!deleting && displayed.length === target.length) {
            timeout = setTimeout(() => setDeleting(true), 2200);
        } else if (deleting && displayed.length > 0) {
            timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
        } else if (deleting && displayed.length === 0) {
            setDeleting(false);
            setTitleIdx((i) => (i + 1) % TITLES.length);
        }
        return () => clearTimeout(timeout);
    }, [displayed, deleting, titleIdx]);

    const stats = [
        { label: 'Internships', value: '5+' },
        { label: 'Projects', value: '9' },
        { label: 'Publications', value: '2' },
    ];

    return (
        <section id="hero" className="hero">
            <div className="hero-inner">
                {/* Left — text content */}
                <div className="hero-content">
                    <div className="hero-badge">
                        <span className="hero-badge-dot" />
                        ML/AI Engineer Intern · Allyvia
                    </div>

                    <h1 className="hero-name">{portfolio?.name || 'Nehal Garg'}</h1>

                    <p className="hero-title-line">
                        &lt; {displayed}<span className="hero-cursor" />&nbsp;/&gt;
                    </p>

                    <p className="hero-description">
                        MS CS @ USC · Building performant systems across the full stack —
                        from React UIs to Go APIs, TensorFlow models to distributed databases.
                    </p>

                    <p className="hero-location">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                        </svg>
                        {portfolio?.location || 'Los Angeles, CA'}
                    </p>

                    <div className="hero-ctas">
                        <a href={portfolio?.github || '#'} target="_blank" rel="noreferrer" className="btn btn-primary">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                            GitHub
                        </a>
                        <a href={portfolio?.linkedin || '#'} target="_blank" rel="noreferrer" className="btn btn-outline">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" />
                            </svg>
                            LinkedIn
                        </a>
                        <a href="#contact" className="btn btn-outline">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                            </svg>
                            Say Hello
                        </a>
                    </div>

                    <div className="hero-stats">
                        {stats.map(s => (
                            <div key={s.label} className="stat-item">
                                <div className="stat-number">{s.value}</div>
                                <div className="stat-label">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right — animated personal avatar */}
                <div className="hero-illustration">
                    <AvatarScene />
                </div>
            </div>
        </section>
    );
}
