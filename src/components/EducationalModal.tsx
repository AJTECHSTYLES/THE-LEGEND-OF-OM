import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NASA_DATASETS } from '../data/nasaDatasets';
import { useAudio } from '../context/AudioContext';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  ExternalLink,
  X,
  Radio,
  Layers,
  Sparkles,
  Waves,
  Zap,
} from 'lucide-react';

interface EducationalModalProps {
  type: 'ocean' | 'lightning';
  isOpen: boolean;
  onClose: () => void;
}

export const EducationalModal: React.FC<EducationalModalProps> = ({ type, isOpen, onClose }) => {
  const data = NASA_DATASETS[type];
  const {
    activeSonification,
    isPlayingAudio,
    toggleSonification,
    playSonification,
    volume,
    setVolume,
    isMuted,
    toggleMute,
    playClick,
  } = useAudio();

  const isOcean = type === 'ocean';
  const trackId = isOcean ? 'ocean' : 'lightning';
  const isThisPlaying = activeSonification === trackId && isPlayingAudio;

  const themeColors = isOcean
    ? {
        border: 'border-cyan-500/40',
        glow: 'shadow-[0_0_40px_rgba(6,182,212,0.15)]',
        accentBg: 'bg-cyan-950/40',
        badge: 'bg-cyan-900/60 text-cyan-200 border-cyan-500/30',
        headerText: 'text-cyan-300',
        button: 'from-cyan-700 to-sky-900 hover:from-cyan-600 hover:to-sky-800 text-cyan-100',
        icon: <Waves className="w-5 h-5 text-cyan-300" />,
      }
    : {
        border: 'border-yellow-500/40',
        glow: 'shadow-[0_0_40px_rgba(234,179,8,0.15)]',
        accentBg: 'bg-amber-950/40',
        badge: 'bg-amber-900/60 text-yellow-200 border-yellow-500/30',
        headerText: 'text-yellow-300',
        button: 'from-amber-600 to-yellow-800 hover:from-amber-500 hover:to-yellow-700 text-yellow-100',
        icon: <Zap className="w-5 h-5 text-yellow-300" />,
      };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3 }}
            className={`relative w-full max-w-3xl bg-stone-900/95 rounded-xl border ${themeColors.border} ${themeColors.glow} p-6 sm:p-8 text-parchment-100 shadow-2xl my-auto`}
          >
            {/* Close Button */}
            <button
              onClick={() => {
                playClick();
                onClose();
              }}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-800/80 text-parchment-300 hover:text-white hover:bg-stone-700 transition-colors border border-stone-700"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header Badge & Title */}
            <div className="flex items-center space-x-2.5 mb-2">
              <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-serif uppercase tracking-widest border ${themeColors.badge}`}>
                {themeColors.icon}
                <span>NASA Earth Observation Sonification</span>
              </span>
            </div>

            <h3 className={`text-2xl sm:text-3xl font-serif font-black ${themeColors.headerText} mb-2 tracking-wide`}>
              {data.topic}
            </h3>

            <p className="text-xs sm:text-sm text-parchment-300 font-serif leading-relaxed mb-6">
              {data.scientificSummary}
            </p>

            {/* Visual Process Diagram: Visualization -> Data Extraction -> Musical Mapping -> Instrument Sound */}
            <div className="mb-6 p-4 rounded-lg bg-black/40 border border-stone-800">
              <div className="text-[11px] uppercase tracking-wider font-serif text-parchment-400 mb-3 flex items-center space-x-1.5">
                <Layers className="w-3.5 h-3.5 text-antique-brass" />
                <span>The Sonification Pipeline</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
                {data.diagramSteps.map((step, idx) => (
                  <div key={idx} className="relative flex flex-col items-center p-3 rounded bg-stone-800/60 border border-stone-700/60">
                    <div className="w-6 h-6 rounded-full bg-stone-900 border border-antique-brass/40 text-[11px] font-bold text-antique-brass flex items-center justify-center mb-1.5">
                      {step.step}
                    </div>
                    <h4 className="text-xs font-serif font-bold text-parchment-100 mb-1">
                      {step.title}
                    </h4>
                    <p className="text-[11px] text-parchment-400 font-sans leading-tight">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Dedicated Audio Listening Interface */}
            <div className={`p-4 sm:p-5 rounded-lg border ${themeColors.border} ${themeColors.accentBg} mb-6 flex flex-col sm:flex-row items-center justify-between gap-4`}>
              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-stone-900 border border-stone-700 shadow-inner ${isThisPlaying ? 'animate-pulse' : ''}`}>
                  <Radio className={`w-6 h-6 ${isOcean ? 'text-cyan-400' : 'text-yellow-400'}`} />
                </div>
                <div>
                  <h4 className="text-sm font-serif font-bold text-parchment-100">
                    {isOcean ? 'Listen to the Ocean' : 'Listen to the Storm'}
                  </h4>
                  <p className="text-xs text-parchment-400">
                    {isOcean ? 'Flute translation of global ocean currents' : 'Electric guitar translation of lightning transients'}
                  </p>
                </div>
              </div>

              {/* Audio Controls */}
              <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
                <button
                  onClick={() => toggleSonification(trackId)}
                  className={`flex items-center space-x-2 px-5 py-2.5 rounded-full bg-gradient-to-r ${themeColors.button} font-serif text-xs uppercase tracking-wider font-bold shadow-lg border border-stone-600 transition-all`}
                >
                  {isThisPlaying ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>{isOcean ? 'Play Ocean Flute' : 'Play Storm Guitar'}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => playSonification(trackId)}
                  className="p-2.5 rounded-full bg-stone-800 border border-stone-700 text-parchment-300 hover:text-white"
                  title="Replay from start"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Volume slider */}
                <div className="flex items-center space-x-1.5 bg-stone-800/80 px-3 py-1.5 rounded-full border border-stone-700">
                  <button onClick={toggleMute} className="text-parchment-400 hover:text-white">
                    {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-16 h-1 bg-stone-700 rounded-lg accent-antique-brass cursor-pointer"
                    aria-label="Volume slider"
                  />
                </div>
              </div>
            </div>

            {/* Scientific Metadata & Official Attribution */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans text-parchment-300 bg-stone-950/60 p-4 rounded-lg border border-stone-800/80">
              <div>
                <span className="text-stone-500 uppercase font-serif tracking-wider text-[10px] block">
                  NASA Mission / Sensor
                </span>
                <span className="font-semibold text-parchment-200">
                  {data.mission}
                </span>
                <span className="text-stone-400 block mt-0.5 text-[11px]">
                  {data.instrument}
                </span>
              </div>

              <div>
                <span className="text-stone-500 uppercase font-serif tracking-wider text-[10px] block">
                  Environmental Variable
                </span>
                <span className="text-parchment-200">
                  {data.environmentalVariable}
                </span>
              </div>

              <div className="sm:col-span-2 pt-2 border-t border-stone-800/60 flex items-center justify-between flex-wrap gap-2">
                <span className="text-[10px] text-stone-400 font-serif">
                  Attribution: {data.attribution}
                </span>

                <a
                  href={data.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-[11px] text-antique-brass hover:text-antique-brassLight underline underline-offset-2"
                >
                  <span>Explore NASA Data Portal</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>
            </div>

            {/* Resume Story Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  playClick();
                  onClose();
                }}
                className="px-6 py-2.5 rounded-full bg-stone-800 hover:bg-stone-700 text-parchment-200 border border-stone-600 font-serif text-xs uppercase tracking-wider transition-colors shadow-md flex items-center space-x-2"
              >
                <span>Continue Journey</span>
                <Sparkles className="w-3.5 h-3.5 text-antique-brass" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
