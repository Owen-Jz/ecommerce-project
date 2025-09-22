"use client";

import {
  motion,
  useScroll,
  useMotionValueEvent,
  useTransform,
  useSpring,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const CATEGORIES = [
  {
    label: "READY TO WEAR",
    href: "/ready-to-wear",
    bg: "/dress2.png",
    description: "Curated ready-to-wear pieces—tailored silhouettes.",
  },
  {
    label: "BAGS",
    href: "/bags",
    bg: "/Slide4.png",
    description: "Iconic bags with heritage craftsmanship and enduring value.",
  },
  {
    label: "ACCESSORIES",
    href: "/accessories",
    bg: "/acc2.jpg",
    description: "Belts, jewelry, and finishing touches that define the look.",
  },
];

const ENTRY_BUFFER = 0.22;
const MID_END = 0.7;
const EXIT_HOLD = 0.92;
const ENTRY_HOLD = 0.08;

function progressToStep(p) {
  if (p < ENTRY_BUFFER) return 0;
  if (p < MID_END) return 1;
  return 2;
}

export default function ThirdSlide() {
  const sectionRef = useRef(null);
  const prevStepRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Make zoom feel more responsive but still smooth
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75, // ↑ faster response
    damping: 18,
    mass: 0.35,
  });

  // UNIFORM zoom across the entire pinned section for all layers
  // (clear, noticeable, but not aggressive)
  const uniformScale = useTransform(smoothProgress, [0, 1], [1.04, 1.18]);

  const [step, setStep] = useState(0);
  const [blocking, setBlocking] = useState(false);
  const [fadeDuration, setFadeDuration] = useState(1.0);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = progressToStep(p);
    if (next !== step) {
      const prev = prevStepRef.current;
      const isEdge = (prev === 0 && next === 1) || (prev === 1 && next === 2);
      setFadeDuration(isEdge ? 1.4 : 1.0);
      prevStepRef.current = next;
      setStep(next);
    }

    // tiny holds at entry/exit to avoid snap
    if (!blocking && (p < ENTRY_HOLD || p > EXIT_HOLD)) {
      setBlocking(true);
      const t = setTimeout(() => setBlocking(false), 230);
      return () => clearTimeout(t);
    }
  });

  useEffect(() => {
    if (!blocking) return;
    const prevent = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
    window.addEventListener("wheel", prevent, { passive: false });
    window.addEventListener("touchmove", prevent, { passive: false });
    return () => {
      window.removeEventListener("wheel", prevent);
      window.removeEventListener("touchmove", prevent);
    };
  }, [blocking]);

  return (
    <section ref={sectionRef} className="relative w-full h-[500vh]">
      {/* Sticky viewport; isolated so fixed bg video can't bleed through */}
      <div className="sticky top-0 h-screen w-full overflow-hidden isolate">
        {/* Opaque blocker */}
        <div className="absolute inset-0 bg-black -z-20" />

        {/* Background layers: crossfade + UNIFORM zoom tied to scroll */}
        {CATEGORIES.map((cat, i) => {
          const isActive = i === step;
          return (
            <motion.div
              key={cat.label}
              className="absolute inset-0 will-change-transform will-change-opacity -z-10"
              style={{
                backgroundImage: `url(${cat.bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "translateZ(0)",
                scale: uniformScale, // ⬅️ uniform, noticeable zoom
              }}
              initial={false}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: fadeDuration, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute inset-0 bg-neutral-900/50" />
            </motion.div>
          );
        })}

        {/* Static, centered UI */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
          <h2 className="text-zinc-50 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif">
            Shop by Category
          </h2>

          {/* Clickable category links with smooth underline; stays centered */}
          <nav className="relative mt-6 flex flex-col sm:flex-row gap-6 items-center justify-center">
            {CATEGORIES.map((c, j) => {
              const active = j === step;
              return (
                <div key={c.label} className="relative">
                  <a
                    href={c.href}
                    className={`px-6 py-2 text-sm font-medium font-sans transition-colors ${
                      active
                        ? "text-neutral-900 bg-white"
                        : "text-neutral-100 hover:text-white/90"
                    }`}
                    aria-current={active ? "true" : "false"}
                  >
                    {c.label}
                  </a>
                  {active && (
                    <motion.div
                      layoutId="category-underline"
                      className="absolute left-0 right-0 -bottom-1 h-[2px] bg-white/90"
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                  )}
                </div>
              );
            })}
          </nav>

          <p className="mt-12 max-w-xl text-neutral-100 font-sans text-base sm:text-lg">
            {CATEGORIES[step].description}
          </p>
        </div>
      </div>

      {/* Preload images */}
      <div className="hidden">
        {CATEGORIES.map((c) => (
          <img key={c.bg} src={c.bg} alt="" loading="lazy" />
        ))}
      </div>
    </section>
  );
}
