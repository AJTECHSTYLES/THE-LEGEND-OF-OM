import { StoryFrame, StoryScene } from '../types/story';

export const GITHUB_REPO_URL = 'https://github.com/AJTECHSTYLES/THE-LEGEND-OF-OM';

export const STORY_SCENES: StoryScene[] = [
  {
    id: 1,
    title: 'Scene 1: The Call of the Wind',
    subtitle: 'A mysterious melody calls the Traveller into the unknown',
    colorTheme: 'from-amber-950/40 via-stone-900/60 to-black',
    frames: [
      {
        id: '1.1',
        sceneId: 1,
        frameNumber: 1,
        sceneTitle: 'The Call of the Wind',
        frameTitle: 'Establishing Shot',
        image: '/images/scene-1/s1_1.png',
        fallbackImage: '/images/s1.1.png',
        narration: 'Somewhere between silence and sound lived a traveller searching for the greatest musician the world had ever known.',
        ambience: 'cabin',
        animationPreset: 'push-in',
        visualNote: 'The Traveller works in his dimly lit wooden cabin surrounded by acoustic sketches and instruments.'
      },
      {
        id: '1.2',
        sceneId: 1,
        frameNumber: 2,
        sceneTitle: 'The Call of the Wind',
        frameTitle: 'The Catalyst',
        image: '/images/scene-1/s1_2.png',
        fallbackImage: '/images/s1.2.png',
        narration: 'One evening, a mysterious melody drifted through his window.',
        ambience: 'cabin',
        animationPreset: 'dissolve',
        visualNote: 'A candle flickers unexpectedly as a gentle breeze enters the room.'
      },
      {
        id: '1.3',
        sceneId: 1,
        frameNumber: 3,
        sceneTitle: 'The Call of the Wind',
        frameTitle: 'The Whisper',
        image: '/images/scene-1/s1_3.png',
        fallbackImage: '/images/s1.3.png',
        narration: 'It was unlike anything he had heard before. The wind seemed to be calling him.',
        ambience: 'coastal-wind',
        animationPreset: 'pan-slow',
        visualNote: 'The traveller gazes outside into the night, sensing the voice of nature.'
      },
      {
        id: '1.4',
        sceneId: 1,
        frameNumber: 4,
        sceneTitle: 'The Call of the Wind',
        frameTitle: 'The Chase',
        image: '/images/scene-1/s1_4.png',
        fallbackImage: '/images/s1.4.png',
        narration: 'And so, he followed the invisible melody into the unknown.',
        ambience: 'coastal-wind',
        animationPreset: 'push-in',
        visualNote: 'He rushes outside, embarking on a quest to uncover the sound.'
      }
    ]
  },
  {
    id: 2,
    title: 'Scene 2: The Ocean Shoreline',
    subtitle: 'Where waves and wind perform an eternal rhythm',
    colorTheme: 'from-cyan-950/40 via-sky-950/60 to-black',
    frames: [
      {
        id: '2.1',
        sceneId: 2,
        frameNumber: 1,
        sceneTitle: 'The Ocean Shoreline',
        frameTitle: 'Location Reveal',
        image: '/images/scene-2/s2_1.png',
        fallbackImage: '/images/s2.1.png',
        narration: 'His journey brought him to the ocean, where the waves moved with a rhythm of their own.',
        ambience: 'ocean-waves',
        animationPreset: 'pan-slow',
        visualNote: 'Dramatic coastline where the land meets churning sea swells.'
      },
      {
        id: '2.2',
        sceneId: 2,
        frameNumber: 2,
        sceneTitle: 'The Ocean Shoreline',
        frameTitle: 'The Discovery',
        image: '/images/scene-2/s2_2.png',
        fallbackImage: '/images/s2.2.png',
        narration: 'Hidden beneath the sand, he found a shell carrying the voice of the sea.',
        ambience: 'ocean-waves',
        animationPreset: 'push-in',
        visualNote: 'A weathered spiral conch shell rests among tidal sands.'
      },
      {
        id: '2.3',
        sceneId: 2,
        frameNumber: 3,
        sceneTitle: 'The Ocean Shoreline',
        frameTitle: 'Listening to the Ocean',
        image: '/images/scene-2/s2_3.png',
        fallbackImage: '/images/s2.3.png',
        narration: "As he listened, he began to understand that nature's movements could become music.",
        ambience: 'ocean-waves',
        animationPreset: 'dissolve',
        visualNote: 'He holds the conch to his ear, listening intently to the resonant ocean harmonic.'
      },
      {
        id: '2.4',
        sceneId: 2,
        frameNumber: 4,
        sceneTitle: 'The Ocean Shoreline',
        frameTitle: 'The Wind Entity',
        image: '/images/scene-2/s2_4.png',
        fallbackImage: '/images/s2.4.png',
        narration: 'The wind itself seemed to awaken, inviting him to join its endless performance.',
        ambience: 'coastal-wind',
        animationPreset: 'parallax',
        visualNote: 'Swirling luminous currents of wind take ethereal shape above the coastline.'
      }
    ]
  },
  {
    id: 3,
    title: 'Scene 3: The Flute and Ocean Currents',
    subtitle: 'Crafting the instrument of the tides and mapping global circulation',
    colorTheme: 'from-teal-950/40 via-cyan-950/60 to-black',
    frames: [
      {
        id: '3.1',
        sceneId: 3,
        frameNumber: 1,
        sceneTitle: 'The Flute and Ocean Currents',
        frameTitle: 'The Invention',
        image: '/images/scene-3/s3_1.png',
        fallbackImage: '/images/s3.1.png',
        narration: 'Inspired by the wind, he crafted an instrument capable of answering its call.',
        ambience: 'cabin',
        animationPreset: 'push-in',
        visualNote: 'Beside a warm campfire, he carves tone holes into a smooth wooden flute.'
      },
      {
        id: '3.2',
        sceneId: 3,
        frameNumber: 2,
        sceneTitle: 'The Flute and Ocean Currents',
        frameTitle: 'The Performance',
        image: '/images/scene-3/s3_2.png',
        fallbackImage: '/images/s3.2.png',
        narration: 'Each note echoed the gentle rise and fall of the sea.',
        ambience: 'ocean-waves',
        animationPreset: 'dissolve',
        visualNote: 'Overlooking the vast ocean, the traveler plays a soft melodic line.'
      },
      {
        id: '3.3',
        sceneId: 3,
        frameNumber: 3,
        sceneTitle: 'The Flute and Ocean Currents',
        frameTitle: 'The Duet',
        image: '/images/scene-3/s3_3.png',
        fallbackImage: '/images/s3.3.png',
        narration: 'The wind, the ocean, and his flute became part of one living melody.',
        ambience: 'ocean-waves',
        animationPreset: 'parallax',
        visualNote: 'Wind currents and curling wave forms intertwine with his flute notes in radiant harmony.'
      },
      {
        id: '3.4',
        sceneId: 3,
        frameNumber: 4,
        sceneTitle: 'The Flute and Ocean Currents',
        frameTitle: 'The Journey Begins',
        image: '/images/scene-3/s3_4.png',
        fallbackImage: '/images/s3.4.png',
        narration: 'Realizing the wind and sea were performing an endless, living symphony, the explorer packed his gear and set out across the open oceans to witness the grand art of the wind and the ocean waves firsthand.',
        ambience: 'ocean-waves',
        animationPreset: 'pan-slow',
        visualNote: 'He hoists sails on his wooden vessel, setting voyage across open waters.'
      },
      {
        id: '3.5',
        sceneId: 3,
        frameNumber: 5,
        sceneTitle: 'The Flute and Ocean Currents',
        frameTitle: 'The Ocean Current Map',
        image: '/images/scene-3/s3_5.png',
        fallbackImage: '/images/s3.5.png',
        narration: "By studying Earth's ocean currents, he discovered that flowing water carried patterns that could be translated into sound.",
        ambience: 'ocean-waves',
        animationPreset: 'zoom-out',
        hasEducationalPanel: true,
        educationalPanelType: 'ocean',
        hasAudioIntegration: true,
        audioTrackType: 'ocean-flute',
        visualNote: "The illustrated chart reveals Earth's immense global ocean gyres and flow pathways."
      },
      {
        id: '3.video',
        sceneId: 3,
        frameNumber: 6,
        sceneTitle: 'The Flute and Ocean Currents',
        frameTitle: 'Ocean Current Sonification',
        image: '/images/scene-3/s3_5.png',
        fallbackImage: '/images/s3.5.png',
        narration: 'Witness the living flow of ocean currents transformed into a wind and flute melody.',
        isVideoFrame: true,
        videoSrc: '/videos/video_1.mp4',
        visualNote: 'Video 1: NASA Ocean circulation observation data sonified into music.'
      }
    ]
  },
  {
    id: 4,
    title: 'Scene 4: The Open Waters and the Storm',
    subtitle: 'Into darkness, silence gives way to thunder',
    colorTheme: 'from-indigo-950/50 via-slate-900/70 to-black',
    frames: [
      {
        id: '4.1',
        sceneId: 4,
        frameNumber: 1,
        sceneTitle: 'The Open Waters and the Storm',
        frameTitle: 'The Silence',
        image: '/images/scene-4/s4_1.png',
        fallbackImage: '/images/s4.1.png',
        narration: 'But as he travelled farther, the gentle music began to disappear.',
        ambience: 'ocean-waves',
        animationPreset: 'pan-slow',
        visualNote: 'Dark, calm, ominous ocean waters stretch beneath heavy storm clouds.'
      },
      {
        id: '4.2',
        sceneId: 4,
        frameNumber: 2,
        sceneTitle: 'The Open Waters and the Storm',
        frameTitle: 'The Strike',
        image: '/images/scene-4/s4_2.png',
        fallbackImage: '/images/s4.2.png',
        narration: 'Then, without warning, the heavens erupted with a new kind of rhythm.',
        ambience: 'storm',
        animationPreset: 'storm-flash',
        visualNote: 'A brilliant golden-yellow lightning bolt shatters the twilight sky.'
      }
    ]
  },
  {
    id: 5,
    title: 'Scene 5: Lightning and the Electric Guitar',
    subtitle: 'Capturing electric transients and scoring global storm variations',
    colorTheme: 'from-amber-950/50 via-yellow-950/30 to-black',
    frames: [
      {
        id: '5.1',
        sceneId: 5,
        frameNumber: 1,
        sceneTitle: 'Lightning and the Electric Guitar',
        frameTitle: 'The Invention',
        image: '/images/scene-5/s5_1.png',
        fallbackImage: '/images/s5.1.png',
        narration: "To understand the storm's powerful voice, he created an instrument capable of expressing its energy.",
        ambience: 'storm',
        animationPreset: 'push-in',
        visualNote: 'Sheltered in a rock overhang, he crafts a custom electric guitar with copper wiring.'
      },
      {
        id: '5.2',
        sceneId: 5,
        frameNumber: 2,
        sceneTitle: 'Lightning and the Electric Guitar',
        frameTitle: 'The Capture',
        image: '/images/scene-5/s5_2.png',
        fallbackImage: '/images/s5.2.png',
        narration: 'He studied the sudden flashes and changing patterns of the storm.',
        ambience: 'storm',
        animationPreset: 'dissolve',
        visualNote: 'Observing electric discharge spikes and atmospheric lightning bursts.'
      },
      {
        id: '5.3',
        sceneId: 5,
        frameNumber: 3,
        sceneTitle: 'Lightning and the Electric Guitar',
        frameTitle: 'Signal Translation',
        image: '/images/scene-5/s5_3.png',
        fallbackImage: '/images/s5.3.png',
        narration: "By converting the storm's changing measurements into musical notes, he discovered a fierce new rhythm.",
        ambience: 'storm',
        animationPreset: 'push-in',
        visualNote: 'A compact decoder screen displays pulse intervals mapped to musical tablature.'
      },
      {
        id: '5.4',
        sceneId: 5,
        frameNumber: 4,
        sceneTitle: 'Lightning and the Electric Guitar',
        frameTitle: 'Playing to the Pattern',
        image: '/images/scene-5/s5_4.png',
        fallbackImage: '/images/s5.4.png',
        narration: 'His guitar answered the lightning with powerful riffs.',
        ambience: 'storm',
        animationPreset: 'parallax',
        visualNote: 'He strikes overdriven power chords atop the cliff, matching the storm cadence.'
      },
      {
        id: '5.5',
        sceneId: 5,
        frameNumber: 5,
        sceneTitle: 'Lightning and the Electric Guitar',
        frameTitle: 'The Lightning Stage',
        image: '/images/scene-5/s5_5.png',
        fallbackImage: '/images/s5.5.png',
        narration: 'The storm and his instrument now seemed to speak the same musical language.',
        ambience: 'storm',
        animationPreset: 'storm-flash',
        visualNote: 'Sky and guitar unite in electrifying synchronized energy.'
      },
      {
        id: '5.6',
        sceneId: 5,
        frameNumber: 6,
        sceneTitle: 'Lightning and the Electric Guitar',
        frameTitle: 'The Motorcycle Journey',
        image: '/images/scene-5/s5_6.png',
        fallbackImage: '/images/s5.6.png',
        narration: "With the storm's melody captured, he travelled onward, searching for the patterns connecting Earth's many voices.",
        ambience: 'mountain',
        animationPreset: 'pan-slow',
        visualNote: 'He rides a rugged vintage motorcycle through scenic mountain passes.'
      },
      {
        id: '5.7',
        sceneId: 5,
        frameNumber: 7,
        sceneTitle: 'Lightning and the Electric Guitar',
        frameTitle: 'Creating the Map',
        image: '/images/scene-5/s5_7.png',
        fallbackImage: '/images/s5.7.png',
        narration: 'He carefully recorded his discoveries, marking the places where nature revealed its changing rhythms.',
        ambience: 'cabin',
        animationPreset: 'push-in',
        visualNote: 'Plotting flash frequencies and geographic hot spots onto a world parchment map.'
      },
      {
        id: '5.8',
        sceneId: 5,
        frameNumber: 8,
        sceneTitle: 'Lightning and the Electric Guitar',
        frameTitle: 'The Completed Map',
        image: '/images/scene-5/s5_8.png',
        fallbackImage: '/images/s5.8.png',
        narration: "Across the world, the storm's patterns changed, revealing that every region carried a different musical possibility.",
        ambience: 'storm',
        animationPreset: 'zoom-out',
        hasEducationalPanel: true,
        educationalPanelType: 'lightning',
        hasAudioIntegration: true,
        audioTrackType: 'lightning-guitar',
        visualNote: 'The finished global lightning distribution map displays regional flash densities.'
      },
      {
        id: '5.video',
        sceneId: 5,
        frameNumber: 9,
        sceneTitle: 'Lightning and the Electric Guitar',
        frameTitle: 'Lightning Storm Sonification',
        image: '/images/scene-5/s5_8.png',
        fallbackImage: '/images/s5.8.png',
        narration: 'Experience the sudden electrical pulse of the heavens captured as an electric guitar riff.',
        isVideoFrame: true,
        videoSrc: '/videos/video_2.mp4',
        visualNote: 'Video 2: NASA orbital lightning transient sensor data mapped to overdriven guitar.'
      }
    ]
  },
  {
    id: 6,
    title: 'Scene 6: The Earth Jukebox',
    subtitle: 'Where ocean currents and lightning unite in the supreme symphony of Earth',
    colorTheme: 'from-amber-950/60 via-stone-900/80 to-black',
    frames: [
      {
        id: '6.1',
        sceneId: 6,
        frameNumber: 1,
        sceneTitle: 'The Earth Jukebox',
        frameTitle: 'The Lab',
        image: '/images/scene-6/s6_1.png',
        fallbackImage: '/images/s6.1.png',
        narration: 'After travelling across oceans and mountains, he returned home carrying the music of the Earth.',
        ambience: 'lab',
        animationPreset: 'push-in',
        visualNote: 'Inside his rustic workshop with warm lanterns, wooden shelving, and compact acoustic monitors.'
      },
      {
        id: '6.2',
        sceneId: 6,
        frameNumber: 2,
        sceneTitle: 'The Earth Jukebox',
        frameTitle: 'The Interface',
        image: '/images/scene-6/s6_2.png',
        fallbackImage: '/images/s6.2.png',
        narration: "He brought the ocean's gentle melody and the storm's powerful rhythm together into one musical creation.",
        ambience: 'lab',
        animationPreset: 'dissolve',
        visualNote: 'Two small screens side by side: Ocean Currents (Muted Blue/Cyan, Flute) and Lightning (Warm Yellow/Gold, Electric Guitar).'
      },
      {
        id: '6.3',
        sceneId: 6,
        frameNumber: 3,
        sceneTitle: 'The Earth Jukebox',
        frameTitle: 'Power On',
        image: '/images/scene-6/s6_3.png',
        fallbackImage: '/images/s6.3.png',
        narration: 'With one final movement, the Earth Jukebox came to life.',
        ambience: 'lab',
        animationPreset: 'push-in',
        visualNote: 'His hand engages the brass power toggle switch, activating vacuum tubes and screens.'
      },
      {
        id: '6.video',
        sceneId: 6,
        frameNumber: 4,
        sceneTitle: 'The Earth Jukebox',
        frameTitle: 'The Jukebox Symphony Awakens',
        image: '/images/scene-6/s6_3.png',
        fallbackImage: '/images/s6.3.png',
        narration: 'The breath of the sea and the fire of the storm unite in the grand symphony of the Earth Jukebox.',
        isVideoFrame: true,
        videoSrc: '/videos/video_3.mp4',
        visualNote: 'Video 3: The Earth Jukebox complete planetary symphony.'
      },
      {
        id: '6.4',
        sceneId: 6,
        frameNumber: 5,
        sceneTitle: 'The Earth Jukebox',
        frameTitle: 'The Symphony',
        image: '/images/scene-6/s6_4.png',
        fallbackImage: '/images/s6.4.png',
        narration: 'The greatest musician he had searched for was never a person. It was the Earth itself.',
        ambience: 'lab',
        animationPreset: 'zoom-out',
        hasAudioIntegration: true,
        audioTrackType: 'combined',
        visualNote: 'The complete Earth Jukebox plays the master planet sonification in rich harmony.'
      }
    ]
  }
];

// Helper to flatten frames for continuous 1-click navigation
export const ALL_FRAMES: StoryFrame[] = STORY_SCENES.flatMap(scene => scene.frames);
