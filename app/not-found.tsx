import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[100dvh] flex items-center">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-14 w-full">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">
          404
        </p>
        <h1 className="mt-6 font-display text-5xl md:text-7xl tracking-[-0.04em] leading-[0.95] text-ink max-w-[14ch]">
          That page wandered off.
        </h1>
        <p
          className="mt-6 text-lg text-ink-mute max-w-[48ch] italic"
          style={{ fontFamily: "var(--font-prose)" }}
        >
          Probably a stale link or a typo. Easiest fix is the front door.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.16em] text-ink hover:text-accent transition-colors"
        >
          <span aria-hidden>←</span>
          <span>Back to portfolio</span>
        </Link>
      </div>
    </main>
  );
}
