"use client";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import NavMenu from "./nav/NavMenu";
import NavPreview from "./nav/NavPreview";
import SearchBar from "./nav/SearchBar";

export default function NavbarCFC({ blurAmount = 8, scrollToCategories }) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [onLight, setOnLight] = useState(false);
  const [hoverKey, setHoverKey] = useState(null);
  const [activeKey, setActiveKey] = useState(null);
  const shellRef = useRef(null);
  const buttonRef = useRef(null);
  const searchButtonRef = useRef(null);
  const searchRef = useRef(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Debounced activeKey update
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveKey(hoverKey);
    }, 100);
    return () => clearTimeout(timer);
  }, [hoverKey]);

  // Memoized preview content
  const previews = useMemo(
    () => ({
      "shop-all": {
        title: "Shop All",
        src: "/Slide1.png",
        tagline: "The entire world of Coco, in one place.",
        blurb:
          "Browse every category at once — newly arrived pieces, rare archive finds, and timeless bestsellers.",
      },
      new: {
        title: "New",
        src: "/Closet.jpg",
        tagline: "Just in, freshly authenticated.",
        blurb:
          "Be first to discover this week’s arrivals — hand-vetted items with detailed condition notes.",
      },
      handbags: {
        title: "Handbags",
        src: "/bag-hero.jpg",
        tagline: "Iconic silhouettes. Collector-grade condition.",
        blurb:
          "From Classic Flap to runway pieces — curated for craftsmanship, provenance, and rarity.",
      },
      accessories: {
        title: "Accessories",
        src: "/acc1.jpg",
        tagline: "Finishing touches that make the look.",
        blurb:
          "Jewelry, belts, scarves, charms — refined accents to elevate everyday styling.",
      },
      "ready-to-wear": {
        title: "Ready to Wear",
        src: "/dress2.jpg",
        tagline: "Tailored, timeless, impeccably cut.",
        blurb:
          "Elevated staples and standout statements — premium fabrics, modern tailoring, flawless fit.",
      },
    }),
    []
  );

  // Memoized menu items
  const items = useMemo(
    () => [
      { key: "shop-all", label: "Shop All", href: "/shop" },
      { key: "new", label: "New", href: "/new" },
      { key: "handbags", label: "Handbags", href: "/bags" },
      { key: "accessories", label: "Accessories", href: "/accessories" },
      { key: "ready-to-wear", label: "Ready to Wear", href: "/ready-to-wear" },
      { key: "sourcing-requests", label: "Sourcing Requests", href: "/sourcing-request" },
      { key: "about", label: "About", href: "/about" },
    ],
    []
  );

  // Memoized preview-allowed set
  const previewAllowed = useMemo(
    () => new Set(["shop-all", "new", "handbags", "accessories", "ready-to-wear"]),
    []
  );

  // Close menu and search on Escape key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close menu or search on outside click
  const handleOutsideClick = useCallback((e) => {
    if (open && shellRef.current && buttonRef.current && !shellRef.current.contains(e.target) && !buttonRef.current.contains(e.target)) {
      console.log("Closing navbar due to outside click");
      setOpen(false);
    }
    if (
      searchOpen &&
      searchRef.current &&
      searchButtonRef.current &&
      !searchRef.current.contains(e.target) &&
      !searchButtonRef.current.contains(e.target)
    ) {
      console.log("Closing search bar due to outside click");
      setSearchOpen(false);
    }
  }, [open, searchOpen]);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [handleOutsideClick]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open || searchOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open, searchOpen]);

  // Switch navbar style after leaving hero
  useEffect(() => {
    if (!isHome) {
      setOnLight(true);
      return;
    }
    const hero = document.getElementById("hero");
    const update = () => setOnLight(window.scrollY > 8);
    let observer;
    if (hero && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => setOnLight(!entries[0].isIntersecting),
        { root: null, threshold: 0.01, rootMargin: "-56px 0px 0px 0px" }
      );
      observer.observe(hero);
    } else {
      update();
      window.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update, { passive: true });
    }
    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [isHome]);

  // Theme classes
  const textClass = onLight
    ? "text-neutral-900"
    : isHome
    ? "text-white"
    : "text-neutral-900";
  const borderClass = isHome && !onLight ? "border-transparent" : "border-neutral-200/80";
  const bgClass = isHome && !onLight
    ? "bg-transparent shadow-none"
    : "bg-white/85 backdrop-blur-md shadow-sm";

  // Search handler
  const handleSearch = useCallback((e) => {
    e.preventDefault();
    const query = e.target.elements.search.value;
    console.log("Search query:", query);
    setSearchOpen(false);
    // TODO: Implement search logic (e.g., navigate to /search?query=...)
  }, []);

  return (
    <>
      <header
        id="cfc-header"
        className={`fixed inset-x-0 top-0 z-[100] border-b ${borderClass} ${bgClass} transition-all duration-500 ease-in-out`}
        style={{
          backdropFilter: isHome && !onLight ? "none" : `blur(${blurAmount}px)`,
          WebkitBackdropFilter: isHome && !onLight ? "none" : `blur(${blurAmount}px)`,
        }}
      >
        <nav
          className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
          aria-label="Primary"
        >
          {/* Left: Menu Button */}
          <div className="flex items-center">
            <button
              ref={buttonRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="cfc-combined-shell"
              className={`inline-flex items-center gap-2 p-0 text-sm font-medium ${textClass} hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/10`}
            >
              <svg
                className={`h-5 w-5 ${textClass}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path strokeWidth="1.5" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
          {/* Center: Brand */}
          <Link
            href="/"
            className={`select-none text-lg sm:text-xl md:text-2xl font-normal leading-none tracking-tight ${textClass}`}
            style={{
              fontFamily:
                'Didot, "Bodoni Moda", "Didot LT STD", "Times New Roman", serif',
            }}
          >
            Closet Full of Coco
          </Link>
          {/* Right: Account + Cart + Search */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/account"
              className={`inline-flex items-center gap-1.5 p-0 ${textClass} hover:opacity-80`}
              aria-label="Account"
            >
              <svg
                className={`h-5 w-5 ${textClass}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" strokeWidth="1.5" />
                <path d="M4 20a8 8 0 0 1 16 0" strokeWidth="1.5" />
              </svg>
            </Link>
            <Link
              href="/cart"
              className={`inline-flex items-center gap-1.5 p-0 ${textClass} hover:opacity-80`}
              aria-label="Cart"
            >
              <svg
                className={`h-5 w-5 ${textClass}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M6 8h12l-1 11H7L6 8Z" strokeWidth="1.5" />
                <path d="M9 8a3 3 0 1 1 6 0" strokeWidth="1.5" />
              </svg>
            </Link>
            <button
              ref={searchButtonRef}
              type="button"
              onClick={() => setSearchOpen(true)}
              className={`inline-flex items-center gap-1.5 p-0 ${textClass} hover:opacity-80`}
              aria-label="Search"
            >
              <svg
                className={`h-5 w-5 ${textClass}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8" strokeWidth="1.5" />
                <path d="M16.5 16.5L21 21" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        </nav>
      </header>
      <NavMenu
        items={items}
        open={open}
        setOpen={setOpen}
        setHoverKey={setHoverKey}
        previewAllowed={previewAllowed}
        shellRef={shellRef}
        buttonRef={buttonRef}
      />
      <NavPreview activeKey={activeKey} previews={previews} />
      <SearchBar
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        searchRef={searchRef}
        searchButtonRef={searchButtonRef}
        handleSearch={handleSearch}
      />
    </>
  );
}
