import { Playlist } from '@/lib/characters';
import { ExternalLink, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CSSProperties } from 'react';

interface PlaylistSectionProps {
  playlist: Playlist;
  characterColor: string;
  isBlend?: boolean;
  style?: CSSProperties;
}

const PlaylistSection = ({ playlist, characterColor, isBlend, style }: PlaylistSectionProps) => {
  return (
    <div
      className={cn(
        'rounded-2xl border overflow-hidden animate-fade-in',
        isBlend
          ? 'bg-gradient-to-br from-secondary/50 to-secondary/30 border-border/50'
          : 'bg-gradient-to-br from-jaekyung/10 to-secondary/30 border-jaekyung/20'
      )}
      style={style}
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className={cn(
              'text-xl font-bold mb-1',
              isBlend ? 'text-foreground' : 'text-gradient-jaekyung'
            )}>
              {playlist.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {playlist.description}
            </p>
          </div>
          
          {/* Play button */}
          <button className="w-12 h-12 rounded-full bg-jaekyung flex items-center justify-center hover:scale-105 hover:bg-jaekyung/90 transition-all duration-200 shadow-lg">
            <Play className="w-5 h-5 text-foreground ml-0.5" fill="currentColor" />
          </button>
        </div>

        {/* Mood tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {playlist.moodTags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs rounded-full bg-background/50 text-muted-foreground border border-border/50"
            >
              {tag}
            </span>
          ))}
        </div>

        {isBlend && (
          <div className="mt-4 px-3 py-2 rounded-lg bg-background/30 border border-border/30">
            <p className="text-xs text-muted-foreground">
              Demo mode — Connect Spotify for personalized blend
            </p>
          </div>
        )}
      </div>

      {/* Track list */}
      <div className="px-6 pb-6">
        <div className="space-y-1">
          {playlist.tracks.map((track, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-background/30 transition-colors cursor-pointer group"
            >
              <div className="w-6 h-6 flex items-center justify-center text-sm text-muted-foreground group-hover:hidden">
                {i + 1}
              </div>
              <div className="w-6 h-6 items-center justify-center hidden group-hover:flex">
                <Play className="w-4 h-4 text-foreground" fill="currentColor" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate group-hover:text-jaekyung transition-colors">
                  {track.title}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {track.artist}
                </p>
              </div>

              {track.mood && (
                <span className="hidden md:inline text-xs text-muted-foreground/70 px-2 py-0.5 rounded bg-background/30">
                  {track.mood}
                </span>
              )}

              <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaylistSection;
