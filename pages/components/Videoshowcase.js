// components/ArchiveSectionCFC.jsx
"use client";
import React from "react";
import { motion } from "framer-motion";

const archiveData = {
  video: "/chanel.mp4",
  overlay: "bg-black/70", // darker overlay
  title: "Every closet tells a story — here’s ours",
  subtitle:
    "Step inside our archive. Discover the rare, the iconic, and the timeless — each piece a chapter in fashion’s living history.",
  cta: { label: "Explore the Archive", href: "/archive" },
};

export default function ArchiveSectionCFC() {
  return (
    <section className="relative min-h-[70vh] w-full flex-none m-0 p-0 overflow-hidden box-border bg-white">
      {/* Background Video */}
      <video
        src={archiveData.video}
        autoPlay
        loop
        muted
        playsInline
        poster="/images/video-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />

      {/* Dark Overlay */}
      <div
        className={`absolute inset-0 h-full w-full ${archiveData.overlay}`}
        style={{ opacity: 0.85 }}
      />

      {/* Content */}
      <motion.div
        className="absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-5 px-6 text-center"
        initial={{ opacity: 0.45, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'tween', duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2
          className="whitespace-pre-line text-zinc-50 
          text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
          font-normal leading-snug font-serif mx-auto max-w-4xl"
        >
          {archiveData.title}
        </h2>

        <p className="text-neutral-100/90 text-sm sm:text-base md:text-lg font-sans mx-auto max-w-2xl">
          {archiveData.subtitle}
        </p>

        {/* CTA Button */}
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
