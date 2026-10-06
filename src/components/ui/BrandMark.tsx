export default function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      {/* Square plate and the "F" glyph are driven by the active theme so the
          mark does not stay copper while the rest of the page has switched.
          currentColor lets the plate inherit `text-primary` from the call site. */}
      <rect width="64" height="64" rx="16" fill="currentColor" />
      <path d="M16 17h34L40 27H27v8h17L34 45h-7v7H16Z" fill="#fff" />
      <path d="m43 43 8-8v17H34Z" fill="#fff" fillOpacity="0.55" />
    </svg>
  );
}
