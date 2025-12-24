import { Character } from '@/lib/characters';
import { Button } from '@/components/ui/button';
import MusicVisualizer from './MusicVisualizer';
import { ArrowLeft, Shuffle, ExternalLink, Music } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSpotifyAuth } from '@/hooks/use-spotify-auth';
import { useTopTracks, useRecommendations } from '@/hooks/use-spotify-data';

interface ResultsViewProps {
  character: Character;
  preferences: Record<string, string>;
  onBack: () => void;
  onRestart: () => void;
}

const generatePlaylistName = (character: Character, preferences: Record<string, string>) => {
  const prefixes: Record<string, string> = {
    kaiser: 'Empire',
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
  };

  return tracks[character.id]?.[preferences.language || 'mixed'] || tracks[character.id]?.mixed || tracks.kaiser.mixed;
};

const ResultsView = ({ character, preferences, onBack, onRestart }: ResultsViewProps) => {
  const { isAuthenticated } = useSpotifyAuth();
  const { data: topTracksData } = useTopTracks('medium_term', 5);
  
  // Get user's top track IDs for seeding recommendations
  const seedTrackIds = topTracksData?.items?.slice(0, 2).map(t => t.id);
  
  // Fetch personalized recommendations from Spotify when authenticated
  const { data: recommendationsData, isLoading: isLoadingRecs } = useRecommendations(
    character.id,
    preferences,
    seedTrackIds,
    undefined,
    isAuthenticated && !!seedTrackIds?.length
  );

  const playlistName = generatePlaylistName(character, preferences);
  const fallbackTracks = generateSampleTracks(character, preferences);
  
  // Use Spotify recommendations if available, otherwise fallback to static tracks
  const displayTracks = isAuthenticated && recommendationsData?.tracks
    ? recommendationsData.tracks.slice(0, 5).map(track => ({
        title: track.name,
        artist: track.artists.map(a => a.name).join(', '),
        albumArt: track.album.images?.length > 0 
          ? (track.album.images[2]?.url || track.album.images[0]?.url) 
          : undefined,
        spotifyUrl: track.external_urls.spotify,
      }))
    : fallbackTracks.map(track => ({
        ...track,
        albumArt: undefined,
        spotifyUrl: undefined,
      }));

  const textGradientClass = {
    kaiser: 'text-gradient-kaiser',
    jaekyung: 'text-gradient-jaekyung',
  }[character.color];

  const glowClass = {
    kaiser: 'glow-kaiser',
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
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {isAuthenticated ? 'Personalized For You' : 'Sample Tracks'}
          </h3>
          {isAuthenticated && (
            <span className="text-xs text-green-500 flex items-center gap-1">
              <Music className="w-3 h-3" />
              From Spotify
            </span>
          )}
        </div>
        {isLoadingRecs ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="ml-3 text-sm text-muted-foreground">Getting recommendations...</span>
          </div>
        ) : (
          <div className="space-y-4">
            {displayTracks.map((track, i) => (
              <a 
                key={i}
                href={track.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group cursor-pointer"
                style={{ animationDelay: `${0.3 + i * 0.1}s` }}
              >
                {track.albumArt ? (
                  <img 
                    src={track.albumArt} 
                    alt={track.title}
                    className="w-10 h-10 rounded object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded bg-secondary flex items-center justify-center text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {i + 1}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                    {track.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {track.artist}
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        )}
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
