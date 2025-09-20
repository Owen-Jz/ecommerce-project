"use client";
import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STORAGE_KEY = "cfc_consent_v1";
const defaultPrefs = { necessary: true, analytics: false, marketing: false };

function writeCookie(name, value, days = 180) {
  try {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(
      value
    )};expires=${d.toUTCString()};path=/;SameSite=Lax`;
  } catch {}
}

export default function PrivacyCookiesModal({ showAfter = true, delayMs = 400 }) {
  const [open, setOpen] = useState(false);

  // Show only if no decision saved
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return;
    } catch {}
    const t = setTimeout(() => {
      if (showAfter) setOpen(true);
    }, delayMs);
    return () => clearTimeout(t);
  }, [showAfter, delayMs]);

  const persist = useCallback((next) => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
    writeCookie(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const acceptAll = () => {
    persist({ necessary: true, analytics: true, marketing: true });
    setOpen(false);
  };
  const rejectAll = () => {
    persist({ necessary: true, analytics: false, marketing: false });
    setOpen(false);
  };

  // prevent closing by backdrop click; encourage explicit choice
  const stop = (e) => e.stopPropagation();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Privacy and cookies notice"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {}}
        >
          {/* backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* modal card */}
          <motion.div
            onClick={stop}
            initial={{ y: 28, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 16, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.26, ease: [0.2, 0.8, 0.2, 1] }}
            className="
              relative z-10 w-[92vw] max-w-sm sm:max-w-md lg:max-w-lg
              mx-4 sm:mx-0
              mb-[max(env(safe-area-inset-bottom),1rem)] sm:mb-0
              bg-white border border-neutral-200
              shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)]
              rounded-none
            "
          >
            <div className="p-5 sm:p-6">
              {/* header */}
              <div className="flex items-start justify-between">
                <h3 className="text-base sm:text-lg font-semibold tracking-tight">
                  Privacy & Cookies
                </h3>
              </div>

              {/* body */}
              <div className="mt-3 space-y-2">
                <p className="text-sm text-neutral-700 leading-relaxed">
                  We use necessary cookies for core features. With your consent, we’ll also use analytics and marketing cookies to improve your experience.
                </p>
                <ul className="text-xs text-neutral-600 leading-relaxed list-disc pl-4">
                  <li>Necessary: site security & basics</li>
                  <li>Analytics: performance & usage</li>
                  <li>Marketing: personalized offers</li>
                </ul>
              </div>

              {/* actions */}
              <div className="mt-5 grid grid-cols-2 gap-2">
                <button
                  onClick={rejectAll}
                  className="inline-flex items-center justify-center border border-neutral-300 bg-white px-4 py-2 text-sm hover:border-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 transition"
                >
                  Reject
                </button>
                <button
                  onClick={acceptAll}
                  className="inline-flex items-center justify-center bg-neutral-900 text-white px-4 py-2 text-sm hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 transition"
                >
                  Accept
                </button>
              </div>

              {/* tiny footer copy */}
              <p className="mt-3 text-[11px] text-neutral-500">
                You can change your choice anytime in your browser settings.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
