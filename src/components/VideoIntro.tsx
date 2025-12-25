import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Character } from '@/lib/characters';

interface VideoIntroProps {
  character: Character;
  onComplete: () => void;
  onSkip: () => void;
}

const VideoIntro = ({ character, onComplete, onSkip }: VideoIntroProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnd = () => {
    onComplete();
  };

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  // If no video, show animated fallback
  if (!character.introVideo) {
    return (
      <div className="fixed inset-0 z-50 bg-background flex items-center justify-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={onSkip}
          className="absolute top-6 right-6 z-10 text-muted-foreground hover:text-foreground"
        >
          Skip
          <X className="w-4 h-4 ml-2" />
        </Button>

        <div className="relative w-full h-full flex items-center justify-center overflow-hidden animate-fade-in">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${character.coverImage || character.image})`,
              filter: 'blur(20px) brightness(0.3)',
            }}
          />
          <div className="relative z-10 text-center">
            <img
              src={character.coverImage || character.image}
              alt={character.name}
              className="max-h-[70vh] w-auto rounded-lg shadow-2xl animate-scale-in"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-background flex items-center justify-center">
      {/* Skip button - always visible */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onSkip}
        className="absolute top-6 right-6 z-20 text-muted-foreground hover:text-foreground bg-background/30 backdrop-blur-sm"
      >
        Skip
        <X className="w-4 h-4 ml-2" />
      </Button>

      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
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
      )}

      {/* Video player */}
      <video
        ref={videoRef}
        src={character.introVideo}
        autoPlay
        playsInline
        muted={false}
        onEnded={handleVideoEnd}
        onCanPlay={handleCanPlay}
        className="w-full h-full object-contain"
        style={{ opacity: isLoading ? 0 : 1 }}
      />
    </div>
  );
};

export default VideoIntro;
