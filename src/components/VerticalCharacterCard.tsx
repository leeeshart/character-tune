import { Character } from '@/lib/characters';
import { cn } from '@/lib/utils';

interface VerticalCharacterCardProps {
  character: Character;
  onClick: () => void;
}

const VerticalCharacterCard = ({ character, onClick }: VerticalCharacterCardProps) => {
  // Use cover image if available, otherwise fall back to main image
  const displayImage = character.coverImage || character.image;

  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative w-full aspect-[2/3] rounded-2xl overflow-hidden',
        'transition-all duration-500 ease-out',
        'hover:scale-[1.02] hover:shadow-[0_0_60px_-15px_hsl(var(--jaekyung)/0.6)]',
        'focus:outline-none focus:ring-2 focus:ring-jaekyung/50 focus:ring-offset-2 focus:ring-offset-background'
      )}
    >
      {/* Image */}
      <img
        src={displayImage}
        alt={character.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90" />

      {/* Subtle glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-jaekyung/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
        <h3 className="text-2xl font-bold text-foreground mb-2 tracking-tight">
          {character.name}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {character.traits.slice(0, 3).join(' • ')}
        </p>
      </div>
    </button>
  );
};

export default VerticalCharacterCard;
