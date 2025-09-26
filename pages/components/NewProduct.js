"use client";
import { useMemo, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export const NEW_PRODUCTS = [
  { title: "Chanel Classic Bag", price: "$4,500", category: "bags", images: ["/bag1.jpg", "/bag2.jpg"], href: "/product/chanel-classic-bag" },
  { title: "Pearl Necklace", price: "$1,200", category: "accessories", images: ["/acc1.jpg", "/acc2.jpg"], href: "/product/pearl-necklace" },
  { title: "Vintage Jacket", price: "$2,500", category: "rtw", images: ["/dress1.jpg", "/dress2.png"], href: "/product/vintage-jacket" },
  { title: "Leather Tote", price: "$3,800", category: "bags", images: ["/tote1.jpg", "/tote2.jpg"], href: "/product/leather-tote" },
];

const DIDOT_STACK = 'Didot, "Bodoni Moda", "Didot LT STD", "Times New Roman", serif';

export default function NewProductsSection({
  products = NEW_PRODUCTS,
  title = "New Arrivals",
  limit = null,
}) {
  const list = useMemo(
    () => products.slice(0, limit || products.length),
    [products, limit]
  );

  return (
    <section id="new-products" className="w-full py-14 sm:py-20 bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading + View All */}
        <div className="mb-8 sm:mb-12 flex flex-row items-center justify-between gap-4">
          <h2
            className="text-zinc-900 text-2xl md:text-3xl font-normal leading-tight"
            style={{ fontFamily: DIDOT_STACK }}
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

        {/* SAME GRID FORMAT AS SHOP ALL */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {list.map((p, i) => (
            <motion.div
              key={p.href + i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
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
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
          className="object-cover object-center transition-opacity duration-300 group-hover:opacity-0"
        />
        <Image
          src={img1}
          alt={`${title} (alternate)`}
          fill
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
          className="object-cover object-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </div>
      <div className="mt-2">
        <p className="text-xs uppercase tracking-wide text-neutral-500">
          {category === "rtw" ? "Ready to Wear" : category}
        </p>
        <h3
          className="text-neutral-900 text-sm sm:text-base font-normal leading-snug"
          style={{ fontFamily: DIDOT_STACK }}
        >
          {title}
        </h3>
        <p className="text-neutral-900 text-xs sm:text-sm font-semibold">{price}</p>
      </div>
    </Link>
  );
}
