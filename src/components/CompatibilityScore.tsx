import { useState, useEffect } from 'react';
import { Character } from '@/lib/characters';
import { cn } from '@/lib/utils';

interface CompatibilityScoreProps {
  character: Character;
}

const CompatibilityScore = ({ character }: CompatibilityScoreProps) => {
  const [score, setScore] = useState(0);
  const targetScore = 78; // Mock score

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setScore((prev) => {
          if (prev >= targetScore) {
            clearInterval(interval);
            return targetScore;
          }
          return prev + 1;
        });
      }, 20);
      return () => clearInterval(interval);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-secondary/30 rounded-2xl border border-border/50 p-6">
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Circular score */}
        <div className="relative">
          <svg className="w-32 h-32 -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="hsl(var(--jaekyung))"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-100 ease-out"
              style={{
                filter: 'drop-shadow(0 0 8px hsl(var(--jaekyung) / 0.5))',
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-foreground">{score}%</span>
          </div>
        </div>

        {/* Explanation */}
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Music Match
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Your taste aligns with his intensity, not his volatility.
          </p>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            <span className="px-3 py-1 text-xs rounded-full bg-jaekyung/20 text-jaekyung border border-jaekyung/30">
              High Energy Match
            </span>
            <span className="px-3 py-1 text-xs rounded-full bg-secondary text-secondary-foreground border border-border/50">
              Demo Score
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompatibilityScore;
