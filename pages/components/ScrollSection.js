"use client";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { useRef } from "react";

export default function ScrollSection({ children, className = "", id }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Animate opacity + blur
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const blurValue = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [8, 0, 0, 8]);

  // Combine blur value into a CSS filter string
  const filter = useMotionTemplate`blur(${blurValue}px)`;

  return (
    <motion.section
      ref={ref}
      id={id}
      style={{
        opacity,
        filter,
        willChange: "opacity, filter",
      }}
      className={`relative z-10 ${className}`}
    >
      {children}
    </motion.section>
  );
}
