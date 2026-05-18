export function Footer() {
  return (
    <footer className="py-10 border-t border-rule">
      <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft">
        <p>Yuchen Zhang · Toronto · 2026</p>
        <a
          href="#top"
          className="relative inline-block hover:text-accent transition-colors after:absolute after:left-1/2 after:top-1/2 after:h-10 after:w-12 after:-translate-x-1/2 after:-translate-y-1/2 after:content-['']"
        >
          ↑ Top
        </a>
      </div>
    </footer>
  );
}
