export function SkipLink({ label }: { label: string }) {
  return (
    <a
      href="#main"
      className="sr-only z-[100] focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-accent-fg"
    >
      {label}
    </a>
  )
}
