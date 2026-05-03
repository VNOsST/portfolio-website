import { useSpotifyActivity } from "@/hooks/use-spotify"
import { IconBrandSpotifyFilled } from "@tabler/icons-react"

function SpotifySkeleton() {
  return (
    <div className="flex items-center gap-4 animate-pulse">
      <div className="h-16 w-16 rounded-lg bg-muted shrink-0" />
      <div className="flex flex-col gap-2">
        <div className="h-4 w-32 rounded bg-muted" />
        <div className="h-3 w-24 rounded bg-muted" />
      </div>
    </div>
  )
}

export function SpotifyActivity() {
  const { data, isLoading, isError } = useSpotifyActivity()

  if (isLoading) return <SpotifySkeleton />
  if (isError || !data) return null

  return (
    <a
      href={data.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center gap-4 rounded-2xl border border-border bg-background p-4 pr-5 shadow-sm transition-colors hover:bg-muted/40 overflow-hidden"
    >
      {/* Large decorative Spotify logo */}
      {/* <IconBrandSpotify
        className="absolute -right-3 -top-3 h-24 w-24 rotate-12 text-green-500/10 transition-colors group-hover:text-green-500/20"
        strokeWidth={1.5}
      /> */}

      {/* Album art with overlay badge */}
      <div className="relative shrink-0">
        <img
          src={data.albumImageUrl}
          alt={data.album}
          className="h-16 w-16 rounded-xl object-cover border border-border shadow-sm"
        />
        {data.isPlaying && (
          <div className="absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white shadow-md">
            <div className="flex gap-[2px] items-end h-3">
              <span className="w-[3px] h-1.5 bg-white rounded-full animate-[bounce_1s_infinite]" />
              <span className="w-[3px] h-3 bg-white rounded-full animate-[bounce_1s_infinite_0.2s]" />
              <span className="w-[3px] h-2 bg-white rounded-full animate-[bounce_1s_infinite_0.4s]" />
            </div>
          </div>
        )}
      </div>

      {/* Track info */}
      <div className="flex flex-col gap-0.5 min-w-0 z-[1]">
        <div className="flex items-center gap-1.5 mb-0.5">
          <IconBrandSpotifyFilled className="h-4 w-4 text-green-500 shrink-0" />
          <p className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider">
            {data.isPlaying ? "Now Playing" : "Last Played"}
          </p>
        </div>
        <p
          className="text-sm font-bold text-foreground truncate group-hover:underline"
          title={data.title}
        >
          {data.title}
        </p>
        <p
          className="text-sm text-muted-foreground truncate"
          title={data.artist}
        >
          {data.artist}
        </p>
      </div>
    </a>
  )
}
