import { NASADataInfo } from '../types/story';

export const NASA_DATASETS: Record<'ocean' | 'lightning', NASADataInfo> = {
  ocean: {
    id: 'ocean-currents-ecco',
    topic: 'Ocean Surface Currents & Circulation Sonification',
    mission: 'NASA Estimating the Circulation and Climate of the Ocean (ECCO)',
    instrument: 'Satellite Radar Altimetry (Jason-3, Sentinel-6 Michael Freilich) & Ocean GCMs',
    sourceUrl: 'https://ecco-group.org/ and https://svs.gsfc.nasa.gov/3827',
    environmentalVariable: 'Zonal & Meridional Surface Current Velocity (u, v vectors), Sea Surface Height Anomalies',
    processingMethod:
      'High-resolution ECCO global ocean circulation synthesis model combining in-situ Argo float profiles with satellite sea-surface altimetry into gridded velocity vectors and vorticity fields.',
    audioMappingMethod:
      'Current velocity magnitude maps to flute note pitch (higher velocity = higher octave), turbulent flow vorticity and gyre rotations modulate breath flutter and vibrato rate, and sea-surface height shifts shape sustained note duration.',
    attribution: 'NASA Goddard Space Flight Center Scientific Visualization Studio / NASA JPL ECCO Consortium',
    scientificSummary:
      'The ocean is in perpetual, rhythmic motion. Warm equatorial currents like the Gulf Stream and Kuroshio move massive volumes of heat around the globe. By mapping these continuous vector fields to a wooden flute\'s airy timbre, the listener directly senses the fluid velocity, depth, and gyral swirls as a flowing organic melody.',
    diagramSteps: [
      {
        step: 1,
        title: 'NASA Earth Observation',
        description: 'Satellite altimeters and Argo profiling floats capture ocean current speeds, surface temperatures, and sea height.'
      },
      {
        step: 2,
        title: 'Data Extraction',
        description: 'Global flow velocity vectors (u, v) and kinetic energy are calculated across latitude-longitude coordinates.'
      },
      {
        step: 3,
        title: 'Musical Parameter Mapping',
        description: 'Flow velocities are assigned to pentatonic flute scale pitches; vortex swirling dictates gentle melodic phrasing.'
      },
      {
        step: 4,
        title: 'Flute Sonification',
        description: 'An acoustic wind instrument breathes life into the moving ocean currents, creating a peaceful, undulating melody.'
      }
    ]
  },
  lightning: {
    id: 'lightning-lis-iss',
    topic: 'Global Lightning Activity & Optical Radiance Sonification',
    mission: 'NASA Lightning Imaging Sensor (LIS on the International Space Station) & OTD',
    instrument: 'Optical Transient Detector (OTD) / Space Station Lightning Imaging Sensor (ISS-LIS)',
    sourceUrl: 'https://ghrc.nsstc.nasa.gov/hydro/ and https://science.nasa.gov/earth-science/focus-areas/climate-variability-and-change/lightning/',
    environmentalVariable: 'Flash Rate Density (flashes/km²/yr), Optical Pulse Radiance (microjoules/steradian/m²), Strike Duration',
    processingMethod:
      'Calibrated Charge-Coupled Device (CCD) sensor with narrow-band optical interference filters tuned to the oxygen-triplet emission line (777.4 nm), detecting daylight and nighttime optical lightning transients from low Earth orbit.',
    audioMappingMethod:
      'Flash event frequency controls rhythmic strumming density and tempo, optical pulse radiance energy modulates guitar overdrive saturation and pick velocity, and regional flash clusters trigger sharp pentatonic lead intervals.',
    audioTrackTitle: 'Listen to the Storm',
    attribution: 'NASA Global Hydrology Resource Center (GHRC) DAAC / NASA Marshall Space Flight Center',
    scientificSummary:
      'Lightning occurs approximately 44 times per second globally, heavily concentrated over equatorial landmasses such as Lake Maracaibo and Central Africa. Sonifying this energetic electrical activity transforms sudden optical radiant surges into resonant electric guitar power chords and biting lead riffs that mirror storm intensity.',
    diagramSteps: [
      {
        step: 1,
        title: 'NASA Orbital Sensor',
        description: 'ISS-LIS detects instantaneous optical lightning flashes at 777.4 nm through dense storm cloud tops.'
      },
      {
        step: 2,
        title: 'Data Extraction',
        description: 'Flash coordinates, flash rate counts per unit area, and optical radiant energy are catalogued per storm cell.'
      },
      {
        step: 3,
        title: 'Musical Parameter Mapping',
        description: 'Flash pulses trigger electric guitar note attacks; peak energy translates into distortion drive and fret pitch.'
      },
      {
        step: 4,
        title: 'Electric Guitar Sonification',
        description: 'The electric charge of the storm becomes powerful guitar riffs, echoing nature\'s raw dynamic energy.'
      }
    ]
  }
};

export const PERSONALIZED_INTRO = {
  title: "Earth Jukebox",
  subtitle: "A Musical Journey Through Our Planet",
  authorNote: "From the Journal of the Traveller–Musician",
  invitationText: "Welcome, traveller. For centuries, humanity looked at the stars and wondered if the cosmos carried a melody. Yet right beneath our feet, the oceans whisper in currents, and the heavens strike chords in lightning. Unroll this scroll to begin a journey where NASA Earth science and music become one living symphony.",
  startButtonText: "Begin the Journey",
  closingQuote: "The Earth has always been making music. We only needed to learn how to listen."
};
