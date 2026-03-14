import React, { useEffect, useState } from "react";
import { Shield, User, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
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
      {/* Floating Capsule Container */}
      <div style={{
        position: "fixed",
        top: scrolled ? "0.75rem" : "1.25rem",
        left: "50%",
        transform: "translateX(-50%)",
        width: "94%", /* More room on mobile */
        maxWidth: "1000px",
        zIndex: 1002,
        transition: "all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}>
        <nav style={{
          padding: "0.75rem 1.25rem",
          background: scrolled ? "rgba(20, 20, 20, 0.2)" : "rgba(20, 20, 20, 0.05)",
          backdropFilter: "blur(40px) saturate(220%)",
          WebkitBackdropFilter: "blur(40px) saturate(220%)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          borderRadius: "999px",
          boxShadow: scrolled ? "0 12px 36px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255, 255, 255, 0.2), inset 0 -1px 1px rgba(0,0,0,0.5)" : "0 4px 24px rgba(0,0,0,0.1), inset 0 1px 1px rgba(255, 255, 255, 0.1)",
          transition: "all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center"
        }}>
          {/* Logo — Left */}
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "1.2rem", fontWeight: 800, letterSpacing: "-0.025em", color: "var(--foreground)", paddingLeft: "0.5rem" }}>
            <Shield size={22} style={{ color: "var(--trust-blue)" }} />
            <span>NyAI</span>
          </Link>

          {/* Desktop Nav — Center */}
          <div className="desktop-flex" style={{ gap: "0.25rem", alignItems: "center", position: "relative" }}>
            {navLinks.map(link => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    position: "relative",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: isActive ? "#ffffff" : "var(--muted-foreground)",
                    padding: "0.5rem 1rem",
                    borderRadius: "999px",
                    transition: "color 0.3s ease",
                    whiteSpace: "nowrap",
                    zIndex: 1,
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      initial={false}
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      style={{
                        position: "absolute",
                        top: 0, left: 0, right: 0, bottom: 0,
                        background: "rgba(255,255,255,0.12)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        boxShadow: "inset 0 1px 1px rgba(255,255,255,0.1)",
                        borderRadius: "999px",
                        zIndex: -1,
                      }}
                    />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Auth Buttons — Right (Desktop) */}
          <div className="desktop-flex" style={{ gap: "0.5rem", alignItems: "center" }}>
            <Link
              to="/login"
              style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--muted-foreground)", padding: "0.5rem 1rem", display: "flex", alignItems: "center", gap: "0.3rem", transition: "color 0.2s" }}
            >
              <User size={16} />
              Sign In
            </Link>
            <Link to="/register" className="btn-primary" style={{ padding: "0.5rem 1.1rem", fontSize: "0.85rem" }}>
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
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            style={{
              position: "fixed",
              top: "5.5rem",
              left: "3%",
              right: "3%",
              maxHeight: "80vh",
              background: "rgba(20, 20, 20, 0.2)",
              backdropFilter: "blur(40px) saturate(220%)",
              WebkitBackdropFilter: "blur(40px) saturate(220%)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "2.5rem",
              zIndex: 1001,
              display: "flex",
              flexDirection: "column",
              padding: "2rem 1.5rem",
              boxShadow: "0 24px 48px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255, 255, 255, 0.2)",
              overflow: "hidden"
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "2rem" }}>
              {navLinks.map(link => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      color: isActive ? "#ffffff" : "var(--muted-foreground)",
                      padding: "0.85rem 1.25rem",
                      borderRadius: "999px",
                      background: isActive ? "rgba(255,255,255,0.12)" : "transparent",
                      transition: "all 0.2s",
                      textAlign: "center"
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <Link
                to="/login"
                style={{ 
                  fontSize: "1rem", 
                  fontWeight: 600, 
                  color: "var(--foreground)", 
                  padding: "0.85rem", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  gap: "0.5rem", 
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)", 
                  borderRadius: "999px" 
                }}
              >
                <User size={18} />
                Sign In
              </Link>
              <Link to="/register" className="btn-primary" style={{ padding: "0.85rem", fontSize: "1rem", justifyContent: "center" }}>
                Get Started Free
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
