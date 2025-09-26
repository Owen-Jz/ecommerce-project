"use client";
import { motion } from "framer-motion";
import { useRef } from "react";

const slideData = {
  id: 1,
  video: "/SecondVideo.mp4",
  overlay: "bg-neutral-900/50",
  title: "Curating the Impossible",
  subtitle: "Sourcing treasures, tailored to your story.",
  cta: { label: "SOURCING REQUESTS", href: "/sourcing-request" },
};

export default function SecondSlide() {
  const slideRef = useRef(null);

  return (
    <section
      ref={slideRef}
      className="relative min-h-[100svh] w-full flex-none m-0 p-0 overflow-hidden box-border"
      aria-label={slideData.title}
    >
      {/* Fixed Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 -z-10 h-full w-full object-cover"
      >
        <source src={slideData.video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div
        className={`absolute inset-0 h-full w-full ${slideData.overlay}`}
        style={{ opacity: 0.75 }}
      />

      {/* Content */}
      <motion.div
        className="absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-4 px-6 text-center"
        initial={{ opacity: 0.45, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "tween", duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1
          className="whitespace-pre-line text-zinc-50 
          text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
          font-normal leading-snug font-serif mx-auto max-w-3xl"
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
          >
            {slideData.cta.label}
          </a>
        </div>
      </motion.div>


    </section>
  );
}
