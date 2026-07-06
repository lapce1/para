"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

// App Router re-mounts this template on every navigation, so it gives each route
// a smooth enter transition. Reduced-motion users get an instant render.
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
