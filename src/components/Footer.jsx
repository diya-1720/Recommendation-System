import React, { useState, useEffect } from 'react';
import { Film, Coffee, Globe, Info, Heart, Sparkles, X, Copy, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import VyoraPet from './VyoraPet/VyoraPet';

export default function Footer() {
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);

  const placeholderUpi = "yourupi@placeholder";

  // ESC key handler for support modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isSupportModalOpen) {
        setIsSupportModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSupportModalOpen]);

  const handleCopyUpi = async () => {
    try {
      await navigator.clipboard.writeText(placeholderUpi);
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2500);
    } catch (err) {
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2500);
    }
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--vyora-bg-secondary)',
        borderTop: '1px solid var(--vyora-border-strong)',
        padding: '60px 20px 40px 20px',
        marginTop: '80px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Radial Glow */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(168, 117, 255, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2
        }}
      >
        {/* ==================================================================
            1. FOOTER HERO INTRO SECTION
           ================================================================== */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '32px'
          }}
        >
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.8rem)',
              color: 'var(--vyora-text)',
              lineHeight: 1.1,
              marginBottom: '12px'
            }}
          >
            THE PEOPLE BEHIND THE VIBE
          </h2>

          <p
            style={{
              fontSize: '1rem',
              color: 'var(--vyora-text-muted)',
              maxWidth: '560px',
              margin: '0 auto',
              lineHeight: 1.5,
              fontStyle: 'italic'
            }}
          >
            "Built with code, curiosity, caffeine, and a questionable number of movies."
          </p>
        </div>

        {/* ==================================================================
            2. VYORA DIGITAL PET FLOATING GROUND TRACK
           ================================================================== */}
        <VyoraPet />

        {/* ==================================================================
            3. MAIN FOOTER CONTENT FLEX GRID (Ultra-Responsive)
           ================================================================== */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '36px',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: '50px'
          }}
        >
          {/* DEVELOPER CARDS (Flex 1 1 520px) */}
          <div style={{ flex: '1 1 480px', minWidth: '280px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <Sparkles size={16} color="var(--vyora-accent)" />
              <h3
                className="font-display"
                style={{
                  fontSize: '1.3rem',
                  color: 'var(--vyora-text)',
                  textTransform: 'uppercase',
                  margin: 0
                }}
              >
                VYORA STUDIO CREATORS
              </h3>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '20px'
              }}
            >
              {/* DIYA CARD */}
              <div
                style={{
                  padding: '20px',
                  backgroundColor: 'var(--vyora-surface)',
                  border: '1px solid var(--vyora-border-strong)',
                  borderRadius: '6px',
                  transition: 'all 0.3s var(--ease-cinematic)',
                  boxShadow: 'var(--shadow-sm)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'var(--vyora-accent)';
                  e.currentTarget.style.boxShadow = 'var(--vyora-glow)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.borderColor = 'var(--vyora-border-strong)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
                  <img
                    src="/diya.jpg"
                    alt="Diya Developer Photo"
                    style={{
                      width: '58px',
                      height: '58px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid var(--vyora-accent)',
                      flexShrink: 0
                    }}
                  />
                  <div>
                    <h4
                      className="font-display"
                      style={{
                        fontSize: '1.3rem',
                        color: 'var(--vyora-text)',
                        margin: '0 0 2px 0',
                        lineHeight: 1
                      }}
                    >
                      DIYA
                    </h4>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                        color: 'var(--vyora-accent)',
                        textTransform: 'uppercase'
                      }}
                    >
                      Frontend / Product
                    </span>
                  </div>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--vyora-text-muted)', margin: '0 0 14px 0', lineHeight: 1.4 }}>
                  "Turns ideas into interfaces."
                </p>

                {/* Developer Social Links */}
                <div style={{ display: 'flex', gap: '10px', borderTop: '1px dashed var(--vyora-border)', paddingTop: '10px', flexWrap: 'wrap' }}>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--vyora-text-muted)', fontSize: '0.75rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--vyora-accent)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--vyora-text-muted)'}
                  >
                    <Globe size={12} /> GitHub
                  </a>
                  <a
                    href="#"
                    onClick={e => { e.preventDefault(); alert("Diya's LinkedIn URL: YOUR_LINKEDIN_URL"); }}
                    style={{ color: 'var(--vyora-text-muted)', fontSize: '0.75rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--vyora-accent)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--vyora-text-muted)'}
                  >
                    LinkedIn
                  </a>
                  <a
                    href="#"
                    onClick={e => { e.preventDefault(); alert("Diya's Portfolio URL: YOUR_PORTFOLIO_URL"); }}
                    style={{ color: 'var(--vyora-text-muted)', fontSize: '0.75rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--vyora-accent)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--vyora-text-muted)'}
                  >
                    Portfolio
                  </a>
                </div>
              </div>

              {/* YATHARTH CARD */}
              <div
                style={{
                  padding: '20px',
                  backgroundColor: 'var(--vyora-surface)',
                  border: '1px solid var(--vyora-border-strong)',
                  borderRadius: '6px',
                  transition: 'all 0.3s var(--ease-cinematic)',
                  boxShadow: 'var(--shadow-sm)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'var(--vyora-accent-secondary)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(228, 107, 168, 0.25)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.borderColor = 'var(--vyora-border-strong)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
                  <img
                    src="/yatharth.jpg"
                    alt="Yatharth Developer Photo"
                    style={{
                      width: '58px',
                      height: '58px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid var(--vyora-accent-secondary)',
                      flexShrink: 0
                    }}
                  />
                  <div>
                    <h4
                      className="font-display"
                      style={{
                        fontSize: '1.3rem',
                        color: 'var(--vyora-text)',
                        margin: '0 0 2px 0',
                        lineHeight: 1
                      }}
                    >
                      YATHARTH
                    </h4>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                        color: 'var(--vyora-accent-secondary)',
                        textTransform: 'uppercase'
                      }}
                    >
                      Backend / AI
                    </span>
                  </div>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--vyora-text-muted)', margin: '0 0 14px 0', lineHeight: 1.4 }}>
                  "Builds the intelligence behind the recommendations."
                </p>

                {/* Developer Social Links */}
                <div style={{ display: 'flex', gap: '10px', borderTop: '1px dashed var(--vyora-border)', paddingTop: '10px', flexWrap: 'wrap' }}>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--vyora-text-muted)', fontSize: '0.75rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--vyora-accent-secondary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--vyora-text-muted)'}
                  >
                    <Globe size={12} /> GitHub
                  </a>
                  <a
                    href="#"
                    onClick={e => { e.preventDefault(); alert("Yatharth's LinkedIn URL: YOUR_LINKEDIN_URL"); }}
                    style={{ color: 'var(--vyora-text-muted)', fontSize: '0.75rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--vyora-accent-secondary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--vyora-text-muted)'}
                  >
                    LinkedIn
                  </a>
                  <a
                    href="#"
                    onClick={e => { e.preventDefault(); alert("Yatharth's Portfolio URL: YOUR_PORTFOLIO_URL"); }}
                    style={{ color: 'var(--vyora-text-muted)', fontSize: '0.75rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--vyora-accent-secondary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--vyora-text-muted)'}
                  >
                    Portfolio
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* DISCOVERY PATHS (Flex 1 1 200px) */}
          <div style={{ flex: '1 1 200px', minWidth: '180px' }}>
            <h4
              className="font-display"
              style={{
                fontSize: '1.15rem',
                color: 'var(--vyora-text)',
                textTransform: 'uppercase',
                marginBottom: '14px',
                letterSpacing: '0.06em'
              }}
            >
              DISCOVERY PATHS
            </h4>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <Link to="/movie-home" style={{ color: 'var(--vyora-text-muted)', textDecoration: 'none', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Film size={14} color="var(--vyora-accent)" />
                  <span>Reel Vibe Movie Home</span>
                </Link>
              </li>
              <li>
                <Link to="/library" style={{ color: 'var(--vyora-text-muted)', textDecoration: 'none', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Info size={14} color="var(--vyora-accent)" />
                  <span>Vibe Library</span>
                </Link>
              </li>
              <li>
                <Link to="/circle" style={{ color: 'var(--vyora-text-muted)', textDecoration: 'none', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Heart size={14} color="var(--vyora-accent)" />
                  <span>Vibe Circle Network</span>
                </Link>
              </li>
              <li>
                <Link to="/universe" style={{ color: 'var(--vyora-text-muted)', textDecoration: 'none', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={14} color="var(--vyora-accent)" />
                  <span>My Universe</span>
                </Link>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--vyora-text-muted)', textDecoration: 'none', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Globe size={14} color="var(--vyora-accent)" />
                  <span>GitHub Repository</span>
                </a>
              </li>
            </ul>
          </div>

          {/* KEEP VYORA BREWING + SUPPORT (Flex 1 1 200px) */}
          <div style={{ flex: '1 1 200px', minWidth: '180px' }}>
            <h4
              className="font-display"
              style={{
                fontSize: '1.15rem',
                color: 'var(--vyora-text)',
                textTransform: 'uppercase',
                marginBottom: '14px',
                letterSpacing: '0.06em'
              }}
            >
              SUPPORT
            </h4>

            {/* KEEP VYORA BREWING ☕ BUTTON */}
            <button
              type="button"
              onClick={() => setIsSupportModalOpen(true)}
              style={{
                width: '100%',
                padding: '12px 14px',
                backgroundColor: 'var(--vyora-surface)',
                border: '1.5px solid var(--vyora-accent)',
                borderRadius: '4px',
                fontSize: '0.82rem',
                fontWeight: 700,
                color: 'var(--vyora-accent)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'var(--vyora-accent)';
                e.currentTarget.style.color = '#120A18';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'var(--vyora-surface)';
                e.currentTarget.style.color = 'var(--vyora-accent)';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <Coffee size={16} />
              <span>KEEP VYORA BREWING ☕</span>
            </button>
          </div>
        </div>

        {/* ==================================================================
            4. THE VYORA PROMISE & TECHNICAL BUILT WITH BANNER
           ================================================================== */}
        <div
          style={{
            padding: '20px 24px',
            backgroundColor: 'var(--vyora-surface)',
            border: '1px solid var(--vyora-border-strong)',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '40px'
          }}
        >
          {/* VYORA Promise */}
          <div>
            <h5
              className="font-display"
              style={{
                fontSize: '1.2rem',
                color: 'var(--vyora-text)',
                margin: '0 0 4px 0',
                letterSpacing: '0.04em'
              }}
            >
              NO ENDLESS SCROLLING. JUST SOMETHING WORTH WATCHING.
            </h5>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--vyora-gold)', fontWeight: 700 }}>
              DISCOVER • FEEL • WATCH
            </span>
          </div>

          {/* Built With */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--vyora-text-muted)', fontWeight: 600 }}>
              BUILT WITH:
            </span>
            <span className="stamp-badge" style={{ fontSize: '0.7rem' }}>
              React • FastAPI • Python • Machine Learning
            </span>
          </div>
        </div>

        {/* ==================================================================
            5. CINEMATIC END CREDITS FOOTER BOTTOM
           ================================================================== */}
        <div
          style={{
            textAlign: 'center',
            paddingTop: '20px',
            borderTop: '1px dashed var(--vyora-border)',
            fontSize: '0.8rem',
            color: 'var(--vyora-text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <div>
            © 2026 VYORA <span className="vyora-mark">✦</span> FIND YOUR VIBE. ALL RIGHTS RESERVED.
          </div>
          <div style={{ fontStyle: 'italic', fontSize: '0.78rem', color: 'var(--vyora-accent)' }}>
            Cinematic End Credits • Built for cinephiles
          </div>
        </div>
      </div>

      {/* ==================================================================
          6. KEEP VYORA BREWING ☕ INTERACTIVE MODAL
         ================================================================== */}
      {isSupportModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 3000,
            backgroundColor: 'rgba(18, 10, 24, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          className="animate-fade-in"
          onClick={() => setIsSupportModalOpen(false)}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '440px',
              backgroundColor: 'var(--vyora-surface)',
              border: '2px solid var(--vyora-accent)',
              borderRadius: '8px',
              padding: '28px 24px',
              boxShadow: '0 20px 50px rgba(18, 10, 24, 0.9)',
              position: 'relative',
              textAlign: 'center'
            }}
          >
            {/* Close Modal Button */}
            <button
              onClick={() => setIsSupportModalOpen(false)}
              aria-label="Close support modal"
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'var(--vyora-bg-secondary)',
                color: 'var(--vyora-text)',
                border: '1px solid var(--vyora-border-strong)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={16} />
            </button>

            {/* Coffee Icon & Modal Header */}
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                backgroundColor: 'rgba(168, 117, 255, 0.15)',
                color: 'var(--vyora-accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                border: '1px solid var(--vyora-accent)'
              }}
            >
              <Coffee size={24} />
            </div>

            <h3
              className="font-display"
              style={{
                fontSize: '1.8rem',
                color: 'var(--vyora-text)',
                marginBottom: '8px'
              }}
            >
              KEEP VYORA BREWING ☕
            </h3>

            <p style={{ fontSize: '0.9rem', color: 'var(--vyora-text-muted)', marginBottom: '24px', lineHeight: 1.5 }}>
              Like what we're building? Help keep the vibes, servers, and caffeine alive.
            </p>

            {/* Stylized QR Code Visual Container */}
            <div
              style={{
                backgroundColor: 'var(--vyora-bg-secondary)',
                border: '1px dashed var(--vyora-border-strong)',
                borderRadius: '6px',
                padding: '20px',
                marginBottom: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <span className="stamp-badge-gold" style={{ fontSize: '0.65rem' }}>
                SCAN TO SUPPORT VYORA
              </span>

              {/* Placeholder QR Code Box */}
              <div
                style={{
                  width: '160px',
                  height: '160px',
                  backgroundColor: '#FFF',
                  padding: '10px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}
              >
                <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                  <rect width="100" height="100" fill="#FFF" />
                  <rect x="5" y="5" width="25" height="25" fill="#120A18" />
                  <rect x="9" y="9" width="17" height="17" fill="#FFF" />
                  <rect x="13" y="13" width="9" height="9" fill="#A875FF" />

                  <rect x="70" y="5" width="25" height="25" fill="#120A18" />
                  <rect x="74" y="9" width="17" height="17" fill="#FFF" />
                  <rect x="78" y="13" width="9" height="9" fill="#A875FF" />

                  <rect x="5" y="70" width="25" height="25" fill="#120A18" />
                  <rect x="9" y="74" width="17" height="17" fill="#FFF" />
                  <rect x="13" y="78" width="9" height="9" fill="#A875FF" />

                  <rect x="35" y="10" width="8" height="8" fill="#120A18" />
                  <rect x="48" y="10" width="12" height="8" fill="#A875FF" />
                  <rect x="10" y="35" width="8" height="12" fill="#120A18" />
                  <rect x="25" y="40" width="12" height="12" fill="#120A18" />
                  <rect x="45" y="35" width="15" height="15" fill="#120A18" />
                  <rect x="68" y="35" width="10" height="10" fill="#A875FF" />
                  <rect x="83" y="40" width="10" height="10" fill="#120A18" />
                  <rect x="38" y="55" width="14" height="8" fill="#120A18" />
                  <rect x="60" y="55" width="8" height="18" fill="#120A18" />
                  <rect x="75" y="70" width="15" height="15" fill="#A875FF" />
                  <rect x="40" y="75" width="22" height="10" fill="#120A18" />
                </svg>
              </div>

              <span style={{ fontSize: '0.72rem', color: 'var(--vyora-text-muted)' }}>
                Placeholder QR • Payment destination ready for setup
              </span>
            </div>

            {/* UPI ID Display & Copy Button */}
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--vyora-text-muted)', display: 'block', marginBottom: '6px' }}>
                UPI ID:
              </span>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 14px',
                  backgroundColor: 'var(--vyora-bg-secondary)',
                  border: '1px solid var(--vyora-border)',
                  borderRadius: '4px'
                }}
              >
                <code style={{ fontSize: '0.9rem', color: 'var(--vyora-gold)', fontWeight: 'bold' }}>
                  {placeholderUpi}
                </code>
                <button
                  type="button"
                  onClick={handleCopyUpi}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 10px',
                    backgroundColor: copiedUpi ? 'var(--vyora-accent)' : 'var(--vyora-surface)',
                    color: copiedUpi ? '#120A18' : 'var(--vyora-accent)',
                    border: '1px solid var(--vyora-accent)',
                    borderRadius: '3px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {copiedUpi ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copiedUpi ? 'UPI ID COPIED' : 'COPY UPI ID'}</span>
                </button>
              </div>
            </div>

            {/* Modal Close CTA */}
            <button
              type="button"
              onClick={() => setIsSupportModalOpen(false)}
              className="btn-cinematic-secondary"
              style={{ width: '100%', padding: '10px 16px', fontSize: '0.85rem' }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
