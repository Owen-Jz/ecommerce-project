// components/dashboard/WishlistCFC.jsx
"use client";

import Image from "next/image";
import Link from "next/link";

const WISHLIST = [
  { title: "Chanel Classic Bag", price: "$X,XXX", href: "/product/chanel-classic-bag" },
  { title: "Pearl Necklace", price: "$X,XXX", href: "/product/pearl-necklace" },
  { title: "Vintage Jacket", price: "$X,XXX", href: "/product/vintage-jacket" },
  { title: "Collector Scarf", price: "$X,XXX", href: "/product/collector-scarf" },
  { title: "Rare Tote", price: "$X,XXX", href: "/product/rare-tote" },
  { title: "Ready-to-Wear Dress", price: "$X,XXX", href: "/product/rtw-dress" },
  { title: "Coco Pumps", price: "$X,XXX", href: "/product/coco-pumps" },
  { title: "Vintage Brooch", price: "$X,XXX", href: "/product/vintage-brooch" },
];

function WishCard({ title, price, href }) {
  return (
    <Link
      href={href}
      className="group block rounded-xl border border-neutral-300 bg-white p-2 hover:-translate-y-0.5 transition shadow-sm"
    >
      <div className="relative w-full overflow-hidden rounded-lg bg-gray-200" style={{ aspectRatio: "4 / 3" }}>
        {/* Placeholder image slot; swap to real product images */}
        <Image
          src="/bag1.jpg"
          alt={title}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-2">
        <p className="text-zinc-900 text-sm font-medium">{title}</p>
        <p className="text-neutral-500 text-xs">{price}</p>
      </div>
    </Link>
  );
}

export default function WishlistCFC() {
  return (
    <>
      <div className="mb-4">
        <h2 className="text-zinc-900 text-lg font-medium">Wishlist</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {WISHLIST.map((w) => (
          <WishCard key={w.title} {...w} />
        ))}
      </div>
    </>
  );
}
