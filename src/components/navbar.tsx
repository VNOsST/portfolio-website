import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from "@/components/mode-toggle"
import { NameToggle } from "@/components/name-toggle"
import { profile } from "@/data/profile"
import { buildImageUrl } from "@/lib/r2"
import {
  IconMenu,
  IconUser,
  IconBriefcase,
  IconSchool,
  IconMapPin,
} from "@tabler/icons-react"

type NavLink =
  | { label: string; to: string; hash?: never; icon: React.ReactNode }
  | { label: string; to?: never; hash: string; icon: React.ReactNode }

const navLinks: Array<NavLink> = [
  { label: "About", to: "/about", icon: <IconUser className="h-4 w-4" /> },
  { label: "Work", to: "/work", icon: <IconBriefcase className="h-4 w-4" /> },
  {
    label: "Education",
    hash: "education",
    icon: <IconSchool className="h-4 w-4" />,
  },
]

const linkClass =
  "px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"

const mobileLinkClass =
  "flex items-center gap-3 px-4 py-3 text-base font-medium text-foreground hover:text-primary transition-colors rounded-lg hover:bg-accent"

export function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToHash = (hash: string) => {
    const el = document.getElementById(hash)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleHashClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    hash: string
  ) => {
    e.preventDefault()
    setMobileOpen(false)
    if (location.pathname === "/") {
      scrollToHash(hash)
    } else {
      navigate({ to: "/", hash })
      setTimeout(() => scrollToHash(hash), 100)
    }
  }

  const renderLink = (link: NavLink, mobile = false) => {
    if ("to" in link) {
      return (
        <Link
          key={link.to}
          to={link.to}
          onClick={() => mobile && setMobileOpen(false)}
          className={mobile ? mobileLinkClass : linkClass}
        >
          {mobile && link.icon}
          {link.label}
        </Link>
      )
    }
    return (
      <a
        key={link.hash}
        href={`/#${link.hash}`}
        onClick={(e) => handleHashClick(e, link.hash)}
        className={mobile ? mobileLinkClass : linkClass}
      >
        {mobile && link.icon}
        {link.label}
      </a>
    )
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <nav className="flex h-14 items-center justify-between">
          <a
            href="/#about"
            onClick={(e) => handleHashClick(e, "about")}
            className="hover:opacity-80 transition-opacity"
          >
            <img src="/favicon-32x32.png" alt="Home" className="h-6 w-6" />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => renderLink(link))}
          </div>

          <div className="flex items-center gap-1">
            <ModeToggle />

            {/* Mobile menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger className="md:hidden">
                <Button variant="ghost" size="icon-sm" aria-label="Open menu">
                  <IconMenu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="w-full">
                <div className="flex flex-col gap-6 pt-12 pb-2">
                  {/* Profile header */}
                  {/* <div className="flex items-center gap-3 px-4">
                    <Avatar className="h-12 w-12 border border-border">
                      <AvatarImage
                        src={buildImageUrl(profile.avatar!)}
                        alt={profile.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="text-sm font-semibold bg-primary text-primary-foreground">
                        {profile.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <NameToggle />
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                        <IconMapPin className="h-3 w-3" />
                        {profile.location}
                      </div>
                    </div>
                  </div> */}

                  {/* Nav links */}
                  <div className="flex flex-col gap-1">
                    {navLinks.map((link) => renderLink(link, true))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  )
}
