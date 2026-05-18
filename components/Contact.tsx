"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Copy, Check } from "@phosphor-icons/react";
import { useState } from "react";

/* ─────────────────────────────────────────────────────────
 * CONTACT STORYBOARD  (visual/motion only — copy unchanged)
 *
 *    on-enter: section label fades, then email line, then nav
 *    hover email: arrow nudges, accent appears under text
 *    click copy: icon swaps Copy → Check, label crossfades
 * ───────────────────────────────────────────────────────── */

const EMAIL = "yuchenzhang23@gmail.com";

const inline = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/yuchen-z/" },
  { label: "GitHub", href: "https://github.com/yuchenbigpen1/" },
  { label: "Resume", href: "/yuchen-resume.pdf" },
];

const enter = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 110,
      damping: 22,
      mass: 0.65,
      delay: 0.08 + i * 0.09,
    },
  }),
} as const;

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable — no-op
    }
  }

  return (
    <section
      id="contact"
      className="relative py-20 md:py-28 border-t border-rule scroll-mt-20"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="space-y-8 md:space-y-10"
      >
        <motion.h2
          custom={0}
          variants={enter}
          className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft mb-10 md:mb-14"
        >
          Contact
        </motion.h2>

        <motion.div
          custom={1}
          variants={enter}
          className="flex flex-wrap items-baseline gap-x-5 gap-y-4"
        >
          <a
            href={`mailto:${EMAIL}`}
            className="group inline-flex flex-wrap items-baseline gap-x-3 font-display text-[clamp(2rem,6.5vw,5.25rem)] leading-[1.05] tracking-[-0.035em] text-ink hover:text-accent transition-colors"
          >
            <span>{EMAIL}</span>
            <span className="text-accent/70 group-hover:text-accent transition-colors translate-y-[0.05em] inline-flex">
              <ArrowUpRight
                size={28}
                weight="regular"
                className="transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:-translate-y-0.5"
              />
            </span>
          </a>

          <button
            type="button"
            onClick={copyEmail}
            className="relative ml-auto md:ml-0 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft hover:text-accent transition-[color,scale] duration-150 ease-out active:scale-[0.96] after:absolute after:left-1/2 after:top-1/2 after:size-10 after:-translate-x-1/2 after:-translate-y-1/2 after:content-['']"
            aria-label="Copy email address"
          >
            <span className="relative inline-block w-3.5 h-3.5">
              <AnimatePresence mode="popLayout" initial={false}>
                {copied ? (
                  <motion.span
                    key="check"
                    initial={{ scale: 0.25, opacity: 0, filter: "blur(4px)" }}
                    animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                    exit={{ scale: 0.25, opacity: 0, filter: "blur(4px)" }}
                    transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                    className="absolute inset-0 text-accent"
                  >
                    <Check size={14} weight="regular" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ scale: 0.25, opacity: 0, filter: "blur(4px)" }}
                    animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                    exit={{ scale: 0.25, opacity: 0, filter: "blur(4px)" }}
                    transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                    className="absolute inset-0"
                  >
                    <Copy size={14} weight="regular" />
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
            <span className="relative inline-block min-w-[3.5rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? "copied" : "copy"}
                  initial={{ y: 6, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -6, opacity: 0 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  {copied ? "Copied" : "Copy"}
                </motion.span>
              </AnimatePresence>
            </span>
          </button>
        </motion.div>

        <motion.nav
          custom={2}
          variants={enter}
          className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[12px] uppercase tracking-[0.14em] text-ink-mute"
        >
          {inline.map((l, i) => (
            <span key={l.label} className="flex items-center gap-x-5">
              <a
                href={l.href}
                target="_blank"
                rel="noreferrer noopener"
                className="hover:text-accent transition-colors"
              >
                {l.label}
              </a>
              {i < inline.length - 1 && (
                <span className="text-ink-soft/55">·</span>
              )}
            </span>
          ))}
        </motion.nav>
      </motion.div>
    </section>
  );
}
