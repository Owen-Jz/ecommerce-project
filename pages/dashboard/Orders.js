// components/dashboard/OrdersCFC.jsx
"use client";

import Link from "next/link";

const ORDERS = [
  {
    id: "CCF-12345",
    placed: "22 Aug 2025",
    total: "$6,500",
    shipTo: "Owen, Lagos, NG",
    status: "Delivered",
  },
  {
    id: "CCF-12346",
    placed: "04 Sep 2025",
    total: "$3,200",
    shipTo: "Owen, Lagos, NG",
    status: "Shipped",
  },
  {
    id: "CCF-12347",
    placed: "10 Sep 2025",
    total: "$2,150",
    shipTo: "Owen, Lagos, NG",
    status: "Processing",
  },
];

function StatusPill({ status }) {
  const map = {
    Delivered: "bg-emerald-50 text-green-700",
    Shipped: "bg-sky-50 text-sky-700",
    Processing: "bg-amber-50 text-amber-700",
  };
  const cls = map[status] || "bg-neutral-100 text-neutral-700";
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${cls}`}>{status}</span>
  );
}

export default function OrdersCFC() {
  return (
    <div className="flex flex-col gap-4">
      {ORDERS.map((o) => (
        <div
          key={o.id}
          className="w-full rounded-xl border border-neutral-300 bg-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
        >
          {/* thumb placeholder */}
          <div className="h-12 w-12 rounded-md bg-gray-200 shrink-0" />

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <p className="text-zinc-900 text-sm font-medium">Order {o.id}</p>
              <p className="text-neutral-500 text-xs">Placed on {o.placed}</p>
            </div>
            <div>
              <p className="text-neutral-500 text-xs">Total: {o.total}</p>
              <p className="text-neutral-500 text-xs">Ship to: {o.shipTo}</p>
            </div>
            <div className="flex items-center gap-3 sm:justify-end">
              <StatusPill status={o.status} />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:ml-auto">
            <Link
              href={`/account/orders/${o.id}`}
              className="px-4 py-2 rounded-md bg-neutral-800 text-white text-xs font-medium hover:opacity-90"
            >
              View Details
            </Link>
            <Link
              href={`/account/orders/${o.id}/track`}
              className="px-4 py-2 rounded-md border border-neutral-300 bg-neutral-100 text-zinc-900 text-xs font-medium hover:bg-neutral-200"
            >
              Track
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
