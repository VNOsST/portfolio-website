import * as PersonalIcons from "@/components/icons"
import type { Artist, Sport, Games, TabValue } from "@/types"

export const artists: Array<Artist> = [
  {
    id: "triples",
    name: "tripleS",
    icon: PersonalIcons.tripleSIcon,
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
    icon: PersonalIcons.TwentyOnePilotsIcon,
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
    icon: PersonalIcons.TwiceIcon,
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
    icon: PersonalIcons.chelseaIcon,
  },
  {
    id: "f1",
    name: "Formula 1",
    icon: (props) => PersonalIcons.F1Icon({ ...props, variant: "colored" }),
  },
  {
    id: "nba",
    name: "NBA",
    icon: PersonalIcons.NBAIcon,
  },
]

export const gameLinks: Array<Games> = [
  { id: "r6", name: "Rainbow Six Siege", icon: PersonalIcons.R6Icon },
  {
    id: "f1",
    name: "F1 25",
    icon: (props) => PersonalIcons.F1Icon({ ...props, variant: "monochrome" }),
  },
]

export const TAB_AVATARS: Record<TabValue, string> = {
  professional: "5x5 - 2025.jpg",
  personal: "personal.webp",
}
