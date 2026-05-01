import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { NameToggle } from "@/components/name-toggle"
import { profile } from "@/data/profile"
import { buildImageUrl } from "@/lib/r2"
import {
  IconMapPin,
  IconMail,
  IconBrandLinkedin,
  IconBrandGithub,
  IconBrandFacebook,
} from "@tabler/icons-react"

export function Hero() {
  return (
    <section id="about" className="scroll-mt-16 pt-28 pb-16 sm:pt-36 sm:pb-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border border-border">
              <AvatarImage
                src={buildImageUrl(profile.avatar!)}
                alt={profile.name}
                className="object-cover"
              />
              <AvatarFallback className="text-lg font-semibold bg-primary text-primary-foreground">
                {profile.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <NameToggle />
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

          <TooltipProvider>
            <div className="flex flex-wrap gap-2">
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button variant="outline" size="icon-lg" asChild>
                      <a href={`mailto:${profile.email}`} aria-label="Email">
                        <IconMail className="h-6 w-6" />
                      </a>
                    </Button>
                  }
                />
                <TooltipContent>Email</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button variant="outline" size="icon-lg" asChild>
                      <a
                        href={profile.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                      >
                        <IconBrandLinkedin className="h-6 w-6" />
                      </a>
                    </Button>
                  }
                />
                <TooltipContent>LinkedIn</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button variant="outline" size="icon-lg" asChild>
                      <a
                        href={profile.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                      >
                        <IconBrandGithub className="h-6 w-6" />
                      </a>
                    </Button>
                  }
                />
                <TooltipContent>GitHub</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button variant="outline" size="icon-lg" asChild>
                      <a
                        href={profile.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                      >
                        <IconBrandFacebook className="h-6 w-6" />
                      </a>
                    </Button>
                  }
                />
                <TooltipContent>Facebook</TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>
      </div>
    </section>
  )
}
