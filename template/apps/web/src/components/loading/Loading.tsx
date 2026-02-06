export function Loading({ isPage }: { isPage?: boolean }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 py-10  ${
        isPage ?? "min-h-screen"
      }`}
    >
      <div
        className="
          h-8 w-8 rounded-full
          border-2 border-border
          border-t-primary
          animate-spin
        "
        aria-hidden
      />

      <span className="text-sm text-muted">Loading...</span>
    </div>
  );
}
