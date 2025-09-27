// components/AuthenticityCFC.jsx
"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const authData = {
  image: "/auth.png",
  overlay: "bg-neutral-900/60",
  title: "Authenticity First",
  subtitle:
    "At CFC, every piece you see has already passed our authenticity check",
  cta: { label: "Shop all", href: "/shop" },
};

export default function AuthenticityCFC() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // parallax effect
  });

  // Parallax effect for background
  const imageY = useTransform(scrollYProgress, [0, 1], ["-95%", "95%"]);

  return (
    <section
      ref={ref}
      className="relative h-screen min-h-[100dvh] w-full overflow-clip flex items-center justify-center"
    >
      {/* Parallax Background */}
      <motion.img
        src={authData.image}
        alt="Authenticity Background"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover will-change-transform"
        style={{ y: imageY }}
      />

      {/* Dark Overlay */}
      <div
        className={`absolute inset-0 h-full w-full ${authData.overlay}`}
        style={{ opacity: 0.75 }}
      />

      {/* Foreground Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center text-center gap-5 px-6"
        initial={{ opacity: 0.45, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ type: "tween", duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="text-zinc-50 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-snug font-serif mx-auto max-w-4xl">
          {authData.title}
        </h2>

        <p className="text-neutral-100/90 text-sm sm:text-base md:text-lg font-sans mx-auto max-w-2xl">
          {authData.subtitle}
        </p>

        <div className="mt-4 inline-flex justify-center">
          <a
            href={authData.cta.href}
            className="px-6 py-3 text-sm font-medium text-neutral-100 outline outline-1 outline-white hover:bg-white hover:text-neutral-900 hover:opacity-90 transition font-sans"
          >
            {authData.cta.label}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
