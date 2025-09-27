"use client";

import {
  motion,
  useScroll,
  useMotionValueEvent,
  useTransform,
  useSpring,
} from "framer-motion";
import { useRef, useState } from "react";

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
    bg: "/bags-category.png",
    description: "Iconic bags with heritage craftsmanship and enduring value.",
  },
  {
    label: "ACCESSORIES",
    href: "/accessories",
    bg: "/accessories-category.png",
    description: "Belts, jewelry, and finishing touches that define the look.",
  },
];

const ENTRY_BUFFER = 0.22;
const MID_END = 0.7;

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

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 18,
    mass: 0.35,
  });

  const [step, setStep] = useState(0);
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
  });

  const goToStep = (i) => setStep(i);

  return (
    <section ref={sectionRef} className="relative w-full h-[300vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden isolate">
        <div className="absolute inset-0 bg-black -z-20" />

        {CATEGORIES.map((cat, i) => {
          const isActive = i === step;
          return (
            <motion.div
              key={cat.label}
              className="absolute inset-0 -z-10"
              style={{
                backgroundImage: `url(${cat.bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              initial={false}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: fadeDuration, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute inset-0 bg-neutral-900/50" />
            </motion.div>
          );
        })}

        {/* Sidebar progress */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 h-[60%] w-[4px] bg-white/20 z-20">
          <motion.div
            className="w-full bg-white"
            style={{
              height: useTransform(smoothProgress, [0, 1], ["0%", "100%"]),
            }}
          />
        </div>

        {/* Foreground Content */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
          <h2 className="text-zinc-50 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif mb-6 leading-snug">
            Shop by Category
          </h2>

          <p className="mb-8 max-w-2xl text-neutral-100 font-sans text-sm sm:text-base md:text-lg leading-relaxed">
            {CATEGORIES[step].description}
          </p>

          <nav className="flex flex-col sm:flex-row gap-6 items-center justify-center">
            {CATEGORIES.map((c, j) => {
              const active = j === step;
              return (
                <motion.button
                  key={c.label}
                  onClick={() => goToStep(j)}
                  className={`relative px-8 py-4 text-base sm:text-lg font-semibold font-sans transition-colors ${
                    active
                      ? "text-neutral-900 bg-white"
                      : "text-neutral-100 hover:text-white/90"
                  }`}
                  aria-current={active ? "true" : "false"}
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                >
                  {c.label}
                  <motion.span
                    variants={{
                      rest: { opacity: 0, scale: 0.95 },
                      hover: { opacity: 1, scale: 1 },
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute inset-0 border-2 border-white pointer-events-none"
                  />
                </motion.button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Preload */}
      <div className="hidden">
        {CATEGORIES.map((c) => (
          <img key={c.bg} src={c.bg} alt="" loading="lazy" />
        ))}
      </div>
    </section>
  );
}
