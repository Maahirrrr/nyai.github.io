import React, { useEffect, useState } from "react";
import { User, Menu, X, ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();
  const isChatPage = location.pathname === '/chat';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const capsuleStyle: React.CSSProperties = {
    position: "fixed",
    top: scrolled ? "12px" : "16px",
    left: (isChatPage && !isMobile) ? "calc(280px + (100% - 280px) / 2)" : "50%",
    transform: "translateX(-50%)",
    width: (isChatPage && !isMobile) ? "70%" : (scrolled ? "80%" : "92%"),
    maxWidth: "1440px",
    zIndex: 1002,
    transition: "all 0.4s ease",
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/lawyers", label: "Lawyers" },
    { to: "/chat", label: "NyAI" },
    { to: "/search", label: "Search" },
    { to: "/pricing", label: "Pricing" },
    { to: "/about", label: "About" },
  ];

  return (
    <>
      <div style={capsuleStyle}>
        <div style={{
          borderRadius: "999px",
          border: "1px solid var(--border)",
          background: scrolled ? "rgba(10, 14, 26, 0.92)" : "rgba(10, 14, 26, 0.8)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          transition: "background 0.3s ease",
        }}>
          <nav style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.5rem 1.5rem",
            width: "100%",
          }}>
            {/* Logo */}
            <Link to="/" style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              fontSize: "1.25rem", fontWeight: 800, letterSpacing: "-0.04em", color: "#fff",
            }}>
              NyAI
            </Link>

            {/* Desktop Nav — Center */}
            <div className="desktop-flex" style={{ gap: "0.15rem", alignItems: "center" }}>
              {navLinks.map(link => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? "#ffffff" : "var(--muted-foreground)",
                      padding: "0.45rem 0.95rem",
                      borderRadius: "999px",
                      transition: "color 0.2s ease, background 0.2s ease",
                      whiteSpace: "nowrap",
                      background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Auth — Right (Desktop) */}
            <div className="desktop-flex" style={{ gap: "0.65rem", alignItems: "center" }}>
              {!isChatPage && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                  <Link
                    to="/login"
                    style={{
                      fontSize: "0.84rem", fontWeight: 500, color: "var(--muted-foreground)",
                      padding: "0.4rem 0.65rem",
                      display: "flex", alignItems: "center", gap: "0.3rem", transition: "color 0.2s",
                    }}
                  >
                    <User size={14} /> Sign In
                  </Link>
                  <Link to="/register" style={{
                    padding: "0.5rem 1.15rem",
                    fontSize: "0.84rem", fontWeight: 600,
                    color: "var(--background)",
                    background: "#fff",
                    borderRadius: "0.4rem",
                    display: "inline-flex", alignItems: "center", gap: "0.35rem",
                    transition: "background 0.2s ease",
                  }}>
                    Request a Demo <ArrowRight size={13} />
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Toggle */}
            <div className="mobile-only" style={{ zIndex: 1001 }}>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: "40px", height: "40px", color: "#fff",
                }}
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              position: "fixed",
              top: "5rem", left: "4%", right: "4%",
              maxHeight: "80vh",
              background: "var(--background-card)",
              border: "1px solid var(--border)",
              borderRadius: "1.25rem",
              zIndex: 1001,
              display: "flex", flexDirection: "column",
              padding: "1.25rem 1rem",
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem", marginBottom: "1.25rem" }}>
              {navLinks.map(link => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to} to={link.to}
                    style={{
                      fontSize: "0.95rem", fontWeight: isActive ? 600 : 400,
                      color: isActive ? "#fff" : "var(--muted-foreground)",
                      padding: "0.7rem 0.85rem", borderRadius: "0.6rem",
                      background: isActive ? "rgba(255,255,255,0.06)" : "transparent",
                      transition: "all 0.2s", textAlign: "left",
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <Link to="/login" style={{
                fontSize: "0.92rem", fontWeight: 500, color: "#fff",
                padding: "0.7rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
                border: "1px solid var(--border)", borderRadius: "0.5rem",
              }}>
                <User size={16} /> Sign In
              </Link>
              <Link to="/register" className="btn-primary" style={{
                padding: "0.7rem", fontSize: "0.92rem", justifyContent: "center", borderRadius: "0.5rem",
              }}>
                Request a Demo <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
