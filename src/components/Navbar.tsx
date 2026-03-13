import React, { useEffect, useState } from "react";
import { Shield, User, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);



  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/lawyers", label: "Lawyers" },
    { to: "/chat", label: "NyAI" },
    { to: "/search", label: "Search" },
    { to: "/pricing", label: "Pricing" },
    { to: "/about", label: "About Us" },
  ];

  return (
    <>
      <nav style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1002,
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
        <div className="desktop-flex" style={{ gap: "0.25rem", alignItems: "center" }}>
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

        {/* Auth Buttons — Right (Desktop) */}
        <div className="desktop-flex" style={{ gap: "0.75rem", alignItems: "center", zIndex: 2 }}>
          <Link
            to="/login"
            style={{ fontSize: "0.88rem", fontWeight: 500, color: "var(--muted-foreground)", padding: "0.5rem 0.85rem", display: "flex", alignItems: "center", gap: "0.4rem", transition: "color 0.2s" }}
          >
            <User size={16} />
            Sign In
          </Link>
          <Link to="/register" className="btn-primary" style={{ padding: "0.6rem 1.25rem", fontSize: "0.88rem", width: "auto" }}>
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="mobile-only" style={{ zIndex: 1001 }}>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", color: "var(--foreground)" }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(17, 17, 17, 0.95)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          zIndex: 1001,
          display: "flex",
          flexDirection: "column",
          padding: "6rem 1.5rem 2rem",
          animation: "fadeIn 0.2s ease-out"
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: location.pathname === link.to ? "var(--foreground)" : "var(--muted-foreground)",
                  padding: "0.75rem 1rem",
                  borderRadius: "0.5rem",
                  background: location.pathname === link.to ? "rgba(255,255,255,0.08)" : "transparent",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Link
              to="/login"
              style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--foreground)", padding: "1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", border: "1.5px solid var(--border)", borderRadius: "0.75rem" }}
            >
              <User size={18} />
              Sign In
            </Link>
            <Link to="/register" className="btn-primary" style={{ padding: "1rem", fontSize: "1.1rem" }}>
              Get Started Free
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
