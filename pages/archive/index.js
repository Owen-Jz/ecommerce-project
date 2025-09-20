// app/archival/page.jsx
"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import NavbarCFC from "../components/Navabar";
import FooterCFC from "../components/Footer";

const ARCHIVAL_PRODUCTS = [
  { title: "Classic Tweed Jacket", category: "rtw", images: ["/dress1.jpg", "/dress2.jpg"], href: "/archive/classic-tweed-jacket" },
  { title: "Silk Blouse", category: "rtw", images: ["/dress1.jpg", "/dress2.jpg"], href: "/archive/silk-blouse" },
  { title: "Tailored Pants", category: "rtw", images: ["/dress1.jpg", "/dress2.jpg"], href: "/archive/tailored-pants" },
  { title: "Little Black Dress", category: "rtw", images: ["/dress1.jpg", "/dress2.jpg"], href: "/archive/little-black-dress" },
  { title: "Cashmere Sweater", category: "rtw", images: ["/dress1.jpg", "/dress2.jpg"], href: "/archive/cashmere-sweater" },
  { title: "Coco Skirt", category: "rtw", images: ["/dress1.jpg", "/dress2.jpg"], href: "/archive/coco-skirt" },
  { title: "Evening Gown", category: "rtw", images: ["/dress1.jpg", "/dress2.jpg"], href: "/archive/evening-gown" },
  { title: "Summer Dress", category: "rtw", images: ["/dress1.jpg", "/dress2.jpg"], href: "/archive/summer-dress" },
];

function ArchivalProductCard({ title, images, href }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Link href={href} className="group block" aria-label={title}>
        <div
          className="relative w-full overflow-hidden rounded-lg bg-neutral-100"
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
          <h3 className="text-neutral-900 text-sm sm:text-base font-medium leading-snug">
            {title}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ArchivalPage() {
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-50px" });

  return (
    <>
      <NavbarCFC />
      <main className="bg-white pt-28 sm:pt-32"> 
        {/* ===== HEADER ===== */}
        <section>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1
              className="text-zinc-900 text-3xl sm:text-4xl font-normal leading-tight"
              style={{ fontFamily: '"Plantagenet Cherokee", serif' }}
            >
              Archival Page
            </h1>
            <p className="text-neutral-500 text-sm">
              Curated fashion pieces • Sort by: Latest
            </p>
          </div>
        </section>

        {/* ===== GRID ===== */}
        <section className="mt-8 sm:mt-10">
          <motion.div
            ref={gridRef}
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {ARCHIVAL_PRODUCTS.map((p, index) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    gridInView
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 20 }
                  }
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                >
                  <ArchivalProductCard {...p} />
                </motion.div>
              ))}
            </div>

            {/* ===== PAGINATION ===== */}
            <div className="mt-10 sm:mt-12 flex items-center justify-center gap-6 text-sm">
              <button className="text-neutral-600 hover:text-neutral-900">
                ← Previous
              </button>
              <div className="text-neutral-900 font-medium flex items-center gap-2">
                <span className="px-2 py-1 rounded bg-neutral-900 text-white">1</span>
                <span className="text-neutral-600">2</span>
                <span className="text-neutral-600">3</span>
                <span className="text-neutral-500">…</span>
              </div>
              <button className="text-neutral-600 hover:text-neutral-900">
                Next →
              </button>
            </div>
          </motion.div>
        </section>
      </main>
      <FooterCFC />
    </>
  );
}
