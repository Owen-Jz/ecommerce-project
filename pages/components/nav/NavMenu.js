"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function NavMenu({ items, open, setOpen, setHoverKey, previewAllowed, shellRef, buttonRef }) {
  const listVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
    exit: { opacity: 0 },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.8, 0.25, 1] } },
    exit: { opacity: 0, y: 8, transition: { duration: 0.25 } },
  };

  const drawerTransition = { duration: 0.85, ease: [0.25, 0.8, 0.25, 1] };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="overlay"
            className="fixed inset-0 z-[120] bg-black/55"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={drawerTransition}
            onClick={() => setOpen(false)}
          />
          {/* Menu */}
          <motion.aside
            className="h-full w-[86vw] sm:w-[48vw] md:w-[38vw] lg:w-[36vw] xl:w-[34vw] bg-neutral-900/95 border-r border-white/10 backdrop-blur-xl"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={drawerTransition}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 rounded-md p-2 text-white/90 hover:opacity-80 focus:outline-none"
              aria-label="Close menu"
            >
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path strokeWidth="1.5" d="M6 6l12 12M18 6l-12 12" />
              </svg>
            </button>
            {/* Menu List */}
            <nav className="flex h-full w-full items-center justify-center px-6">
              <motion.ul
                className="w-full max-w-md flex flex-col items-center justify-center gap-6 sm:gap-7 md:gap-8"
                variants={listVariants}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                {items.map((item) => (
                  <motion.li
                    key={item.key}
                    variants={itemVariants}
                    className="w-full"
                  >
                    <Link href={item.href} passHref>
                      <motion.a
                        onClick={() => setOpen(false)}
                        onMouseEnter={() =>
                          previewAllowed.has(item.key)
                            ? setHoverKey(item.key)
                            : setHoverKey(null)
                        }
                        onMouseLeave={() => setHoverKey(null)}
                        className="group relative block w-full text-center text-base sm:text-lg md:text-xl font-semibold tracking-tight text-white"
                        whileHover={{
                          x: 3,
                          transition: { type: "spring", stiffness: 320, damping: 24 },
                        }}
                      >
                        {item.label}
                      </motion.a>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
