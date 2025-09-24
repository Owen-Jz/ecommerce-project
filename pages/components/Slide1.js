"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const slideData = {
  id: 1,
  video: "/Video.mp4", // video source
  overlay: "bg-neutral-900/50",
  title: "Here to Help Build\nYour Dream Closet",
  subtitle:
    "From runway pieces to timeless classics, we source, authenticate, and deliver treasures to your closet",
  cta: { label: "Shop Now", href: "/shop" },
};

export default function Slide1() {
  const slideRef = useRef(null);

  // Track scroll progress relative to this section
  const { scrollYProgress } = useScroll({
    target: slideRef,
    offset: ["start start", "end start"], // triggers when top enters/leaves viewport
  });

  // Map scroll progress to a slower movement
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]); // smaller movement = slower scroll

  return (
    <section
      ref={slideRef}
      className="relative min-h-[100svh] w-full flex-none m-0 p-0 overflow-hidden box-border"
      aria-label={slideData.title}
    >
      {/* Background Video with Parallax */}
      <motion.video
        autoPlay
        loop
        muted
        playsInline
        style={{ y }} // <-- parallax effect
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      >
        <source src={slideData.video} type="video/mp4" />
        Your browser does not support the video tag.
      </motion.video>

      {/* Overlay */}
      <div
        className={`absolute inset-0 h-full w-full ${slideData.overlay}`}
        style={{ opacity: 0.65 }}
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

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-neutral-100/80"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
