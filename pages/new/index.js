"use client";
import { useMemo, useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import NavbarCFC from "../components/Navabar";
import FooterCFC from "../components/Footer";

/* ------------------------------- Brand font ------------------------------ */
const DIDOT_STACK = 'Didot, "Bodoni Moda", "Didot LT STD", "Times New Roman", serif';

/* --------------------------------- Data ---------------------------------- */
const NEW_PRODUCTS = [
  { title: "2025 Classic Flap", price: "$6,200", category: "bags", images: ["/bag1.jpg", "/bag2.jpg"], href: "/product/2025-classic-flap" },
  { title: "Mini Diana Bag", price: "$5,800", category: "bags", images: ["/bag2.jpg", "/bag1.jpg"], href: "/product/mini-diana" },
  { title: "Pearl Drop Earrings", price: "$1,050", category: "accessories", images: ["/acc1.jpg", "/acc2.jpg"], href: "/product/pearl-drop-earrings" },
  { title: "Silk Scarf Limited Edition", price: "$700", category: "accessories", images: ["/acc2.jpg", "/acc1.jpg"], href: "/product/silk-scarf-limited" },
  { title: "Tweed Cropped Jacket", price: "$2,900", category: "rtw", images: ["/dress1.jpg", "/dress2.jpg"], href: "/product/tweed-cropped-jacket" },
  { title: "Coco Handle Mini", price: "$4,300", category: "bags", images: ["/bag3.jpg", "/bag1.jpg"], href: "/product/coco-handle-mini" },
];

const FILTERS = [
  { key: "all", label: "All" },
  { key: "bags", label: "Bags" },
  { key: "accessories", label: "Accessories" },
  { key: "rtw", label: "Ready to Wear" },
];

/* ------------------------------- Utilities ------------------------------- */
function parsePrice(price) {
  return parseInt(String(price).replace(/[^0-9]/g, ""), 10) || 0;
}

/* ------------------------------- Sort UI -------------------------------- */
function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);

  const OPTIONS = [
    { key: "", label: "Sort by" }, // placeholder label (keeps same look/flow as Bags)
    { key: "featured", label: "Featured" },
    { key: "price-low", label: "Price: Low to High" },
    { key: "price-high", label: "Price: High to Low" },
    { key: "latest", label: "Latest" }, // alphabetical fallback unless you add createdAt
  ];

  useEffect(() => {
    function onDoc(e) {
      if (!btnRef.current) return;
      const menu = document.getElementById("new-sort-menu");
      if (open && menu && !menu.contains(e.target) && !btnRef.current.contains(e.target)) {
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

  const label =
    (OPTIONS.find((o) => o.key === value) || OPTIONS[0]).label || "Sort by";

  return (
    <div className="relative inline-block text-left">
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 border border-neutral-300 bg-white/80 backdrop-blur-md px-3.5 py-1.5 text-sm text-neutral-800 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-black/10 transition"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="new-sort-menu"
        style={{ borderRadius: 0 }}
      >
        <span className="uppercase tracking-wide">{label}</span>
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

      <motion.div
        id="new-sort-menu"
        role="menu"
        initial={false}
        animate={
          open
            ? { opacity: 1, y: 0, pointerEvents: "auto" }
            : { opacity: 0, y: 8, pointerEvents: "none" }
        }
        transition={{ duration: 0.18, ease: [0.25, 0.8, 0.25, 1] }}
        className="absolute right-0 z-30 mt-2 w-56 border border-neutral-200 bg-white/90 shadow-lg ring-1 ring-black/5 backdrop-blur-xl"
        style={{ borderRadius: 0 }}
      >
        <ul className="py-1" aria-label="Sort options">
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
                  className={`flex w-full items-center justify-between px-3.5 py-2 text-sm transition hover:bg-black/[0.03] ${
                    active ? "text-neutral-900 font-medium" : "text-neutral-700"
                  }`}
                  role="menuitem"
                  style={{ borderRadius: 0 }}
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

/* ------------------------------ Product Card ----------------------------- */
function ProductCard({ title, price, images, href }) {
  const img0 = images?.[0] || "/placeholder.jpg";
  const img1 = images?.[1] || img0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Link href={href} className="group block" aria-label={title}>
        <div
          className="relative w-full overflow-hidden bg-neutral-100"
          style={{ aspectRatio: "4 / 5", borderRadius: 0 }}
        >
          <Image
            src={img0}
            alt={title}
            fill
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
            className="object-cover object-center transition-opacity duration-300 group-hover:opacity-0"
            priority={false}
          />
          <Image
            src={img1}
            alt={`${title} (alternate)`}
            fill
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
            className="object-cover object-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            priority={false}
          />
        </div>
        <div className="mt-2">
          <h3
            className="text-neutral-900 text-sm sm:text-base font-normal leading-snug"
            style={{ fontFamily: DIDOT_STACK }}
          >
            {title}
          </h3>
          <p className="text-neutral-900 text-xs sm:text-sm font-semibold">
            {price}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

/* ---------------------------------- Page --------------------------------- */
export default function NewItemsPage() {
  const [active, setActive] = useState("all");
  const [sortKey, setSortKey] = useState("featured"); // featured | price-low | price-high | latest
  const filterRef = useRef(null);
  const gridRef = useRef(null);
  const filterInView = useInView(filterRef, { once: true, margin: "-50px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-50px" });

  const filtered = useMemo(() => {
    if (active === "all") return NEW_PRODUCTS;
    return NEW_PRODUCTS.filter((p) => p.category === active);
  }, [active]);

  const products = useMemo(() => {
    const arr = [...filtered];
    switch (sortKey) {
      case "price-low":
        arr.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
        break;
      case "price-high":
        arr.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
        break;
      case "latest":
        // Replace with real date sort when you add createdAt
        arr.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "featured":
      default:
        // curated order
        break;
    }
    return arr;
  }, [filtered, sortKey]);

  return (
    <>
      <NavbarCFC />
      <main className="bg-white">
        {/* ===== HERO ===== */}
        <section className="relative min-h-[80vh] flex items-center justify-center text-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/Slide4.png"
              alt="New arrivals background"
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
              Fresh Arrivals, Just In.
            </h1>
            <p className="text-white/80 text-sm sm:text-base">
              Explore the latest curated Chanel pieces — authenticated, timeless, and ready for your collection.
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
                    style={{ borderRadius: 0 }}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* ===== GRID HEADER + SORT ===== */}
        <section className="mt-8 sm:mt-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <h2
                className="text-neutral-900 text-3xl font-normal"
                style={{ fontFamily: DIDOT_STACK }}
              >
                {active === "all"
                  ? "All New Arrivals"
                  : active === "bags"
                  ? "New Bags"
                  : active === "accessories"
                  ? "New Accessories"
                  : "New Ready-to-Wear"}
              </h2>

              {/* Same SortDropdown + chevron icon as Bags page */}
              <SortDropdown value={sortKey} onChange={setSortKey} />
            </div>

            {/* ===== GRID ===== */}
            <motion.div ref={gridRef}>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {products.map((p, index) => (
                  <motion.div
                    key={p.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                  >
                    <ProductCard {...p} />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Pagination */}
            <div className="mt-10 sm:mt-12 flex items-center justify-center gap-4 text-sm">
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
