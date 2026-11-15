import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { soundEngine } from '../audio/AudioEngine';

interface AudioContextType {
  isMuted: boolean;
  volume: number;
  toggleMute: () => void;
  setVolume: (vol: number) => void;
  // Sound effects
  playSealCrack: () => void;
  playScrollUnroll: () => void;
  playClick: () => void;
  playPageTurn: () => void;
  // Ambience
  setAmbience: (type?: string) => void;
  stopAmbience: () => void;
  // Sonification & Audio Tracks
  activeSonification: 'ocean' | 'lightning' | 'combined' | null;
  isPlayingAudio: boolean;
  playSonification: (type: 'ocean' | 'lightning' | 'combined') => void;
  stopSonification: () => void;
  toggleSonification: (type: 'ocean' | 'lightning' | 'combined') => void;
  // Custom Audio files
  customAudio: {
    ocean?: string;
    lightning?: string;
    combined?: string;
  };
  loadCustomAudioFile: (type: 'ocean' | 'lightning' | 'combined', file: File) => void;
  // Narration (Web Speech API)
  speechEnabled: boolean;
  toggleSpeechNarration: () => void;
  speakNarration: (text: string) => void;
  stopNarration: () => void;
  isSpeaking: boolean;
  availableVoices: SpeechSynthesisVoice[];
  selectedVoice: string | null;
  setSelectedVoice: (name: string) => void;
  // Background Lightning Sound Effect (Frames 4.1 to 5.8)
  startLightLightning: () => void;
  stopLightLightning: () => void;
  triggerLightningStrike: (isHero?: boolean) => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolumeState] = useState<number>(0.8);
  const [activeSonification, setActiveSonification] = useState<'ocean' | 'lightning' | 'combined' | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Custom audio file URLs
  const [customAudio, setCustomAudio] = useState<{
    ocean?: string;
    lightning?: string;
    combined?: string;
  }>({});

  // Audio elements for custom uploaded tracks
  const customAudioElementsRef = useRef<{
    ocean?: HTMLAudioElement;
    lightning?: HTMLAudioElement;
    combined?: HTMLAudioElement;
  }>({});

  // Speech Narration State
  const [speechEnabled, setSpeechEnabled] = useState<boolean>(true);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);

  // Initialize Voices (prioritize mature/older male storyteller voices)
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const updateVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          setAvailableVoices(voices);

          // Auto-select preferred mature/older male storyteller voice if available
          const preferred = voices.find(v => 
            v.lang.startsWith('en') && (
              v.name.includes('George') || 
              v.name.includes('David') || 
              v.name.includes('Daniel') || 
              v.name.includes('Christopher') ||
              v.name.includes('Guy') ||
              v.name.includes('Oliver') ||
              (v.name.includes('Natural') && v.name.includes('Male'))
            )
          ) || voices.find(v => 
            v.lang.startsWith('en') && 
            !v.name.toLowerCase().includes('female') && 
            !v.name.toLowerCase().includes('zira') &&
            !v.name.toLowerCase().includes('jenny') &&
            !v.name.toLowerCase().includes('aria')
          ) || voices.find(v => v.lang.startsWith('en')) || voices[0];

          if (preferred && !selectedVoice) {
            setSelectedVoice(preferred.name);
          }
        }
      };

      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;
      return () => {
        window.speechSynthesis.onvoiceschanged = null;
      };
    }
  }, [selectedVoice]);

  const toggleMute = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
    if (speechEnabled && muted) {
      stopNarration();
    }
    if (muted) {
      soundEngine.stopLightLightning();
    }
    // Also mute custom audio elements
    Object.values(customAudioElementsRef.current).forEach(audio => {
      if (audio) audio.muted = muted;
    });
  };

  const setVolume = (vol: number) => {
    setVolumeState(vol);
    soundEngine.setMasterVolume(vol);
    Object.values(customAudioElementsRef.current).forEach(audio => {
      if (audio) audio.volume = vol;
    });
  };

  const playSealCrack = () => soundEngine.playWaxSealCrack();
  const playScrollUnroll = () => soundEngine.playParchmentUnroll();
  const playClick = () => soundEngine.playSwitchClick();
  const playPageTurn = () => soundEngine.playPageTurn();

  const setAmbience = (type?: string) => {
    if (!isMuted) {
      soundEngine.setAmbience(type);
    }
  };

  const stopAmbience = () => {
    soundEngine.stopAmbience();
  };

  // Custom audio file uploader
  const loadCustomAudioFile = (type: 'ocean' | 'lightning' | 'combined', file: File) => {
    const url = URL.createObjectURL(file);
    setCustomAudio(prev => ({ ...prev, [type]: url }));

    const audio = new Audio(url);
    audio.loop = true;
    audio.volume = volume;
    audio.muted = isMuted;
    customAudioElementsRef.current[type] = audio;
  };

  const playSonification = (type: 'ocean' | 'lightning' | 'combined') => {
    stopSonification();
    setActiveSonification(type);
    setIsPlayingAudio(true);

    const customEl = customAudioElementsRef.current[type];
    if (customEl) {
      // Play user's actual audio file!
      customEl.currentTime = 0;
      customEl.play().catch(e => console.warn('Custom audio playback error:', e));
    } else {
      // Fallback to built-in procedural Web Audio synthesizer
      if (type === 'ocean') {
        soundEngine.startOceanFluteSonification();
      } else if (type === 'lightning') {
        soundEngine.startLightningGuitarSonification();
      } else {
        soundEngine.startCombinedEarthJukebox();
      }
    }
  };

  const stopSonification = () => {
    soundEngine.stopSonification();
    Object.values(customAudioElementsRef.current).forEach(audio => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
    setActiveSonification(null);
    setIsPlayingAudio(false);
  };

  const toggleSonification = (type: 'ocean' | 'lightning' | 'combined') => {
    if (activeSonification === type && isPlayingAudio) {
      stopSonification();
    } else {
      playSonification(type);
    }
  };

  // Persistent reference to the current utterance to prevent Chrome garbage collection
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Chrome bug workaround: keep speech alive during longer utterances
  useEffect(() => {
    let interval: number | null = null;
    if (isSpeaking && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      interval = window.setInterval(() => {
        if (window.speechSynthesis.speaking) {
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        }
      }, 10000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSpeaking]);

  // Web Speech API Narration
  const stopNarration = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        // Safe catch
      }
      currentUtteranceRef.current = null;
      (window as any)._narratorUtterance = null;
    }
    setIsSpeaking(false);
  }, []);

  const speakNarration = useCallback((text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (isMuted || !text) return;

    // Cancel any ongoing speech
    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      // Safe catch
    }

    // Small asynchronous tick allows cancel() to finalize in Chromium
    setTimeout(() => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

      try {
        const utterance = new SpeechSynthesisUtterance(text);
        // Seasoned Chronicler voice: deeper resonant pitch (0.76) & deliberate storytelling pace (0.86)
        utterance.rate = 0.86;
        utterance.pitch = 0.76;
        utterance.volume = volume;
        utterance.lang = 'en-US';

        const voices = window.speechSynthesis.getVoices();
        if (selectedVoice) {
          const found = voices.find(v => v.name === selectedVoice);
          if (found) utterance.voice = found;
        } else {
          const olderVoice = voices.find(v => 
            v.lang.startsWith('en') && (
              v.name.includes('George') || 
              v.name.includes('David') || 
              v.name.includes('Daniel') || 
              v.name.includes('Christopher') ||
              v.name.includes('Guy') ||
              v.name.includes('Oliver') ||
              (v.name.includes('Natural') && v.name.includes('Male'))
            )
          ) || voices.find(v => 
            v.lang.startsWith('en') && 
            !v.name.toLowerCase().includes('female') && 
            !v.name.toLowerCase().includes('zira') &&
            !v.name.toLowerCase().includes('jenny') &&
            !v.name.toLowerCase().includes('aria')
          ) || voices.find(v => v.lang.startsWith('en')) || voices[0];

          if (olderVoice) utterance.voice = olderVoice;
        }

        utterance.onstart = () => {
          setIsSpeaking(true);
        };
        utterance.onend = () => {
          setIsSpeaking(false);
          currentUtteranceRef.current = null;
          (window as any)._narratorUtterance = null;
        };
        utterance.onerror = (e) => {
          // 'interrupted' and 'canceled' are normal events when switching frames
          if (e.error !== 'interrupted' && e.error !== 'canceled') {
            console.warn('SpeechSynthesis event:', e);
          }
          setIsSpeaking(false);
          currentUtteranceRef.current = null;
          (window as any)._narratorUtterance = null;
        };

        currentUtteranceRef.current = utterance;
        (window as any)._narratorUtterance = utterance; // Prevent garbage collection in Chrome

        window.speechSynthesis.resume();
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.error('SpeechSynthesis speak failed:', err);
        setIsSpeaking(false);
      }
    }, 60);
  }, [isMuted, volume, selectedVoice]);

  const toggleSpeechNarration = useCallback(() => {
    setSpeechEnabled(prev => {
      const next = !prev;
      if (!next) {
        stopNarration();
      }
      return next;
    });
  }, [stopNarration]);

  // Atmospheric Light Lightning Sound Effect (Frames 4.1 to 5.8)
  const startLightLightning = useCallback(() => {
    soundEngine.startLightLightning();
  }, []);

  const stopLightLightning = useCallback(() => {
    soundEngine.stopLightLightning();
  }, []);

  const triggerLightningStrike = useCallback((isHero: boolean = true) => {
    soundEngine.triggerLightningStrike(isHero);
  }, []);

  return (
    <AudioContext.Provider
      value={{
        isMuted,
        volume,
        toggleMute,
        setVolume,
        playSealCrack,
        playScrollUnroll,
        playClick,
        playPageTurn,
        setAmbience,
        stopAmbience,
        activeSonification,
        isPlayingAudio,
        playSonification,
        stopSonification,
        toggleSonification,
        customAudio,
        loadCustomAudioFile,
        speechEnabled,
        toggleSpeechNarration,
        speakNarration,
        stopNarration,
        isSpeaking,
        availableVoices,
        selectedVoice,
        setSelectedVoice,
        startLightLightning,
        stopLightLightning,
        triggerLightningStrike,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
