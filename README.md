# Earth Jukebox — A Musical Journey Through Our Planet

An interactive, illustrated storytelling web application inspired by the **NASA Space Apps Challenge 2026**: [The Earth Information Jukebox](https://www.spaceappschallenge.org/2026/challenges/the-earth-information-jukebox/).

Earth Jukebox explores how NASA Earth observation data and environmental visualizations can be translated into music through **algorithmic data sonification**. The story follows the **Traveller–Musician** as he discovers the hidden musical language of nature, translates ocean currents into wooden flute melodies, maps lightning transients into overdriven electric guitar riffs, and brings them together in the Earth Jukebox.

---

## 🌟 Key Features

1. **Antique Parchment Scroll Opening Experience**:
   - Realistic rolled parchment with rotating wooden rods, feathered quill, compass, and candlelit ambient flicker.
   - Interactive 3D styled crimson wax seal that cracks upon clicking, unrolling the personalized manuscript and invitation to begin.
   - Quick-access "Skip Intro" option.

2. **Cinematic Storytelling Engine**:
   - 6 distinct scenes spanning 27 storyboard frames.
   - Advances one frame per click (left/right click zones, on-screen brass controls, or keyboard arrow keys).
   - Cinematic camera animations (push-in, pan-slow, zoom-out, atmospheric dissolve, storm flash).
   - Dynamic environmental particle effects (dust motes, lightning flash ambient glow).
   - Autoplay toggle with timing pacing.

3. **Narrator System ("The Chronicler")**:
   - Handcrafted painterly character portrait with subtle breathing, blinking, and vocal energy aura.
   - Full Web Speech API voice synthesis with natural storytelling cadence.
   - Replay narration, voice mute toggle, and subtitle toggle.

4. **NASA Educational Sonification Panels**:
   - **Ocean Current Sonification (after Frame 3.5)**: NASA ECCO (Estimating the Circulation and Climate of the Ocean) flow velocity and vorticity mapped to pentatonic flute timbres. Includes "Listen to the Ocean" audio player.
   - **Lightning Transient Sonification (after Frame 5.8)**: NASA ISS-LIS / OTD optical flash rates and radiant energy mapped to electric guitar riffs. Includes "Listen to the Storm" audio player.
   - Explanatory diagrams: *Earth Observation → Data Extraction → Musical Mapping → Instrument Sound*.

5. **Earth Jukebox Workstation (Scene 6)**:
   - Canonical dual-screen console:
     - **Left Channel (Ocean Currents)**: Cyan/blue theme, flute waveform, flow velocity harmonics.
     - **Right Channel (Lightning)**: Warm yellow/gold theme, electric guitar overdrive waveform, optical pulse triggers.
   - Master physical brass toggle switch.
   - 3-Track interactive mixer:
     1. Ocean Flute Solo
     2. Lightning Guitar Solo
     3. Combined Earth Jukebox Master Composition
   - Built-in procedural Web Audio synthesizer engine (works offline without external files).
   - Custom file uploader: load your own MP3/WAV files for all tracks live.

6. **Full Asset Manager & Table of Contents**:
   - In-app Table of Contents to jump to any scene or frame.
   - Asset Manager with status indicators for all 27 frames and live file replacement.
   - NASA Data & Scientific Credits modal.

---

## 📁 Asset Directory Structure

```
public/
  images/
    opening/
      s0_start.png              # Opening desk & table scene
    characters/
      narrator.png              # Narrator storyteller portrait
    scene-1/
      s1_1.png ... s1_4.png     # Scene 1 frames
    scene-2/
      s2_1.png ... s2_4.png     # Scene 2 frames
    scene-3/
      s3_1.png ... s3_5.png     # Scene 3 frames (3.5 is Ocean Current Map)
    scene-4/
      s4_1.png ... s4_2.png     # Scene 4 frames
    scene-5/
      s5_1.png ... s5_8.png     # Scene 5 frames (5.8 is Lightning Variation Map)
    scene-6/
      s6_1.png ... s6_4.png     # Scene 6 frames (6.4 is Earth Jukebox Symphony)
  audio/
    sonification/
      ocean_flute.mp3           # Ocean current sonification audio
      lightning_guitar.mp3      # Lightning sonification audio
      earth_jukebox_master.mp3  # Combined final mix
    narration/                  # Optional pre-recorded voice files
    ambience/                   # Ambient environmental loops
  maps/
    ocean_currents.png          # High-resolution ocean currents map
    lightning_variation.png     # High-resolution lightning variation map
  _redirects                    # Netlify SPA routing rules
```

---

## 🚀 Running Locally

Ensure you have **Node.js** (v18+) installed.

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 📦 Building for Production & Netlify

The application is completely static and built specifically for free Netlify hosting with zero backend requirements.

```bash
npm run build
```

The output will be generated in the `dist/` directory.

### Netlify Deployment Settings:
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **SPA Redirects**: Included in `public/_redirects` (`/* /index.html 200`)
