"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * A 1px accent bar at the very top of the viewport that tracks scroll
 * progress through the document. The bar uses spring physics so it
 * feels alive rather than mechanical — like a fountain pen scoring the
 * page rather than a loading bar.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="pointer-events-none fixed inset-x-0 top-0 z-40 h-[1.5px] bg-accent/85 mix-blend-multiply"
    />
  );
}
