import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ALL_FRAMES } from '../data/storyConfig';
import { useAudio } from '../context/AudioContext';
import { X, FolderOpen, Image as ImageIcon, Music, CheckCircle2, Upload } from 'lucide-react';

interface AssetManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCustomImageOverride?: (frameId: string, url: string) => void;
}

export const AssetManagerModal: React.FC<AssetManagerModalProps> = ({
  isOpen,
  onClose,
  onCustomImageOverride,
}) => {
  const [activeTab, setActiveTab] = useState<'images' | 'audio' | 'manifest'>('images');
  const { customAudio, loadCustomAudioFile } = useAudio();

  const handleCustomImage = (frameId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && onCustomImageOverride) {
      const url = URL.createObjectURL(e.target.files[0]);
      onCustomImageOverride(frameId, url);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto select-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-4xl bg-stone-900 border-2 border-stone-700 rounded-xl p-6 sm:p-8 text-parchment-100 shadow-2xl my-auto max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-800 text-parchment-400 hover:text-white border border-stone-700 transition-colors"
              aria-label="Close Asset Manager"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-stone-800 border border-stone-600 flex items-center justify-center">
                <FolderOpen className="w-5 h-5 text-antique-brass" />
              </div>
              <div>
                <span className="text-[10px] font-serif uppercase tracking-[0.25em] text-antique-brass font-bold block">
                  Asset Directory & Runtime Configuration
                </span>
                <h3 className="text-2xl font-serif font-black tracking-wide text-parchment-100">
                  STORY ASSET MANAGEMENT
                </h3>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center space-x-2 border-b border-stone-800 mb-6">
              <button
                onClick={() => setActiveTab('images')}
                className={`flex items-center space-x-1.5 px-4 py-2 border-b-2 text-xs font-serif font-bold uppercase tracking-wider transition-colors ${
                  activeTab === 'images'
                    ? 'border-antique-brass text-antique-brass'
                    : 'border-transparent text-stone-400 hover:text-parchment-200'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Storyboard Images ({ALL_FRAMES.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('audio')}
                className={`flex items-center space-x-1.5 px-4 py-2 border-b-2 text-xs font-serif font-bold uppercase tracking-wider transition-colors ${
                  activeTab === 'audio'
                    ? 'border-antique-brass text-antique-brass'
                    : 'border-transparent text-stone-400 hover:text-parchment-200'
                }`}
              >
                <Music className="w-4 h-4" />
                <span>Audio Tracks (3)</span>
              </button>

              <button
                onClick={() => setActiveTab('manifest')}
                className={`flex items-center space-x-1.5 px-4 py-2 border-b-2 text-xs font-serif font-bold uppercase tracking-wider transition-colors ${
                  activeTab === 'manifest'
                    ? 'border-antique-brass text-antique-brass'
                    : 'border-transparent text-stone-400 hover:text-parchment-200'
                }`}
              >
                <FolderOpen className="w-4 h-4" />
                <span>Folder Structure Guide</span>
              </button>
            </div>

            {/* Images Tab */}
            {activeTab === 'images' && (
              <div>
                <p className="text-xs text-parchment-300 font-sans mb-4">
                  All 27 storyboard illustrations are linked to canonical image paths. You can preview their status or load local files dynamically:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto p-1">
                  {ALL_FRAMES.map((frame) => (
                    <div
                      key={frame.id}
                      className="p-3 rounded-lg bg-stone-950 border border-stone-800 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[11px] font-serif font-bold text-antique-brass">
                            Frame {frame.id}
                          </span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-stone-800 text-stone-400 uppercase font-mono">
                            Scene {frame.sceneId}
                          </span>
                        </div>
                        <h4 className="text-xs font-serif text-parchment-200 font-medium truncate mb-1">
                          {frame.frameTitle}
                        </h4>
                        <div className="text-[10px] text-stone-400 font-mono truncate mb-2" title={frame.image}>
                          {frame.image}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-stone-850">
                        <span className="inline-flex items-center space-x-1 text-[10px] text-emerald-400">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Linked</span>
                        </span>

                        <label className="text-[10px] text-parchment-300 hover:text-white bg-stone-800 hover:bg-stone-700 px-2 py-1 rounded cursor-pointer flex items-center space-x-1">
                          <Upload className="w-2.5 h-2.5" />
                          <span>Replace</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleCustomImage(frame.id, e)}
                          />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Audio Tab */}
            {activeTab === 'audio' && (
              <div className="space-y-4">
                <p className="text-xs text-parchment-300 font-sans mb-4">
                  The application features procedural Web Audio synthesizers built in, and lets you load your custom audio tracks directly from your PC:
                </p>

                {/* Track 1: Ocean Flute */}
                <div className="p-4 rounded-lg bg-cyan-950/20 border border-cyan-800/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <Music className="w-4 h-4 text-cyan-400" />
                      <h4 className="text-sm font-serif font-bold text-cyan-200">
                        1. Ocean Current Flute Sonification
                      </h4>
                    </div>
                    <p className="text-xs text-parchment-400 mt-1">
                      Target location: <code className="bg-black/40 px-1 py-0.5 rounded text-[11px] text-cyan-300">public/audio/sonification/ocean_flute.mp3</code>
                    </p>
                    <span className="text-[11px] text-stone-400 block mt-0.5">
                      Status: {customAudio.ocean ? '✓ Custom Audio File Active' : '● Procedural Web Audio Synth Ready'}
                    </span>
                  </div>

                  <label className="px-4 py-2 rounded-lg bg-cyan-900/60 hover:bg-cyan-800 text-cyan-100 border border-cyan-700 text-xs font-serif font-bold cursor-pointer flex items-center space-x-1.5 shadow">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Audio File</span>
                    <input
                      type="file"
                      accept="audio/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && loadCustomAudioFile('ocean', e.target.files[0])}
                    />
                  </label>
                </div>

                {/* Track 2: Lightning Guitar */}
                <div className="p-4 rounded-lg bg-amber-950/20 border border-amber-800/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <Music className="w-4 h-4 text-yellow-400" />
                      <h4 className="text-sm font-serif font-bold text-yellow-200">
                        2. Lightning Electric Guitar Sonification
                      </h4>
                    </div>
                    <p className="text-xs text-parchment-400 mt-1">
                      Target location: <code className="bg-black/40 px-1 py-0.5 rounded text-[11px] text-yellow-300">public/audio/sonification/lightning_guitar.mp3</code>
                    </p>
                    <span className="text-[11px] text-stone-400 block mt-0.5">
                      Status: {customAudio.lightning ? '✓ Custom Audio File Active' : '● Procedural Web Audio Synth Ready'}
                    </span>
                  </div>

                  <label className="px-4 py-2 rounded-lg bg-amber-900/60 hover:bg-amber-800 text-yellow-100 border border-amber-700 text-xs font-serif font-bold cursor-pointer flex items-center space-x-1.5 shadow">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Audio File</span>
                    <input
                      type="file"
                      accept="audio/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && loadCustomAudioFile('lightning', e.target.files[0])}
                    />
                  </label>
                </div>

                {/* Track 3: Combined Symphony */}
                <div className="p-4 rounded-lg bg-stone-950 border border-antique-brass/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <Music className="w-4 h-4 text-antique-brass" />
                      <h4 className="text-sm font-serif font-bold text-parchment-100">
                        3. Earth Jukebox Master Composition
                      </h4>
                    </div>
                    <p className="text-xs text-parchment-400 mt-1">
                      Target location: <code className="bg-black/40 px-1 py-0.5 rounded text-[11px] text-antique-brassLight">public/audio/sonification/earth_jukebox_master.mp3</code>
                    </p>
                    <span className="text-[11px] text-stone-400 block mt-0.5">
                      Status: {customAudio.combined ? '✓ Custom Audio File Active' : '● Polyphonic Planetary Synth Ready'}
                    </span>
                  </div>

                  <label className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-parchment-100 border border-stone-600 text-xs font-serif font-bold cursor-pointer flex items-center space-x-1.5 shadow">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Master Mix</span>
                    <input
                      type="file"
                      accept="audio/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && loadCustomAudioFile('combined', e.target.files[0])}
                    />
                  </label>
                </div>
              </div>
            )}

            {/* Manifest / Folder Structure Guide */}
            {activeTab === 'manifest' && (
              <div className="text-xs font-mono bg-stone-950 p-4 rounded-lg border border-stone-800 text-parchment-300 leading-relaxed overflow-x-auto">
                <pre>{`public/
  images/
    opening/
      s0_start.png       -> Opening parchment desk scene
    characters/
      narrator.png       -> Narrator storyteller portrait
    scene-1/
      s1_1.png ... s1_4.png
    scene-2/
      s2_1.png ... s2_4.png
    scene-3/
      s3_1.png ... s3_5.png (Frame 3.5: Ocean Current Map)
    scene-4/
      s4_1.png ... s4_2.png
    scene-5/
      s5_1.png ... s5_8.png (Frame 5.8: Lightning Variation Map)
    scene-6/
      s6_1.png ... s6_4.png (Frame 6.4: Earth Jukebox Symphony)
  audio/
    sonification/
      ocean_flute.mp3
      lightning_guitar.mp3
      earth_jukebox_master.mp3
    narration/
    ambience/
  maps/
    ocean_currents.png
    lightning_variation.png`}</pre>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
