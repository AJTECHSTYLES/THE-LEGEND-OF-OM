/**
 * Web Audio API procedural sound engine & audio management
 * Provides procedural ambient textures, synthesized sonifications, sound effects,
 * and handles user-supplied custom audio files.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private ambienceGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private sonificationGain: GainNode | null = null;
  private lightningGain: GainNode | null = null;

  // Active synthesizers / nodes
  private activeAmbienceNodes: AudioNode[] = [];
  private currentAmbienceType: string | null = null;
  private isMuted: boolean = false;
  private masterVolume: number = 0.8;
  private ambienceVolume: number = 0.4;
  private sonificationVolume: number = 0.8;

  // Background light lightning atmospheric engine
  private lightningInterval: number | null = null;
  private isLightningActive: boolean = false;
  private activeLightningNodes: AudioNode[] = [];
  private continuousBedNodes: AudioNode[] = [];

  // Sonification synths
  private oceanSynthInterval: number | null = null;
  private lightningSynthInterval: number | null = null;
  private combinedSynthInterval: number | null = null;
  public isPlayingSonification: 'ocean' | 'lightning' | 'combined' | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.masterVolume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.ambienceGain = this.ctx.createGain();
      this.ambienceGain.gain.setValueAtTime(this.ambienceVolume, this.ctx.currentTime);
      this.ambienceGain.connect(this.masterGain);

      this.sonificationGain = this.ctx.createGain();
      this.sonificationGain.gain.setValueAtTime(this.sonificationVolume, this.ctx.currentTime);
      this.sonificationGain.connect(this.masterGain);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);

      this.lightningGain = this.ctx.createGain();
      this.lightningGain.gain.setValueAtTime(0.75, this.ctx.currentTime);
      this.lightningGain.connect(this.masterGain);
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // --- Sound Effects ---

  public playWaxSealCrack() {
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;

    // Crisp crack noise
    const bufferSize = this.ctx.sampleRate * 0.15;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.03));
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2200, now);
    filter.Q.setValueAtTime(3.0, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.8, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);
    noise.start(now);

    // Deep seal pop
    const osc = this.ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.12);

    const oscGain = this.ctx.createGain();
    oscGain.gain.setValueAtTime(0.9, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(oscGain);
    oscGain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.13);
  }

  public playParchmentUnroll() {
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;

    const bufferSize = this.ctx.sampleRate * 0.8;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.linearRampToValueAtTime(1400, now + 0.4);
    filter.frequency.exponentialRampToValueAtTime(400, now + 0.8);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.4, now + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);
    noise.start(now);
  }

  public playSwitchClick() {
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(950, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.08);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.7, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.09);
  }

  public playPageTurn() {
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;

    const bufferSize = Math.floor(this.ctx.sampleRate * 0.25);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1100, now);
    filter.Q.setValueAtTime(1.5, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);
    noise.start(now);
  }

  // --- Environmental Ambience ---

  public setAmbience(type?: string) {
    if (this.currentAmbienceType === type) return;
    this.stopAmbience();
    if (!type) return;

    this.initContext();
    if (!this.ctx || !this.ambienceGain) return;

    this.currentAmbienceType = type;
    const now = this.ctx.currentTime;

    if (type === 'cabin' || type === 'lab') {
      // Warm room tone + subtle breeze
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(65, now);

      const oscGain = this.ctx.createGain();
      oscGain.gain.setValueAtTime(0.08, now);

      osc.connect(oscGain);
      oscGain.connect(this.ambienceGain);
      osc.start(now);
      this.activeAmbienceNodes.push(osc, oscGain);
    } else if (type === 'ocean-waves' || type === 'coastal-wind') {
      // Pink noise surge imitating ocean waves / coastal wind
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99 * b0 + white * 0.05;
        b1 = 0.96 * b1 + white * 0.11;
        b2 = 0.86 * b2 + white * 0.25;
        data[i] = (b0 + b1 + b2) * 0.3;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(350, now);

      // LFO for surf wave surging
      const lfo = this.ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.12, now); // ~8 second swell
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(250, now);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start(now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.18, now);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ambienceGain);
      noise.start(now);

      this.activeAmbienceNodes.push(noise, filter, lfo, lfoGain, gain);
    } else if (type === 'storm') {
      // Heavy wind and low storm rumble
      const osc = this.ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(45, now);

      const oscGain = this.ctx.createGain();
      oscGain.gain.setValueAtTime(0.12, now);

      osc.connect(oscGain);
      oscGain.connect(this.ambienceGain);
      osc.start(now);

      // Rain hiss
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.08;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.Q.setValueAtTime(1.0, now);

      noise.connect(filter);
      filter.connect(this.ambienceGain);
      noise.start(now);

      this.activeAmbienceNodes.push(osc, oscGain, noise, filter);
    }
  }

  public stopAmbience() {
    this.activeAmbienceNodes.forEach(node => {
      try {
        const source = node as unknown as { stop?: () => void };
        if (typeof source.stop === 'function') {
          source.stop();
        }
        node.disconnect();
      } catch {
        // ignore already stopped nodes
      }
    });
    this.activeAmbienceNodes = [];
    this.currentAmbienceType = null;
  }

  // --- Background Atmospheric Lightning Sound Engine (Frames 4.1 to 5.8) ---

  /**
   * Starts continuous stormy electric ambience bed and schedules realistic lightning strikes
   */
  public startLightLightning() {
    this.initContext();
    if (!this.ctx || !this.lightningGain) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    if (this.isLightningActive) {
      // If already running, trigger an immediate strike for the new frame
      this.triggerLightningStrike(true);
      return;
    }

    this.isLightningActive = true;

    // 1. Continuous atmospheric electric storm bed (gentle stormy wind & static hum)
    this.startContinuousStormBed();

    // 2. Trigger an immediate audible lightning strike
    this.triggerLightningStrike(true);

    // 3. Regular periodic lightning strikes every 3.6 to 4.8 seconds
    const scheduleNext = () => {
      if (!this.isLightningActive) return;
      const delay = 3600 + Math.random() * 1200;
      this.lightningInterval = window.setTimeout(() => {
        if (!this.isLightningActive || this.isMuted) return;
        this.triggerLightningStrike(false);
        scheduleNext();
      }, delay);
    };

    scheduleNext();
  }

  public stopLightLightning() {
    this.isLightningActive = false;
    if (this.lightningInterval) {
      clearTimeout(this.lightningInterval);
      this.lightningInterval = null;
    }
    this.stopContinuousStormBed();
    this.activeLightningNodes.forEach(node => {
      try {
        const source = node as unknown as { stop?: () => void };
        if (typeof source.stop === 'function') {
          source.stop();
        }
        node.disconnect();
      } catch {
        // Safe catch
      }
    });
    this.activeLightningNodes = [];
  }

  /**
   * Continuous subtle atmospheric stormy wind & low electric static bed
   */
  private startContinuousStormBed() {
    if (!this.ctx || !this.lightningGain) return;
    this.stopContinuousStormBed();
    const now = this.ctx.currentTime;

    // 1. Continuous stormy wind noise
    const bufferSize = this.ctx.sampleRate * 3;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      lastOut = (lastOut + 0.04 * white) / 1.04;
      data[i] = lastOut * 0.4;
    }
    const windSource = this.ctx.createBufferSource();
    windSource.buffer = buffer;
    windSource.loop = true;

    const windFilter = this.ctx.createBiquadFilter();
    windFilter.type = 'lowpass';
    windFilter.frequency.setValueAtTime(420, now);

    // Modulate wind cutoff for natural gusting
    const windLfo = this.ctx.createOscillator();
    windLfo.frequency.setValueAtTime(0.25, now);
    const windLfoGain = this.ctx.createGain();
    windLfoGain.gain.setValueAtTime(180, now);
    windLfo.connect(windLfoGain);
    windLfoGain.connect(windFilter.frequency);
    windLfo.start(now);

    const windGain = this.ctx.createGain();
    windGain.gain.setValueAtTime(0.18, now);

    windSource.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(this.lightningGain);
    windSource.start(now);

    // 2. Continuous subtle low electrical hum (58 Hz with triangle wave)
    const humOsc = this.ctx.createOscillator();
    humOsc.type = 'triangle';
    humOsc.frequency.setValueAtTime(58, now);

    const humGain = this.ctx.createGain();
    humGain.gain.setValueAtTime(0.10, now);

    humOsc.connect(humGain);
    humGain.connect(this.lightningGain);
    humOsc.start(now);

    this.continuousBedNodes = [windSource, windFilter, windLfo, windLfoGain, windGain, humOsc, humGain];
  }

  private stopContinuousStormBed() {
    this.continuousBedNodes.forEach(node => {
      try {
        const source = node as unknown as { stop?: () => void };
        if (typeof source.stop === 'function') {
          source.stop();
        }
        node.disconnect();
      } catch {}
    });
    this.continuousBedNodes = [];
  }

  /**
   * Triggers an unmistakable, rich, authentic lightning strike + rolling thunder
   */
  public triggerLightningStrike(isHeroStrike: boolean = false) {
    this.initContext();
    if (!this.ctx || !this.lightningGain || this.isMuted) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    const now = this.ctx.currentTime;
    const baseVolume = isHeroStrike ? 1.0 : (0.75 + Math.random() * 0.25);

    // =========================================================================
    // LAYER 1: THE ELECTRIC ARC / LIGHTNING ZAP (0ms - 200ms)
    // Auditory signature: Instant, crisp electric snap / discharge (1200 - 4500Hz)
    // Easily cuts through any laptop or phone speaker!
    // =========================================================================
    const zapDuration = 0.18;
    const zapBufferSize = Math.floor(this.ctx.sampleRate * zapDuration);
    const zapBuffer = this.ctx.createBuffer(1, zapBufferSize, this.ctx.sampleRate);
    const zapData = zapBuffer.getChannelData(0);
    for (let i = 0; i < zapBufferSize; i++) {
      // Rapid intermittent spark envelope
      const env = Math.exp(-i / (this.ctx.sampleRate * 0.045));
      zapData[i] = (Math.random() * 2 - 1) * env * (1 + 0.3 * Math.sin(i * 0.1));
    }
    const zapSource = this.ctx.createBufferSource();
    zapSource.buffer = zapBuffer;

    const zapFilter = this.ctx.createBiquadFilter();
    zapFilter.type = 'bandpass';
    zapFilter.frequency.setValueAtTime(2400, now);
    zapFilter.Q.setValueAtTime(2.0, now);

    const zapGain = this.ctx.createGain();
    zapGain.gain.setValueAtTime(0.38 * baseVolume, now);
    zapGain.gain.exponentialRampToValueAtTime(0.001, now + zapDuration);

    zapSource.connect(zapFilter);
    zapFilter.connect(zapGain);
    zapGain.connect(this.lightningGain);
    zapSource.start(now);

    // Fast pitch chirp for high-voltage spark bite
    const chirpOsc = this.ctx.createOscillator();
    chirpOsc.type = 'sawtooth';
    chirpOsc.frequency.setValueAtTime(1800, now);
    chirpOsc.frequency.exponentialRampToValueAtTime(320, now + 0.08);

    const chirpGain = this.ctx.createGain();
    chirpGain.gain.setValueAtTime(0.24 * baseVolume, now);
    chirpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    chirpOsc.connect(chirpGain);
    chirpGain.connect(this.lightningGain);
    chirpOsc.start(now);
    chirpOsc.stop(now + 0.10);

    // =========================================================================
    // LAYER 2: THE THUNDERCLAP & ROLLING REVERBERATION (0.06s - 3.2s)
    // Auditory signature: Multi-peaked resonant roll from 450Hz down to 110Hz
    // =========================================================================
    const thunderStart = now + 0.06;
    const thunderDuration = 3.0;
    const thunderBufferSize = Math.floor(this.ctx.sampleRate * thunderDuration);
    const thunderBuffer = this.ctx.createBuffer(1, thunderBufferSize, this.ctx.sampleRate);
    const thunderData = thunderBuffer.getChannelData(0);
    let brown = 0;
    for (let i = 0; i < thunderBufferSize; i++) {
      const white = Math.random() * 2 - 1;
      brown = (brown + 0.03 * white) / 1.03;
      const progress = i / thunderBufferSize;
      // Multi-peak rolling thunder envelope (initial clap + two echoing waves)
      const clap = Math.sin(Math.min(1, progress * 4) * Math.PI);
      const echo1 = Math.exp(-Math.pow((progress - 0.28) * 6, 2)) * 0.7;
      const echo2 = Math.exp(-Math.pow((progress - 0.55) * 5, 2)) * 0.45;
      const tail = (1 - progress);
      thunderData[i] = brown * 3.8 * (clap + echo1 + echo2) * tail;
    }

    const thunderSource = this.ctx.createBufferSource();
    thunderSource.buffer = thunderBuffer;

    const thunderFilter = this.ctx.createBiquadFilter();
    thunderFilter.type = 'lowpass';
    // Starts with punchy 480Hz energy (audible on small speakers), then rumbles down
    thunderFilter.frequency.setValueAtTime(480, thunderStart);
    thunderFilter.frequency.linearRampToValueAtTime(240, thunderStart + 0.8);
    thunderFilter.frequency.exponentialRampToValueAtTime(85, thunderStart + thunderDuration);

    const thunderGain = this.ctx.createGain();
    thunderGain.gain.setValueAtTime(0.01, thunderStart);
    thunderGain.gain.linearRampToValueAtTime(0.42 * baseVolume, thunderStart + 0.14);
    thunderGain.gain.exponentialRampToValueAtTime(0.001, thunderStart + thunderDuration);

    thunderSource.connect(thunderFilter);
    thunderFilter.connect(thunderGain);
    thunderGain.connect(this.lightningGain);
    thunderSource.start(thunderStart);

    // =========================================================================
    // LAYER 3: DEEP SUB-BASS SLAM (0.06s - 2.2s)
    // For rich bottom-end on headphones & larger speakers
    // =========================================================================
    const subOsc = this.ctx.createOscillator();
    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(74, thunderStart);
    subOsc.frequency.exponentialRampToValueAtTime(36, thunderStart + 1.8);

    const subGain = this.ctx.createGain();
    subGain.gain.setValueAtTime(0.01, thunderStart);
    subGain.gain.linearRampToValueAtTime(0.32 * baseVolume, thunderStart + 0.20);
    subGain.gain.exponentialRampToValueAtTime(0.001, thunderStart + 2.2);

    subOsc.connect(subGain);
    subGain.connect(this.lightningGain);
    subOsc.start(thunderStart);
    subOsc.stop(thunderStart + 2.25);

    this.activeLightningNodes.push(zapSource, zapFilter, zapGain, chirpOsc, chirpGain, thunderSource, thunderFilter, thunderGain, subOsc, subGain);

    // Clean up memory after thunder completes
    setTimeout(() => {
      this.activeLightningNodes = this.activeLightningNodes.filter(
        n => n !== zapSource && n !== chirpOsc && n !== thunderSource && n !== subOsc
      );
    }, 3500);
  }

  // --- Procedural Sonification Engines ---

  /**
   * Ocean Current Flute Sonification:
   * Maps flowing ocean vector velocity to a gentle pentatonic wooden flute melody.
   */
  public startOceanFluteSonification() {
    this.stopSonification();
    this.initContext();
    if (!this.ctx || !this.sonificationGain) return;

    this.isPlayingSonification = 'ocean';
    // Pentatonic scale (D4, E4, G4, A4, B4, D5, E5, G5)
    const notes = [293.66, 329.63, 392.00, 440.00, 493.88, 587.33, 659.25, 783.99];
    let noteIndex = 0;

    const playFluteNote = () => {
      if (!this.ctx || !this.sonificationGain || this.isPlayingSonification !== 'ocean') return;
      const now = this.ctx.currentTime;
      const freq = notes[noteIndex % notes.length];
      noteIndex = (noteIndex + Math.floor(Math.random() * 3) + 1) % notes.length;

      // Primary flute oscillator (sine for pure fundamental)
      const osc1 = this.ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, now);

      // Secondary overtone (triangle for woody hollow resonance)
      const osc2 = this.ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2, now);

      // Breath vibrato LFO
      const vibrato = this.ctx.createOscillator();
      vibrato.frequency.setValueAtTime(5.2, now);
      const vibratoGain = this.ctx.createGain();
      vibratoGain.gain.setValueAtTime(4.0, now);
      vibrato.connect(vibratoGain);
      vibratoGain.connect(osc1.frequency);
      vibratoGain.connect(osc2.frequency);
      vibrato.start(now);

      // Flute envelope (soft attack, sustained breath, gentle release)
      const noteGain = this.ctx.createGain();
      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.linearRampToValueAtTime(0.4, now + 0.18); // breath in
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + 1.4); // fade out

      osc1.connect(noteGain);
      osc2.connect(noteGain);
      noteGain.connect(this.sonificationGain);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 1.5);
      osc2.stop(now + 1.5);
      vibrato.stop(now + 1.5);
    };

    playFluteNote();
    this.oceanSynthInterval = window.setInterval(playFluteNote, 1300);
  }

  /**
   * Lightning Electric Guitar Sonification:
   * Maps sudden optical flash transients to overdriven pentatonic guitar power riffs.
   */
  public startLightningGuitarSonification() {
    this.stopSonification();
    this.initContext();
    if (!this.ctx || !this.sonificationGain) return;

    this.isPlayingSonification = 'lightning';
    // E minor pentatonic blues scale (E2, G2, A2, B2, D3, E3, G3)
    const guitarFrequencies = [82.41, 98.00, 110.00, 123.47, 146.83, 164.81, 196.00, 220.00];

    // Distortion waveshaper
    const waveShaper = this.ctx.createWaveShaper();
    const curve = new Float32Array(256);
    const deg = Math.PI / 180;
    const k = 40; // overdrive amount
    for (let i = 0; i < 256; i++) {
      const x = (i * 2) / 256 - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    waveShaper.curve = curve;
    waveShaper.oversample = '4x';

    const guitarFilter = this.ctx.createBiquadFilter();
    guitarFilter.type = 'lowpass';
    guitarFilter.frequency.setValueAtTime(2400, this.ctx.currentTime);
    waveShaper.connect(guitarFilter);
    guitarFilter.connect(this.sonificationGain);

    const playGuitarRiff = () => {
      if (!this.ctx || !this.sonificationGain || this.isPlayingSonification !== 'lightning') return;
      const now = this.ctx.currentTime;
      const root = guitarFrequencies[Math.floor(Math.random() * guitarFrequencies.length)];

      // Double saw waves slightly detuned for chorus thickness
      const saw1 = this.ctx.createOscillator();
      saw1.type = 'sawtooth';
      saw1.frequency.setValueAtTime(root, now);

      const saw2 = this.ctx.createOscillator();
      saw2.type = 'sawtooth';
      saw2.frequency.setValueAtTime(root * 1.008, now);

      // Fifth harmonic power chord
      const saw5 = this.ctx.createOscillator();
      saw5.type = 'sawtooth';
      saw5.frequency.setValueAtTime(root * 1.5, now);

      const riffGain = this.ctx.createGain();
      riffGain.gain.setValueAtTime(0.01, now);
      riffGain.gain.linearRampToValueAtTime(0.5, now + 0.02); // sharp pick strike
      riffGain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

      saw1.connect(riffGain);
      saw2.connect(riffGain);
      saw5.connect(riffGain);
      riffGain.connect(waveShaper);

      saw1.start(now);
      saw2.start(now);
      saw5.start(now);
      saw1.stop(now + 0.9);
      saw2.stop(now + 0.9);
      saw5.stop(now + 0.9);
    };

    playGuitarRiff();
    this.lightningSynthInterval = window.setInterval(playGuitarRiff, 750);
  }

  /**
   * Earth Jukebox Combined Master Mix:
   * Polyphonically synthesizes both the flowing ocean flute melody and the driving lightning guitar rhythm!
   */
  public startCombinedEarthJukebox() {
    this.stopSonification();
    this.initContext();
    if (!this.ctx || !this.sonificationGain) return;

    this.isPlayingSonification = 'combined';

    // Ocean flute scale notes in E Dorian (E4, F#4, G4, A4, B4, C#5, D5)
    const fluteNotes = [329.63, 369.99, 392.00, 440.00, 493.88, 554.37, 587.33];
    let fluteIdx = 0;

    // Guitar chords (E5, G5, A5, D5)
    const guitarChords = [82.41, 98.0, 110.0, 73.42];
    let chordIdx = 0;

    const waveShaper = this.ctx.createWaveShaper();
    const curve = new Float32Array(256);
    const k = 28;
    for (let i = 0; i < 256; i++) {
      const x = (i * 2) / 256 - 1;
      curve[i] = ((3 + k) * x * 15 * (Math.PI / 180)) / (Math.PI + k * Math.abs(x));
    }
    waveShaper.curve = curve;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2200, this.ctx.currentTime);
    waveShaper.connect(filter);
    filter.connect(this.sonificationGain);

    const stepTick = () => {
      if (!this.ctx || !this.sonificationGain || this.isPlayingSonification !== 'combined') return;
      const now = this.ctx.currentTime;

      // 1. Play Flute melody
      const fluteFreq = fluteNotes[fluteIdx % fluteNotes.length];
      fluteIdx++;

      const fOsc = this.ctx.createOscillator();
      fOsc.type = 'sine';
      fOsc.frequency.setValueAtTime(fluteFreq, now);

      const fGain = this.ctx.createGain();
      fGain.gain.setValueAtTime(0.01, now);
      fGain.gain.linearRampToValueAtTime(0.28, now + 0.15);
      fGain.gain.exponentialRampToValueAtTime(0.001, now + 0.95);

      fOsc.connect(fGain);
      fGain.connect(this.sonificationGain);
      fOsc.start(now);
      fOsc.stop(now + 1.0);

      // 2. Play Rhythm Guitar pulse
      if (fluteIdx % 2 === 0) {
        const root = guitarChords[chordIdx % guitarChords.length];
        chordIdx++;

        const gOsc1 = this.ctx.createOscillator();
        gOsc1.type = 'sawtooth';
        gOsc1.frequency.setValueAtTime(root, now);

        const gOsc2 = this.ctx.createOscillator();
        gOsc2.type = 'sawtooth';
        gOsc2.frequency.setValueAtTime(root * 1.5, now);

        const gGain = this.ctx.createGain();
        gGain.gain.setValueAtTime(0.01, now);
        gGain.gain.linearRampToValueAtTime(0.25, now + 0.03);
        gGain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

        gOsc1.connect(gGain);
        gOsc2.connect(gGain);
        gGain.connect(waveShaper);

        gOsc1.start(now);
        gOsc2.start(now);
        gOsc1.stop(now + 0.7);
        gOsc2.stop(now + 0.7);
      }
    };

    stepTick();
    this.combinedSynthInterval = window.setInterval(stepTick, 550);
  }

  public stopSonification() {
    if (this.oceanSynthInterval) {
      clearInterval(this.oceanSynthInterval);
      this.oceanSynthInterval = null;
    }
    if (this.lightningSynthInterval) {
      clearInterval(this.lightningSynthInterval);
      this.lightningSynthInterval = null;
    }
    if (this.combinedSynthInterval) {
      clearInterval(this.combinedSynthInterval);
      this.combinedSynthInterval = null;
    }
    this.isPlayingSonification = null;
  }

  // --- Volume & Master Controls ---

  public setMasterVolume(vol: number) {
    this.masterVolume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.setValueAtTime(this.masterVolume, this.ctx.currentTime);
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.masterVolume, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }
}

export const soundEngine = new SoundEngine();
