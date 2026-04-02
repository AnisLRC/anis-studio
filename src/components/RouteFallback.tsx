/**
 * Shown while lazy route chunks load (first visit to a route).
 */
export function RouteFallback() {
  return (
    <div
      className="flex min-h-[50vh] w-full items-center justify-center"
      aria-busy="true"
      aria-live="polite"
    >
      <div
        className="h-9 w-9 animate-spin rounded-full border-2 border-[var(--clr-primary)] border-t-transparent"
        role="status"
      />
      <span className="sr-only">Učitavanje…</span>
    </div>
  )
}
