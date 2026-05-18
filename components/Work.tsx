"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";
import { ProjectRow } from "./ProjectRow";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
} as const;

export function Work({ projects }: { projects: Project[] }) {
  return (
    <section id="work" className="relative py-16 md:py-24 scroll-mt-20">
      <div className="mb-10 md:mb-14 flex items-end justify-between">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">
          Work
        </h2>
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft">
          2025 — 2026
        </span>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        className="border-b border-rule"
      >
        {projects.map((p, i) => (
          <ProjectRow key={p.slug} project={p} index={i} />
        ))}
      </motion.div>
    </section>
  );
}
