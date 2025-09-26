"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import NavbarCFC from "../components/Navabar";
import FooterCFC from "../components/Footer";

const DIDOT_STACK = 'Didot, "Bodoni Moda", "Didot LT STD", "Times New Roman", serif';

// Straight-edge inputs everywhere
const inputStyles =
  "w-full rounded-none border border-neutral-300 px-4 py-3 text-sm text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 transition";

export default function SourcingRequestPage() {
  const processSteps = [
    { step: "1. Submit Your Request", detail: "Tell us what you’re searching for." },
    { step: "2. Personal Consultation", detail: "We’ll review and schedule a quick chat to refine preferences, budget, and timeline." },
    { step: "3. We Source & Confirm", detail: "We tap into our global network to locate your item, then confirm availability and pricing." },
    { step: "4. Secure With Deposit", detail: "A 25% deposit reserves the item. Balance is due within 48 hours once secured." },
    { step: "5. Authentication & Delivery", detail: "Each piece is authenticated and packaged. Please allow ~2 weeks for delivery after sourcing." },
  ];

  // simple handle normalizer
  function normalizeHandle(v) {
    return (v || "").trim().replace(/^@+/, "");
  }

  function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);

    // normalize IG handle before sending
    const rawIg = fd.get("instagram_handle") || "";
    fd.set("instagram_handle", normalizeHandle(rawIg));

    // build payload (example)
    const payload = Object.fromEntries(fd.entries());
    console.log("Sourcing request submitted:", payload);

    // TODO: send to your API endpoint
    // await fetch("/api/sourcing-request", { method: "POST", body: fd });
  }

  return (
    <>
      <NavbarCFC />
      <main className="bg-white">
        {/* ===== HERO ===== */}
        <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center text-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/Slide3.png"
              alt="Sourcing request hero background"
              fill
              priority
              quality={80}
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
            <h1
              className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal leading-tight"
              style={{ fontFamily: DIDOT_STACK }}
            >
              Make a Request For Your Dream Coco
            </h1>
            <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              Whether you’re hunting for a rare collector’s piece or filling a long-standing gap
              in your wardrobe, CFC sources the most coveted Chanel treasures just for you.
            </p>
          </div>
        </section>

        {/* ===== PROCESS + FORM ===== */}
        <section className="py-10 sm:py-14 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Process */}
            <div className="space-y-6">
              <h2
                className="text-xl sm:text-2xl md:text-3xl font-normal text-neutral-900"
                style={{ fontFamily: DIDOT_STACK }}
              >
                Our Sourcing Process
              </h2>
              <ul className="space-y-4">
                {processSteps.map((item) => (
                  <li key={item.step} className="space-y-1">
                    <p className="text-neutral-900 font-medium text-sm sm:text-base">{item.step}</p>
                    <p className="text-neutral-600 text-sm sm:text-base">{item.detail}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white border border-neutral-200 p-5 sm:p-6 lg:p-8 space-y-5 shadow-sm rounded-none"
              onSubmit={handleSubmit}
              style={{ borderRadius: 0 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input name="first_name" type="text" placeholder="First Name *" className={inputStyles} required />
                <input name="last_name" type="text" placeholder="Last Name *" className={inputStyles} required />
              </div>

              <input name="email" type="email" placeholder="Email *" className={inputStyles} required />
              <input name="phone" type="tel" placeholder="Phone" className={inputStyles} />

              {/* Instagram handle (added) */}
              <div>
                <label className="block text-sm text-neutral-800 mb-1">Instagram Handle (optional)</label>
                <div className="border border-neutral-300 px-0 py-0 rounded-none" style={{ borderRadius: 0 }}>
                  <div className="flex items-center">
                    <span className="px-3 py-3 text-sm text-neutral-500 select-none">@</span>
                    <input
                      name="instagram_handle"
                      type="text"
                      inputMode="text"
                      placeholder="yourhandle"
                      className="w-full rounded-none border-0 px-0 py-3 pr-4 text-sm text-neutral-800 placeholder-neutral-400 outline-none focus:ring-0"
                    />
                  </div>
                </div>
                <p className="mt-1 text-xs text-neutral-500">
                  We use this to review preferences and communicate faster.
                </p>
              </div>

              <input
                name="query"
                type="text"
                placeholder="Item Name or Description, Size, Color *"
                className={inputStyles}
                required
              />

              {/* Condition checkboxes */}
              <fieldset className="space-y-2">
                <legend className="text-sm font-medium text-neutral-800">Condition *</legend>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {["Brand New", "Excellent Pre-Loved", "Minor Signs of Wear", "Any Condition"].map(
                    (label) => (
                      <label key={label} className="flex items-center gap-2 text-sm text-neutral-600">
                        <input
                          type="checkbox"
                          name="condition"
                          value={label}
                          className="h-4 w-4 text-neutral-900 border-neutral-300 focus:ring-neutral-900"
                        />
                        {label}
                      </label>
                    )
                  )}
                </div>
              </fieldset>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input name="timeline" type="date" placeholder="Preferred Timeline *" className={inputStyles} required />
                <input name="budget" type="text" placeholder="Budget *" className={inputStyles} required />
              </div>

              <textarea name="message" placeholder="Message" rows={4} className={inputStyles} />

              <div>
                <label className="block text-sm font-medium text-neutral-800 mb-1">
                  Upload Reference File
                </label>
                <input
                  name="reference_file"
                  type="file"
                  className="block w-full rounded-none text-sm text-neutral-700 border border-neutral-300 p-2.5 outline-none focus:ring-2 focus:ring-neutral-900 file:bg-neutral-100 file:border-0 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-neutral-800 file:mr-3"
                  style={{ borderRadius: 0 }}
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-neutral-900 text-white text-sm font-medium border border-neutral-900 hover:bg-neutral-800 transition focus:ring-2 focus:ring-neutral-900 focus:outline-none rounded-none"
                style={{ borderRadius: 0 }}
              >
                Submit Request
              </button>
            </motion.form>
          </div>
        </section>
      </main>
      <FooterCFC />
    </>
  );
}
