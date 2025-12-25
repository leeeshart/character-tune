import jaekyungImage from '@/assets/characters/jaekyung-1.jpeg';
import jaekyungCover from '@/assets/characters/jaekyung-cover.jpeg';
import jaekyungIntroVideo from '@/assets/characters/jaekyung-intro.mp4';

export interface Character {
  id: string;
  name: string;
  source: string;
  sourceType: 'manhwa' | 'anime' | 'original';
  color: 'jaekyung' | 'custom';
  auraLine: string;
  traits: string[];
  expandedBio: string;
  soundIdentity: string[];
  genreTendencies: string;
  listeningBehavior: string[];
  tastePhilosophy: string;
  image: string;
  coverImage?: string;
  introVideo?: string;
  accentColor: string;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  moodTags: string[];
  tracks: Track[];
}

export interface Track {
  title: string;
  artist: string;
  mood?: string;
}

export const characters: Character[] = [
  {
    id: 'jaekyung',
    name: 'Joo Jaekyung',
    source: 'Jinx',
    sourceType: 'manhwa',
    color: 'jaekyung',
    auraLine: 'Built on rage. Learning restraint.',
    traits: ['Hot-tempered', 'Dominant', 'Emotionally guarded', 'Trauma-driven', 'Developing empathy'],
    expandedBio: 'A top-ranked MMA fighter shaped by abandonment and rejection. His aggression and dominance act as defense mechanisms against past vulnerability. Over time, he begins to develop emotional awareness and empathy.',
    soundIdentity: ['Heavy beats', 'Raw aggression', 'Dark intensity', 'Physical power'],
    genreTendencies: 'Heavy Hip-Hop / Dark Trap / Workout / Industrial',
    listeningBehavior: [
      'Uses music to channel aggression',
      'Prefers intensity over melody',
      'Music as fuel, not comfort',
    ],
    tastePhilosophy: '"Music doesn\'t calm me. It sharpens me."',
    image: jaekyungImage,
    coverImage: jaekyungCover,
    introVideo: jaekyungIntroVideo,
    accentColor: 'steel-grey',
  },
];

export const characterPlaylists: Record<string, Playlist[]> = {
  jaekyung: [
    {
      id: 'this-is-jaekyung',
      title: 'This Is Joo Jaekyung',
      description: 'Music that reflects intensity, control, and pressure.',
      moodTags: ['Power', 'Pressure', 'Obsession'],
      tracks: [
        { title: 'Lose Yourself', artist: 'Eminem', mood: 'Power' },
        { title: 'Till I Collapse', artist: 'Eminem ft. Nate Dogg', mood: 'Pressure' },
        { title: "Can't Be Touched", artist: 'Roy Jones Jr.', mood: 'Power' },
        { title: 'Remember The Name', artist: 'Fort Minor', mood: 'Pressure' },
        { title: 'Warrior', artist: 'Disturbed', mood: 'Power' },
        { title: 'HUMBLE.', artist: 'Kendrick Lamar', mood: 'Obsession' },
        { title: 'Blood // Water', artist: 'Grandson', mood: 'Pressure' },
        { title: 'Monster', artist: 'Imagine Dragons', mood: 'Power' },
        { title: 'Radioactive', artist: 'Imagine Dragons', mood: 'Power' },
        { title: 'The Search', artist: 'NF', mood: 'Obsession' },
        { title: 'MANIAC', artist: 'Stray Kids', mood: 'Power' },
        { title: 'Thunderous', artist: 'Stray Kids', mood: 'Pressure' },
      ],
    },
    {
      id: 'blend-jaekyung',
      title: 'You × Joo Jaekyung',
      description: 'A blend of your music taste and his personality.',
      moodTags: ['Intensity', 'Personal', 'Fusion'],
      tracks: [
        { title: 'DNA.', artist: 'Kendrick Lamar', mood: 'Intensity' },
        { title: 'Sicko Mode', artist: 'Travis Scott', mood: 'Personal' },
        { title: "God's Menu", artist: 'Stray Kids', mood: 'Fusion' },
        { title: 'Venom', artist: 'Eminem', mood: 'Intensity' },
        { title: 'VILLAIN', artist: 'K/DA', mood: 'Fusion' },
        { title: 'Power', artist: 'Kanye West', mood: 'Personal' },
        { title: 'Stronger', artist: 'Kanye West', mood: 'Intensity' },
        { title: 'Godzilla', artist: 'Eminem ft. Juice WRLD', mood: 'Personal' },
      ],
    },
  ],
};

export const getCharacterById = (id: string): Character | undefined => {
  return characters.find(c => c.id === id);
};

export const getPlaylistsForCharacter = (characterId: string): Playlist[] => {
  return characterPlaylists[characterId] || [];
};
