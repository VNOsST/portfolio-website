import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"
import { IconSun, IconMoon, IconDeviceDesktop, IconCheck } from "@tabler/icons-react"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const options = [
    { value: "light" as const, label: "Light", icon: IconSun },
    { value: "dark" as const, label: "Dark", icon: IconMoon },
    { value: "system" as const, label: "System", icon: IconDeviceDesktop },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon-sm" aria-label="Toggle theme">
          {theme === "light" && <IconSun className="h-[1.1rem] w-[1.1rem]" />}
          {theme === "dark" && <IconMoon className="h-[1.1rem] w-[1.1rem]" />}
          {theme === "system" && <IconDeviceDesktop className="h-[1.1rem] w-[1.1rem]" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {options.map((option) => {
          const Icon = option.icon
          const isActive = theme === option.value
          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => setTheme(option.value)}
              className="cursor-pointer"
            >
              <Icon className="h-4 w-4" />
              <span className="flex-1">{option.label}</span>
              {isActive && <IconCheck className="h-4 w-4" />}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
