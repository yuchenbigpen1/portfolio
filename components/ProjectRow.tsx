"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import type { Project } from "@/lib/projects";
import type { MouseEvent } from "react";
import { useRef } from "react";

/* ─────────────────────────────────────────────────────────
 * PROJECT ROW STORYBOARD
 *
 *    row enters from below with stagger from parent
 *    hover: warm wash fades in, title nudges right, arrow extends
 *    cursor: a soft accent indicator follows the mouse along the row
 * ───────────────────────────────────────────────────────── */

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 110, damping: 24, mass: 0.65 },
  },
} as const;

export function ProjectRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const num = String(index + 1).padStart(2, "0");

  // Cursor-tracked accent indicator
  const rowRef = useRef<HTMLElement>(null);
  const cx = useMotionValue(0);
  const cxSpring = useSpring(cx, { stiffness: 200, damping: 30, mass: 0.5 });
  const opacity = useMotionValue(0);
  const opacitySpring = useSpring(opacity, { stiffness: 200, damping: 30 });
  const cursorX = useTransform(cxSpring, (v) => `${v}px`);

  function onMove(e: MouseEvent<HTMLElement>) {
    const el = rowRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    cx.set(e.clientX - r.left);
  }
  function onEnter() {
    opacity.set(1);
  }
  function onLeave() {
    opacity.set(0);
  }

  return (
    <motion.article
      ref={rowRef}
      variants={item}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group relative grid grid-cols-12 gap-x-6 py-10 md:py-12 border-t border-rule transition-colors duration-300"
    >
      {/* Warm wash that fades in on hover, behind content */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-[-1.5rem] inset-y-0 -z-10 rounded-[2px] bg-surface/0 group-hover:bg-surface/60 transition-colors duration-500"
      />

      {/* Cursor-tracked accent line at the top edge of the row */}
      <motion.span
        aria-hidden
        style={{ opacity: opacitySpring }}
        className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden"
      >
        <motion.span
          style={{ x: cursorX }}
          className="absolute top-0 -left-20 h-px w-40"
          aria-hidden
        >
          <span
            className="block h-full w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, var(--color-accent) 50%, transparent 100%)",
            }}
          />
        </motion.span>
      </motion.span>

      {/* Index — sits on the title's first baseline */}
      <div className="col-span-12 md:col-span-1 mb-4 md:mb-0 md:pt-[6px]">
        <span className="font-mono text-[22px] md:text-[24px] leading-none tracking-[-0.02em] text-ink-soft/55 group-hover:text-accent transition-colors duration-500 tabular-nums">
          {num}
        </span>
      </div>

      {/* Title + descriptor + meta */}
      <div className="col-span-12 md:col-span-5 mb-4 md:mb-0">
        <h3
          className="font-display font-medium text-ink leading-[1.05] tracking-[-0.025em] text-balance transition-transform duration-500 ease-out group-hover:translate-x-[3px]"
          style={{ fontSize: "clamp(1.5rem, 2.4vw, 2rem)" }}
        >
          {project.title}
        </h3>
        <p
          className="mt-2 text-[15.5px] md:text-[16px] leading-[1.45] text-ink-mute text-pretty"
          style={{ fontFamily: "var(--font-prose)", fontStyle: "italic" }}
        >
          {project.descriptor}
        </p>
        {(project.status || project.liveUrl) && (
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em]">
            {project.status && (
              <span className="inline-flex items-center gap-2 text-accent">
                <span aria-hidden className="block h-px w-3 bg-accent/60" />
                <span>{project.status}</span>
              </span>
            )}
            {project.status && project.liveUrl && (
              <span aria-hidden className="text-ink-soft/45">·</span>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                onClick={(e) => e.stopPropagation()}
                className="relative z-10 inline-flex items-center gap-1.5 text-ink-soft hover:text-accent transition-colors"
              >
                <span>{project.liveLabel}</span>
                <ArrowUpRight size={10} weight="regular" />
              </a>
            )}
          </div>
        )}
      </div>

      {/* Blurb */}
      <div className="col-span-12 md:col-span-4 md:pr-6">
        <p className="text-[14.5px] md:text-[15px] leading-[1.55] text-ink-mute max-w-[54ch] text-pretty">
          {project.blurb}
        </p>
      </div>

      {/* Link column */}
      <div className="col-span-12 md:col-span-2 mt-5 md:mt-0 flex md:flex-col md:items-end gap-3 md:gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em]">
        <Link
          href={`/work/${project.slug}`}
          className="relative inline-flex items-center gap-2 text-ink group-hover:text-accent transition-colors duration-300"
          aria-label={`Read more about ${project.title}`}
        >
          <span>Read more</span>
          <span className="relative inline-block h-[1px] w-5 overflow-hidden">
            <span className="absolute inset-0 bg-ink-soft/45 group-hover:bg-accent transition-colors duration-300" />
            <span className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out bg-accent" />
          </span>
          <ArrowUpRight
            size={11}
            weight="regular"
            className="-rotate-90 transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:rotate-0"
          />
        </Link>
      </div>

      {/* Make the entire row clickable to the sub-page */}
      <Link
        href={`/work/${project.slug}`}
        aria-hidden
        tabIndex={-1}
        className="absolute inset-0 z-0"
      >
        <span className="sr-only">{project.title}</span>
      </Link>
    </motion.article>
  );
}
