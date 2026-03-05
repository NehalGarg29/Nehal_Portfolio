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
import './index.css';

const API_BASE = 'http://localhost:8080';

export default function App() {
  const [portfolio, setPortfolio] = useState(null);
  const [githubStats, setGithubStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [portRes, statsRes] = await Promise.all([
          fetch(`${API_BASE}/api/portfolio`),
          fetch(`${API_BASE}/api/github-stats`),
        ]);
        const portData = await portRes.json();
        const statsData = await statsRes.json();
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#fafafa' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px', height: '48px', border: '3px solid rgba(196,181,253,0.4)',
            borderTop: '3px solid #7c3aed', borderRadius: '50%',
            animation: 'spin 1s linear infinite', margin: '0 auto 1rem'
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p style={{ color: '#7c3aed', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem' }}>loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
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
    { degree: "Masters of Science in Computer Science", school: "University of Southern California", gpa: "3.56", period: "Aug 2024 – May 2026", courses: "Algorithm Analysis, Web Technologies, Applied NLP, Machine Learning, Data Management" },
    { degree: "Bachelor of Technology in Computer Science", school: "Guru Gobind Singh Indraprastha University", gpa: "3.72", period: "Aug 2020 – June 2024", courses: "Data Structures, OOP, Operating Systems, AI, Distributed Systems" },
  ],
  experience: [
    { title: "Software Engineer Intern", company: "ZofAI", period: "June 2025 – Sept 2025", location: "San Francisco, CA", stack: "Next.js, TypeScript, Tailwind CSS, Prisma, PostgreSQL, Vercel, Python, GCP, Docker", bullets: ["Built full-stack features enabling 5+ client teams to automate QA workflows.", "Designed PostgreSQL schemas cutting query times by 30% during load testing.", "Deployed systems on GCP using Docker and CI/CD on Unix-based environments."] },
    { title: "Software Engineer Intern", company: "Essell 24", period: "Sept 2023 – Nov 2023", location: "San Francisco, CA", stack: "TypeScript, React.js, REST APIs, Git, CI/CD, Postman", bullets: ["Optimized asset pipeline with lazy loading, reducing page load latency by 16%.", "Redesigned REST API responses, reducing redundant payloads.", "Built scalable UI components in TypeScript for CI/CD pipelines."] },
    { title: "Software Developer Intern", company: "Hammer Lifestyle", period: "June 2023 – Aug 2023", location: "Haryana, India", stack: "React Native, Redux, Node.js, Firebase, REST APIs, MongoDB", bullets: ["Developed health-tracking module for smartwatches, reducing sync failures by 24%.", "Optimized Firebase data sync for 10K+ active users.", "Optimized MongoDB queries for improved ingestion pipeline."] },
    { title: "Software Developer Intern", company: "Nyadeko", period: "March 2023 – May 2023", location: "New Delhi, India", stack: "React.js, TypeScript, Node.js, MongoDB, JWT, V8 Optimization", bullets: ["Redesigned performance-critical B2B dashboard.", "Secured RESTful endpoints with multi-layer JWT auth.", "Reduced API response latency by 35% via async handling."] },
  ],
  projects: [
    { name: "EmoTunes – AI Music Recommendation Engine", stack: ["Python", "TensorFlow", "OpenCV", "Spotify API", "CNN"], githubLink: "https://github.com/NehalGarg29/EmoTunes", bullets: ["85% accuracy emotion recognition using CNN on FER-2013.", "Integrated Spotify API for mood-based playlist generation.", "Real-time face tracking with async audio transitions."] },
    { name: "Artist Discovery Android App", stack: ["Kotlin", "Jetpack Compose", "Retrofit", "MongoDB", "JWT"], githubLink: "https://github.com/NehalGarg29/ArtsyApi", bullets: ["Artsy API integration with JWT-based auth.", "MongoDB favorites + Jetpack Compose ViewModel state.", "Coroutine-based Retrofit for optimized network calls."] },
    { name: "AppleGo – Product Discovery Platform", stack: ["React.js", "Django", "MySQL", "Google Maps API", "REST APIs"], githubLink: "https://github.com/NehalGarg29", bullets: ["Analyzed 50K+ search queries for retailer visibility.", "Django + MySQL backend for real-time inventory sync."] },
    { name: "Smart Patient Room – Hospital Management", stack: ["Go", "Expo", "React Native", "PostgreSQL", "REST APIs"], githubLink: "https://github.com/NehalGarg29/Hospitality-Management-Platform", bullets: ["Built full-stack hospital management system with Go compliance engine and Expo mobile app.", "Designed PostgreSQL schema with 6 tables, full audit trail, and real-time vitals monitoring.", "REST API compliance engine with audit logging and seeded test data."] },
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
