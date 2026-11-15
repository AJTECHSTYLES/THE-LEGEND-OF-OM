import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { STORY_SCENES } from '../data/storyConfig';
import { X, BookOpen } from 'lucide-react';

interface ChapterSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentFrameIndex: number;
  onSelectFrameIndex: (idx: number) => void;
}

export const ChapterSelectModal: React.FC<ChapterSelectModalProps> = ({
  isOpen,
  onClose,
  currentFrameIndex,
  onSelectFrameIndex,
}) => {
  let accumulatedIndex = 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto select-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-2xl bg-stone-900 border-2 border-stone-700 rounded-xl p-6 sm:p-8 text-parchment-100 shadow-2xl my-auto max-h-[85vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-800 text-parchment-400 hover:text-white border border-stone-700 transition-colors"
              aria-label="Close Chapter Menu"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-stone-800 border border-stone-600 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-antique-brass" />
              </div>
              <div>
                <span className="text-[10px] font-serif uppercase tracking-[0.25em] text-antique-brass font-bold block">
                  Table of Contents
                </span>
                <h3 className="text-2xl font-serif font-black tracking-wide text-parchment-100">
                  JOURNEY CHAPTERS
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              {STORY_SCENES.map((scene) => {
                const startIndex = accumulatedIndex;
                accumulatedIndex += scene.frames.length;
                const isCurrentScene =
                  currentFrameIndex >= startIndex && currentFrameIndex < startIndex + scene.frames.length;

                return (
                  <div
                    key={scene.id}
                    className={`p-4 rounded-xl border transition-all ${
                      isCurrentScene
                        ? 'border-antique-brass bg-amber-950/20 shadow-md'
                        : 'border-stone-800 bg-stone-950/60 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-serif font-bold text-parchment-100">
                        {scene.title}
                      </h4>
                      <span className="text-[10px] font-mono uppercase text-antique-brass">
                        {scene.frames.length} Frames
                      </span>
                    </div>

                    <p className="text-xs text-parchment-400 font-sans mb-3">
                      {scene.subtitle}
                    </p>

                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
                      {scene.frames.map((frame, fIdx) => {
                        const targetIndex = startIndex + fIdx;
                        const isThis = targetIndex === currentFrameIndex;

                        return (
                          <button
                            key={frame.id}
                            onClick={() => {
                              onSelectFrameIndex(targetIndex);
                              onClose();
                            }}
                            className={`py-1.5 px-1 rounded text-[10px] font-mono transition-all flex flex-col items-center justify-center border ${
                              isThis
                                ? 'bg-antique-brass text-stone-900 border-yellow-500 font-bold shadow'
                                : frame.isVideoFrame
                                ? 'bg-amber-950/60 text-amber-300 border-amber-700/60 hover:bg-amber-900'
                                : 'bg-stone-900 text-parchment-300 border-stone-800 hover:bg-stone-800 hover:text-white'
                            }`}
                            title={`Frame ${frame.id}: ${frame.frameTitle}`}
                          >
                            <span>{frame.isVideoFrame ? '▶ VIDEO' : frame.id}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
