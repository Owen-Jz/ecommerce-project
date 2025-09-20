"use client";
import React from "react";
import Link from "next/link"; // Import Link from next/link

export default function FooterCFC() {
  return (
    <footer className="w-full bg-white border-t border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Top: brand + columns */}
        <div className="grid grid-cols-1 gap-10 sm:gap-12 md:grid-cols-12">
          {/* Brand + newsletter */}
          <div className="md:col-span-5 lg:col-span-4 space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 bg-neutral-800" aria-hidden />
              <div className="text-zinc-900 text-base font-bold">
                Closet Full of Coco
              </div>
            </div>
            <p className="text-neutral-500 text-xs max-w-sm">
              A private world of Chanel — curated, authenticated, and delivered
              with care.
            </p>
            <div className="space-y-2 pt-2">
              <div className="text-zinc-900 text-xs font-medium">
                Join our list
              </div>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex w-full max-w-md items-stretch gap-2"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 bg-white text-xs text-zinc-900 placeholder:text-zinc-500 outline outline-1 outline-neutral-300 focus:outline-neutral-900"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-white text-xs font-medium text-zinc-900 outline outline-1 outline-neutral-300 hover:bg-white hover:opacity-90 transition"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          {/* Link columns */}
          <div className="md:col-span-7 lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-2.5">
              <div className="text-zinc-900 text-xs font-medium">Shop</div>
              <ul className="space-y-1.5">
                <li>
                  <Link
                    href="/shop"
                    className="text-neutral-500 text-xs hover:text-neutral-900 transition"
                  >
                    Shop All
                  </Link>
                </li>
                <li>
                  <Link
                    href="/bags"
                    className="text-neutral-500 text-xs hover:text-neutral-900 transition"
                  >
                    Bags
                  </Link>
                </li>
                <li>
                  <Link
                    href="/accessories"
                    className="text-neutral-500 text-xs hover:text-neutral-900 transition"
                  >
                    Accessories
                  </Link>
                </li>
                <li>
                  <Link
                    href="/ready-to-wear"
                    className="text-neutral-500 text-xs hover:text-neutral-900 transition"
                  >
                    Ready to Wear
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2.5">
              <div className="text-zinc-900 text-xs font-medium">Support</div>
              <ul className="space-y-1.5">
                <li>
                  <Link
                    href="/contact"
                    className="text-neutral-500 text-xs hover:text-neutral-900 transition"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-neutral-500 text-xs hover:text-neutral-900 transition"
                  >
                    FAQ / Customer Care
                  </Link>
                </li>
                <li>
                  <Link
                    href="/returns-shipping"
                    className="text-neutral-500 text-xs hover:text-neutral-900 transition"
                  >
                    Returns &amp; Shipping
                  </Link>
                </li>
                <li>
                  <Link
                    href="/payment-policies"
                    className="text-neutral-500 text-xs hover:text-neutral-900 transition"
                  >
                    Payment &amp; Policies
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2.5">
              <div className="text-zinc-900 text-xs font-medium">Brand</div>
              <ul className="space-y-1.5">
                <li>
                  <Link
                    href="/about"
                    className="text-neutral-500 text-xs hover:text-neutral-900 transition"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/authenticity"
                    className="text-neutral-500 text-xs hover:text-neutral-900 transition"
                  >
                    Our Commitment to Authenticity
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sourcing-request"
                    className="text-neutral-500 text-xs hover:text-neutral-900 transition"
                  >
                    Sourcing Request
                  </Link>
                </li>
                <li>
                  <Link
                    href="/account"
                    className="text-neutral-500 text-xs hover:text-neutral-900 transition"
                  >
                    Account / Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Divider */}
        <div className="my-8 h-px w-full bg-neutral-200" />
        {/* Bottom bar */}
        <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-neutral-500 text-xs">
            © 2025 Closet Full of Coco. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://instagram.com"
              className="text-neutral-500 text-xs hover:text-neutral-900 transition"
            >
              Instagram
            </a>
            <span className="hidden sm:inline text-neutral-300">•</span>
            <Link
              href="/privacy"
              className="text-neutral-500 text-xs hover:text-neutral-900 transition"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-neutral-500 text-xs hover:text-neutral-900 transition"
            >
              Terms
            </Link>
            <Link
              href="/cookies"
              className="text-neutral-500 text-xs hover:text-neutral-900 transition"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}