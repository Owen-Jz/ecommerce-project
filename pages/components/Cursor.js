// components/CursorCFC.jsx
"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorCFC() {
  const [mounted, setMounted] = useState(false);
  const [supportsHover, setSupportsHover] = useState(false);
  const [variant, setVariant] = useState("default"); // "default" | "link" | "down"
  const [visible, setVisible] = useState(true);

  // track mouse
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 350, damping: 40, mass: 0.6 });
  const y = useSpring(my, { stiffness: 350, damping: 40, mass: 0.6 });

  // SSR-safe: detect hover-capable pointers on client only
  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
      const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
      setSupportsHover(mql.matches);
      const onChange = (e) => setSupportsHover(e.matches);
      // cross-browser listener
      if (mql.addEventListener) mql.addEventListener("change", onChange);
      else mql.addListener(onChange);
      return () => {
        if (mql.removeEventListener) mql.removeEventListener("change", onChange);
        else mql.removeListener(onChange);
      };
    }
  }, []);

  // only attach pointer listeners when we actually show the custom cursor
  useEffect(() => {
    if (!mounted || !supportsHover) return;

    const move = (e) => { mx.set(e.clientX); my.set(e.clientY); };
    const enter = () => setVisible(true);
    const leave = () => setVisible(false);
    const down  = () => setVariant((v) => (v === "link" ? "link" : "down"));
    const up    = () => setVariant((v) => (v === "down" ? "default" : v));

    const hoverIn = (e) => {
      const el = e.target.closest('a,button,[role="button"],[data-cursor="link"]');
      if (el) setVariant("link");
    };
    const hoverOut = (e) => {
      const el = e.target.closest('a,button,[role="button"],[data-cursor="link"]');
      if (el) setVariant("default");
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseenter", enter, { passive: true });
    window.addEventListener("mouseleave", leave, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseover", hoverIn);
    document.addEventListener("mouseout", hoverOut);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseenter", enter);
      window.removeEventListener("mouseleave", leave);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseover", hoverIn);
      document.removeEventListener("mouseout", hoverOut);
    };
  }, [mounted, supportsHover, mx, my]);

  // variants
  const stylesByVariant = {
    default: { w: 22, h: 22, br: 9999, bw: 2, scale: 1, opacity: 1 },
    link:    { w: 56, h: 28, br: 9999, bw: 2, scale: 1, opacity: 1 },
    down:    { w: 22, h: 22, br: 9999, bw: 2, scale: 0.92, opacity: 1 },
  };
  const s = stylesByVariant[variant];

  // show only when mounted + hover-capable device + within window
  const show = mounted && supportsHover && visible;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-[1000] mix-blend-normal"
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
    >
      <motion.div
        animate={{
          width: s.w,
          height: s.h,
          borderRadius: s.br,
          opacity: show ? s.opacity : 0,
          scale: s.scale,
          borderWidth: s.bw,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="box-content"
        style={{
          borderStyle: "solid",
          borderColor: "rgba(255,255,255,0.95)",
          filter: "drop-shadow(0 0 2px rgba(0,0,0,0.25))",
          backgroundColor: "transparent",
        }}
      />
    </motion.div>
  );
}
