import React, { useEffect, useState } from "react";
import { Shield, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/lawyers", label: "Lawyers" },
    { to: "/chat", label: "NyAI" },
    { to: "/search", label: "Search" },
    { to: "/pricing", label: "Pricing" },
    { to: "/about", label: "About Us" },
  ];

  return (
    <nav style={{
      position: "fixed",
      top: 0,
      width: "100%",
      zIndex: 1000,
      padding: scrolled ? "0.875rem 0" : "1.25rem 0",
      background: scrolled ? "rgba(17, 17, 17, 0.97)" : "rgba(17, 17, 17, 0.6)",
      backdropFilter: "blur(16px)",
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      transition: "all 0.3s ease",
    }}>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>
        {/* Logo — Left */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "1.35rem", fontWeight: 800, letterSpacing: "-0.025em", zIndex: 2 }}>
          <Shield size={26} />
          <span>NyAI</span>
        </Link>

        {/* Desktop Nav — Center */}
        <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "0.25rem", alignItems: "center" }}>
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                fontSize: "0.88rem",
                fontWeight: 500,
                color: location.pathname === link.to ? "var(--foreground)" : "var(--muted-foreground)",
                padding: "0.5rem 0.85rem",
                borderRadius: "0.5rem",
                transition: "color 0.2s, background 0.2s",
                background: location.pathname === link.to ? "rgba(255,255,255,0.08)" : "transparent",
                whiteSpace: "nowrap",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Auth Buttons — Right */}
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", zIndex: 2 }}>
          <Link
            to="/login"
            style={{ fontSize: "0.88rem", fontWeight: 500, color: "var(--muted-foreground)", padding: "0.5rem 0.85rem", display: "flex", alignItems: "center", gap: "0.4rem", transition: "color 0.2s" }}
          >
            <User size={16} />
            Sign In
          </Link>
          <Link to="/register" className="btn-primary" style={{ padding: "0.6rem 1.25rem", fontSize: "0.88rem" }}>
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
