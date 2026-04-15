import { useParams, useNavigate } from "react-router-dom";
import { FaArrowRight, FaArrowLeft, FaExternalLinkAlt, FaCheck } from "react-icons/fa";
import styles from "./ProductDetail.module.css";

/* ── DB-DRIVEN DATA ──────────────────────────────────────────
   GET /api/products/:id → product
   In production, useEffect + fetch to load this dynamically.
   ─────────────────────────────────────────────────────────── */

const productData = {
    "switch2tech": {
        name: "Switch2Tech",
        tagline: "Your shortcut into tech.",
        category: "EdTech",
        status: "Live",
        hue: "168",
        liveUrl: "#",
        year: "2022",
        overview:
            "Switch2Tech is a structured bootcamp programme that transforms career-changers and fresh graduates into job-ready tech professionals through cohort-based learning, mentorship, and employer connections.",
        challenge:
            "Nigeria's growing digital economy faces a paradox: soaring demand for tech talent alongside millions of unemployed graduates who lack pathways into the sector. Traditional degrees are slow, expensive, and often misaligned with industry needs.",
        solution:
            "We designed Switch2Tech as an intensive, mentor-led programme — 12 to 16 weeks of hands-on training in frontend development, backend engineering, cloud, or product design. Cohorts learn together, build real projects, and are matched directly with hiring companies.",
        stats: [
            { value: "500+", label: "Alumni Trained" },
            { value: "78%", label: "Job Placement Rate" },
            { value: "12wk", label: "Average Programme" },
            { value: "40+", label: "Hiring Partners" },
        ],
        features: [
            "Cohort-based learning with peer accountability",
            "Mentorship from senior engineers & product leads",
            "Career coaching & CV optimisation",
            "Direct employer connections & job matching",
            "Flexible financing & income share agreements",
            "Alumni community & continued support",
        ],
        stack: ["React", "Node.js", "PostgreSQL", "AWS", "Figma"],
    },
    "chatbot-studio": {
        name: "Chatbot Studio",
        tagline: "Deploy AI conversations in minutes.",
        category: "AI Platform",
        status: "Beta",
        hue: "195",
        liveUrl: "#",
        year: "2023",
        overview:
            "Chatbot Studio is a no-code platform for building, training, and deploying intelligent chatbots on WhatsApp, web, and mobile — no engineering required.",
        challenge:
            "Businesses know they need AI-powered customer engagement but lack the technical resources to build and maintain conversational AI systems. Existing solutions are expensive, inflexible, and require engineering expertise.",
        solution:
            "We built a visual drag-and-drop interface where any business user can design conversation flows, train a custom AI model on their content, and deploy to WhatsApp or a web widget in a single click.",
        stats: [
            { value: "200+", label: "Active Bots" },
            { value: "1M+", label: "Messages Handled" },
            { value: "< 5m", label: "Deploy Time" },
            { value: "99.9%", label: "Uptime" },
        ],
        features: [
            "Visual drag-and-drop conversation builder",
            "Custom AI training on your documents & FAQs",
            "WhatsApp Business API integration",
            "Web widget & mobile SDK",
            "Real-time analytics dashboard",
            "Human handoff when AI can't answer",
        ],
        stack: ["Python", "FastAPI", "OpenAI", "Redis", "React", "PostgreSQL"],
    },
    "school-manager": {
        name: "SchoolSync",
        tagline: "School administration, simplified.",
        category: "EdTech",
        status: "Live",
        hue: "145",
        liveUrl: "#",
        year: "2021",
        overview:
            "SchoolSync is a comprehensive school management system handling admissions, timetabling, result computation, parent portals, and staff payroll — all in one secure cloud platform.",
        challenge:
            "Nigerian schools manage critical operations through spreadsheets, paper records, and disconnected software. This creates errors, delays, and data loss — with parents often left out of the loop entirely.",
        solution:
            "A unified platform built specifically for the Nigerian school context: it generates result booklets to WAEC standards, handles multi-session timetables, and gives parents real-time visibility into their child's academic progress via a dedicated mobile portal.",
        stats: [
            { value: "120+", label: "Schools Onboarded" },
            { value: "50k+", label: "Students Managed" },
            { value: "30%", label: "Admin Time Saved" },
            { value: "3yrs", label: "In Production" },
        ],
        features: [
            "Admissions & student registration",
            "WAEC-standard result computation",
            "Timetable builder & class scheduling",
            "Parent portal with real-time updates",
            "Staff payroll & attendance tracking",
            "Financial management & fee collection",
        ],
        stack: ["Vue.js", "Laravel", "MySQL", "AWS RDS", "Flutter"],
    },
    "runiq": {
        name: "RunIQ",
        tagline: "AI-native terminal for developers.",
        category: "Developer Tool",
        status: "Coming Soon",
        hue: "220",
        year: "2024",
        overview:
            "RunIQ is a developer productivity tool that understands natural language, generates terminal commands, explains errors intelligently, and automates repetitive development workflows.",
        challenge:
            "Developers spend enormous time searching for the right terminal command, debugging cryptic error messages, and repeating the same sequences of shell commands across projects.",
        solution:
            "RunIQ sits in your terminal and understands what you're trying to do. Type a plain-English instruction and it generates the correct command, explains what it does, and learns your project-specific patterns over time.",
        stats: [
            { value: "Q2", label: "2025 Launch Target" },
            { value: "500+", label: "Waitlist Sign-ups" },
            { value: "Beta", label: "Closed Testing" },
            { value: "CLI", label: "First Platform" },
        ],
        features: [
            "Natural language → terminal command translation",
            "Intelligent error explanation & suggested fixes",
            "Project-context awareness",
            "Command history with semantic search",
            "Shell script generation from plain English",
            "Works with bash, zsh, PowerShell",
        ],
        stack: ["Rust", "Python", "OpenAI", "SQLite", "Electron"],
    },
};

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = productData[id];

    /* DB: if product not found, redirect or show 404 */
    if (!product) {
        return (
            <div className={styles.notFound}>
                <h2>Product not found</h2>
                <button onClick={() => navigate("/products")} className={styles.backBtn}>
                    <FaArrowLeft /> Back to Products
                </button>
            </div>
        );
    }

    const statusStyle = {
        "Live": { background: "#E0F5F2", color: "#007A6A" },
        "Beta": { background: "#FEF3DC", color: "#9A6700" },
        "Coming Soon": { background: "#F0F0EE", color: "#5A5A55" },
    }[product.status];

    return (
        <div className={styles.page}>
            {/* ── BACK NAV ── */}
            <div className={styles.backNav}>
                <button className={styles.backBtn} onClick={() => navigate("/products")}>
                    <FaArrowLeft /> All Products
                </button>
            </div>

            {/* ── HERO ── */}
            <header className={styles.hero} style={{ "--hue": product.hue }}>
                {/* Decorative cover SVG */}
                <svg className={styles.heroPattern} viewBox="0 0 800 300" aria-hidden="true">
                    <rect x="60" y="60" width="200" height="130" rx="16" fill="white" opacity="0.06" />
                    <rect x="300" y="40" width="280" height="90" rx="12" fill="white" opacity="0.05" />
                    <rect x="60" y="210" width="320" height="55" rx="10" fill="white" opacity="0.05" />
                    <circle cx="700" cy="80" r="60" fill="white" opacity="0.05" />
                    <circle cx="680" cy="220" r="35" fill="white" opacity="0.06" />
                    {/* Grid */}
                    {[0, 1, 2, 3, 4].map(col => [0, 1, 2, 3].map(row => (
                        <circle key={`${col}-${row}`}
                            cx={450 + col * 40} cy={60 + row * 55}
                            r="2" fill="white" opacity="0.12" />
                    )))}
                </svg>

                {/* Overlay gradient for text readability */}
                <div className={styles.heroOverlay} />

                <div className={styles.heroContent}>
                    <div className={styles.heroMeta}>
                        <span className={styles.heroCategory}>{product.category}</span>
                        <span className={styles.heroStatus} style={statusStyle}>
                            {product.status}
                        </span>
                        <span className={styles.heroYear}>{product.year}</span>
                    </div>

                    <h1 className={styles.heroName}>{product.name}</h1>
                    <p className={styles.heroTagline}>{product.tagline}</p>
                    <p className={styles.heroOverview}>{product.overview}</p>

                    <div className={styles.heroActions}>
                        {product.liveUrl && (
                            <a href={product.liveUrl} className={styles.heroBtnPrimary}
                                target="_blank" rel="noopener noreferrer">
                                Visit Live Site <FaExternalLinkAlt style={{ fontSize: "0.7rem" }} />
                            </a>
                        )}
                        <button className={styles.heroBtnSecondary}
                            onClick={() => navigate("/contact")}>
                            Get a Demo <FaArrowRight />
                        </button>
                    </div>
                </div>
            </header>

            {/* ── STATS ── */}
            <div className={styles.statsRow}>
                {product.stats.map((s) => (
                    <div key={s.label} className={styles.statItem}>
                        <span className={styles.statValue}>{s.value}</span>
                        <span className={styles.statLabel}>{s.label}</span>
                    </div>
                ))}
            </div>

            {/* ── CONTENT SECTIONS ── */}
            <div className={styles.body}>

                {/* Challenge */}
                <section className={styles.contentSection}>
                    <div className={styles.sectionLabel}>The Challenge</div>
                    <p className={styles.contentText}>{product.challenge}</p>
                </section>

                {/* Solution */}
                <section className={styles.contentSection}>
                    <div className={styles.sectionLabel}>Our Solution</div>
                    <p className={styles.contentText}>{product.solution}</p>
                </section>

                {/* Features */}
                <section className={styles.featuresSection}>
                    <div className={styles.sectionLabel}>Key Features</div>
                    <ul className={styles.featureGrid}>
                        {product.features.map((f) => (
                            <li key={f} className={styles.featureItem}>
                                <span className={styles.featureCheck}><FaCheck /></span>
                                {f}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Tech stack */}
                {product.stack && (
                    <section className={styles.stackSection}>
                        <div className={styles.sectionLabel}>Built With</div>
                        <div className={styles.stackTags}>
                            {product.stack.map((t) => (
                                <span key={t} className={styles.stackTag}>{t}</span>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            {/* ── BOTTOM CTA ── */}
            <section className={styles.bottomCta}>
                <div className={styles.bottomCtaInner}>
                    <h2 className={styles.ctaHeading}>
                        Interested in {product.name}?
                    </h2>
                    <p className={styles.ctaDesc}>
                        Reach out for a demo, pricing, or to discuss how it can be
                        tailored to your organisation.
                    </p>
                    <div className={styles.ctaActions}>
                        <button className={styles.ctaBtnPrimary} onClick={() => navigate("/contact")}>
                            Request a Demo <FaArrowRight />
                        </button>
                        <button className={styles.ctaBtnOutline} onClick={() => navigate("/products")}>
                            ← Back to Products
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}