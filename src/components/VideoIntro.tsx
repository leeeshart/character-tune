import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Character } from '@/lib/characters';
import { cn } from '@/lib/utils';

interface VideoIntroProps {
  character: Character;
  onComplete: () => void;
  onSkip: () => void;
}

const VideoIntro = ({ character, onComplete, onSkip }: VideoIntroProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Auto-complete after 3 seconds since we're using a placeholder
    // In production, this would listen to the video's onEnded event
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Since we don't have a real video, show an animated placeholder
  return (
    <div className="fixed inset-0 z-50 bg-background flex items-center justify-center">
      {/* Skip button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onSkip}
        className="absolute top-6 right-6 z-10 text-muted-foreground hover:text-foreground"
      >
        Skip
        <X className="w-4 h-4 ml-2" />
      </Button>

      {/* Animated intro placeholder */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* Background image with animation */}
        <div
          className="absolute inset-0 bg-cover bg-center animate-pulse-slow"
          style={{
            backgroundImage: `url(${character.image})`,
            filter: 'blur(20px) brightness(0.3)',
          }}
        />

        {/* Character image reveal */}
        <div className="relative z-10 animate-fade-in">
          <div className="relative">
            <img
              src={character.image}
              alt={character.name}
              className={cn(
                'max-h-[70vh] w-auto rounded-lg shadow-2xl',
                'animate-scale-in'
              )}
            />
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-lg shadow-[0_0_100px_-20px_hsl(var(--jaekyung)/0.5)]" />
          </div>

          {/* Name reveal */}
          <div className="absolute bottom-0 left-0 right-0 text-center pb-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight">
              {character.name}
            </h1>
            <p className="text-lg text-muted-foreground mt-2 italic">
              {character.auraLine}
            </p>
          </div>
        </div>

        {/* Loading indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-jaekyung animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoIntro;
