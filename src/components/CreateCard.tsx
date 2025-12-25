import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CreateCardProps {
  onClick: () => void;
}

const CreateCard = ({ onClick }: CreateCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative w-full aspect-[2/3] rounded-2xl overflow-hidden',
        'bg-secondary/30 border border-border/50',
        'transition-all duration-500 ease-out',
        'hover:bg-secondary/50 hover:border-muted-foreground/30',
        'hover:scale-[1.02] hover:shadow-[0_0_40px_-15px_hsl(var(--muted-foreground)/0.3)]',
        'focus:outline-none focus:ring-2 focus:ring-muted-foreground/50 focus:ring-offset-2 focus:ring-offset-background',
        'flex flex-col items-center justify-center'
      )}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--muted-foreground)) 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }} />
      </div>

      {/* Plus icon */}
      <div className="relative z-10 mb-4">
        <div className="w-16 h-16 rounded-full border-2 border-dashed border-muted-foreground/50 flex items-center justify-center group-hover:border-muted-foreground transition-colors duration-300">
          <Plus className="w-8 h-8 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
        </div>
      </div>

      {/* Text */}
      <p className="relative z-10 text-lg font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
        Create Your Own
      </p>
    </button>
  );
};

export default CreateCard;
