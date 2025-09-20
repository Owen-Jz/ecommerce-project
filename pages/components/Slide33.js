"use client";
import { motion } from "framer-motion";
import { useRef } from "react";

const categories = [
  { label: "READY TO WEAR", href: "/ready-to-wear" },
  { label: "BAGS", href: "/bags" },
  { label: "ACCESSORIES", href: "/accessories" },
];

export default function ThirdSlide() {
  const slideRef = useRef(null);

  return (
    <section
      ref={slideRef}
      className="relative min-h-[100svh] w-full flex-none m-0 p-0 overflow-hidden box-border bg-fixed bg-cover bg-center"
      aria-label="Shop by category"
      style={{ backgroundImage: `url(/Slide1.png)` }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 h-full w-full bg-neutral-900/50"
        style={{ opacity: 0.75 }}
      />

      {/* Content */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center"
        initial={{ opacity: 0.45, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "tween", duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="text-zinc-50 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-snug font-serif">
          Shop by category
        </h1>

        {/* Categories */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          {categories.map((cat) => (
            <a
              key={cat.label}
              href={cat.href}
              className="px-6 py-3 text-sm font-medium text-neutral-100 outline outline-1 outline-white hover:bg-white hover:text-neutral-900 hover:opacity-90 transition font-sans"
            >
              {cat.label}
            </a>
          ))}
        </div>
      </motion.div>

    </section>
  );
}
