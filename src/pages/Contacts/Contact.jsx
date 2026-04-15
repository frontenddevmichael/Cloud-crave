import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin,
    FaTwitter, FaInstagram, FaArrowRight, FaCheck, FaExclamationTriangle,
} from "react-icons/fa";
import styles from "./Contact.module.css";

/* ══════════════════════════════════════════════════════════
   CONSTANTS
══════════════════════════════════════════════════════════ */
const SERVICES = [
    { value: "", label: "Select a service…" },
    { value: "tech-training", label: "Tech Training" },
    { value: "cloud-solutions", label: "Cloud Solutions" },
    { value: "ai-integration", label: "AI Integration" },
    { value: "digital-marketing", label: "Digital Marketing" },
    { value: "software-development", label: "Software Development" },
    { value: "product-development", label: "Product Development" },
    { value: "it-consulting", label: "IT Consulting" },
    { value: "branding-design", label: "Branding & Design" },
];

const BUDGETS = [
    { value: "", label: "Select a budget range…" },
    { value: "under-500k", label: "Under ₦500,000" },
    { value: "500k-2m", label: "₦500,000 – ₦2,000,000" },
    { value: "2m-10m", label: "₦2,000,000 – ₦10,000,000" },
    { value: "above-10m", label: "Above ₦10,000,000" },
    { value: "not-sure", label: "Not sure yet" },
];

const STEPS = [
    { id: 1, label: "About you" },
    { id: 2, label: "Your project" },
    { id: 3, label: "Send it" },
];

/* ══════════════════════════════════════════════════════════
   LIVE LAGOS CLOCK
══════════════════════════════════════════════════════════ */
function LagosClock() {
    const [time, setTime] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const tick = () => {
            const now = new Date().toLocaleTimeString("en-NG", {
                timeZone: "Africa/Lagos",
                hour: "2-digit", minute: "2-digit", second: "2-digit",
                hour12: true,
            });
            setTime(now);
            const h = new Date().toLocaleTimeString("en-NG", {
                timeZone: "Africa/Lagos", hour: "numeric", hour12: false,
            });
            const hour = parseInt(h);
            setOpen(hour >= 8 && hour < 18);
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className={styles.clockRow}>
            <span className={`${styles.statusDot} ${open ? styles.statusOpen : styles.statusClosed}`} />
            <span className={styles.clockText}>
                Lagos — <strong>{time}</strong>
            </span>
            <span className={`${styles.statusLabel} ${open ? styles.open : styles.closed}`}>
                {open ? "We're open" : "After hours"}
            </span>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════
   SUCCESS ANIMATION
══════════════════════════════════════════════════════════ */
function SuccessAnim({ onReset }) {
    return (
        <div className={styles.successState}>
            {/* Animated SVG signal received */}
            <div className={styles.successSvgWrap}>
                <svg width="120" height="120" viewBox="0 0 120 120" aria-hidden="true">
                    {/* Ripple rings */}
                    <circle cx="60" cy="60" r="40" fill="none" stroke="var(--teal)" strokeWidth="1" opacity="0.2"
                        className={styles.successRing1} />
                    <circle cx="60" cy="60" r="52" fill="none" stroke="var(--teal)" strokeWidth="0.7" opacity="0.12"
                        className={styles.successRing2} />
                    {/* Background disc */}
                    <circle cx="60" cy="60" r="32" fill="var(--teal)" opacity="0.12" />
                    <circle cx="60" cy="60" r="24" fill="var(--teal)" opacity="0.2" />
                    {/* Check */}
                    <path d="M44 60 L54 70 L76 48"
                        stroke="var(--teal)" strokeWidth="3" fill="none"
                        strokeLinecap="round" strokeLinejoin="round"
                        className={styles.successCheck} />
                </svg>
            </div>
            <h3 className={styles.successHeading}>Signal received!</h3>
            <p className={styles.successDesc}>
                Your message is on its way to our team in Lagos. We typically respond
                within one business day — often sooner.
            </p>
            <div className={styles.successMeta}>
                <span className={styles.statusDot} style={{ background: "var(--teal)" }} />
                <span style={{ fontSize: "var(--fs-sm)", color: "var(--ink-3)" }}>
                    Message delivered to CloudCrave HQ
                </span>
            </div>
            <button className={styles.resetBtn} onClick={onReset}>
                Send another message
            </button>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════
   STEP INDICATOR
══════════════════════════════════════════════════════════ */
function StepIndicator({ current }) {
    return (
        <div className={styles.stepIndicator} role="list" aria-label="Form progress">
            {STEPS.map((s, i) => (
                <div key={s.id} role="listitem" className={`${styles.step} ${current === s.id ? styles.stepActive : ""} ${current > s.id ? styles.stepDone : ""}`}>
                    <div className={styles.stepDot}>
                        {current > s.id
                            ? <FaCheck style={{ fontSize: "0.55rem" }} />
                            : <span>{s.id}</span>}
                    </div>
                    <span className={styles.stepLabel}>{s.label}</span>
                    {i < STEPS.length - 1 && (
                        <div className={styles.stepLine}>
                            <div className={styles.stepLineFill} style={{ width: current > s.id ? "100%" : "0%" }} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

/* ══════════════════════════════════════════════════════════
   NIGERIA MAP SVG (info card)
══════════════════════════════════════════════════════════ */
function NigeriaMapCard() {
    return (
        <div className={styles.mapCard}>
            <svg viewBox="0 0 220 160" className={styles.nigeriaMap} aria-label="Nigeria map with Lagos marked">
                <defs>
                    <radialGradient id="lagosBurst" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="var(--teal)" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="var(--teal)" stopOpacity="0" />
                    </radialGradient>
                </defs>
                {/* Nigeria simplified outline */}
                <path
                    d="M60 18 Q80 12 100 16 Q122 10 140 20 Q160 16 172 30
             Q185 38 188 55 Q194 70 190 85 Q196 100 188 115
             Q180 130 168 140 Q152 152 132 155 Q110 160 90 152
             Q70 144 58 132 Q44 118 40 102 Q32 88 35 72
             Q32 56 40 42 Q48 26 60 18Z"
                    fill="var(--teal)" opacity="0.08"
                    stroke="var(--teal)" strokeWidth="1" strokeOpacity="0.25"
                />
                {/* Lagos location */}
                <circle cx="75" cy="118" r="24" fill="url(#lagosBurst)" />
                <circle cx="75" cy="118" r="5" fill="var(--teal)" opacity="0.95" />
                <circle cx="75" cy="118" r="9" fill="none" stroke="var(--teal)" strokeWidth="1" opacity="0.5"
                    className={styles.lagosPulse} />
                <circle cx="75" cy="118" r="16" fill="none" stroke="var(--teal)" strokeWidth="0.6" opacity="0.25"
                    className={styles.lagosPulse2} />
                {/* Other cities */}
                <circle cx="115" cy="65" r="3" fill="var(--amber)" opacity="0.55" />
                <circle cx="148" cy="82" r="2.5" fill="var(--amber)" opacity="0.45" />
                <circle cx="88" cy="45" r="2.5" fill="var(--amber)" opacity="0.4" />
                <circle cx="158" cy="112" r="2.5" fill="var(--amber)" opacity="0.4" />
                {/* Connect lines */}
                <line x1="75" y1="118" x2="115" y2="65" stroke="var(--teal)" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.3" />
                <line x1="75" y1="118" x2="148" y2="82" stroke="var(--teal)" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.25" />
                <line x1="75" y1="118" x2="88" y2="45" stroke="var(--teal)" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.2" />
                {/* Labels */}
                <text x="75" y="138" textAnchor="middle"
                    fontFamily="'SF Mono',monospace" fontSize="7.5" fontWeight="700"
                    fill="var(--teal)" opacity="0.8">Lagos</text>
                <text x="115" y="58" textAnchor="middle"
                    fontFamily="'SF Mono',monospace" fontSize="6" fill="var(--ink-3)" opacity="0.6">Abuja</text>
                <text x="150" y="76" textAnchor="middle"
                    fontFamily="'SF Mono',monospace" fontSize="6" fill="var(--ink-3)" opacity="0.6">Kano</text>
            </svg>
            <div className={styles.mapCardLabel}>
                <strong>CloudCrave HQ</strong>
                <span>Lekki, Lagos Island, Nigeria</span>
            </div>
        </div>
    );
}
/* ══════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════ */
export default function Contact() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    /* Form state */
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [submitErr, setSubmitErr] = useState("");
    const [charCount, setCharCount] = useState(0);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: searchParams.get("service") || "",
        budget: "",
        timeline: "",
        message: "",
    });

    const formRef = useRef(null);

    const set = (field) => (e) => {
        setForm(f => ({ ...f, [field]: e.target.value }));
        if (errors[field]) setErrors(er => ({ ...er, [field]: "" }));
        if (field === "message") setCharCount(e.target.value.length);
    };

    /* Validation per step */
    const validate = (s) => {
        const e = {};
        if (s === 1) {
            if (!form.name.trim()) e.name = "Name is required";
            if (!form.email.trim()) e.email = "Email is required";
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                e.email = "Enter a valid email address";
        }
        if (s === 2) {
            if (!form.service) e.service = "Please select a service";
            if (!form.message.trim()) e.message = "Tell us about your project";
        }
        return e;
    };

    const next = () => {
        const e = validate(step);
        if (Object.keys(e).length) { setErrors(e); return; }
        setStep(s => s + 1);
        // scroll form into view
        setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    };

    const back = () => setStep(s => s - 1);

    const submit = async (e) => {
        e.preventDefault();
        const e2 = validate(3);
        if (Object.keys(e2).length) { setErrors(e2); return; }
        setLoading(true);
        setSubmitErr("");
        try {
            /* Simulate API call — replace with real endpoint */
            await new Promise(r => setTimeout(r, 1800));
            setSubmitted(true);
        } catch {
            setSubmitErr("Something went wrong. Please try again or email us directly.");
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setForm({ name: "", email: "", phone: "", company: "", service: "", budget: "", timeline: "", message: "" });
        setErrors({});
        setStep(1);
        setSubmitted(false);
        setCharCount(0);
    };

    /* ─────────────────────────────────────────── */
    return (
        <div className={styles.page}>

            {/* ══════════════════════════════
          HERO — signal transmission
      ══════════════════════════════ */}
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <p className={styles.sectionLabel}>Get in touch</p>
                    <h1 className={styles.pageTitle}>
                        Let's start<br />
                        <em className={styles.pageTitleAccent}>a conversation.</em>
                    </h1>
                    <p className={styles.pageSubtitle}>
                        Tell us what you're building and we'll figure out exactly
                        how CloudCrave can make it happen.
                    </p>
                </div>

                {/* Transmission stats strip */}
                <div className={styles.heroStats}>
                    {[
                        { num: "< 24h", label: "Response time" },
                        { num: "Free", label: "Discovery call" },
                        { num: "40+", label: "Specialists" },
                    ].map(({ num, label }) => (
                        <div key={label} className={styles.heroStat}>
                            <span className={styles.heroStatNum}>{num}</span>
                            <span className={styles.heroStatLabel}>{label}</span>
                        </div>
                    ))}
                </div>
            </header>

            {/* ══════════════════════════════
          CONTENT — form + info
      ══════════════════════════════ */}
            <div className={styles.content} ref={formRef}>

                {/* ── FORM CARD ── */}
                <div className={styles.formCard}>
                    {submitted ? (
                        <SuccessAnim onReset={reset} />
                    ) : (
                        <>
                            <StepIndicator current={step} />

                            <form onSubmit={submit} noValidate className={styles.form}>

                                {/* ── STEP 1: About you ── */}
                                {step === 1 && (
                                    <div className={styles.stepPane} key="step1">
                                        <div className={styles.stepPaneHeader}>
                                            <span className={styles.stepPaneNum}>01</span>
                                            <div>
                                                <h2 className={styles.cardHeading}>About you</h2>
                                                <p className={styles.stepPaneDesc}>Let us know who we'll be talking to.</p>
                                            </div>
                                        </div>

                                        <div className={`${styles.field} ${errors.name ? styles.fieldError : ""}`}>
                                            <label className={styles.label} htmlFor="name">Full name</label>
                                            <div className={styles.inputWrap}>
                                                <svg className={styles.inputIcon} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                                    <circle cx="7" cy="5" r="3" stroke="currentColor" strokeWidth="1.2" />
                                                    <path d="M1 13c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                                                </svg>
                                                <input id="name" type="text" placeholder="Adaeze Okonkwo"
                                                    value={form.name} onChange={set("name")} autoComplete="name" />
                                            </div>
                                            {errors.name && <p className={styles.errorMsg}><FaExclamationTriangle />{errors.name}</p>}
                                        </div>

                                        <div className={`${styles.field} ${errors.email ? styles.fieldError : ""}`}>
                                            <label className={styles.label} htmlFor="email">Work email</label>
                                            <div className={styles.inputWrap}>
                                                <FaEnvelope className={styles.inputIcon} />
                                                <input id="email" type="email" placeholder="adaeze@company.com"
                                                    value={form.email} onChange={set("email")} autoComplete="email" />
                                            </div>
                                            {errors.email && <p className={styles.errorMsg}><FaExclamationTriangle />{errors.email}</p>}
                                        </div>

                                        <div className={styles.field}>
                                            <label className={styles.label} htmlFor="phone">
                                                Phone <span className={styles.optional}>(optional)</span>
                                            </label>
                                            <div className={styles.inputWrap}>
                                                <FaPhone className={styles.inputIcon} />
                                                <input id="phone" type="tel" placeholder="+234 800 000 0000"
                                                    value={form.phone} onChange={set("phone")} autoComplete="tel" />
                                            </div>
                                        </div>

                                        <div className={styles.field}>
                                            <label className={styles.label} htmlFor="company">
                                                Company <span className={styles.optional}>(optional)</span>
                                            </label>
                                            <div className={styles.inputWrap}>
                                                <svg className={styles.inputIcon} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                                    <rect x="1" y="4" width="12" height="9" rx="1" stroke="currentColor" strokeWidth="1.2" />
                                                    <path d="M4 4V2.5A1.5 1.5 0 0 1 5.5 1h3A1.5 1.5 0 0 1 10 2.5V4" stroke="currentColor" strokeWidth="1.2" fill="none" />
                                                </svg>
                                                <input id="company" type="text" placeholder="Your company name"
                                                    value={form.company} onChange={set("company")} autoComplete="organization" />
                                            </div>
                                        </div>

                                        <button type="button" className={styles.nextBtn} onClick={next}>
                                            Continue <FaArrowRight className={styles.btnArrow} />
                                        </button>
                                    </div>
                                )}

                                {/* ── STEP 2: Your project ── */}
                                {step === 2 && (
                                    <div className={styles.stepPane} key="step2">
                                        <div className={styles.stepPaneHeader}>
                                            <span className={styles.stepPaneNum}>02</span>
                                            <div>
                                                <h2 className={styles.cardHeading}>Your project</h2>
                                                <p className={styles.stepPaneDesc}>Help us understand what you need.</p>
                                            </div>
                                        </div>

                                        <div className={`${styles.field} ${errors.service ? styles.fieldError : ""}`}>
                                            <label className={styles.label} htmlFor="service">Service interested in</label>
                                            <div className={styles.selectWrap}>
                                                <select id="service" value={form.service} onChange={set("service")}>
                                                    {SERVICES.map(o => (
                                                        <option key={o.value} value={o.value}>{o.label}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            {errors.service && <p className={styles.errorMsg}><FaExclamationTriangle />{errors.service}</p>}
                                        </div>

                                        <div className={styles.field}>
                                            <label className={styles.label} htmlFor="budget">
                                                Budget range <span className={styles.optional}>(optional)</span>
                                            </label>
                                            <div className={styles.selectWrap}>
                                                <select id="budget" value={form.budget} onChange={set("budget")}>
                                                    {BUDGETS.map(o => (
                                                        <option key={o.value} value={o.value}>{o.label}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className={styles.field}>
                                            <label className={styles.label} htmlFor="timeline">
                                                Ideal timeline <span className={styles.optional}>(optional)</span>
                                            </label>
                                            <div className={styles.selectWrap}>
                                                <select id="timeline" value={form.timeline} onChange={set("timeline")}>
                                                    <option value="">Select a timeline…</option>
                                                    <option value="asap">As soon as possible</option>
                                                    <option value="1-month">Within 1 month</option>
                                                    <option value="3-months">1–3 months</option>
                                                    <option value="6-months">3–6 months</option>
                                                    <option value="flexible">Flexible</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className={styles.stepNavRow}>
                                            <button type="button" className={styles.backBtn} onClick={back}>← Back</button>
                                            <button type="button" className={styles.nextBtn} onClick={next}>
                                                Continue <FaArrowRight className={styles.btnArrow} />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* ── STEP 3: Message ── */}
                                {step === 3 && (
                                    <div className={styles.stepPane} key="step3">
                                        <div className={styles.stepPaneHeader}>
                                            <span className={styles.stepPaneNum}>03</span>
                                            <div>
                                                <h2 className={styles.cardHeading}>Your message</h2>
                                                <p className={styles.stepPaneDesc}>Tell us what you're building.</p>
                                            </div>
                                        </div>

                                        {/* Summary of previous steps */}
                                        <div className={styles.formSummary}>
                                            <div className={styles.summaryRow}>
                                                <span className={styles.summaryKey}>From</span>
                                                <span className={styles.summaryVal}>{form.name} · {form.email}</span>
                                            </div>
                                            {form.service && (
                                                <div className={styles.summaryRow}>
                                                    <span className={styles.summaryKey}>Service</span>
                                                    <span className={styles.summaryVal}>{SERVICES.find(s => s.value === form.service)?.label}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className={`${styles.field} ${errors.message ? styles.fieldError : ""}`}>
                                            <label className={styles.label} htmlFor="message">Message</label>
                                            <div className={styles.textareaWrap}>
                                                <textarea id="message" rows={6}
                                                    placeholder="Describe your project, goals, or any questions you have…"
                                                    value={form.message} onChange={set("message")} maxLength={1200} />
                                                <span className={`${styles.charCount} ${charCount > 1000 ? styles.charWarn : ""}`}>
                                                    {charCount}/1200
                                                </span>
                                            </div>
                                            {errors.message && <p className={styles.errorMsg}><FaExclamationTriangle />{errors.message}</p>}
                                        </div>

                                        {submitErr && (
                                            <div className={styles.submitError}>
                                                <FaExclamationTriangle /> {submitErr}
                                            </div>
                                        )}

                                        <div className={styles.stepNavRow}>
                                            <button type="button" className={styles.backBtn} onClick={back}>← Back</button>
                                            <button type="submit" className={styles.submitBtn} disabled={loading}>
                                                {loading
                                                    ? <><span className={styles.spinner} /> Sending…</>
                                                    : <>Send Message <FaArrowRight className={styles.btnArrow} /></>}
                                            </button>
                                        </div>

                                        <p className={styles.privacyNote}>
                                            We respect your privacy. Your details are never sold or shared with third parties.
                                        </p>
                                    </div>
                                )}
                            </form>
                        </>
                    )}
                </div>

                {/* ── INFO CARD ── */}
                <aside className={styles.infoCard}>

                    {/* Live clock */}
                    <LagosClock />
                    {/* Contact details */}
                    <div className={styles.infoGroup}>
                        <div className={styles.infoItem}>
                            <div className={styles.infoIconWrap}><FaEnvelope /></div>
                            <div>
                                <p className={styles.infoLabel}>Email</p>
                                <a href="mailto:hello@cloudcrave.ng" className={styles.infoValue}>
                                    hello@cloudcrave.ng
                                </a>
                            </div>
                        </div>
                        <div className={styles.infoItem}>
                            <div className={styles.infoIconWrap}><FaPhone /></div>
                            <div>
                                <p className={styles.infoLabel}>Phone</p>
                                <a href="tel:+2348012345678" className={styles.infoValue}>
                                    +234 801 234 5678
                                </a>
                            </div>
                        </div>
                        <div className={styles.infoItem}>
                            <div className={styles.infoIconWrap}><FaMapMarkerAlt /></div>
                            <div>
                                <p className={styles.infoLabel}>Address</p>
                                <p className={styles.infoValue}>
                                    14 Admiralty Way, Lekki Phase 1<br />
                                    Lagos Island, Nigeria
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Office hours */}
                    <div className={styles.hours}>
                        <p className={styles.infoLabel} style={{ marginBottom: "0.75rem" }}>Office hours</p>
                        <div className={styles.hoursGrid}>
                            {[
                                ["Mon – Fri", "8:00 AM – 6:00 PM"],
                                ["Saturday", "10:00 AM – 2:00 PM"],
                                ["Sunday", "Closed"],
                            ].map(([day, time]) => (
                                <div key={day} className={styles.hoursRow}>
                                    <span className={styles.hoursDay}>{day}</span>
                                    <span className={styles.hoursTime}>{time}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Social links */}
                    <div>
                        <p className={styles.infoLabel} style={{ marginBottom: "0.75rem" }}>Follow us</p>
                        <div className={styles.socialRow}>
                            {[
                                { icon: FaLinkedin, href: "https://linkedin.com/company/cloudcrave", label: "LinkedIn" },
                                { icon: FaTwitter, href: "https://twitter.com/cloudcraveng", label: "Twitter" },
                                { icon: FaInstagram, href: "https://instagram.com/cloudcraveng", label: "Instagram" },
                            ].map(({ icon: Icon, href, label }) => (
                                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                                    className={styles.socialIcon} aria-label={label}>
                                    <Icon />
                                </a>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}