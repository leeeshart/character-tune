import { useState } from 'react';
import { Button } from '@/components/ui/button';
import QuizQuestion from './QuizQuestion';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

interface CreateCharacterFormProps {
  onComplete: (traits: Record<string, string>) => void;
  onBack: () => void;
}

const questions = [
  {
    id: 'energy',
    question: 'What energy drives you most?',
    options: [
      { value: 'dominant', label: 'Commanding presence — I lead, others follow' },
      { value: 'chaotic', label: 'Unpredictable spark — I keep things interesting' },
      { value: 'calm', label: 'Steady force — I stay composed under pressure' },
      { value: 'intense', label: 'Burning focus — I give everything 100%' },
    ],
  },
  {
    id: 'mood',
    question: 'Your ideal music mood?',
    options: [
      { value: 'hype', label: 'Gets the adrenaline pumping' },
      { value: 'chill', label: 'Smooth and easy-going' },
      { value: 'emotional', label: 'Hits deep in the feels' },
      { value: 'focus', label: 'Helps me lock in' },
    ],
  },
  {
    id: 'vibe',
    question: 'Pick your vibe:',
    options: [
      { value: 'power', label: 'Power moves only' },
      { value: 'aesthetic', label: 'Clean aesthetics' },
      { value: 'raw', label: 'Raw and unfiltered' },
      { value: 'sophisticated', label: 'Refined taste' },
    ],
  },
  {
    id: 'tempo',
    question: 'Your go-to tempo?',
    options: [
      { value: 'fast', label: 'Fast and aggressive' },
      { value: 'mid', label: 'Groovy mid-tempo' },
      { value: 'slow', label: 'Slow and atmospheric' },
      { value: 'varied', label: 'I like the build-ups' },
    ],
  },
];

const CreateCharacterForm = ({ onComplete, onBack }: CreateCharacterFormProps) => {
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
              i <= currentStep ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 text-xs text-muted-foreground mb-4">
          <Sparkles className="w-3 h-3" />
          Creating your character
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
        />
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-8">
        <Button variant="outline" onClick={handleBack} className="flex-1">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!canProceed}
          className="flex-1"
        >
          {isLastStep ? 'Create' : 'Next'}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default CreateCharacterForm;
