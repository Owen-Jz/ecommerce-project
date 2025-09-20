// app/account/page.jsx
"use client";

import { useState } from "react";
import NavbarCFC from "../components/Navabar";
import FooterCFC from "../components/Footer";
import OrdersCFC from "../dashboard/Orders";
import WishlistCFC from "../dashboard/Wishlist";
import AccountSettingsCFC from "../dashboard/Settings";
const TABS = [
  { key: "orders", label: "Orders" },
  { key: "wishlist", label: "Wishlist" },
  { key: "settings", label: "Account Settings" },
];

export default function AccountPage() {
  const [active, setActive] = useState("orders"); // default tab

  return (
    <>
      <NavbarCFC />

      <main className="bg-white">
        {/* Header */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28">
          <div className="flex flex-col gap-6">
            {/* Title */}
            <div className="flex flex-col">
              <h1 className="text-zinc-900 text-2xl sm:text-3xl font-bold">My Closet</h1>
              <p className="text-neutral-500 text-xs sm:text-sm">Welcome back, Sharon</p>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 border-b border-neutral-200 pb-3">
              {TABS.map((t) => {
                const isActive = active === t.key;
                return (
                  <button
                    key={t.key}
                    onClick={() => setActive(t.key)}
                    className={[
                      "text-sm transition-colors",
                      isActive ? "text-zinc-900 font-medium" : "text-neutral-500 hover:text-zinc-900",
                    ].join(" ")}
                    aria-pressed={isActive}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {active === "orders" && <OrdersCFC />}
          {active === "wishlist" && <WishlistCFC />}
          {active === "settings" && <AccountSettingsCFC />}
        </section>
      </main>

      <FooterCFC />
    </>
  );
}
