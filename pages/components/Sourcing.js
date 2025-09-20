"use client";
import React from "react";
import Image from "next/image"; // Import Image from next/image
import Link from "next/link"; // Import Link from next/link

export default function SourcingRequestCFC() {
  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-10">
        {/* Left image */}
        <div className="w-full lg:w-[560px] h-96 overflow-hidden relative">
          <Image
            src="/Source.png" // 🔄 replace with your real image later
            alt="Sourcing request placeholder"
            fill
            className="object-cover object-center"
            draggable={false}
          />
        </div>
        {/* Right text content */}
        <div className="flex-1 flex flex-col items-start gap-5">
          <h2
            className="text-zinc-900 text-3xl sm:text-4xl md:text-5xl font-normal leading-tight"
            style={{ fontFamily: '"Plantagenet Cherokee", serif' }}
          >
            Looking for<br /> Something Rare?
          </h2>
          <p className="text-neutral-500 text-base sm:text-lg max-w-xl">
            From elusive classics to one-of-a-kind finds, our team will help you
            locate and secure Chanel pieces tailored to your request —
            authenticated, discreet, and delivered with care.
          </p>
          {/* CTA Button */}
          <Link
            href="/sourcing-request"
            className="mt-4 inline-flex items-center justify-center px-5 py-3 bg-white text-sm font-medium text-zinc-900 outline outline-1 outline-black transition hover:bg-black hover:text-white"
          >
            Submit a Request
          </Link>
        </div>
      </div>
    </section>
  );
}