# The Legend of Ohm
### A Musical Journey Through Our Planet

**NASA Space Apps Challenge 2026 — The Earth Information Jukebox**

> What if the greatest musician in the world was never a person at all? What if it was Earth itself?

## Overview

**The Legend of Ohm** is an illustrated, interactive web storytelling project that explores **sonification**: representing information about the natural world through music. It follows a fictional Traveller–Musician as he discovers rhythms in the wind, ocean currents, and lightning, and turns those discoveries into flute and electric-guitar compositions.

The experience combines cinematic, painterly cel-shaded storyboard art, frame-by-frame interaction, spoken narration, scientific context, and scene-specific soundtracks. It was conceived for NASA Space Apps Challenge 2026's **Earth Information Jukebox** challenge, drawing inspiration from NASA Earth Information Center visualizations.

**Project title:** The Legend of Ohm  
**Challenge:** [The Earth Information Jukebox](https://www.spaceappschallenge.org/2026/challenges/the-earth-information-jukebox/)  
**Format:** Interactive static web application  
**Hosting:** Netlify (free-tier compatible, subject to usage limits)

## The Story

The user enters the adventure through a sealed parchment scroll. Opening its wax seal reveals a letter from Earth and invites the visitor to follow the Traveller–Musician across six chapters.

| Chapter | Story | Science/music connection |
| --- | --- | --- |
| **1. The Call of the Wind** | A mysterious whisper draws the traveller away from his cabin. | Listening to patterns in nature. |
| **2. The Ocean Shoreline** | He discovers a conch shell and the musical character of wind and waves. | Introducing environmental sound and observation. |
| **3. The Ocean's Flute** | He carves a flute, plays beside the sea, and studies a map of ocean currents. | Ocean-current patterns inspire flowing flute melodies. |
| **4. The Open Waters & the Storm** | The sea falls silent and a yellow lightning strike changes the journey. | Contrasting continuous and sudden natural phenomena. |
| **5. The Lightning Symphony** | He constructs an electric guitar, interprets storm patterns, rides through the mountains, and records geographical variations on maps. | Lightning observations inspire guitar rhythm and intensity. |
| **6. The Earth Jukebox** | He brings the two musical interpretations together in a modest workshop. | Comparing and combining data-inspired soundscapes. |

The storyboard contains **27 story frames**, plus **one opening illustration**. Frame assets follow the naming pattern `s1.1.png` through `s6.4.png`, with `s0 start.png` for the introduction.

## What We Developed

- **Interactive narrative:** Move through the illustrated story one frame at a time, with chapter transitions, back/forward controls, and progress tracking.
- **Cinematic presentation:** Full-scene illustrations with warm lantern light, parchment textures, stormy landscapes, ocean blues, and golden-yellow lightning. The art avoids excessive neon or complicated sci-fi interfaces.
- **Scroll-based introduction:** A wax-sealed parchment opening that acts as the entrance to the story.
- **Narration:** On-screen story text and optional spoken passages using the browser's built-in text-to-speech capability.
- **Science notes:** Short contextual explanations of NASA-inspired Earth observations and the idea of sonification.
- **Three audio slots:** Ocean/flute for Chapter 3, lightning/guitar for Chapter 5, and a combined master mix for Chapter 6. Audio can be selected temporarily from a visitor's computer or bundled into the published site.
- **Static deployment:** No database, paid API, or backend is required for the current website.

### Narrator character

An **elderly male storyteller** was separately designed with silver-gray hair, a white beard, round glasses, scholarly expedition clothing, and expressive hand gestures. Three speaking poses were illustrated for future integration. **The current website package uses a simpler narrator icon and browser speech; the illustrated speaking poses are not yet an animated, lip-synced character in the site.**

## How Sonification Is Used

Sonification converts measurements or properties extracted from visual data into sound parameters such as pitch, rhythm, duration, timbre, or intensity.

**Ocean currents → flute:** The fluid motion of ocean circulation is interpreted as smooth, evolving musical phrases. The project uses blue/cyan as the ocean's visual identity.

**Lightning → electric guitar:** The irregular, energetic character of lightning activity is interpreted through sharper rhythmic and tonal changes. The project uses natural yellow/amber lightning as its visual identity.

**Master mix:** Both interpretations are presented together to communicate how different Earth phenomena can have contrasting musical identities.

**Scientific distinction:** The compositions are *artistic, data-inspired interpretations*, not literal sound recordings made by NASA satellites. The exact source datasets, processing steps, mapping functions, and scientific attributions should be documented and verified before claiming a reproducible, automated data-to-audio pipeline.

## Technologies

| Area | Technology / approach |
| --- | --- |
| Website | HTML5, CSS3, vanilla JavaScript |
| Story interaction | Client-side frame/chapter navigation |
| Narration | Web Speech API (`speechSynthesis`), dependent on browser/device voice availability |
| Audio | HTML5 browser audio playback and local audio-file selection |
| Artwork | AI-assisted, painterly cel-shaded storyboard and character illustrations |
| Hosting | Netlify static hosting |
| Development / preview | VS Code Live Server or Python's built-in HTTP server |

The inspected website package is a **static HTML/CSS/JavaScript project**; it does **not** require React, npm, or a build step.

## Project Structure

```text
earth-jukebox/
├── index.html              # Page layout and scroll/story interface
├── style.css               # Visual theme, layout, transitions
├── app.js                  # Story content, navigation, narration, audio
├── audio-config.json       # Paths for bundled soundtracks
├── audio/                  # Optional soundtrack files
└── public/
    └── images/
        ├── s0 start.png    # Opening illustration
        ├── s1.1.png ...    # Story frames
        └── s6.4.png
```

## Run Locally

1. Extract the website ZIP.
2. Open the **`earth-jukebox`** folder in VS Code.
3. Right-click `index.html` and choose **Open with Live Server**.
4. Open the address provided by Live Server.

Alternatively, from the project folder:

```bash
python -m http.server 8080
```

Then visit `http://localhost:8080`.

Use a local server rather than opening the HTML through `file://`, because browsers may restrict loading the JSON audio configuration from local files.

## Add the Three Soundtracks

Place your audio files in the `audio/` directory:

```text
audio/
├── ocean-flute.mp3
├── lightning-guitar.mp3
└── master-mix.mp3
```

Update `audio-config.json`:

```json
{
  "ocean": "audio/ocean-flute.mp3",
  "lightning": "audio/lightning-guitar.mp3",
  "master": "audio/master-mix.mp3"
}
```

Use relative paths so the site works when served from a subfolder as well as from the Netlify domain root. Browser autoplay policies may require the visitor to click before audio begins. Selecting files through the Audio panel only loads them into the current browser session; it does not upload them to the hosted site.

## Deploy on Netlify

1. Open [Netlify Drop](https://app.netlify.com/drop).
2. Sign in to Netlify.
3. Upload the **extracted website folder** containing `index.html`, `style.css`, `app.js`, and its asset folders.
4. Netlify publishes a shareable website URL.
5. To update the site, upload the revised files again or connect a Git repository for deployments.

This is a static site, so no server-side environment variables or paid services are necessary for the documented features. Netlify's free plan has usage limits.

## Current Status and Next Steps

The inspected website archive includes the 28 storyboard images, frame navigation, narration controls, and configurable audio slots. The following are still integration or verification tasks:

- Update the website's visible branding from **Earth Jukebox** to the final title **The Legend of Ohm**; the challenge name may remain in the science context.
- Add the three final audio files to the published `audio/` folder.
- Replace the basic narrator icon with the selected elderly narrator's illustrated poses; animate gesture changes if desired.
- Add precise NASA dataset titles, URLs, credits, variables, and sonification mapping details once confirmed.
- Test all chapters, narration, image loading, and audio on desktop and mobile after deployment.

## Why It Matters

Scientific visualizations can be difficult to interpret for audiences without a technical background. **The Legend of Ohm** uses a character-led adventure to introduce the idea that environmental observations can be experienced in multiple ways—not just seen, but also interpreted through music. The aim is to inspire curiosity about NASA Earth science while connecting data, creative expression, and accessible web storytelling.

## Acknowledgments

- **NASA Space Apps Challenge 2026** — The Earth Information Jukebox challenge.
- **NASA Earth Information Center** — inspiration for environmental visualization and science storytelling.
- Project storyboard, narrative design, illustration direction, and music concept developed for **The Legend of Ohm**.

> **The Earth has patterns. We turn them into music.**

