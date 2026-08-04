export const PROFILE = {
    name: "Siddharth Kumar",
    role: "Full Stack Developer | AI/ML Engineer",
    location: "Sikkim, India",
    email: "siddharth.sk324@gmail.com",
    socials: {
        github: "https://github.com/SparkSidd",
        linkedin: "https://www.linkedin.com/in/sparksidd/",
    },
    biography: "I build software at the intersections of Full-Stack Architecture, Cybersecurity, and AI/ML. Rather than confining myself to a single layer, I solve problems that require fluency across web interfaces, resilient backends, and machine learning models.\n\nI believe high-impact engineering happens when disciplines meet — a developer who understands security writes safer code, and an AI engineer who thinks in production ships models that scale.",
    skills: [
        // -- Frontend
        { name: "React / Next.js", icon: "atom", description: "Frontend Architecture", category: "Frontend" },
        { name: "TailwindCSS / Vite", icon: "atom", description: "Modern Tooling", category: "Frontend" },
        { name: "Three.js / R3F / Drei", icon: "atom", description: "3D Web", category: "Frontend" },
        { name: "Framer Motion / GSAP", icon: "atom", description: "Animations", category: "Frontend" },
        // -- Languages
        { name: "TypeScript / JavaScript", icon: "code", description: "Strong Typing", category: "Languages" },
        { name: "Python", icon: "code", description: "Scripting & ML", category: "Languages" },
        { name: "C", icon: "code", description: "Systems & Compilers", category: "Languages" },
        { name: "SQL", icon: "database", description: "Structured Queries", category: "Languages" },
        { name: "HTML / CSS", icon: "code", description: "Web Standards", category: "Languages" },
        // -- Backend
        { name: "Node.js / Express", icon: "server", description: "Scalable Backend", category: "Backend" },
        { name: "Python / FastAPI", icon: "server", description: "Backend & ML", category: "Backend" },
        { name: "Flask", icon: "server", description: "Micro Framework", category: "Backend" },
        { name: "REST API Design", icon: "server", description: "API Architecture", category: "Backend" },
        { name: "WebSocket", icon: "server", description: "Real-time Comms", category: "Backend" },
        // -- AI & ML
        { name: "TensorFlow / PyTorch", icon: "brain", description: "Deep Learning", category: "AI & ML" },
        { name: "LLMs / GenAI", icon: "sparkles", description: "Advanced AI", category: "AI & ML" },
        { name: "LangChain / RAG", icon: "brain", description: "AI Pipelines", category: "AI & ML" },
        { name: "Gemini / OpenAI APIs", icon: "sparkles", description: "AI APIs", category: "AI & ML" },
        { name: "Prompt Engineering", icon: "sparkles", description: "LLM Optimization", category: "AI & ML" },
        { name: "HuggingFace / Transformers", icon: "brain", description: "NLP Models", category: "AI & ML" },
        { name: "Scikit-Learn", icon: "brain", description: "Classical ML", category: "AI & ML" },
        { name: "NLP / Computer Vision", icon: "brain", description: "Perception AI", category: "AI & ML" },
        // -- Mobile
        { name: "Flutter", icon: "atom", description: "Cross-platform UI", category: "Mobile" },
        { name: "Dart", icon: "code", description: "Flutter Language", category: "Mobile" },
        { name: "Android Studio", icon: "terminal", description: "Native Android", category: "Mobile" },
        // -- DevOps & Tooling
        { name: "Docker / Docker Compose", icon: "container", description: "Containerization", category: "DevOps" },
        { name: "Linux", icon: "terminal", description: "OS & Shell", category: "DevOps" },
        { name: "AWS", icon: "cloud", description: "Cloud Infrastructure", category: "DevOps" },
        { name: "Git / GitHub Workflows", icon: "git", description: "Version Control", category: "DevOps" },
        { name: "Vercel / Render / Railway", icon: "cloud", description: "Cloud Deployment", category: "DevOps" },
        // -- Databases
        { name: "MongoDB", icon: "database", description: "NoSQL / Document DB", category: "Databases" },
        { name: "PostgreSQL / SQLite", icon: "database", description: "Relational DBs", category: "Databases" },
        { name: "Vector Databases", icon: "database", description: "Semantic Search", category: "Databases" },
        { name: "SQLAlchemy / Alembic", icon: "database", description: "ORM & Migrations", category: "Databases" },
        { name: "Supabase", icon: "database", description: "Backend-as-a-Service", category: "Databases" },
        // -- Data
        { name: "Pandas / NumPy", icon: "server", description: "Data Manipulation", category: "Data" },
        { name: "Streamlit", icon: "server", description: "Data Apps", category: "Data" },
        { name: "Matplotlib / Seaborn", icon: "server", description: "Visualization", category: "Data" },
        { name: "Plotly", icon: "server", description: "Interactive Charts", category: "Data" },
        { name: "OpenPyXL / CSV / Excel", icon: "server", description: "Spreadsheet Automation", category: "Data" },
        // -- Vision & Speech
        { name: "OpenCV / MediaPipe", icon: "server", description: "Computer Vision", category: "Vision & Speech" },
        { name: "CvZone / Webcam Inference", icon: "server", description: "Real-time CV", category: "Vision & Speech" },
        // -- Docs & Cyber
        { name: "PyPDF / PDFPlumber / PDF.js", icon: "shield", description: "Document Parsing", category: "Docs & Cyber" },
        { name: "Python-docx / Python-pptx", icon: "shield", description: "Office Automation", category: "Docs & Cyber" },
        { name: "Document Chat Pipelines", icon: "brain", description: "RAG Docs", category: "Docs & Cyber" },
        { name: "Chrome Extension MV3", icon: "code", description: "Browser Extension", category: "Docs & Cyber" },
        { name: "Phishing Heuristics", icon: "shield", description: "Threat Detection", category: "Docs & Cyber" },
        { name: "Honeypot Signals", icon: "shield", description: "Cybersecurity", category: "Docs & Cyber" },
    ],
    experience: [
        {
            role: "Mobile Development Engineer Intern",
            company: "Aibi Technologies",
            period: "May 2026 – Jul 2026",
            description: "Converted an existing production website into a fully working mobile application, handling the transition from web to native functionality. Worked hands-on with Flutter and Dart in Android Studio, picking up mobile app architecture and platform-specific considerations. Took part in code reviews and picked up the team's workflow for testing and releasing changes.",
            tech: ["Flutter", "Dart", "Android Studio", "Mobile Architecture", "Code Reviews"]
        },
        {
            role: "Summer Intern – Dept of IT",
            company: "NBPDCL (North Bihar Power Distribution Company Ltd)",
            period: "May 2025 – July 2025",
            description: "Spearheaded the development of a real-time Electricity Theft Detection Dashboard using Python and Streamlit. Engineered an anomaly detection pipeline that processes consumption data to flag irregular patterns, directly reducing manual field inspection time by 60%. Collaborated with senior engineers to integrate the solution with existing legacy databases, ensuring seamless data flow and reporting.",
            tech: ["Python", "Streamlit", "Pandas", "Plotly", "Anomaly Detection"]
        },
        {
            role: "AI/ML Co-Lead",
            company: "Encoders (Coding Club, SMIT)",
            period: "2024 – Present",
            description: "Co-leading the AI/ML vertical at the college coding club. Organizing workshops on machine learning, generative AI, and LLM basics for club members. Supporting peers with project guidance, code reviews, and hackathon prep.",
            tech: ["Leadership", "Mentoring", "GenAI", "Workshop Facilitation"],
            takeaway: "Co-lead the AI/ML vertical at Encoders Coding Club, SMIT — running workshops and mentoring peers on machine learning and generative AI fundamentals."
        },
        {
            role: "Chief Website Administrator",
            company: "SMITMUN (Model United Nations)",
            period: "January 2026 – Present",
            description: "Served as the Chief Website Administrator for SMITMUN.",
            tech: ["Web Administration", "Security", "Database Management"]
        },
        {
            role: "Technical Team Lead",
            company: "Smart India Hackathon (SIH) & Innovation Challenges",
            period: "2024 – 2025",
            description: "Led multiple high-performance teams in national-level hackathons including SIH and InnoFusion. Architected full-stack solutions under 24-hour constraints, managing both backend infrastructure and frontend integration. Specialized in rapid prototyping of AI-integrated applications, ensuring robust MVPs that secured finalist positions.",
            tech: ["Project Management", "Full Stack", "Rapid Prototyping", "Team Leadership"]
        }
    ],
    education: [
        {
            degree: "B.Tech in Computer Science Engineering",
            institution: "Sikkim Manipal Institute of Technology",
            year: "2023 – 2027 Expected (7th Sem)",
            score: "Minor in Cyber Security"
        }
    ],
    projects: [
        {
            id: "phishdetect-ai",
            title: "PhishDetect AI",
            category: "AI / ML",
            tagline: "Explainable real-time phishing protection",
            description: "PhishDetect AI is a real-time browser and email protection system that uses a machine learning ensemble to score every URL and message for phishing risk — and then explains exactly why it flagged it.",
            longDescription: "Most phishing tools are black boxes: they block something and give you no reason. PhishDetect AI is different. It combines XGBoost and a lightweight transformer model to score URLs and email content in real time, then uses SHAP (SHapley Additive exPlanations) to surface exactly which features drove the verdict — whether it was a suspicious subdomain structure, a newly registered domain, a mismatched sender, or manipulative anchor text. The Chrome MV3 extension intercepts requests at the browser level, the FastAPI backend processes and scores them within milliseconds via a Redis queue, and analysts get a dashboard where they can see token-level attribution maps, quarantine decisions, and full audit trails. The system is designed to reduce analyst fatigue by separating high-confidence auto-blocks from borderline cases that need human review.",
            problem: "Security teams are drowning in phishing alerts with no context. When a tool just says \"blocked\", analysts can't learn from it, can't trust it, and can't appeal it. False positives are expensive, and missed detections are catastrophic.",
            solution: "PhishDetect AI gives every detection a receipt. Each risk score comes with a breakdown — what features fired, how much they contributed, and what the model's confidence was. This makes automated blocking trustworthy and gives analysts the context they need to triage the edge cases quickly.",
            howItWorks: [
                "The Chrome MV3 extension intercepts every outbound request and email link before it loads",
                "The client SDK decomposes the URL and email headers, then sends features to the FastAPI backend via a Redis-backed async queue",
                "The backend runs a dual-model ensemble: XGBoost on lexical and domain reputation features, and a transformer on email body content",
                "SHAP attribution values are computed per-token and per-feature, highlighting exactly what drove the risk score",
                "The policy engine applies configurable thresholds — auto-block, quarantine, or flag for review — and dispatches streaming alerts to the analyst dashboard",
                "Analysts can replay any blocked request, see the attribution map, override decisions, and feed corrections back into the model pipeline"
            ],
            engineeringHighlights: "Ensemble ML (XGBoost + Transformers) + SHAP Explainability Engine + FastAPI & Redis Queue.",
            image: "/phishdetect-thumb.jpg",
            demoMedia: "/phishdetect-description.png",
            href: "https://github.com/SparkSidd",
            techStack: ["Python", "XGBoost", "Transformers", "SHAP", "FastAPI", "Redis", "PostgreSQL", "React", "Chrome MV3"],
            githubLink: "https://github.com/SparkSidd",
            liveLink: ""
        },
        {
            id: "neurodoc-ai",
            title: "NeuroDoc AI",
            category: "AI / ML",
            tagline: "PDF → Searchable medical knowledge",
            description: "NeuroDoc AI turns stacks of unstructured clinical PDFs and scanned medical reports into a structured, searchable knowledge base — making patient data actually useful for clinicians and researchers.",
            longDescription: "Medical data lives in PDFs: discharge summaries, lab reports, diagnostic scans, handwritten notes. NeuroDoc AI ingests all of it. It uses Tesseract OCR for scanned documents and LayoutLM for understanding complex page structures — tables, headers, embedded charts — that plain OCR would destroy. A custom NER pipeline extracts medical entities like diagnoses, medications, dosages, dates, and measurement values, then links them relationally so you can ask questions like \"show all patients where creatinine exceeded 1.5 over the last 6 months.\" Extracted data is indexed into FAISS for semantic search, meaning you can query in natural language rather than exact keywords. The result is a research-ready, time-series patient dashboard and a queryable knowledge layer built entirely from documents that were previously locked in file cabinets.",
            problem: "Hospitals and clinics have decades of patient data trapped in PDFs and scanned forms. Clinicians can't search across them, researchers can't trend them, and every manual extraction is hours of work prone to human error.",
            solution: "NeuroDoc AI automates the full extraction pipeline — from raw PDF to structured, normalized, semantically searchable records — with a medical-domain NER model that understands clinical terminology and a vector search layer that supports natural language queries.",
            howItWorks: [
                "PDFs and scanned images are ingested in batches; LayoutLM identifies document zones (headers, tables, body text) before any extraction begins",
                "Tesseract OCR processes scanned pages while digital PDFs are parsed with PDFPlumber for text with preserved layout coordinates",
                "A fine-tuned medical NER model extracts entities — diagnoses, lab values, medications, dates, measurements — and resolves them against a medical ontology",
                "Extracted entities are linked relationally (e.g., medication → dosage → diagnosis) and stored in a structured PostgreSQL schema",
                "All records are simultaneously embedded and indexed into FAISS, enabling semantic search across the full document corpus",
                "A React dashboard visualizes patient timelines, trending metrics, and semantic search results with Recharts-powered diagnostics graphs"
            ],
            engineeringHighlights: "LayoutLM + Tesseract OCR + FAISS Vector Search + Medical NER Normalization.",
            image: "/neurodoc.thumb.png",
            demoMedia: "/neurodoc-ui.png",
            href: "https://github.com/SparkSidd",
            techStack: ["Python", "PyTorch", "HuggingFace", "Tesseract", "FAISS", "FastAPI", "React", "Recharts"],
            githubLink: "https://github.com/SparkSidd",
            liveLink: ""
        },
        {
            id: "silentbridge",
            title: "SilentBridge",
            category: "AI / ML",
            tagline: "Real-time Indian Sign Language translator",
            description: "SilentBridge is a real-time Indian Sign Language (ISL) translator that reads live camera input and converts gestures into text and spoken audio — bridging communication between Deaf and hearing individuals in real conversations.",
            longDescription: "ISL is not a direct mapping of English words to hand shapes — it has its own grammar, spatial syntax, and regional variations. SilentBridge is built around this reality. MediaPipe extracts a full 3D keypoint skeleton from the hand and body on every frame, and a temporal sequence model (trained on ISL-specific gesture sequences) maps those keypoints into meaning over time rather than treating each frame in isolation. This temporal understanding means the model handles the flow of sign language — signs that change meaning based on movement speed, direction, and context. A language model then smooths the classified gesture sequence into grammatically coherent output, which is displayed as live captions and optionally voiced via Web Speech API TTS. The system runs at low latency, designed to feel natural during actual conversations, not just as a demonstration.",
            problem: "Over 5 million people in India use ISL as their primary language, yet there are almost no real-time tools that translate ISL in live conversation settings. Existing solutions are either offline, too slow, or trained on simplified gesture sets that don't reflect real ISL usage.",
            solution: "SilentBridge uses MediaPipe to extract skeletal keypoints from live video, feeds them through a temporal gesture model trained specifically on ISL sequences, and produces live captions and speech output — all in a browser-accessible interface with no specialized hardware required.",
            howItWorks: [
                "The browser accesses the camera via WebRTC and streams frames to the processing pipeline in real time",
                "MediaPipe Holistic extracts 21 hand landmarks and 33 body pose keypoints per frame, building a 3D skeletal representation of the signer",
                "Sequences of keypoint frames are fed into a temporal model (LSTM/Transformer) that classifies ISL gesture sequences into words and phrases",
                "A language model post-processes the raw classifications to apply ISL grammar rules and smooth out recognition noise",
                "The final output is displayed as live captions on screen and optionally spoken aloud via the Web Speech API TTS engine",
                "A confidence score is shown for each recognized sign, with a fallback UI for uncertain gestures that prompts the signer to repeat"
            ],
            engineeringHighlights: "MediaPipe Keypoints + TFLite On-device Inference + WebRTC + Text-to-Speech.",
            image: "/silent bridge.thumb.png",
            demoMedia: "/silentbridge-ui.png",
            href: "https://github.com/SparkSidd",
            techStack: ["Python", "TensorFlow Lite", "MediaPipe", "OpenCV", "WebRTC", "React", "Node.js"],
            githubLink: "https://github.com/SparkSidd",
            liveLink: ""
        },
        {
            id: "electricity-theft",
            title: "Electricity Theft Detection System",
            category: "SYSTEMS",
            tagline: "Smart meter analytics for NBPDCL",
            description: "An ML-powered analytics system built for NBPDCL (North Bihar Power Distribution Company Ltd.) that analyzes smart meter telemetry to automatically detect electricity theft, meter tampering, and non-technical losses — and dispatches prioritized alerts to field investigators.",
            longDescription: "Electricity theft costs Indian power utilities billions of rupees annually, but traditional detection methods rely on manual inspections triggered by billing anomalies that are already months old. This system changes that by analyzing smart meter data in near real-time. It ingests time-series consumption data from thousands of meters, applies resampling and alignment to normalize timestamps across different meter hardware, then extracts features that reveal theft signatures — sudden consumption drops, peak-hour anomalies, usage patterns inconsistent with neighboring meters on the same transformer. An Isolation Forest model flags individual meters as anomalous without needing labeled theft examples (since confirmed cases are rare). Suspicious meters are then grouped by transformer and feeder zone and displayed on a GIS heatmap so field teams can plan efficient dispatch routes. The integrated case management system tracks investigation outcomes and feeds confirmed theft cases back to refine the model.",
            problem: "NBPDCL was losing significant revenue to non-technical losses — electricity being consumed but not billed, either through meter tampering, illegal connections, or billing data manipulation. Identifying theft required time-consuming manual audits that caught problems months after they started.",
            solution: "An automated detection pipeline that ingests smart meter telemetry, applies unsupervised anomaly detection tuned to electricity consumption patterns, groups alerts by feeder zone onto a GIS heatmap, and gives field investigators a ranked dispatch list with supporting evidence for each flagged meter.",
            howItWorks: [
                "Smart meter telemetry is ingested continuously, resampled to consistent intervals, and cleaned to handle missing readings and hardware clock drift",
                "Features are engineered from the time series: daily consumption ratios, peak-to-off-peak shifts, week-over-week deltas, and comparison against neighborhood transformer baselines",
                "An Isolation Forest model scores each meter's anomaly level without requiring labeled theft data — the rarer the consumption pattern, the higher the suspicion score",
                "Autoencoders are run as a second pass on high-anomaly meters to validate the signal and catch subtler long-term drifts that Isolation Forest misses",
                "Alerts are aggregated by transformer group and plotted on a Streamlit GIS heatmap, letting supervisors see theft hotspots geographically and prioritize dispatch",
                "Field teams log investigation results in the case management module; confirmed theft cases are fed back to update model baselines and reduce false positives over time"
            ],
            engineeringHighlights: "Isolation Forests + TimescaleDB + Streamlit GIS Heatmaps + Case Dispatch Workflows.",
            image: "/electricity theft.thumb.png",
            demoMedia: "/electricity-ui.png",
            href: "https://github.com/SparkSidd",
            techStack: ["Python", "scikit-learn", "PyTorch", "Pandas", "Streamlit", "Plotly", "PostgreSQL", "GIS"],
            githubLink: "https://github.com/SparkSidd",
            liveLink: ""
        },
        {
            id: "mybudget-ai",
            title: "MyBudget AI",
            category: "WEB DEV",
            tagline: "AI personal finance assistant",
            description: "MyBudget AI is an intelligent personal finance assistant that automatically categorizes your transactions, forecasts your upcoming cashflow, and surfaces actionable savings insights — without requiring you to set up a single spreadsheet.",
            longDescription: "Most budgeting apps make you do the work: manually tag transactions, set categories, update them when merchants change names. MyBudget AI handles all of that automatically. It ingests bank transaction exports (CSV, OFX), resolves merchant names to canonical entities (so \"SWY 2847\" becomes \"Supermarket\"), and classifies each transaction into spending categories using a hybrid NLP transformer + rule engine. The rules layer means you can override any classification and the model learns from your corrections. Prophet and ARIMA models then forecast your cashflow 30 and 90 days out, flagging periods where you're likely to overspend based on historical patterns. The anomaly alert system catches things humans miss: a new subscription you forgot to cancel, an unexpected charge from a merchant you haven't used in months, or a recurring payment that suddenly jumped in amount. The scenario planner lets you model what happens to your balance if you cut a specific category by 20%.",
            problem: "Manual budgeting is tedious and inconsistent — most people start with good intentions and give up within a week. Meanwhile, the financial patterns that actually matter (a subscription creeping up, a seasonal spending spike) go unnoticed until the damage is done.",
            solution: "MyBudget AI automates the categorization work entirely, forecasts your balance trajectory using time-series models, and proactively alerts you to anomalies and over-budget categories — so financial awareness becomes passive rather than a chore.",
            howItWorks: [
                "Bank exports (CSV/OFX) or manually entered transactions are ingested; Tesseract OCR also supports photo receipts",
                "Merchant names are canonicalized and resolved to standardized entities to handle abbreviations and location codes in bank descriptions",
                "A fine-tuned transformer classifier assigns spending categories; a rule engine handles edge cases and user overrides are persisted for future learning",
                "Prophet and ARIMA models are trained on the user's historical spending to generate 30- and 90-day cashflow forecasts with confidence intervals",
                "An anomaly detector flags unusual charges, new recurring payments, and category overspend relative to the user's personal baseline",
                "The interactive dashboard shows spending breakdowns, forecasts, anomaly alerts, and a scenario planner for modeling budget changes"
            ],
            engineeringHighlights: "NLP Transformer Classification + Time-series Forecasting + Tesseract OCR Receipt Ingestion.",
            image: "/mybudgetai-thumb.png",
            demoMedia: "/mybudget-ui.png",
            href: "https://github.com/SparkSidd",
            techStack: ["Python", "FastAPI", "scikit-learn", "Transformers", "React", "Streamlit", "SQLite"],
            githubLink: "https://github.com/SparkSidd",
            liveLink: ""
        },
        {
            id: "finguard-ai",
            title: "FinGuard AI",
            category: "AI / ML",
            tagline: "Real-time fraud analytics & explainability",
            description: "FinGuard AI is a real-time financial fraud detection system that maps account relationships as a graph, scores transactions using an ML ensemble, and gives investigators a clear, explainable evidence chain — not just a risk score.",
            longDescription: "Traditional fraud detection treats each transaction in isolation. FinGuard AI doesn't. It builds a live graph of account relationships — who sends money to whom, which devices are shared between accounts, which IP addresses cluster together — and uses that relational structure as a primary signal. When a transaction comes in, NetworkX updates the graph in real time and runs community detection to identify whether the sender or receiver is connected to a known fraud cluster. XGBoost and a PyTorch anomaly model then score the transaction using both the raw features (amount, time, geolocation, device fingerprint) and graph-derived features (PageRank, betweenness centrality, cluster membership). SHAP values are computed for every verdict, and investigators see a Cytoscape.js network visualization that highlights exactly which accounts, edges, and features contributed to the risk score. Cases can be linked, watchlisted, and escalated through an integrated case management UI.",
            problem: "Fraud rings operate through coordinated networks of accounts, not isolated bad actors. A system that looks at transactions one at a time will miss the pattern even when every individual transaction looks plausible. Investigators also need more than a score — they need to understand the relationship chain to build a case.",
            solution: "FinGuard AI maintains a live relational graph of all account interactions, applies community detection to identify fraud clusters, scores each transaction with graph-augmented ML features, and delivers SHAP-attributed explanations alongside an interactive network visualization so investigators can trace the full evidence chain.",
            howItWorks: [
                "Every incoming transaction is enriched with KYC data, geolocation, device fingerprint, and behavioral signals before scoring",
                "NetworkX updates the account relationship graph in real time — adding nodes for new accounts and edges for each transaction or shared device/IP",
                "Community detection algorithms identify suspicious clusters; graph centrality metrics (PageRank, betweenness) are computed for each node",
                "An XGBoost model scores transactions using both raw features and graph-derived features; a PyTorch model handles sequential behavioral anomalies",
                "SHAP attribution values are computed per-feature, so the investigator dashboard can show exactly why each transaction was flagged",
                "Investigators see a Cytoscape.js network map of the flagged account's relationships, can link related cases, add accounts to watchlists, and log decisions back to the system"
            ],
            engineeringHighlights: "NetworkX Relational Graph + SHAP Explainability + Cytoscape.js Network UI + FastAPI.",
            image: "/finguard.thumb.png",
            demoMedia: "/finguard-ui.png",
            href: "https://github.com/SparkSidd",
            techStack: ["React", "TypeScript", "Cytoscape.js", "FastAPI", "NetworkX", "SHAP", "XGBoost", "PyTorch", "PostgreSQL", "Docker"],
            githubLink: "https://github.com/SparkSidd",
            liveLink: ""
        },
        {
            id: "mental-health-bot",
            title: "Mental Health Chatbot",
            category: "AI / ML",
            tagline: "Safety-first conversational support",
            description: "A safety-first conversational AI that provides empathetic first-line mental health support, continuously monitors for crisis signals, and escalates to human moderators or emergency protocols when needed — designed to help without causing harm.",
            longDescription: "Building a mental health chatbot isn't just a technical problem — it's an ethical one. This system puts safety architecture before feature richness. Every user message is analyzed twice: first for intent and emotional tone, then by a dedicated crisis classifier trained to detect language patterns associated with suicidal ideation, self-harm, and acute distress. The response generator maintains a curated library of evidence-informed, therapist-reviewed response templates for common emotional states — loneliness, anxiety, grief — and falls back to a Hugging Face transformer model for nuanced situations. Critically, every response passes through a policy engine before it's sent, which validates the output against a set of safety rules: no response can minimize distress, suggest harmful behaviors, or give advice outside the system's competence. When the crisis classifier fires above a threshold, the moderator dashboard receives an alert with the full session context and can intervene, route to a helpline, or trigger an emergency contact protocol. All sessions are anonymized and logged for quality review.",
            problem: "Access to mental health support is severely limited — long wait times, high costs, and social stigma mean many people reach out to a chatbot before they reach out to a person. A system that gets the response wrong in a high-risk moment can cause serious harm. Generic LLM chatbots have no safety architecture for this.",
            solution: "A dual-layer NLP system where intent/sentiment analysis runs alongside a specialized crisis classifier, with a policy validation engine ensuring every response is safe before it reaches the user. Human moderators are looped in automatically for high-risk sessions, with full context provided for fast, informed intervention.",
            howItWorks: [
                "Every user message is processed by a sentiment and intent classifier that identifies the emotional state and topic of the conversation",
                "A separate crisis classifier — fine-tuned on clinical language patterns — runs in parallel to score each message for suicide risk, self-harm indicators, and acute distress signals",
                "The response generator selects from a curated template library for common situations, or uses a Hugging Face transformer model for more complex emotional contexts",
                "Every generated response is validated by the policy engine before being sent — checking for harmful content, minimization language, and scope violations",
                "If the crisis score exceeds a threshold, the moderator dashboard receives an immediate alert with the full anonymized session history and a set of escalation actions",
                "Session analytics track emotional arc, topic distribution, and escalation rates over time to support quality review and model improvement"
            ],
            engineeringHighlights: "Hugging Face Transformers + Safety Classifier + Emergency Escalation Protocols + FastAPI.",
            image: "/mental health.thumb.png",
            demoMedia: "/mentalhealth-ui.png",
            href: "https://github.com/SparkSidd",
            techStack: ["Python", "FastAPI", "Transformers", "PyTorch", "Hugging Face", "React", "Tailwind"],
            githubLink: "https://github.com/SparkSidd",
            liveLink: ""
        },
        {
            id: "ag-port",
            title: "AG Port (Immersive Portfolio)",
            category: "WEB DEV",
            tagline: "Cinematic, immersive developer portfolio",
            description: "AG Port is the portfolio site you're looking at right now — a cinematic, high-performance web experience built to demonstrate front-end craftsmanship without sacrificing real engineering depth.",
            longDescription: "Most developer portfolios are static pages with a skills table and a GitHub link. AG Port is meant to be the product itself — a demonstration of the technical abilities it claims to represent. The hero section uses a custom WebGL shader rendered via Three.js with GSAP-driven camera animations synchronized to scroll events. Each section of the portfolio is a distinct visual environment: the projects section has a holographic bento grid with an infinite canvas background, the skills section uses a neural network visualization, and the career section has its own ambient particle system. All content is driven from a single profile.ts data file, making updates instant and the architecture clean. The modal system renders rich case-study panels for every project — exactly what you're reading now. The entire build pipeline runs through Vite for sub-second HMR during development and a highly optimized production bundle. Continuous deployment is handled by Vercel, with every push to main triggering an automatic redeploy.",
            problem: "A portfolio that lists skills and projects is table stakes. The real challenge is building something that demonstrates your abilities rather than just describing them — and doing it without making a gimmick that's all visual and no substance.",
            solution: "Every visual effect in AG Port is engineered, not templated. Custom WebGL shaders, canvas-based infinite scrolling backgrounds, physics-informed animations, and a component architecture that separates concerns cleanly — so the portfolio can be updated in minutes while remaining production-grade in quality.",
            howItWorks: [
                "Vite handles the build pipeline with code-splitting and lazy loading, keeping the initial bundle small despite the heavy visual layers",
                "GSAP orchestrates scroll-driven animations and timeline sequences; Framer Motion handles component-level micro-interactions and modal transitions",
                "Three.js renders the WebGL hero section with custom GLSL shaders; canvas-based components handle the infinite bento background and particle systems",
                "All portfolio content — projects, skills, experience, achievements — is sourced from a single profile.ts file, keeping the data layer completely decoupled from the UI",
                "Vercel's CI/CD pipeline deploys automatically on every push to main; the live site reflects any content change within seconds of merging"
            ],
            engineeringHighlights: "Three.js WebGL Raymarching + GSAP Animations + Vite + TailwindCSS + Vercel CI/CD.",
            image: "/portfolio.thumb.png",
            demoMedia: "/portfolio-ui.png",
            href: "https://github.com/SparkSidd",
            techStack: ["React", "TypeScript", "Vite", "GSAP", "Three.js", "WebGL", "Framer Motion", "Tailwind"],
            githubLink: "https://github.com/SparkSidd",
            liveLink: ""
        },
        {
            id: "sid-attendance",
            title: "Sid Attendance System",
            category: "TOOLS",
            tagline: "Gamified attendance & engagement",
            description: "A full-stack attendance management system that applies behavioral game design — streaks, badges, and leaderboards — to turn showing up into something students actually care about tracking.",
            longDescription: "Standard attendance systems are administrative tools: they record presence and generate reports. The Sid Attendance System is designed around a different question — what if the system gave students a reason to care about their own attendance? The answer is behavioral design. Every check-in builds a streak. Streaks unlock badges. Badges and cumulative attendance scores feed a class-wide leaderboard that updates in real time. The gamification layer is backed by a Redis-cached scoring service that recalculates rankings instantly so the leaderboard never feels stale. Teachers and admins get a separate role-based dashboard with detailed analytics — individual attendance trends, class-wide heatmaps by day of week, early warning flags for students approaching minimum thresholds — and one-click CSV/PDF report exports for institutional reporting. The system uses JWT authentication with role separation so students, teachers, and admins each see exactly what they need and nothing they don't.",
            problem: "Attendance systems at most institutions are purely administrative — they capture data but do nothing to influence behavior. Students with poor attendance rarely know their own numbers until they've already crossed a threshold, and teachers spend hours manually generating reports that could be automated.",
            solution: "A role-based full-stack system where students are motivated by real-time streaks, badges, and leaderboards, while teachers and admins get automated analytics dashboards and instant report exports — turning attendance tracking from a chore into an engaged part of the learning environment.",
            howItWorks: [
                "Students submit check-in events via a simple authenticated interface; JWT tokens with role claims ensure the right dashboards load for each user type",
                "A streak microservice recalculates each student's consecutive attendance count on every check-in and awards badges at milestone thresholds",
                "Redis caches the leaderboard scores and pushes real-time updates so the ranking reflects the current session without database queries on every page load",
                "The PostgreSQL analytics layer aggregates attendance by student, class, day-of-week, and time period for the teacher and admin dashboards",
                "Recharts-powered visualizations display individual trends, class heatmaps, and students approaching minimum attendance thresholds",
                "Report generation exports clean CSV and PDF summaries on demand, formatted for institutional submission"
            ],
            engineeringHighlights: "Gamified Streak Engine + Role-based Auth + Redis Cache + Recharts Dashboards.",
            image: "/attendance.thumb.png",
            demoMedia: "/attendance-ui.png",
            href: "https://github.com/SparkSidd",
            techStack: ["React 18", "TypeScript", "Node.js", "Express", "PostgreSQL", "Redis", "Framer Motion", "Recharts"],
            githubLink: "https://github.com/SparkSidd",
            liveLink: ""
        },
        {
            id: "ai-presentation",
            title: "AI Presentation Generator",
            category: "AI / ML",
            tagline: "Prompt → PPT generator",
            description: "An AI tool that takes a plain text prompt and generates a fully structured, layout-aware PowerPoint presentation — outputting a native, editable .pptx file you can open in PowerPoint and modify immediately.",
            longDescription: "The common approach to AI presentation generation is to generate text and slap it on a static image that looks like a slide. This tool works differently: it generates real, native .pptx files using python-pptx, so every element — text boxes, title placeholders, bullet lists, image slots — is a proper PowerPoint object that can be edited after download. The LLM content planner first interprets the user's prompt and generates a structured slide outline: how many slides, what each slide's purpose is, what type of layout it needs (title slide, content slide, comparison, data slide, closing). Then a layout mapper translates each slide type to a PowerPoint template layout, places content into the correct placeholders, applies consistent fonts and color schemes, and handles edge cases like content that's too long for a placeholder. The result downloads as an actual .pptx file — not a PDF, not a screenshot — so it integrates directly into the user's existing workflow.",
            problem: "Creating a presentation from scratch takes hours, and AI tools that generate \"slides\" usually produce static images or PDFs that can't be edited. Teams still end up manually reformatting everything, which defeats the purpose.",
            solution: "An LLM content planner generates the slide structure and content, a layout engine maps that structure to PowerPoint-native templates, and python-pptx compiles everything into a real, fully editable .pptx file — skipping the flattening step entirely and delivering something that fits directly into standard presentation workflows.",
            howItWorks: [
                "The user writes a prompt describing the topic, audience, tone, and approximate length of the presentation",
                "An LLM content planner generates a structured JSON outline: slide count, titles, key points per slide, and layout type for each",
                "The layout engine maps each slide type to a PowerPoint layout template and constrains the LLM's content to fit within placeholder character limits",
                "python-pptx compiles the full presentation natively — placing text in real text boxes, titles in title placeholders, and marking image slots for manual insertion",
                "The compiled .pptx downloads directly and opens in PowerPoint, Google Slides, or LibreOffice with all elements fully editable"
            ],
            engineeringHighlights: "LLM Layout Constrained Generation + python-pptx Engine + FastAPI + Next.js.",
            image: "/presentation.thumb.png",
            demoMedia: "/presentation-ui.png",
            href: "https://github.com/SparkSidd",
            techStack: ["Next.js", "Python", "FastAPI", "python-pptx", "Pydantic", "OpenAI API", "React"],
            githubLink: "https://github.com/SparkSidd",
            liveLink: ""
        },
        {
            id: "ingredient-insight",
            title: "Ingredient Insight AI",
            category: "AI / ML",
            tagline: "Explainable ingredient analysis",
            description: "Ingredient Insight AI reads the ingredient list on any packaged food product and gives you a plain-English breakdown of what's in it — flagging allergens, controversial additives, E-numbers, and health risks with sourced explanations.",
            longDescription: "Ingredient lists on packaged food are deliberately opaque: abbreviated chemical names, E-numbers, and industry jargon that most consumers can't parse. Ingredient Insight AI fixes that. You paste in the ingredient string (or scan a barcode to fetch it automatically), and the system tokenizes and normalizes each ingredient — resolving aliases, brand names, and chemical synonyms to their canonical form. Each normalized ingredient is then looked up against a curated regulatory database that includes FDA GRAS classifications, EFSA opinions, and flagged additive categories (artificial colorants, preservatives with controversy, common allergens under multiple names). The LLM explainability engine synthesizes these lookups into a readable assessment for each ingredient — not just a red/yellow/green flag, but an actual explanation of what it is, why it might matter, and what the regulatory stance is. The interactive dashboard groups ingredients by risk category, shows allergen warnings prominently, and provides citation links to the regulatory sources so users can verify the assessments themselves.",
            problem: "Consumers with allergies, dietary restrictions, or general health concerns can't meaningfully read packaged food labels. The ingredients are listed, but their safety implications, regulatory status, and common aliases are not — leaving people to Google each item individually or simply ignore the label.",
            solution: "A full ingredient parsing and analysis pipeline that normalizes ingredient names, cross-references regulatory databases, and uses an LLM to generate sourced, human-readable explanations for each ingredient's safety status, allergen classification, and common concerns.",
            howItWorks: [
                "The user inputs a raw ingredient string or scans a product barcode to fetch the ingredient list automatically via the Open Food Facts API",
                "A tokenizer splits the ingredient string at commas and parentheses, handling nested sub-ingredient declarations that standard splitting breaks on",
                "Each token is normalized against a synonym dictionary to resolve aliases, E-numbers, and chemical names to canonical ingredient identifiers",
                "Normalized ingredients are looked up in a regulatory knowledge base covering FDA GRAS status, EFSA safety opinions, and curated allergen classifications",
                "The LLM explainability engine generates a plain-English assessment for each ingredient, citing specific regulatory sources and flagging known concerns",
                "The dashboard groups results by risk level, highlights allergens with prominent warnings, and links each assessment to its source documents"
            ],
            engineeringHighlights: "Regulatory Knowledge Base Lookup + NLP Tokenizer Normalizer + Chart.js.",
            image: "/Ingredient.thumb.png",
            demoMedia: "/ingredient-ui.png",
            href: "https://github.com/SparkSidd",
            techStack: ["Next.js", "React", "TypeScript", "Python", "Chart.js", "Tailwind", "Framer Motion"],
            githubLink: "https://github.com/SparkSidd",
            liveLink: ""
        },
        {
            id: "doc-fusion",
            title: "DocFusion",
            category: "TOOLS",
            tagline: "Document intelligence & analytics",
            description: "DocFusion is a document intelligence platform that ingests PDFs, Word documents, and spreadsheets, extracts structured data and tables with layout-aware OCR, and turns them into a queryable knowledge layer with an analytics dashboard.",
            longDescription: "Businesses run on documents — contracts, reports, invoices, research papers — but extracting usable data from them has always required manual work. DocFusion automates the full pipeline. It handles multi-format ingestion (PDF, DOCX, XLSX, scanned images), uses layout-aware OCR to preserve table structures that plain text extraction would flatten into garbage, and applies NLP entity and relation extraction to identify key terms, dates, monetary values, and the relationships between them. All extracted content is simultaneously stored in a structured PostgreSQL schema and embedded into a FAISS vector index, giving you two ways to query the same corpus: structured SQL-style filters (\"show all contracts with a value over $50,000 expiring this quarter\") and semantic natural language search (\"what does this agreement say about liability for data breaches?\"). The analytics dashboard provides immediate BI-ready visualizations — distribution charts, trend lines, entity frequency maps — without requiring an external data warehouse.",
            problem: "Organizations have enormous amounts of valuable data locked in documents that can't be queried, compared, or analyzed at scale. Manually extracting structured data is slow, error-prone, and doesn't scale — but most document tools only offer full-text search, not structure-aware extraction.",
            solution: "A pipeline that combines layout-aware OCR, table structure extraction, NLP relation parsing, and dual-mode storage (structured DB + vector index) to turn any document corpus into a queryable, analytics-ready knowledge base — without requiring users to touch the underlying data engineering.",
            howItWorks: [
                "Documents in PDF, DOCX, XLSX, and image formats are ingested; a format router selects the appropriate parser for each file type",
                "Layout-aware OCR (LayoutLM) identifies page zones and preserves table structure, preventing multi-column content from being merged incorrectly",
                "A table extraction engine reconstructs tabular data from both native PDF tables and OCR-detected grid structures, outputting clean DataFrames",
                "NLP entity and relation extraction identifies key terms, dates, monetary values, and named entities, linking them relationally in the data model",
                "All content is embedded using a sentence transformer and indexed into FAISS, enabling semantic search queries across the full document corpus",
                "The analytics dashboard renders Recharts visualizations of the extracted data — entity distributions, value trends, document comparison views — updated in real time as new documents are ingested"
            ],
            engineeringHighlights: "Table & Structure OCR Parsing + FAISS Vector Search + Recharts Analytics.",
            image: "/Docfusion.thumb.png",
            demoMedia: "/docfusion.jpg",
            href: "https://github.com/SparkSidd",
            techStack: ["React", "TypeScript", "Python", "FastAPI", "FAISS", "Recharts", "Tailwind"],
            githubLink: "https://github.com/SparkSidd",
            liveLink: ""
        },
        {
            id: "monastery-360",
            title: "Monastery360",
            category: "WEB DEV",
            tagline: "Digital heritage & 3D exploration",
            description: "Monastery360 is a digital heritage platform that brings the ancient monasteries of Sikkim into the browser — combining photogrammetry-based 3D models, annotated virtual tours, and cultural archive metadata into an accessible web experience.",
            longDescription: "Sikkim is home to over 200 monasteries, many of them centuries old and at risk from natural disasters, climate change, and the passage of time. Monastery360 exists to preserve them digitally and make them accessible to scholars, students, and the public worldwide. The platform works in two layers. The first is archival: high-resolution photogrammetry scans are processed into optimized 3D meshes, compressed with Draco, and stored in GLTF format — a web-native 3D standard. The second is experiential: a Three.js WebGL renderer loads these models in the browser, and an interaction layer places annotated hotspots on architecturally or historically significant elements of each structure. Clicking a hotspot opens a metadata panel with historical context, construction details, religious significance, and archival photographs. Users can follow guided audio tours narrated in multiple languages, or explore freely. The entire experience is designed to work on low-bandwidth connections using progressive model loading — low-poly meshes load first while the high-fidelity version streams in the background.",
            problem: "Physical access to Sikkim's monasteries is limited by geography, visa requirements, and ability — and the structures themselves are vulnerable to earthquakes and erosion. There's no comprehensive digital archive that combines 3D spatial data with cultural and historical context in an accessible format.",
            solution: "A web-based 3D heritage platform where photogrammetry-derived models of each monastery are rendered in the browser via Three.js, enriched with interactive annotated hotspots and historical metadata, and accompanied by guided audio tours — making these sites accessible to anyone with a browser while building a permanent digital archive.",
            howItWorks: [
                "Monastery structures are captured through photogrammetry sessions using overlapping high-resolution photographs; software reconstructs a dense 3D point cloud",
                "The point cloud is meshed, cleaned, and decimated to multiple LOD (Level of Detail) variants; Draco compression reduces file sizes by up to 95% for web delivery",
                "Three.js renders the GLTF model in a WebGL canvas with an orbit camera, environment lighting, and progressive LOD switching based on connection speed",
                "Annotated hotspot markers are placed at key architectural and historical points; clicking opens a metadata panel with text, historical context, and archival images",
                "An audio narration engine serves language-specific guided tour tracks synchronized to camera waypoint animations that move through the structure",
                "A GIS-linked monastery index map lets users explore all documented sites geographically and access archival document downloads for each location"
            ],
            engineeringHighlights: "Three.js WebGL Renderer + Draco GLTF Compression + GIS/Mapping + Photogrammetry.",
            image: "/Monastery360.thumb.png",
            demoMedia: "/monastery-ui.png",
            href: "https://github.com/SparkSidd",
            techStack: ["React", "Three.js", "WebGL", "GLTF/Draco", "Node.js", "Tailwind"],
            githubLink: "https://github.com/SparkSidd",
            liveLink: ""
        },
        {
            id: "siddlang-interpreter",
            title: "SiddLang Interpreter",
            category: "SYSTEMS",
            tagline: "Custom language & interpreter in C",
            description: "SiddLang is a custom programming language with a complete interpreter written from scratch in C — covering every stage of the compilation pipeline: lexer, parser, AST builder, symbol table, type checker, and tree-walking evaluator.",
            longDescription: "Writing an interpreter from scratch is one of the best ways to truly understand how programming languages work — and SiddLang is that project done properly. The language is simple by design (C-like syntax with variables, arithmetic, conditionals, loops, and functions) because the goal is clarity of implementation, not feature breadth. The lexer scans the source string character by character, applying DFA-based rules to emit a token stream. The recursive-descent parser consumes that stream and constructs an Abstract Syntax Tree, handling operator precedence, associativity, and nested expressions without any parser generator tools. A symbol table with lexical scoping tracks variable declarations and resolves identifiers across nested blocks and function calls. The type checker traverses the AST before evaluation to catch type errors before runtime. The tree-walking evaluator then recursively evaluates the AST, maintaining a runtime environment for variable values and a call stack for function execution. A step-trace mode logs each AST node evaluation in order, making the execution path visible — ideal for understanding how the interpreter processes a program statement by statement. The entire project is written in pure C with no external libraries, compiled with GCC, and managed with a Makefile.",
            problem: "Most developers use programming languages without understanding how they actually work. Compiler theory is often taught abstractly — formal grammars, automata theory — without a concrete implementation that shows how the theory translates to working code. SiddLang exists to close that gap.",
            solution: "A complete, from-first-principles language interpreter written in C, implementing every stage of the pipeline — lexing, parsing, AST construction, symbol table, type checking, and evaluation — with a step-trace mode that makes the execution flow transparent and a clean, readable codebase designed to be studied and extended.",
            howItWorks: [
                "The lexer scans the source string character by character and emits a token stream, classifying each token by type (identifier, keyword, operator, literal) using DFA-based rules",
                "The recursive-descent parser consumes the token stream and builds an Abstract Syntax Tree, enforcing operator precedence and handling nested expressions and declarations",
                "A symbol table with lexical scoping is constructed during parsing; it resolves variable and function identifiers to their declaration scope, catching undefined references before evaluation",
                "A type checker traverses the AST in a pre-evaluation pass to catch type mismatches — passing an integer where a string is expected, calling a non-function, etc.",
                "The tree-walking evaluator recursively processes each AST node, maintaining a runtime environment for variable values and a call stack for function invocations",
                "Step-trace mode logs each AST node as it's evaluated, printing the expression, the resolved values of operands, and the result — making the full execution path readable at each stage"
            ],
            engineeringHighlights: "Recursive Descent Parser + AST Tree Evaluator + Symbol Table Scope Resolution in C.",
            image: "/siddlang-ui.png",
            demoMedia: "/siddlang-ui.png",
            href: "https://github.com/SparkSidd",
            techStack: ["C", "GCC / Make", "Compiler Architecture", "Lexer", "Parser", "AST", "Symbol Table"],
            githubLink: "https://github.com/SparkSidd",
            liveLink: ""
        }
    ],
    achievements: [
        {
            title: "Tech Adrishta 2025 — Runner-Up",
            description: "College Annual Tech Fest • Team Lead",
            date: "2025",
            icon: "award"
        },
        {
            title: "InnoFusion 2.0 — Finalist (Top 5)",
            description: "University of Engineering & Management, Kolkata • Team Lead",
            date: "2024",
            icon: "trophy"
        },
        {
            title: "Devopia 2.0 — Finalist",
            description: "Dell Technologies (Dell Partner Hackathon) • Team Lead",
            date: "2024",
            icon: "trophy"
        },
        {
            title: "Smart India Hackathon (SIH)",
            description: "Government of India • Team Lead",
            date: "2024-2025",
            icon: "trophy"
        },
        {
            title: "EnCode 2026 (IIT Guwahati)",
            description: "UDGAM, IIT Guwahati • Team Lead (Ongoing)",
            date: "2026",
            icon: "award"
        },
        {
            title: "World's Largest Hackathon by Bolt",
            description: "Devpost • Individual",
            date: "2024",
            icon: "award"
        },
        {
            title: "Hawkhacks",
            description: "Devpost • Individual",
            date: "2024",
            icon: "award"
        },
        {
            title: "InnovWar Hackathon 2025",
            description: "Competitive Tech Challenge • Individual",
            date: "2025",
            icon: "award"
        }
    ],
    positions: [
        {
            role: "AI/ML Co-Lead",
            organization: "Encoders (Coding Club), SMIT",
            period: "Current",
            description: "Leading AI/ML initiatives and workshops."
        },
        {
            role: "Event & Production Lead",
            organization: "CINEMATES (Acting & Cinematography Club)",
            period: "Current",
            description: "Managing aesthetics and event production."
        },
        {
            role: "Advisor to Secretary General",
            organization: "SMIT MUN Club",
            period: "Current",
            description: "Strategic advisory and leadership."
        },
        {
            role: "PR Lead Artist",
            organization: "SMIT",
            period: "Previous",
            description: "Public Relations and Art direction."
        },
        {
            role: "PR Co-Lead",
            organization: "Codhers (Coding Community, SMIT)",
            period: "Previous",
            description: "Community building and outreach."
        },
        {
            role: "Member",
            organization: "Enactus, IIC, Innovison",
            period: "Previous",
            description: "Active contribution in various committees."
        },
        {
            role: "Internshala Student Partner",
            organization: "Internshala",
            period: "Previous",
            description: "Student partner program."
        }
    ],
    certificates: [
        { name: "GFG 160 – 160 Days of Problem Solving", issuer: "GeeksforGeeks", date: "2024", type: "Completed" },
        { name: "Full Stack Developer Bootcamp", issuer: "GeeksforGeeks", date: "2024", type: "Completed" },
        { name: "Complete TensorFlow Course", issuer: "GeeksforGeeks", date: "2024", type: "Completed" },
        { name: "DevOps and AI on AWS", issuer: "Coursera (AWS)", date: "2024", grade: "100%", type: "Completed" },
        { name: "PostgreSQL Fundamentals", issuer: "Coursera (AWS)", date: "2024", grade: "100%", type: "Completed" },
        { name: "Deloitte Virtual Cybersecurity Internship", issuer: "Forage / Deloitte", date: "2024", type: "Completed" },
        { name: "CCNA 1: Introduction to Networks", issuer: "Cisco Networking Academy", date: "2024", type: "Completed" },
        { name: "CCNA 2: Switching, Routing & Wireless Essentials", issuer: "Cisco Networking Academy", date: "2024", type: "Completed" },
        { name: "CCNA 3: Enterprise Networking, Security & Automation", issuer: "Cisco Networking Academy", date: "2024", type: "Completed" },
        { name: "Deloitte Cybersecurity Virtual Internship", issuer: "Forage / Deloitte", date: "2024", type: "Completed" },
        { name: "Google AI Essentials", issuer: "Coursera (Google)", date: "Ongoing", type: "Learning" },
        { name: "Generative AI for Software Development", issuer: "Coursera", date: "Ongoing", type: "Learning" },
        { name: "Introduction to DevOps", issuer: "Coursera (IBM)", date: "Ongoing", type: "Learning" },
        { name: "Foundations of AR", issuer: "Coursera (Meta)", date: "Ongoing", type: "Learning" }
    ]
};
