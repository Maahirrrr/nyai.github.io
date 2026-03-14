import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Search from './pages/Search';
import Lawyers from './pages/Lawyers';
import Pricing from './pages/Pricing';
import Legal from './pages/Legal';
import Plasma from './components/Plasma';

// Page Transition Wrapper
const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -15, scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 25,
        mass: 1
      }}
    >
      {children}
    </motion.div>
  );
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppInner() {
  const location = useLocation();
  const { pathname } = location;
  const hideFooter = pathname === '/chat';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'transparent' }}>
      <div className="plasma-container">
        <Plasma 
          speed={0.6}
          direction="forward"
          scale={1.1}
          opacity={0.8}
          mouseInteractive={true}
        />
      </div>
      <Navbar />
      <main style={{ flex: 1 }}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/chat" element={<PageWrapper><Chat /></PageWrapper>} />
            <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
            <Route path="/register" element={<PageWrapper><Signup /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
            <Route path="/search" element={<PageWrapper><Search /></PageWrapper>} />
            <Route path="/lawyers" element={<PageWrapper><Lawyers /></PageWrapper>} />
            <Route path="/pricing" element={<PageWrapper><PageWrapper><Pricing /></PageWrapper></PageWrapper>} />
            <Route path="/legal/:slug" element={<PageWrapper><Legal /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router basename="/nyai.github.io">
      <ScrollToTop />
      <AppInner />
    </Router>
  );
}

export default App;
