import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaLaptopCode, FaCloud, FaRobot, FaBullhorn,
    FaMobileAlt, FaCogs, FaLightbulb, FaPalette, FaArrowRight, FaCheck,
} from "react-icons/fa";
import styles from "./Service.module.css";

/* ══════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════ */
const services = [
    {
        id: "tech-training",
        icon: FaLaptopCode,
        title: "Tech Training",
        tag: "Education",
        category: "people",
        accent: "#00C9A7",
        desc: "We empower individuals and organisations with world-class tech training that bridges the gap between today's workforce and tomorrow's challenges.",
        contents: [
            "Hands-on coding bootcamps & workshops",
            "Mentorship from industry professionals",
            "Certifications in AI, cloud & development",
            "Corporate upskilling programmes",
        ],
        featured: true,
    },
    {
        id: "cloud-solutions",
        icon: FaCloud,
        title: "Cloud Solutions",
        tag: "Infrastructure",
        category: "cloud",
        accent: "#5090FF",
        desc: "Scale smarter with next-gen cloud infrastructure. We help organisations migrate, manage, and modernise with security at every layer.",
        contents: [
            "Cloud migration & modernisation",
            "Cloud security & compliance",
            "Platform as a Service (PaaS)",
            "Cost optimisation & governance",
        ],
        featured: true,
    },
    {
        id: "ai-integration",
        icon: FaRobot,
        title: "AI Integration",
        tag: "Artificial Intelligence",
        category: "cloud",
        accent: "#FF6B6B",
        desc: "Unlock next-gen performance by weaving AI into your workflows — from personalisation engines to self-learning business systems.",
        contents: [
            "Natural Language Processing (NLP)",
            "Smart recommendation engines",
            "Self-learning ML systems",
            "AI strategy & roadmapping",
        ],
        featured: true,
    },
    {
        id: "digital-marketing",
        icon: FaBullhorn,
        title: "Digital Marketing",
        tag: "Growth",
        category: "people",
        accent: "#FFB800",
        desc: "We blend creativity with intelligent automation to deliver strategies that captivate, convert, and compound over time.",
        contents: [
            "Social media management",
            "Search Engine Optimisation (SEO)",
            "Pay-Per-Click Advertising (PPC)",
            "Content strategy & analytics",
        ],
        featured: false,
    },
    {
        id: "software-development",
        icon: FaMobileAlt,
        title: "Software Development",
        tag: "Engineering",
        category: "engineering",
        accent: "#00C9A7",
        desc: "Our software team builds robust, intelligent, and secure digital products — web, mobile, and everything in between.",
        contents: [
            "Full-stack web & mobile development",
            "Secure, scalable backend architecture",
            "CI/CD pipelines & DevOps",
            "API design & integrations",
        ],
        featured: false,
    },
    {
        id: "product-development",
        icon: FaCogs,
        title: "Product Development",
        tag: "Strategy",
        category: "engineering",
        accent: "#5090FF",
        desc: "We turn bold ideas into disruptive products with end-to-end lifecycle management that's agile, scalable, and user-obsessed.",
        contents: [
            "End-to-end product lifecycle",
            "UI/UX research & testing",
            "Agile project management",
            "Launch strategy & iteration",
        ],
        featured: false,
    },
    {
        id: "it-consulting",
        icon: FaLightbulb,
        title: "IT Consulting",
        tag: "Advisory",
        category: "engineering",
        accent: "#FFB800",
        desc: "Navigate complexity with expert guidance. We help businesses align technology with strategy to achieve measurable outcomes.",
        contents: [
            "IT strategy development",
            "Cloud migration advisory",
            "Cybersecurity consulting",
            "Business continuity planning",
        ],
        featured: false,
    },
    {
        id: "branding-design",
        icon: FaPalette,
        title: "Branding & Design",
        tag: "Creative",
        category: "people",
        accent: "#FF6B6B",
        desc: "Create powerful brand identities that resonate with your audience — from visual language to full digital experience design.",
        contents: [
            "Logo & visual identity creation",
            "Brand strategy workshops",
            "UI/UX & web design",
            "Motion & digital brand assets",
        ],
        featured: false,
    },
];

const FILTERS = [
    { id: "all", label: "All Services" },
    { id: "featured", label: "Popular" },
    { id: "engineering", label: "Engineering" },
    { id: "cloud", label: "Cloud & AI" },
    { id: "people", label: "People & Growth" },
];

/* ══════════════════════════════════════════════════════════
   UNIQUE SVG CARD ILLUSTRATIONS
   Each service gets its own procedural pattern background
══════════════════════════════════════════════════════════ */
function CardIllustration({ id, accent }) {
    const illustrations = {
        "tech-training": (
            // Code lines + cursor + bracket
            <svg width="100%" height="100%" viewBox="0 0 280 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                {/* Code lines */}
                {[0, 1, 2, 3, 4, 5].map(i => (
                    <rect key={i} x={i % 2 === 0 ? 20 : 36} y={16 + i * 16} width={i % 3 === 0 ? 80 : i % 2 === 0 ? 60 : 100}
                        height="5" rx="2.5" fill={accent} opacity={0.06 + i * 0.02} />
                ))}
                {/* Bracket */}
                <path d="M160 20 L148 20 L148 100 L160 100" stroke={accent} strokeWidth="1.5" fill="none" opacity="0.2" strokeLinecap="round" />
                <path d="M200 20 L212 20 L212 100 L200 100" stroke={accent} strokeWidth="1.5" fill="none" opacity="0.2" strokeLinecap="round" />
                {/* Cursor blink */}
                <rect x="168" y="54" width="2" height="14" rx="1" fill={accent} opacity="0.5" className={styles.blink} />
                {/* Dot grid bg */}
                {Array.from({ length: 6 }, (_, col) => Array.from({ length: 4 }, (_, row) => (
                    <circle key={`${col}-${row}`} cx={220 + col * 14} cy={20 + row * 28} r="1.2" fill={accent} opacity="0.08" />
                )))}
            </svg>
        ),
        "cloud-solutions": (
            // Cloud forms stacked
            <svg width="100%" height="100%" viewBox="0 0 280 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <ellipse cx="100" cy="72" rx="55" ry="22" fill={accent} opacity="0.08" />
                <ellipse cx="78" cy="64" rx="28" ry="20" fill={accent} opacity="0.08" />
                <ellipse cx="122" cy="66" rx="24" ry="18" fill={accent} opacity="0.08" />
                <ellipse cx="100" cy="72" rx="55" ry="22" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.2" />
                <ellipse cx="78" cy="64" rx="28" ry="20" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.2" />

                <ellipse cx="200" cy="50" rx="42" ry="17" fill={accent} opacity="0.06" />
                <ellipse cx="182" cy="44" rx="22" ry="16" fill={accent} opacity="0.06" />
                <ellipse cx="200" cy="50" rx="42" ry="17" fill="none" stroke={accent} strokeWidth="0.6" opacity="0.15" />

                {/* Rain lines */}
                {[90, 104, 118, 178, 192, 206].map((x, i) => (
                    <line key={i} x1={x} y1={92 + (i % 2) * 4} x2={x - 4} y2={108 + (i % 2) * 4}
                        stroke={accent} strokeWidth="1" opacity="0.15" strokeLinecap="round" />
                ))}
                {/* Server lines */}
                {[0, 1, 2].map(i => (
                    <rect key={i} x="190" y={72 + i * 14} width="60" height="8" rx="4"
                        fill={accent} opacity={0.06 + i * 0.02} />
                ))}
            </svg>
        ),
        "ai-integration": (
            // Neural network nodes
            <svg width="100%" height="100%" viewBox="0 0 280 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                {/* Layer 1 nodes */}
                {[30, 60, 90].map((y, i) => (
                    <circle key={`l1-${i}`} cx="60" cy={y} r="7" fill={accent} opacity="0.15" stroke={accent} strokeWidth="0.8" opacity2="0.3" />
                ))}
                {/* Layer 2 nodes */}
                {[22, 48, 75, 98].map((y, i) => (
                    <circle key={`l2-${i}`} cx="140" cy={y} r="7" fill={accent} opacity="0.2" stroke={accent} strokeWidth="0.8" />
                ))}
                {/* Layer 3 nodes */}
                {[40, 70].map((y, i) => (
                    <circle key={`l3-${i}`} cx="220" cy={y} r="8" fill={accent} opacity="0.3" stroke={accent} strokeWidth="1" />
                ))}
                {/* Connections l1→l2 */}
                {[30, 60, 90].flatMap(y1 => [22, 48, 75, 98].map(y2 => (
                    <line key={`${y1}-${y2}`} x1="67" y1={y1} x2="133" y2={y2}
                        stroke={accent} strokeWidth="0.5" opacity="0.12" />
                )))}
                {/* Connections l2→l3 */}
                {[22, 48, 75, 98].flatMap(y1 => [40, 70].map(y2 => (
                    <line key={`${y1}-${y2}b`} x1="147" y1={y1} x2="212" y2={y2}
                        stroke={accent} strokeWidth="0.6" opacity="0.18" />
                )))}
                {/* Hot connection highlight */}
                <line x1="67" y1="60" x2="133" y2="48" stroke={accent} strokeWidth="1.5" opacity="0.5" />
                <line x1="147" y1="48" x2="212" y2="40" stroke={accent} strokeWidth="1.5" opacity="0.5" />
                {/* Outer ring on output */}
                <circle cx="220" cy="40" r="14" fill="none" stroke={accent} strokeWidth="0.6" strokeDasharray="3 5" opacity="0.25" />
            </svg>
        ),
        "digital-marketing": (
            // Signal waves + bar chart
            <svg width="100%" height="100%" viewBox="0 0 280 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                {/* Signal waves */}
                <path d="M20 60 Q40 30 60 60 Q80 90 100 60 Q120 30 140 60" stroke={accent} strokeWidth="1.2" fill="none" opacity="0.25" />
                <path d="M20 70 Q45 50 70 70 Q95 90 120 70 Q145 50 170 70" stroke={accent} strokeWidth="0.7" fill="none" opacity="0.14" />
                {/* Bar chart */}
                {[
                    { x: 168, h: 45, op: 0.12 },
                    { x: 184, h: 65, op: 0.18 },
                    { x: 200, h: 40, op: 0.12 },
                    { x: 216, h: 80, op: 0.25 },
                    { x: 232, h: 55, op: 0.16 },
                    { x: 248, h: 90, op: 0.3 },
                ].map(({ x, h, op }, i) => (
                    <rect key={i} x={x} y={100 - h} width="10" height={h} rx="3" fill={accent} opacity={op} />
                ))}
                {/* Trend line over bars */}
                <polyline points="173,72 189,52 205,77 221,36 237,62 253,24"
                    stroke={accent} strokeWidth="1.5" fill="none" opacity="0.4" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="253" cy="24" r="3.5" fill={accent} opacity="0.6" />
            </svg>
        ),
        "software-development": (
            // Terminal window
            <svg width="100%" height="100%" viewBox="0 0 280 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                {/* Window frame */}
                <rect x="20" y="16" width="200" height="88" rx="8" fill={accent} opacity="0.05" stroke={accent} strokeWidth="0.8" opacity2="0.2" />
                {/* Title bar */}
                <rect x="20" y="16" width="200" height="22" rx="8" fill={accent} opacity="0.08" />
                <circle cx="36" cy="27" r="4" fill={accent} opacity="0.3" />
                <circle cx="50" cy="27" r="4" fill={accent} opacity="0.2" />
                <circle cx="64" cy="27" r="4" fill={accent} opacity="0.15" />
                {/* Code lines inside */}
                <text x="32" y="56" fontFamily="'SF Mono',monospace" fontSize="8" fill={accent} opacity="0.4">$ npm run build</text>
                <text x="32" y="70" fontFamily="'SF Mono',monospace" fontSize="7" fill={accent} opacity="0.25">✓ compiled in 420ms</text>
                <text x="32" y="84" fontFamily="'SF Mono',monospace" fontSize="7" fill={accent} opacity="0.2">→ ready on :3000</text>
                {/* Cursor */}
                <rect x="32" y="90" width="6" height="8" rx="1" fill={accent} opacity="0.4" className={styles.blink} />
                {/* Dot grid right side */}
                {Array.from({ length: 5 }, (_, c) => Array.from({ length: 5 }, (_, r) => (
                    <circle key={`${c}-${r}`} cx={242 + c * 10} cy={26 + r * 18} r="1" fill={accent} opacity="0.08" />
                )))}
            </svg>
        ),
        "product-development": (
            // Sprint board / kanban
            <svg width="100%" height="100%" viewBox="0 0 280 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                {/* Column headers */}
                {['Todo', 'In Progress', 'Done'].map((label, i) => (
                    <g key={label}>
                        <rect x={20 + i * 85} y="16" width="72" height="16" rx="4" fill={accent} opacity={0.06 + i * 0.03} />
                        <text x={56 + i * 85} y="28" textAnchor="middle" fontFamily="'SF Mono',monospace" fontSize="6.5" fill={accent} opacity="0.4">{label}</text>
                    </g>
                ))}
                {/* Cards in columns */}
                {[
                    { col: 0, rows: [0, 1, 2] },
                    { col: 1, rows: [0, 1] },
                    { col: 2, rows: [0, 1, 2, 3] },
                ].map(({ col, rows }) => rows.map(row => (
                    <rect key={`${col}-${row}`}
                        x={20 + col * 85} y={40 + row * 20}
                        width="72" height="14" rx="3"
                        fill={accent} opacity={0.05 + (col === 2 ? 0.06 : 0)}
                        stroke={accent} strokeWidth="0.5" opacity2={0.15}
                    />
                )))}
                {/* Check marks on done column */}
                {[0, 1, 2, 3].map(row => (
                    <text key={row} x="226" y={51 + row * 20} fontFamily="sans-serif" fontSize="7" fill={accent} opacity="0.4">✓</text>
                ))}
            </svg>
        ),
        "it-consulting": (
            // Circuit / network topology
            <svg width="100%" height="100%" viewBox="0 0 280 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                {/* Central hub */}
                <circle cx="140" cy="60" r="16" fill={accent} opacity="0.12" stroke={accent} strokeWidth="1" opacity2="0.3" />
                <circle cx="140" cy="60" r="8" fill={accent} opacity="0.2" />
                {/* Spokes */}
                {[
                    [60, 25], [220, 25], [260, 60], [220, 95], [60, 95], [20, 60]
                ].map(([x, y], i) => (
                    <g key={i}>
                        <line x1="140" y1="60" x2={x} y2={y} stroke={accent} strokeWidth="0.8" opacity="0.18" strokeDasharray="4 4" />
                        <circle cx={x} cy={y} r="7" fill={accent} opacity="0.1" stroke={accent} strokeWidth="0.7" opacity2="0.25" />
                        <circle cx={x} cy={y} r="3" fill={accent} opacity="0.25" />
                    </g>
                ))}
                {/* Outer ring */}
                <circle cx="140" cy="60" r="50" fill="none" stroke={accent} strokeWidth="0.5" strokeDasharray="2 8" opacity="0.15" />
            </svg>
        ),
        "branding-design": (
            // Colour swatches + bezier curves
            <svg width="100%" height="100%" viewBox="0 0 280 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                {/* Swatches */}
                {["#00C9A7", "#5090FF", "#FFB800", "#FF6B6B", "#9C6FFF"].map((c, i) => (
                    <rect key={i} x={20 + i * 24} y="72" width="18" height="32" rx="4"
                        fill={c} opacity={0.25 + i * 0.04} />
                ))}
                {/* Bezier curves */}
                <path d="M20 50 C60 10 100 90 140 50" stroke={accent} strokeWidth="1.5" fill="none" opacity="0.3" />
                <path d="M80 60 C120 20 160 80 200 40" stroke={accent} strokeWidth="1" fill="none" opacity="0.2" />
                <path d="M140 55 C170 25 210 75 250 45" stroke={accent} strokeWidth="0.8" fill="none" opacity="0.15" />
                {/* Control point dots */}
                <circle cx="20" cy="50" r="3" fill={accent} opacity="0.4" />
                <circle cx="140" cy="50" r="3" fill={accent} opacity="0.4" />
                <circle cx="80" cy="60" r="3" fill={accent} opacity="0.3" />
                <circle cx="200" cy="40" r="3" fill={accent} opacity="0.3" />
                {/* Pen nib icon */}
                <path d="M230 30 L244 16 L258 30 L244 44 Z" fill={accent} opacity="0.12" stroke={accent} strokeWidth="0.8" opacity2="0.25" />
                <line x1="244" y1="44" x2="244" y2="58" stroke={accent} strokeWidth="1" opacity="0.2" strokeLinecap="round" />
            </svg>
        ),
    };
    return illustrations[id] || null;
}

/* ══════════════════════════════════════════════════════════
   HERO NETWORK SVG — services as nodes
══════════════════════════════════════════════════════════ */
function HeroNetwork() {
    // Node positions: centre + 8 around it
    const cx = 400, cy = 160, r = 110;
    const nodeData = services.map((s, i) => {
        const angle = (i / services.length) * Math.PI * 2 - Math.PI / 2;
        return { ...s, nx: cx + r * Math.cos(angle), ny: cy + r * Math.sin(angle) };
    });

    return (
        <svg className={styles.heroNetwork} viewBox="0 0 800 320" aria-hidden="true">
            <defs>
                <radialGradient id="netGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="var(--teal)" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="var(--teal)" stopOpacity="0" />
                </radialGradient>
            </defs>

            {/* Central glow */}
            <ellipse cx={cx} cy={cy} rx="90" ry="90" fill="url(#netGlow)" />

            {/* Orbit rings */}
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--teal)" strokeWidth="0.5" strokeDasharray="4 12" opacity="0.15" />
            <circle cx={cx} cy={cy} r={r + 40} fill="none" stroke="var(--teal)" strokeWidth="0.3" strokeDasharray="2 10" opacity="0.08" />

            {/* Spoke lines from centre to nodes */}
            {nodeData.map(n => (
                <line key={n.id}
                    x1={cx} y1={cy} x2={n.nx} y2={n.ny}
                    stroke={n.accent} strokeWidth="0.7" opacity="0.9" strokeDasharray="3 5"
                />
            ))}

            {/* Cross-connections (adjacent nodes) */}
            {nodeData.map((n, i) => {
                const next = nodeData[(i + 1) % nodeData.length];
                return (
                    <line key={`c-${i}`}
                        x1={n.nx} y1={n.ny} x2={next.nx} y2={next.ny}
                        stroke={n.accent} strokeWidth="0.5" opacity="0.9"
                    />
                );
            })}

            {/* Centre node */}
            <circle cx={cx} cy={cy} r="22" fill="var(--blue)" opacity="0.9" />
            <circle cx={cx} cy={cy} r="22" fill="none" stroke="var(--teal)" strokeWidth="1.2" opacity="0.5" />
            <circle cx={cx} cy={cy} r="32" fill="none" stroke="var(--teal)" strokeWidth="0.5" strokeDasharray="2 6" opacity="0.25" className={styles.spinSlow} />
            <text x={cx} y={cy - 4} textAnchor="middle" fontFamily="'SF Mono',monospace" fontSize="6.5" fontWeight="700" fill="var(--teal)" letterSpacing="0.1em" opacity="0.85">CLOUD</text>
            <text x={cx} y={cy + 7} textAnchor="middle" fontFamily="'SF Mono',monospace" fontSize="6.5" fontWeight="700" fill="var(--teal)" letterSpacing="0.1em" opacity="0.85">CRAVE</text>

            {/* Service nodes */}
            {nodeData.map(n => (
                <g key={n.id}>
                    {/* Outer pulse ring */}
                    <circle cx={n.nx} cy={n.ny} r="18" fill="none" stroke={n.accent} strokeWidth="0.6" opacity="0.15" />
                    {/* Node fill */}
                    <circle cx={n.nx} cy={n.ny} r="12" fill="var(--bg)" stroke={n.accent} strokeWidth="1.2" opacity="1" />
                    <circle cx={n.nx} cy={n.ny} r="5" fill={n.accent} opacity="0.5" />
                    {/* Node label */}
                    <text
                        x={n.nx}
                        y={n.ny > cy ? n.ny + 26 : n.ny - 18}
                        textAnchor="middle"
                        fontFamily="'SF Mono',monospace"
                        fontSize="7" fontWeight="600"
                        fill="var(--ink-2)" opacity="0.7"
                    >
                        {n.title}
                    </text>
                </g>
            ))}

            {/* Travelling data packet */}
            <circle r="3" fill="var(--teal)" opacity="0.8" className={styles.travelPacket}>
                <animateMotion dur="8s" repeatCount="indefinite"
                    path={`M${cx},${cy} ${nodeData.map(n => `L${n.nx},${n.ny}`).join(' ')} Z`}
                />
                <animate attributeName="opacity" values="0;0.9;0.9;0" dur="8s" repeatCount="indefinite" />
            </circle>
            <circle r="2" fill="var(--amber)" opacity="0.7">
                <animateMotion dur="12s" repeatCount="indefinite" begin="3s"
                    path={`M${cx},${cy} ${nodeData.map(n => `L${n.nx},${n.ny}`).join(' ')} Z`}
                />
                <animate attributeName="opacity" values="0;0.8;0.8;0" dur="12s" repeatCount="indefinite" begin="3s" />
            </circle>
        </svg>
    );
}

/* ══════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════ */
export default function Service() {
    const navigate = useNavigate();
    const [filter, setFilter] = useState("all");
    const [hoveredId, setHoveredId] = useState(null);

    const filtered = services.filter(s => {
        if (filter === "all") return true;
        if (filter === "featured") return s.featured;
        return s.category === filter;
    });

    return (
        <div className={styles.page}>

            {/* ══════════════════════════════
          HERO — network graph
      ══════════════════════════════ */}
            <header className={styles.pageHeader}>
                <HeroNetwork />

                <div className={styles.headerContent}>
                    <p className={styles.sectionLabel}>What we offer</p>
                    <h1 className={styles.pageTitle}>
                        Services built to<br />
                        <em className={styles.pageTitleAccent}>move your business</em>
                    </h1>
                    <p className={styles.pageSubtitle}>
                        Tailored solutions across cloud, AI, software, marketing, and design —
                        engineered for scale, built for results.
                    </p>
                </div>

                {/* Service count badges */}
                <div className={styles.headerMeta} aria-hidden="true">
                    <div className={styles.metaBadge}>
                        <span className={styles.metaNum}>8</span>
                        <span className={styles.metaLabel}>Services</span>
                    </div>
                    <div className={styles.metaDivider} />
                    <div className={styles.metaBadge}>
                        <span className={styles.metaNum}>3</span>
                        <span className={styles.metaLabel}>Popular picks</span>
                    </div>
                    <div className={styles.metaDivider} />
                    <div className={styles.metaBadge}>
                        <span className={styles.metaNum}>∞</span>
                        <span className={styles.metaLabel}>Possibilities</span>
                    </div>
                </div>
            </header>

            {/* ══════════════════════════════
          FILTER TABS
      ══════════════════════════════ */}
            <div className={styles.filterBar} role="tablist" aria-label="Filter services">
                {FILTERS.map(f => (
                    <button key={f.id}
                        role="tab"
                        aria-selected={filter === f.id}
                        className={`${styles.filterTab} ${filter === f.id ? styles.filterActive : ""}`}
                        onClick={() => setFilter(f.id)}
                    >
                        {f.label}
                        <span className={styles.filterCount}>
                            {f.id === "all" ? services.length
                                : f.id === "featured" ? services.filter(s => s.featured).length
                                    : services.filter(s => s.category === f.id).length}
                        </span>
                    </button>
                ))}
            </div>

            {/* ══════════════════════════════
          FEATURED SPOTLIGHT — horizontal cards
      ══════════════════════════════ */}
            {(filter === "all" || filter === "featured") && (
                <section className={styles.spotlightSection}>
                    <div className={styles.spotlightHeader}>
                        <p className={styles.sectionLabel}>Popular services</p>
                    </div>
                    <div className={styles.spotlightGrid}>
                        {services.filter(s => s.featured).map((s, i) => {
                            const Icon = s.icon;
                            return (
                                <article key={s.id}
                                    className={styles.spotlightCard}
                                    style={{ "--accent": s.accent, animationDelay: `${i * 0.12}s` }}
                                    onMouseEnter={() => setHoveredId(s.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                >
                                    {/* Illustration fills top half */}
                                    <div className={styles.spotlightIllustration}>
                                        <CardIllustration id={s.id} accent={s.accent} />
                                        {/* Gradient overlay */}
                                        <div className={styles.spotlightGradient}
                                            style={{ background: `linear-gradient(to bottom, transparent 40%, var(--bg) 100%)` }} />
                                    </div>

                                    <div className={styles.spotlightBody}>
                                        <div className={styles.spotlightTopRow}>
                                            <span className={styles.tag}>{s.tag}</span>
                                            <span className={styles.popularBadge}>Popular</span>
                                        </div>
                                        <div className={styles.spotlightIconTitle}>
                                            <div className={styles.spotlightIconWrap} style={{ color: s.accent }}>
                                                <Icon />
                                            </div>
                                            <h2 className={styles.spotlightTitle}>{s.title}</h2>
                                        </div>
                                        <p className={styles.spotlightDesc}>{s.desc}</p>
                                        <ul className={styles.featureList}>
                                            {s.contents.map((item, idx) => (
                                                <li key={idx} className={styles.featureItem}>
                                                    <span className={styles.checkDot} style={{ background: s.accent }} />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                        <button className={styles.spotlightBtn}
                                            style={{ background: s.accent }}
                                            onClick={() => navigate(`/contact?service=${s.id}`)}>
                                            Get Started <FaArrowRight className={styles.btnArrow} />
                                        </button>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* ══════════════════════════════
          ALL SERVICES GRID
      ══════════════════════════════ */}
            <section className={styles.gridSection}>
                {(filter !== "all" && filter !== "featured") && (
                    <div className={styles.gridSectionHeader}>
                        <p className={styles.sectionLabel}>{FILTERS.find(f => f.id === filter)?.label}</p>
                    </div>
                )}

                <div className={styles.servicesGrid}>
                    {filtered
                        .filter(s => filter === "all" || filter === "featured" ? !s.featured : true)
                        .map((s, i) => {
                            const Icon = s.icon;
                            return (
                                <article key={s.id}
                                    className={`${styles.card} ${s.featured && (filter !== "all" && filter !== "featured") ? styles.featured : ""}`}
                                    style={{ "--accent": s.accent, "--delay": `${i * 0.07}s` }}
                                    onMouseEnter={() => setHoveredId(s.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                >
                                    {/* SVG illustration bg */}
                                    <div className={styles.cardIllustrationBg}>
                                        <CardIllustration id={s.id} accent={s.accent} />
                                    </div>

                                    {/* Accent corner geometry */}
                                    <svg className={styles.cardGeo} width="56" height="56" viewBox="0 0 56 56" aria-hidden="true">
                                        <circle cx="50" cy="6" r="28" fill="var(--accent)" opacity="0.07" />
                                        <circle cx="50" cy="6" r="16" fill="none" stroke="var(--accent)" strokeWidth="0.7" opacity="0.18" />
                                    </svg>

                                    {/* Icon */}
                                    <div className={styles.iconWrap} style={{ color: s.accent, borderColor: `${s.accent}30` }}>
                                        <Icon />
                                    </div>

                                    {/* Tag */}
                                    <span className={styles.tag}>{s.tag}</span>

                                    {/* Title */}
                                    <h3 className={styles.cardTitle}>{s.title}</h3>

                                    {/* Desc */}
                                    <p className={styles.cardDesc}>{s.desc}</p>

                                    {/* Feature list */}
                                    <ul className={styles.featureList}>
                                        {s.contents.map((item, idx) => (
                                            <li key={idx} className={styles.featureItem}>
                                                <span className={styles.checkDot} style={{ background: s.accent }} />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Bottom row */}
                                    <div className={styles.cardFooter}>
                                        <button className={styles.cardBtn}
                                            style={{ "--accent": s.accent }}
                                            onClick={() => navigate(`/contact?service=${s.id}`)}>
                                            Get Started <FaArrowRight className={styles.btnArrow} />
                                        </button>
                                    </div>

                                    {/* Hover accent bar */}
                                    <div className={styles.cardAccentBar} style={{ background: s.accent }} />
                                </article>
                            );
                        })}
                </div>
            </section>

            {/* ══════════════════════════════
          BOTTOM CTA — radar sweep
      ══════════════════════════════ */}
            <section className={styles.bottomCta}>
                {/* Radar SVG */}
                <svg className={styles.ctaRadar} viewBox="0 0 800 400"
                    preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="var(--teal)" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="var(--teal)" stopOpacity="0" />
                        </radialGradient>
                    </defs>

                    {/* Radar rings */}
                    {[60, 120, 180, 240].map(r => (
                        <circle key={r} cx="400" cy="200" r={r}
                            fill={r === 60 ? "url(#radarGlow)" : "none"}
                            stroke="var(--teal)" strokeWidth="0.5"
                            strokeDasharray={r > 60 ? "3 10" : undefined}
                            opacity={0.25 - r * 0.0006}
                        />
                    ))}

                    {/* Cross hairs */}
                    <line x1="400" y1="0" x2="400" y2="400" stroke="var(--teal)" strokeWidth="0.3" opacity="0.1" />
                    <line x1="160" y1="200" x2="640" y2="200" stroke="var(--teal)" strokeWidth="0.3" opacity="0.1" />

                    {/* Radar sweep arm */}
                    <line x1="400" y1="200" x2="640" y2="200"
                        stroke="var(--teal)" strokeWidth="1" opacity="0.4"
                        className={styles.radarSweep}
                        style={{ transformOrigin: "400px 200px" }}
                    />

                    {/* Blip dots */}
                    {[
                        [480, 155, 3, 0.7], [350, 120, 2, 0.5],
                        [530, 220, 2.5, 0.6], [290, 250, 2, 0.45],
                        [440, 290, 3, 0.5], [340, 180, 2, 0.4],
                    ].map(([x, y, r, op], i) => (
                        <circle key={i} cx={x} cy={y} r={r} fill="var(--teal)" opacity={op}
                            className={styles.blip}
                            style={{ animationDelay: `${i * 0.4}s` }}
                        />
                    ))}

                    {/* Star field */}
                    {[
                        [80, 40, 1], [180, 80, 0.8], [600, 60, 1], [720, 120, 0.8],
                        [120, 340, 0.9], [700, 320, 1], [50, 200, 0.7], [740, 200, 0.8],
                    ].map(([x, y, r], i) => (
                        <circle key={`s${i}`} cx={x} cy={y} r={r} fill="white" opacity="0.3" />
                    ))}
                </svg>

                <div className={styles.ctaInner}>
                    <p className={styles.ctaLabel}>READY TO START?</p>
                    <h2 className={styles.ctaHeading}>
                        Not sure which service fits?<br />
                        <em>Let's figure it out together.</em>
                    </h2>
                    <p className={styles.ctaDesc}>
                        Book a free 30-minute discovery call and we'll map out the right path for your business.
                    </p>
                    <div className={styles.ctaActions}>
                        <button className={styles.ctaBtn}
                            onClick={() => navigate("/contact")}>
                            Book a Free Call <FaArrowRight className={styles.btnArrow} />
                        </button>
                        <button className={styles.ctaBtnGhost}
                            onClick={() => navigate("/about")}>
                            Learn about us
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}