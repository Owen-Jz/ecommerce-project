"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function NavPreview({ activeKey, previews }) {
  const previewTransition = { duration: 0.5, ease: [0.4, 0, 0.2, 1] };

  return (
    <motion.aside
      className="hidden md:block h-screen flex-1 relative"
      role="region"
      aria-label={activeKey ? `Preview for ${previews[activeKey]?.title}` : "Preview"}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={previewTransition}
    >
      <AnimatePresence>
        {activeKey && previews[activeKey] && (
          <motion.img
            key={previews[activeKey].src}
            src={previews[activeKey].src}
            alt={previews[activeKey].title}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          />
        )}
      </AnimatePresence>
      <motion.div
        className="absolute inset-0 bg-black/15 pointer-events-none"
        style={{
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      />
      <motion.div
        className="absolute inset-0 flex items-center justify-center px-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: activeKey ? 1 : 0,
          y: activeKey ? 0 : 10,
        }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="max-w-md w-full rounded-md border border-white/20 bg-black/50 p-6 sm:p-8 backdrop-blur-lg text-white">
          <h3 className="text-2xl font-semibold">
            {activeKey ? previews[activeKey].title : ""}
          </h3>
          <p className="mt-2 text-sm text-white/90">
            {activeKey ? previews[activeKey].tagline : ""}
          </p>
          <p className="mt-3 text-xs text-white/80">
            {activeKey ? previews[activeKey].blurb : ""}
          </p>
        </div>
      </motion.div>
    </motion.aside>
  );
}