import React from 'react';
import { motion } from 'framer-motion';
import { useAudio } from '../context/AudioContext';
import { Volume2, VolumeX, RotateCcw } from 'lucide-react';

interface NarratorPortraitProps {
  currentText: string;
}

export const NarratorPortrait: React.FC<NarratorPortraitProps> = ({ currentText }) => {
  const { isSpeaking, speechEnabled, toggleSpeechNarration, speakNarration, isMuted } = useAudio();

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    speakNarration(currentText);
  };

  const handleToggleVoice = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSpeechNarration();
    if (!speechEnabled) {
      speakNarration(currentText);
    }
  };

  return (
    <div className="flex items-center space-x-3.5 select-none">
      {/* Animated Narrator Avatar Container */}
      <div className="relative group flex-shrink-0">
        {/* Subtle Ambient Aura when speaking */}
        <motion.div
          animate={{
            scale: isSpeaking ? [1, 1.12, 1] : 1,
            opacity: isSpeaking ? [0.6, 0.9, 0.6] : 0.2,
          }}
          transition={{ repeat: Infinity, duration: isSpeaking ? 1.8 : 3, ease: 'easeInOut' }}
          className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-500/50 via-cyan-500/30 to-amber-600/50 blur-sm pointer-events-none"
        />

        {/* Narrator Portrait Circle */}
        <div
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-antique-brass bg-stone-900 shadow-2xl overflow-hidden flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-105"
          onClick={handleReplay}
          title="Click to replay narration"
        >
          {/* User's Canonical Narrator Artwork */}
          <img
            src="/images/characters/narrator.png"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/narattor.png';
            }}
            alt="The Chronicler"
            className="w-full h-full object-cover object-center pointer-events-none select-none"
          />

          {/* Speaking indicator dot */}
          {isSpeaking && (
            <span className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-amber-400 border border-stone-900 animate-pulse" />
          )}
        </div>
      </div>

      {/* Narrator Controls & Badge */}
      <div className="flex flex-col min-w-[130px]">
        <div className="flex items-center space-x-1.5 h-5">
          <span className="text-[11px] font-serif uppercase tracking-widest text-parchment-300 font-bold whitespace-nowrap">
            The Chronicler
          </span>
          {isSpeaking ? (
            <span className="text-[9px] uppercase px-1.5 py-0.5 rounded-full bg-amber-500/25 text-amber-300 border border-amber-500/40 animate-pulse font-sans leading-none">
              Speaking
            </span>
          ) : (
            <span className="text-[9px] uppercase px-1.5 py-0.5 rounded-full text-stone-500 font-sans leading-none">
              Narrator
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2 mt-0.5">
          <button
            onClick={handleReplay}
            className="flex items-center space-x-1 text-[10px] text-parchment-400 hover:text-antique-brass transition-colors"
            title="Replay Voice Narration"
          >
            <RotateCcw className="w-2.5 h-2.5" />
            <span>Replay</span>
          </button>

          <span className="text-stone-600 text-[10px]">•</span>

          <button
            onClick={handleToggleVoice}
            className={`flex items-center space-x-1 text-[10px] transition-colors ${
              speechEnabled && !isMuted ? 'text-antique-brass hover:text-antique-brassLight' : 'text-stone-500 hover:text-stone-400'
            }`}
            title={speechEnabled ? "Mute Voice Narration" : "Enable Voice Narration"}
          >
            {speechEnabled && !isMuted ? <Volume2 className="w-2.5 h-2.5" /> : <VolumeX className="w-2.5 h-2.5" />}
            <span>{speechEnabled && !isMuted ? 'Voice On' : 'Voice Off'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
