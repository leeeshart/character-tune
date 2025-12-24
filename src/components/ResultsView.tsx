import { Character } from '@/lib/characters';
import { Button } from '@/components/ui/button';
import MusicVisualizer from './MusicVisualizer';
import { ArrowLeft, Shuffle, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResultsViewProps {
  character: Character;
  preferences: Record<string, string>;
  onBack: () => void;
  onRestart: () => void;
}

const generatePlaylistName = (character: Character, preferences: Record<string, string>) => {
  const prefixes: Record<string, string> = {
    kaiser: 'Empire',
    gojo: 'Infinity',
    nanami: 'Overtime',
    jaekyung: 'Knockout',
    custom: 'Personal',
  };
  
  const languageSuffixes: Record<string, string> = {
    english: 'Global',
    hindi: 'Desi',
    korean: 'Seoul',
    mixed: 'Fusion',
  };
  
  return `${prefixes[character.id] || 'Custom'} ${languageSuffixes[preferences.language || 'mixed']} Mix`;
};

const generateSampleTracks = (character: Character, preferences: Record<string, string>) => {
  const tracks: Record<string, Record<string, { title: string; artist: string }[]>> = {
    kaiser: {
      english: [
        { title: 'Power', artist: 'Kanye West' },
        { title: 'Sicko Mode', artist: 'Travis Scott' },
        { title: 'Venom', artist: 'Eminem' },
        { title: 'DNA.', artist: 'Kendrick Lamar' },
        { title: 'Stronger', artist: 'Kanye West' },
      ],
      hindi: [
        { title: 'Apna Time Aayega', artist: 'Ranveer Singh' },
        { title: 'Sultan', artist: 'Sukhwinder Singh' },
        { title: 'Malhari', artist: 'Vishal Dadlani' },
        { title: 'Ziddi Dil', artist: 'Vishal Dadlani' },
        { title: 'Brothers Anthem', artist: 'Vishal Dadlani' },
      ],
      korean: [
        { title: 'God\'s Menu', artist: 'Stray Kids' },
        { title: 'Monster', artist: 'EXO' },
        { title: 'ON', artist: 'BTS' },
        { title: 'Daechwita', artist: 'Agust D' },
        { title: 'Thunderous', artist: 'Stray Kids' },
      ],
      mixed: [
        { title: 'Power', artist: 'Kanye West' },
        { title: 'Malhari', artist: 'Vishal Dadlani' },
        { title: 'God\'s Menu', artist: 'Stray Kids' },
        { title: 'DNA.', artist: 'Kendrick Lamar' },
        { title: 'Apna Time Aayega', artist: 'Ranveer Singh' },
      ],
    },
    jaekyung: {
      english: [
        { title: 'Lose Yourself', artist: 'Eminem' },
        { title: 'Till I Collapse', artist: 'Eminem' },
        { title: 'Can\'t Be Touched', artist: 'Roy Jones Jr.' },
        { title: 'Remember The Name', artist: 'Fort Minor' },
        { title: 'Warrior', artist: 'Disturbed' },
      ],
      hindi: [
        { title: 'Dangal', artist: 'Daler Mehndi' },
        { title: 'Chak De India', artist: 'Sukhwinder Singh' },
        { title: 'Sultan', artist: 'Sukhwinder Singh' },
        { title: 'Ziddi Dil', artist: 'Vishal Dadlani' },
        { title: 'Kar Har Maidaan Fateh', artist: 'Sukhwinder Singh' },
      ],
      korean: [
        { title: 'MANIAC', artist: 'Stray Kids' },
        { title: 'Hard to Love', artist: 'BLACKPINK' },
        { title: 'VILLAIN', artist: 'K/DA' },
        { title: 'Given-Taken', artist: 'ENHYPEN' },
        { title: 'O.O', artist: 'NMIXX' },
      ],
      mixed: [
        { title: 'Lose Yourself', artist: 'Eminem' },
        { title: 'MANIAC', artist: 'Stray Kids' },
        { title: 'Dangal', artist: 'Daler Mehndi' },
        { title: 'Till I Collapse', artist: 'Eminem' },
        { title: 'God\'s Menu', artist: 'Stray Kids' },
      ],
    },
    gojo: {
      english: [
        { title: 'Blinding Lights', artist: 'The Weeknd' },
        { title: 'Levitating', artist: 'Dua Lipa' },
        { title: 'HUMBLE.', artist: 'Kendrick Lamar' },
        { title: 'Industry Baby', artist: 'Lil Nas X' },
        { title: 'Wow.', artist: 'Post Malone' },
      ],
      hindi: [
        { title: 'Kar Gayi Chull', artist: 'Badshah' },
        { title: 'Swag Se Swagat', artist: 'Vishal Dadlani' },
        { title: 'Badtameez Dil', artist: 'Benny Dayal' },
        { title: 'Lungi Dance', artist: 'Yo Yo Honey Singh' },
        { title: 'Party All Night', artist: 'Yo Yo Honey Singh' },
      ],
      korean: [
        { title: 'Dynamite', artist: 'BTS' },
        { title: 'How You Like That', artist: 'BLACKPINK' },
        { title: 'Psycho', artist: 'Red Velvet' },
        { title: 'Next Level', artist: 'aespa' },
        { title: 'FEARLESS', artist: 'LE SSERAFIM' },
      ],
      mixed: [
        { title: 'Blinding Lights', artist: 'The Weeknd' },
        { title: 'Dynamite', artist: 'BTS' },
        { title: 'Kar Gayi Chull', artist: 'Badshah' },
        { title: 'HUMBLE.', artist: 'Kendrick Lamar' },
        { title: 'How You Like That', artist: 'BLACKPINK' },
      ],
    },
    nanami: {
      english: [
        { title: 'Redbone', artist: 'Childish Gambino' },
        { title: 'Best Part', artist: 'Daniel Caesar' },
        { title: 'Moonlight', artist: 'Frank Ocean' },
        { title: 'Electric', artist: 'Khalid' },
        { title: 'Come Through', artist: 'H.E.R.' },
      ],
      hindi: [
        { title: 'Tum Hi Ho', artist: 'Arijit Singh' },
        { title: 'Agar Tum Saath Ho', artist: 'Arijit Singh' },
        { title: 'Channa Mereya', artist: 'Arijit Singh' },
        { title: 'Kabira', artist: 'Tochi Raina' },
        { title: 'Ilahi', artist: 'Arijit Singh' },
      ],
      korean: [
        { title: 'Spring Day', artist: 'BTS' },
        { title: 'Love Poem', artist: 'IU' },
        { title: 'Eyes, Nose, Lips', artist: 'Taeyang' },
        { title: 'Through the Night', artist: 'IU' },
        { title: 'Palette', artist: 'IU' },
      ],
      mixed: [
        { title: 'Redbone', artist: 'Childish Gambino' },
        { title: 'Spring Day', artist: 'BTS' },
        { title: 'Channa Mereya', artist: 'Arijit Singh' },
        { title: 'Best Part', artist: 'Daniel Caesar' },
        { title: 'Love Poem', artist: 'IU' },
      ],
    },
  };

  return tracks[character.id]?.[preferences.language || 'mixed'] || tracks[character.id]?.mixed || tracks.kaiser.mixed;
};

const ResultsView = ({ character, preferences, onBack, onRestart }: ResultsViewProps) => {
  const playlistName = generatePlaylistName(character, preferences);
  const sampleTracks = generateSampleTracks(character, preferences);

  const textGradientClass = {
    kaiser: 'text-gradient-kaiser',
    gojo: 'text-gradient-gojo',
    nanami: 'text-gradient-nanami',
    jaekyung: 'text-gradient-jaekyung',
  }[character.color];

  const glowClass = {
    kaiser: 'glow-kaiser',
    gojo: 'glow-gojo',
    nanami: 'glow-nanami',
    jaekyung: 'glow-jaekyung',
  }[character.color];

  return (
    <div className="max-w-lg mx-auto">
      {/* Header */}
      <div className="text-center mb-10 animate-fade-in">
        <MusicVisualizer 
          color={character.color} 
          bars={7} 
          className="justify-center mb-6" 
        />
        <h2 className="text-sm font-medium text-muted-foreground mb-2">
          Your blend with {character.name}
        </h2>
        <h1 className={cn('text-3xl font-bold', textGradientClass)}>
          {playlistName}
        </h1>
        <p className="text-sm text-muted-foreground mt-3">
          {character.genreTendencies}
        </p>
      </div>

      {/* Playlist Preview */}
      <div className={cn(
        'rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 mb-8',
        glowClass,
        'animate-slide-up'
      )}
      style={{ animationDelay: '0.2s' }}
      >
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
          Sample Tracks
        </h3>
        <div className="space-y-4">
          {sampleTracks.map((track, i) => (
            <div 
              key={i} 
              className="flex items-center gap-4 group cursor-pointer"
              style={{ animationDelay: `${0.3 + i * 0.1}s` }}
            >
              <div className="w-8 h-8 rounded bg-secondary flex items-center justify-center text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                  {track.title}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {track.artist}
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>

      {/* Match Analysis */}
      <div 
        className="rounded-xl bg-secondary/30 border border-border/50 p-5 mb-8 animate-slide-up"
        style={{ animationDelay: '0.4s' }}
      >
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
          Why this works
        </h3>
        <ul className="space-y-2 mb-4">
          {character.listeningBehavior.map((behavior, i) => (
            <li key={i} className="text-sm text-secondary-foreground flex items-start gap-2">
              <span className="text-muted-foreground">•</span>
              {behavior}
            </li>
          ))}
        </ul>
        <p className="text-xs italic text-muted-foreground/80 border-t border-border/30 pt-3">
          {character.tastePhilosophy}
        </p>
      </div>

      {/* Actions */}
      <div 
        className="flex gap-3 animate-slide-up"
        style={{ animationDelay: '0.5s' }}
      >
        <Button variant="outline" onClick={onBack} className="flex-1">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Try Another
        </Button>
        <Button variant={character.color} onClick={onRestart} className="flex-1">
          <Shuffle className="w-4 h-4 mr-2" />
          New Character
        </Button>
      </div>
    </div>
  );
};

export default ResultsView;
