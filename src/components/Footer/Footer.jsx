import styles from "./Footer.module.css";
import logo from "@/assets/cloud-crave-logo.png";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

/* ── DB-DRIVEN DATA ──────────────────────────────────────────
   GET /api/company/partners → partners[]
   GET /api/company/info     → company{}
   ─────────────────────────────────────────────────────────── */

const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    { to: "/portfolio", label: "Portfolio" },
    { to: "/products", label: "Products" },
    { to: "/insights", label: "Insights" },
];

const serviceLinks = [
    { label: "Tech Training", href: "/services#tech-training" },
    { label: "Cloud Solutions", href: "/services#cloud-solutions" },
    { label: "AI Integration", href: "/services#ai-integration" },
    { label: "Digital Marketing", href: "/services#digital-marketing" },
    { label: "Software Development", href: "/services#software-development" },
    { label: "Branding & Design", href: "/services#branding-design" },
];

const productLinks = [
    { label: "Switch2Tech", href: "/products/switch2tech" },
    { label: "Chatbot Studio", href: "/products/chatbot-studio" },
    { label: "SchoolSync", href: "/products/school-manager" },
    { label: "RunIQ", href: "/products/runiq" },
];

const socials = [
    { Icon: FaFacebookF, href: "https://www.facebook.com/cloudcrave", label: "Facebook" },
    { Icon: FaInstagram, href: "https://www.instagram.com/cloudcrave", label: "Instagram" },
    { Icon: FaTwitter, href: "https://twitter.com/cloudcrave", label: "Twitter" },
    { Icon: FaLinkedinIn, href: "https://www.linkedin.com/company/cloudcrave", label: "LinkedIn" },
];

export default function Footer() {
    return (
        <footer className={styles.footer}>

            {/* ── PARTNERS STRIP ── */}
            <div className={styles.partnersStrip}>
                <p className={styles.partnersLabel}>Trusted by &amp; partnered with</p>
                <div className={styles.partnerLogos}>
                    {["AWS", "Google Cloud", "Microsoft", "Zoho", "Meta"].map((p) => (
                        <span key={p} className={styles.partnerPill}>{p}</span>
                    ))}
                </div>
            </div>

            {/* ── MAIN FOOTER GRID ── */}
            <div className={styles.main}>
                {/* Company column */}
                <div className={styles.companyCol}>
                    <Link to="/" className={styles.logoWrap} aria-label="CloudCrave home">
                        <img src={logo} alt="CloudCrave Solutions" className={styles.logo} />
                    </Link>

                    <p className={styles.companyCopy}>
                        {/* DB: company.footer_bio */}
                        CloudCrave Solutions is a Lagos-based technology company
                        specialising in cloud infrastructure, AI integration, custom
                        software, and tech training — building the digital future of Africa.
                    </p>

                    <address className={styles.contactInfo}>
                        <a href="tel:+2348033011305">+234 (0) 803 301 1305</a>
                        <a href="mailto:contact@cloudcraves.com">contact@cloudcraves.com</a>
                        <span>3rd Floor Brasas'r Place, 69 Admiralty Way, Lekki Phase 1, Lagos.</span>
                    </address>

                    <div className={styles.socials} role="list">
                        {socials.map(({ Icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialIcon}
                                aria-label={label}
                                role="listitem"
                            >
                                <Icon aria-hidden="true" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Quick links */}
                <nav className={styles.linkCol} aria-label="Quick links">
                    <h4 className={styles.colHeading}>Company</h4>
                    {quickLinks.map(({ to, label }) => (
                        <Link key={to} to={to} className={styles.link}>{label}</Link>
                    ))}
                </nav>

                {/* Services */}
                <nav className={styles.linkCol} aria-label="Services">
                    <h4 className={styles.colHeading}>Services</h4>
                    {serviceLinks.map(({ label, href }) => (
                        <a key={label} href={href} className={styles.link}>{label}</a>
                    ))}
                </nav>

                {/* Products */}
                <nav className={styles.linkCol} aria-label="Products">
                    <h4 className={styles.colHeading}>Products</h4>
                    {productLinks.map(({ label, href }) => (
                        <a key={label} href={href} className={styles.link}>{label}</a>
                    ))}
                </nav>
            </div>

            {/* ── COPYRIGHT BAR ── */}
            <div className={styles.copyright}>
                <p>© {new Date().getFullYear()} CloudCrave Solutions Limited. All rights reserved.</p>
                <p className={styles.pride}>Proudly Nigerian 🇳🇬</p>
            </div>
        </footer>
    );
}