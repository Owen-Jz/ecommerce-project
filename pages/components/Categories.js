// components/CategoriesCFC.jsx
"use client";
import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

function CategoryCard({ title, href, image, subtitle, alt }) {
  return (
    <motion.a
      variants={cardVariants}
      href={href}
      aria-label={alt}
      className="group relative block overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
      style={{ aspectRatio: "3/4" }}
    >
      {/* Image */}
      <motion.img
        src={image}
        alt={alt}
        loading="lazy"
        draggable="false"
        className="absolute inset-0 h-full w-full object-cover object-center transform-gpu will-change-transform transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-40 transition-opacity duration-500 ease-[cubic-bezier(.16,1,.3,1)]" />

      {/* Centered Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h3
          className="text-white text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight"
          style={{ fontFamily: '"Plantagenet Cherokee", serif' }}
        >
          {title}
        </h3>
        <span className="mt-2 inline-flex items-center gap-1 text-white/90 text-sm sm:text-base font-light relative">
          {subtitle}
          <span
            className="absolute left-0 -bottom-0.5 h-px w-0 bg-white transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:w-full"
            aria-hidden="true"
          />
        </span>
      </div>
    </motion.a>
  );
}



export default function CategoriesCFC() {
  const categories = [
    {
      title: "Hand Bags",
      href: "/bags",
      image: "bag.png",
      subtitle: "Discover Collection →",
      alt: "Hand Bags category",
    },
    {
      title: "Ready to Wear",
      href: "/ready-to-wear",
      image: "fit.jpg",
      subtitle: "Discover Collection →",
      alt: "Ready to Wear category",
    },
    {
      title: "Accessories",
      href: "/accessories",
      image: "accessory.png",
      subtitle: "Discover Collection →",
      alt: "Accessories category",
    },
  ];

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Heading */}
        <div className="text-center space-y-3 mb-14">
          <h2
            className="text-zinc-900 text-3xl sm:text-4xl md:text-5xl font-normal leading-tight"
            style={{ fontFamily: '"Plantagenet Cherokee", serif' }}
          >
            Browse by Category
          </h2>
          <p className="text-neutral-500 text-base sm:text-lg font-normal max-w-xl mx-auto">
            Curated selections for every expression of Coco luxury
          </p>
        </div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {categories.map((c) => (
            <CategoryCard key={c.title} {...c} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
