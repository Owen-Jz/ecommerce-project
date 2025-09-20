"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Preloader({ onComplete }) {
  const [visibleWords, setVisibleWords] = useState([0]);

  const words = ["Curated", "Timeless", "Luxurious"];

  // Sequence timing
  useEffect(() => {
    const timers = [
      setTimeout(() => setVisibleWords([0, 1]), 800), // Add "Class" after 0.8s
      setTimeout(() => setVisibleWords([0, 1, 2]), 1600), // Add "Authenticity" after 1.6s
      setTimeout(() => setVisibleWords([0, 1, 2, 'split']), 2600), // Start split and text exit after 2.6s
      setTimeout(() => onComplete(), 3500), // Complete after 3.5s
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  const panelVariants = {
    initial: { x: 0 },
    split: (side) => ({
      x: side === "left" ? "-100vw" : "100vw",
      transition: { duration: 0.9, ease: [0.4, 0, 0.2, 1] },
    }),
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-transparent flex items-center justify-center"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Words Animation */}
        <AnimatePresence>
          {!visibleWords.includes('split') && (
            <motion.div
              className="absolute z-10 flex flex-col items-center justify-center gap-4"
              variants={containerVariants}
              initial="visible"
              animate="visible"
              exit="exit"
            >
              {words.map((word, index) => (
                <motion.h1
                  key={word}
                  variants={wordVariants}
                  initial="hidden"
                  animate={visibleWords.includes(index) ? "visible" : "hidden"}
                  className="text-white text-4xl sm:text-5xl font-serif font-normal leading-tight"
                >
                  {word}
                </motion.h1>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        {/* Splitting Background Panels */}
        <motion.div
          className="fixed top-0 left-0 h-full w-1/2 bg-neutral-900"
          variants={panelVariants}
          initial="initial"
          animate={visibleWords.includes('split') ? "split" : "initial"}
          custom="left"
        />
        <motion.div
          className="fixed top-0 right-0 h-full w-1/2 bg-neutral-900"
          variants={panelVariants}
          initial="initial"
          animate={visibleWords.includes('split') ? "split" : "initial"}
          custom="right"
        />
      </motion.div>
    </AnimatePresence>
  );
}