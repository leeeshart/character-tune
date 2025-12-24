import { useState } from 'react';
import { characters, Character, getCharacterById } from '@/lib/characters';
import CharacterCard from '@/components/CharacterCard';
import TasteQuiz from '@/components/TasteQuiz';
import CreateCharacterForm from '@/components/CreateCharacterForm';
import ResultsView from '@/components/ResultsView';
import { Button } from '@/components/ui/button';
import MusicVisualizer from '@/components/MusicVisualizer';
import { Plus, Sparkles } from 'lucide-react';

type AppState = 'select' | 'quiz' | 'create' | 'results' | 'custom-results';

const Index = () => {
  const [state, setState] = useState<AppState>('select');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [preferences, setPreferences] = useState<Record<string, string>>({});
  const [customTraits, setCustomTraits] = useState<Record<string, string>>({});

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
    setState('quiz');
  };

  const handleQuizComplete = (prefs: Record<string, string>) => {
    setPreferences(prefs);
    setState('results');
  };

  const handleCreateCharacter = () => {
    setState('create');
  };

  const handleCustomCharacterComplete = (traits: Record<string, string>) => {
    setCustomTraits(traits);
    // Create a pseudo-character based on traits
    const colorMapping: Character['color'] = traits.energy === 'dominant' ? 'kaiser' : 'jaekyung';
    const customCharacter: Character = {
      id: 'custom',
      name: 'Your Character',
      anime: 'Original',
      color: colorMapping,
      traits: [traits.energy, traits.mood, traits.vibe, traits.tempo].filter(Boolean),
      energy: traits.energy === 'dominant' ? 'Commanding & Controlled' : 
              traits.energy === 'chaotic' ? 'Electric & Carefree' :
              traits.energy === 'calm' ? 'Steady & Sophisticated' : 'Focused & Driven',
      soundIdentity: [traits.energy, traits.mood, traits.vibe].filter(Boolean),
      genreTendencies: 'Personalized based on your traits',
      listeningBehavior: ['Curated to match your personality'],
      tastePhilosophy: '"Music that reflects who you are."',
    };
    setSelectedCharacter(customCharacter);
    setState('quiz');
  };

  const handleRestart = () => {
    setState('select');
    setSelectedCharacter(null);
    setPreferences({});
    setCustomTraits({});
  };

  const handleBack = () => {
    if (state === 'quiz' || state === 'create') {
      setState('select');
      setSelectedCharacter(null);
    } else if (state === 'results') {
      setState('quiz');
    }
  };

  return (
    <main className="min-h-screen">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gojo/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container max-w-4xl mx-auto px-4 py-12 md:py-20">
        {state === 'select' && (
          <div className="animate-fade-in">
            {/* Hero */}
            <header className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 mb-6">
                <MusicVisualizer bars={3} className="h-4" />
                <span className="text-xs font-medium text-muted-foreground">Character × Music</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                <span className="text-gradient">What would they</span>
                <br />
                <span className="text-foreground">listen to?</span>
              </h1>
              
              <p className="text-muted-foreground max-w-md mx-auto text-base md:text-lg">
                Blend your music taste with the personality of your favorite characters.
              </p>
            </header>

            {/* Character Grid */}
            <section className="mb-12">
              <h2 className="sr-only">Select a Character</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {characters.map((character, i) => (
                  <div 
                    key={character.id} 
                    className="animate-slide-up"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <CharacterCard
                      character={character}
                      onClick={() => handleCharacterSelect(character)}
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Create Custom */}
            <section className="text-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="inline-block">
                <Button 
                  variant="glass" 
                  size="lg" 
                  onClick={handleCreateCharacter}
                  className="group"
                >
                  <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                  Create Your Own
                  <Sparkles className="w-4 h-4 ml-2 opacity-50" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Build a character from personality traits
              </p>
            </section>
          </div>
        )}

        {state === 'quiz' && selectedCharacter && (
          <TasteQuiz
            character={selectedCharacter}
            onComplete={handleQuizComplete}
            onBack={handleBack}
          />
        )}

        {state === 'create' && (
          <CreateCharacterForm
            onComplete={handleCustomCharacterComplete}
            onBack={handleBack}
          />
        )}

        {state === 'results' && selectedCharacter && (
          <ResultsView
            character={selectedCharacter}
            preferences={preferences}
            onBack={handleBack}
            onRestart={handleRestart}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 mt-20">
        <div className="container max-w-4xl mx-auto px-4 py-6">
          <p className="text-center text-xs text-muted-foreground">
            A music personality experiment. Not affiliated with any anime or streaming service.
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
