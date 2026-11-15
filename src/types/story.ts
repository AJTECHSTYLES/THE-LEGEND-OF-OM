export type AmbienceType = 'cabin' | 'coastal-wind' | 'ocean-waves' | 'storm' | 'mountain' | 'lab';

export type AnimationPreset = 'push-in' | 'pan-slow' | 'parallax' | 'dissolve' | 'zoom-out' | 'storm-flash';

export interface StoryFrame {
  id: string; // e.g. "1.1", "3.5", "5.8", "6.4"
  sceneId: number; // 1 to 6
  frameNumber: number;
  sceneTitle: string;
  frameTitle: string;
  image: string;
  fallbackImage?: string;
  narration: string;
  narrationAudio?: string;
  ambience?: AmbienceType;
  animationPreset?: AnimationPreset;
  hasEducationalPanel?: boolean;
  educationalPanelType?: 'ocean' | 'lightning';
  hasAudioIntegration?: boolean;
  audioTrackType?: 'ocean-flute' | 'lightning-guitar' | 'combined';
  subtitles?: string;
  visualNote?: string;
  isVideoFrame?: boolean;
  videoSrc?: string;
}

export interface StoryScene {
  id: number;
  title: string;
  subtitle: string;
  colorTheme: string;
  frames: StoryFrame[];
}

export interface NASADataInfo {
  id: string;
  topic: string;
  instrument: string;
  mission: string;
  sourceUrl: string;
  environmentalVariable: string;
  processingMethod: string;
  audioMappingMethod: string;
  attribution: string;
  audioTrackTitle?: string;
  scientificSummary: string;
  diagramSteps: {
    step: number;
    title: string;
    description: string;
  }[];
}

export interface CustomAudioTracks {
  oceanFlute?: string; // object URL or static path
  lightningGuitar?: string;
  earthJukeboxMix?: string;
}
