export function createSimpleIcon(name: string, path: string) {
  return function SimpleIcon({ className }: { className?: string }) {
    return (
      <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="currentColor"
      >
        <title>{name}</title>
        <path d={path} />
      </svg>
    )
  }
}
