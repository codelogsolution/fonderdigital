export default function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="FonderDigital mark"
      focusable="false"
    >
      <path
        d="M9 14.5 37 5v11L20 22v25L9 51V14.5Z"
        fill="currentColor"
      />
      <path d="M20 28.5 37 23v12l-17 6V28.5Z" fill="var(--primary)" />
      <path
        d="M39 18.5c12.4 0 20 7.5 20 18S51.4 55 39 55h-3V44h3c6.3 0 9.5-2.7 9.5-7.5S45.3 29 39 29h-3V18.5h3Z"
        fill="currentColor"
      />
      <path d="M31 19h7v35h-7z" fill="var(--primary)" />
    </svg>
  );
}
