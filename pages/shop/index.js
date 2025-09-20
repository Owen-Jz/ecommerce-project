"use client";
import { motion } from "framer-motion";
import NavbarCFC from "../components/Navabar";
import FooterCFC from "../components/Footer";

export default function SourcingRequestPage() {
  const processSteps = [
    {
      step: "1. Submit Your Request",
      detail: "Tell us what you’re searching for.",
    },
    {
      step: "2. Personal Consultation",
      detail: "We’ll review and schedule a quick chat to refine preferences, budget, and timeline.",
    },
    {
      step: "3. We Source & Confirm",
      detail: "We tap into our global network to locate your item, then confirm availability and pricing.",
    },
    {
      step: "4. Secure With Deposit",
      detail: "A 25% deposit reserves the item. Balance is due within 48 hours once secured.",
    },
    {
      step: "5. Authentication & Delivery",
      detail: "Each piece is authenticated and packaged. Please allow ~2 weeks for delivery after sourcing.",
    },
  ];

  return (
    <>
      <NavbarCFC />
      <main className="bg-white">
        {/* ===== HERO ===== */}
        <section className="relative min-h-[60vh] flex items-center justify-center text-center">
          <div className="absolute inset-0 -z-10">
            <img
              src="/Slide2.jpg"
              alt=""
              className="h-full w-full object-cover object-center"
              draggable="false"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <h1
              className="text-white text-3xl sm:text-4xl md:text-5xl font-normal leading-tight"
              style={{ fontFamily: '"Plantagenet Cherokee", serif' }}
            >
              Make a Request For Your Dream Coco
            </h1>
            <p className="text-white/90 text-sm sm:text-base">
              Whether you’re hunting for a rare collector’s piece or filling a long-standing gap
              in your wardrobe, CFC sources the most coveted Chanel treasures just for you.
            </p>
          </div>
        </section>

        {/* ===== PROCESS + FORM ===== */}
        <section className="mt-12 sm:mt-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Process */}
            <div className="space-y-6">
              <h2
                className="text-2xl sm:text-3xl font-normal text-neutral-900"
                style={{ fontFamily: '"Plantagenet Cherokee", serif' }}
              >
                Our Sourcing Process
              </h2>
              <ul className="space-y-5">
                {processSteps.map((item) => (
                  <li key={item.step}>
                    <p className="text-neutral-900 font-medium text-sm sm:text-base">
                      {item.step}
                    </p>
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
              className="bg-white border border-neutral-200 rounded-xl shadow-sm p-6 sm:p-8 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="First Name *" className="input" required />
                <input type="text" placeholder="Last Name *" className="input" required />
              </div>
              <input type="email" placeholder="Email *" className="input" required />
              <input type="tel" placeholder="Phone" className="input" />
              <input
                type="text"
                placeholder="Item Name or Description, Size, Color *"
                className="input"
                required
              />

              {/* Condition checkboxes */}
              <fieldset className="space-y-2">
                <legend className="text-sm font-medium text-neutral-800">Condition *</legend>
                <div className="flex flex-wrap gap-4 text-sm text-neutral-600">
                  {[
                    "Brand New",
                    "Excellent Pre-Loved",
                    "Minor Signs of Wear",
                    "Any Condition",
                  ].map((label) => (
                    <label key={label} className="flex items-center gap-2">
                      <input type="checkbox" name="condition" value={label} />
                      {label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="date" placeholder="Preferred Timeline *" className="input" required />
                <input type="text" placeholder="Budget *" className="input" required />
              </div>

              <textarea placeholder="Message" rows="4" className="input" />

              <div>
                <label className="block text-sm text-neutral-600 mb-1">
                  Upload Reference File
                </label>
                <input type="file" className="block w-full text-sm text-neutral-700" />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-black transition"
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

/* Tailwind form styling */
const input =
  "w-full rounded-md border border-neutral-300 px-3 py-2 text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/20";
