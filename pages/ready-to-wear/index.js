"use client";
import { useMemo, useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import NavbarCFC from "../components/Navabar";
import FooterCFC from "../components/Footer";

const DIDOT_STACK = 'Didot, "Bodoni Moda", "Didot LT STD", "Times New Roman", serif';

const PRODUCTS = [
  { title: "Classic Tweed Jacket", price: "$2,800", category: "jackets", images: ["/dress1.jpg", "/dress2.jpg"], href: "/product/classic-tweed-jacket" },
  { title: "Silk Blouse", price: "$1,200", category: "tops", images: ["/dress1.jpg", "/dress2.jpg"], href: "/product/silk-blouse" },
  { title: "Tailored Pants", price: "$1,600", category: "bottoms", images: ["/dress1.jpg", "/dress2.jpg"], href: "/product/tailored-pants" },
  { title: "Little Black Dress", price: "$3,000", category: "dresses", images: ["/dress1.jpg", "/dress2.jpg"], href: "/product/little-black-dress" },
  { title: "Cashmere Sweater", price: "$1,900", category: "tops", images: ["/dress1.jpg", "/dress2.jpg"], href: "/product/cashmere-sweater" },
  { title: "Coco Skirt", price: "$1,500", category: "bottoms", images: ["/dress1.jpg", "/dress2.jpg"], href: "/product/coco-skirt" },
  { title: "Evening Gown", price: "$4,500", category: "dresses", images: ["/dress1.jpg", "/dress2.jpg"], href: "/product/evening-gown" },
  { title: "Summer Dress", price: "$2,200", category: "dresses", images: ["/dress1.jpg", "/dress2.jpg"], href: "/product/summer-dress" },
];

const RTW_FILTERS = [
  { key: "all", label: "All Ready-to-Wear" },
  { key: "jackets", label: "Jackets" },
  { key: "dresses", label: "Dresses" },
  { key: "tops", label: "Tops" },
  { key: "bottoms", label: "Bottoms" },
];

// "$2,800" -> 2800
function parsePrice(price) {
  return parseInt(price.replace(/[^0-9]/g, ""), 10);
}

function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);

  const OPTIONS = [
    { key: "", label: "Sort by" },
    { key: "price-low", label: "Price: Low to High" },
    { key: "price-high", label: "Price: High to Low" },
  ];

  useEffect(() => {
    function onDoc(e) {
      if (!btnRef.current) return;
      const menu = document.getElementById("rtw-sort-menu");
      if (open && menu && !menu.contains(e.target) && !btnRef.current.contains(e.target)) setOpen(false);
    }
    function onKey(e) { if (e.key === "Escape") setOpen(false); }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = (OPTIONS.find(o => o.key === value) || { label: "Sort by" }).label;

  return (
    <div className="relative inline-block text-left">
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen(o => !o)}
        className="inline-flex items-center gap-2 border border-neutral-300 bg-white/80 backdrop-blur-md px-3.5 py-1.5 text-sm text-neutral-800 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-black/10 transition"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="rtw-sort-menu"
        style={{ borderRadius: 0 }}
      >
        <span className="uppercase tracking-wide">{current}</span>
        <svg className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M6 9l6 6 6-6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <motion.div
        id="rtw-sort-menu"
        role="menu"
        initial={false}
        animate={open ? { opacity: 1, y: 0, pointerEvents: "auto" } : { opacity: 0, y: 8, pointerEvents: "none" }}
        transition={{ duration: 0.18, ease: [0.25, 0.8, 0.25, 1] }}
        className="absolute right-0 z-30 mt-2 w-56 border border-neutral-200 bg-white/90 shadow-lg ring-1 ring-black/5 backdrop-blur-xl"
        style={{ borderRadius: 0 }}
      >
        <ul className="py-1" aria-label="Sort options">
          {OPTIONS.map(opt => {
            const active = value === opt.key;
            return (
              <li key={opt.key}>
                <button
                  type="button"
                  onClick={() => { onChange(opt.key); setOpen(false); }}
                  className={`flex w-full items-center justify-between px-3.5 py-2 text-sm transition hover:bg:black/[0.03] ${
                    active ? "text-neutral-900 font-medium" : "text-neutral-700"
                  }`}
                  role="menuitem"
                  style={{ borderRadius: 0 }}
                >
                  <span className="truncate">{opt.label}</span>
                  {active && (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M20 6L9 17l-5-5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
      <Link href={href} className="group block" aria-label={title}>
        <div className="relative w-full overflow-hidden bg-neutral-100" style={{ aspectRatio: "4 / 5" }}>
          <Image src={images[0]} alt={title} fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw" className="object-cover object-center transition-opacity duration-300 group-hover:opacity-0" />
          <Image src={images[1] || images[0]} alt={`${title} (alternate)`} fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw" className="object-cover object-center opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
        <div className="mt-2">
          <h3 className="text-neutral-900 text-sm sm:text-base font-normal leading-snug" style={{ fontFamily: DIDOT_STACK }}>{title}</h3>
          <p className="text-neutral-900 text-xs sm:text-sm font-semibold">{price}</p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ReadyToWearPage() {
  const [active, setActive] = useState("all");
  const [sortBy, setSortBy] = useState(""); // "", "price-low", "price-high"

  const filterRef = useRef(null);
  const gridRef = useRef(null);
  const filterInView = useInView(filterRef, { once: true, margin: "-50px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-50px" });

  const filtered = useMemo(() => (active === "all" ? PRODUCTS : PRODUCTS.filter(p => p.category === active)), [active]);

  const products = useMemo(() => {
    const arr = [...filtered];
    if (sortBy === "price-low") arr.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    if (sortBy === "price-high") arr.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    return arr;
  }, [filtered, sortBy]);

  return (
    <>
      <NavbarCFC />
      <main className="bg-white">
        {/* HERO */}
        <section className="relative min-h-[80vh] flex items-center justify-center text-center">
          <div className="absolute inset-0 z-0">
            <Image src="/dress1.jpg" alt="" fill priority sizes="100vw" className="object-cover object-center" />
            <div className="absolute inset-0 bg-black/55" />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <h1 className="text-white text-4xl sm:text-5xl font-normal leading-tight" style={{ fontFamily: DIDOT_STACK }}>
              Elegance, lived in motion.
            </h1>
            <p className="text-white/80 text-sm sm:text-base">
              Tailored jackets, signature dresses, and seasonal pieces — crafted for those who carry luxury with ease and confidence.
            </p>
          </div>
        </section>

        {/* FILTERS */}
        <section className="mt-8">
          <motion.div
            ref={filterRef}
            initial={{ opacity: 0, y: 20 }}
            animate={filterInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          >
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {RTW_FILTERS.map(f => {
                const isActive = active === f.key;
                return (
                  <button
                    key={f.key}
                    onClick={() => setActive(f.key)}
                    className={["px-3 py-1.5 border text-xs sm:text-sm font-semibold transition-colors",
                                isActive ? "border-neutral-900 bg-neutral-900 text-white"
                                         : "border-neutral-300 text-neutral-600 hover:text-neutral-900 hover:border-neutral-900"].join(" ")}
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

        {/* GRID */}
        <section className="mt-8 sm:mt-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <h2 className="text-neutral-900 text-3xl font-normal" style={{ fontFamily: DIDOT_STACK }}>
                {active === "all" ? "All Ready-to-Wear" : active === "jackets" ? "Jackets" : active === "dresses" ? "Dresses" : active === "tops" ? "Tops" : "Bottoms"}
              </h2>
              <SortDropdown value={sortBy} onChange={setSortBy} />
            </div>

            <motion.div ref={gridRef}>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {products.map((p, index) => (
                  <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} animate={gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}>
                    <ProductCard {...p} />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Pagination placeholder */}
            <div className="mt-10 sm:mt-12 flex items-center justify-center gap-4 text-sm">
              <button className="text-neutral-600 hover:text-neutral-900">← Previous</button>
              <div className="text-neutral-900 font-medium">1 <span className="text-neutral-500">/</span> 3</div>
              <button className="text-neutral-600 hover:text-neutral-900">Next →</button>
            </div>
          </div>
        </section>
      </main>
      <FooterCFC />
    </>
  );
}
