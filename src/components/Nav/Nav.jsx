import { useEffect, useState } from "react";
import styles from "./Nav.module.css";
import logo from "@/assets/cloud-crave-logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Nav() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const navigate  = useNavigate();
  const location  = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  /* Prevent body scroll when menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const links = [
    { to: "/",         label: "Home"      },
    { to: "/about",    label: "About"     },
    { to: "/services", label: "Services"  },
    { to: "/products", label: "Products"  },
  ];

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      {/* Logo */}
      <div className={styles.navLogo}>
        <Link to="/" aria-label="CloudCrave home">
          <img src={logo} alt="CloudCrave Solutions" />
        </Link>
      </div>

      {/* Hamburger */}
      <button
        className={`${styles.menuToggle} ${menuOpen ? styles.active : ""}`}
        onClick={() => setMenuOpen((v) => !v)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Links */}
      <div
        className={`${styles.navLinks} ${menuOpen ? styles.active : ""}`}
        role="navigation"
        aria-label="Main navigation"
      >
        {links.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={isActive(to) ? styles.active : ""}
          >
            {label}
          </Link>
        ))}

        {/* Mobile-only CTA inside menu */}
        <button
          className={`${styles.cta} ${styles.mobileCta}`}
          onClick={() => { setMenuOpen(false); navigate("/contact"); }}
        >
          Get in Touch
        </button>
      </div>

      {/* Desktop CTA */}
      <button className={styles.cta} onClick={() => navigate("/contact")}>
        Get in Touch
      </button>
    </nav>
  );
}