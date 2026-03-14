import React, { useEffect, useState } from "react";
import { User, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import GlassSurface from "./ui/GlassSurface";
import GradualBlur from "./ui/GradualBlur";

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

  const capsuleStyle: React.CSSProperties = {
    position: "fixed",
    top: scrolled ? "15px" : "20px",
    left: (isChatPage && !isMobile) ? "calc(280px + (100% - 280px) / 2)" : "50%",
    transform: "translateX(-50%)",
    width: (isChatPage && !isMobile) ? "70%" : (scrolled ? "75%" : "90%"),
    maxWidth: "1440px",
    zIndex: 1002,
    willChange: "transform, top, width, left",
    transition: "all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)",
  };

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
      <div style={capsuleStyle}>
        <div style={{
          position: "relative",
          borderRadius: "999px",
          overflow: "hidden",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          background: "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4)",
        }}>
          <GradualBlur
            target="parent"
            position="top"
            height="100%"
            strength={6}
            divCount={8}
            curve="bezier"
            exponential
            opacity={1}
            zIndex={1}
            style={{ borderRadius: "999px" }}
          />
          <nav style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.5rem 2.5rem",
            width: "100%",
            transition: "all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
          }}>
          {/* Logo — Left */}
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "1rem", fontSize: "1.4rem", fontWeight: 700, letterSpacing: "-0.04em", color: "var(--foreground)", paddingLeft: "1rem" }}>
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
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: isActive ? "#ffffff" : "var(--muted-foreground)",
                    padding: "0.6rem 1.4rem",
                    borderRadius: "999px",
                    transition: "color 0.3s ease",
                    whiteSpace: "nowrap",
                    zIndex: 1,
                  }}
                >
                  {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        transition={{
                          type: "spring",
                          stiffness: 150,
                          damping: 25,
                          restDelta: 0.001
                        }}
                        style={{
                          position: "absolute",
                          inset: "1px -8px",
                          zIndex: -1,
                        }}
                      >
                        <GlassSurface 
                          borderRadius={999} 
                          backgroundOpacity={0.3} 
                          displace={2} 
                          mixBlendMode="normal"
                          blur={20}
                          width="100%"
                          height="100%"
                          style={{
                            borderTop: "2px solid rgba(255, 255, 255, 0.6)",
                            boxShadow: "inset 0 0 18px rgba(255, 255, 255, 0.25), 0 12px 24px rgba(0, 0, 0, 0.5)",
                          }}
                        >
                          <div style={{ width: "100%", height: "100%" }} />
                        </GlassSurface>
                      </motion.div>
                  )}
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Auth Buttons — Right (Desktop) */}
          <div className="desktop-flex" style={{ gap: "0.5rem", alignItems: "center" }}>
            {!isChatPage && (
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <Link 
                  to="/login" 
                  className="navbar-link"
                  style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--muted-foreground)", padding: "0.5rem 1rem", display: "flex", alignItems: "center", gap: "0.3rem", transition: "color 0.2s" }}
                >
                  <User size={16} />
                  Sign In
                </Link>
                <GlassSurface 
                  blur={20} 
                  displace={4} 
                  mixBlendMode="normal" 
                  backgroundOpacity={1} 
                  brightness={120}
                  style={{ background: '#BD2020' }}
                  className="navbar-cta"
                >
                  <Link to="/register" style={{ padding: "0.5rem 1.1rem", fontSize: "0.85rem", fontWeight: 700, color: "#fff", display: "inline-block" }}>
                    Get Started
                  </Link>
                </GlassSurface>
              </div>
            )}
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
