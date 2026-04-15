import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FaArrowRight, FaPlay } from "react-icons/fa";
import styles from "./Home.module.css";

const stats = [
    { value: 50, suffix: "+", label: "Projects Delivered" },
    { value: 35, suffix: "+", label: "Happy Clients" },
    { value: 15, suffix: "+", label: "Years Experience" },
    { value: 8, suffix: "", label: "Core Services" },
];

const services = [
    { n: "01", title: "Tech Training", desc: "World-class bootcamps, mentorship & certifications." },
    { n: "02", title: "Cloud Solutions", desc: "Migrate, manage & modernise on next-gen cloud." },
    { n: "03", title: "AI Integration", desc: "NLP, smart systems & self-learning ML pipelines." },
    { n: "04", title: "Digital Marketing", desc: "Data-driven growth that converts and compounds." },
    { n: "05", title: "Custom Software", desc: "Scalable, secure software from concept to deploy." },
];

const projects = [
    {
        id: "estatego", title: "EstateGo", cat: "Property Tech", year: "2021",
        excerpt: "All-in-one estate & property management platform.", span: 2,
    },
    {
        id: "chatbotsutdio", title: "Chatbot Studio", cat: "AI", year: "2021",
        excerpt: "Intuitive platform for creating and managing chatbots.", span: 1,
    },
    {
        id: "educrave", title: "Educrave", cat: "EdTech", year: "2022",
        excerpt: "End-to-end school administration & parent portals.", span: 1,
    },
    {
        id: "cravebiz", title: "Cravebiz", cat: "Marketplace", year: "2022",
        excerpt: "Multi-vendor marketplace for the aviation supply chain.", span: 1,
    },
];

/* ── Animated counter hook ── */
function useCounter(target, duration = 1800) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => {
            if (!e.isIntersecting) return;
            obs.disconnect();
            let start = null;
            const step = (ts) => {
                if (!start) start = ts;
                const p = Math.min((ts - start) / duration, 1);
                setCount(Math.floor(p * target));
                if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        }, { threshold: 0.3 });
        obs.observe(el);
        return () => obs.disconnect();
    }, [target, duration]);
    return [count, ref];
}

function Counter({ value, suffix }) {
    const [count, ref] = useCounter(value);
    return <span ref={ref}>{count}{suffix}</span>;
}


function CloudSceneSVG() {
  return (
    <svg
      width="100%"
      viewBox="0 0 560 580"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
      aria-hidden="true"
    >
      <defs>

        {/* Sky — transparent top, subtle blue at horizon */}
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#06091a00" stopOpacity="0"/>
          <stop offset="55%"  stopColor="#0b174000" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="#0e206000" stopOpacity="0.38"/>
        </linearGradient>

        {/* Cloud fills */}
        <linearGradient id="cldFill4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#1E2B6A"/>
          <stop offset="100%" stopColor="#142058"/>
        </linearGradient>
        <linearGradient id="cldFill3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#1A3580"/>
          <stop offset="100%" stopColor="#102868"/>
        </linearGradient>
        <linearGradient id="cldFill2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#163EA0"/>
          <stop offset="100%" stopColor="#0F2E80"/>
        </linearGradient>
        <linearGradient id="cldFill1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#1850CC"/>
          <stop offset="100%" stopColor="#1040A8"/>
        </linearGradient>
        <linearGradient id="crownFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#4A8FFF"/>
          <stop offset="100%" stopColor="#0057FF"/>
        </linearGradient>

        {/* Beacon gold radial */}
        <radialGradient id="beaconGold" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#FFE066"/>
          <stop offset="60%"  stopColor="#FFB800"/>
          <stop offset="100%" stopColor="#E08000" stopOpacity="0"/>
        </radialGradient>

        {/* City horizon glow */}
        <radialGradient id="cityGlow" cx="50%" cy="0%" r="60%">
          <stop offset="0%"   stopColor="#1A5AFF" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#1A5AFF" stopOpacity="0"/>
        </radialGradient>

        {/* Crown top aura */}
        <radialGradient id="crownAura" cx="50%" cy="60%" r="60%">
          <stop offset="0%"   stopColor="#60A0FF" stopOpacity="0.45"/>
          <stop offset="100%" stopColor="#0057FF" stopOpacity="0"/>
        </radialGradient>

        {/* Beam from Lagos upward */}
        <linearGradient id="beamGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%"   stopColor="#FFB800" stopOpacity="0.55"/>
          <stop offset="40%"  stopColor="#3A7FFF" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="#5090FF" stopOpacity="0"/>
        </linearGradient>

        {/* Cloud top-edge glow strip */}
        <linearGradient id="topEdge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#4A8FFF" stopOpacity="0"/>
          <stop offset="30%"  stopColor="#4A8FFF" stopOpacity="0.5"/>
          <stop offset="70%"  stopColor="#4A8FFF" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="#4A8FFF" stopOpacity="0"/>
        </linearGradient>

        {/* Subtle perspective grid */}
        <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#3060CC" strokeWidth="0.3" opacity="0.08"/>
        </pattern>

        <clipPath id="sceneClip">
          <rect x="0" y="0" width="560" height="580"/>
        </clipPath>

      </defs>

      {/* ── BEAM: Lagos → Crown ── */}
      <polygon
        points="280,490 258,52 302,52"
        fill="url(#beamGrad)"
        opacity="0.22"
        clipPath="url(#sceneClip)"
      />



      {/* ── VERTICAL SPINE ── */}
      <line x1="280" y1="100" x2="280" y2="488"
        stroke="#4A8FFF" strokeWidth="1" opacity="0.15" strokeDasharray="4 8"/>

      {/* ════════════════════════════════════
          CLOUD 4 — INFRASTRUCTURE (bottom)
      ════════════════════════════════════ */}
      <g className={styles.cloud4}>
        <rect x="112" y="408" width="336" height="68" rx="22" fill="url(#cldFill4)" opacity="0.97"/>
        <rect x="112" y="408" width="336" height="5"  rx="22" fill="url(#topEdge)" opacity="0.6"/>
        <rect x="136" y="394" width="80"  height="34" rx="18" fill="url(#cldFill4)"/>
        <rect x="230" y="385" width="100" height="43" rx="20" fill="url(#cldFill4)"/>
        <rect x="344" y="392" width="76"  height="36" rx="18" fill="url(#cldFill4)"/>
        <path d="M148,394 Q175,386 230,385 Q280,380 330,385 Q360,388 370,392"
          stroke="#4A8FFF" strokeWidth="0.8" fill="none" opacity="0.28"/>
        <rect x="112" y="408" width="336" height="68" rx="22" fill="none"
          stroke="#2E5ADF" strokeWidth="0.8" opacity="0.55"/>
        {/* Server rack details */}
        {[176, 236, 296].map((x, i) => (
          <g key={i}>
            <rect x={x}    y="426" width="48" height="8" rx="2" fill="#2244CC"/>
            <rect x={x+2}  y="428" width="6"  height="4" rx="1" fill="#4A8FFF" opacity="0.6"/>
            <rect x={x+10} y="429" width="2"  height="2" rx="0.5" fill="#FFB800" opacity="0.8"/>
          </g>
        ))}
        <text x="280" y="449" textAnchor="middle"
          fontFamily="'SF Mono','Fira Mono','Courier New',monospace"
          fontSize="8.5" fontWeight="700" fill="#7AAAFF" letterSpacing="0.22em" opacity="0.85">
          INFRASTRUCTURE
        </text>
      </g>

      {/* ════════════════════════════════════
          CLOUD 3 — NETWORK (mid-low)
      ════════════════════════════════════ */}
      <g className={styles.cloud3}>
        <rect x="118" y="308" width="320" height="62" rx="20" fill="url(#cldFill3)" opacity="0.97"/>
        <rect x="118" y="308" width="320" height="4"  rx="20" fill="url(#topEdge)" opacity="0.55"/>
        <rect x="140" y="295" width="72"  height="32" rx="16" fill="url(#cldFill3)"/>
        <rect x="228" y="288" width="88"  height="38" rx="18" fill="url(#cldFill3)"/>
        <rect x="340" y="293" width="70"  height="34" rx="16" fill="url(#cldFill3)"/>
        <path d="M152,295 Q180,287 228,288 Q274,283 316,288 Q330,291 350,293"
          stroke="#5A8AFF" strokeWidth="0.8" fill="none" opacity="0.25"/>
        <rect x="118" y="308" width="320" height="62" rx="20" fill="none"
          stroke="#2858D8" strokeWidth="0.8" opacity="0.5"/>
        {/* Mesh nodes */}
        {[[198,336],[258,332],[322,334]].map(([cx,cy],i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="3.5" fill="#2858D8"/>
            <circle cx={cx} cy={cy} r="1.8" fill="#6AAAFF" opacity="0.8"/>
          </g>
        ))}
        <line x1="201.5" y1="336" x2="254.5" y2="332" stroke="#4A8FFF" strokeWidth="0.7" opacity="0.32" strokeDasharray="2 3"/>
        <line x1="261.5" y1="332" x2="318.5" y2="334" stroke="#4A8FFF" strokeWidth="0.7" opacity="0.32" strokeDasharray="2 3"/>
        <line x1="201.5" y1="336" x2="318.5" y2="334" stroke="#4A8FFF" strokeWidth="0.4" opacity="0.16" strokeDasharray="1 4"/>
        <text x="258" y="346" textAnchor="middle"
          fontFamily="'SF Mono','Fira Mono','Courier New',monospace"
          fontSize="8.5" fontWeight="700" fill="#6AAAFF" letterSpacing="0.22em" opacity="0.8">
          NETWORK
        </text>
      </g>

      {/* ════════════════════════════════════
          CLOUD 2 — CLOUD SOLUTIONS (mid)
      ════════════════════════════════════ */}
      <g className={styles.cloud2}>
        <rect x="124" y="208" width="308" height="64" rx="20" fill="url(#cldFill2)" opacity="0.97"/>
        <rect x="124" y="208" width="308" height="4"  rx="20" fill="url(#topEdge)" opacity="0.6"/>
        <rect x="146" y="194" width="68"  height="34" rx="16" fill="url(#cldFill2)"/>
        <rect x="228" y="186" width="92"  height="42" rx="20" fill="url(#cldFill2)"/>
        <rect x="344" y="192" width="66"  height="36" rx="16" fill="url(#cldFill2)"/>
        <path d="M158,194 Q182,185 228,186 Q274,180 320,186 Q334,190 354,192"
          stroke="#6AAAFF" strokeWidth="0.8" fill="none" opacity="0.28"/>
        <rect x="124" y="208" width="308" height="64" rx="20" fill="none"
          stroke="#2A58E8" strokeWidth="0.8" opacity="0.55"/>
        {/* Mini cloud icons */}
        <ellipse cx="230" cy="242" rx="14" ry="8" fill="#1A44B0" opacity="0.5"/>
        <ellipse cx="248" cy="238" rx="11" ry="7" fill="#1A44B0" opacity="0.5"/>
        <ellipse cx="222" cy="244" rx="9"  ry="6" fill="#1A44B0" opacity="0.4"/>
        <ellipse cx="320" cy="242" rx="14" ry="8" fill="#1A44B0" opacity="0.5"/>
        <ellipse cx="336" cy="238" rx="11" ry="7" fill="#1A44B0" opacity="0.5"/>
        <text x="278" y="246" textAnchor="middle"
          fontFamily="'SF Mono','Fira Mono','Courier New',monospace"
          fontSize="8.5" fontWeight="700" fill="#80BAFF" letterSpacing="0.18em" opacity="0.85">
          CLOUD SOLUTIONS
        </text>
      </g>

      {/* ════════════════════════════════════
          CLOUD 1 — AI & INTELLIGENCE (top)
      ════════════════════════════════════ */}
      <g className={styles.cloud1}>
        <rect x="130" y="108" width="296" height="68" rx="22" fill="url(#cldFill1)" opacity="0.97"/>
        <rect x="130" y="108" width="296" height="5"  rx="22" fill="url(#topEdge)" opacity="0.7"/>
        <rect x="154" y="92"  width="70"  height="38" rx="18" fill="url(#cldFill1)"/>
        <rect x="236" y="82"  width="96"  height="48" rx="22" fill="url(#cldFill1)"/>
        <rect x="352" y="88"  width="68"  height="42" rx="18" fill="url(#cldFill1)"/>
        <path d="M168,92 Q194,82 236,82 Q284,75 332,82 Q344,87 366,88"
          stroke="#80BAFF" strokeWidth="1" fill="none" opacity="0.32"/>
        <rect x="130" y="108" width="296" height="68" rx="22" fill="none"
          stroke="#3060F0" strokeWidth="0.9" opacity="0.65"/>
        {/* Neural nodes */}
        {[[196,152],[244,148],[284,150],[324,148],[368,152]].map(([cx,cy],i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="3"   fill="#3060F0"/>
            <circle cx={cx} cy={cy} r="1.5" fill="#90C0FF" opacity="0.9"/>
          </g>
        ))}
        <line x1="199" y1="152" x2="241" y2="148" stroke="#5090FF" strokeWidth="0.6" opacity="0.38"/>
        <line x1="247" y1="148" x2="281" y2="150" stroke="#5090FF" strokeWidth="0.6" opacity="0.38"/>
        <line x1="287" y1="150" x2="321" y2="148" stroke="#5090FF" strokeWidth="0.6" opacity="0.38"/>
        <line x1="327" y1="148" x2="365" y2="152" stroke="#5090FF" strokeWidth="0.6" opacity="0.38"/>
        <line x1="199" y1="152" x2="281" y2="150" stroke="#5090FF" strokeWidth="0.3" opacity="0.16"/>
        <line x1="247" y1="148" x2="365" y2="152" stroke="#5090FF" strokeWidth="0.3" opacity="0.12"/>
        <text x="280" y="136" textAnchor="middle"
          fontFamily="'SF Mono','Fira Mono','Courier New',monospace"
          fontSize="8.5" fontWeight="700" fill="#A0CCFF" letterSpacing="0.18em" opacity="0.9">
          AI &amp; INTELLIGENCE
        </text>
      </g>

      {/* ════════════════════════════════════
          APEX — CLOUDCRAVE CROWN
      ════════════════════════════════════ */}
      <g className={styles.crownCloud}>
        {/* Outer aura */}
        <ellipse cx="282" cy="52" rx="96" ry="42" fill="url(#crownAura)" opacity="0.4"/>
        <ellipse cx="282" cy="52" rx="80" ry="36" stroke="#4A8FFF" strokeWidth="0.8" fill="none" opacity="0.18"/>
        {/* Cloud body */}
        <rect x="200" y="28"  width="164" height="50" rx="22" fill="url(#crownFill)"/>
        <rect x="218" y="16"  width="62"  height="36" rx="18" fill="url(#crownFill)"/>
        <rect x="290" y="12"  width="58"  height="38" rx="18" fill="url(#crownFill)"/>
        <rect x="244" y="8"   width="80"  height="34" rx="16" fill="#3A78FF"/>
        <path d="M220,28 Q248,20 280,16 Q316,14 348,28"
          stroke="#80C0FF" strokeWidth="1.2" fill="none" opacity="0.42"/>
        <rect x="200" y="28" width="164" height="50" rx="22" fill="none"
          stroke="#6AAAFF" strokeWidth="1" opacity="0.65"/>
        {/* Crown sparkle dots */}
        <circle cx="258" cy="12" r="2"   fill="#80C0FF" opacity="0.7"/>
        <circle cx="282" cy="7"  r="2.5" fill="#A0D0FF" opacity="0.8"/>
        <circle cx="306" cy="11" r="2"   fill="#80C0FF" opacity="0.7"/>
        {/* Brand name */}
        <text x="282" y="57" textAnchor="middle"
          fontFamily="'SF Mono','Fira Mono','Courier New',monospace"
          fontSize="9" fontWeight="800" fill="white" letterSpacing="0.14em" opacity="0.95">
          CLOUDCRAVE
        </text>
      </g>

      {/* ── INTER-CLOUD THREADS ── */}
      <line x1="280" y1="390" x2="280" y2="370" stroke="#4A8FFF" strokeWidth="1.2" opacity="0.18" strokeDasharray="2 5"/>
      <line x1="280" y1="290" x2="280" y2="272" stroke="#4A8FFF" strokeWidth="1.2" opacity="0.16" strokeDasharray="2 5"/>
      <line x1="280" y1="190" x2="280" y2="176" stroke="#4A8FFF" strokeWidth="1.2" opacity="0.16" strokeDasharray="2 5"/>
      <line x1="280" y1="90"  x2="280" y2="78"  stroke="#4A8FFF" strokeWidth="1.5" opacity="0.22" strokeDasharray="2 4"/>

      {/* ── TRAVELLING DATA PACKETS ── */}
      <g clipPath="url(#sceneClip)">
        {/* Gold packet */}
        <circle r="4" fill="#FFB800" opacity="0.95">
          <animateMotion dur="4.2s" repeatCount="indefinite"
            path="M280,490 C278,420 282,350 280,52"/>
          <animate attributeName="opacity" values="0;1;1;0" dur="4.2s" repeatCount="indefinite"/>
          <animate attributeName="r" values="3;5;3" dur="4.2s" repeatCount="indefinite"/>
        </circle>
        {/* Blue packet */}
        <circle r="3.5" fill="#5090FF" opacity="0.9">
          <animateMotion dur="5.2s" repeatCount="indefinite" begin="1.4s"
            path="M280,490 C275,400 278,300 282,52"/>
          <animate attributeName="opacity" values="0;0.9;0.9;0" dur="5.2s" repeatCount="indefinite" begin="1.4s"/>
        </circle>
        {/* White packet */}
        <circle r="2.5" fill="white" opacity="0.85">
          <animateMotion dur="3.6s" repeatCount="indefinite" begin="2.9s"
            path="M280,490 C283,415 278,315 280,52"/>
          <animate attributeName="opacity" values="0;0.75;0.75;0" dur="3.6s" repeatCount="indefinite" begin="2.9s"/>
        </circle>
      </g>

      {/* Software Development — left of Cloud Solutions */}
      <g className={styles.floatChip1}>
        <rect x="18" y="210" width="98" height="30" rx="15"
          fill="#0F1A55" stroke="#3060C0" strokeWidth="0.8" opacity="0.95"/>
        <rect x="20" y="210" width="94" height="7" rx="12" fill="#4A8FFF" opacity="0.08"/>
        <circle cx="38" cy="225" r="9" fill="#1A2A6A"/>
        <circle cx="38" cy="225" r="6" fill="#1840AA" stroke="#4A8FFF" strokeWidth="0.6"/>
        {/* Code bracket icon */}
        <text x="38" y="229" textAnchor="middle"
          fontFamily="'SF Mono','Fira Mono',monospace" fontSize="6.5" fontWeight="700" fill="#80AAFF">&lt;/&gt;</text>
        <text x="82" y="229" textAnchor="middle"
          fontFamily="'SF Mono','Fira Mono',monospace" fontSize="7.5" fontWeight="600" fill="#8AB0FF">
          Software Dev
        </text>
        <line x1="116" y1="225" x2="126" y2="232" stroke="#2E50B0" strokeWidth="0.7" strokeDasharray="2 3" opacity="0.55"/>
      </g>

      {/* SMM / Social Media Marketing — right of Network */}
      <g className={styles.floatChip2}>
        <rect x="444" y="310" width="96" height="30" rx="15"
          fill="#0F1A55" stroke="#3060C0" strokeWidth="0.8" opacity="0.95"/>
        <rect x="446" y="310" width="92" height="7" rx="12" fill="#4A8FFF" opacity="0.08"/>
        <circle cx="464" cy="325" r="9" fill="#1A2A6A"/>
        <circle cx="464" cy="325" r="6" fill="#1840AA" stroke="#4A8FFF" strokeWidth="0.6"/>
        {/* Share / signal icon */}
        <circle cx="461" cy="323" r="1.5" fill="#80AAFF"/>
        <circle cx="467" cy="320" r="1.5" fill="#80AAFF"/>
        <circle cx="467" cy="327" r="1.5" fill="#80AAFF"/>
        <line x1="462.5" y1="322" x2="465.5" y2="320.5" stroke="#80AAFF" strokeWidth="0.8"/>
        <line x1="462.5" y1="324" x2="465.5" y2="326.5" stroke="#80AAFF" strokeWidth="0.8"/>
        <text x="505" y="329" textAnchor="middle"
          fontFamily="'SF Mono','Fira Mono',monospace" fontSize="7.5" fontWeight="600" fill="#8AB0FF">
          Social Media
        </text>
        <line x1="444" y1="325" x2="440" y2="330" stroke="#2E50B0" strokeWidth="0.7" strokeDasharray="2 3" opacity="0.55"/>
      </g>

      {/* Tech Training — left of Infrastructure */}
      <g className={styles.floatChip3}>
        <rect x="20" y="416" width="86" height="30" rx="15"
          fill="#0F1A55" stroke="#3060C0" strokeWidth="0.8" opacity="0.95"/>
        <rect x="22" y="416" width="82" height="7" rx="12" fill="#4A8FFF" opacity="0.08"/>
        <circle cx="40" cy="431" r="9" fill="#1A2A6A"/>
        <circle cx="40" cy="431" r="6" fill="#1840AA" stroke="#4A8FFF" strokeWidth="0.6"/>
        {/* Graduation cap icon */}
        <rect x="36" y="428" width="8" height="5" rx="1" fill="#80AAFF" opacity="0.7"/>
        <polygon points="40,426 34,429 46,429" fill="#80AAFF" opacity="0.9"/>
        <text x="76" y="435" textAnchor="middle"
          fontFamily="'SF Mono','Fira Mono',monospace" fontSize="7.5" fontWeight="600" fill="#8AB0FF">
          Training
        </text>
        <line x1="106" y1="431" x2="114" y2="434" stroke="#2e51b000" strokeWidth="0.7" strokeDasharray="2 3" opacity="0.55"/>
      </g>

      {/* ── STAR FIELD ── */}
      <g opacity="0.55">
        {[
          [42,35,1,0.5],[88,70,0.8,0.4],[130,20,1.2,0.6],[168,55,0.7,0.4],
          [200,30,1,0.5],[460,40,1.2,0.6],[500,68,0.8,0.4],[522,22,1,0.5],
          [536,90,0.7,0.35],[50,115,0.8,0.3],[510,130,0.9,0.35],
          [38,200,0.7,0.25],[524,195,0.8,0.3],[44,280,0.7,0.2],[518,260,0.8,0.25],
        ].map(([cx,cy,r,op],i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill="white" opacity={op}/>
        ))}
      </g>

    </svg>
  );
}


export default function Home() {
    const navigate = useNavigate();

    return (
        <>
            {/* ═══════════════════════════════════════════════════
          HERO  — white / light mode
      ═══════════════════════════════════════════════════ */}
            <section className={styles.hero}>

                {/* Subtle dot grid texture */}
                <div className={styles.heroDotGrid} aria-hidden="true" />

                {/* Blue blob glow behind SVG */}
                <div className={styles.bgGlow} aria-hidden="true" />

                {/* Floating accent rings */}
                <div className={styles.heroAccents} aria-hidden="true">
                    <div className={styles.accentRing1} />
                    <div className={styles.accentRing2} />
                    <div className={styles.accentDot1} />
                    <div className={styles.accentDot2} />
                    <div className={styles.accentLine} />
                </div>

                {/* ── COPY (left) ── */}
                <div className={styles.heroContent}>
                    <div className={`${styles.eyebrow} label`}>
                        Lagos · Nigeria — Building for the World
                    </div>

                    <h1 className={styles.heroHeading}>
                        <span className={styles.hWord} style={{ "--d": "0.0s" }}>Build</span>
                        <span className={styles.hAccent} style={{ "--d": "0.15s" }}>Smarter.</span>
                        <span className={styles.hWord} style={{ "--d": "0.3s" }}>Grow</span>
                        <span className={styles.hAccentGold} style={{ "--d": "0.45s" }}>Faster.</span>
                    </h1>

                    <p className={styles.heroClaim} style={{ "--d": "0.6s" }}>
                        We turn bold ideas into powerful digital products —
                        cloud infrastructure, AI systems, and custom software
                        engineered for Africa and beyond.
                    </p>

                    <div className={styles.heroActions} style={{ "--d": "0.75s" }}>
                        <button className={styles.btnBlue} onClick={() => navigate("/portfolio")}>
                            See Our Work
                            <span className={styles.btnArrow}><FaArrowRight /></span>
                        </button>
                        <button className={styles.btnGhost} onClick={() => navigate("/contact")}>
                            Start a Project
                        </button>
                    </div>

                </div>

                {/* ── CLOUD SCENE SVG (right) ── */}
                <div className={styles.stackWrap} aria-label="CloudCrave cloud infrastructure stack">
                    <CloudSceneSVG />
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════
          STATS BAND
      ═══════════════════════════════════════════════════ */}
            <section className={styles.statsBand}>
                <div className={styles.statsDiag} aria-hidden="true" />
                <svg className={styles.statsBandSvg} viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M0 60 H200 V20 H400 V80 H600 V40 H800 V70 H1000 V30 H1200"
                        stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" strokeDasharray="5 10" />
                    {[200, 400, 600, 800, 1000].map(x => (
                        <circle key={x} cx={x} cy={x === 200 ? 20 : x === 400 ? 80 : x === 600 ? 40 : x === 800 ? 70 : 30} r="3" fill="white" opacity="0.15" />
                    ))}
                </svg>
                <div className={styles.statsGrid}>
                    {stats.map((s, i) => (
                        <div key={i} className={styles.statItem}>
                            <div className={styles.statNum}><Counter value={s.value} suffix={s.suffix} /></div>
                            <div className={styles.statLabel}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════
          SERVICES
      ═══════════════════════════════════════════════════ */}
            <section className={styles.servicesSection}>
                <div className={styles.servicesMasthead}>
                    <div>
                        <p className="label">What we do</p>
                        <h2 className={styles.sectionHeading}>
                            Capabilities<br />
                            <span className={styles.headingBlue}>at every layer.</span>
                        </h2>
                    </div>
                    <button className={styles.btnOutline} onClick={() => navigate("/services")}>
                        All Services <FaArrowRight />
                    </button>
                </div>

                <div className={styles.servicesTrack}>
                    {services.map((s, i) => (
                        <article key={s.n} className={styles.serviceCard} style={{ "--i": i }}>
                            <span className={styles.serviceCardNum}>{s.n}</span>
                            <div className={styles.serviceCardBody}>
                                <h3 className={styles.serviceCardTitle}>{s.title}</h3>
                                <p className={styles.serviceCardDesc}>{s.desc}</p>
                            </div>
                            <div className={styles.serviceCardFoot}>
                                <button className={styles.serviceCardBtn} onClick={() => navigate("/services")}>
                                    <FaArrowRight />
                                </button>
                            </div>
                            <div className={styles.serviceCardAccent} />
                        </article>
                    ))}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════
          FEATURED WORK — bento grid
      ═══════════════════════════════════════════════════ */}
            <section className={styles.workSection}>
                <div className={styles.workHeader}>
                    <div>
                        <p className="label" style={{ color: "rgba(255,255,255,0.5)" }}>What we've built</p>
                        <h2 className={`${styles.sectionHeading} ${styles.sectionHeadingLight}`}>
                            Products &amp;<br />
                            <span className={styles.headingBlue}>Case Studies</span>
                        </h2>
                    </div>
                    <button className={styles.btnOutlineLight} onClick={() => navigate("/portfolio")}>
                        Full Portfolio <FaArrowRight />
                    </button>
                </div>

                <div className={styles.bentoGrid}>
                    {projects.map((p, i) => (
                        <article
                            key={p.id}
                            className={`${styles.bentoCard} ${i === 0 ? styles.bentoBig : styles.bentoSmall}`}
                            style={{ "--hue": `${200 + i * 22}` }}
                            onClick={() => navigate(`/portfolio/${p.id}`)}
                            tabIndex={0}
                            role="button"
                            onKeyDown={e => e.key === "Enter" && navigate(`/portfolio/${p.id}`)}
                        >
                            <div className={styles.bentoVisual}>
                                <svg viewBox="0 0 400 240" className={styles.bentoSvg} aria-hidden="true">
                                    <rect x="30" y="30" width="340" height="200" rx="12" fill="white" opacity="0.05" />
                                    <rect x="30" y="30" width="340" height="36" rx="12" fill="white" opacity="0.08" />
                                    <circle cx="54" cy="48" r="5" fill="white" opacity="0.28" />
                                    <circle cx="72" cy="48" r="5" fill="white" opacity="0.18" />
                                    <circle cx="90" cy="48" r="5" fill="white" opacity="0.13" />
                                    <rect x="50" y="90" width="180" height="10" rx="5" fill="white" opacity="0.2" />
                                    <rect x="50" y="110" width="280" height="8" rx="4" fill="white" opacity="0.11" />
                                    <rect x="50" y="128" width="220" height="8" rx="4" fill="white" opacity="0.09" />
                                    {[40, 70, 55, 85, 65, 45, 75].map((h, j) => (
                                        <rect key={j} x={50 + j * 40} y={220 - h} width="28" height={h}
                                            rx="4" fill="white" opacity={j === 3 ? 0.45 : 0.14} />
                                    ))}
                                </svg>
                                <div className={styles.bentoOverlay} />
                                <span className={styles.bentoCat}>{p.cat}</span>
                                <span className={styles.bentoYear}>{p.year}</span>
                            </div>
                            <div className={styles.bentoInfo}>
                                <h3 className={styles.bentoTitle}>{p.title}</h3>
                                <p className={styles.bentoExcerpt}>{p.excerpt}</p>
                                <span className={styles.bentoLink}>
                                    View Case Study <FaArrowRight />
                                </span>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════
          CTA BAND — light mode, editorial
      ═══════════════════════════════════════════════════ */}
            <section className={styles.ctaBand}>

                {/* Textured grid overlay */}
                <div className={styles.ctaGrid} aria-hidden="true" />

                {/* Decorative ruled lines */}
                <div className={styles.ctaRuledLines} aria-hidden="true">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className={styles.ctaRuledLine} style={{ "--li": i }} />
                    ))}
                </div>

                {/* Off-center circle accent */}
                <div className={styles.ctaCircleAccent} aria-hidden="true" />

                {/* Blue ink blob */}
                <div className={styles.ctaInkBlob} aria-hidden="true" />

                <div className={styles.ctaInner}>
                    {/* Left: editorial heading block */}
                    <div className={styles.ctaLeft}>
                        <p className={styles.ctaEyebrow}>
                            <span className={styles.ctaEyebrowDash} />
                            Ready when you are
                        </p>

                        <h2 className={styles.ctaHeading}>
                            <span className={styles.ctaHeadLine1}>Let's build</span>
                            <span className={styles.ctaHeadLine2}>something</span>
                            <span className={styles.ctaHeadLine3}>
                                <span className={styles.ctaUnderline}>remarkable.</span>
                            </span>
                        </h2>

                        {/* Decorative tag row */}
                        <div className={styles.ctaTags}>
                            {["Cloud", "AI", "Software", "Africa"].map(t => (
                                <span key={t} className={styles.ctaTag}>{t}</span>
                            ))}
                        </div>
                    </div>

                    {/* Right: body + CTA buttons */}
                    <div className={styles.ctaRight}>
                        {/* Pull quote accent */}
                        <div className={styles.ctaQuoteAccent}>"</div>

                        <p className={styles.ctaSub}>
                            Whether you're scaling infrastructure, launching a product, or
                            upskilling your team — we're the partner you've been looking for.
                            Built in Lagos. Trusted worldwide.
                        </p>

                        {/* Stat strip */}
                        <div className={styles.ctaStatRow}>
                            {[
                                { n: "50+", l: "Projects" },
                                { n: "35+", l: "Clients" },
                                { n: "15+", l: "Yrs exp." },
                            ].map(s => (
                                <div key={s.l} className={styles.ctaStat}>
                                    <span className={styles.ctaStatNum}>{s.n}</span>
                                    <span className={styles.ctaStatLabel}>{s.l}</span>
                                </div>
                            ))}
                        </div>

                        <div className={styles.ctaActions}>
                            <button className={styles.ctaBtnPrimary} onClick={() => navigate("/contact")}>
                                Start a Conversation
                                <span className={styles.ctaBtnArrow}><FaArrowRight /></span>
                            </button>
                            <button className={styles.ctaBtnSecondary} onClick={() => navigate("/services")}>
                                Explore Services
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom rule */}
                <div className={styles.ctaBottomRule} aria-hidden="true">
                    <span className={styles.ctaRuleDot} />
                    <span className={styles.ctaRuleLine} />
                    <span className={styles.ctaRuleLabel}>cloudcrave.solutions</span>
                    <span className={styles.ctaRuleLine} />
                    <span className={styles.ctaRuleDot} />
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════
          NEWSLETTER
      ═══════════════════════════════════════════════════ */}
            <section className={styles.newsletter}>
                <div className={styles.newsletterInner}>
                    <div className={styles.newsletterText}>
                        <span className={styles.newsletterDot} />
                        <div>
                            <h3>Stay in the loop</h3>
                            <p>Monthly insights, launches &amp; ideas.</p>
                        </div>
                    </div>
                    <form
                        className={styles.newsletterForm}
                        onSubmit={e => { e.preventDefault(); }}
                    >
                        <input
                            type="email"
                            placeholder="your@email.com"
                            required
                            aria-label="Email address"
                        />
                        <button type="submit">Subscribe →</button>
                    </form>
                </div>
            </section>
        </>
    );
}