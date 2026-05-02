import type { ComponentType } from "react"
import { IconBrandYoutube, IconBrandSpotify } from "@tabler/icons-react"

export interface MusicPlatform {
  id: string
  name: string
  icon: ComponentType<{ className?: string }>
}

export const musicPlatforms = {
  youtube: {
    id: "youtube",
    name: "YouTube",
    icon: IconBrandYoutube,
  },
  spotify: {
    id: "spotify",
    name: "Spotify",
    icon: IconBrandSpotify,
  },
} satisfies Record<string, MusicPlatform>

export type MusicPlatformId = keyof typeof musicPlatforms

export function getMusicPlatform(id: MusicPlatformId): MusicPlatform {
  return musicPlatforms[id]
}

export function getAllMusicPlatformIds(): Array<MusicPlatformId> {
  return Object.keys(musicPlatforms) as Array<MusicPlatformId>
}
