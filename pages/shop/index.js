"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import NavbarCFC from "../components/Navabar";
import FooterCFC from "../components/Footer";

const DIDOT_STACK =
  'Didot, "Bodoni Moda", "Didot LT STD", "Times New Roman", serif';

const INITIAL_PRODUCTS = [
  // Handbags
  { title: "Classic Flap Bag", price: "$4,500", category: "handbags", images: ["/bag1.jpg", "/bag2.jpg"], href: "/product/classic-flap-bag" },
  { title: "Mini Diana Bag", price: "$5,800", category: "handbags", images: ["/bag2.jpg", "/bag1.jpg"], href: "/product/mini-diana" },
  { title: "Coco Handle Mini", price: "$4,300", category: "handbags", images: ["/bag3.jpg", "/bag1.jpg"], href: "/product/coco-handle-mini" },

  // Ready to Wear
  { title: "Tweed Cropped Jacket", price: "$2,900", category: "ready-to-wear", images: ["/dress1.jpg", "/dress2.jpg"], href: "/product/tweed-cropped-jacket" },
  { title: "Wool Midi Dress", price: "$3,200", category: "ready-to-wear", images: ["/dress2.jpg", "/dress1.png"], href: "/product/wool-midi-dress" },

  // Accessories
  { title: "Pearl Drop Earrings", price: "$1,050", category: "accessories", images: ["/acc1.jpg", "/acc2.jpg"], href: "/product/pearl-drop-earrings" },
  { title: "Silk Scarf Limited Edition", price: "$700", category: "accessories", images: ["/acc2.jpg", "/acc1.jpg"], href: "/product/silk-scarf-limited" },
];

const FILTERS = [
  { key: "all", label: "All" },
  { key: "handbags", label: "Handbags" },
  { key: "ready-to-wear", label: "Ready to Wear" },
  { key: "accessories", label: "Accessories" },
];

// "$4,500" -> 4500
function parsePrice(price) {
  return parseInt(price.replace(/[^0-9]/g, ""), 10);
}

/* === Glassy pill sort dropdown (pure JS) === */
function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);

  const OPTIONS = [
    { key: "", label: "Sort by" },
    { key: "price-low", label: "Price: Low to High" },
    { key: "price-high", label: "Price: High to Low" },
  ];

  // Close on outside click / ESC
  useEffect(() => {
    function onDoc(e) {
      if (!btnRef.current) return;
      const menu = document.getElementById("sort-menu");
      if (
        open &&
        menu &&
        !menu.contains(e.target) &&
        !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current =
    (OPTIONS.find((o) => o.key === value) || { label: "Sort by" }).label;

  return (
    <div className="relative inline-block text-left">
      {/* Trigger */}
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 rounded-none border border-neutral-200/80 bg-white/70 backdrop-blur-md px-3.5 py-1.5 text-sm text-neutral-800 hover:border-neutral-300 hover:bg-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/10 transition"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="sort-menu"
      >
        <span className="uppercase tracking-wide">{current}</span>
        <svg
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M6 9l6 6 6-6"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Menu */}
      <motion.div
        id="sort-menu"
        role="menu"
        initial={false}
        animate={
          open
            ? { opacity: 1, y: 0, pointerEvents: "auto" }
            : { opacity: 0, y: 8, pointerEvents: "none" }
        }
        transition={{ duration: 0.18, ease: [0.25, 0.8, 0.25, 1] }}
        className="absolute right-0 z-30 mt-2 w-56 rounded-none border border-white/20 bg-white/85 shadow-lg ring-1 ring-black/5 backdrop-blur-xl overflow-hidden"
      >
        <ul className="py-1.5" aria-label="Sort options">
          {OPTIONS.map((opt) => {
            const active = value === opt.key;
            return (
              <li key={opt.key}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(opt.key);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-3.5 py-2.5 text-sm transition hover:bg-black/[0.03] ${
                    active ? "text-neutral-900 font-medium" : "text-neutral-700"
                  }`}
                  role="menuitem"
                >
                  <span className="truncate">{opt.label}</span>
                  {active && (
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M20 6L9 17l-5-5"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </motion.div>
    </div>
  );
}

function ProductCard({ title, price, images, href }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Link href={href} className="group block" aria-label={title}>
        <div
          className="relative w-full overflow-hidden bg-neutral-100"
          style={{ aspectRatio: "3 / 4" }} // taller, more luxe
        >
          <Image
            src={images[0]}
            alt={title}
            fill
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
            className="object-cover object-center transition-opacity duration-300 group-hover:opacity-0"
          />
          <Image
            src={images[1] || images[0]}
            alt={`${title} (alternate)`}
            fill
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
            className="object-cover object-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </div>
        <div className="mt-3">
          <h3
            className="text-neutral-900 text-base sm:text-lg font-normal leading-snug"
            style={{ fontFamily: DIDOT_STACK }}
          >
            {title}
          </h3>
          <p className="text-neutral-900 text-sm sm:text-base font-semibold">
            {price}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ShopAllPage() {
  const [active, setActive] = useState("all");
  const [products] = useState(INITIAL_PRODUCTS); // source of truth (unsorted)
  const [sortBy, setSortBy] = useState("");

  const filterRef = useRef(null);
  const gridRef = useRef(null);
  const filterInView = useInView(filterRef, { once: true, margin: "-50px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-50px" });

  // Filter
  const filteredProducts = products.filter((p) =>
    active === "all" ? true : p.category === active
  );

  // Sort view
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return parsePrice(a.price) - parsePrice(b.price);
    if (sortBy === "price-high") return parsePrice(b.price) - parsePrice(a.price);
    return 0;
  });

  return (
    <>
      <NavbarCFC />
      <main className="bg-white">
        {/* ===== HERO ===== */}
        <section className="relative min-h-[80vh] flex items-center justify-center text-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/Slide2.jpg"
              alt="Shop all hero background"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/55" />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <h1
              className="text-white text-4xl sm:text-5xl font-normal leading-tight"
              style={{ fontFamily: DIDOT_STACK }}
            >
              Shop All Collections
            </h1>
            <p className="text-white/80 text-sm sm:text-base">
              Handbags, ready-to-wear, and accessories — curated and authenticated Chanel classics and rare finds.
            </p>
          </div>
        </section>

        {/* ===== FILTERS ===== */}
        <section className="mt-8">
          <motion.div
            ref={filterRef}
            initial={{ opacity: 0, y: 20 }}
            animate={filterInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          >
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {FILTERS.map((f) => {
                const isActive = active === f.key;
                return (
                  <button
                    key={f.key}
                    onClick={() => setActive(f.key)}
                    className={[
                      "px-3 py-1.5 border text-xs sm:text-sm font-semibold transition-colors rounded-none",
                      isActive
                        ? "border-neutral-900 bg-neutral-900 text-white"
                        : "border-neutral-300 text-neutral-600 hover:text-neutral-900 hover:border-neutral-900",
                    ].join(" ")}
                    aria-pressed={isActive}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* ===== GRID ===== */}
        <section className="mt-10 sm:mt-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
              <h2
                className="text-neutral-900 text-3xl sm:text-4xl font-normal"
                style={{ fontFamily: DIDOT_STACK }}
              >
                {active === "all"
                  ? "All Products"
                  : active === "handbags"
                  ? "Handbags"
                  : active === "ready-to-wear"
                  ? "Ready to Wear"
                  : "Accessories"}
              </h2>

              {/* Brand-matching Sort */}
              <SortDropdown value={sortBy} onChange={setSortBy} />
            </div>

            <motion.div ref={gridRef}>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
                {sortedProducts.map((p, index) => (
                  <motion.div
                    key={p.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                  >
                    <ProductCard {...p} />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Pagination (placeholder) */}
            <div className="mt-12 flex items-center justify-center gap-4 text-sm">
              <button className="text-neutral-600 hover:text-neutral-900">
                ← Previous
              </button>
              <div className="text-neutral-900 font-medium">
                1 <span className="text-neutral-500">/</span> 2
              </div>
              <button className="text-neutral-600 hover:text-neutral-900">
                Next →
              </button>
            </div>
          </div>
        </section>
      </main>
      <FooterCFC />
    </>
  );
}
