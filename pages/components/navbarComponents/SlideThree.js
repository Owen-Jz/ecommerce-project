"use client";
import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function SlideThree({ dataIndex = 2, containerRef, setRef, onNext }) {
  const ref = useRef(null);
  useEffect(() => setRef?.(ref.current), [setRef]);

  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const fade = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  return (
    <section
      ref={ref}
      data-index={dataIndex}
      className="relative h-[100svh] w-full snap-start overflow-hidden"
      aria-label="Welcome to Closet Full of Coco"
    >
      <motion.img
        src="/images/hero/image2.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        style={{ y }}
        draggable={false}
      />
      <motion.div className="absolute inset-0 bg-white/0" style={{ opacity: fade }} />

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-4 px-6 text-center">
        <h2 className="whitespace-pre-line text-white text-3xl sm:text-4xl md:text-[2.2rem] font-normal leading-tight">
          Welcome to{"\n"}Closet Full of Coco
        </h2>
        <p className="text-white/90 text-sm sm:text-base md:text-lg">
          An intimate world of rare Chanel, curated for those who truly know luxury
        </p>
        <div className="mt-4 inline-flex">
          <a
            href="/collection"
            className="rounded-lg bg-white px-5 py-3 text-sm font-medium text-neutral-900 outline outline-1 outline-white/30 hover:opacity-90 transition"
          >
            Enter the Collection
          </a>
        </div>
      </div>

      <button
        type="button"
        onClick={onNext}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/95"
        aria-label="Scroll to next section"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M6 9l6 6 6-6" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </section>
  );
}
