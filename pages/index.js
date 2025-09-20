"use client";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NavbarCFC from "./components/Navabar";
import HeroCFC from "./components/Hero";
import CategoriesCFC from "./components/Categories";
import SourcingRequestCFC from "./components/Sourcing";
import VideoShowcaseCFC from "./components/Videoshowcase";
import AuthenticityCFC from "./components/Authenticity";
import FooterCFC from "./components/Footer";
import Preloader from "./components/Preloader";
import NewProducts from "./components/NewProduct";
import SecondSlide from "./components/Slide22";
import PrivacyCookiesModal from "./components/CookieModal";
import ThirdSlide from "./components/Slide33";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const categoriesRef = useRef(null);

  useEffect(() => {
    // Prevent scroll during loading
    document.body.style.overflow = isLoading ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLoading]);

  // Smooth scroll handler for navbar or other navigation
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="relative z-0"
      >
        {/* Navbar always on top */}
        <NavbarCFC scrollToCategories={() => scrollToSection(categoriesRef)} />

        <main className="relative z-0">
          {/* Hero Section */}
          <section id="hero" className="relative z-10">
            <HeroCFC categoriesRef={categoriesRef} />
          </section>

          {/* New Products */}
          <section className="relative z-10">
            <NewProducts />
          </section>

          {/* Second Slide */}
          <section className="relative z-0">
            <SecondSlide />
          </section>

          {/* Third Slide (Parallax Categories) */}
          <section className="relative z-0">
            <ThirdSlide />
          </section>

          {/* Categories Section */}
          <section
            id="categories"
            ref={categoriesRef}
            className="pt-20 md:pt-24 min-h-screen relative z-10"
          >
            <CategoriesCFC />
          </section>

          {/* Sourcing */}
          <section className="relative z-10">
            <SourcingRequestCFC />
          </section>

          {/* Authenticity */}
          <section className="relative z-10">
            <AuthenticityCFC />
          </section>

          {/* Video Showcase */}
          <section className="relative z-10">
            <VideoShowcaseCFC />
          </section>

          {/* Footer */}
          <section className="relative z-10">
            <FooterCFC />
          </section>
        </main>
      </motion.div>

      <PrivacyCookiesModal showAfter={!isLoading} delayMs={500} />
    </>
  );
}