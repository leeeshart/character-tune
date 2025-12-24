import kaiserImage from '@/assets/characters/kaiser-1.jpeg';

export interface Character {
  id: string;
  name: string;
  anime: string;
  color: 'kaiser' | 'gojo' | 'nanami' | 'jaekyung';
  traits: string[];
  energy: string;
  soundIdentity: string[];
  genreTendencies: string;
  listeningBehavior: string[];
  tastePhilosophy: string;
  image?: string;
}

export const characters: Character[] = [
  {
    id: 'kaiser',
    name: 'Michael Kaiser',
    anime: 'Blue Lock',
    color: 'kaiser',
    traits: ['Dominant', 'Theatrical', 'Strategic', 'Intense'],
    energy: 'Commanding & Controlled',
    soundIdentity: ['High energy', 'Sharp rhythm', 'Controlled emotional exposure', 'Dominant presence'],
    genreTendencies: 'Rap / Trap / Dark Pop (adaptive)',
    listeningBehavior: [
      'Prefers music that asserts control',
      'Avoids emotional excess',
      'Thrives on dramatic tension',
    ],
    tastePhilosophy: '"Music is not comfort. It\'s proof that I exist above the noise."',
    image: kaiserImage,
  },
  {
    id: 'jaekyung',
    name: 'Joo Jaekyung',
    anime: 'Jinx',
    color: 'jaekyung',
    traits: ['Dominant', 'Intense', 'Guarded', 'Relentless'],
    energy: 'Raw & Unfiltered',
    soundIdentity: ['Heavy beats', 'Raw aggression', 'Dark intensity', 'Physical power'],
    genreTendencies: 'Heavy Hip-Hop / Dark Trap / Workout / Industrial',
    listeningBehavior: [
      'Uses music to channel aggression',
      'Prefers intensity over melody',
      'Music as fuel, not comfort',
    ],
    tastePhilosophy: '"Music doesn\'t calm me. It sharpens me."',
  },
  {
    id: 'gojo',
    name: 'Gojo Satoru',
    anime: 'Jujutsu Kaisen',
    color: 'gojo',
    traits: ['Playful', 'Chaotic', 'Confident', 'Unpredictable'],
    energy: 'Electric & Carefree',
    soundIdentity: ['High energy', 'Unpredictable drops', 'Playful chaos', 'Euphoric peaks'],
    genreTendencies: 'EDM / Hyperpop / K-Pop / Party anthems',
    listeningBehavior: [
      'Skips intros, lives for the drop',
      'Plays music loud, no shame',
      'Curates for vibes, not meaning',
    ],
    tastePhilosophy: '"If it doesn\'t hit different, why bother?"',
  },
  {
    id: 'nanami',
    name: 'Nanami Kento',
    anime: 'Jujutsu Kaisen',
    color: 'nanami',
    traits: ['Disciplined', 'Mature', 'Calm', 'Refined'],
    energy: 'Steady & Sophisticated',
    soundIdentity: ['Clean production', 'Jazzy undertones', 'Smooth grooves', 'Subtle complexity'],
    genreTendencies: 'R&B / Neo-Soul / Jazz / Lo-fi',
    listeningBehavior: [
      'Values quality over quantity',
      'Appreciates subtle craftsmanship',
      'Listens fully, never skips',
    ],
    tastePhilosophy: '"Good music respects your time."',
  },
];

export const getCharacterById = (id: string): Character | undefined => {
  return characters.find(c => c.id === id);
};
