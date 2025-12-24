import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MusicVisualizer from '@/components/MusicVisualizer';

const SpotifyCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // The SpotifyAuthProvider handles the token extraction from the URL hash
    // After a short delay, redirect to home
    const timeout = setTimeout(() => {
      navigate('/', { replace: true });
    }, 1500);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <MusicVisualizer bars={5} className="justify-center mb-6" />
        <h1 className="text-xl font-medium text-foreground mb-2">
          Connecting to Spotify...
        </h1>
        <p className="text-sm text-muted-foreground">
          Just a moment while we set things up
        </p>
      </div>
    </div>
  );
};

export default SpotifyCallback;
