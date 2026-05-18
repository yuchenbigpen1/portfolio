"use client";

import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";

export function CaseStudyNav({ title }: { title: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-bg/85 backdrop-blur-md">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-14 h-12 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em]">
        <Link
          href="/#work"
          className="inline-flex items-center gap-1.5 text-ink hover:text-accent transition-colors"
        >
          <span aria-hidden>←</span>
          <span>Yuchen Zhang</span>
        </Link>
        <span className="text-ink-soft hidden sm:inline">{title}</span>
        <Link
          href="/#work"
          className="text-ink-soft hover:text-accent transition-colors"
        >
          Work
        </Link>
      </div>
      <motion.div
        style={{ scaleX }}
        className="absolute bottom-0 left-0 right-0 h-px origin-left bg-accent"
      />
    </header>
  );
}
