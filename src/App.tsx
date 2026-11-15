import React, { useState } from 'react';
import { AudioProvider } from './context/AudioContext';
import { OpeningScroll } from './components/OpeningScroll';
import { StoryViewer } from './components/StoryViewer';

export const App: React.FC = () => {
  const [view, setView] = useState<'opening' | 'story'>('opening');

  return (
    <AudioProvider>
      <main className="w-screen h-screen overflow-hidden bg-antique-dark">
        {view === 'opening' ? (
          <OpeningScroll onBeginJourney={() => setView('story')} />
        ) : (
          <StoryViewer onRestartStory={() => setView('opening')} />
        )}
      </main>
    </AudioProvider>
  );
};

export default App;
