"use client";
import { useRef, useState, useMemo, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Keep your paths
import NavbarCFC from "@/pages/components/Navabar";
import FooterCFC from "@/pages/components/Footer";

/* ------------------------------- Brand Fonts ------------------------------ */
const DIDOT_STACK =
  'Didot, "Bodoni Moda", "Didot LT STD", "Times New Roman", serif';

/* ------------------------------ Tabs (Square) ----------------------------- */
function ProductTabs({ description, details, shipping, authentication }) {
  const [tab, setTab] = useState("description");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const tabs = [
    { key: "description", label: "Description" },
    { key: "details", label: "Details" },
    { key: "shipping", label: "Shipping & Returns" },
    { key: "auth", label: "Authentication" },
  ];

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="border border-neutral-200 p-4 sm:p-6"
      style={{ borderRadius: 0 }}
    >
      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={[
              "text-sm font-medium",
              tab === t.key ? "text-neutral-900" : "text-neutral-500 hover:text-neutral-800",
            ].join(" ")}
            style={{ borderRadius: 0 }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="my-3 h-px w-full bg-neutral-200" />

      {/* Content */}
      <div className="prose prose-sm max-w-none text-neutral-800">
        {tab === "description" && <p>{description}</p>}
        {tab === "details" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
            {details.map((d, i) => (
              <p key={i} className="m-0">
                <span className="text-neutral-900">{d.label}:</span> {d.value}
              </p>
            ))}
          </div>
        )}
        {tab === "shipping" && <p>{shipping}</p>}
        {tab === "auth" && <p>{authentication}</p>}
      </div>
    </motion.section>
  );
}

/* --------------------------------- Seed ---------------------------------- */
const PRODUCT = {
  title: "Classic Flap (1996)",
  subtitle: "Chanel Classic Flap (1996) — Lambskin, 24k Hardware",
  price: "$6,500",
  sku: "CCF-1996-01",
  origin: "Rue Cambon, Paris",
  category: "Bags",
  subCategory: "Shoulder Bags",
  tags: ["Lambskin", "24k Hardware"],
  images: ["/bag.png", "/accessory.png", "/fit.jpg", "/bag.png"],
  description:
    "A timeless Chanel Classic Flap from 1996 in black lambskin with 24k gold-plated hardware. Includes dust bag and authenticity card.",
  details: [
    { label: "Material", value: "Lambskin" },
    { label: "Hardware", value: "24k Gold-plated" },
    { label: "Color", value: "Black" },
    { label: "Year", value: "1996" },
    { label: "Condition", value: "Excellent" },
    { label: "Inclusions", value: "Dust bag, Auth Card" },
  ],
  shipping:
    "Worldwide shipping via trusted couriers. Returns accepted within 14 days if conditions are met.",
  authentication:
    "Expert multi-point verification (material, stitching, serials, provenance). Certificate available on request.",
};

const RELATED_PRODUCTS = [
  { title: "Mini Classic (1994)", price: "$5,800", image: "/bag.png", href: "/product/mini-classic-1994" },
  { title: "Diana Flap (1992)", price: "$6,200", image: "/accessory.png", href: "/product/diana-flap-1992" },
  { title: "Reissue 2.55 (2005)", price: "$7,000", image: "/fit.jpg", href: "/product/reissue-255-2005" },
  { title: "Coco Handle (2018)", price: "$5,500", image: "/bag.png", href: "/product/coco-handle-2018" },
];

/* ------------------------------- Price Text ------------------------------- */
function Price({ value }) {
  return (
    <p className="text-[1.4rem] sm:text-[1.6rem] font-medium text-neutral-900">
      {value}
    </p>
  );
}

/* --------------------------- Gallery (Stacked) ---------------------------- */
/* Requirement #17: detailed photos UNDER the main photo (not left). */
function ProductImages({ images }) {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const safeImages = useMemo(
    () => (images && images.length ? images : ["/bag.png"]),
    [images]
  );

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full lg:w-[56%] xl:w-[58%] space-y-4"
    >
      {/* Main Image */}
      <div
        className="relative w-full overflow-hidden bg-neutral-50 group"
        style={{ aspectRatio: "4 / 5", borderRadius: 0 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={safeImages[active]}
            initial={{ opacity: 0, scale: 1.01 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.005 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={safeImages[active]}
              alt={`Product image ${active + 1}`}
              fill
              sizes="(max-width:1024px) 100vw, 58vw"
              className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnails BELOW (square, sharp) */}
      <div
        className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3"
        style={{ borderRadius: 0 }}
      >
        {safeImages.map((src, idx) => (
          <button
            key={src + idx}
            onClick={() => setActive(idx)}
            className={[
              "relative overflow-hidden bg-neutral-100 ring-1 transition",
              active === idx ? "ring-2 ring-neutral-900" : "ring-neutral-200 hover:ring-neutral-300",
            ].join(" ")}
            style={{ aspectRatio: "1 / 1", borderRadius: 0 }}
            aria-label={`Preview image ${idx + 1}`}
          >
            <Image
              src={src}
              alt={`Thumbnail ${idx + 1}`}
              fill
              sizes="120px"
              className="object-cover object-center"
              priority={idx === 0}
            />
          </button>
        ))}
      </div>
    </motion.section>
  );
}

/* --------------------------- Details (no bubbles) ------------------------- */
/* Requirement #18: remove the chips/badges under item name. */
function ProductDetails({ title, subtitle, price }) {
  const [qty, setQty] = useState(1);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full lg:w-[44%] xl:w-[42%]"
    >
      <div className="lg:sticky lg:top-24 space-y-5">
        {/* Title (Didot) */}
        <h1
          className="text-neutral-900 text-2xl sm:text-3xl font-normal leading-tight"
          style={{ fontFamily: DIDOT_STACK }}
        >
          {title}
        </h1>

        {/* Subtitle (kept subtle) */}
        {subtitle && (
          <h2 className="text-neutral-600 text-sm sm:text-base font-normal">
            {subtitle}
          </h2>
        )}

        <Price value={price} />

        {/* Quantity + CTAs (square) */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center border border-neutral-300 px-3 py-1.5" style={{ borderRadius: 0 }}>
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="px-2 text-neutral-900"
              aria-label="Decrease quantity"
              style={{ borderRadius: 0 }}
            >
              −
            </button>
            <span className="min-w-[2ch] text-center text-neutral-800 text-sm">
              {qty}
            </span>
            <button
              onClick={() => setQty(qty + 1)}
              className="px-2 text-neutral-900"
              aria-label="Increase quantity"
              style={{ borderRadius: 0 }}
            >
              +
            </button>
          </div>

          <button
            className="flex-1 bg-neutral-900 px-4 py-3 text-sm font-medium text-white hover:bg-black"
            style={{ borderRadius: 0 }}
          >
            Add to Bag
          </button>
          <button
            className="border border-neutral-300 px-4 py-3 text-sm text-neutral-900 hover:border-neutral-900"
            aria-label="Save to wishlist"
            style={{ borderRadius: 0 }}
          >
            Save
          </button>
        </div>

        {/* Trust row (square) */}
        <div className="border border-neutral-200 p-4" style={{ borderRadius: 0 }}>
          <ul className="text-neutral-700 text-sm space-y-1">
            <li>• 100% Authentic — expert multi-point verification</li>
            <li>• Insured, signature-on-delivery shipping</li>
            <li>• 14-day returns in original condition</li>
          </ul>
        </div>
      </div>
    </motion.section>
  );
}

/* --------------------------- Related Grid (square) ------------------------ */
function RelatedProducts({ products }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-4"
    >
      <h2
        className="text-neutral-900 text-xl sm:text-2xl font-normal"
        style={{ fontFamily: DIDOT_STACK }}
      >
        You may also like
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((p) => (
          <Link key={p.title} href={p.href} className="group block" aria-label={p.title}>
            <div
              className="relative w-full overflow-hidden bg-neutral-100"
              style={{ aspectRatio: "4 / 5", borderRadius: 0 }}
            >
              <Image
                src={p.image}
                alt={p.title}
                fill
                sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="mt-2">
              <h3
                className="text-neutral-900 text-sm sm:text-base font-normal leading-snug"
                style={{ fontFamily: DIDOT_STACK }}
              >
                {p.title}
              </h3>
              <p className="text-neutral-900 text-xs sm:text-sm font-semibold">
                {p.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </motion.section>
  );
}

/* --------------------------------- Page ----------------------------------- */
export default function ProductPage() {
  const breadcrumbRef = useRef(null);
  const breadcrumbInView = useInView(breadcrumbRef, { once: true, margin: "-60px" });

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavbarCFC />
      </div>

      <main className="bg-white pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-20">
          {/* Breadcrumb */}
          <motion.nav
            ref={breadcrumbRef}
            initial={{ opacity: 0, y: 20 }}
            animate={breadcrumbInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="mb-6 flex items-center gap-2 text-xs text-neutral-600"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-neutral-900">Home</Link>
            <span>›</span>
            <Link href="/bags" className="hover:text-neutral-900">Bags</Link>
            <span>›</span>
            <span className="text-neutral-900 font-medium">{PRODUCT.title}</span>
          </motion.nav>

          {/* Main */}
          <div className="mb-12 flex flex-col lg:flex-row gap-8 lg:gap-10">
            <ProductImages images={PRODUCT.images} />
            <ProductDetails
              title={PRODUCT.title}
              subtitle={PRODUCT.subtitle}
              price={PRODUCT.price}
            />
          </div>

          {/* Tabs */}
          <div className="mb-12">
            <ProductTabs
              description={PRODUCT.description}
              details={PRODUCT.details}
              shipping={PRODUCT.shipping}
              authentication={PRODUCT.authentication}
            />
          </div>

          {/* Related */}
          <RelatedProducts products={RELATED_PRODUCTS} />
        </div>
      </main>
      <FooterCFC />
    </>
  );
}
