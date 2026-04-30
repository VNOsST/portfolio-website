import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/mode-toggle"
import { IconMenu } from "@tabler/icons-react"

const sectionLinks = [
  { label: "Skills", hash: "skills" },
  { label: "Education", hash: "education" },
]

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

  const handleClick = (
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
            onClick={(e) => handleClick(e, "about")}
            className="hover:opacity-80 transition-opacity"
          >
            <img src="/favicon-32x32.png" alt="Home" className="h-6 w-6" />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              to="/work"
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
            >
              Work
            </Link>
            {sectionLinks.map((link) => (
              <a
                key={link.hash}
                href={`/#${link.hash}`}
                onClick={(e) => handleClick(e, link.hash)}
                className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
              >
                {link.label}
              </a>
            ))}
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
                <div className="flex flex-col gap-2 mt-4">
                  <Link
                    to="/work"
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                  >
                    Work
                  </Link>
                  {sectionLinks.map((link) => (
                    <a
                      key={link.hash}
                      href={`/#${link.hash}`}
                      onClick={(e) => handleClick(e, link.hash)}
                      className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  )
}
