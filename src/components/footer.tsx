import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { profile } from "@/data/profile"
import {
  IconMail,
  IconBrandLinkedin,
  IconBrandGithub,
} from "@tabler/icons-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Separator className="mb-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} {profile.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon-sm" asChild>
              <a href={`mailto:${profile.email}`} aria-label="Email">
                <IconMail className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="ghost" size="icon-sm" asChild>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <IconBrandLinkedin className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="ghost" size="icon-sm" asChild>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <IconBrandGithub className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
