// pages/404.jsx
import Link from "next/link";

export default function Custom404() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
      <h1 className="text-7xl font-bold text-zinc-900">404</h1>
      <h2 className="mt-4 text-2xl font-medium text-neutral-700">
        Page Not Found
      </h2>
      <p className="mt-2 max-w-md text-neutral-500">
        Sorry, we couldn’t find the page you’re looking for.  
        It may have been moved, deleted, or never existed.
      </p>
      <div className="mt-6">
        <Link
          href="/"
          className="rounded-none border border-black bg-black px-6 py-3 text-sm font-medium uppercase tracking-wide text-white transition hover:bg-white hover:text-black"
        >
          Go Back Home
        </Link>
      </div>
    </main>
  );
}
