import React, { useState, useEffect, useRef } from 'react';
import MascotFrames from './MascotFrames';
import PandaFrames from './PandaFrames';
import './VyoraPet.css';

/**
 * PetSpeechBubble Component
 * Positioned directly above the head of the clicked pet
 */
function PetSpeechBubble({ text, direction, onClose }) {
  if (!text) return null;

  return (
    <div
      className="vyora-pet-speech-bubble"
      style={{
        transform: `translateX(-50%) ${direction === -1 ? 'scaleX(-1)' : 'scaleX(1)'}`
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <span>{text}</span>
      <div className="vyora-pet-bubble-arrow" />
    </div>
  );
}

export default function VyoraPet() {
  // =========================================================================
  // PET 1 (Original White Mascot) State
  // =========================================================================
  const [pet1Frame, setPet1Frame] = useState('idle-1');
  const [pet1State, setPet1State] = useState('IDLE'); // 'IDLE' | 'WALKING' | 'SITTING' | 'WAVING' | 'TURNING' | 'HOPPING'
  const [pet1X, setPet1X] = useState(140);
  const [pet1Y, setPet1Y] = useState(0); // Vertical bounce offset for organic walking
  const [pet1Dir, setPet1Dir] = useState(1);
  const [pet1Clicked, setPet1Clicked] = useState(false);

  // =========================================================================
  // PET 2 (VYORA Panda Mascot) State
  // =========================================================================
  const [pet2Frame, setPet2Frame] = useState('idle-1');
  const [pet2State, setPet2State] = useState('IDLE');
  const [pet2X, setPet2X] = useState(540);
  const [pet2Y, setPet2Y] = useState(0);
  const [pet2Dir, setPet2Dir] = useState(-1);
  const [pet2Clicked, setPet2Clicked] = useState(false);

  // Unified Speech Bubble State
  const [activePet, setActivePet] = useState(null); // 'MASCOT' | 'PANDA' | null
  const [speechText, setSpeechText] = useState('');

  const containerRef = useRef(null);
  const timerRef = useRef(null);
  const stepCount1Ref = useRef(0);
  const stepCount2Ref = useRef(0);

  // Pet 1 Phrases (White Mascot)
  const pet1Phrases = [
    "Found your vibe yet? ✨",
    "Movies taste better when they're your vibe.",
    "Keep exploring. 👀",
    "Your next obsession is somewhere here.",
    "VYORA knows a little something. 🤫"
  ];

  // Pet 2 Phrases (Panda Mascot)
  const pet2Phrases = [
    "I approve this vibe. 🐼",
    "That one looks interesting...",
    "Need a comfort movie?",
    "Your vibe is looking suspiciously good.",
    "One more movie. Trust me."
  ];

  // =========================================================================
  // 1. PET 1 PLAYFUL ENGINE (Organic Vertical Bobbing & Boundary Turning)
  // =========================================================================
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setPet1Frame('idle-1');
      return;
    }

    const walkFrames = ['walk-1', 'walk-2', 'walk-3', 'walk-4'];
    let wIdx = 0;
    const idleFrames = ['idle-1', 'idle-1', 'idle-1', 'idle-2'];
    let iIdx = 0;
    const waveFrames = ['wave-1', 'wave-2', 'wave-3', 'wave-2'];
    let wvIdx = 0;

    const interval = setInterval(() => {
      if (pet1State === 'WALKING') {
        wIdx = (wIdx + 1) % walkFrames.length;
        setPet1Frame(walkFrames[wIdx]);

        stepCount1Ref.current += 1;
        // Organic vertical bounce while walking (sine-wave trot)
        const bounce = Math.abs(Math.sin(stepCount1Ref.current * 0.7)) * 4.5;
        setPet1Y(-bounce);

        setPet1X(prevX => {
          const containerWidth = containerRef.current ? containerRef.current.clientWidth : 800;
          const minX = 20;
          const maxX = containerWidth - 80;

          // Organic speed variation
          const speed = 2.4 + (Math.sin(stepCount1Ref.current * 0.3) + 1) * 0.8;
          let nextX = prevX + (pet1Dir * speed);

          if (nextX >= maxX) {
            setPet1Dir(-1);
            setPet1State('TURNING');
            return maxX - 4;
          }
          if (nextX <= minX) {
            setPet1Dir(1);
            setPet1State('TURNING');
            return minX + 4;
          }
          return nextX;
        });

      } else if (pet1State === 'IDLE') {
        setPet1Y(0);
        iIdx = (iIdx + 1) % idleFrames.length;
        setPet1Frame(idleFrames[iIdx]);
      } else if (pet1State === 'SITTING') {
        setPet1Y(0);
        setPet1Frame('sit-2');
      } else if (pet1State === 'WAVING') {
        setPet1Y(0);
        wvIdx = (wvIdx + 1) % waveFrames.length;
        setPet1Frame(waveFrames[wvIdx]);
      } else if (pet1State === 'HOPPING') {
        setPet1Y(-8);
        setPet1Frame('wave-2');
      } else if (pet1State === 'TURNING') {
        setPet1Y(0);
        setPet1Frame('turn-1');
      }
    }, 130);

    return () => clearInterval(interval);
  }, [pet1State, pet1Dir]);

  // Pet 1 Playful Behavior Scheduler
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    let isMounted = true;
    const runCycle = () => {
      if (!isMounted) return;
      const r = Math.random();
      if (r < 0.42) {
        setPet1State('WALKING');
        setTimeout(() => {
          if (isMounted) setPet1State(Math.random() > 0.5 ? 'IDLE' : 'SITTING');
        }, Math.floor(Math.random() * 2500) + 2000);
      } else if (r < 0.65) {
        setPet1State('IDLE');
      } else if (r < 0.80) {
        setPet1State('HOPPING');
        setTimeout(() => { if (isMounted) setPet1State('IDLE'); }, 600);
      } else if (r < 0.92) {
        setPet1State('WAVING');
      } else {
        setPet1State('TURNING');
        setTimeout(() => {
          if (isMounted) {
            setPet1Dir(d => -d);
            setPet1State('WALKING');
          }
        }, 350);
      }
    };

    const interval = setInterval(runCycle, Math.floor(Math.random() * 3000) + 4000);
    return () => { isMounted = false; clearInterval(interval); };
  }, []);

  // =========================================================================
  // 2. PET 2 PLAYFUL ENGINE (Panda Trot, Vertical Bobbing & Turning)
  // =========================================================================
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setPet2Frame('idle-1');
      return;
    }

    const walkFrames = ['walk-1', 'walk-2', 'walk-3', 'walk-4'];
    let wIdx = 0;
    const idleFrames = ['idle-1', 'idle-1', 'idle-1', 'idle-2'];
    let iIdx = 0;
    const waveFrames = ['wave-1', 'wave-2', 'wave-3', 'wave-2'];
    let wvIdx = 0;

    const interval = setInterval(() => {
      if (pet2State === 'WALKING') {
        wIdx = (wIdx + 1) % walkFrames.length;
        setPet2Frame(walkFrames[wIdx]);

        stepCount2Ref.current += 1;
        // Organic vertical bounce while panda trots
        const bounce = Math.abs(Math.sin(stepCount2Ref.current * 0.65)) * 4.5;
        setPet2Y(-bounce);

        setPet2X(prevX => {
          const containerWidth = containerRef.current ? containerRef.current.clientWidth : 800;
          const minX = 20;
          const maxX = containerWidth - 80;

          const speed = 2.2 + (Math.cos(stepCount2Ref.current * 0.35) + 1) * 0.7;
          let nextX = prevX + (pet2Dir * speed);

          if (nextX >= maxX) {
            setPet2Dir(-1);
            setPet2State('TURNING');
            return maxX - 4;
          }
          if (nextX <= minX) {
            setPet2Dir(1);
            setPet2State('TURNING');
            return minX + 4;
          }
          return nextX;
        });

      } else if (pet2State === 'IDLE') {
        setPet2Y(0);
        iIdx = (iIdx + 1) % idleFrames.length;
        setPet2Frame(idleFrames[iIdx]);
      } else if (pet2State === 'SITTING') {
        setPet2Y(0);
        setPet2Frame('sit-2');
      } else if (pet2State === 'WAVING') {
        setPet2Y(0);
        wvIdx = (wvIdx + 1) % waveFrames.length;
        setPet2Frame(waveFrames[wvIdx]);
      } else if (pet2State === 'HOPPING') {
        setPet2Y(-8);
        setPet2Frame('wave-2');
      } else if (pet2State === 'TURNING') {
        setPet2Y(0);
        setPet2Frame('turn-1');
      }
    }, 130);

    return () => clearInterval(interval);
  }, [pet2State, pet2Dir]);

  // Pet 2 Playful Behavior Scheduler
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    let isMounted = true;
    const runCycle = () => {
      if (!isMounted) return;
      const r = Math.random();
      if (r < 0.42) {
        setPet2State('WALKING');
        setTimeout(() => {
          if (isMounted) setPet2State(Math.random() > 0.5 ? 'IDLE' : 'SITTING');
        }, Math.floor(Math.random() * 2500) + 2200);
      } else if (r < 0.65) {
        setPet2State('IDLE');
      } else if (r < 0.80) {
        setPet2State('HOPPING');
        setTimeout(() => { if (isMounted) setPet2State('IDLE'); }, 600);
      } else if (r < 0.92) {
        setPet2State('WAVING');
      } else {
        setPet2State('TURNING');
        setTimeout(() => {
          if (isMounted) {
            setPet2Dir(d => -d);
            setPet2State('WALKING');
          }
        }, 350);
      }
    };

    const interval = setInterval(runCycle, Math.floor(Math.random() * 3200) + 4500);
    return () => { isMounted = false; clearInterval(interval); };
  }, []);

  // =========================================================================
  // 3. INTER-MASCOT PROXIMITY CHECK (Playful Social Hello when meeting)
  // =========================================================================
  useEffect(() => {
    const dist = Math.abs(pet1X - pet2X);
    if (dist < 80 && pet1State === 'WALKING' && pet2State === 'WALKING') {
      // Mascot 1 turns away or waves playfully
      setPet1State('WAVING');
      setPet2State('HOPPING');
      setTimeout(() => {
        setPet1Dir(d => -d);
        setPet2Dir(d => -d);
        setPet1State('WALKING');
        setPet2State('WALKING');
      }, 900);
    }
  }, [pet1X, pet2X, pet1State, pet2State]);

  // =========================================================================
  // 4. INTERACTIVE CLICK HANDLERS & SPEECH BUBBLE MANAGER
  // =========================================================================
  const handlePet1Click = (e) => {
    e.stopPropagation();
    setPet1Clicked(true);
    setPet1State('WAVING');

    const randomMsg = pet1Phrases[Math.floor(Math.random() * pet1Phrases.length)];
    triggerSpeechBubble('MASCOT', randomMsg);

    setTimeout(() => setPet1Clicked(false), 600);
  };

  const handlePet2Click = (e) => {
    e.stopPropagation();
    setPet2Clicked(true);
    setPet2State('WAVING');

    const randomMsg = pet2Phrases[Math.floor(Math.random() * pet2Phrases.length)];
    triggerSpeechBubble('PANDA', randomMsg);

    setTimeout(() => setPet2Clicked(false), 600);
  };

  const triggerSpeechBubble = (petType, msg) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActivePet(petType);
    setSpeechText(msg);

    timerRef.current = setTimeout(() => {
      setActivePet(null);
      setSpeechText('');
    }, 3800);
  };

  return (
    <div className="vyora-pet-floor" ref={containerRef}>
      {/* Ground Track Accents */}
      <div className="vyora-pet-ground-track">
        <span>✦</span>
        <span>✨</span>
        <span>✦</span>
        <span>✨</span>
        <span>✦</span>
      </div>

      {/* ===================================================================
          PET 1: Original White Mascot
         =================================================================== */}
      <div
        className={`vyora-pet-character ${pet1Clicked ? 'pet-clicked' : ''} ${pet1State === 'HOPPING' ? 'pet-hopping' : ''}`}
        style={{
          transform: `translate3d(${pet1X}px, ${pet1Y}px, 0) ${pet1Dir === -1 ? 'scaleX(-1)' : 'scaleX(1)'}`
        }}
        onClick={handlePet1Click}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handlePet1Click(e); }}
        role="button"
        tabIndex={0}
        aria-label="Talk to VYORA mascot"
        title="VYORA Mascot — Click to talk!"
      >
        {/* Speech Bubble for Pet 1 */}
        {activePet === 'MASCOT' && (
          <PetSpeechBubble
            text={speechText}
            direction={pet1Dir}
            onClose={() => setActivePet(null)}
          />
        )}

        <div className="vyora-pet-frame-wrap">
          <MascotFrames frameName={pet1Frame} width={54} height={54} />
        </div>
        <div className="vyora-pet-contact-shadow" />
      </div>

      {/* ===================================================================
          PET 2: VYORA Panda Mascot
         =================================================================== */}
      <div
        className={`vyora-pet-character ${pet2Clicked ? 'pet-clicked' : ''} ${pet2State === 'HOPPING' ? 'pet-hopping' : ''}`}
        style={{
          transform: `translate3d(${pet2X}px, ${pet2Y}px, 0) ${pet2Dir === -1 ? 'scaleX(-1)' : 'scaleX(1)'}`
        }}
        onClick={handlePet2Click}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handlePet2Click(e); }}
        role="button"
        tabIndex={0}
        aria-label="Talk to VYORA panda"
        title="VYORA Panda Mascot — Click to talk!"
      >
        {/* Speech Bubble for Pet 2 */}
        {activePet === 'PANDA' && (
          <PetSpeechBubble
            text={speechText}
            direction={pet2Dir}
            onClose={() => setActivePet(null)}
          />
        )}

        <div className="vyora-pet-frame-wrap">
          <PandaFrames frameName={pet2Frame} width={54} height={54} />
        </div>
        <div className="vyora-pet-contact-shadow" />
      </div>
    </div>
  );
}
