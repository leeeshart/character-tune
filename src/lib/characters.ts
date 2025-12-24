import kaiserImage from '@/assets/characters/kaiser-1.jpeg';
import jaekyungImage from '@/assets/characters/jaekyung-1.jpeg';

export interface Character {
  id: string;
  name: string;
  anime: string;
  color: 'kaiser' | 'jaekyung';
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
    image: jaekyungImage,
  },
];

export const getCharacterById = (id: string): Character | undefined => {
  return characters.find(c => c.id === id);
};
