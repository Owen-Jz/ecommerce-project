"use client";
import { motion } from "framer-motion";
import { useRef } from "react";

const slideData = {
  id: 2,
  video: "/video.mp4",
  overlay: "bg-neutral-900/50",
  title: "Discover Timeless Elegance",
  subtitle: "Explore our curated collection of iconic designs, crafted for sophistication.",
  cta: { label: "Explore Now", href: "/collection" },
};

export default function Slide2() {
  const slideRef = useRef(null);

  return (
    <section
      ref={slideRef}
      className="relative min-h-screen w-full flex-none box-border"
      aria-label={slideData.title}
    >
      {/* Fixed Video Background */}
      <div className="fixed inset-0 -z-10 h-full w-full">
        <video
          src={slideData.video}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          aria-hidden="true"
          preload="metadata"
        >
          <source src={slideData.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Overlay */}
      <div className={`fixed inset-0 ${slideData.overlay}`} style={{ opacity: 0.75 }} />

      {/* Content */}
      <motion.div
        className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center gap-4 px-6 text-center"
        initial={{ opacity: 0.45, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "tween", duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1
          className="whitespace-pre-line text-zinc-50 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-snug font-serif mx-auto max-w-3xl"
        >
          {slideData.title}
        </h1>

        <p className="text-neutral-100/90 text-sm sm:text-base md:text-lg font-sans mx-auto max-w-3xl">
          {slideData.subtitle}
        </p>

        <div className="mt-4 inline-flex justify-center">
          <a
            href={slideData.cta.href}
            className="px-5 py-3 text-sm font-medium text-neutral-100 outline outline-1 outline-white hover:bg-white hover:text-neutral-900 hover:opacity-90 transition font-sans"
            aria-label={slideData.cta.label}
          >
            {slideData.cta.label}
          </a>
        </div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-neutral-100/80 cursor-pointer"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        role="button"
        tabIndex={0}
        aria-label="Scroll to next section"
        onClick={() => {
          slideRef.current?.nextElementSibling?.scrollIntoView({ behavior: "smooth" });
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            slideRef.current?.nextElementSibling?.scrollIntoView({ behavior: "smooth" });
          }
        }}
      >
        <span className="text-sm uppercase tracking-wider">Scroll</span>
        <div className="flex justify-center mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}

