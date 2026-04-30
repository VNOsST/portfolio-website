import { useMemo } from "react"
import { Combobox as ComboboxPrimitive } from "@base-ui/react"
import { Button } from "@/components/ui/button"
import {
  ComboboxContent,
  ComboboxInput,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from "@/components/ui/combobox"
import { cn } from "@/lib/utils"
import { getTechnology } from "@/data/technologies"
import { IconChevronDown, IconX } from "@tabler/icons-react"
import type { TechnologyId } from "@/types"

interface TechnologyFilterProps {
  value: Array<TechnologyId>
  onChange: (value: Array<TechnologyId>) => void
  options: Array<TechnologyId>
  placeholder?: string
  className?: string
}

export function TechnologyFilter({
  value,
  onChange,
  options,
  placeholder = "Filter by technology...",
  className,
}: TechnologyFilterProps) {
  const availableOptions = useMemo(
    () => options.filter((id) => !value.includes(id)),
    [options, value]
  )

  const sortedOptions = useMemo(() => {
    return [...availableOptions].sort((a, b) =>
      getTechnology(a).name.localeCompare(getTechnology(b).name)
    )
  }, [availableOptions])

  function addFilter(id: TechnologyId) {
    if (!value.includes(id)) onChange([...value, id])
  }

  function removeFilter(id: TechnologyId) {
    onChange(value.filter((v) => v !== id))
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-2 flex-wrap">
        <ComboboxPrimitive.Root
          value={null}
          onValueChange={(v: string | null) => {
            if (v) addFilter(v as TechnologyId)
          }}
          items={sortedOptions}
        >
          <ComboboxPrimitive.Trigger
            render={
              <Button
                variant="outline"
                role="combobox"
                className="w-64 justify-between font-normal text-muted-foreground"
              />
            }
          >
            {placeholder}
            <IconChevronDown className="h-4 w-4 shrink-0 opacity-50" />
          </ComboboxPrimitive.Trigger>
          <ComboboxContent>
            <ComboboxInput
              placeholder="Search technologies..."
              className="w-full"
              showTrigger={false}
            />
            <ComboboxList>
              {(id: TechnologyId) => {
                const tech = getTechnology(id)
                const Icon = tech.icon
                return (
                  <ComboboxItem key={id} value={id}>
                    <Icon className="h-4 w-4" />
                    {tech.name}
                  </ComboboxItem>
                )
              }}
            </ComboboxList>
            <ComboboxEmpty>
              {sortedOptions.length === 0
                ? "All technologies selected."
                : "No technologies found."}
            </ComboboxEmpty>
          </ComboboxContent>
        </ComboboxPrimitive.Root>
        {value.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onChange([])}
          >
            Clear all
          </Button>
        )}
      </div>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((id) => {
            const tech = getTechnology(id)
            const Icon = tech.icon
            return (
              <span
                key={id}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium"
              >
                <Icon className="h-3.5 w-3.5" />
                {tech.name}
                <button
                  type="button"
                  onClick={() => removeFilter(id)}
                  className="ml-0.5 inline-flex items-center justify-center rounded-full p-0.5 hover:bg-muted"
                  aria-label={`Remove ${tech.name} filter`}
                >
                  <IconX className="h-3 w-3" />
                </button>
              </span>
            )
          })}
        </div>
      )}
    </div>
  )
}
