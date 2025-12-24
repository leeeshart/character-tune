import { useQuery } from '@tanstack/react-query';
import { useSpotifyAuth } from './use-spotify-auth';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface SpotifyTrack {
  id: string;
  name: string;
  artists: { id: string; name: string }[];
  album: {
    id: string;
    name: string;
    images: { url: string; width: number; height: number }[];
  };
  external_urls: { spotify: string };
  preview_url: string | null;
}

interface SpotifyArtist {
  id: string;
  name: string;
  genres: string[];
  images: { url: string; width: number; height: number }[];
  external_urls: { spotify: string };
}

interface TopTracksResponse {
  items: SpotifyTrack[];
  total: number;
}

interface TopArtistsResponse {
  items: SpotifyArtist[];
  total: number;
}

interface RecommendationsResponse {
  tracks: SpotifyTrack[];
}

export function useTopTracks(timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term', limit = 10) {
  const { accessToken, isAuthenticated } = useSpotifyAuth();

  return useQuery<TopTracksResponse>({
    queryKey: ['spotify', 'topTracks', timeRange, limit],
    queryFn: async () => {
      const response = await fetch(
        `${API_BASE_URL}/api/spotify/top/tracks?time_range=${timeRange}&limit=${limit}`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch top tracks');
      }
      
      return response.json();
    },
    enabled: isAuthenticated && !!accessToken,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useTopArtists(timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term', limit = 10) {
  const { accessToken, isAuthenticated } = useSpotifyAuth();

  return useQuery<TopArtistsResponse>({
    queryKey: ['spotify', 'topArtists', timeRange, limit],
    queryFn: async () => {
      const response = await fetch(
        `${API_BASE_URL}/api/spotify/top/artists?time_range=${timeRange}&limit=${limit}`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch top artists');
      }
      
      return response.json();
    },
    enabled: isAuthenticated && !!accessToken,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useRecommendations(
  characterId: string,
  preferences: Record<string, string>,
  seedTrackIds?: string[],
  seedArtistIds?: string[],
  enabled = true
) {
  const { accessToken, isAuthenticated } = useSpotifyAuth();

  return useQuery<RecommendationsResponse>({
    queryKey: ['spotify', 'recommendations', characterId, preferences, seedTrackIds, seedArtistIds],
    queryFn: async () => {
      const response = await fetch(
        `${API_BASE_URL}/api/spotify/recommendations`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            characterId,
            preferences,
            seedTracks: seedTrackIds,
            seedArtists: seedArtistIds,
          }),
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to get recommendations');
      }
      
      return response.json();
    },
    enabled: isAuthenticated && !!accessToken && enabled,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export type { SpotifyTrack, SpotifyArtist, TopTracksResponse, TopArtistsResponse, RecommendationsResponse };
