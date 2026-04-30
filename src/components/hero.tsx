import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { profile } from "@/data/profile"
import { IconMapPin, IconMail, IconBrandLinkedin, IconBrandGithub } from "@tabler/icons-react"

export function Hero() {
  return (
    <section id="about" className="scroll-mt-16 pt-28 pb-16 sm:pt-36 sm:pb-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border border-border">
              <AvatarFallback className="text-lg font-semibold bg-primary text-primary-foreground">
                {profile.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {profile.name}
              </h1>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground mt-1">
                <span className="inline-flex items-center gap-1">
                  <IconMapPin className="h-3.5 w-3.5" />
                  {profile.location}
                </span>
              </div>
            </div>
          </div>

          <p className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-3xl">
            {profile.summary}
          </p>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" asChild>
              <a href={`mailto:${profile.email}`}>
                <IconMail className="h-4 w-4 mr-1.5" />
                Email
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                <IconBrandLinkedin className="h-4 w-4 mr-1.5" />
                LinkedIn
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                <IconBrandGithub className="h-4 w-4 mr-1.5" />
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
