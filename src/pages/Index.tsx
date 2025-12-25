import { useState } from 'react';
import { characters, Character, getCharacterById } from '@/lib/characters';
import VerticalCharacterCard from '@/components/VerticalCharacterCard';
import CreateCard from '@/components/CreateCard';
import VideoIntro from '@/components/VideoIntro';
import CharacterProfile from '@/components/CharacterProfile';
import CreateCharacterFlow from '@/components/CreateCharacterFlow';

type AppState = 'home' | 'video-intro' | 'profile' | 'create';

const Index = () => {
  const [state, setState] = useState<AppState>('home');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
    setState('video-intro');
  };

  const handleVideoComplete = () => {
    setState('profile');
  };

  const handleVideoSkip = () => {
    setState('profile');
  };

  const handleCreateClick = () => {
    setState('create');
  };

  const handleBack = () => {
    setState('home');
    setSelectedCharacter(null);
  };

  const handleCreateComplete = (customCharacter: Character) => {
    setSelectedCharacter(customCharacter);
    setState('profile');
  };

  // Video intro overlay
  if (state === 'video-intro' && selectedCharacter) {
    return (
      <VideoIntro
        character={selectedCharacter}
        onComplete={handleVideoComplete}
        onSkip={handleVideoSkip}
      />
    );
  }

  // Character profile page
  if (state === 'profile' && selectedCharacter) {
    return <CharacterProfile character={selectedCharacter} onBack={handleBack} />;
  }

  // Create character flow
  if (state === 'create') {
    return (
      <CreateCharacterFlow
        onComplete={handleCreateComplete}
        onBack={handleBack}
      />
    );
  }

  // Home screen
  return (
    <main className="min-h-screen">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-jaekyung/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container max-w-4xl mx-auto px-4 py-12 md:py-20">
        <div className="animate-fade-in">
          {/* Minimal header */}
          <header className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              CharacterTune
            </h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
              Blend fictional character personalities with music taste.
            </p>
          </header>

          {/* Character cards grid */}
          <section className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-6 max-w-2xl mx-auto">
            {/* Character cards */}
            {characters.map((character, i) => (
              <div
                key={character.id}
                className="animate-fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <VerticalCharacterCard
                  character={character}
                  onClick={() => handleCharacterSelect(character)}
                />
              </div>
            ))}

            {/* Create your own card */}
            <div
              className="animate-fade-in"
              style={{ animationDelay: `${characters.length * 0.1}s` }}
            >
              <CreateCard onClick={handleCreateClick} />
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 mt-20">
        <div className="container max-w-4xl mx-auto px-4 py-6">
          <p className="text-center text-xs text-muted-foreground leading-relaxed">
            This is a fan-made, non-commercial demo project.
            <br />
            Characters belong to their respective creators. No copyright infringement intended.
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
