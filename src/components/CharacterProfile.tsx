import { useState } from 'react';
import { Character, getPlaylistsForCharacter } from '@/lib/characters';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronDown, ChevronUp, ExternalLink, Music } from 'lucide-react';
import { cn } from '@/lib/utils';
import PlaylistSection from './PlaylistSection';
import CompatibilityScore from './CompatibilityScore';

interface CharacterProfileProps {
  character: Character;
  onBack: () => void;
}

const CharacterProfile = ({ character, onBack }: CharacterProfileProps) => {
  const [showExpandedBio, setShowExpandedBio] = useState(false);
  const playlists = getPlaylistsForCharacter(character.id);

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-muted-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </header>

      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-12 animate-fade-in">
          {/* Avatar */}
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-jaekyung/30 shadow-[0_0_40px_-10px_hsl(var(--jaekyung)/0.5)]">
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="text-center md:text-left flex-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
              {character.source}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {character.name}
            </h1>
            <p className="text-lg text-muted-foreground italic mb-4">
              "{character.auraLine}"
            </p>
            
            {/* Accent color indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-jaekyung/10 border border-jaekyung/30">
              <div className="w-3 h-3 rounded-full bg-jaekyung" />
              <span className="text-xs text-muted-foreground">Steel Grey Accent</span>
            </div>
          </div>
        </div>

        {/* Personality Snapshot */}
        <section className="mb-12 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Personality Snapshot
          </h2>
          
          {/* Traits */}
          <div className="flex flex-wrap gap-2 mb-4">
            {character.traits.map((trait) => (
              <span
                key={trait}
                className="px-3 py-1.5 text-sm rounded-full bg-secondary/80 text-secondary-foreground border border-border/50"
              >
                {trait}
              </span>
            ))}
          </div>

          {/* Expandable bio */}
          <div className="bg-secondary/30 rounded-xl border border-border/50 overflow-hidden">
            <button
              onClick={() => setShowExpandedBio(!showExpandedBio)}
              className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-secondary/50 transition-colors"
            >
              <span className="text-sm text-muted-foreground">
                {showExpandedBio ? 'Hide' : 'Read more about'} {character.name}
              </span>
              {showExpandedBio ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
            {showExpandedBio && (
              <div className="px-4 pb-4 animate-fade-in">
                <p className="text-sm text-secondary-foreground leading-relaxed">
                  {character.expandedBio}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Compatibility Score */}
        <section className="mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <CompatibilityScore character={character} />
        </section>

        {/* Playlists */}
        <section className="space-y-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <Music className="w-4 h-4" />
            Playlists
          </h2>
          
          {playlists.map((playlist, index) => (
            <PlaylistSection
              key={playlist.id}
              playlist={playlist}
              characterColor={character.color}
              isBlend={playlist.id.includes('blend')}
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            />
          ))}
        </section>
      </div>
    </div>
  );
};

export default CharacterProfile;
