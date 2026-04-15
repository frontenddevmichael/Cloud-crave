import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaExternalLinkAlt } from "react-icons/fa";
import styles from "./Products.module.css";

/* ── DB-DRIVEN DATA ──────────────────────────────────────────
   GET /api/products → products[]
   Each product: {
     id, name, tagline, desc, category, status,
     tags[], coverColor, liveUrl?, docsUrl?
   }
   ─────────────────────────────────────────────────────────── */

const products = [
    {
        id: "switch2tech",
        name: "Switch2Tech",
        tagline: "Your shortcut into tech.",
        desc: "A structured programme that transforms career-changers into job-ready tech professionals through cohort-based learning, mentorship, and employer connections.",
        category: "EdTech",
        status: "Live",
        tags: ["Training", "Bootcamp", "Career Change"],
        hue: "168",          // teal-green
        liveUrl: "#",
    },
    {
        id: "chatbot-studio",
        name: "Chatbot Studio",
        tagline: "Deploy AI conversations in minutes.",
        desc: "A no-code platform for building, training, and deploying intelligent chatbots on WhatsApp, web, and mobile — without writing a single line of code.",
        category: "AI Platform",
        status: "Beta",
        tags: ["AI", "No-Code", "Automation"],
        hue: "195",          // cyan
        liveUrl: "#",
    },
    {
        id: "school-manager",
        name: "Educrave",
        tagline: "School administration, simplified.",
        desc: "End-to-end school management: admissions, timetabling, result computation, parent portals, and staff payroll — all in one secure platform.",
        category: "EdTech",
        status: "Live",
        tags: ["SaaS", "Education", "Management"],
        hue: "145",          // green
        liveUrl: "#",
    },
    {
        id: "runiq",
        name: "RunIQ",
        tagline: "AI-native terminal for developers.",
        desc: "A developer productivity tool that understands natural language, generates terminal commands, explains errors, and automates repetitive dev workflows.",
        category: "Developer Tool",
        status: "Coming Soon",
        tags: ["AI", "CLI", "DevTools"],
        hue: "220",          // blue
    },
    {
        id: "runiq",
        name: "Crave Biz",
        tagline:"AI is an AI-powered financial management platform",
        desc: "CraveBiz AI is an AI-powered financial management platform built for SMEs that need more than basic accounting.",
        category: "Developer Tool",
        status: "Coming Soon",
        tags: ["AI", "CLI", "DevTools"],
        hue: "220",          // blue
    },
];

const statusColor = {
    "Live": { bg: "#E0F5F2", color: "#007A6A" },
    "Beta": { bg: "#FEF3DC", color: "#9A6700" },
    "Coming Soon": { bg: "#F0F0EE", color: "#5A5A55" },
};

export default function Products() {
    const navigate = useNavigate();

    return (
        <div className={styles.page}>
            {/* ── HEADER ── */}
            <header className={styles.header}>
                {/* SVG: Abstract product orbit */}
                <svg className={styles.headerSvg} viewBox="0 0 700 220" aria-hidden="true">
                    <ellipse cx="350" cy="110" rx="320" ry="90" stroke="var(--teal)" strokeWidth="0.5"
                        fill="none" opacity="0.12" strokeDasharray="3 8" />
                    <ellipse cx="350" cy="110" rx="220" ry="60" stroke="var(--amber)" strokeWidth="0.5"
                        fill="none" opacity="0.15" strokeDasharray="2 5" />
                    <circle cx="350" cy="110" r="6" fill="var(--teal)" opacity="0.5" />
                    <circle cx="30" cy="110" r="4" fill="var(--teal)" opacity="0.35" />
                    <circle cx="670" cy="110" r="4" fill="var(--teal)" opacity="0.35" />
                    <circle cx="350" cy="20" r="3" fill="var(--amber)" opacity="0.4" />
                    <circle cx="350" cy="200" r="3" fill="var(--amber)" opacity="0.4" />
                </svg>

                <p className="section-label">Our products</p>
                <h1 className={styles.pageTitle}>
                    {/* DB: products_page.headline */}
                    Built by us.<br />
                    <span>Powered by purpose.</span>
                </h1>
                <p className={styles.pageSubtitle}>
                    {/* DB: products_page.subtitle */}
                    These are the digital products we've designed, engineered, and launched
                    — tools solving real problems for real people across Nigeria and beyond.
                </p>
            </header>

            {/* ── PRODUCTS GRID ── */}
            <section className={styles.section}>
                <div className={styles.grid}>
                    {products.map((p, i) => {
                        const sc = statusColor[p.status];
                        return (
                            <article
                                key={p.id}
                                className={`${styles.card} ${i === 0 ? styles.cardHero : ""}`}
                                style={{ "--delay": `${i * 0.1}s`, "--hue": p.hue }}
                            >
                                {/* Visual cover */}
                                <div className={styles.cover} aria-hidden="true">
                                    {/* Generative product illustration SVG */}
                                    <svg viewBox="0 0 340 180" className={styles.coverSvg}>
                                        {/* Layered abstract shapes representing each product */}
                                        <rect x="20" y="30" width="120" height="80" rx="10"
                                            fill="white" opacity="0.07" />
                                        <rect x="160" y="20" width="160" height="50" rx="8"
                                            fill="white" opacity="0.05" />
                                        <rect x="20" y="125" width="200" height="35" rx="6"
                                            fill="white" opacity="0.06" />
                                        <circle cx="300" cy="130" r="35" fill="white" opacity="0.05" />
                                        <circle cx="60" cy="30" r="20" fill="white" opacity="0.08" />
                                        {/* Product-specific accent line */}
                                        <rect x="20" y="28" width="4" height="84" rx="2"
                                            fill="white" opacity="0.3" />
                                        {/* Small dots grid */}
                                        {[0, 1, 2, 3].map(col => [0, 1, 2].map(row => (
                                            <circle
                                                key={`${col}-${row}`}
                                                cx={240 + col * 22}
                                                cy={100 + row * 22}
                                                r="2"
                                                fill="white"
                                                opacity="0.15"
                                            />
                                        )))}
                                    </svg>

                                    {/* Status badge */}
                                    <span
                                        className={styles.statusBadge}
                                        style={{ background: sc.bg, color: sc.color }}
                                    >
                                        {p.status}
                                    </span>

                                    {/* Category chip */}
                                    <span className={styles.categoryCover}>{p.category}</span>
                                </div>

                                {/* Content */}
                                <div className={styles.cardBody}>
                                    <h2 className={styles.productName}>{p.name}</h2>
                                    <p className={styles.tagline}>{p.tagline}</p>
                                    <p className={styles.desc}>{p.desc}</p>

                                    {/* Tags */}
                                    <div className={styles.tags}>
                                        {p.tags.map((t) => (
                                            <span key={t} className={styles.tagPill}>{t}</span>
                                        ))}
                                    </div>

                                    {/* Actions */}
                                    <div className={styles.cardActions}>
                                        <button
                                            className={styles.btnPrimary}
                                            onClick={() => navigate(`/products/${p.id}`)}
                                        >
                                            Learn More <FaArrowRight className={styles.btnArrow} />
                                        </button>
                                        {p.liveUrl && (
                                            <a
                                                href={p.liveUrl}
                                                className={styles.btnGhost}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`Visit ${p.name} live site`}
                                            >
                                                <FaExternalLinkAlt />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>

            {/* ── BUILD TOGETHER STRIP ── */}
            <section className={styles.buildStrip}>
                <div className={styles.buildStripInner}>
                    <div>
                        <h3 className={styles.buildHeading}>Have a product idea?</h3>
                        <p className={styles.buildDesc}>
                            We partner with founders and businesses to design and build digital products from scratch.
                        </p>
                    </div>
                    <button
                        className={styles.buildBtn}
                        onClick={() => navigate("/contact")}
                    >
                        Let's Build Together <FaArrowRight className={styles.btnArrow} />
                    </button>
                </div>
            </section>
        </div>
    );
}