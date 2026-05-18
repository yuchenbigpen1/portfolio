export function TldrCallout({ text }: { text: string }) {
  return (
    <aside className="relative my-12 md:my-14 rounded-sm border border-rule bg-accent-bg/70 px-7 md:px-10 py-7 md:py-9">
      <span
        aria-hidden
        className="absolute inset-y-4 left-0 w-[2px] bg-accent"
      />
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent mb-4">
        TL;DR
      </p>
      <p
        className="text-[17px] md:text-[18px] leading-[1.65] text-ink text-pretty"
        style={{ fontFamily: "var(--font-prose)" }}
      >
        {text}
      </p>
    </aside>
  );
}
