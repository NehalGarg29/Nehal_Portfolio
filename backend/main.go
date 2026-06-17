package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os/exec"
)

// --- Data Models ---

type Education struct {
	Degree  string `json:"degree"`
	School  string `json:"school"`
	GPA     string `json:"gpa"`
	Period  string `json:"period"`
	Status  string `json:"status,omitempty"`
	Courses string `json:"courses"`
}

type Experience struct {
	Title    string   `json:"title"`
	Company  string   `json:"company"`
	Period   string   `json:"period"`
	Location string   `json:"location"`
	Stack    string   `json:"stack"`
	Bullets  []string `json:"bullets"`
}

type Project struct {
	Name       string   `json:"name"`
	Stack      []string `json:"stack"`
	Bullets    []string `json:"bullets"`
	GithubLink string   `json:"githubLink"`
	Icon       string   `json:"icon,omitempty"`
}

type Publication struct {
	Title   string   `json:"title"`
	Stack   string   `json:"stack"`
	Bullets []string `json:"bullets"`
	Link    string   `json:"link"`
}

type Skills struct {
	Languages  []string `json:"languages"`
	Frameworks []string `json:"frameworks"`
	Tools      []string `json:"tools"`
	ML         []string `json:"ml"`
}

type Portfolio struct {
	Name         string        `json:"name"`
	Title        string        `json:"title"`
	Location     string        `json:"location"`
	Github       string        `json:"github"`
	LinkedIn     string        `json:"linkedin"`
	Education    []Education   `json:"education"`
	Experience   []Experience  `json:"experience"`
	Projects     []Project     `json:"projects"`
	Publications []Publication `json:"publications"`
	Skills       Skills        `json:"skills"`
}

// --- Data ---

func getPortfolioData() Portfolio {
	return Portfolio{
		Name:     "Nehal Garg",
		Title:    "Software Engineer | Full Stack Developer | AI/ML & Data Engineer",
		Location: "Los Angeles, CA",
		Github:   "https://github.com/NehalGarg29",
		LinkedIn: "https://www.linkedin.com/in/nehal-garg29/",
		Education: []Education{
			{
				Degree:  "Masters of Science in Computer Science",
				School:  "University of Southern California",
				GPA:     "3.63",
				Period:  "Aug 2024 – May 2026",
				Status:  "Graduated",
				Courses: "Algorithm Analysis, Web Technologies, Applied NLP, Machine Learning, Data Management, Software Engineering, Affective Computing",
			},
			{
				Degree:  "Bachelor of Technology in Computer Science",
				School:  "Guru Gobind Singh Indraprastha University",
				GPA:     "3.72",
				Period:  "Aug 2020 – June 2024",
				Courses: "Data Structures, OOP, Operating Systems, Artificial Intelligence, Distributed and Parallel Systems",
			},
		},
		Experience: []Experience{
			{
				Title:    "Software Engineer Intern",
				Company:  "ZofAI",
				Period:   "June 2025 – Sept 2025",
				Location: "San Francisco, CA",
				Stack:    "Next.js, TypeScript, Tailwind CSS, Prisma, PostgreSQL, Vercel, Python, GCP, Docker",
				Bullets: []string{
					"Built full-stack features (dashboards, access control, usage analytics) that enabled 5+ client teams to automate QA workflows.",
					"Designed PostgreSQL schemas and Prisma models to improve data reliability and cut query times by 30% during load testing.",
					"Deployed systems on Google Cloud (GCP) using Docker and CI/CD workflows on Unix-based environments.",
				},
			},
			{
				Title:    "Software Engineer Intern",
				Company:  "Essell 24",
				Period:   "Sept 2023 – Nov 2023",
				Location: "San Francisco, CA",
				Stack:    "TypeScript, React.js, REST APIs, Git, CI/CD, Postman",
				Bullets: []string{
					"Optimized core asset pipeline using lazy loading and compression in React.js, reducing page load latency by 16%.",
					"Collaborated with backend engineers to redesign REST API responses, reducing redundant payloads and improving responsiveness.",
					"Built and unit-tested scalable UI components in TypeScript for CI/CD pipelines, improving reusability and deployment reliability.",
				},
			},
			{
				Title:    "Software Developer Intern",
				Company:  "Hammer Lifestyle",
				Period:   "June 2023 – Aug 2023",
				Location: "Haryana, India",
				Stack:    "React Native, Redux, Node.js, Firebase, REST APIs, MongoDB",
				Bullets: []string{
					"Developed a health-tracking module for smartwatches using React Native and Firebase, reducing sync failures by 24%.",
					"Optimized data sync logic in Firebase backend, improving real-time reliability across 10K+ active users.",
					"Collaborated with backend engineers to optimize MongoDB queries, enhancing data ingestion pipeline performance.",
				},
			},
			{
				Title:    "Software Developer Intern",
				Company:  "Nyadeko",
				Period:   "March 2023 – May 2023",
				Location: "New Delhi, India",
				Stack:    "React.js, TypeScript, Node.js, MongoDB, JWT, V8 Optimization",
				Bullets: []string{
					"Redesigned performance-critical dashboard using React.js and TypeScript, increasing workflow efficiency across B2B users.",
					"Developed and secured RESTful endpoints with token-based multi-layer authentication and persistent session handling.",
					"Reduced API response latency by 35% through logic refactoring and async handling in dashboard workflows.",
				},
			},
		},
		Projects: []Project{
			{
				Name:       "GitStage – AI-Powered Codebase Chatbot",
				Stack:      []string{"React", "FastAPI", "PostgreSQL", "Celery", "Redis", "OpenAI"},
				GithubLink: "https://github.com/NehalGarg29/gitstage",
				Icon:       "🚀",
				Bullets: []string{
					"Ingests Python codebases and parses AST structure into semantic chunks for vector embedding generation.",
					"Developed a robust RAG chatbot using FastAPI, pgvector, and OpenAI for interactive developer queries.",
					"Orchestrated background ingestion queues utilizing Celery and Redis to handle concurrent repository parsing.",
				},
			},
			{
				Name:       "EmoTunes – AI Music Recommendation Engine",
				Stack:      []string{"Python", "TensorFlow", "OpenCV", "Spotify API", "CNN"},
				GithubLink: "https://github.com/NehalGarg29/EmoTunes",
				Icon:       "🎵",
				Bullets: []string{
					"Engineered a real-time emotion recognition system using CNN trained on FER-2013, achieving 85% accuracy across 7 emotions.",
					"Integrated with Spotify API to generate mood-based playlists, reducing manual search and increasing engagement.",
					"Combined OpenCV-based face tracking with async audio logic and real-time feedback for responsive music transitions.",
				},
			},
			{
				Name:       "Artist Discovery Android App",
				Stack:      []string{"Kotlin", "Jetpack Compose", "Retrofit", "MongoDB", "JWT"},
				GithubLink: "https://github.com/NehalGarg29/ArtsyApi",
				Icon:       "🎨",
				Bullets: []string{
					"Created a modern Android app to search, view, and favorite artists using the Artsy API with JWT-based secure authentication.",
					"Persisted user interactions (favorites) using MongoDB and managed UI state using Jetpack Compose and ViewModel architecture.",
					"Optimized network responsiveness through coroutine-based Retrofit calls and async UI handling.",
				},
			},
			{
				Name:       "AppleGo – Product Discovery Platform",
				Stack:      []string{"React.js", "Django", "MySQL", "Google Maps API", "REST APIs"},
				GithubLink: "https://github.com/NehalGarg29",
				Icon:       "💻",
				Bullets: []string{
					"Analyzed 50K+ search queries to evaluate decentralized retailer visibility and pricing.",
					"Built Django + MySQL backend for real-time retailer inventory sync and Apple product comparison.",
				},
			},
			{
				Name:       "Smart Patient Room – Hospital Management",
				Stack:      []string{"Go", "Expo", "React Native", "PostgreSQL", "REST APIs"},
				GithubLink: "https://github.com/NehalGarg29/Hospitality-Management-Platform",
				Icon:       "🏥",
				Bullets: []string{
					"Built full-stack hospital management system with Go compliance engine and Expo/React Native mobile app.",
					"Designed PostgreSQL schema with 6 tables, full audit trail, and real-time patient vitals monitoring.",
					"Implemented REST API compliance engine with audit logging, seeded test data, and concurrent vitals simulation.",
				},
			},
			{
				Name:       "Baseline – Gamified Productivity App",
				Stack:      []string{"React Native", "Expo", "TypeScript", "Node.js", "Express", "SQLite"},
				GithubLink: "https://github.com/NehalGarg29/Baseline",
				Icon:       "🧗",
				Bullets: []string{
					"Built gamified habit-tracking mobile app with XP system, daily quests, and level progression.",
					"Designed immersive dark-forest HUD with 3D avatars and glassmorphic UI components.",
					"Integrated AI performance coach with adaptive coaching based on user habits.",
				},
			},
		},
		Publications: []Publication{
			{
				Title: "AppleGo – Product Discovery Platform",
				Stack: "React.js, Django, MySQL, Google Maps API",
				Link:  "https://www.ijraset.com/research-paper/applego-react-js-web-application",
				Bullets: []string{
					"Analyzed 50K+ search queries to evaluate decentralized retailer visibility and pricing patterns.",
					"Published research on real-time product discovery and decentralized retail visibility.",
				},
			},
			{
				Title: "Blockchain-based Crowdfunding Framework (IJISRT)",
				Stack: "Solidity, Node.js, PostgreSQL, REST APIs",
				Link:  "https://ijisrt.com/revolutionizing-crowdfunding-using-blockchain-technology",
				Bullets: []string{
					"Designed a decentralized funding system using smart contracts for secure, transparent transactions.",
					"Published in IJISRT journal on distributed ledger applications in fintech.",
				},
			},
		},
		Skills: Skills{
			Languages:  []string{"Java", "Python", "C++", "JavaScript", "TypeScript", "Kotlin", "C", "GoLang", "XML"},
			Frameworks: []string{"React", "Redux", "Node.js", "Express", "Django", "Flask", "TensorFlow", "PyTorch", "OpenCV", "Bootstrap", "Next.js"},
			Tools:      []string{"Git", "Docker", "AWS", "GCP", "Postman", "MongoDB", "MySQL", "PostgreSQL", "Firebase", "Unix/Linux"},
			ML:         []string{"NumPy", "Pandas", "Matplotlib", "Scikit-learn", "Seaborn", "REST APIs", "JWT Auth", "CI/CD", "Agile"},
		},
	}
}

// --- Handlers ---

func corsMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}
		next(w, r)
	}
}

func portfolioHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	data := getPortfolioData()
	json.NewEncoder(w).Encode(data)
}

func githubStatsHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	out, err := exec.Command("python3", "../scripts/github_stats.py").Output()
	if err != nil {
		// Return fallback stats if Python script fails
		fallback := map[string]interface{}{
			"repos":     28,
			"stars":     9,
			"followers": 2,
			"topLangs":  []string{"JavaScript", "Python", "TypeScript", "HTML", "Kotlin"},
		}
		json.NewEncoder(w).Encode(fallback)
		return
	}
	w.Write(out)
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/api/portfolio", corsMiddleware(portfolioHandler))
	mux.HandleFunc("/api/github-stats", corsMiddleware(githubStatsHandler))

	fmt.Println("🚀 Portfolio API running at http://localhost:8082")
	log.Fatal(http.ListenAndServe(":8082", mux))
}
