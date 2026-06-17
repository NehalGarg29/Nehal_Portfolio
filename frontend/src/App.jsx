import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Publications from './components/Publications';
import Contact from './components/Contact';
import ChatBot from './components/ChatBot';
import TechBackground from './components/TechBackground';
import './index.css';

const API_BASE = 'http://localhost:8082';

export default function App() {
  const [portfolio, setPortfolio] = useState(null);
  const [githubStats, setGithubStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [portRes, statsRes] = await Promise.all([
          fetch(`${API_BASE}/api/portfolio`).catch(err => {
            console.warn('Portfolio API network error:', err);
            return { ok: false };
          }),
          fetch(`${API_BASE}/api/github-stats`).catch(err => {
            console.warn('GitHub stats API network error:', err);
            return { ok: false };
          }),
        ]);

        if (!portRes.ok) {
          throw new Error(`Portfolio API failed with status ${portRes.status || 'unknown'}`);
        }

        const portData = await portRes.json();
        if (!portData || typeof portData !== 'object' || !portData.name) {
          throw new Error('Portfolio API returned invalid data structure');
        }

        let statsData;
        if (statsRes.ok) {
          try {
            statsData = await statsRes.json();
          } catch (err) {
            console.warn('Failed to parse GitHub stats JSON, using default:', err);
            statsData = { repos: 28, stars: 9, followers: 2, topLangs: ['JavaScript', 'Python', 'TypeScript', 'HTML', 'Kotlin'] };
          }
        } else {
          console.warn('GitHub stats API returned error response, using default');
          statsData = { repos: 28, stars: 9, followers: 2, topLangs: ['JavaScript', 'Python', 'TypeScript', 'HTML', 'Kotlin'] };
        }

        setPortfolio(portData);
        setGithubStats(statsData);
      } catch (err) {
        console.error('API unavailable, using fallback:', err);
        // Fallback data when backend is offline
        setPortfolio(FALLBACK_PORTFOLIO);
        setGithubStats({ repos: 28, stars: 9, followers: 2, topLangs: ['JavaScript', 'Python', 'TypeScript', 'HTML', 'Kotlin'] });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#080b10' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px', height: '48px', border: '3px solid rgba(196,181,253,0.15)',
            borderTop: '3px solid #8b5cf6', borderRadius: '50%',
            animation: 'spin 1s linear infinite', margin: '0 auto 1rem'
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p style={{ color: '#8b5cf6', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem' }}>loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <TechBackground />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="orb orb-4" />
      <Navbar name={portfolio.name} />
      <Hero portfolio={portfolio} githubStats={githubStats} />
      <About portfolio={portfolio} />
      <Experience experience={portfolio.experience} />
      <Projects projects={portfolio.projects} />
      <Skills skills={portfolio.skills} />
      <Publications publications={portfolio.publications} />
      <Contact portfolio={portfolio} />
      <footer>
        <p>Designed &amp; Built by <span>{portfolio.name}</span> · {new Date().getFullYear()}</p>
      </footer>
      <ChatBot />
    </>
  );
}

// Fallback if Go backend is not running
const FALLBACK_PORTFOLIO = {
  name: "Nehal Garg",
  title: "Software Engineer | Full Stack Developer | AI/ML & Data Engineer",
  location: "Los Angeles, CA",
  github: "https://github.com/NehalGarg29",
  linkedin: "https://www.linkedin.com/in/nehal-garg29/",
  education: [
    { degree: "Masters of Science in Computer Science", school: "University of Southern California", gpa: "3.63", period: "Aug 2024 – May 2026", status: "Graduated", courses: "Algorithm Analysis, Web Technologies, Applied NLP, Machine Learning, Data Management" },
    { degree: "Bachelor of Technology in Computer Science", school: "Guru Gobind Singh Indraprastha University", gpa: "3.72", period: "Aug 2020 – June 2024", courses: "Data Structures, OOP, Operating Systems, AI, Distributed Systems" },
  ],
  experience: [
    { title: "Software Engineer Intern", company: "ZofAI", period: "June 2025 – Sept 2025", location: "San Francisco, CA", stack: "Next.js, TypeScript, Tailwind CSS, Prisma, PostgreSQL, Vercel, Python, GCP, Docker", bullets: ["Built full-stack features enabling 5+ client teams to automate QA workflows.", "Designed PostgreSQL schemas cutting query times by 30% during load testing.", "Deployed systems on GCP using Docker and CI/CD on Unix-based environments."] },
    { title: "Software Engineer Intern", company: "Essell 24", period: "Sept 2023 – Nov 2023", location: "San Francisco, CA", stack: "TypeScript, React.js, REST APIs, Git, CI/CD, Postman", bullets: ["Optimized asset pipeline with lazy loading, reducing page load latency by 16%.", "Redesigned REST API responses, reducing redundant payloads.", "Built scalable UI components in TypeScript for CI/CD pipelines."] },
    { title: "Software Developer Intern", company: "Hammer Lifestyle", period: "June 2023 – Aug 2023", location: "Haryana, India", stack: "React Native, Redux, Node.js, Firebase, REST APIs, MongoDB", bullets: ["Developed health-tracking module for smartwatches, reducing sync failures by 24%.", "Optimized Firebase data sync for 10K+ active users.", "Optimized MongoDB queries for improved ingestion pipeline."] },
    { title: "Software Developer Intern", company: "Nyadeko", period: "March 2023 – May 2023", location: "New Delhi, India", stack: "React.js, TypeScript, Node.js, MongoDB, JWT, V8 Optimization", bullets: ["Redesigned performance-critical B2B dashboard.", "Secured RESTful endpoints with multi-layer JWT auth.", "Reduced API response latency by 35% via async handling."] },
  ],
  projects: [
    { name: "GitStage – AI-Powered Codebase Chatbot", icon: "🚀", stack: ["React", "FastAPI", "PostgreSQL", "Celery", "Redis", "OpenAI"], githubLink: "https://github.com/NehalGarg29/gitstage", bullets: ["Ingests Python codebases and parses AST structure into semantic chunks for vector embedding generation.", "Developed a robust RAG chatbot using FastAPI, pgvector, and OpenAI for interactive developer queries.", "Orchestrated background ingestion queues utilizing Celery and Redis to handle concurrent repository parsing."] },
    { name: "EmoTunes – AI Music Recommendation Engine", icon: "🎵", stack: ["Python", "TensorFlow", "OpenCV", "Spotify API", "CNN"], githubLink: "https://github.com/NehalGarg29/EmoTunes", bullets: ["85% accuracy emotion recognition using CNN on FER-2013.", "Integrated Spotify API for mood-based playlist generation.", "Real-time face tracking with async audio transitions."] },
    { name: "Artist Discovery Android App", icon: "🎨", stack: ["Kotlin", "Jetpack Compose", "Retrofit", "MongoDB", "JWT"], githubLink: "https://github.com/NehalGarg29/ArtsyApi", bullets: ["Artsy API integration with JWT-based auth.", "MongoDB favorites + Jetpack Compose ViewModel state.", "Coroutine-based Retrofit for optimized network calls."] },
    { name: "AppleGo – Product Discovery Platform", icon: "💻", stack: ["React.js", "Django", "MySQL", "Google Maps API", "REST APIs"], githubLink: "https://github.com/NehalGarg29", bullets: ["Analyzed 50K+ search queries for retailer visibility.", "Django + MySQL backend for real-time inventory sync."] },
    { name: "Smart Patient Room – Hospital Management", icon: "🏥", stack: ["Go", "Expo", "React Native", "PostgreSQL", "REST APIs"], githubLink: "https://github.com/NehalGarg29/Hospitality-Management-Platform", bullets: ["Built full-stack hospital management system with Go compliance engine and Expo mobile app.", "Designed PostgreSQL schema with 6 tables, full audit trail, and real-time vitals monitoring.", "REST API compliance engine with audit logging and seeded test data."] },
    { name: "Baseline – Gamified Productivity App", icon: "🧗", stack: ["React Native", "Expo", "TypeScript", "Node.js", "Express", "SQLite"], githubLink: "https://github.com/NehalGarg29/Baseline", bullets: ["Built gamified habit-tracking mobile app with XP system, daily quests, and level progression.", "Designed immersive dark-forest HUD with 3D avatars and glassmorphic UI components.", "Integrated AI performance coach with adaptive coaching based on user habits."] },
  ],
  publications: [
    { title: "AppleGo – Product Discovery Platform", stack: "React.js, Django, MySQL, Google Maps API", link: "https://www.ijraset.com/research-paper/applego-react-js-web-application", bullets: ["Analyzed 50K+ queries for decentralized retailer visibility.", "Published research on real-time product discovery."] },
    { title: "Blockchain Crowdfunding Framework (IJISRT)", stack: "Solidity, Node.js, PostgreSQL", link: "https://ijisrt.com/revolutionizing-crowdfunding-using-blockchain-technology", bullets: ["Smart contracts for secure, transparent decentralized funding.", "Published in IJISRT journal on distributed ledger applications in fintech."] },
  ],
  skills: {
    languages: ["Java", "Python", "C++", "JavaScript", "TypeScript", "Kotlin", "C", "GoLang", "XML"],
    frameworks: ["React", "Redux", "Node.js", "Express", "Django", "Flask", "TensorFlow", "PyTorch", "OpenCV", "Bootstrap", "Next.js"],
    tools: ["Git", "Docker", "AWS", "GCP", "Postman", "MongoDB", "MySQL", "PostgreSQL", "Firebase", "Unix/Linux"],
    ml: ["NumPy", "Pandas", "Matplotlib", "Scikit-learn", "Seaborn", "REST APIs", "JWT Auth", "CI/CD", "Agile"],
  },
};
