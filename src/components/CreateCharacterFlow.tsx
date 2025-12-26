import { useState } from 'react';
import { Character } from '@/lib/characters';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, ArrowRight, Upload, X, Image, Video, User } from 'lucide-react';
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

const languageOptions = [
  { value: 'hindi', label: 'Hindi' },
  { value: 'english', label: 'English' },
  { value: 'kpop', label: 'K-Pop' },
  { value: 'other', label: 'Other' },
];

const CreateCharacterFlow = ({ onComplete, onBack }: CreateCharacterFlowProps) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [otherLanguage, setOtherLanguage] = useState('');

  const handleTraitToggle = (trait: string) => {
    if (selectedTraits.includes(trait)) {
      setSelectedTraits(selectedTraits.filter((t) => t !== trait));
    } else if (selectedTraits.length < 5) {
      setSelectedTraits([...selectedTraits, trait]);
    }
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (value: string | null) => void,
    type: 'image' | 'video'
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      const languageValue = selectedLanguage === 'other' ? otherLanguage : selectedLanguage;
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
        genreTendencies: languageValue ? `Personalized - ${languageValue}` : 'Personalized based on traits',
        listeningBehavior: ['Curated to match personality'],
        tastePhilosophy: '"Music that reflects who you are."',
        image: profileImagePreview || '/placeholder.svg',
        coverImage: coverImagePreview || undefined,
        introVideo: videoPreview || undefined,
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
    if (step === 3) return true; // Images are optional
    if (step === 4) return selectedLanguage !== '' && (selectedLanguage !== 'other' || otherLanguage.trim().length > 0);
    return true;
  };

  return (
    <main className="min-h-screen">
      <div className="container max-w-md mx-auto px-4 py-12">
        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4].map((i) => (
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

        {/* Step 3: Media Uploads */}
        {step === 3 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Add Media (Optional)
            </h2>
            <p className="text-muted-foreground mb-8">
              Upload images and video for your character.
            </p>

            <div className="space-y-6">
              {/* Cover Image */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <Image className="w-4 h-4" />
                  Cover Image
                </label>
                <p className="text-xs text-muted-foreground mb-2">
                  Vertical image for the home card (2:3 ratio)
                </p>
                {coverImagePreview ? (
                  <div className="relative aspect-[2/3] max-w-[200px] rounded-xl overflow-hidden bg-secondary">
                    <img
                      src={coverImagePreview}
                      alt="Cover Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => setCoverImagePreview(null)}
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-background/80 flex items-center justify-center hover:bg-background transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <label className="block aspect-[2/3] max-w-[200px] rounded-xl border-2 border-dashed border-border/50 bg-secondary/30 cursor-pointer hover:bg-secondary/50 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, setCoverImagePreview, 'image')}
                      className="hidden"
                    />
                    <div className="h-full flex flex-col items-center justify-center p-4">
                      <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                      <p className="text-xs text-muted-foreground text-center">
                        Upload cover
                      </p>
                    </div>
                  </label>
                )}
              </div>

              {/* Profile Image */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Profile Image
                </label>
                <p className="text-xs text-muted-foreground mb-2">
                  Circular avatar for profile page
                </p>
                {profileImagePreview ? (
                  <div className="relative w-24 h-24 rounded-full overflow-hidden bg-secondary">
                    <img
                      src={profileImagePreview}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => setProfileImagePreview(null)}
                      className="absolute top-1 right-1 w-6 h-6 rounded-full bg-background/80 flex items-center justify-center hover:bg-background transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <label className="block w-24 h-24 rounded-full border-2 border-dashed border-border/50 bg-secondary/30 cursor-pointer hover:bg-secondary/50 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, setProfileImagePreview, 'image')}
                      className="hidden"
                    />
                    <div className="h-full flex flex-col items-center justify-center">
                      <Upload className="w-6 h-6 text-muted-foreground" />
                    </div>
                  </label>
                )}
              </div>

              {/* Video Edit */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  Intro Edit Video
                </label>
                <p className="text-xs text-muted-foreground mb-2">
                  Short video intro (15-30 seconds recommended)
                </p>
                {videoPreview ? (
                  <div className="relative aspect-video max-w-[300px] rounded-xl overflow-hidden bg-secondary">
                    <video
                      src={videoPreview}
                      className="w-full h-full object-cover"
                      controls
                    />
                    <button
                      onClick={() => setVideoPreview(null)}
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-background/80 flex items-center justify-center hover:bg-background transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <label className="block aspect-video max-w-[300px] rounded-xl border-2 border-dashed border-border/50 bg-secondary/30 cursor-pointer hover:bg-secondary/50 transition-colors">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleFileUpload(e, setVideoPreview, 'video')}
                      className="hidden"
                    />
                    <div className="h-full flex flex-col items-center justify-center p-4">
                      <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                      <p className="text-xs text-muted-foreground text-center">
                        Upload video
                      </p>
                    </div>
                  </label>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Language Preference */}
        {step === 4 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Language Preference
            </h2>
            <p className="text-muted-foreground mb-8">
              What language music does your character prefer?
            </p>

            <div className="space-y-3">
              {languageOptions.map((lang) => (
                <button
                  key={lang.value}
                  onClick={() => setSelectedLanguage(lang.value)}
                  className={cn(
                    'w-full px-4 py-3 rounded-xl text-left font-medium transition-all duration-200 border',
                    selectedLanguage === lang.value
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-secondary/50 text-secondary-foreground border-border/50 hover:bg-secondary'
                  )}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {selectedLanguage === 'other' && (
              <div className="mt-4 animate-fade-in">
                <Input
                  value={otherLanguage}
                  onChange={(e) => setOtherLanguage(e.target.value)}
                  placeholder="Enter language preference..."
                  className="bg-secondary/50"
                />
              </div>
            )}
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
            {step === 4 ? 'Create' : 'Next'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </main>
  );
};

export default CreateCharacterFlow;