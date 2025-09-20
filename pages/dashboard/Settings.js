// components/dashboard/AccountSettingsCFC.jsx
"use client";

export default function AccountSettingsCFC() {
  return (
    <div className="flex flex-col gap-8">
      {/* Personal Info */}
      <div className="w-full rounded-xl border border-neutral-300 bg-white p-5">
        <h3 className="text-zinc-900 text-lg font-medium">Personal Information</h3>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-neutral-600 text-xs font-medium">Full Name</label>
            <input
              defaultValue="Owen A."
              className="h-11 w-full rounded-lg border border-neutral-300 px-3 text-sm text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-neutral-600 text-xs font-medium">Email Address</label>
            <input
              type="email"
              defaultValue="owen@example.com"
              className="h-11 w-full rounded-lg border border-neutral-300 px-3 text-sm text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-neutral-600 text-xs font-medium">Phone Number</label>
            <input
              defaultValue="+234 800 000 0000"
              className="h-11 w-full rounded-lg border border-neutral-300 px-3 text-sm text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-neutral-600 text-xs font-medium">Date of Birth (optional)</label>
            <input
              placeholder="DD / MM / YYYY"
              className="h-11 w-full rounded-lg border border-neutral-300 px-3 text-sm text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>
        </div>

        <div className="mt-4">
          <button className="px-4 py-2.5 rounded-lg bg-neutral-800 text-white text-xs font-medium hover:opacity-90">
            Update Information
          </button>
        </div>
      </div>

      {/* Password */}
      <div className="w-full rounded-xl border border-neutral-300 bg-white p-5">
        <h3 className="text-zinc-900 text-lg font-medium">Security</h3>

        <div className="mt-4 grid grid-cols-1 gap-4 max-w-3xl">
          <div className="flex flex-col gap-2">
            <label className="text-neutral-600 text-xs font-medium">Current Password</label>
            <input
              type="password"
              defaultValue="••••••••"
              className="h-11 w-full rounded-lg border border-neutral-300 px-3 text-sm text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-neutral-600 text-xs font-medium">New Password</label>
            <input
              type="password"
              defaultValue="••••••••"
              className="h-11 w-full rounded-lg border border-neutral-300 px-3 text-sm text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>

          <div>
            <button className="px-4 py-2.5 rounded-lg bg-neutral-800 text-white text-xs font-medium hover:opacity-90">
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
