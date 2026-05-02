import { useQuery } from "@tanstack/react-query"

export interface SpotifyActivity {
  isPlaying: boolean
  title: string
  artist: string
  album: string
  albumImageUrl: string
  songUrl: string
  playedAt?: string
}

async function fetchSpotifyActivity(): Promise<SpotifyActivity | null> {
  const endpoint = import.meta.env.VITE_SPOTIFY_WORKER_URL
  if (!endpoint) return null

  const res = await fetch(endpoint, {
    headers: { Accept: "application/json" },
  })

  if (!res.ok) throw new Error("Failed to fetch Spotify activity")

  const data = (await res.json()) as SpotifyActivity | null
  return data
}

export function useSpotifyActivity(enabled = true) {
  return useQuery<SpotifyActivity | null, Error>({
    queryKey: ["spotify-activity"],
    queryFn: fetchSpotifyActivity,
    enabled,
    staleTime: 1000 * 30, // 30 seconds
    refetchInterval: 1000 * 30, // refetch every 30 seconds when active
  })
}
