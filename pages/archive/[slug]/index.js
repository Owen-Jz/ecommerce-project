// pages/archive/[slug]/index.js
"use client";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import NavbarCFC from "@/pages/components/Navabar";
import FooterCFC from "@/pages/components/Footer";
import NewProductsSection from "@/pages/components/NewProduct";

const ARCHIVAL_PRODUCTS = [
  {
    slug: "classic-tweed-jacket",
    title: "Classic Tweed Jacket",
    description:
      "A timeless Chanel tweed jacket, part of the archival collection. Handcrafted with iconic detailing and rich heritage fabrics.",
    images: ["/dress1.jpg"],
  },
  {
    slug: "silk-blouse",
    title: "Silk Blouse",
    description:
      "An archival silk blouse, lightweight and elegant, perfect for layering or as a statement piece.",
    images: ["/dress2.jpg"],
  },
  {
    slug: "tailored-pants",
    title: "Tailored Pants",
    description:
      "Chanel archival tailored pants in premium wool blend — sophistication for modern collectors.",
    images: ["/dress1.jpg"],
  },
  // … more products
];

export default function ArchiveProductPage() {
  const router = useRouter();
  const { slug } = router.query;
  const product = ARCHIVAL_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return (
      <main className="pt-28 sm:pt-32 flex items-center justify-center h-[50vh]">
        <p className="text-neutral-500">Archive item not found.</p>
      </main>
    );
  }

  return (
    <>
      <NavbarCFC />
      <main className="bg-white pt-28 sm:pt-32">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Product Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <div className="relative w-full overflow-hidden rounded-lg bg-neutral-100 shadow-sm">
              <Image
                src={product.images[0]}
                alt={product.title}
                width={800}
                height={1000}
                className="object-cover object-center w-full h-auto"
                priority
              />
            </div>

            {/* Info */}
            <div className="flex flex-col gap-6">
              <div>
                <h1
                  className="text-3xl sm:text-4xl font-normal text-neutral-900 leading-tight"
                  style={{ fontFamily: '"Plantagenet Cherokee", serif' }}
                >
                  {product.title}
                </h1>
                <p className="mt-4 text-neutral-600 text-base leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* CTA */}
              <Link
                href="/contact"
                className="inline-block w-full sm:w-auto px-8 py-3 bg-black text-white text-sm font-medium uppercase tracking-wide rounded-none border border-black hover:bg-white hover:text-black transition"
              >
                Source Request
              </Link>
            </div>
          </div>
        </div>

        {/* New Arrivals */}
        <NewProductsSection
          title="New Arrivals"
          showFilters={false}
          limit={4}
        />
      </main>
      <FooterCFC />
    </>
  );
}