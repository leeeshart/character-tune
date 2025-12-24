import { Router, Request, Response as ExpressResponse } from 'express';

const router = Router();

// Middleware to extract and validate access token
const authMiddleware = (req: Request, res: ExpressResponse, next: () => void) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  (req as Request & { accessToken: string }).accessToken = authHeader.substring(7);
  next();
};

// Helper to make Spotify API requests
async function spotifyFetch(endpoint: string, accessToken: string) {
  return fetch(`https://api.spotify.com/v1${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });
}

// Get user profile
router.get('/me', authMiddleware, async (req: Request, res: ExpressResponse) => {
  const accessToken = (req as Request & { accessToken: string }).accessToken;
  
  try {
    const response = await spotifyFetch('/me', accessToken);
    
    if (!response.ok) {
      const error = await response.text();
      console.error('Spotify API error:', error);
      return res.status(response.status).json({ error: 'Failed to fetch profile' });
    }
    
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user's top tracks
router.get('/top/tracks', authMiddleware, async (req: Request, res: ExpressResponse) => {
  const accessToken = (req as Request & { accessToken: string }).accessToken;
  const timeRange = (req.query.time_range as string) || 'medium_term';
  const limit = Math.min(parseInt(req.query.limit as string) || 20, 50);
  
  try {
    const response = await spotifyFetch(
      `/me/top/tracks?time_range=${timeRange}&limit=${limit}`,
      accessToken
    );
    
    if (!response.ok) {
      const error = await response.text();
      console.error('Spotify API error:', error);
      return res.status(response.status).json({ error: 'Failed to fetch top tracks' });
    }
    
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Error fetching top tracks:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user's top artists
router.get('/top/artists', authMiddleware, async (req: Request, res: ExpressResponse) => {
  const accessToken = (req as Request & { accessToken: string }).accessToken;
  const timeRange = (req.query.time_range as string) || 'medium_term';
  const limit = Math.min(parseInt(req.query.limit as string) || 20, 50);
  
  try {
    const response = await spotifyFetch(
      `/me/top/artists?time_range=${timeRange}&limit=${limit}`,
      accessToken
    );
    
    if (!response.ok) {
      const error = await response.text();
      console.error('Spotify API error:', error);
      return res.status(response.status).json({ error: 'Failed to fetch top artists' });
    }
    
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Error fetching top artists:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user's recently played tracks
router.get('/recently-played', authMiddleware, async (req: Request, res: ExpressResponse) => {
  const accessToken = (req as Request & { accessToken: string }).accessToken;
  const limit = Math.min(parseInt(req.query.limit as string) || 20, 50);
  
  try {
    const response = await spotifyFetch(
      `/me/player/recently-played?limit=${limit}`,
      accessToken
    );
    
    if (!response.ok) {
      const error = await response.text();
      console.error('Spotify API error:', error);
      return res.status(response.status).json({ error: 'Failed to fetch recently played' });
    }
    
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Error fetching recently played:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get personalized recommendations based on character and user taste
router.post('/recommendations', authMiddleware, async (req: Request, res: ExpressResponse) => {
  const accessToken = (req as Request & { accessToken: string }).accessToken;
  const { characterId, preferences, seedTracks, seedArtists } = req.body;
  
  try {
    // Build seed parameters (Spotify allows up to 5 total seeds)
    const seeds: string[] = [];
    const params = new URLSearchParams();
    
    if (seedTracks && seedTracks.length > 0) {
      params.append('seed_tracks', seedTracks.slice(0, 2).join(','));
    }
    
    if (seedArtists && seedArtists.length > 0) {
      params.append('seed_artists', seedArtists.slice(0, 2).join(','));
    }
    
    // Add genre seeds based on character and preferences
    const genreSeeds = getGenreSeeds(characterId, preferences);
    if (genreSeeds.length > 0) {
      params.append('seed_genres', genreSeeds.slice(0, 1).join(','));
    }
    
    // Add tunable track attributes based on character
    const attributes = getCharacterAttributes(characterId);
    Object.entries(attributes).forEach(([key, value]) => {
      params.append(key, value.toString());
    });
    
    params.append('limit', '20');
    
    const response = await spotifyFetch(
      `/recommendations?${params.toString()}`,
      accessToken
    );
    
    if (!response.ok) {
      const error = await response.text();
      console.error('Spotify API error:', error);
      return res.status(response.status).json({ error: 'Failed to get recommendations' });
    }
    
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Error getting recommendations:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Helper function to get genre seeds based on character and preferences
function getGenreSeeds(characterId: string, preferences: Record<string, string>): string[] {
  const characterGenres: Record<string, string[]> = {
    kaiser: ['hip-hop', 'rap', 'dark-pop'],
    jaekyung: ['hip-hop', 'metal', 'industrial'],
  };
  
  const preferenceGenres: Record<string, string[]> = {
    hiphop: ['hip-hop', 'rap'],
    electronic: ['electronic', 'edm'],
    rock: ['rock', 'metal'],
    rnb: ['r-n-b', 'soul'],
    pop: ['pop', 'indie'],
  };
  
  const genres: string[] = [];
  
  // Add character-specific genres
  if (characterGenres[characterId]) {
    genres.push(...characterGenres[characterId]);
  }
  
  // Add preference-based genres
  if (preferences.genre && preferenceGenres[preferences.genre]) {
    genres.push(...preferenceGenres[preferences.genre]);
  }
  
  // Return unique genres
  return [...new Set(genres)];
}

// Helper function to get tunable track attributes based on character
function getCharacterAttributes(characterId: string): Record<string, number> {
  const characterAttributes: Record<string, Record<string, number>> = {
    kaiser: {
      target_energy: 0.8,
      target_valence: 0.4,
      min_tempo: 100,
      target_danceability: 0.6,
    },
    jaekyung: {
      target_energy: 0.9,
      target_valence: 0.3,
      min_tempo: 120,
      target_danceability: 0.5,
    },
  };
  
  return characterAttributes[characterId] || {
    target_energy: 0.7,
    target_valence: 0.5,
  };
}

export { router as spotifyRouter };
