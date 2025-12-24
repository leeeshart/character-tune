import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface SpotifyUser {
  id: string;
  display_name: string;
  email: string;
  images?: { url: string }[];
}

interface SpotifyAuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: SpotifyUser | null;
  accessToken: string | null;
  login: () => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<boolean>;
}

const SpotifyAuthContext = createContext<SpotifyAuthContextType | null>(null);

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const TOKEN_STORAGE_KEY = 'spotify_auth';

interface StoredTokens {
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

export function SpotifyAuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<SpotifyUser | null>(null);
  const [tokens, setTokens] = useState<StoredTokens | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Define refreshTokenInternal first so it can be used in useEffects
  const refreshTokenInternal = useCallback(async (refreshToken: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });
      
      if (response.ok) {
        const data = await response.json();
        const storedTokens: StoredTokens = {
          access_token: data.access_token,
          refresh_token: data.refresh_token || refreshToken,
          expires_at: Date.now() + data.expires_in * 1000,
        };
        
        localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(storedTokens));
        setTokens(storedTokens);
        return true;
      }
    } catch (err) {
      console.error('Failed to refresh token:', err);
    }
    
    // If refresh failed, clear everything
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setTokens(null);
    setUser(null);
    return false;
  }, []);

  // Load tokens from storage on mount
  useEffect(() => {
    const stored = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as StoredTokens;
        // Check if token is still valid (with 5 minute buffer)
        if (parsed.expires_at > Date.now() + 300000) {
          setTokens(parsed);
        } else if (parsed.refresh_token) {
          // Try to refresh
          refreshTokenInternal(parsed.refresh_token);
        } else {
          localStorage.removeItem(TOKEN_STORAGE_KEY);
        }
      } catch {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, [refreshTokenInternal]);

  // Handle OAuth callback
  useEffect(() => {
    if (location.pathname === '/callback') {
      const hash = location.hash.substring(1);
      const params = new URLSearchParams(hash);
      
      const accessToken = params.get('access_token');
      const refreshToken = params.get('refresh_token');
      const expiresIn = params.get('expires_in');
      
      if (accessToken && refreshToken && expiresIn) {
        const storedTokens: StoredTokens = {
          access_token: accessToken,
          refresh_token: refreshToken,
          expires_at: Date.now() + parseInt(expiresIn) * 1000,
        };
        
        localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(storedTokens));
        setTokens(storedTokens);
        
        // Navigate to home
        navigate('/', { replace: true });
      }
    }
    
    // Handle errors
    const searchParams = new URLSearchParams(location.search);
    const error = searchParams.get('error');
    if (error) {
      console.error('OAuth error:', error);
      navigate('/', { replace: true });
    }
  }, [location.pathname, location.hash, location.search, navigate]);

  // Fetch user profile when tokens are available
  useEffect(() => {
    const fetchProfile = async (accessToken: string, refreshToken: string | undefined) => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/spotify/me`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else if (response.status === 401 && refreshToken) {
          // Token expired, try to refresh
          await refreshTokenInternal(refreshToken);
        }
      } catch (err) {
        console.error('Failed to fetch user profile:', err);
      }
    };

    if (tokens?.access_token) {
      fetchProfile(tokens.access_token, tokens.refresh_token);
    }
  }, [tokens?.access_token, tokens?.refresh_token, refreshTokenInternal]);

  const login = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`);
      const data = await response.json();
      window.location.href = data.url;
    } catch (err) {
      console.error('Failed to initiate login:', err);
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setTokens(null);
    setUser(null);
  };

  const refreshToken = async (): Promise<boolean> => {
    if (tokens?.refresh_token) {
      return refreshTokenInternal(tokens.refresh_token);
    }
    return false;
  };

  return (
    <SpotifyAuthContext.Provider
      value={{
        isAuthenticated: !!tokens?.access_token && !!user,
        isLoading,
        user,
        accessToken: tokens?.access_token || null,
        login,
        logout,
        refreshToken,
      }}
    >
      {children}
    </SpotifyAuthContext.Provider>
  );
}

export function useSpotifyAuth() {
  const context = useContext(SpotifyAuthContext);
  if (!context) {
    throw new Error('useSpotifyAuth must be used within SpotifyAuthProvider');
  }
  return context;
}
