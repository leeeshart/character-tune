import { Character } from '@/lib/characters';
import { cn } from '@/lib/utils';

interface CharacterCardProps {
  character: Character;
  onClick: () => void;
  isSelected?: boolean;
}

const CharacterCard = ({ character, onClick, isSelected }: CharacterCardProps) => {
  const colorClasses = {
    kaiser: {
      gradient: 'from-kaiser/20 to-kaiser-glow/10',
      border: 'border-kaiser/30 hover:border-kaiser/60',
      glow: 'hover:shadow-[0_0_40px_-10px_hsl(220_90%_56%/0.5)]',
      text: 'text-gradient-kaiser',
      ring: 'ring-kaiser',
    },
    gojo: {
      gradient: 'from-gojo/20 to-gojo-glow/10',
      border: 'border-gojo/30 hover:border-gojo/60',
      glow: 'hover:shadow-[0_0_40px_-10px_hsl(190_100%_60%/0.5)]',
      text: 'text-gradient-gojo',
      ring: 'ring-gojo',
    },
    nanami: {
      gradient: 'from-nanami/20 to-nanami-glow/10',
      border: 'border-nanami/30 hover:border-nanami/60',
      glow: 'hover:shadow-[0_0_40px_-10px_hsl(35_80%_55%/0.5)]',
      text: 'text-gradient-nanami',
      ring: 'ring-nanami',
    },
  };

  const colors = colorClasses[character.color];

  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative w-full p-6 rounded-2xl border bg-gradient-to-br transition-all duration-500 text-left',
        colors.gradient,
        colors.border,
        colors.glow,
        isSelected && `ring-2 ${colors.ring}`
      )}
    >
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-gradient-to-br from-foreground/5 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        {/* Anime tag */}
        <span className="text-xs font-medium text-muted-foreground tracking-wider uppercase">
          {character.anime}
        </span>
        
        {/* Name */}
        <h3 className={cn('text-2xl font-bold mt-2 mb-3', colors.text)}>
          {character.name}
        </h3>
        
        {/* Genre tendencies */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {character.genreTendencies}
        </p>
        
        {/* Sound Identity */}
        <div className="flex flex-wrap gap-2 mb-4">
          {character.soundIdentity.map((trait) => (
            <span
              key={trait}
              className="px-2.5 py-1 text-xs rounded-full bg-secondary/80 text-secondary-foreground"
            >
              {trait}
            </span>
          ))}
        </div>
        
        {/* Energy indicator */}
        <div className="pt-4 border-t border-border/50">
          <span className="text-xs text-muted-foreground">Energy: </span>
          <span className="text-xs font-medium text-foreground">{character.energy}</span>
        </div>

        {/* Taste Philosophy */}
        <p className="mt-3 text-xs italic text-muted-foreground/80">
          {character.tastePhilosophy}
        </p>
      </div>
    </button>
  );
};

export default CharacterCard;
