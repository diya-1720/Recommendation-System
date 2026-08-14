import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Compass, User, Search, Sparkles, Sun, Moon, Users, Menu, X, Home } from 'lucide-react';

export default function Navbar({ onOpenSearch, theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Main 4 Distinct Navigation Pages
  const mainNavLinks = [
    { label: 'Landing', path: '/', icon: Home },
    { label: 'Discover', path: '/movie-home', icon: Sparkles },
    { label: 'Vibe Library', path: '/library', icon: Compass },
    { label: 'My Profile', path: '/universe', icon: User }
  ];

  return (
    <>
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: scrolled
            ? 'var(--vyora-bg-secondary)'
            : theme === 'day'
            ? 'rgba(246, 240, 230, 0.94)'
            : 'rgba(18, 10, 24, 0.94)',
          borderBottom: scrolled
            ? '1px solid var(--vyora-border-strong)'
            : '1px solid var(--vyora-border)',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(12px)',
          padding: '6px 20px'
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            minHeight: '76px'
          }}
        >
          {/* ==================================================================
              1. LEFT: VYORA BRAND LOGO & MASCOT
             ================================================================== */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              color: 'var(--vyora-text)',
              flexShrink: 0
            }}
          >
            <img
              src="/vyora-mascot.png"
              alt="VYORA mascot"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                objectFit: 'cover',
                border: '1.5px solid var(--vyora-accent)',
                boxShadow: '0 0 10px rgba(168, 117, 255, 0.25)',
                transition: 'transform 0.2s ease, boxShadow 0.2s ease',
                flexShrink: 0
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.06) translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 0 16px rgba(168, 117, 255, 0.45)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 0 10px rgba(168, 117, 255, 0.25)';
              }}
            />
            <div>
              <span
                className="font-display"
                style={{
                  fontSize: '1.25rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  display: 'block',
                  lineHeight: 1,
                  color: 'var(--vyora-text)'
                }}
              >
                VYORA <span className="vyora-mark">✦</span>
              </span>
              <span
                style={{
                  fontSize: '0.58rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--vyora-accent)',
                  display: 'block',
                  marginTop: '2px',
                  fontStyle: 'italic',
                  fontWeight: 600
                }}
              >
                Find Your Vibe.
              </span>
            </div>
          </Link>

          {/* ==================================================================
              2. CENTER: MAIN 4 NAVIGATION LINKS (Desktop)
             ================================================================== */}
          <div
            className="desktop-nav-links"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}
          >
            {mainNavLinks.map(link => {
              const isActive = location.pathname === link.path;
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    fontWeight: isActive ? '700' : '500',
                    color: isActive ? 'var(--vyora-accent)' : 'var(--vyora-text-muted)',
                    padding: '6px 10px',
                    borderRadius: '3px',
                    position: 'relative',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={e => {
                    if (!isActive) e.currentTarget.style.color = 'var(--vyora-text)';
                  }}
                  onMouseLeave={e => {
                    if (!isActive) e.currentTarget.style.color = 'var(--vyora-text-muted)';
                  }}
                >
                  <Icon size={14} color={isActive ? 'var(--vyora-accent)' : 'var(--vyora-text-muted)'} />
                  <span>{link.label}</span>
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '-3px',
                        left: '8px',
                        right: '8px',
                        height: '2px',
                        backgroundColor: 'var(--vyora-accent)',
                        borderRadius: '1px',
                        boxShadow: 'var(--vyora-glow)'
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ==================================================================
              3. RIGHT AREA: SEARCH BAR & CONTROL BUTTONS
             ================================================================== */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            {/* SEARCH BAR (Compact Height & Width) */}
            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Search movies"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                backgroundColor: 'var(--vyora-surface)',
                border: '1px solid var(--vyora-border-strong)',
                borderRadius: '18px',
                cursor: 'pointer',
                fontSize: '0.8rem',
                color: 'var(--vyora-text-muted)',
                width: 'clamp(140px, 16vw, 220px)',
                height: '36px',
                transition: 'all 0.2s ease',
                boxShadow: 'var(--shadow-sm)'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--vyora-accent)';
                e.currentTarget.style.boxShadow = 'var(--vyora-glow)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--vyora-border-strong)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}
            >
              <Search size={14} color="var(--vyora-accent)" />
              <span style={{ fontSize: '0.78rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                Search archive...
              </span>
            </button>

            {/* Desktop Control Buttons */}
            <div
              className="desktop-nav-links"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                paddingLeft: '8px',
                borderLeft: '1px dashed var(--vyora-border-strong)'
              }}
            >
              {/* Profile Button */}
              <button
                type="button"
                onClick={() => navigate('/universe')}
                title="My Profile"
                aria-label="My Profile"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--vyora-surface)',
                  color: 'var(--vyora-gold)',
                  border: '1.5px solid var(--vyora-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 0 8px rgba(255, 203, 119, 0.25)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.boxShadow = '0 0 14px rgba(255, 203, 119, 0.45)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 0 8px rgba(255, 203, 119, 0.25)';
                }}
              >
                <span className="font-display" style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--vyora-gold)' }}>
                  V
                </span>
              </button>

              {/* Vibe Circle Button */}
              <button
                type="button"
                onClick={() => navigate('/circle')}
                title="Vibe Circle Taste Network"
                aria-label="Vibe Circle Taste Network"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: location.pathname === '/circle' ? 'var(--vyora-accent)' : 'var(--vyora-surface)',
                  color: location.pathname === '/circle' ? '#120A18' : 'var(--vyora-accent)',
                  border: '1.5px solid var(--vyora-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: 'var(--vyora-glow)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <Users size={14} />
              </button>

              {/* Theme Toggle */}
              <button
                type="button"
                onClick={onToggleTheme}
                title={theme === 'day' ? 'Switch to Night Mode' : 'Switch to Day Mode'}
                aria-label="Toggle theme mode"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--vyora-surface)',
                  border: '1.5px solid var(--vyora-border-strong)',
                  color: 'var(--vyora-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.borderColor = 'var(--vyora-gold)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.borderColor = 'var(--vyora-border-strong)';
                }}
              >
                {theme === 'day' ? <Moon size={14} /> : <Sun size={14} />}
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className="mobile-nav-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              style={{
                display: 'none',
                width: '36px',
                height: '36px',
                borderRadius: '6px',
                backgroundColor: 'var(--vyora-surface)',
                border: '1px solid var(--vyora-border-strong)',
                color: 'var(--vyora-accent)',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* ==================================================================
            4. MOBILE SLIDING DRAWER MENU (< 900px)
           ================================================================== */}
        {mobileMenuOpen && (
          <div
            className="animate-slide-down"
            style={{
              padding: '16px 8px 24px 8px',
              borderTop: '1px solid var(--vyora-border-strong)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            {mainNavLinks.map(link => {
              const isActive = location.pathname === link.path;
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '6px',
                    backgroundColor: isActive ? 'rgba(168, 117, 255, 0.15)' : 'var(--vyora-surface)',
                    color: isActive ? 'var(--vyora-accent)' : 'var(--vyora-text)',
                    border: '1px solid var(--vyora-border)',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    fontWeight: isActive ? 700 : 500
                  }}
                >
                  <Icon size={18} color={isActive ? 'var(--vyora-accent)' : 'var(--vyora-text-muted)'} />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '4px' }}>
              <button
                type="button"
                onClick={() => navigate('/circle')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px',
                  backgroundColor: 'var(--vyora-surface)',
                  border: '1px solid var(--vyora-border-strong)',
                  borderRadius: '6px',
                  color: 'var(--vyora-accent)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <Users size={16} />
                <span>Vibe Circle</span>
              </button>

              <button
                type="button"
                onClick={onToggleTheme}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px',
                  backgroundColor: 'var(--vyora-surface)',
                  border: '1px solid var(--vyora-border-strong)',
                  borderRadius: '6px',
                  color: 'var(--vyora-gold)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {theme === 'day' ? <Moon size={16} /> : <Sun size={16} />}
                <span>{theme === 'day' ? 'Night Mode' : 'Day Mode'}</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ==================================================================
          5. FLOATING MOBILE BOTTOM NAVIGATION BAR (< 768px)
         ================================================================== */}
      <div className="mobile-bottom-bar">
        <Link
          to="/"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            textDecoration: 'none',
            color: location.pathname === '/' ? 'var(--vyora-accent)' : 'var(--vyora-text-muted)',
            fontSize: '0.68rem',
            fontWeight: 600
          }}
        >
          <Home size={18} color={location.pathname === '/' ? 'var(--vyora-accent)' : 'var(--vyora-text-muted)'} />
          <span>Landing</span>
        </Link>

        <Link
          to="/movie-home"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            textDecoration: 'none',
            color: location.pathname === '/movie-home' ? 'var(--vyora-accent)' : 'var(--vyora-text-muted)',
            fontSize: '0.68rem',
            fontWeight: 600
          }}
        >
          <Sparkles size={18} color={location.pathname === '/movie-home' ? 'var(--vyora-accent)' : 'var(--vyora-text-muted)'} />
          <span>Discover</span>
        </Link>

        <button
          type="button"
          onClick={onOpenSearch}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            background: 'none',
            border: 'none',
            color: 'var(--vyora-accent)',
            fontSize: '0.68rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'var(--vyora-accent)',
              color: '#120A18',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--vyora-glow)',
              marginTop: '-12px'
            }}
          >
            <Search size={18} />
          </div>
          <span>Search</span>
        </button>

        <Link
          to="/library"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            textDecoration: 'none',
            color: location.pathname === '/library' ? 'var(--vyora-accent)' : 'var(--vyora-text-muted)',
            fontSize: '0.68rem',
            fontWeight: 600
          }}
        >
          <Compass size={18} color={location.pathname === '/library' ? 'var(--vyora-accent)' : 'var(--vyora-text-muted)'} />
          <span>Library</span>
        </Link>

        <Link
          to="/universe"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            textDecoration: 'none',
            color: location.pathname === '/universe' ? 'var(--vyora-accent)' : 'var(--vyora-text-muted)',
            fontSize: '0.68rem',
            fontWeight: 600
          }}
        >
          <User size={18} color={location.pathname === '/universe' ? 'var(--vyora-accent)' : 'var(--vyora-text-muted)'} />
          <span>My Profile</span>
        </Link>
      </div>
    </>
  );
}
