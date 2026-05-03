import {
  tripleSIcon,
  TwentyOnePilotsIcon,
  TwiceIcon,
  chelseaIcon,
  F1Icon,
  NBAIcon,
  R6Icon,
} from "@/components/icons"
import type { Artist, Sport, Games, TabValue } from "@/types"

export const artists: Array<Artist> = [
  {
    id: "triples",
    name: "tripleS",
    icon: tripleSIcon,
    platforms: [
      { platform: "youtube", url: "https://www.youtube.com/@triplescosmos" },
      {
        platform: "spotify",
        url: "https://open.spotify.com/artist/5Z71xE9prhpHrqL5thVMyK",
      },
    ],
  },
  {
    id: "twenty-one-pilots",
    name: "Twenty One Pilots",
    icon: TwentyOnePilotsIcon,
    platforms: [
      { platform: "youtube", url: "https://www.youtube.com/@twentyonepilots" },
      {
        platform: "spotify",
        url: "https://open.spotify.com/artist/3YQKmKGau1PzlVlkL1iodx",
      },
    ],
  },
  {
    id: "twice",
    name: "TWICE",
    icon: TwiceIcon,
    platforms: [
      { platform: "youtube", url: "https://www.youtube.com/@TWICE" },
      {
        platform: "spotify",
        url: "https://open.spotify.com/artist/7n2Ycct7Beij7Dj7meI4X0",
      },
    ],
  },
]

export const sports: Array<Sport> = [
  {
    id: "chelsea",
    name: "Chelsea FC",
    icon: chelseaIcon,
  },
  {
    id: "f1",
    name: "Formula 1",
    icon: (props) => F1Icon({ ...props, variant: "colored" }),
  },
  {
    id: "nba",
    name: "NBA",
    icon: NBAIcon,
  },
]

export const gameLinks: Array<Games> = [
  { id: "r6", name: "Rainbow Six Siege", icon: R6Icon },
  {
    id: "f1",
    name: "F1 25",
    icon: (props) => F1Icon({ ...props, variant: "monochrome" }),
  },
]

export const TAB_AVATARS: Record<TabValue, string> = {
  professional: "5x5 - 2025.jpg",
  personal: "personal.webp",
}
