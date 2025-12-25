import { useState } from 'react';
import { Character } from '@/lib/characters';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, ArrowRight, Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CreateCharacterFlowProps {
  onComplete: (character: Character) => void;
  onBack: () => void;
}

const traitOptions = [
  { value: 'aggressive', label: 'Aggressive' },
  { value: 'calm', label: 'Calm' },
  { value: 'guarded', label: 'Guarded' },
  { value: 'open', label: 'Open' },
  { value: 'dominant', label: 'Dominant' },
  { value: 'submissive', label: 'Submissive' },
  { value: 'chaotic', label: 'Chaotic' },
  { value: 'disciplined', label: 'Disciplined' },
  { value: 'emotional', label: 'Emotional' },
  { value: 'stoic', label: 'Stoic' },
];

const CreateCharacterFlow = ({ onComplete, onBack }: CreateCharacterFlowProps) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleTraitToggle = (trait: string) => {
    if (selectedTraits.includes(trait)) {
      setSelectedTraits(selectedTraits.filter((t) => t !== trait));
    } else if (selectedTraits.length < 5) {
      setSelectedTraits([...selectedTraits, trait]);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Create the character
      const customCharacter: Character = {
        id: 'custom-' + Date.now(),
        name: name || 'Custom Character',
        source: 'Original',
        sourceType: 'original',
        color: 'custom',
        auraLine: description.slice(0, 50) + (description.length > 50 ? '...' : ''),
        traits: selectedTraits.length > 0 ? selectedTraits : ['Unique'],
        expandedBio: description || 'A custom character with unique personality.',
        soundIdentity: selectedTraits.slice(0, 4),
        genreTendencies: 'Personalized based on traits',
        listeningBehavior: ['Curated to match personality'],
        tastePhilosophy: '"Music that reflects who you are."',
        image: imagePreview || '/placeholder.svg',
        accentColor: 'custom',
      };
      onComplete(customCharacter);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  const canProceed = () => {
    if (step === 1) return name.trim().length > 0;
    if (step === 2) return selectedTraits.length >= 3;
    return true;
  };

  return (
    <main className="min-h-screen">
      <div className="container max-w-md mx-auto px-4 py-12">
        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={cn(
                'h-1 flex-1 rounded-full transition-colors duration-300',
                i <= step ? 'bg-primary' : 'bg-muted'
              )}
            />
          ))}
        </div>

        {/* Step 1: Name & Description */}
        {step === 1 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Create Your Character
            </h2>
            <p className="text-muted-foreground mb-8">
              Give your character a name and personality.
            </p>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Character Name
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter character name"
                  className="bg-secondary/50"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Short Description
                </label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe their personality in a few sentences..."
                  className="bg-secondary/50 min-h-[100px]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Traits */}
        {step === 2 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Select Traits
            </h2>
            <p className="text-muted-foreground mb-8">
              Choose 3-5 personality traits.
            </p>

            <div className="flex flex-wrap gap-2">
              {traitOptions.map((trait) => (
                <button
                  key={trait.value}
                  onClick={() => handleTraitToggle(trait.value)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                    selectedTraits.includes(trait.value)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary/50 text-secondary-foreground hover:bg-secondary'
                  )}
                >
                  {trait.label}
                </button>
              ))}
            </div>

            <p className="text-xs text-muted-foreground mt-4">
              {selectedTraits.length}/5 traits selected
            </p>
          </div>
        )}

        {/* Step 3: Image Upload */}
        {step === 3 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Add Image (Optional)
            </h2>
            <p className="text-muted-foreground mb-8">
              Upload a vertical image for your character.
            </p>

            <div className="relative">
              {imagePreview ? (
                <div className="relative aspect-[2/3] rounded-2xl overflow-hidden bg-secondary">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => setImagePreview(null)}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center hover:bg-background transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="block aspect-[2/3] rounded-2xl border-2 border-dashed border-border/50 bg-secondary/30 cursor-pointer hover:bg-secondary/50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="h-full flex flex-col items-center justify-center">
                    <Upload className="w-12 h-12 text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload image
                    </p>
                    <p className="text-xs text-muted-foreground/60 mt-1">
                      Recommended: 2:3 aspect ratio
                    </p>
                  </div>
                </label>
              )}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 mt-8">
          <Button variant="outline" onClick={handleBack} className="flex-1">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex-1"
          >
            {step === 3 ? 'Create' : 'Next'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </main>
  );
};

export default CreateCharacterFlow;
