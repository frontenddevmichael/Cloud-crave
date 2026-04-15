import styles from "./About.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

/* ── DATA ─────────────────────────────────────────────────── */
const values = [
    {
        slug: "speed",
        title: "Speed with intention",
        desc: "We move fast — but never at the cost of craft. Every decision is deliberate, every line of code purposeful.",
        accent: "#00C9A7",
    },
    {
        slug: "africa",
        title: "Africa-first thinking",
        desc: "We build with our context in mind — understanding the unique opportunities and constraints of Nigeria and the continent.",
        accent: "#FFB800",
    },
    {
        slug: "partnership",
        title: "Long-term partnership",
        desc: "We don't just deliver projects. We become strategic partners invested in your growth beyond the first deployment.",
        accent: "#5090FF",
    },
    {
        slug: "engineering",
        title: "Engineering excellence",
        desc: "We hold ourselves to global engineering standards — clean code, secure architecture, and systems that scale.",
        accent: "#FF6B6B",
    },
];

const milestones = [
    { year: "2009", event: "Founded in Lagos as a web design & hosting firm.", label: "Origin", accent: "#00C9A7" },
    { year: "2014", event: "Expanded into mobile development and digital marketing.", label: "Growth", accent: "#FFB800" },
    { year: "2018", event: "Launched SchoolSync, our flagship EdTech product.", label: "Product", accent: "#5090FF" },
    { year: "2020", event: "Entered cloud infrastructure consulting; first enterprise cloud migration.", label: "Cloud", accent: "#00C9A7" },
    { year: "2021", event: "Delivered EstateGo and Needletail; crossed 25 enterprise clients.", label: "Scale", accent: "#FFB800" },
    { year: "2023", event: "Launched Chatbot Studio; began AI integration practice.", label: "AI", accent: "#5090FF" },
    { year: "2024", event: "Rebranded as CloudCrave Solutions; expanded team to 40+ professionals.", label: "Today", accent: "#FF6B6B" },
];

const team = [
    { name: "Akin Adeyemi", role: "CEO & Co-Founder", initials: "AA", shape: "hexagon", accent: "#00C9A7" },
    { name: "Chidi Okonkwo", role: "CTO", initials: "CO", shape: "diamond", accent: "#5090FF" },
    { name: "Fatima Sule", role: "Head of Design", initials: "FS", shape: "circle", accent: "#FFB800" },
    { name: "Emeka Nwosu", role: "Head of Cloud Engineering", initials: "EN", shape: "triangle", accent: "#00C9A7" },
    { name: "Nkechi Eze", role: "Head of Product", initials: "NE", shape: "hexagon", accent: "#FF6B6B" },
    { name: "Tobi Adewale", role: "Head of Training", initials: "TA", shape: "diamond", accent: "#5090FF" },
];

const stats = [
    { value: 15, suffix: "+", label: "Years in business" },
    { value: 50, suffix: "+", label: "Projects delivered" },
    { value: 40, suffix: "+", label: "Team members" },
    { value: 4, suffix: "", label: "Countries served" },
];

/* ── ANIMATED COUNTER ── */
function Counter({ target, suffix }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const started = useRef(false);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true;
                    let start = 0;
                    const step = target / 40;
                    const interval = setInterval(() => {
                        start += step;
                        if (start >= target) { setCount(target); clearInterval(interval); }
                        else setCount(Math.floor(start));
                    }, 35);
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [target]);

    return <span ref={ref}>{count}{suffix}</span>;
}

/* ── GENERATIVE AVATAR SVG ── */
function AvatarArt({ member, size = 72 }) {
    const { initials, accent, shape } = member;
    const c = size / 2;
    const r = size * 0.38;

    const shapes = {
        hexagon: (
            <>
                <polygon
                    points={Array.from({ length: 6 }, (_, i) => {
                        const a = (Math.PI / 3) * i - Math.PI / 6;
                        return `${c + r * Math.cos(a)},${c + r * Math.sin(a)}`;
                    }).join(" ")}
                    fill={accent} opacity="0.18"
                />
                <polygon
                    points={Array.from({ length: 6 }, (_, i) => {
                        const a = (Math.PI / 3) * i - Math.PI / 6;
                        const ri = r * 0.72;
                        return `${c + ri * Math.cos(a)},${c + ri * Math.sin(a)}`;
                    }).join(" ")}
                    fill="none" stroke={accent} strokeWidth="1.2" opacity="0.55"
                />
                <polygon
                    points={Array.from({ length: 6 }, (_, i) => {
                        const a = (Math.PI / 3) * i - Math.PI / 6;
                        const ri = r * 0.4;
                        return `${c + ri * Math.cos(a)},${c + ri * Math.sin(a)}`;
                    }).join(" ")}
                    fill={accent} opacity="0.35"
                />
            </>
        ),
        diamond: (
            <>
                <rect x={c - r} y={c - r} width={r * 2} height={r * 2}
                    transform={`rotate(45 ${c} ${c})`} fill={accent} opacity="0.18" />
                <rect x={c - r * 0.72} y={c - r * 0.72} width={r * 1.44} height={r * 1.44}
                    transform={`rotate(45 ${c} ${c})`} fill="none" stroke={accent} strokeWidth="1.2" opacity="0.55" />
                <rect x={c - r * 0.38} y={c - r * 0.38} width={r * 0.76} height={r * 0.76}
                    transform={`rotate(45 ${c} ${c})`} fill={accent} opacity="0.35" />
            </>
        ),
        circle: (
            <>
                <circle cx={c} cy={c} r={r} fill={accent} opacity="0.18" />
                <circle cx={c} cy={c} r={r * 0.72} fill="none" stroke={accent} strokeWidth="1.2" opacity="0.55" />
                <circle cx={c} cy={c} r={r * 0.4} fill={accent} opacity="0.35" />
            </>
        ),
        triangle: (
            <>
                <polygon
                    points={`${c},${c - r} ${c + r * 0.866},${c + r * 0.5} ${c - r * 0.866},${c + r * 0.5}`}
                    fill={accent} opacity="0.18"
                />
                <polygon
                    points={`${c},${c - r * 0.72} ${c + r * 0.624},${c + r * 0.36} ${c - r * 0.624},${c + r * 0.36}`}
                    fill="none" stroke={accent} strokeWidth="1.2" opacity="0.55"
                />
                <polygon
                    points={`${c},${c - r * 0.4} ${c + r * 0.346},${c + r * 0.2} ${c - r * 0.346},${c + r * 0.2}`}
                    fill={accent} opacity="0.35"
                />
            </>
        ),
    };

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
            <circle cx={c} cy={c} r={c - 1.5} fill="none" stroke={accent} strokeWidth="0.8" opacity="0.2" />
            <circle cx={c} cy={c} r={c - 5} fill="none" stroke={accent} strokeWidth="0.5"
                strokeDasharray="2 5" opacity="0.3" />
            {shapes[shape]}
            <text x={c} y={c + 1} textAnchor="middle" dominantBaseline="middle"
                fontFamily="'SF Mono','Fira Mono',monospace" fontSize={size * 0.175}
                fontWeight="700" fill={accent} opacity="0.9">
                {initials}
            </text>
        </svg>
    );
}

/* ── VALUE ICON SVGs ── */
const ValueIcons = {
    speed: ({ color }) => (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <circle cx="20" cy="20" r="18" stroke={color} strokeWidth="1" opacity="0.2" />
            <path d="M20 6 L24 18 L36 20 L24 22 L20 34 L16 22 L4 20 L16 18 Z"
                fill={color} opacity="0.85" />
            <circle cx="20" cy="20" r="3" fill="white" opacity="0.9" />
        </svg>
    ),
    africa: ({ color }) => (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <path d="M18 5 Q24 5 25 9 Q29 10 30 15 Q32 20 28 26 Q26 32 22 35 Q18 36 16 32 Q12 28 13 22 Q10 18 12 13 Q13 8 18 5Z"
                fill={color} opacity="0.25" />
            <path d="M18 5 Q24 5 25 9 Q29 10 30 15 Q32 20 28 26 Q26 32 22 35 Q18 36 16 32 Q12 28 13 22 Q10 18 12 13 Q13 8 18 5Z"
                fill="none" stroke={color} strokeWidth="1.2" opacity="0.7" />
            <circle cx="21" cy="19" r="3.5" fill={color} opacity="0.9" />
            <circle cx="21" cy="19" r="1.5" fill="white" opacity="0.9" />
        </svg>
    ),
    partnership: ({ color }) => (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <circle cx="14" cy="16" r="6" fill={color} opacity="0.2" stroke={color} strokeWidth="1.2" />
            <circle cx="26" cy="16" r="6" fill={color} opacity="0.2" stroke={color} strokeWidth="1.2" />
            <path d="M14 22 Q20 30 26 22" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <line x1="20" y1="10" x2="20" y2="16" stroke={color} strokeWidth="1" opacity="0.5" strokeDasharray="2 2" />
        </svg>
    ),
    engineering: ({ color }) => (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <rect x="6" y="14" width="28" height="18" rx="3" stroke={color} strokeWidth="1.2" opacity="0.7" fill={color} fillOpacity="0.1" />
            <path d="M12 14 L12 10 Q12 7 15 7 L25 7 Q28 7 28 10 L28 14" stroke={color} strokeWidth="1.2" fill="none" opacity="0.6" />
            <line x1="13" y1="21" x2="19" y2="21" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
            <line x1="13" y1="25" x2="27" y2="25" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
            <circle cx="26" cy="21" r="2.5" fill={color} opacity="0.8" />
        </svg>
    ),
};

/* ── SVG TIMELINE ── */
function TimelineSVG({ milestones, animate }) {
    // Layout constants
    const W = 900;
    const NODE_Y_START = 80;
    const NODE_SPACING = 120;
    const TOTAL_H = NODE_Y_START + (milestones.length - 1) * NODE_SPACING + 80;

    // Spine: a slightly wavy vertical path through alternating x positions
    // Left nodes at x=180, right at x=720, spine runs down x=450 (centre)
    const SPINE_X = 450;
    const leftX = 180;
    const rightX = 720;

    // Build the spine path as a smooth bezier
    const nodeYs = milestones.map((_, i) => NODE_Y_START + i * NODE_SPACING);

    // Spine path: straight line with node notches is cleaner
    const spinePathD = `M ${SPINE_X} 20 L ${SPINE_X} ${TOTAL_H - 40}`;

    // Total spine length (approximate for dash animation)
    const spineLen = TOTAL_H - 60;

    return (
        <svg
            className={styles.timelineSVG}
            viewBox={`0 0 ${W} ${TOTAL_H}`}
            preserveAspectRatio="xMidYMin meet"
            aria-label="CloudCrave Solutions company timeline"
            role="img"
        >
            <defs>
                <linearGradient id="spineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00C9A7" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#5090FF" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#FF6B6B" stopOpacity="0.5" />
                </linearGradient>
                <filter id="nodeglow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* ── Decorative grid dots in background ── */}
            {Array.from({ length: 8 }, (_, col) =>
                Array.from({ length: 10 }, (_, row) => (
                    <circle
                        key={`${col}-${row}`}
                        cx={60 + col * 112}
                        cy={40 + row * (TOTAL_H - 80) / 9}
                        r="1.5"
                        fill="var(--border, #e5e7eb)"
                        opacity="0.5"
                    />
                ))
            )}

            {/* ── Horizontal guide rails ── */}
            {nodeYs.map((y, i) => (
                <line
                    key={`rail-${i}`}
                    x1={40}
                    y1={y}
                    x2={W - 40}
                    y2={y}
                    stroke={milestones[i].accent}
                    strokeWidth="0.5"
                    strokeDasharray="4 8"
                    opacity="0.18"
                />
            ))}

            {/* ── Main spine ── */}
            <path
                d={spinePathD}
                fill="none"
                stroke="url(#spineGrad)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={spineLen}
                strokeDashoffset={animate ? 0 : spineLen}
                style={{
                    transition: animate
                        ? "stroke-dashoffset 2.2s cubic-bezier(0.22,1,0.36,1)"
                        : "none",
                }}
                opacity="0.9"
            />

            {/* ── Spine glow (blurred duplicate) ── */}
            <path
                d={spinePathD}
                fill="none"
                stroke="url(#spineGrad)"
                strokeWidth="6"
                opacity="0.08"
                strokeLinecap="round"
            />

            {/* ── Milestone nodes ── */}
            {milestones.map((m, i) => {
                const y = nodeYs[i];
                const isLeft = i % 2 === 0;
                const cardX = isLeft ? leftX : rightX;
                const cardW = 220;
                const cardH = 72;
                const cardXAdj = isLeft ? cardX - cardW : cardX;

                // Connector line from spine to card
                const connX1 = SPINE_X + (isLeft ? -14 : 14);
                const connX2 = isLeft ? cardX : cardX;

                // Year label position
                const yearX = isLeft ? cardX + cardW + 70 : cardX - 300;
                const yearAnchor = isLeft ? "start" : "end";

                return (
                    <g
                        key={m.year}
                        style={{
                            opacity: animate ? 1 : 0,
                            transition: animate
                                ? `opacity 0.5s ease ${0.3 + i * 0.18}s`
                                : "none",
                        }}
                    >
                        {/* Horizontal connector */}
                        <line
                            x1={connX1}
                            y1={y}
                            x2={connX2}
                            y2={y}
                            stroke={m.accent}
                            strokeWidth="1"
                            strokeDasharray="3 4"
                            opacity="0.5"
                        />

                        {/* Card background */}
                        <rect
                            x={cardXAdj}
                            y={y - cardH / 2}
                            width={cardW}
                            height={cardH}
                            rx="10"
                            fill="var(--bg, #ffffff)"
                            stroke={m.accent}
                            strokeWidth="1"
                            opacity="0.9"
                        />

                        {/* Card left accent bar */}
                        <rect
                            x={isLeft ? cardXAdj : cardXAdj}
                            y={y - cardH / 2 + 12}
                            width="3"
                            height={cardH - 24}
                            rx="2"
                            fill={m.accent}
                        />

                        {/* Label chip */}
                        <rect
                            x={isLeft ? cardXAdj + 14 : cardXAdj + 14}
                            y={y - cardH / 2 + 12}
                            width={m.label.length * 7 + 16}
                            height={18}
                            rx="9"
                            fill={m.accent}
                            opacity="0.12"
                        />
                        <text
                            x={isLeft ? cardXAdj + 22 : cardXAdj + 22}
                            y={y - cardH / 2 + 25}
                            fontFamily="'SF Mono','Fira Mono',monospace"
                            fontSize="9"
                            fontWeight="700"
                            letterSpacing="0.12em"
                            fill={m.accent}
                            textAnchor="start"
                        >
                            {m.label.toUpperCase()}
                        </text>

                        {/* Event text */}
                        <foreignObject
                            x={cardXAdj + 14}
                            y={y - cardH / 2 + 34}
                            width={cardW - 22}
                            height={30}
                        >
                            <div
                                xmlns="http://www.w3.org/1999/xhtml"
                                style={{
                                    fontSize: "11px",
                                    lineHeight: "1.45",
                                    color: "var(--ink-2, #555)",
                                    fontFamily: "inherit",
                                    overflow: "hidden",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                }}
                            >
                                {m.event}
                            </div>
                        </foreignObject>

                        {/* Year label — large, editorial, beside card */}
                        <text
                            x={yearX}
                            y={y + 7}
                            textAnchor={yearAnchor}
                            fontFamily="var(--font-display, Georgia, serif)"
                            fontSize="28"
                            fontWeight="800"
                            letterSpacing="-0.04em"
                            fill={m.accent}
                            opacity="0.85"
                        >
                            {m.year}
                        </text>

                        {/* Spine node dot */}
                        <circle
                            cx={SPINE_X}
                            cy={y}
                            r="8"
                            fill="var(--bg, #fff)"
                            stroke={m.accent}
                            strokeWidth="2"
                        />
                        <circle
                            cx={SPINE_X}
                            cy={y}
                            r="3.5"
                            fill={m.accent}
                        />
                        {/* Outer pulse ring */}
                        <circle
                            cx={SPINE_X}
                            cy={y}
                            r="14"
                            fill="none"
                            stroke={m.accent}
                            strokeWidth="0.8"
                            opacity="0.2"
                        />
                    </g>
                );
            })}

            {/* ── Start cap ── */}
            <circle cx={SPINE_X} cy={20} r="4" fill="#00C9A7" opacity="0.6" />
            <circle cx={SPINE_X} cy={20} r="8" fill="none" stroke="#00C9A7" strokeWidth="0.8" opacity="0.2" />

            {/* ── End cap ── */}
            <circle cx={SPINE_X} cy={TOTAL_H - 40} r="4" fill="#FF6B6B" opacity="0.6" />
            <circle cx={SPINE_X} cy={TOTAL_H - 40} r="8" fill="none" stroke="#FF6B6B" strokeWidth="0.8" opacity="0.2" />
            {/* Arrow tip */}
            <path
                d={`M ${SPINE_X - 6} ${TOTAL_H - 52} L ${SPINE_X} ${TOTAL_H - 38} L ${SPINE_X + 6} ${TOTAL_H - 52}`}
                fill="none"
                stroke="#FF6B6B"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.6"
            />
        </svg>
    );
}

/* ── MOBILE TIMELINE (stacked cards) ── */
function TimelineMobile({ milestones }) {
    return (
        <div className={styles.timelineMobileList}>
            {milestones.map((m, i) => (
                <div key={m.year} className={styles.timelineMobileItem}>
                    {/* Connector line */}
                    {i < milestones.length - 1 && (
                        <div
                            className={styles.timelineMobileConnector}
                            style={{ borderColor: m.accent }}
                        />
                    )}
                    {/* Dot */}
                    <div
                        className={styles.timelineMobileDot}
                        style={{ background: m.accent, boxShadow: `0 0 0 4px ${m.accent}22` }}
                    />
                    <div className={styles.timelineMobileCard}>
                        <div className={styles.timelineMobileTop}>
                            <span
                                className={styles.timelineMobileYear}
                                style={{ color: m.accent }}
                            >
                                {m.year}
                            </span>
                            <span
                                className={styles.timelineMobileChip}
                                style={{
                                    color: m.accent,
                                    background: `${m.accent}18`,
                                    border: `1px solid ${m.accent}40`,
                                }}
                            >
                                {m.label}
                            </span>
                        </div>
                        <p className={styles.timelineMobileEvent}>{m.event}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

/* ══════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════ */
export default function About() {
    const navigate = useNavigate();
    const timelineRef = useRef(null);
    const [timelineAnimate, setTimelineAnimate] = useState(false);

    useEffect(() => {
        const el = timelineRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setTimelineAnimate(true); },
            { threshold: 0.05 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <div className={styles.page}>

            {/* ══════════════════════════════
          HERO — text-forward, no heavy SVGs
      ══════════════════════════════ */}
            <header className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        Building Africa's<br />
                        <em className={styles.heroAccent}>digital backbone.</em>
                    </h1>
                </div>

                {/* Floating stat callout — hidden on mobile via CSS */}
                <div className={styles.heroFloatStat} aria-hidden="true">
                    <span className={styles.heroFloatNum}>15+</span>
                    <span className={styles.heroFloatLabel}>years of craft</span>
                </div>

                {/* Lightweight decorative lines — CSS only, no SVG */}
                <div className={styles.heroLines} aria-hidden="true" />
            </header>


            {/* ══════════════════════════════
          STORY
      ══════════════════════════════ */}
            <section className={styles.story}>
                <div className={styles.storyInner}>
                    <div className={styles.storyLeft}>
                        <p className={styles.sectionLabel}>Our story</p>
                        <h2 className={styles.sectionHeading}>About us</h2>

                        <p>
                            CloudCrave started in 2009 as a two-person web design studio in Lekki, Lagos.
                            Simple work, but built on a deep conviction that technology should create real
                            opportunity — not just for the few, but for everyone willing to build.
                        </p>
                        <p>
                            Over fifteen years, that conviction compounded. We expanded into mobile, cloud,
                            AI, and product development — not chasing trends, but following the real needs
                            of our clients. Today we're a team of 40+ engineers, designers, strategists,
                            and trainers serving clients across Nigeria, Ghana, Kenya, and the UK.
                        </p>
                        <button className={styles.ctaPrimary} onClick={() => navigate("/contact")}>
                            Work with us <FaArrowRight className={styles.arrowIcon} />
                        </button>
                    </div>

                    <div className={styles.storyRight}>
                        <div className={styles.storyStats}>
                            {stats.map(({ value, suffix, label }) => (
                                <div key={label} className={styles.storyStat}>
                                    <svg className={styles.statCorner} width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                                        <path d="M1 17 L1 1 L17 1" stroke="var(--teal)" strokeWidth="1.5" fill="none"
                                            strokeLinecap="round" opacity="0.4" />
                                    </svg>
                                    <span className={styles.storyStatVal}>
                                        <Counter target={value} suffix={suffix} />
                                    </span>
                                    <span className={styles.storyStatLabel}>{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>


            {/* ══════════════════════════════
          VALUES
      ══════════════════════════════ */}
            <section className={styles.values}>
                <div className={styles.valuesInner}>
                    <div className={styles.valuesHeader}>
                        <p className={styles.sectionLabel}>What drives us</p>
                        <h2 className={styles.sectionHeading}>Our values</h2>
                    </div>

                    <div className={styles.valuesGrid}>
                        {values.map((v, i) => {
                            const Icon = ValueIcons[v.slug];
                            return (
                                <div key={v.slug} className={styles.valueCard}
                                    style={{ "--accent": v.accent, animationDelay: `${i * 0.1}s` }}>
                                    <svg className={styles.cardCornerGeo} width="60" height="60" viewBox="0 0 60 60" aria-hidden="true">
                                        <circle cx="55" cy="5" r="30" fill="var(--accent)" opacity="0.06" />
                                        <circle cx="55" cy="5" r="18" fill="none" stroke="var(--accent)" strokeWidth="0.8" opacity="0.2" />
                                    </svg>
                                    <div className={styles.valueIconWrap}>
                                        <Icon color={v.accent} />
                                    </div>
                                    <h3 className={styles.valueTitle} style={{ color: "var(--ink)" }}>{v.title}</h3>
                                    <p className={styles.valueDesc}>{v.desc}</p>
                                    <div className={styles.valueBar} style={{ background: v.accent }} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>


            {/* ══════════════════════════════
          TIMELINE — impressive SVG on desktop,
          clean stacked cards on mobile
      ══════════════════════════════ */}
            <section className={styles.timeline} ref={timelineRef}>
                <div className={styles.timelineHeader}>
                    <p className={styles.sectionLabel}>Our journey</p>
                    <h2 className={styles.sectionHeading}>15 years,<br />one mission.</h2>
                    <p className={styles.timelineSubtitle}>
                        From a two-person studio to Nigeria's leading full-stack tech firm.
                    </p>
                </div>

                {/* Desktop: SVG timeline */}
                <div className={styles.timelineSVGWrap}>
                    <TimelineSVG milestones={milestones} animate={timelineAnimate} />
                </div>

                {/* Mobile: stacked card list */}
                <div className={styles.timelineMobileWrap}>
                    <TimelineMobile milestones={milestones} />
                </div>
            </section>


            {/* ══════════════════════════════
          TEAM
      ══════════════════════════════ */}
            <section className={styles.team}>
                <div className={styles.teamInner}>
                    <div className={styles.teamHeader}>
                        <p className={styles.sectionLabel}>The team</p>
                        <h2 className={styles.sectionHeading}>People behind<br />the work.</h2>
                        <p className={styles.teamDesc}>
                            A multidisciplinary team of builders, thinkers, and doers —
                            united by a belief that technology should create real opportunity.
                        </p>
                    </div>

                    <div className={styles.teamGrid}>
                        {team.map((member, i) => (
                            <div key={member.name} className={styles.memberCard}
                                style={{ "--accent": member.accent, animationDelay: `${i * 0.08}s` }}>
                                <div className={styles.memberAvatarWrap}>
                                    <AvatarArt member={member} size={72} />
                                </div>
                                <h3 className={styles.memberName}>{member.name}</h3>
                                <p className={styles.memberRole}>{member.role}</p>
                                <div className={styles.memberLine} style={{ background: member.accent }} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* ══════════════════════════════
          BOTTOM CTA
      ══════════════════════════════ */}
            <section className={styles.bottomCta}>
                {/* Lightweight particle field — simplified for mobile */}
                <svg className={styles.ctaParticles} viewBox="0 0 1200 400"
                    preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <radialGradient id="ctaGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="var(--teal)" stopOpacity="0.15" />
                            <stop offset="100%" stopColor="var(--teal)" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    <ellipse cx="600" cy="200" rx="400" ry="250" fill="url(#ctaGlow)" />
                    {[
                        [80, 60, 1.5], [300, 40, 2], [560, 80, 1.5],
                        [800, 50, 1.8], [1060, 70, 1.5], [1150, 140, 1],
                        [640, 260, 1.5], [380, 240, 1], [950, 360, 1],
                    ].map(([cx, cy, r], i) => (
                        <circle key={i} cx={cx} cy={cy} r={r} fill="var(--teal)" opacity="0.4" />
                    ))}
                    <ellipse cx="600" cy="200" rx="280" ry="140" fill="none"
                        stroke="var(--teal)" strokeWidth="0.5" strokeDasharray="4 14" opacity="0.12"
                        className={styles.ctaOrbit} />
                </svg>

                <div className={styles.ctaInner}>
                    <p className={styles.sectionLabel} style={{ color: "rgba(255,255,255,0.5)" }}>Let's build</p>
                    <h2 className={styles.ctaHeading}>Ready to build<br />with us?</h2>
                    <p className={styles.ctaDesc}>
                        Tell us what you're working on and we'll figure out how to make it remarkable.
                    </p>
                    <div className={styles.ctaActions}>
                        <button className={styles.ctaBtn} onClick={() => navigate("/contact")}>
                            Get in touch <FaArrowRight />
                        </button>
                        <button className={styles.ctaBtnGhost} onClick={() => navigate("/work")}>
                            See our work
                        </button>
                    </div>
                </div>
            </section>

        </div>
    );
}