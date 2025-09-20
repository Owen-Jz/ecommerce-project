// components/PageReveal.jsx
"use client";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageReveal({
  slogan = "Elegance. Discretion. Rarity.",
  textMs = 1200,   // time the bold slogan stays on screen
  doorsMs = 1200,  // door opening duration
  blurMs = 800,    // white → transparent as page blurs in
}) {
  const [phase, setPhase] = useState("text"); // "text" -> "doors" -> "blur" -> unmount
  const [show, setShow] = useState(true);

  // Lock page scroll while visible
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => { html.style.overflow = prev; };
  }, []);

  // Orchestrate phases
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("doors"), textMs);
    const t2 = setTimeout(() => setPhase("blur"), textMs + doorsMs);
    const t3 = setTimeout(() => setShow(false), textMs + doorsMs + blurMs + 100);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [textMs, doorsMs, blurMs]);

  const EASE = [0.15, 0.9, 0.1, 1];

  // Split for subtle stagger (very light—keeps it classy)
  const chars = useMemo(() => slogan.split(""), [slogan]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="cfc-reveal"
          className="fixed inset-0 z-[999] overflow-hidden"
          // We animate bg + blur only in the final phase
          initial={{ backgroundColor: "#000000", opacity: 1, "--reveal-blur": "0px" }}
          animate={
            phase === "blur"
              ? {
                  backgroundColor: ["#ffffff", "rgba(255,255,255,0)"],
                  "--reveal-blur": ["12px", "0px"],
                  opacity: [1, 0],
                }
              : phase === "doors"
              ? { backgroundColor: "#ffffff", "--reveal-blur": "0px", opacity: 1 }
              : { backgroundColor: "#000000", "--reveal-blur": "0px", opacity: 1 }
          }
          exit={{ opacity: 0 }}
          transition={
            phase === "blur"
              ? { duration: blurMs / 1000, ease: "easeInOut", times: [0, 1] }
              : { duration: 0.2 }
          }
          style={{
            backdropFilter: "blur(var(--reveal-blur))",
            WebkitBackdropFilter: "blur(var(--reveal-blur))",
          }}
        >
          {/* Bold slogan (only during phase "text") */}
          {phase === "text" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.h1
                className="px-6 text-center text-white tracking-tight"
                style={{ fontFamily: '"Plantagenet Cherokee", serif' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {/* Large + bold look — that font may not have a heavy weight, so we use size + layer */}
                <span className="relative block text-3xl sm:text-4xl md:text-6xl leading-tight">
                  {/* base line */}
                  {chars.map((c, i) => (
                    <motion.span
                      key={`main-${i}`}
                      className="inline-block"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.10 + i * 0.02, duration: 0.35 }}
                    >
                      {c === " " ? "\u00A0" : c}
                    </motion.span>
                  ))}
                  {/* subtle weight boost via shadow duplicate (fake bold) */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 text-white/90 blur-[0.3px]"
                  >
                    {slogan}
                  </span>
                </span>
              </motion.h1>
            </div>
          )}

          {/* Doors (open over white) */}
          <div className="absolute inset-0">
            {/* Left door */}
            <motion.div
              className="absolute left-0 top-0 h-full w-1/2 bg-black"
              initial={{ x: 0 }}
              animate={{ x: phase === "doors" || phase === "blur" ? "-100%" : 0 }}
              transition={{ duration: doorsMs / 1000, ease: EASE }}
            >
              <div className="absolute right-0 top-0 h-full w-px bg-white/20" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white/10 to-transparent" />
            </motion.div>
            {/* Right door */}
            <motion.div
              className="absolute right-0 top-0 h-full w-1/2 bg-black"
              initial={{ x: 0 }}
              animate={{ x: phase === "doors" || phase === "blur" ? "100%" : 0 }}
              transition={{ duration: doorsMs / 1000, ease: EASE }}
            >
              <div className="absolute left-0 top-0 h-full w-px bg-white/20" />
              <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white/10 to-transparent" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
