// components/AuthenticityCFC.jsx
"use client";
import React from "react";
import { motion } from "framer-motion";

const authData = {
  image: "/Slide1.png",
  overlay: "bg-neutral-900/50",
  title: "Our Commitment to Authenticity",
  subtitle:
    "At CFC, every piece you see has already passed our authenticity check",
};

export default function AuthenticityCFC() {
  return (
    <section
      className="relative h-screen min-h-[100svh] w-full flex items-center justify-center overflow-hidden bg-fixed bg-center bg-cover"
      style={{ backgroundImage: `url(${authData.image})` }}
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 h-full w-full ${authData.overlay}`}
        style={{ opacity: 0.75 }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center text-center px-6"
        initial={{ opacity: 0.45, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ type: "tween", duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="text-zinc-50 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal leading-snug font-serif mx-auto max-w-3xl">
          {authData.title}
        </h2>

        <p className="mt-6 text-neutral-100/90 text-sm sm:text-base md:text-lg font-sans mx-auto max-w-2xl leading-relaxed">
          {authData.subtitle}
        </p>
      </motion.div>
    </section>
  );
}
