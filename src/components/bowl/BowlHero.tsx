"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import BowlArt from "../BowlArt";
import Greenery from "../Greenery";

// Loaded only on the client, only when we decide to render 3D — keeps three.js
// out of the critical path so first paint stays instant.
const BowlScene = dynamic(() => import("./BowlScene"), { ssr: false });

/** The illustrated composition: instant first paint + the reduced-motion / no-WebGL fallback. */
function SvgBowl() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-sm">
      <Greenery className="pointer-events-none absolute inset-0 z-0 h-full w-full scale-[1.18]" />
      <BowlArt className="absolute inset-0 z-10 m-auto w-full" />
    </div>
  );
}

class SceneBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export default function BowlHero() {
  const reduce = useReducedMotion();
  const [use3d, setUse3d] = useState(false);

  useEffect(() => {
    if (reduce) return;
    try {
      const c = document.createElement("canvas");
      const gl = c.getContext("webgl2") || c.getContext("webgl");
      if (gl) setUse3d(true);
    } catch {
      /* keep the SVG fallback */
    }
  }, [reduce]);

  if (!use3d) return <SvgBowl />;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <SceneBoundary fallback={<SvgBowl />}>
        <BowlScene />
      </SceneBoundary>
    </div>
  );
}
