import React, { useState, useEffect } from 'react';
import { Sparkles, Film, ArrowRight } from 'lucide-react';

export default function IntroSplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // 60fps smooth progress increment over 5.0 seconds minimum
    const startTime = performance.now();
    const duration = 5000;

    let animationFrameId;

    const updateProgress = (currentTime) => {
      const elapsed = currentTime - startTime;
      const calculatedProgress = Math.min(100, Math.floor((elapsed / duration) * 100));

      setProgress(calculatedProgress);

      if (elapsed < duration) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        handleFinish();
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleFinish = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 450); // Matches smooth exit transition duration
  };

  return (
    <div
      className="gpu-accelerated"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#120A18',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? 'scale(1.05)' : 'scale(1)',
        transition: 'opacity 0.45s cubic-bezier(0.25, 1, 0.3, 1), transform 0.45s cubic-bezier(0.25, 1, 0.3, 1)',
        pointerEvents: isExiting ? 'none' : 'auto',
        overflow: 'hidden'
      }}
    >
      {/* Background Radial Glow & Cosmic Flares */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(90vw, 700px)',
          height: 'min(90vw, 700px)',
          background: 'radial-gradient(circle, rgba(168, 117, 255, 0.18) 0%, rgba(228, 107, 168, 0.08) 45%, transparent 70%)',
          pointerEvents: 'none',
          borderRadius: '50%',
          filter: 'blur(30px)'
        }}
        className="animate-glow"
      />

      {/* Floating Sparkle Elements */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0.3,
          background: 'radial-gradient(circle at 20% 20%, rgba(231, 196, 106, 0.15) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(168, 117, 255, 0.15) 0%, transparent 40%)'
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: '680px',
          width: '100%'
        }}
      >
        {/* Brand Culture Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            backgroundColor: 'rgba(168, 117, 255, 0.12)',
            border: '1px solid var(--vyora-accent)',
            borderRadius: '20px',
            marginBottom: '24px',
            boxShadow: 'var(--vyora-glow)'
          }}
          className="animate-fade-in"
        >
          <Sparkles size={14} color="var(--vyora-accent)" />
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--vyora-accent)'
            }}
          >
            ✦ CINEMATIC CULTURE ENGINE
          </span>
        </div>

        {/* 3D Visual Mascot & Text Composition Container */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            marginBottom: '20px',
            flexWrap: 'wrap'
          }}
        >
          {/* Main White Pet Mascot Photo / Character */}
          <div className="animate-mascot-intro gpu-accelerated" style={{ position: 'relative' }}>
            {/* Glowing Aura Ring behind mascot */}
            <div
              style={{
                position: 'absolute',
                inset: '-6px',
                borderRadius: '24px',
                background: 'linear-gradient(135deg, var(--vyora-accent), var(--vyora-gold), var(--vyora-accent-secondary))',
                opacity: 0.7,
                filter: 'blur(8px)'
              }}
              className="animate-glow"
            />
            <img
              src="/vyora-mascot.png"
              alt="VYORA Mascot Character"
              style={{
                width: 'clamp(90px, 16vw, 135px)',
                height: 'clamp(90px, 16vw, 135px)',
                borderRadius: '20px',
                objectFit: 'cover',
                border: '3px solid var(--vyora-accent)',
                boxShadow: '0 12px 36px rgba(168, 117, 255, 0.5)',
                position: 'relative',
                zIndex: 2,
                backgroundColor: 'var(--vyora-surface)'
              }}
            />
          </div>

          {/* 3D VYORA Title */}
          <div>
            <h1
              className="text-3d-vyora"
              style={{
                fontSize: 'clamp(3.8rem, 10vw, 7.2rem)',
                lineHeight: 0.95,
                margin: 0
              }}
            >
              VYORA <span className="vyora-mark text-shimmer">✦</span>
            </h1>
            <p
              className="font-display"
              style={{
                fontSize: 'clamp(1.4rem, 3.5vw, 2.4rem)',
                fontStyle: 'italic',
                color: 'var(--vyora-accent)',
                margin: '6px 0 0 0',
                letterSpacing: '0.04em'
              }}
            >
              Find Your Vibe.
            </p>
          </div>
        </div>

        {/* Dynamic Loading Progress Bar */}
        <div
          style={{
            width: '100%',
            maxWidth: '380px',
            marginTop: '28px',
            marginBottom: '20px'
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--vyora-text-muted)',
              marginBottom: '10px'
            }}
          >
            <span>INITIALIZING VIBE ENGINE...</span>
            <span style={{ color: 'var(--vyora-gold)' }}>{progress}%</span>
          </div>

          <div
            style={{
              width: '100%',
              height: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '3px',
              overflow: 'hidden',
              padding: '1px',
              border: '1px solid var(--vyora-border-strong)'
            }}
          >
            <div
              className="animate-progress-glow"
              style={{
                width: `${progress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, var(--vyora-accent), var(--vyora-gold), var(--vyora-accent-secondary))',
                borderRadius: '2px',
                transition: 'width 0.05s linear'
              }}
            />
          </div>
        </div>

        {/* Quick Skip CTA */}
        <button
          type="button"
          onClick={handleFinish}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 18px',
            backgroundColor: 'rgba(40, 21, 47, 0.6)',
            border: '1px solid var(--vyora-border)',
            borderRadius: '20px',
            color: 'var(--vyora-text-muted)',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            marginTop: '8px'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = 'var(--vyora-accent)';
            e.currentTarget.style.borderColor = 'var(--vyora-accent)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = 'var(--vyora-text-muted)';
            e.currentTarget.style.borderColor = 'var(--vyora-border)';
          }}
        >
          <span>ENTER VYORA</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}
