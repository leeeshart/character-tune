import { Router, Request, Response } from 'express';
import crypto from 'crypto';

const router = Router();

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || '';
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || '';
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI || 'http://localhost:3001/api/auth/callback';
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:8080';

// Scopes needed for getting user's top tracks and artists
const SCOPES = [
  'user-top-read',
  'user-read-recently-played',
  'user-read-private',
].join(' ');

// Generate random state for OAuth security
const generateState = (): string => {
  return crypto.randomBytes(16).toString('hex');
};

// Get Spotify authorization URL
router.get('/login', (req: Request, res: Response) => {
  const state = generateState();
  
  const params = new URLSearchParams({
    client_id: SPOTIFY_CLIENT_ID,
    response_type: 'code',
    redirect_uri: SPOTIFY_REDIRECT_URI,
    scope: SCOPES,
    state: state,
  });

  const authUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;
  res.json({ url: authUrl, state });
});

// Handle OAuth callback
router.get('/callback', async (req: Request, res: Response) => {
  const { code, error, state } = req.query;

  if (error) {
    return res.redirect(`${CLIENT_URL}?error=${error}`);
  }

  if (!code || typeof code !== 'string') {
    return res.redirect(`${CLIENT_URL}?error=missing_code`);
  }

  try {
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: SPOTIFY_REDIRECT_URI,
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error('Token exchange failed:', errorData);
      return res.redirect(`${CLIENT_URL}?error=token_exchange_failed`);
    }

    const tokenData = await tokenResponse.json() as {
      access_token: string;
      refresh_token: string;
      expires_in: number;
    };

    // Redirect to client with tokens in URL hash (for security, not exposed in server logs)
    const params = new URLSearchParams({
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
      expires_in: tokenData.expires_in.toString(),
    });

    res.redirect(`${CLIENT_URL}/callback#${params.toString()}`);
  } catch (err) {
    console.error('OAuth callback error:', err);
    res.redirect(`${CLIENT_URL}?error=server_error`);
  }
});

// Refresh access token
router.post('/refresh', async (req: Request, res: Response) => {
  const { refresh_token } = req.body;

  if (!refresh_token) {
    return res.status(400).json({ error: 'Refresh token required' });
  }

  try {
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error('Token refresh failed:', errorData);
      return res.status(401).json({ error: 'Token refresh failed' });
    }

    const tokenData = await tokenResponse.json();
    res.json(tokenData);
  } catch (err) {
    console.error('Token refresh error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export { router as authRouter };
