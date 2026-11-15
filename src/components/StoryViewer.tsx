import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ALL_FRAMES, GITHUB_REPO_URL } from '../data/storyConfig';
import { StoryFrame } from '../types/story';
import { useAudio } from '../context/AudioContext';
import { NarratorPortrait } from './NarratorPortrait';
import { EducationalModal } from './EducationalModal';
import { EarthJukeboxInterface } from './EarthJukeboxInterface';
import { ChapterSelectModal } from './ChapterSelectModal';
import { NasaCreditsModal } from './NasaCreditsModal';
import { AssetManagerModal } from './AssetManagerModal';
import { GithubIcon } from './GithubIcon';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Menu,
  FolderOpen,
  Subtitles,
  HelpCircle,
  Waves,
  Zap,
  Maximize,
  Minimize,
  Eye,
  EyeOff,
  Sliders,
  Tv,
} from 'lucide-react';

interface StoryViewerProps {
  onRestartStory: () => void;
}

export const StoryViewer: React.FC<StoryViewerProps> = ({ onRestartStory }) => {
  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(0);
  const [autoplay, setAutoplay] = useState<boolean>(false);
  const [subtitlesVisible, setSubtitlesVisible] = useState<boolean>(true);
  const [narrationMinimized, setNarrationMinimized] = useState<boolean>(false);
  const [isUiHidden, setIsUiHidden] = useState<boolean>(false);
  const [fitMode, setFitMode] = useState<'cover' | 'contain' | 'cinema'>('cover');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  const [isWorkstationOpen, setIsWorkstationOpen] = useState<boolean>(false);

  // Modals
  const [eduModalType, setEduModalType] = useState<'ocean' | 'lightning' | null>(null);
  const [isChapterMenuOpen, setIsChapterMenuOpen] = useState<boolean>(false);
  const [isNasaCreditsOpen, setIsNasaCreditsOpen] = useState<boolean>(false);
  const [isAssetManagerOpen, setIsAssetManagerOpen] = useState<boolean>(false);
  const [customImageOverrides, setCustomImageOverrides] = useState<Record<string, string>>({});

  // Touch Swipe tracking
  const touchStartXRef = useRef<number | null>(null);

  const {
    isMuted,
    toggleMute,
    setAmbience,
    stopAmbience,
    playPageTurn,
    speakNarration,
    speechEnabled,
    stopNarration,
    stopSonification,
    startLightLightning,
    stopLightLightning,
    triggerLightningStrike,
  } = useAudio();

  const currentFrame: StoryFrame = ALL_FRAMES[currentFrameIndex] || ALL_FRAMES[0];
  const isLastFrame = currentFrameIndex === ALL_FRAMES.length - 1;

  // Frame navigation callbacks
  const goToNextFrame = useCallback(() => {
    if (currentFrameIndex < ALL_FRAMES.length - 1) {
      playPageTurn();
      setImageError(false);
      setCurrentFrameIndex((prev) => prev + 1);
    }
  }, [currentFrameIndex, playPageTurn]);

  const goToPrevFrame = useCallback(() => {
    if (currentFrameIndex > 0) {
      playPageTurn();
      setImageError(false);
      setCurrentFrameIndex((prev) => prev - 1);
    }
  }, [currentFrameIndex, playPageTurn]);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Keyboard navigation & Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        goToNextFrame();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        goToPrevFrame();
      } else if (e.key === ' ') {
        e.preventDefault();
        goToNextFrame();
      } else if (e.key.toLowerCase() === 'h') {
        setIsUiHidden((prev) => !prev);
      } else if (e.key.toLowerCase() === 'f') {
        toggleFullscreen();
      } else if (e.key.toLowerCase() === 'm') {
        toggleMute();
      } else if (e.key.toLowerCase() === 'a') {
        setAutoplay((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsUiHidden(false);
        setIsWorkstationOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextFrame, goToPrevFrame, toggleMute]);

  // Ambience, Narration, Video Audio, and Lightning sound effect coordination when frame changes
  useEffect(() => {
    // Frames 4.1 to 5.8 (light atmospheric lightning sound effect)
    const isLightningFrame = [
      '4.1', '4.2',
      '5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7', '5.8'
    ].includes(currentFrame.id);

    if (currentFrame.isVideoFrame) {
      // During video playback, stop all background ambience, narration, sonification, and lightning!
      stopAmbience();
      stopNarration();
      stopSonification();
      stopLightLightning();
    } else {
      // Normal story frame: resume background sounds & speech
      setAmbience(currentFrame.ambience);

      // Play atmospheric lightning sound effect in background from frame 4.1 to 5.8
      if (isLightningFrame && !isMuted) {
        startLightLightning();
        triggerLightningStrike(true);
      } else {
        stopLightLightning();
      }

      if (speechEnabled && !isMuted) {
        speakNarration(currentFrame.narration);
      }
    }

    if (currentFrame.id === '6.4') {
      setIsWorkstationOpen(false);
    }

    return () => {
      stopNarration();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFrameIndex]);

  // Autoplay timer
  useEffect(() => {
    let timer: number | null = null;
    if (autoplay && currentFrameIndex < ALL_FRAMES.length - 1) {
      timer = window.setTimeout(() => {
        goToNextFrame();
      }, 9500);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [autoplay, currentFrameIndex, goToNextFrame]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartXRef.current;
    if (diff > 50) {
      goToPrevFrame();
    } else if (diff < -50) {
      goToNextFrame();
    }
    touchStartXRef.current = null;
  };

  const handleImageOverride = (frameId: string, url: string) => {
    setCustomImageOverrides((prev) => ({ ...prev, [frameId]: url }));
  };

  const activeImageSrc =
    customImageOverrides[currentFrame.id] ||
    (imageError && currentFrame.fallbackImage ? currentFrame.fallbackImage : currentFrame.image);

  // Cinematic animation styles for current frame (Ken Burns camera dynamics)
  const getAnimationVariants = (preset?: string) => {
    switch (preset) {
      case 'push-in':
        return {
          initial: { scale: 1 },
          animate: { scale: 1.07, transition: { duration: 16, ease: 'easeOut' } },
        };
      case 'zoom-out':
        return {
          initial: { scale: 1.09 },
          animate: { scale: 1.01, transition: { duration: 16, ease: 'easeOut' } },
        };
      case 'pan-slow':
        return {
          initial: { scale: 1.06, x: '-1.5%' },
          animate: { x: '1.5%', transition: { duration: 18, ease: 'easeInOut' } },
        };
      case 'storm-flash':
        return {
          initial: { filter: 'brightness(1.6)', scale: 1.03 },
          animate: { filter: 'brightness(1)', scale: 1.06, transition: { duration: 1.2 } },
        };
      default:
        return {
          initial: { opacity: 0.92, scale: 1.01 },
          animate: { opacity: 1, scale: 1.05, transition: { duration: 14 } },
        };
    }
  };

  return (
    <div
      className="relative w-screen h-screen overflow-hidden bg-black select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* =========================================================================
          LAYER 1: 100% EDGE-TO-EDGE FULL-SCREEN ARTWORK (HERO)
         ========================================================================= */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
        {/* Blurred ambient atmosphere backing */}
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-3xl opacity-40 scale-125 pointer-events-none transition-all duration-1000"
          style={{ backgroundImage: `url('${activeImageSrc}')` }}
        />

        {/* Primary Full Screen Image / Video Stage */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFrame.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden"
          >
            {currentFrame.isVideoFrame && currentFrame.videoSrc ? (
              <div className="relative w-full h-full flex flex-col items-center justify-center p-3 sm:p-6 z-10 pointer-events-auto">
                <div className="relative w-full max-w-5xl aspect-video max-h-[75vh] rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.95)] border-2 border-antique-brass/60 bg-black flex items-center justify-center">
                  <video
                    key={currentFrame.videoSrc}
                    src={currentFrame.videoSrc}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Video Presentation Badge */}
                <div className="mt-3 flex items-center space-x-2 px-4 py-1.5 rounded-full bg-stone-950/85 border border-antique-brass/50 backdrop-blur-md shadow-xl">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-xs font-serif font-bold uppercase tracking-wider text-antique-brass">
                    {currentFrame.frameTitle}
                  </span>
                </div>
              </div>
            ) : (
              <motion.img
                variants={getAnimationVariants(currentFrame.animationPreset)}
                initial="initial"
                animate="animate"
                src={activeImageSrc}
                alt={`Scene ${currentFrame.sceneId} Frame ${currentFrame.id}: ${currentFrame.frameTitle}`}
                onError={() => {
                  if (!imageError && currentFrame.fallbackImage) {
                    setImageError(true);
                  }
                }}
                className={`w-full h-full pointer-events-none select-none transition-all duration-500 ${
                  fitMode === 'cover'
                    ? 'object-cover object-center'
                    : fitMode === 'contain'
                    ? 'object-contain object-center'
                    : 'object-cover object-center scale-95'
                }`}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Cinema Letterbox Anamorphic Bars (when cinema fit mode active) */}
        {fitMode === 'cinema' && !currentFrame.isVideoFrame && (
          <>
            <div className="absolute top-0 inset-x-0 h-[10vh] bg-black z-20 pointer-events-none border-b border-stone-900" />
            <div className="absolute bottom-0 inset-x-0 h-[10vh] bg-black z-20 pointer-events-none border-t border-stone-900" />
          </>
        )}

        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />
      </div>

      {/* =========================================================================
          LAYER 2: ENVIRONMENTAL PARTICLES & LIGHTNING PULSE
         ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {!currentFrame.isVideoFrame && currentFrame.ambience === 'storm' && (
          <div className="absolute inset-0 bg-amber-400/8 mix-blend-color-dodge animate-pulse-slow pointer-events-none" />
        )}
        {[...Array(14)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-amber-200/25 blur-[1px] animate-drift"
            style={{
              width: `${Math.random() * 3.5 + 2}px`,
              height: `${Math.random() * 3.5 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 8 + 8}s`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* =========================================================================
          LAYER 3: INVISIBLE FULL-SCREEN CLICK NAVIGATION ZONES
         ========================================================================= */}
      {/* Left Click Zone (Go Back) */}
      <div
        onClick={goToPrevFrame}
        className={`absolute left-0 inset-y-0 ${
          currentFrame.isVideoFrame ? 'w-16 sm:w-24' : 'w-2/5'
        } z-20 cursor-w-resize flex items-center justify-start pl-4 sm:pl-8 group ${
          currentFrameIndex === 0 ? 'pointer-events-none opacity-0' : ''
        }`}
        title="Previous Frame (or Left Arrow / Swipe Right)"
      >
        <motion.div
          whileHover={{ scale: 1.15, x: -3 }}
          className="p-3.5 rounded-full bg-black/60 border border-antique-brass/40 text-parchment-200 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.8)]"
        >
          <ChevronLeft className="w-6 h-6 text-antique-brass" />
        </motion.div>
      </div>

      {/* Right Click Zone (Go Forward) */}
      <div
        onClick={goToNextFrame}
        className={`absolute right-0 inset-y-0 ${
          currentFrame.isVideoFrame ? 'w-16 sm:w-24' : 'w-3/5'
        } z-20 cursor-e-resize flex items-center justify-end pr-4 sm:pr-8 group ${
          isLastFrame ? 'pointer-events-none opacity-0' : ''
        }`}
        title="Next Frame (or Right Arrow / Space / Click / Swipe Left)"
      >
        <motion.div
          whileHover={{ scale: 1.15, x: 3 }}
          className="p-3.5 rounded-full bg-black/60 border border-antique-brass/40 text-parchment-200 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.8)]"
        >
          <ChevronRight className="w-6 h-6 text-antique-brass" />
        </motion.div>
      </div>

      {/* =========================================================================
          LAYER 4: FLOATING GLASSMORPHIC TOP CONTROL BAR (AUTO-HIDEABLE)
         ========================================================================= */}
      <AnimatePresence>
        {!isUiHidden && (
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-4 inset-x-4 sm:inset-x-8 z-30 flex items-center justify-between pointer-events-none"
          >
            {/* Left: Chapter / Scene Pill */}
            <div className="flex items-center space-x-3 pointer-events-auto">
              <button
                onClick={() => setIsChapterMenuOpen(true)}
                className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-stone-950/75 border border-antique-brass/50 text-parchment-200 hover:text-white hover:border-antique-brass hover:bg-stone-900 transition-all text-xs font-serif shadow-2xl backdrop-blur-md"
                title="Table of Contents (Jump to Scene)"
              >
                <Menu className="w-3.5 h-3.5 text-antique-brass" />
                <span className="font-bold">Chapters</span>
              </button>

              <div className="hidden sm:flex flex-col bg-stone-950/75 px-3 py-1 rounded-full border border-stone-800/80 backdrop-blur-md shadow-lg">
                <span className="text-[10px] font-serif uppercase tracking-widest text-antique-brass font-bold leading-none">
                  Scene {currentFrame.sceneId} / 6 — Frame {currentFrame.id}
                </span>
                <span className="text-[10px] text-parchment-300 font-serif italic truncate max-w-xs mt-0.5 leading-none">
                  {currentFrame.frameTitle}
                </span>
              </div>
            </div>

            {/* Center: Educational Sonification Action Badges */}
            <div className="flex items-center space-x-2 pointer-events-auto">
              {currentFrame.hasEducationalPanel && currentFrame.educationalPanelType === 'ocean' && (
                <button
                  onClick={() => setEduModalType('ocean')}
                  className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-cyan-950/85 border border-cyan-400/70 text-cyan-200 hover:bg-cyan-900 text-xs font-serif animate-pulse shadow-[0_0_15px_rgba(6,182,212,0.4)] backdrop-blur-md font-bold"
                >
                  <Waves className="w-3.5 h-3.5 text-cyan-300" />
                  <span>Explore Ocean Sonification</span>
                </button>
              )}

              {currentFrame.hasEducationalPanel && currentFrame.educationalPanelType === 'lightning' && (
                <button
                  onClick={() => setEduModalType('lightning')}
                  className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-amber-950/85 border border-yellow-400/70 text-yellow-200 hover:bg-amber-900 text-xs font-serif animate-pulse shadow-[0_0_15px_rgba(234,179,8,0.4)] backdrop-blur-md font-bold"
                >
                  <Zap className="w-3.5 h-3.5 text-yellow-300" />
                  <span>Explore Storm Sonification</span>
                </button>
              )}

              {/* Special Button for Frame 6.4: Earth Jukebox Console */}
              {currentFrame.id === '6.4' && (
                <button
                  onClick={() => setIsWorkstationOpen(true)}
                  className="flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-700 text-stone-950 font-serif text-xs font-black uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.6)] border border-amber-300 animate-pulse backdrop-blur-md"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Open Earth Jukebox Console</span>
                </button>
              )}
            </div>

            {/* Right: Fullscreen, Fit Mode, Zen Mode, Audio, NASA Data */}
            <div className="flex items-center space-x-1.5 sm:space-x-2 bg-stone-950/75 p-1 rounded-full border border-stone-800/80 backdrop-blur-md shadow-2xl pointer-events-auto">
              {/* Fit Mode Toggle (Cover / Contain / Cinema) */}
              <button
                onClick={() =>
                  setFitMode((prev) => (prev === 'cover' ? 'contain' : prev === 'contain' ? 'cinema' : 'cover'))
                }
                className="p-2 rounded-full text-parchment-300 hover:text-white hover:bg-stone-800/80 transition-all"
                title={`Fit Mode: ${fitMode.toUpperCase()} (Click to toggle)`}
              >
                <Tv className="w-3.5 h-3.5 text-antique-brass" />
              </button>

              {/* Zen Mode (Hide HUD) */}
              <button
                onClick={() => setIsUiHidden(true)}
                className="p-2 rounded-full text-parchment-300 hover:text-white hover:bg-stone-800/80 transition-all"
                title="Hide Controls / Zen Mode (Press 'H')"
              >
                <Eye className="w-3.5 h-3.5" />
              </button>

              {/* Browser Fullscreen Button */}
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-full text-parchment-300 hover:text-white hover:bg-stone-800/80 transition-all"
                title={isFullscreen ? "Exit Fullscreen (F)" : "Enter Fullscreen (F)"}
              >
                {isFullscreen ? <Minimize className="w-3.5 h-3.5 text-antique-brass" /> : <Maximize className="w-3.5 h-3.5" />}
              </button>

              {/* Subtitles Toggle */}
              <button
                onClick={() => setSubtitlesVisible(!subtitlesVisible)}
                className={`p-2 rounded-full transition-all ${
                  subtitlesVisible
                    ? 'text-antique-brass bg-stone-800/80'
                    : 'text-stone-500 hover:text-stone-300'
                }`}
                title="Toggle Narration Subtitles"
              >
                <Subtitles className="w-3.5 h-3.5" />
              </button>

              {/* Autoplay Toggle */}
              <button
                onClick={() => setAutoplay(!autoplay)}
                className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-serif transition-all ${
                  autoplay
                    ? 'bg-amber-950/80 border border-amber-500 text-amber-200 font-bold'
                    : 'text-stone-400 hover:text-white'
                }`}
                title="Toggle Autoplay (A)"
              >
                {autoplay ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
                <span className="hidden md:inline">{autoplay ? 'Autoplay' : 'Auto'}</span>
              </button>

              {/* Mute Toggle */}
              <button
                onClick={toggleMute}
                className="p-2 rounded-full text-parchment-300 hover:text-white hover:bg-stone-800/80 transition-all"
                title={isMuted ? "Unmute Audio (M)" : "Mute Audio (M)"}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>

              {/* NASA Science Data & Credits */}
              <button
                onClick={() => setIsNasaCreditsOpen(true)}
                className="p-2 rounded-full text-parchment-300 hover:text-antique-brass hover:bg-stone-800/80 transition-all"
                title="NASA Science Data & Credits"
              >
                <HelpCircle className="w-3.5 h-3.5" />
              </button>

              {/* GitHub Repository */}
              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-parchment-300 hover:text-white hover:bg-stone-800/80 transition-all"
                title="View Source on GitHub"
              >
                <GithubIcon className="w-3.5 h-3.5" />
              </a>

              {/* Asset Manager */}
              <button
                onClick={() => setIsAssetManagerOpen(true)}
                className="p-2 rounded-full text-parchment-300 hover:text-white hover:bg-stone-800/80 transition-all"
                title="Asset Manager & Audio Uploads"
              >
                <FolderOpen className="w-3.5 h-3.5" />
              </button>

              {/* Restart Story */}
              <button
                onClick={() => {
                  stopLightLightning();
                  onRestartStory();
                }}
                className="p-2 rounded-full text-parchment-300 hover:text-white hover:bg-stone-800/80 transition-all"
                title="Restart Journey"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Quick Unhide HUD button when in Zen Mode */}
      {isUiHidden && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsUiHidden(false)}
          className="absolute top-4 right-4 z-40 p-3 rounded-full bg-black/60 border border-antique-brass/40 text-antique-brass hover:text-white backdrop-blur-md shadow-2xl transition-all"
          title="Show Controls (Press 'H' or 'Esc')"
        >
          <EyeOff className="w-4 h-4" />
        </motion.button>
      )}

      {/* =========================================================================
          LAYER 5: FLOATING NARRATION PANEL & PROGRESS TIMELINE (BOTTOM)
         ========================================================================= */}
      <AnimatePresence>
        {!isUiHidden && subtitlesVisible && (
          <motion.footer
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.35 }}
            className="absolute bottom-4 inset-x-4 sm:inset-x-8 z-30 flex flex-col items-center pointer-events-none"
          >
            {/* Global Timeline Scrubber Dots */}
            <div className="w-full max-w-4xl flex items-center justify-between mb-2 px-3 pointer-events-auto">
              <div className="flex-1 h-1 bg-stone-900/80 rounded-full overflow-hidden mr-3 border border-stone-800">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-600 via-antique-brass to-yellow-400"
                  animate={{
                    width: `${((currentFrameIndex + 1) / ALL_FRAMES.length) * 100}%`,
                  }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <span className="text-[10px] font-mono text-parchment-300/80 bg-stone-950/70 px-2 py-0.5 rounded-full border border-stone-800 backdrop-blur-sm">
                {currentFrameIndex + 1} / {ALL_FRAMES.length}
              </span>
            </div>

            {/* Handcrafted Parchment Floating Narration Strip */}
            <div className="w-full max-w-4xl bg-stone-950/85 border border-antique-brass/40 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.95)] backdrop-blur-xl overflow-hidden pointer-events-auto">
              {/* Minimalist Collapsed State */}
              {narrationMinimized ? (
                <div className="px-4 py-2 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-serif text-antique-brass font-bold">
                      Frame {currentFrame.id}:
                    </span>
                    <span className="text-xs font-serif italic text-parchment-200 truncate max-w-md">
                      "{currentFrame.narration}"
                    </span>
                  </div>
                  <button
                    onClick={() => setNarrationMinimized(false)}
                    className="p-1 rounded-full text-parchment-300 hover:text-white"
                    title="Expand Narration Panel"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                /* Full Expanded Cinematic Narration Bar */
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  {/* Left: Narrator Portrait ("The Chronicler") */}
                  <div className="flex-shrink-0">
                    <NarratorPortrait currentText={currentFrame.narration} />
                  </div>

                  {/* Center: Narration Text */}
                  <div className="flex-1 text-center sm:text-left px-2 sm:px-4">
                    <p className="text-sm sm:text-base font-serif text-parchment-100 leading-relaxed italic selection:bg-antique-brass selection:text-stone-950">
                      "{currentFrame.narration}"
                    </p>
                    {currentFrame.visualNote && (
                      <span className="text-[11px] font-sans text-parchment-400/80 block mt-1">
                        {currentFrame.visualNote}
                      </span>
                    )}
                  </div>

                  {/* Right: Unobtrusive Navigation Arrows & Minimize Toggle */}
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <button
                      disabled={currentFrameIndex === 0}
                      onClick={goToPrevFrame}
                      className={`p-2.5 rounded-full border transition-all ${
                        currentFrameIndex === 0
                          ? 'border-stone-800 text-stone-600 cursor-not-allowed'
                          : 'border-antique-brass/40 bg-stone-900/80 text-parchment-200 hover:text-white hover:border-antique-brass shadow'
                      }`}
                      title="Previous Frame"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <button
                      disabled={isLastFrame}
                      onClick={goToNextFrame}
                      className={`flex items-center space-x-1.5 px-4 py-2 rounded-full border transition-all ${
                        isLastFrame
                          ? 'border-stone-800 text-stone-600 cursor-not-allowed'
                          : 'border-antique-brass bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 text-parchment-100 hover:text-white hover:border-amber-300 shadow-lg font-serif text-xs font-bold'
                      }`}
                      title="Next Frame"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setNarrationMinimized(true)}
                      className="p-2 rounded-full text-stone-400 hover:text-parchment-200 hover:bg-stone-800/60 transition-all ml-1"
                      title="Minimize Narration Strip"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.footer>
        )}
      </AnimatePresence>

      {/* =========================================================================
          LAYER 6: MODALS (EDUCATIONAL, WORKSTATION, CHAPTERS, CREDITS, ASSETS)
         ========================================================================= */}
      {/* Educational Panels */}
      {eduModalType && (
        <EducationalModal
          type={eduModalType}
          isOpen={!!eduModalType}
          onClose={() => setEduModalType(null)}
        />
      )}

      {/* Earth Jukebox Console Modal (Frame 6.4) */}
      <AnimatePresence>
        {isWorkstationOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl my-auto"
            >
              <EarthJukeboxInterface onRestartStory={onRestartStory} />
              <button
                onClick={() => setIsWorkstationOpen(false)}
                className="absolute top-8 right-8 px-4 py-1.5 rounded-full bg-stone-900 border border-stone-700 text-parchment-300 hover:text-white text-xs font-serif uppercase tracking-wider shadow-lg"
              >
                Close Console
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Chapter Select Menu */}
      <ChapterSelectModal
        isOpen={isChapterMenuOpen}
        onClose={() => setIsChapterMenuOpen(false)}
        currentFrameIndex={currentFrameIndex}
        onSelectFrameIndex={(idx) => setCurrentFrameIndex(idx)}
      />

      {/* NASA Credits & Science Guide */}
      <NasaCreditsModal
        isOpen={isNasaCreditsOpen}
        onClose={() => setIsNasaCreditsOpen(false)}
      />

      {/* Asset Manager */}
      <AssetManagerModal
        isOpen={isAssetManagerOpen}
        onClose={() => setIsAssetManagerOpen(false)}
        onCustomImageOverride={handleImageOverride}
      />
    </div>
  );
};
