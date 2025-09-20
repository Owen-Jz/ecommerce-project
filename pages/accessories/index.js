"use client";
import { useMemo, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import NavbarCFC from "../components/Navabar";
import FooterCFC from "../components/Footer";

const PRODUCTS = [
  // ===== ACCESSORIES (8, with specific categories) =====
  { title: "Pearl Earrings", price: "$1,000", category: "jewelry", images: ["/acc1.jpg", "/acc2.jpg"], href: "/product/pearl-earrings" },
  { title: "Coco Necklace", price: "$1,200", category: "jewelry", images: ["/acc1.jpg", "/acc2.jpg"], href: "/product/coco-necklace" },
  { title: "Logo Brooch", price: "$900", category: "jewelry", images: ["/acc1.jpg", "/acc2.jpg"], href: "/product/logo-brooch" },
  { title: "Silk Scarf", price: "$600", category: "scarves", images: ["/acc1.jpg", "/acc2.jpg"], href: "/product/silk-scarf" },
  { title: "Leather Belt", price: "$850", category: "belts", images: ["/acc1.jpg", "/acc2.jpg"], href: "/product/leather-belt" },
  { title: "Gold Bracelet", price: "$1,500", category: "jewelry", images: ["/acc1.jpg", "/acc2.jpg"], href: "/product/gold-bracelet" },
  { title: "Charm Keychain", price: "$700", category: "other", images: ["/acc1.jpg", "/acc2.jpg"], href: "/product/charm-keychain" },
  { title: "Collector Sunglasses", price: "$1,100", category: "other", images: ["/acc1.jpg", "/acc2.jpg"], href: "/product/collector-sunglasses" },
];

const ACCESSORY_FILTERS = [
  { key: "all", label: "All Accessories" },
  { key: "jewelry", label: "Jewelry" },
  { key: "scarves", label: "Scarves" },
  { key: "belts", label: "Belts" },
  { key: "other", label: "Other" },
];

function ProductCard({ title, price, images, href }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Link href={href} className="group block" aria-label={title}>
        <div className="relative w-full overflow-hidden rounded-lg bg-neutral-100" style={{ aspectRatio: "4 / 5" }}>
          <Image
            src={images[0]}
            alt={title}
            fill
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
            className="object-cover object-center transition-opacity duration-300 group-hover:opacity-0"
            priority={false}
          />
          <Image
            src={images[1] || images[0]}
            alt={`${title} (alternate)`}
            fill
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
            className="object-cover object-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            priority={false}
          />
        </div>
        <div className="mt-2">
          <h3 className="text-neutral-900 text-sm sm:text-base font-medium leading-snug">{title}</h3>
          <p className="text-neutral-900 text-xs sm:text-sm font-semibold">{price}</p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function AccessoriesPage() {
  const [active, setActive] = useState("all");
  const filterRef = useRef(null);
  const gridRef = useRef(null);
  const filterInView = useInView(filterRef, { once: true, margin: "-50px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-50px" });

  const products = useMemo(() => {
    if (active === "all") return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === active);
  }, [active]);

  return (
    <>
      <NavbarCFC />
      <main className="bg-white">
        {/* ===== HERO (full-bleed, tall, dark overlay, white text) ===== */}
        <section className="relative min-h-[80vh] flex items-center justify-center text-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/acc1.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/55" />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <h1 className="text-white text-4xl sm:text-5xl font-normal leading-tight" style={{ fontFamily: '"Plantagenet Cherokee", serif' }}>
              The details that define.
            </h1>
            <p className="text-white/80 text-sm sm:text-base">
              Pearls, brooches, jewelry, and finishing touches — accessories that complete the story of Chanel elegance.
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
              {ACCESSORY_FILTERS.map((f) => {
                const isActive = active === f.key;
                return (
                  <button
                    key={f.key}
                    onClick={() => setActive(f.key)}
                    className={[
                      "px-3 py-1.5 rounded-full border text-xs sm:text-sm font-semibold transition-colors",
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
        {/* ===== GRID SECTION ===== */}
        <section className="mt-8 sm:mt-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-neutral-900 text-3xl font-normal" style={{ fontFamily: '"Plantagenet Cherokee", serif' }}>
                {active === "all" ? "All Accessories" : active === "jewelry" ? "Jewelry" : active === "scarves" ? "Scarves" : active === "belts" ? "Belts" : "Other"}
              </h2>
              <p className="text-neutral-500 text-sm font-normal">
                Showing {active === "all" ? "curated accessories" : active === "jewelry" ? "jewelry" : active === "scarves" ? "scarves" : active === "belts" ? "belts" : "other accessories"} • Sort by: Featured
              </p>
            </div>
            <motion.div ref={gridRef}>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {products.map((p, index) => (
                  <motion.div
                    key={p.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                  >
                    <ProductCard {...p} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
            {/* Pagination */}
            <div className="mt-10 sm:mt-12 flex items-center justify-center gap-4 text-sm">
              <button className="text-neutral-600 hover:text-neutral-900">← Previous</button>
              <div className="text-neutral-900 font-medium">
                1 <span className="text-neutral-500">/</span> 3
              </div>
              <button className="text-neutral-600 hover:text-neutral-900">Next →</button>
            </div>
          </div>
        </section>
      </main>
      <FooterCFC />
    </>
  );
}