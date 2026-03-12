import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
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

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function AppInner() {
  const { pathname } = useLocation();
  const hideFooter = pathname === '/chat';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--background)' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          <Route path="/lawyers" element={<Lawyers />} />
          <Route path="/pricing" element={<Pricing />} />
            <Route path="/legal/:slug" element={<Legal />} />
        </Routes>
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppInner />
    </Router>
  );
}

export default App;
