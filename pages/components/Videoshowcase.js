// components/ArchiveSectionCFC.jsx
"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const archiveData = {
  video: "/chanel.mp4",
  overlay: "bg-black/70",
  title: "Every closet tells a story — here’s ours",
  subtitle:
    "Step inside our archive. Discover the rare, the iconic, and the timeless — each piece a chapter in fashion’s living history.",
  cta: { label: "Explore the Archive", href: "/archive" },
};

export default function ArchiveSectionCFC() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // parallax across the section’s time in view
  });

  // Gentle parallax so it doesn’t eat into scroll range
  const videoY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      ref={ref}
      className="relative h-screen min-h-[100dvh] w-full m-0 p-0 overflow-clip box-border"
    >
      {/* Parallax Video (non-interactive so it won't trap scroll/taps) */}
      <motion.video
        src={archiveData.video}
        autoPlay
        loop
        muted
        playsInline
        poster="/images/video-poster.jpg"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover will-change-transform"
        style={{ y: videoY }}
      />

      {/* Dark Overlay (also non-interactive) */}
      <div
        className={`pointer-events-none absolute inset-0 h-full w-full ${archiveData.overlay}`}
        style={{ opacity: 0.85 }}
      />

      {/* Foreground Content */}
      <motion.div
        className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-5 px-6 text-center"
        initial={{ opacity: 0.45, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ type: "tween", duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="whitespace-pre-line text-zinc-50 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-snug font-serif mx-auto max-w-4xl">
          {archiveData.title}
        </h2>

        <p className="text-neutral-100/90 text-sm sm:text-base md:text-lg font-sans mx-auto max-w-2xl">
          {archiveData.subtitle}
        </p>

        <div className="mt-4 inline-flex justify-center">
          <a
            href={archiveData.cta.href}
            className="px-6 py-3 text-sm font-medium text-neutral-100 outline outline-1 outline-white hover:bg-white hover:text-neutral-900 hover:opacity-90 transition font-sans"
          >
            {archiveData.cta.label}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
