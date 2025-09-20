// pages/product/index.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import NavbarCFC from "../components/Navabar";
import FooterCFC from "../components/Footer";
import ConditionSlider from "./components/ConditionalSlider";


// ------- Mock product (static for now) -------
const product = {
  id: "CHA1298887",
  brand: "Chanel",
  title: "Interlocking CC Logo Slingback Flats (2025) • NWT",
  category: "Shoes / Flats",

  // --- Condition (now compatible with the slider) ---
  condition: "New with tags",        // human label
  conditionScore: 100,               // 0–100 for the slider (New = 100)
  conditionNotes: "Pristine; tags attached. No visible wear.",

  color: "Navy / Black",
  size: "EU 39 (US 9)",
  sku: "CFC-RFXKE",

  // --- Pricing ---
  price: 4950,
  currency: "USD",

  // --- Materials / Specs ---
  materials: "Lambskin upper, leather sole",
  measurements: "Heel: 0.8 in / 2 cm",
  year: 2025,
  madeIn: "Italy",

  // --- Policies / Service ---
  authenticity: "Multi-point in-house authentication. Money-back guarantee.",
  shipping: "Insured, signature on delivery. Ships within 2–3 business days.",
  returns: "Eligible for return within 14 days in original condition.",

  // --- Inclusions ---
  includes: ["Original dust bag", "Care booklet", "Tags attached"],

  // --- Media ---
  images: ["/pdp/p1.jpg", "/pdp/p2.jpg", "/pdp/p3.jpg", "/pdp/p4.jpg"],
  imageAlt: "Chanel 2025 Interlocking CC slingback flats in navy/black",

  // --- Variants ---
  variants: [
    { id: "39", label: "EU 39", available: true },
    { id: "40", label: "EU 40", available: true },
    { id: "41", label: "EU 41", available: false },
  ],

  // --- Related ---
  related: [
    { title: "Two-Tone Cap-Toe Flats", price: "$4,250", href: "#", img: "/pdp/rel1.jpg" },
    { title: "Grosgrain Bow Slingbacks", price: "$3,980", href: "#", img: "/pdp/rel2.jpg" },
    { title: "CC Logo Ballet Flats",    price: "$3,200", href: "#", img: "/pdp/rel3.jpg" },
    { title: "Quilted Mules",           price: "$3,450", href: "#", img: "/pdp/rel4.jpg" },
  ],
};


// ------- Helpers -------
function Price({ value }) {
  return (
    <div className="text-2xl font-semibold tracking-tight text-neutral-900">
      {value.toLocaleString("en-US", { style: "currency", currency: "USD" })}
    </div>
  );
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-neutral-300 px-2.5 py-1 text-xs text-neutral-700">
      {children}
    </span>
  );
}

function Disclosure({ title, children, defaultOpen }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="border-b border-neutral-200">
      <button
        className="flex w-full items-center justify-between py-4 text-left"
        onClick={() => setOpen((s) => !s)}
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-neutral-900">{title}</span>
        <svg
          className={`h-5 w-5 text-neutral-500 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="pb-4 text-sm text-neutral-700 leading-relaxed"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ------- Gallery -------
function Gallery({ images }) {
  const [active, setActive] = useState(0);
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      {/* Thumbs (desktop) */}
      <div className="order-2 lg:order-1 lg:col-span-2 hidden lg:flex lg:flex-col gap-3">
        {images.map((src, idx) => (
          <button
            key={src}
            className={`relative aspect-[4/5] overflow-hidden rounded-lg border ${
              active === idx ? "border-neutral-900" : "border-neutral-200"
            }`}
            onClick={() => setActive(idx)}
          >
            <Image src={src} alt="" fill className="object-cover" sizes="160px" />
          </button>
        ))}
      </div>

      {/* Main */}
      <div className="order-1 lg:order-2 lg:col-span-10">
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-neutral-100">
          <Image
            src={images[active]}
            alt=""
            fill
            className="object-cover object-center"
            sizes="(max-width:1024px) 100vw, 70vw"
            priority
          />
        </div>

        {/* Thumbs (mobile) */}
        <div className="mt-3 grid grid-cols-4 gap-2 lg:hidden">
          {images.map((src, idx) => (
            <button
              key={src}
              className={`relative aspect-[1/1] overflow-hidden rounded-md border ${
                active === idx ? "border-neutral-900" : "border-neutral-200"
              }`}
              onClick={() => setActive(idx)}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="25vw" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ------- Page -------
export default function ProductPage() {
  const [selVariant, setSelVariant] = useState(
    product.variants.find((v) => v.available)?.id || product.variants[0]?.id
  );

  return (
    <>
      <NavbarCFC />

      <main className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28">
          {/* Breadcrumbs */}
          <nav className="mb-4 text-xs text-neutral-500">
            <Link href="/" className="hover:text-neutral-900">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/shop" className="hover:text-neutral-900">
              Shop
            </Link>
            <span className="mx-2">/</span>
            <span className="text-neutral-700">{product.brand}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Gallery */}
            <div className="lg:col-span-7">
              <Gallery images={product.images} />
            </div>

{/* Summary */}
<div className="lg:col-span-5">
  <h1 className="text-neutral-900 text-2xl sm:text-3xl font-medium leading-tight">
    {product.brand}
  </h1>
  <p className="mt-1 text-neutral-700">{product.title}</p>

  <div className="mt-3 flex flex-wrap items-center gap-2">
    <Badge>{product.condition}</Badge>
    <Badge>{product.color}</Badge>
    <Badge>SKU: {product.sku}</Badge>
  </div>

  {/* NEW: Condition slider derived from product.condition */}
  <ConditionSlider conditionText={product.condition} />

  <div className="mt-6">
    <Price value={product.price} />
  </div>

  {/* Sizes */}
  <div className="mt-6">
    <p className="mb-2 text-sm font-medium text-neutral-900">Select Size</p>
    <div className="flex flex-wrap gap-2">
      {product.variants.map((v) => (
        <button
          key={v.id}
          disabled={!v.available}
          onClick={() => setSelVariant(v.id)}
          className={[
            "rounded-full border px-3 py-1.5 text-sm",
            v.id === selVariant
              ? "border-neutral-900 text-neutral-900"
              : "border-neutral-300 text-neutral-700 hover:border-neutral-900",
            !v.available && "opacity-50 cursor-not-allowed",
          ].join(" ")}
        >
          {v.label}
        </button>
      ))}
    </div>
  </div>

  {/* CTA */}
  <div className="mt-6 flex items-center gap-3">
    <button className="flex-1 rounded-md bg-neutral-900 px-4 py-3 text-sm font-medium text-white hover:bg-black">
      Add to Cart
    </button>
    <button className="rounded-md border border-neutral-300 px-4 py-3 text-sm text-neutral-900 hover:border-neutral-900">
      Save
    </button>
  </div>
</div>

          </div>

          {/* Accordions */}
          <section className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6">
                <Disclosure title="Details" defaultOpen>
                  <>
                    <p>
                      <strong>Materials:</strong> {product.materials}
                    </p>
                    <p>
                      <strong>Color:</strong> {product.color}
                    </p>
                    <p>
                      <strong>Category:</strong> {product.category}
                    </p>
                    <p>
                      <strong>SKU:</strong> {product.sku}
                    </p>
                  </>
                </Disclosure>
                <Disclosure title="Size & Fit">
                  <p>{product.measurements}</p>
                </Disclosure>
                <Disclosure title="Inclusions">
                  <ul className="list-disc pl-5">
                    {product.includes.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </Disclosure>
                <Disclosure title="Authentication">
                  <p>{product.authenticity}</p>
                </Disclosure>
                <Disclosure title="Shipping & Returns">
                  <>
                    <p>{product.shipping}</p>
                    <p>{product.returns}</p>
                  </>
                </Disclosure>
              </div>
            </div>
          </section>

          {/* Related */}
          <section className="mt-16">
            <h3
              className="text-neutral-900 text-xl sm:text-2xl font-normal"
              style={{ fontFamily: '"Plantagenet Cherokee", serif' }}
            >
              You may also like
            </h3>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {product.related.map((r) => (
                <Link key={r.title} href={r.href} className="group block">
                  <div
                    className="relative w-full overflow-hidden rounded-lg bg-neutral-100"
                    style={{ aspectRatio: "4 / 5" }}
                  >
                    <Image
                      src={r.img}
                      alt={r.title}
                      fill
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="mt-2">
                    <p className="text-neutral-900 text-sm font-medium">{r.title}</p>
                    <p className="text-neutral-500 text-xs">{r.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Mobile sticky CTA */}
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/95 backdrop-blur px-4 py-3 sm:hidden">
          <div className="mx-auto max-w-7xl flex items-center gap-4">
            <Price value={product.price} />
            <button className="ml-auto rounded-md bg-neutral-900 px-4 py-3 text-sm font-medium text-white">
              Add to Bag
            </button>
          </div>
        </div>
      </main>

      <FooterCFC />
    </>
  );
}
