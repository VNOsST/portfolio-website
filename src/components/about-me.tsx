import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { artists, sports, gameLinks, TAB_AVATARS } from "@/data/about"
import { profile } from "@/data/profile"
import { getMusicPlatform } from "@/data/music-platforms"
import { buildImageUrl } from "@/lib/r2"
import type { Artist, Sport, Games, TabValue } from "@/types"
import {
  IconMusic,
  IconBallFootball,
  IconDeviceGamepad2,
  IconChevronDown,
  IconBriefcase,
  IconUser,
  IconBrandLinkedin,
  IconMail,
  IconBrandFacebook,
  IconBrandDiscord,
  IconLinkPlus,
  IconBrandSpotify,
  IconBrandSteam,
} from "@tabler/icons-react"
import { SkillsSection } from "./skills"
import { EducationSection } from "./education"
import { SpotifyActivity } from "./spotify-activity"

function ArtistChip({ artist }: { artist: Artist }) {
  const Icon = artist.icon

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-muted cursor-pointer">
          <Icon className="h-4 w-4 shrink-0" />
          <span className="font-medium whitespace-nowrap">{artist.name}</span>
          <IconChevronDown className="h-3 w-3 shrink-0 text-muted-foreground" />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {artist.platforms.map(({ platform, url }) => {
          const mp = getMusicPlatform(platform)
          const PlatformIcon = mp.icon
          return (
            <DropdownMenuItem key={platform}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 w-full cursor-pointer"
              >
                <PlatformIcon className="h-4 w-4" />
                {mp.name}
              </a>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function SportChip({ sport }: { sport: Sport }) {
  const SportIcon = sport.icon

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-sm text-foreground">
      {SportIcon ? (
        <SportIcon className="h-4 w-4 shrink-0" />
      ) : (
        <IconBallFootball className="h-4 w-4 shrink-0 text-muted-foreground" />
      )}
      <span className="font-medium whitespace-nowrap">{sport.name}</span>
    </span>
  )
}

function GameChip({ game }: { game: Games }) {
  const GameIcon = game.icon

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-sm text-foreground">
      {GameIcon ? (
        <GameIcon className="h-4 w-4 shrink-0" />
      ) : (
        <IconDeviceGamepad2 className="h-4 w-4 shrink-0 text-muted-foreground" />
      )}
      <span className="font-medium whitespace-nowrap">{game.name}</span>
    </span>
  )
}

function PersonalSection() {
  return (
    <div className="flex flex-col gap-6">
      {/* Music */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <IconMusic className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Music</CardTitle>
            </div>
            <a
              href={profile.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted shrink-0"
            >
              <IconBrandSpotify className="h-4 w-4 shrink-0" />
              Follow me on Spotify
            </a>
          </div>
          <CardDescription>
            A few artists I have been listening to lately.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="flex flex-wrap gap-2">
            {artists.map((artist) => (
              <ArtistChip key={artist.id} artist={artist} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sports */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <IconBallFootball className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Sports</CardTitle>
          </div>
          <CardDescription>Teams and leagues I follow.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {sports.map((sport) => (
              <SportChip key={sport.id} sport={sport} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Games */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <IconDeviceGamepad2 className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Games</CardTitle>
            </div>
            <a
              href={profile.steam}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted shrink-0"
            >
              <IconBrandSteam className="h-4 w-4 shrink-0" />
              Add me on Steam
            </a>
          </div>
          <CardDescription>What I play in my downtime.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {gameLinks.map((game) => (
              <GameChip key={game.id} game={game} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ProfessionalSection() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-4">
          Professional Summary
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {profile.summary}
        </p>
      </div>

      <SkillsSection compact />
      <EducationSection compact />
    </div>
  )
}

export function AboutMe() {
  const [activeTab, setActiveTab] = useState<TabValue>("professional")

  return (
    <section className="scroll-mt-16 pt-28 pb-16 sm:pt-36 sm:pb-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as TabValue)}
          className="w-full"
        >
          <div className="flex flex-col gap-8 mb-6">
            <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
                <Avatar className="h-28 w-28 sm:h-20 sm:w-20 border border-border shrink-0">
                  <AvatarImage
                    src={buildImageUrl(TAB_AVATARS[activeTab])}
                    alt={profile.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-xl sm:text-lg font-semibold bg-primary text-primary-foreground">
                    {profile.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1.5 text-center sm:text-left">
                  <h1 className="text-2xl font-bold tracking-tight">
                    About Me
                  </h1>
                  <p className="text-base text-muted-foreground">
                    {activeTab === "professional"
                      ? "A glimpse into what I do"
                      : "A glimpse of what I enjoy"}
                  </p>
                </div>
              </div>
              {activeTab === "personal" && <SpotifyActivity />}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <TabsList className="w-full sm:w-fit">
                <TabsTrigger value="professional">
                  <IconBriefcase className="h-4 w-4" />
                  Professional
                </TabsTrigger>
                <TabsTrigger value="personal">
                  <IconUser className="h-4 w-4" />
                  Personal
                </TabsTrigger>
              </TabsList>

              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="outline" size="sm">
                      <IconLinkPlus className="h-4 w-4" />
                      Connect with me
                      <IconChevronDown className="h-3 w-3" />
                    </Button>
                  }
                />
                <DropdownMenuContent align="end">
                  {activeTab === "professional" ? (
                    <>
                      <DropdownMenuItem>
                        <a
                          href={profile.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2.5 w-full cursor-pointer"
                        >
                          <IconBrandLinkedin className="h-4 w-4" />
                          LinkedIn
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <a
                          href={`mailto:${profile.email}`}
                          className="flex items-center gap-2.5 w-full cursor-pointer"
                        >
                          <IconMail className="h-4 w-4" />
                          Email
                        </a>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem>
                        <a
                          href={profile.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2.5 w-full cursor-pointer"
                        >
                          <IconBrandFacebook className="h-4 w-4" />
                          Facebook
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <a
                          href={profile.discord}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2.5 w-full cursor-pointer"
                        >
                          <IconBrandDiscord className="h-4 w-4" />
                          Discord
                        </a>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <TabsContent value="professional">
            <ProfessionalSection />
          </TabsContent>
          <TabsContent value="personal">
            <PersonalSection />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
