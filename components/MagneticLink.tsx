"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type Props = {
  href: string;
  children: ReactNode;
  external?: boolean;
  strength?: number;
  className?: string;
};

export function MagneticLink({
  href,
  children,
  external = false,
  strength = 0.35,
  className = "",
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 120, damping: 18, mass: 0.4 });

  // Drives a subtle accent underline that grows with hover via opacity transform
  const underlineOpacity = useTransform(
    [springX, springY],
    ([sx, sy]) => Math.min(1, Math.hypot(sx as number, sy as number) / 14 + 0.0)
  );

  function onMove(e: MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: springX, y: springY }}
      className={`relative inline-flex items-center gap-1.5 text-ink hover:text-accent transition-colors ${className}`}
    >
      <span className="relative">
        {children}
        <motion.span
          aria-hidden
          style={{ opacity: underlineOpacity }}
          className="absolute -bottom-1 left-0 right-0 h-px bg-accent"
        />
      </span>
    </motion.a>
  );
}
