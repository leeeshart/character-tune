import { useState } from 'react';
import { Button } from '@/components/ui/button';
import QuizQuestion from './QuizQuestion';
import { ArrowLeft, ArrowRight, Music } from 'lucide-react';
import { Character } from '@/lib/characters';

interface TasteQuizProps {
  character: Character;
  onComplete: (preferences: Record<string, string>) => void;
  onBack: () => void;
}

const questions = [
  {
    id: 'language',
    question: 'What language do you vibe with most?',
    options: [
      { value: 'english', label: 'English — Global hits' },
      { value: 'hindi', label: 'Hindi — Bollywood & Indie' },
      { value: 'korean', label: 'Korean — K-Pop & K-Hip-Hop' },
      { value: 'mixed', label: 'Mix it up — I like variety' },
    ],
  },
  {
    id: 'genre',
    question: 'Your main genre territory?',
    options: [
      { value: 'hiphop', label: 'Hip-Hop / Rap' },
      { value: 'electronic', label: 'Electronic / EDM' },
      { value: 'rock', label: 'Rock / Metal' },
      { value: 'rnb', label: 'R&B / Soul' },
      { value: 'pop', label: 'Pop / Indie' },
    ],
  },
  {
    id: 'era',
    question: 'Production style preference?',
    options: [
      { value: 'modern', label: 'Modern — Clean, polished production' },
      { value: 'classic', label: 'Classic — Timeless sounds' },
      { value: 'experimental', label: 'Experimental — Push boundaries' },
      { value: 'nostalgic', label: 'Nostalgic — Throwback vibes' },
    ],
  },
];

const TasteQuiz = ({ character, onComplete, onBack }: TasteQuizProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentQuestion = questions[currentStep];
  const isLastStep = currentStep === questions.length - 1;
  const canProceed = answers[currentQuestion.id];

  const handleSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleNext = () => {
    if (isLastStep) {
      onComplete(answers);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep === 0) {
      onBack();
    } else {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Progress */}
      <div className="flex gap-2 mb-8">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              i <= currentStep ? `bg-${character.color}` : 'bg-muted'
            }`}
            style={{
              backgroundColor: i <= currentStep 
                ? `hsl(var(--${character.color}))` 
                : undefined
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 text-xs text-muted-foreground mb-4">
          <Music className="w-3 h-3" />
          Matching with {character.name}
        </div>
        <p className="text-sm text-muted-foreground">
          Step {currentStep + 1} of {questions.length}
        </p>
      </div>

      {/* Question */}
      <div className="animate-fade-in" key={currentStep}>
        <QuizQuestion
          question={currentQuestion.question}
          options={currentQuestion.options}
          selectedValue={answers[currentQuestion.id]}
          onSelect={handleSelect}
          color={character.color}
        />
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-8">
        <Button variant="outline" onClick={handleBack} className="flex-1">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          variant={character.color}
          onClick={handleNext}
          disabled={!canProceed}
          className="flex-1"
        >
          {isLastStep ? 'Generate Mix' : 'Next'}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default TasteQuiz;
