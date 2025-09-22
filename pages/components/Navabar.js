"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function NavbarCFC({ blurAmount = 8 }) {
  const [open, setOpen] = useState(false);
  const [onLight, setOnLight] = useState(false);
  const [hoverKey, setHoverKey] = useState(null);
  const [activeKey, setActiveKey] = useState(null);

  const shellRef = useRef(null);
  const buttonRef = useRef(null);

  const pathname = usePathname();
  const isHome = pathname === "/";

  // Debounced activeKey update
  useEffect(() => {
    const timer = setTimeout(() => setActiveKey(hoverKey), 100);
    return () => clearTimeout(timer);
  }, [hoverKey]);

  // ====== Preview content ======
  const previews = useMemo(
    () => ({
      "shop-all": {
        title: "Shop All",
        src: "/Slide1.png",
        tagline: "The entire world of Coco, in one place.",
        blurb:
          "Browse every category at once — newly arrived pieces, rare archive finds, and timeless bestsellers.",
      },
      new: {
        title: "New",
        src: "/Closet.jpg",
        tagline: "Just in, freshly authenticated.",
        blurb:
          "Be first to discover this week’s arrivals — hand-vetted items with detailed condition notes.",
      },
      handbags: {
        title: "Handbags",
        src: "/bag-hero.jpg",
        tagline: "Iconic silhouettes. Collector-grade condition.",
        blurb:
          "From Classic Flap to runway pieces — curated for craftsmanship, provenance, and rarity.",
      },
      accessories: {
        title: "Accessories",
        src: "/acc1.jpg",
        tagline: "Finishing touches that make the look.",
        blurb:
          "Jewelry, belts, scarves, charms — refined accents to elevate everyday styling.",
      },
      "ready-to-wear": {
        title: "Ready to Wear",
        src: "/dress2.png",
        tagline: "Tailored, timeless, impeccably cut.",
        blurb:
          "Elevated staples and standout statements — premium fabrics, modern tailoring, flawless fit.",
      },
    }),
    []
  );

  const items = useMemo(
    () => [
      { key: "shop-all", label: "Shop All", href: "/shop" },
      { key: "new", label: "New", href: "/new" },
      { key: "handbags", label: "Handbags", href: "/bags" },
      { key: "accessories", label: "Accessories", href: "/accessories" },
      { key: "ready-to-wear", label: "Ready to Wear", href: "/ready-to-wear" },
      {
        key: "sourcing-requests",
        label: "Sourcing Requests",
        href: "/sourcing-request",
      },
      // { key: "about", label: "About", href: "/about" },
    ],
    []
  );

  const previewAllowed = useMemo(
    () =>
      new Set(["shop-all", "new", "handbags", "accessories", "ready-to-wear"]),
    []
  );

  // Escape key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const onClick = (e) => {
      if (!shellRef.current || !buttonRef.current) return;
      if (
        open &&
        !shellRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  // Switch navbar style (scroll check)
  useEffect(() => {
    if (!isHome) {
      setOnLight(true);
      return;
    }
    const update = () => setOnLight(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [isHome]);

  // ====== Animation configs ======
  const listVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.12 },
    },
    exit: { opacity: 0 },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.25, 0.8, 0.25, 1] },
    },
    exit: { opacity: 0, y: 8, transition: { duration: 0.25 } },
  };
  const drawerTransition = { duration: 0.85, ease: [0.25, 0.8, 0.25, 1] };
  const previewTransition = { duration: 0.5, ease: [0.4, 0, 0.2, 1] };

  // Theme classes
  const textClass = onLight
    ? "text-neutral-900"
    : isHome
    ? "text-white"
    : "text-neutral-900";
  const borderClass =
    isHome && !onLight ? "border-transparent" : "border-neutral-200/80";
  const bgClass =
    isHome && !onLight
      ? "bg-transparent shadow-none"
      : "bg-white/85 backdrop-blur-md shadow-sm";

  return (
    <header
      id="cfc-header"
      className={`fixed inset-x-0 top-0 z-[100] border-b ${borderClass} ${bgClass} transition-all duration-500 ease-in-out`}
      style={{
        backdropFilter: isHome && !onLight ? "none" : `blur(${blurAmount}px)`,
        WebkitBackdropFilter:
          isHome && !onLight ? "none" : `blur(${blurAmount}px)`,
      }}
    >
      <nav
        className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Primary"
      >
        {/* Left: Menu Button */}
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="cfc-combined-shell"
          className={`inline-flex items-center gap-2 p-0 text-sm font-medium ${textClass} hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/10`}
        >
          <svg
            className={`h-5 w-5 ${textClass}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path strokeWidth="1.5" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>

        {/* Center: Brand */}
        <Link
          href="/"
          className={`select-none text-lg sm:text-xl md:text-2xl font-normal leading-none tracking-tight ${textClass}`}
          style={{
            fontFamily:
              'Didot, "Bodoni Moda", "Didot LT STD", "Times New Roman", serif',
          }}
        >
          Closet Full of Coco
        </Link>

        {/* Right: Account + Cart */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/account"
            className={`inline-flex items-center gap-1.5 p-0 ${textClass} hover:opacity-80`}
            aria-label="Account"
          >
            <svg
              className={`h-5 w-5 ${textClass}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" strokeWidth="1.5" />
              <path d="M4 20a8 8 0 0 1 16 0" strokeWidth="1.5" />
            </svg>
          </Link>
          <Link
            href="/cart"
            className={`inline-flex items-center gap-1.5 p-0 ${textClass} hover:opacity-80`}
            aria-label="Cart"
          >
            <svg
              className={`h-5 w-5 ${textClass}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="M6 8h12l-1 11H7L6 8Z" strokeWidth="1.5" />
              <path d="M9 8a3 3 0 1 1 6 0" strokeWidth="1.5" />
            </svg>
          </Link>
        </div>
      </nav>

      {/* Fullscreen Menu + Preview */}
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

            {/* Combined Shell */}
            <motion.div
              key="shell"
              id="cfc-combined-shell"
              ref={shellRef}
              className="fixed inset-0 z-[130] flex w-screen h-screen overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
            >
              {/* Left Menu */}
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
                        <Link
                          href={item.href}
                          className="group relative block w-full text-center text-base sm:text-lg md:text-xl font-semibold tracking-tight text-white"
                          onMouseEnter={() =>
                            previewAllowed.has(item.key)
                              ? setHoverKey(item.key)
                              : setHoverKey(null)
                          }
                          onMouseLeave={() => setHoverKey(null)}
                          onClick={() => setOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </motion.li>
                    ))}
                  </motion.ul>
                </nav>
              </motion.aside>

              {/* Right Preview */}
              <motion.aside
                className="hidden md:block h-screen flex-1 relative"
                role="region"
                aria-label={
                  activeKey
                    ? `Preview for ${previews[activeKey]?.title}`
                    : "Preview"
                }
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

                {/* Blur Overlay */}
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

                {/* Text Overlay */}
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
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
