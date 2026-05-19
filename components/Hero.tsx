"use client";

import Image from "next/image";
import { MagneticLink } from "./MagneticLink";
import { motion, useReducedMotion } from "framer-motion";

/* ─────────────────────────────────────────────────────────
 * HERO STORYBOARD  (visual/motion only — copy unchanged)
 *
 *    0ms   page loads, cream paper held
 *  120ms   location pill fades in (with live pulse)
 *  220ms   name reveals (mask-up)
 *  360ms   link rail cascades
 *  520ms   metadata bullets cascade
 *  640ms   portrait drops with subtle scale
 * ───────────────────────────────────────────────────────── */

const TIMING = {
  topBar:   0.12,
  name:     0.22,
  links:    0.36,
  meta:     0.52,
  portrait: 0.64,
} as const;

const SPRING = {
  type: "spring",
  stiffness: 120,
  damping: 22,
  mass: 0.7,
} as const;

const links: { label: string; href: string; external?: boolean }[] = [
  { label: "Resume", href: "/yuchen-resume.pdf", external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/yuchen-z/", external: true },
  { label: "GitHub", href: "https://github.com/yuchenbigpen1/", external: true },
  { label: "Email", href: "mailto:yuchenzhang23@gmail.com" },
];

const metaLines = [
  "Babson '18 · MMAI & MMIE @ Queen's University",
  "I love building things and performing comedy",
  "Currently building Donna",
];

export function Hero() {
  const reduced = useReducedMotion();
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 14 },
    animate: { opacity: 1, y: 0 },
    transition: { ...SPRING, delay },
  });

  return (
    <section className="relative pt-12 md:pt-16 pb-12 md:pb-16">
      {/* Location pill, top-right (now with live pulsing dot) */}
      <motion.div
        {...fade(TIMING.topBar)}
        className="absolute top-6 right-0 md:right-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft"
      >
        <LiveDot />
        Toronto · 2026
      </motion.div>

      <div className="grid grid-cols-12 gap-x-6 gap-y-8 md:gap-y-10 items-end">
        {/* Left column — text content */}
        <div className="col-span-12 md:col-span-7 lg:col-span-8 flex flex-col gap-7 md:gap-9">
          {/* Name — masked reveal */}
          <h1 className="font-display font-medium text-[clamp(2.75rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.03em] text-ink text-balance">
            <MaskReveal delay={TIMING.name}>Yuchen Zhang</MaskReveal>
          </h1>

          {/* Link rail */}
          <motion.nav
            {...fade(TIMING.links)}
            className="flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[13px] uppercase tracking-[0.1em]"
            aria-label="Primary links"
          >
            {links.map((l, i) => (
              <span key={l.label} className="flex items-center gap-x-6">
                <MagneticLink href={l.href} external={l.external}>
                  {l.label}
                </MagneticLink>
                {i < links.length - 1 && (
                  <span aria-hidden className="text-ink-soft/55 select-none">
                    ·
                  </span>
                )}
              </span>
            ))}
          </motion.nav>

          {/* Supporting metadata — mono labels with refined hairline marks */}
          <motion.ul
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.07, delayChildren: TIMING.meta },
              },
            }}
            className="flex flex-col gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft"
          >
            {metaLines.map((line) => (
              <motion.li
                key={line}
                variants={{
                  hidden: { opacity: 0, y: reduced ? 0 : 8 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { ...SPRING, stiffness: 140 },
                  },
                }}
                className="flex items-center gap-3"
              >
                <span
                  aria-hidden
                  className="block h-px w-3 bg-ink-soft/45 shrink-0"
                />
                <span>{line}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Right column — portrait */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 18, scale: reduced ? 1 : 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...SPRING, delay: TIMING.portrait }}
          className="col-span-12 md:col-span-4 lg:col-span-3 md:justify-self-end w-full max-w-[200px] md:max-w-[220px] lg:max-w-[240px]"
        >
          <div className="relative aspect-[3/4] overflow-hidden rounded-[2px] bg-rule-soft outline outline-1 -outline-offset-1 outline-black/10">
            <Image
              src="/yuchen.jpg"
              alt="Yuchen Zhang"
              fill
              sizes="(min-width: 1024px) 240px, (min-width: 768px) 220px, 200px"
              className="object-cover saturate-[0.94] contrast-[1.015]"
              priority
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-[0.16]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(247,244,236,0) 50%, rgba(247,244,236,0.5) 100%)",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Helpers ────────────────────────────────────────── */

function MaskReveal({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  const reduced = useReducedMotion();
  return (
    <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
      <motion.span
        initial={{ y: reduced ? 0 : "108%" }}
        animate={{ y: 0 }}
        transition={{ ...SPRING, delay, stiffness: 140, damping: 24 }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

function LiveDot() {
  const reduced = useReducedMotion();
  return (
    <span className="relative inline-flex size-1.5 items-center justify-center">
      <span className="absolute inset-0 rounded-full bg-accent" />
      {!reduced && (
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full bg-accent"
          initial={{ scale: 1, opacity: 0.55 }}
          animate={{ scale: [1, 2.8, 2.8], opacity: [0.55, 0, 0] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeOut",
            times: [0, 0.6, 1],
          }}
        />
      )}
    </span>
  );
}
