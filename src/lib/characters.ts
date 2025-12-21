export interface Character {
  id: string;
  name: string;
  anime: string;
  color: 'kaiser' | 'gojo' | 'nanami';
  traits: string[];
  energy: string;
  musicVibe: string;
  description: string;
}

export const characters: Character[] = [
  {
    id: 'kaiser',
    name: 'Kaiser',
    anime: 'Blue Lock',
    color: 'kaiser',
    traits: ['Dominant', 'Ambitious', 'Strategic', 'Ruthless'],
    energy: 'Commanding & Intense',
    musicVibe: 'Power anthems, orchestral epics, aggressive hip-hop',
    description: 'The emperor who demands perfection. Music that makes you feel unstoppable.',
  },
  {
    id: 'gojo',
    name: 'Gojo Satoru',
    anime: 'Jujutsu Kaisen',
    color: 'gojo',
    traits: ['Playful', 'Chaotic', 'Confident', 'Unpredictable'],
    energy: 'Electric & Carefree',
    musicVibe: 'High-energy drops, chaotic beats, euphoric vibes',
    description: 'The strongest who plays by his own rules. Music that hits different.',
  },
  {
    id: 'nanami',
    name: 'Nanami Kento',
    anime: 'Jujutsu Kaisen',
    color: 'nanami',
    traits: ['Disciplined', 'Mature', 'Calm', 'Refined'],
    energy: 'Steady & Sophisticated',
    musicVibe: 'Clean production, jazzy undertones, smooth grooves',
    description: 'The professional who values quality. Music for focused minds.',
  },
];

export const getCharacterById = (id: string): Character | undefined => {
  return characters.find(c => c.id === id);
};
