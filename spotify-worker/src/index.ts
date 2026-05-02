export interface Env {
  SPOTIFY_CLIENT_ID: string
  SPOTIFY_CLIENT_SECRET: string
  SPOTIFY_REFRESH_TOKEN: string
  CLIENT_ORIGIN: string
}

interface SpotifyTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
}

interface SpotifyTrack {
  name: string
  artists: Array<{ name: string }>
  album: {
    name: string
    images: Array<{ url: string; height: number; width: number }>
  }
  external_urls: { spotify: string }
}

interface SpotifyCurrentlyPlayingResponse {
  is_playing: boolean
  item: SpotifyTrack | null
}

interface SpotifyRecentlyPlayedItem {
  track: SpotifyTrack
  played_at: string
}

interface SpotifyRecentlyPlayedResponse {
  items: Array<SpotifyRecentlyPlayedItem>
}

const CACHE_TTL_SECONDS = 180 // 3 minutes

function getAllowedOrigins(env: Env): Array<string> {
  return env.CLIENT_ORIGIN.split(",")
    .map((o) => o.trim())
    .filter(Boolean)
}

function resolveOrigin(request: Request, env: Env): string {
  const allowed = getAllowedOrigins(env)
  const requestOrigin = request.headers.get("origin") ?? ""
  return allowed.find((o) => o === requestOrigin) ?? allowed[0]
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const allowedOrigin = resolveOrigin(request, env)

    const corsHeaders = {
      "Access-Control-Allow-Origin": allowedOrigin,
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    }

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders })
    }

    const cache = caches.default
    const cacheKey = new Request(request.url)

    // Check cache first
    const cached = await cache.match(cacheKey)
    if (cached) {
      const cachedHeaders = new Headers(cached.headers)
      // Strip headers that should reflect the current response, not the cached one
      cachedHeaders.delete("Access-Control-Allow-Origin")
      cachedHeaders.delete("Access-Control-Allow-Methods")
      cachedHeaders.delete("Access-Control-Allow-Headers")
      cachedHeaders.delete("X-Cache")

      const response = new Response(cached.body, {
        status: cached.status,
        statusText: cached.statusText,
        headers: {
          ...Object.fromEntries(cachedHeaders),
          ...corsHeaders,
          "X-Cache": "HIT",
        },
      })
      return response
    }

    try {
      const accessToken = await getAccessToken(env)

      // Try currently playing first
      const currentlyPlaying = await fetch(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )

      let body: string | null = null

      if (currentlyPlaying.status === 200) {
        const data =
          (await currentlyPlaying.json()) as SpotifyCurrentlyPlayingResponse
        if (data.item) {
          body = JSON.stringify({
            isPlaying: true,
            title: data.item.name,
            artist: data.item.artists.map((a) => a.name).join(", "),
            album: data.item.album.name,
            albumImageUrl: data.item.album.images[0]?.url ?? "",
            songUrl: data.item.external_urls.spotify,
          })
        }
      }

      // Fallback to recently played
      if (!body) {
        const recentlyPlayed = await fetch(
          "https://api.spotify.com/v1/me/player/recently-played?limit=1",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        )

        if (!recentlyPlayed.ok) {
          throw new Error(`Spotify API error: ${recentlyPlayed.status}`)
        }

        const recentData =
          (await recentlyPlayed.json()) as SpotifyRecentlyPlayedResponse
        const lastTrack = recentData.items[0]
        body = JSON.stringify({
          isPlaying: false,
          title: lastTrack.track.name,
          artist: lastTrack.track.artists.map((a) => a.name).join(", "),
          album: lastTrack.track.album.name,
          albumImageUrl: lastTrack.track.album.images[0]?.url ?? "",
          songUrl: lastTrack.track.external_urls.spotify,
          playedAt: lastTrack.played_at,
        })
      }

      const response = new Response(body, {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": `public, max-age=${CACHE_TTL_SECONDS}`,
          "X-Cache": "MISS",
          ...corsHeaders,
        },
      })

      // Strip CORS headers from the cached clone so future requests get Origin-specific headers
      const cacheResponse = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": `public, max-age=${CACHE_TTL_SECONDS}`,
          "X-Cache": "MISS",
        },
      })

      // Store in Cloudflare cache (clone because Response body can only be read once)
      ctx.waitUntil(cache.put(cacheKey, cacheResponse))

      return response
    } catch (error) {
      console.error(error)
      return new Response(
        JSON.stringify({ error: "Failed to fetch Spotify data" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      )
    }
  },
}

async function getAccessToken(env: Env): Promise<string> {
  const basic = btoa(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`)

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: env.SPOTIFY_REFRESH_TOKEN,
    }),
  })

  if (!response.ok) {
    throw new Error(`Token refresh failed: ${response.status}`)
  }

  const data = (await response.json()) as SpotifyTokenResponse
  return data.access_token
}
