import { cn } from '@/lib/utils';

interface QuizQuestionProps {
  question: string;
  options: { value: string; label: string }[];
  selectedValue?: string;
  onSelect: (value: string) => void;
  color?: 'primary' | 'kaiser' | 'gojo' | 'nanami' | 'jaekyung';
}

const QuizQuestion = ({ question, options, selectedValue, onSelect, color = 'primary' }: QuizQuestionProps) => {
  const colorClasses = {
    primary: {
      selected: 'border-primary bg-primary/10',
      hover: 'hover:border-primary/50',
    },
    kaiser: {
      selected: 'border-kaiser bg-kaiser/10',
      hover: 'hover:border-kaiser/50',
    },
    gojo: {
      selected: 'border-gojo bg-gojo/10',
      hover: 'hover:border-gojo/50',
    },
    nanami: {
      selected: 'border-nanami bg-nanami/10',
      hover: 'hover:border-nanami/50',
    },
    jaekyung: {
      selected: 'border-jaekyung bg-jaekyung/10',
      hover: 'hover:border-jaekyung/50',
    },
  };

  const colors = colorClasses[color];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-foreground">{question}</h3>
      <div className="grid gap-3">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={cn(
              'w-full p-4 text-left rounded-xl border transition-all duration-300',
              selectedValue === option.value
                ? colors.selected
                : `border-border bg-secondary/30 ${colors.hover}`
            )}
          >
            <span className={cn(
              'text-sm font-medium',
              selectedValue === option.value ? 'text-foreground' : 'text-muted-foreground'
            )}>
              {option.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
