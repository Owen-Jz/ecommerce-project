"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchBar({ searchOpen, setSearchOpen, searchRef, searchButtonRef, handleSearch }) {
  const searchTransition = { duration: 0.4, ease: [0.4, 0, 0.2, 1] };

  return (
    <AnimatePresence>
      {searchOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="search-overlay"
            className="fixed inset-0 z-[120] bg-black/55"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={searchTransition}
            onClick={() => setSearchOpen(false)}
          />
          {/* Search Form */}
          <motion.div
            key="search-form"
            ref={searchRef}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[130] w-full max-w-lg px-4 sm:px-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={searchTransition}
          >
            <form
              onSubmit={handleSearch}
              className="flex items-center gap-3 bg-white border border-neutral-200 rounded-md shadow-sm p-3"
            >
              <input
                type="text"
                name="search"
                placeholder="Search for products..."
                className="flex-1 border-0 bg-transparent text-sm text-neutral-800 placeholder-neutral-400 outline-none focus:ring-0"
                autoFocus
              />
              <button
                type="submit"
                className="p-2 text-neutral-800 hover:text-neutral-600 focus:outline-none"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8" strokeWidth="1.5" />
                  <path d="M16.5 16.5L21 21" strokeWidth="1.5" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-2 text-neutral-800 hover:text-neutral-600 focus:outline-none"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path strokeWidth="1.5" d="M6 6l12 12M18 6l-12 12" />
                </svg>
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}