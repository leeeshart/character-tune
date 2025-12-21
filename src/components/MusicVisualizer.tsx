import { cn } from '@/lib/utils';

interface MusicVisualizerProps {
  className?: string;
  color?: 'primary' | 'kaiser' | 'gojo' | 'nanami';
  bars?: number;
}

const MusicVisualizer = ({ className, color = 'primary', bars = 5 }: MusicVisualizerProps) => {
  const colorClasses = {
    primary: 'bg-primary',
    kaiser: 'bg-kaiser',
    gojo: 'bg-gojo',
    nanami: 'bg-nanami',
  };

  return (
    <div className={cn('flex items-end gap-1 h-8', className)}>
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'w-1 rounded-full transition-all duration-300',
            colorClasses[color]
          )}
          style={{
            height: `${Math.random() * 60 + 40}%`,
            animation: `pulse ${0.5 + i * 0.1}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
};

export default MusicVisualizer;
