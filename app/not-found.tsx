import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h2 className="text-2xl font-semibold">Page not found</h2>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        The page you’re looking for doesn’t exist.
      </p>
      <div className="mt-6">
        <Link href="/" className="inline-flex items-center rounded-full bg-black text-white px-5 py-2 text-sm hover:opacity-90 dark:bg-white dark:text-black">
          Back to home
        </Link>
      </div>
    </div>
  );
}
