import Link from "next/link";
import { supabase } from "./utils/supabase";

export const revalidate = 60; // Cache homepage briefly for speed

type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  published_at: string | null;
};

export default async function Home() {
  const { data, error } = await supabase
    .from("posts")
    .select("id,title,slug,excerpt,cover_image_url,published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(9);

  const posts = (data as Post[] | null) ?? [];

  return (
    <div className="bg-gradient-to-b from-white to-zinc-50 dark:from-black dark:to-zinc-950">
      <section className="mx-auto max-w-4xl px-6 pt-14 pb-10">
        <div className="rounded-2xl bg-[linear-gradient(120deg,rgba(255,99,71,.08),rgba(255,215,0,.08))] dark:bg-[linear-gradient(120deg,rgba(255,99,71,.12),rgba(255,215,0,.12))] p-8 sm:p-10 border border-black/5 dark:border-white/10">
          <p className="text-sm uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Travel Blog</p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">Japan Travel Journal</h1>
          <p className="mt-3 text-zinc-700 dark:text-zinc-300 max-w-2xl">
            Real stories, hidden cafes, and scenic walks across Tokyo, Kyoto, Hokkaido and beyond.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-20">
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-200">
            There was a problem loading posts. Please try again.
          </div>
        )}

        {posts.length === 0 ? (
          <div className="rounded-xl border border-black/5 dark:border-white/10 p-10 text-center text-zinc-600 dark:text-zinc-300">
            <p className="mb-2 text-lg font-medium">No posts yet</p>
            <p>Add your first story in your Supabase table to see it here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/posts/${post.slug}`}
                className="group rounded-xl overflow-hidden border border-black/5 dark:border-white/10 bg-white dark:bg-zinc-950 hover:shadow-md transition-shadow"
              >
                {post.cover_image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.cover_image_url}
                    alt={post.title}
                    className="h-44 w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-44 w-full bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800" />
                )}
                <div className="p-5">
                  <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    {post.published_at ? new Date(post.published_at).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "—"}
                  </p>
                  <h2 className="mt-1 text-lg font-semibold group-hover:underline underline-offset-4">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300 line-clamp-2">{post.excerpt}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
