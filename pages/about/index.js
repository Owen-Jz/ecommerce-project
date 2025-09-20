// app/about/page.jsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import NavbarCFC from "../components/Navabar";
import FooterCFC from "../components/Footer";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.2, 0.8, 0.2, 1], delay } },
});

export default function AboutPage() {
  const s1Ref = useRef(null);
  const s2Ref = useRef(null);
  const s3Ref = useRef(null);
  const ctaRef = useRef(null);

  const s1In = useInView(s1Ref, { once: true, margin: "-80px" });
  const s2In = useInView(s2Ref, { once: true, margin: "-80px" });
  const s3In = useInView(s3Ref, { once: true, margin: "-80px" });
  const ctaIn = useInView(ctaRef, { once: true, margin: "-80px" });

  return (
    <>
      <NavbarCFC />

      <main className="bg-white">
        {/* HERO — keep cinematic feel, but content-first */}
        <section className="relative min-h-[76vh] flex items-center">
          <Image
            src="/about.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/45 to-black/25" />
          <div className="relative z-10 w-full">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <motion.h1
                {...fadeUp(0.05)}
                className="text-white text-4xl sm:text-5xl md:text-6xl font-normal leading-tight tracking-tight"
                style={{ fontFamily: '"Plantagenet Cherokee", serif' }}
              >
                Our Story
              </motion.h1>
              <motion.p
                {...fadeUp(0.18)}
                className="mt-4 max-w-2xl text-white/90 text-sm sm:text-base leading-relaxed"
              >
                Closet Full of Coco curates authentic Chanel—bags, accessories, and ready-to-wear—celebrating timeless design and immaculate craftsmanship.
              </motion.p>
              <motion.div {...fadeUp(0.32)} className="mt-7">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2.5 text-sm font-medium text-neutral-900 hover:bg-white"
                >
                  Explore the collection
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* divider */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-px w-full bg-neutral-200/80 my-12 sm:my-16" />
        </div>

        {/* SECTION 1 — Mission (smaller, framed image) */}
        <section ref={s1Ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Text first */}
            <motion.div
              className="lg:col-span-7 order-2 lg:order-1"
              initial="initial"
              animate={s1In ? "animate" : "initial"}
              variants={fadeUp(0)}
            >
              <h2
                className="text-neutral-900 text-3xl sm:text-4xl font-normal"
                style={{ fontFamily: '"Plantagenet Cherokee", serif' }}
              >
                Our Mission
              </h2>
              <p className="mt-4 text-neutral-600 leading-relaxed">
                We champion Chanel’s legacy by sourcing and authenticating exceptional pieces—offering a
                private, considered experience for collectors and connoisseurs. Each item is selected
    for condition, rarity, and enduring style.
              </p>
            </motion.div>

            {/* Smaller, aesthetic image card */}
            <motion.div
              className="lg:col-span-5 order-1 lg:order-2"
              initial="initial"
              animate={s1In ? "animate" : "initial"}
              variants={fadeUp(0.08)}
            >
              <figure className="mx-auto max-w-md">
                <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 p-2 shadow-sm">
                  <div className="relative w-full rounded-xl overflow-hidden" style={{ aspectRatio: "3 / 4" }}>
                    <Image
                      src="/chanel1.jpg"
                      alt="Curated Chanel classics"
                      fill
                      sizes="(max-width:768px) 92vw, 28vw"
                      className="object-cover object-center"
                    />
                  </div>
                </div>
              </figure>
            </motion.div>
          </div>
        </section>

        {/* divider */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-px w-full bg-neutral-200/70 my-12 sm:my-16" />
        </div>

        {/* SECTION 2 — Legacy (reverse layout, smaller framed image) */}
        <section ref={s2Ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <motion.div
              className="lg:col-span-5"
              initial="initial"
              animate={s2In ? "animate" : "initial"}
              variants={fadeUp(0)}
            >
              <figure className="mx-auto max-w-md">
                <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 p-2 shadow-sm">
                  <div className="relative w-full rounded-xl overflow-hidden" style={{ aspectRatio: "3 / 4" }}>
                    <Image
                      src="/chanel2.jpg"
                      alt="Chanel legacy"
                      fill
                      sizes="(max-width:768px) 92vw, 28vw"
                      className="object-cover object-center"
                    />
                  </div>
                </div>
              </figure>
            </motion.div>

            <motion.div
              className="lg:col-span-7"
              initial="initial"
              animate={s2In ? "animate" : "initial"}
              variants={fadeUp(0.08)}
            >
              <h2
                className="text-neutral-900 text-3xl sm:text-4xl font-normal"
                style={{ fontFamily: '"Plantagenet Cherokee", serif' }}
              >
                Chanel’s Legacy
              </h2>
              <p className="mt-4 text-neutral-600 leading-relaxed">
                From the Classic Flap to tweed tailoring, Chanel stands for quiet power and refinement.
                We honor that lineage by prioritizing provenance and quality—so your pieces hold value,
                wear beautifully, and tell a story worth keeping.
              </p>
            </motion.div>
          </div>
        </section>

        {/* divider */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-px w-full bg-neutral-200/70 my-12 sm:my-16" />
        </div>

        {/* SECTION 3 — Promise (smaller, framed image) */}
        <section ref={s3Ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <motion.div
              className="lg:col-span-7 order-2 lg:order-1"
              initial="initial"
              animate={s3In ? "animate" : "initial"}
              variants={fadeUp(0)}
            >
              <h2
                className="text-neutral-900 text-3xl sm:text-4xl font-normal"
                style={{ fontFamily: '"Plantagenet Cherokee", serif' }}
              >
                Our Promise
              </h2>
              <ul className="mt-4 space-y-3 text-neutral-700">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-neutral-900" />
                  Rigorous multi-point authentication on every piece.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-neutral-900" />
                  Curated condition standards for longevity and value.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-neutral-900" />
                  Discreet, careful shipping with insured handling.
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="lg:col-span-5 order-1 lg:order-2"
              initial="initial"
              animate={s3In ? "animate" : "initial"}
              variants={fadeUp(0.08)}
            >
              <figure className="mx-auto max-w-md">
                <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 p-2 shadow-sm">
                  <div className="relative w-full rounded-xl overflow-hidden" style={{ aspectRatio: "3 / 4" }}>
                    <Image
                      src="/chanel3.jpg"
                      alt="Authenticated & curated"
                      fill
                      sizes="(max-width:768px) 92vw, 28vw"
                      className="object-cover object-center"
                    />
                  </div>
                </div>
              </figure>
            </motion.div>
          </div>
        </section>

        {/* CTA — more life: animated gradient glow + subtle shine */}
        <section className="mt-14 sm:mt-20 mb-20">
          <motion.div
            ref={ctaRef}
            initial="initial"
            animate={ctaIn ? "animate" : "initial"}
            variants={fadeUp(0)}
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          >
            <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8 lg:p-10 text-center">
              {/* animated soft gradient glow */}
              <motion.div
                aria-hidden
                initial={{ opacity: 0.5 }}
                animate={{ opacity: [0.35, 0.55, 0.35] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute -inset-1"
                style={{
                  background:
                    "radial-gradient(800px 200px at 20% 120%, rgba(0,0,0,0.06), rgba(0,0,0,0) 60%), radial-gradient(700px 180px at 80% -20%, rgba(0,0,0,0.06), rgba(0,0,0,0) 60%)",
                }}
              />
              <h3
                className="relative z-10 text-neutral-900 text-2xl sm:text-3xl font-normal"
                style={{ fontFamily: '"Plantagenet Cherokee", serif' }}
              >
                Enter the world of Coco
              </h3>
              <p className="relative z-10 mt-2 text-neutral-600 max-w-2xl mx-auto">
                Discover rare finds and modern icons—authenticated, curated, and delivered with care.
              </p>

              <div className="relative z-10 mt-6 inline-flex">
                {/* subtle shine on hover */}
                <Link
                  href="/shop"
                  className="group relative inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-black"
                >
                  <span className="relative z-10">Shop Chanel Now</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="relative z-10">
                    <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {/* shine sweep */}
                  <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
                    <span className="absolute -left-8 top-0 h-full w-12 rotate-12 bg-white/25 blur-md transition-transform duration-700 ease-out group-hover:translate-x-[220%]" />
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <FooterCFC />
    </>
  );
}
