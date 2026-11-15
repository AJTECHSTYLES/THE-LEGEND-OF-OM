import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from '../context/AudioContext';
import { PERSONALIZED_INTRO } from '../data/nasaDatasets';
import {
  Power,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Sliders,
  Music,
  Waves,
  Zap,
  Globe2,
  Upload,
} from 'lucide-react';

interface EarthJukeboxInterfaceProps {
  onRestartStory: () => void;
}

export const EarthJukeboxInterface: React.FC<EarthJukeboxInterfaceProps> = ({ onRestartStory }) => {
  const [isPoweredOn, setIsPoweredOn] = useState<boolean>(true);
  const [selectedTrack, setSelectedTrack] = useState<'ocean' | 'lightning' | 'combined'>('combined');

  const {
    activeSonification,
    isPlayingAudio,
    playSonification,
    stopSonification,
    playClick,
    customAudio,
    loadCustomAudioFile,
    isMuted,
    toggleMute,
  } = useAudio();

  const handlePowerToggle = () => {
    playClick();
    if (isPoweredOn) {
      stopSonification();
      setIsPoweredOn(false);
    } else {
      setIsPoweredOn(true);
      playSonification(selectedTrack);
    }
  };

  const handleTrackSelect = (track: 'ocean' | 'lightning' | 'combined') => {
    setSelectedTrack(track);
    if (isPoweredOn) {
      playSonification(track);
    }
  };

  const handleFileUpload = (track: 'ocean' | 'lightning' | 'combined', e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      loadCustomAudioFile(track, e.target.files[0]);
    }
  };

  const isCurrentPlaying = (track: 'ocean' | 'lightning' | 'combined') =>
    isPoweredOn && activeSonification === track && isPlayingAudio;

  return (
    <div className="relative w-full max-w-5xl mx-auto p-4 sm:p-6 select-none">
      {/* Outer Vintage Brass & Wood Console Housing */}
      <div className="relative rounded-2xl bg-[#1b1511] border-4 border-[#8c673b] shadow-[0_25px_60px_rgba(0,0,0,0.9),inset_0_2px_8px_rgba(255,255,255,0.15)] p-5 sm:p-8 overflow-hidden">
        {/* Subtle brass screw heads in four corners */}
        <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-antique-brass border border-yellow-700 shadow-inner flex items-center justify-center">
          <div className="w-1.5 h-[1px] bg-stone-900 rotate-45" />
        </div>
        <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-antique-brass border border-yellow-700 shadow-inner flex items-center justify-center">
          <div className="w-1.5 h-[1px] bg-stone-900 rotate-12" />
        </div>
        <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-antique-brass border border-yellow-700 shadow-inner flex items-center justify-center">
          <div className="w-1.5 h-[1px] bg-stone-900 -rotate-45" />
        </div>
        <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-antique-brass border border-yellow-700 shadow-inner flex items-center justify-center">
          <div className="w-1.5 h-[1px] bg-stone-900 rotate-90" />
        </div>

        {/* Console Header Plate */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-6 mb-6 border-b border-[#5c4028]/60 gap-4">
          <div className="flex items-center space-x-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-full bg-stone-900 border-2 border-antique-brass flex items-center justify-center shadow-lg">
              <Globe2 className="w-5 h-5 text-antique-brass" />
            </div>
            <div>
              <span className="text-[10px] font-serif uppercase tracking-[0.3em] text-antique-brass font-bold block">
                NASA Space Apps Data Sonification Console
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-wide text-parchment-100">
                EARTH JUKEBOX WORKSTATION
              </h2>
            </div>
          </div>

          {/* Master Physical Power Toggle Switch */}
          <div className="flex items-center space-x-4 bg-stone-900/90 px-4 py-2.5 rounded-xl border border-stone-800 shadow-inner">
            <span className="text-xs font-serif uppercase tracking-wider text-parchment-300">
              Master Power
            </span>
            <button
              onClick={handlePowerToggle}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 p-1 flex items-center ${
                isPoweredOn ? 'bg-amber-600 border border-amber-400' : 'bg-stone-800 border border-stone-700'
              }`}
              title="Toggle Earth Jukebox Power"
            >
              <motion.div
                layout
                className={`w-5 h-5 rounded-full shadow-md flex items-center justify-center ${
                  isPoweredOn ? 'ml-auto bg-amber-100 text-stone-900' : 'bg-stone-500 text-stone-900'
                }`}
              >
                <Power className="w-3 h-3" />
              </motion.div>
            </button>
            <div
              className={`w-3 h-3 rounded-full shadow-sm transition-all duration-300 ${
                isPoweredOn
                  ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
                  : 'bg-red-900 border border-red-700'
              }`}
            />
          </div>
        </div>

        {/* Dual Screen Display (Frame 6.2 canonical design) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* LEFT SCREEN: Ocean Currents (Muted Blue/Cyan, Flute) */}
          <div
            className={`relative rounded-xl border-2 transition-all duration-300 p-5 overflow-hidden ${
              isPoweredOn
                ? 'border-cyan-500/50 bg-[#091b29] shadow-[0_0_25px_rgba(6,182,212,0.15)]'
                : 'border-stone-800 bg-stone-950/90 opacity-60'
            }`}
          >
            {/* CRT Screen Scanline Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Waves className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-serif font-bold uppercase tracking-wider text-cyan-300">
                    LEFT CHANNEL: OCEAN CURRENTS
                  </span>
                </div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
                  Instrument: Flute
                </span>
              </div>

              {/* Animated Waveform & Flow Visualization */}
              <div className="h-20 bg-black/50 rounded-lg border border-cyan-950 flex items-center justify-center p-2 mb-3 overflow-hidden relative">
                {isPoweredOn ? (
                  <div className="w-full flex items-center justify-around h-full">
                    {[...Array(24)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          height: isCurrentPlaying('ocean') || isCurrentPlaying('combined')
                            ? [`${15 + Math.sin(i * 0.5) * 10}%`, `${65 + Math.cos(i * 0.4) * 30}%`, `${25 + Math.sin(i * 0.7) * 20}%`]
                            : '20%',
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.2 + (i % 5) * 0.2,
                          ease: 'easeInOut',
                        }}
                        className="w-1.5 bg-gradient-to-t from-cyan-600 via-cyan-400 to-sky-200 rounded-full shadow-sm"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-stone-600 text-xs font-mono">SCREEN OFFLINE</div>
                )}
              </div>

              {/* Musical Notation & Metadata */}
              <div className="flex items-center justify-between text-[11px] font-mono text-cyan-200/80 bg-cyan-950/30 p-2.5 rounded border border-cyan-900/40">
                <span>Key: Pentatonic D-Scale</span>
                <span>Modulation: ECCO Velocity</span>
                <span>Mode: Smooth Airflow</span>
              </div>
            </div>
          </div>

          {/* RIGHT SCREEN: Lightning (Warm Yellow/Gold, Electric Guitar) */}
          <div
            className={`relative rounded-xl border-2 transition-all duration-300 p-5 overflow-hidden ${
              isPoweredOn
                ? 'border-yellow-500/50 bg-[#241a0b] shadow-[0_0_25px_rgba(234,179,8,0.15)]'
                : 'border-stone-800 bg-stone-950/90 opacity-60'
            }`}
          >
            {/* CRT Screen Scanline Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs font-serif font-bold uppercase tracking-wider text-yellow-300">
                    RIGHT CHANNEL: LIGHTNING TRANSIENTS
                  </span>
                </div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-yellow-950 border border-yellow-800 text-yellow-300">
                  Instrument: Electric Guitar
                </span>
              </div>

              {/* Animated Sharp Lightning Waveform */}
              <div className="h-20 bg-black/50 rounded-lg border border-yellow-950 flex items-center justify-center p-2 mb-3 overflow-hidden relative">
                {isPoweredOn ? (
                  <div className="w-full flex items-center justify-around h-full">
                    {[...Array(24)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          height: isCurrentPlaying('lightning') || isCurrentPlaying('combined')
                            ? [`${10 + (i % 3) * 15}%`, `${85 - (i % 4) * 20}%`, `${15 + (i % 2) * 35}%`]
                            : '20%',
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.6 + (i % 4) * 0.15,
                          ease: 'circInOut',
                        }}
                        className="w-1.5 bg-gradient-to-t from-amber-600 via-yellow-400 to-amber-200 rounded-full shadow-sm"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-stone-600 text-xs font-mono">SCREEN OFFLINE</div>
                )}
              </div>

              {/* Musical Notation & Metadata */}
              <div className="flex items-center justify-between text-[11px] font-mono text-yellow-200/80 bg-yellow-950/30 p-2.5 rounded border border-yellow-900/40">
                <span>Key: E Minor Blues Riff</span>
                <span>Trigger: ISS-LIS Optical Pulses</span>
                <span>Drive: 40dB Saturation</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Track Interactive Mixer & Final Composition Player */}
        <div className="bg-stone-900/90 rounded-xl p-5 sm:p-6 border border-stone-800 shadow-xl mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-antique-brass" />
              <h3 className="text-xs sm:text-sm font-serif font-bold uppercase tracking-wider text-parchment-200">
                Multi-Track Earth Sonification Mixer
              </h3>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={toggleMute}
                className="p-2 rounded-lg bg-stone-800 border border-stone-700 text-parchment-300 hover:text-white"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Track 1: Ocean Flute */}
            <div
              className={`p-4 rounded-lg border transition-all ${
                selectedTrack === 'ocean'
                  ? 'border-cyan-500/70 bg-cyan-950/20'
                  : 'border-stone-800 bg-stone-950/60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-serif font-bold text-cyan-300">
                  1. Ocean Flute Solo
                </span>
                {isCurrentPlaying('ocean') && (
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                )}
              </div>
              <p className="text-[11px] text-parchment-400 mb-3 leading-tight">
                Current velocity mapped to tranquil wooden flute tones.
              </p>

              <div className="flex items-center space-x-2">
                <button
                  disabled={!isPoweredOn}
                  onClick={() => handleTrackSelect('ocean')}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-serif font-bold flex items-center justify-center space-x-1.5 transition-all ${
                    isCurrentPlaying('ocean')
                      ? 'bg-cyan-600 text-white shadow-lg'
                      : 'bg-stone-800 text-parchment-300 hover:bg-stone-700 hover:text-white'
                  }`}
                >
                  {isCurrentPlaying('ocean') ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>Playing</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Solo Ocean</span>
                    </>
                  )}
                </button>

                {/* Upload custom track button */}
                <label className="p-2 rounded-lg bg-stone-800 border border-stone-700 hover:bg-stone-700 cursor-pointer text-parchment-400 hover:text-white" title="Load custom audio file">
                  <Upload className="w-3.5 h-3.5" />
                  <input
                    type="file"
                    accept="audio/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload('ocean', e)}
                  />
                </label>
              </div>
              {customAudio.ocean && (
                <span className="text-[10px] text-emerald-400 block mt-1 font-mono">
                  ✓ Custom Audio Loaded
                </span>
              )}
            </div>

            {/* Track 2: Lightning Guitar */}
            <div
              className={`p-4 rounded-lg border transition-all ${
                selectedTrack === 'lightning'
                  ? 'border-yellow-500/70 bg-yellow-950/20'
                  : 'border-stone-800 bg-stone-950/60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-serif font-bold text-yellow-300">
                  2. Lightning Guitar Solo
                </span>
                {isCurrentPlaying('lightning') && (
                  <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
                )}
              </div>
              <p className="text-[11px] text-parchment-400 mb-3 leading-tight">
                Optical radiance transients mapped to overdriven blues riffs.
              </p>

              <div className="flex items-center space-x-2">
                <button
                  disabled={!isPoweredOn}
                  onClick={() => handleTrackSelect('lightning')}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-serif font-bold flex items-center justify-center space-x-1.5 transition-all ${
                    isCurrentPlaying('lightning')
                      ? 'bg-amber-600 text-white shadow-lg'
                      : 'bg-stone-800 text-parchment-300 hover:bg-stone-700 hover:text-white'
                  }`}
                >
                  {isCurrentPlaying('lightning') ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>Playing</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Solo Storm</span>
                    </>
                  )}
                </button>

                <label className="p-2 rounded-lg bg-stone-800 border border-stone-700 hover:bg-stone-700 cursor-pointer text-parchment-400 hover:text-white" title="Load custom audio file">
                  <Upload className="w-3.5 h-3.5" />
                  <input
                    type="file"
                    accept="audio/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload('lightning', e)}
                  />
                </label>
              </div>
              {customAudio.lightning && (
                <span className="text-[10px] text-emerald-400 block mt-1 font-mono">
                  ✓ Custom Audio Loaded
                </span>
              )}
            </div>

            {/* Track 3: Combined Earth Jukebox Master Mix */}
            <div
              className={`p-4 rounded-lg border transition-all ${
                selectedTrack === 'combined'
                  ? 'border-antique-brass bg-amber-950/30 shadow-[0_0_20px_rgba(212,175,55,0.15)]'
                  : 'border-stone-800 bg-stone-950/60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-serif font-bold text-antique-brassLight">
                  3. Earth Jukebox Master Symphony
                </span>
                {isCurrentPlaying('combined') && (
                  <span className="w-2 h-2 rounded-full bg-antique-brass animate-ping" />
                )}
              </div>
              <p className="text-[11px] text-parchment-400 mb-3 leading-tight">
                Ocean & storm synchronized in an interlocking planetary composition.
              </p>

              <div className="flex items-center space-x-2">
                <button
                  disabled={!isPoweredOn}
                  onClick={() => handleTrackSelect('combined')}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-serif font-bold flex items-center justify-center space-x-1.5 transition-all ${
                    isCurrentPlaying('combined')
                      ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-stone-900 shadow-lg font-black'
                      : 'bg-stone-800 text-parchment-300 hover:bg-stone-700 hover:text-white'
                  }`}
                >
                  {isCurrentPlaying('combined') ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>Playing Symphony</span>
                    </>
                  ) : (
                    <>
                      <Music className="w-3.5 h-3.5" />
                      <span>Play Full Symphony</span>
                    </>
                  )}
                </button>

                <label className="p-2 rounded-lg bg-stone-800 border border-stone-700 hover:bg-stone-700 cursor-pointer text-parchment-400 hover:text-white" title="Load custom master mix">
                  <Upload className="w-3.5 h-3.5" />
                  <input
                    type="file"
                    accept="audio/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload('combined', e)}
                  />
                </label>
              </div>
              {customAudio.combined && (
                <span className="text-[10px] text-emerald-400 block mt-1 font-mono">
                  ✓ Custom Audio Loaded
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Closing Planetary Quote and Restart Journey Action */}
        <div className="text-center pt-2">
          <p className="text-base sm:text-lg font-serif italic text-parchment-200 mb-6 max-w-2xl mx-auto selection:bg-amber-800">
            "{PERSONALIZED_INTRO.closingQuote}"
          </p>

          <button
            onClick={() => {
              playClick();
              onRestartStory();
            }}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-stone-800 via-stone-700 to-stone-800 text-parchment-200 hover:text-white border border-antique-brass/50 hover:border-antique-brass font-serif text-xs uppercase tracking-widest shadow-xl transition-all duration-300 hover:scale-105"
          >
            <RotateCcw className="w-4 h-4 text-antique-brass" />
            <span>Restart Journey</span>
          </button>
        </div>
      </div>
    </div>
  );
};
