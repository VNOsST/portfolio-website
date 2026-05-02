# Spotify Activity Cloudflare Worker

This Cloudflare Worker fetches your Spotify activity (currently playing or last played track) and exposes it via a simple JSON API with CORS enabled.

## How It Works

1. The worker uses a **Spotify Refresh Token** to get a temporary access token.
2. It first calls the **[Get Currently Playing Track](https://developer.spotify.com/documentation/web-api/reference/get-the-users-currently-playing-track)** endpoint.
3. If nothing is playing, it falls back to **[Get Recently Played Tracks](https://developer.spotify.com/documentation/web-api/reference/get-recently-played)**.
4. It returns a normalized JSON object.

## Setup Instructions

### 1. Create a Spotify App

1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).
2. Click **"Create app"**.
3. Fill in the app name and description.
4. For **Redirect URI**, use: `http://localhost:3000/callback` (we only need this once to get the refresh token).
5. Save the **Client ID** and **Client Secret**.

### 2. Get a Refresh Token

**Manual steps:**

1. Build the authorization URL:
   ```
   https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=http://localhost:3000/callback&scope=user-read-currently-playing,user-read-recently-played
   ```
2. Open it in your browser and authorize.
3. Copy the `code` from the redirected URL.
4. Exchange the code for tokens:
   ```bash
   curl -X POST "https://accounts.spotify.com/api/token" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "grant_type=authorization_code&code=YOUR_CODE&redirect_uri=http://localhost:3000/callback&client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET"
   ```
5. Save the **`refresh_token`** from the response.

> **Note:** The refresh token never expires (unless you revoke it), so you only need to do this once.

### 3. Deploy the Worker

1. Install dependencies:

   ```bash
   cd spotify-worker
   npm install
   ```

2. Update `wrangler.toml` with your allowed frontend origins:

   ```toml
   [vars]
   CLIENT_ORIGIN = "https://yourdomain.com, http://localhost:3000"
   ```

   You can add multiple origins separated by commas. The worker will automatically match the incoming request's `Origin` header against this list.

3. Set secrets:

   ```bash
   npx wrangler secret put SPOTIFY_CLIENT_ID
   npx wrangler secret put SPOTIFY_CLIENT_SECRET
   npx wrangler secret put SPOTIFY_REFRESH_TOKEN
   ```

4. Deploy:

   ```bash
   npx wrangler deploy
   ```

5. Copy the deployed worker URL and add it to your frontend `.env.local`:
   ```
   VITE_SPOTIFY_WORKER_URL=https://spotify-activity-worker.your-subdomain.workers.dev
   ```

## Response Format

```json
{
  "isPlaying": true,
  "title": "Song Name",
  "artist": "Artist Name",
  "album": "Album Name",
  "albumImageUrl": "https://i.scdn.co/image/...",
  "songUrl": "https://open.spotify.com/track/...",
  "playedAt": "2025-05-01T12:00:00.000Z" // only present when not playing
}
```

If no data is available, the worker returns `null`.
