"use client";
import { useMemo, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import NavbarCFC from "../components/Navabar";
import FooterCFC from "../components/Footer";

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
          style={{ aspectRatio: "4 / 5" }}
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
        <div className="mt-2">
          <h3 className="text-neutral-900 text-sm sm:text-base font-medium leading-snug">{title}</h3>
          <p className="text-neutral-900 text-xs sm:text-sm font-semibold">{price}</p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function NewItemsPage() {
  const [active, setActive] = useState("all");
  const filterRef = useRef(null);
  const gridRef = useRef(null);
  const filterInView = useInView(filterRef, { once: true, margin: "-50px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-50px" });

  const products = useMemo(() => {
    if (active === "all") return NEW_PRODUCTS;
    return NEW_PRODUCTS.filter((p) => p.category === active);
  }, [active]);

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
              style={{ fontFamily: '"Plantagenet Cherokee", serif' }}
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
                      "px-3 py-1.5 border text-xs sm:text-sm font-semibold transition-colors",
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
        <section className="mt-8 sm:mt-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-6">
              <h2
                className="text-neutral-900 text-3xl font-normal"
                style={{ fontFamily: '"Plantagenet Cherokee", serif' }}
              >
                {active === "all"
                  ? "All New Arrivals"
                  : active === "bags"
                  ? "New Bags"
                  : active === "accessories"
                  ? "New Accessories"
                  : "New Ready-to-Wear"}
              </h2>
              <p className="text-neutral-500 text-sm font-normal">
                Showing {active === "all" ? "all categories" : active}
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
                1 <span className="text-neutral-500">/</span> 2
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
