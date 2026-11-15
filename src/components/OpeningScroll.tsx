import React, { useState } from 'react';
import { useAudio } from '../context/AudioContext';
import { Volume2, VolumeX } from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { GITHUB_REPO_URL } from '../data/storyConfig';

interface OpeningScrollProps {
  onBeginJourney: () => void;
}

export const OpeningScroll: React.FC<OpeningScrollProps> = ({ onBeginJourney }) => {
  const { playSealCrack, isMuted, toggleMute } = useAudio();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleStart = () => {
    playSealCrack();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.resume();
        const primer = new SpeechSynthesisUtterance('');
        primer.volume = 0;
        window.speechSynthesis.speak(primer);
      } catch (e) {
        // Safe fallback
      }
    }
    setTimeout(() => {
      onBeginJourney();
    }, 150);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black flex items-center justify-center select-none">
      {/* =========================================================================
          BACKGROUND AMBIENT BLUR BACKDROP
          Fills any margins on ultrawide or tall screens with ambient colors
         ========================================================================= */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-3xl opacity-40 scale-125 pointer-events-none"
        style={{ backgroundImage: `url('/images/opening/s0_start.png'), url('/images/s0 start.png')` }}
      />

      {/* =========================================================================
          HERO CANVAS: SHARED SVG VIEWBOX (0 0 1672 941)
          Full Screen Edge-to-Edge with preserveAspectRatio="xMidYMid slice"
          Both the full-screen illustration and the START JOURNEY button reside
          in the exact same coordinate system, locked to the painted plate!
         ========================================================================= */}
      <svg
        viewBox="0 0 1672 941"
        preserveAspectRatio="xMidYMid slice"
        className="relative z-10 w-full h-full"
      >
        <defs>
          {/* Subtle warm button glow filter */}
          <filter id="buttonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Button plate gradient */}
          <linearGradient id="plateGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#301b10" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#1a0f08" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#28160c" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="plateHoverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#452716" stopOpacity="0.98" />
            <stop offset="50%" stopColor="#2a170d" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#3d2112" stopOpacity="0.98" />
          </linearGradient>
        </defs>

        {/* 1. Full-Resolution Base Illustration */}
        <image
          href="/images/opening/s0_start.png"
          width="1672"
          height="941"
          preserveAspectRatio="none"
        />

        {/* 2. 100% FIXED START JOURNEY BUTTON (Locked at X: 616 to 1056, Y: 764 to 820) */}
        <g
          role="button"
          tabIndex={0}
          onClick={handleStart}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleStart();
            }
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="cursor-pointer outline-none select-none"
          style={{ cursor: 'pointer' }}
        >
          {/* Subtle Ambient Golden Glow Behind Plate */}
          <polygon
            points="630,764 1042,764 1056,778 1056,806 1042,820 630,820 616,806 616,778"
            fill={isHovered ? 'rgba(245, 158, 11, 0.3)' : 'rgba(217, 119, 6, 0.12)'}
            filter="url(#buttonGlow)"
            className="transition-colors duration-200"
          />

          {/* Outer Beveled Button Plate */}
          <polygon
            points="630,764 1042,764 1056,778 1056,806 1042,820 630,820 616,806 616,778"
            fill={isHovered ? 'url(#plateHoverGrad)' : 'url(#plateGrad)'}
            stroke={isHovered ? '#fde047' : '#d97706'}
            strokeWidth={isHovered ? '2.5' : '1.8'}
            className="transition-colors duration-200"
          />

          {/* Inner Decorative Inset Line */}
          <polygon
            points="631,768 1041,768 1052,779 1052,805 1041,816 631,816 620,805 620,779"
            fill="none"
            stroke={isHovered ? 'rgba(253, 224, 71, 0.75)' : 'rgba(217, 119, 6, 0.45)'}
            strokeWidth="1"
            className="transition-colors duration-200"
          />

          {/* Button Text: START JOURNEY with properly spaced Play Triangle */}
          <text
            x="836"
            y="792"
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily="'Cinzel', 'Spectral', Georgia, serif"
            fontWeight="800"
            fontSize="18"
            letterSpacing="0.22em"
            fill={isHovered ? '#fffbeb' : '#edd19c'}
            className="transition-colors duration-200"
            style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
          >
            START JOURNEY
            <tspan dx="18" fontSize="13" fill={isHovered ? '#fffbeb' : '#edd19c'}>
              ▶
            </tspan>
          </text>
        </g>
      </svg>

      {/* Floating subtle ambient candle dust particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-amber-300/25 blur-[1px] animate-drift"
            style={{
              width: `${Math.random() * 3 + 2}px`,
              height: `${Math.random() * 3 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 7 + 6}s`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Top Right: GitHub Repository Link & Audio Toggle */}
      <header className="absolute top-5 right-6 z-30 pointer-events-auto flex items-center space-x-3">
        {/* GitHub Repository Link */}
        <a
          href={GITHUB_REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center space-x-2 px-3.5 py-2 rounded-full bg-stone-950/75 border border-antique-brass/40 text-parchment-300 hover:text-white hover:border-antique-brass hover:bg-stone-900/90 backdrop-blur-md transition-all duration-200 shadow-xl hover:shadow-amber-500/10 hover:scale-105"
          title="Open GitHub Repository"
        >
          <GithubIcon className="w-4 h-4 text-parchment-300 group-hover:text-antique-brass transition-colors" />
          <span className="text-[11px] font-serif uppercase tracking-widest font-bold">
            GitHub
          </span>
        </a>

        {/* Audio Toggle */}
        <button
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
          className="p-2.5 rounded-full bg-stone-950/70 border border-antique-brass/40 text-antique-brass hover:text-antique-brassLight hover:border-antique-brass hover:bg-stone-900 transition-all duration-200 shadow-xl backdrop-blur-md"
          title={isMuted ? "Unmute Audio" : "Mute Audio"}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </header>
    </div>
  );
};
