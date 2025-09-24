"use client";
import { useMemo, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export const NEW_PRODUCTS = [
  {
    title: "Chanel Classic Bag",
    price: "$4,500",
    category: "bags",
    images: ["/bag1.jpg", "/bag2.jpg"],
    href: "/product/chanel-classic-bag",
  },
  {
    title: "Pearl Necklace",
    price: "$1,200",
    category: "accessories",
    images: ["/acc1.jpg", "/acc2.jpg"],
    href: "/product/pearl-necklace",
  },
  {
    title: "Vintage Jacket",
    price: "$2,500",
    category: "rtw",
    images: ["/dress1.jpg", "/dress2.png"],
    href: "/product/vintage-jacket",
  },
];

export default function NewProductsSection({
  products = NEW_PRODUCTS,
  title = "New Arrivals",
  limit = null,
}) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth; // move by full width (3 items)
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="new-products" className="w-full py-14 sm:py-20 bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading + View All CTA (always in a row) */}
        <div className="mb-8 sm:mb-12 flex flex-row items-center justify-between gap-4">
          <h2
            className="text-zinc-900 text-2xl md:text-3xl font-normal leading-tight"
            style={{ fontFamily: '"Plantagenet Cherokee", serif' }}
          >
            {title}
          </h2>
          <Link
            href="/new"
            className="text-sm uppercase tracking-wide text-neutral-700 hover:text-black transition"
          >
            View All
          </Link>
        </div>

        {/* Scrollable Container */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="grid grid-flow-col auto-cols-[minmax(0,calc(100%/3))] gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {products.map((p, i) => (
              <motion.div
                key={p.href + i}
                className="snap-start w-full"
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.04,
                  ease: "easeOut",
                }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </div>

          {/* Scroll Buttons (Desktop only) */}
          <div className="hidden sm:flex">
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition"
              aria-label="Scroll left"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition"
              aria-label="Scroll right"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }) {
  const { title, price, images = [], href, category } = product;
  const img0 = images[0] || "/placeholder.jpg";
  const img1 = images[1] || images[0] || "/placeholder.jpg";

  return (
    <Link href={href} aria-label={title} className="group block">
      <div
        className="relative w-full overflow-hidden bg-neutral-100"
        style={{ aspectRatio: "4 / 5" }}
      >
        <Image
          src={img0}
          alt={title}
          fill
          sizes="(max-width:640px) 100vw, (max-width:1024px) 33.33vw, 33.33vw"
          className="object-cover object-center transition-opacity duration-300 group-hover:opacity-0"
        />
        <Image
          src={img1}
          alt={`${title} (alternate)`}
          fill
          sizes="(max-width:640px) 100vw, (max-width:1024px) 33.33vw, 33.33vw"
          className="object-cover object-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          {/* No truncation / clamping */}
          <p className="text-xs uppercase tracking-wide text-neutral-500">
            {category === "rtw" ? "Ready to wear" : category}
          </p>
          <h3 className="mt-0.5 text-base font-normal">{title}</h3>
        </div>
        <div className="shrink-0 text-sm sm:text-base font-medium tabular-nums">
          {price}
        </div>
      </div>
    </Link>
  );
}
