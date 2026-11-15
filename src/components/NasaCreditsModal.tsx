import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NASA_DATASETS } from '../data/nasaDatasets';
import { X, ExternalLink, Globe2, BookOpen, Music, CheckCircle2 } from 'lucide-react';

interface NasaCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NasaCreditsModal: React.FC<NasaCreditsModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto select-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-4xl bg-stone-900 border-2 border-antique-brass/40 rounded-xl p-6 sm:p-8 text-parchment-100 shadow-[0_25px_60px_rgba(0,0,0,0.9)] my-auto max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-800 text-parchment-400 hover:text-white border border-stone-700 transition-colors"
              aria-label="Close Credits Modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-antique-woodDark border border-antique-brass/50 flex items-center justify-center">
                <Globe2 className="w-5 h-5 text-antique-brass" />
              </div>
              <div>
                <span className="text-[10px] font-serif uppercase tracking-[0.25em] text-antique-brass font-bold block">
                  Scientific Documentation & Attribution
                </span>
                <h3 className="text-2xl font-serif font-black tracking-wide text-parchment-100">
                  NASA DATA & SONIFICATION SCIENCE
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-parchment-300 font-serif leading-relaxed mb-6">
              Earth Jukebox translates NASA Earth observation measurements into musical instruments through algorithmic data sonification. Nature produces endless physical patterns—temperature fluctuations, ocean currents, wind vorticity, and electrical atmospheric discharges. By mapping these dimensions into pitch, timbre, rhythm, and harmonic resonance, we experience Earth's living dynamics through the universal language of sound.
            </p>

            {/* Core Science Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-lg bg-stone-950/70 border border-stone-800">
                <div className="flex items-center space-x-2 text-cyan-300 font-serif font-bold text-xs mb-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Earth Observation Data</span>
                </div>
                <p className="text-[11px] text-parchment-400 font-sans leading-relaxed">
                  Data collected by satellites, airborne sensors, and ocean profiling floats that monitor Earth's interconnected climate, hydrosphere, atmosphere, and cryosphere.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-stone-950/70 border border-stone-800">
                <div className="flex items-center space-x-2 text-amber-300 font-serif font-bold text-xs mb-2">
                  <Music className="w-4 h-4" />
                  <span>Environmental Sonification</span>
                </div>
                <p className="text-[11px] text-parchment-400 font-sans leading-relaxed">
                  The systematic translation of numerical data into acoustic signals. Unlike artistic sound design, sonification establishes consistent rules linking scientific values to musical properties.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-stone-950/70 border border-stone-800">
                <div className="flex items-center space-x-2 text-emerald-300 font-serif font-bold text-xs mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Universal Accessibility</span>
                </div>
                <p className="text-[11px] text-parchment-400 font-sans leading-relaxed">
                  Auditory perception excels at detecting temporal periodicity, multi-dimensional interactions, and subtle anomalies, making complex datasets accessible to visually impaired and neurodiverse audiences.
                </p>
              </div>
            </div>

            {/* Datasets in Detail */}
            <h4 className="text-xs font-serif uppercase tracking-widest text-antique-brass mb-3 font-bold">
              Project Datasets & Scientific Sources
            </h4>

            <div className="space-y-4 mb-6">
              {/* Ocean Dataset */}
              <div className="p-4 rounded-lg bg-cyan-950/20 border border-cyan-800/40">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-serif font-bold text-cyan-200">
                    1. {NASA_DATASETS.ocean.topic}
                  </span>
                  <a
                    href={NASA_DATASETS.ocean.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-[11px] text-cyan-400 hover:text-cyan-200"
                  >
                    <span>NASA ECCO Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-parchment-300">
                  <div>
                    <span className="text-stone-500 font-serif text-[10px] uppercase block">Mission / Instrument</span>
                    <span>{NASA_DATASETS.ocean.mission}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 font-serif text-[10px] uppercase block">Environmental Variable</span>
                    <span>{NASA_DATASETS.ocean.environmentalVariable}</span>
                  </div>
                  <div className="sm:col-span-2 mt-1 pt-1 border-t border-cyan-900/40">
                    <span className="text-stone-500 font-serif text-[10px] uppercase block">Sonification Technique</span>
                    <span className="text-[11px] text-parchment-300">{NASA_DATASETS.ocean.audioMappingMethod}</span>
                  </div>
                </div>
              </div>

              {/* Lightning Dataset */}
              <div className="p-4 rounded-lg bg-amber-950/20 border border-amber-800/40">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-serif font-bold text-yellow-200">
                    2. {NASA_DATASETS.lightning.topic}
                  </span>
                  <a
                    href={NASA_DATASETS.lightning.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-[11px] text-yellow-400 hover:text-yellow-200"
                  >
                    <span>NASA GHRC DAAC</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-parchment-300">
                  <div>
                    <span className="text-stone-500 font-serif text-[10px] uppercase block">Mission / Instrument</span>
                    <span>{NASA_DATASETS.lightning.mission}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 font-serif text-[10px] uppercase block">Environmental Variable</span>
                    <span>{NASA_DATASETS.lightning.environmentalVariable}</span>
                  </div>
                  <div className="sm:col-span-2 mt-1 pt-1 border-t border-amber-900/40">
                    <span className="text-stone-500 font-serif text-[10px] uppercase block">Sonification Technique</span>
                    <span className="text-[11px] text-parchment-300">{NASA_DATASETS.lightning.audioMappingMethod}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Challenge Reference */}
            <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-lg bg-stone-950 border border-stone-800 text-xs text-parchment-400 gap-2">
              <span>
                Inspired by the <strong>NASA Space Apps Challenge 2026</strong>: The Earth Information Jukebox
              </span>
              <a
                href="https://www.spaceappschallenge.org/2026/challenges/the-earth-information-jukebox/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-antique-brass hover:text-antique-brassLight underline flex items-center space-x-1"
              >
                <span>Challenge Brief</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
