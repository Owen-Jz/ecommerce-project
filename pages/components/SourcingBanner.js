"use client";
import Link from "next/link";
import Image from "next/image";

const DIDOT_STACK = 'Didot, "Bodoni Moda", "Didot LT STD", "Times New Roman", serif';

export default function SourcingBanner({
  imageSrc = "/banners/sourcing-gold.jpg",
  title = "Still looking for the one?",
  subtitle = "Let us find your dream Chanel",
  ctaText = "SOURCING REQUESTS",
  href = "/sourcing-request",
  overlayOpacity = 0.35,
  className = "",
}) {
  return (
    // FULL-BLEED WRAPPER: breaks out of any centered container
    <section
      className={[
        "relative w-screen overflow-hidden bg-black",
        "aspect-[1083/304] sm:aspect-[1083/304] lg:aspect-[1083/304]",
        "min-h-[180px] sm:min-h-[220px] lg:min-h-[260px]",
        className,
      ].join(" ")}
      style={{
        borderRadius: 0,
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
      }}
      aria-label="Sourcing requests promotional banner"
    >
      {/* Background image */}
      <Image
        src={imageSrc}
        alt=""
        fill
        priority={false}
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Left-to-right dark gradient for contrast */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.75) 22%, rgba(0,0,0,0.45) 42%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.05) 78%, rgba(0,0,0,0) 100%)",
          opacity: overlayOpacity,
        }}
      />

      {/* Content (aligned to left, with page-padding feel) */}
      <div className="absolute inset-0">
        <div className="h-full w-full px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="w-full max-w-md text-left">
            <h2
              className="text-white text-3xl sm:text-4xl leading-tight"
              style={{ fontFamily: DIDOT_STACK, fontWeight: 400 }}
            >
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1 text-white/85 text-sm sm:text-base">{subtitle}</p>
            )}

            <div className="mt-4">
              <Link
                href={href}
                aria-label={ctaText}
                className="inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-medium tracking-wide text-white border border-white hover:bg-white hover:text-black transition-colors"
                style={{ borderRadius: 0 }}
              >
                {ctaText}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
