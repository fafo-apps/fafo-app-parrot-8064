import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase } from "@/app/utils/supabase";

interface Params {
  params: { slug: string };
}

type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_image_url: string | null;
  published_at: string | null;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { data } = await supabase
    .from("posts")
    .select("title, excerpt")
    .eq("slug", params.slug)
    .eq("status", "published")
    .maybeSingle();

  if (!data) {
    return {
      title: "Post | Japan Travel Journal",
      description: "A story from Japan",
    };
  }

  return {
    title: `${data.title} | Japan Travel Journal`,
    description: data.excerpt ?? "A story from Japan",
  };
}

export default async function PostPage({ params }: Params) {
  const { data, error } = await supabase
    .from("posts")
    .select("id,title,slug,excerpt,content,cover_image_url,published_at")
    .eq("slug", params.slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    // In a real app you might log this; for now we fail gracefully
  }

  const post = data as Post | null;
  if (!post) return notFound();

  const paragraphs = (post.content ?? "").trim().length
    ? (post.content as string).split(/\n{2,}/)
    : [];

  return (
    <article className="mx-auto max-w-3xl px-6 pt-10 pb-24">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          {post.published_at ? new Date(post.published_at).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" }) : "—"}
        </p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">{post.title}</h1>
        {post.excerpt && (
          <p className="mt-3 text-zinc-700 dark:text-zinc-300">{post.excerpt}</p>
        )}
      </div>

      {post.cover_image_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.cover_image_url}
          alt={post.title}
          className="mb-8 w-full rounded-xl object-cover aspect-[16/9]"
        />
      )}

      <div className="prose prose-zinc dark:prose-invert max-w-none">
        {paragraphs.length > 0 ? (
          paragraphs.map((para, i) => (
            <p key={i} className="leading-7">{para}</p>
          ))
        ) : (
          <p className="text-zinc-600 dark:text-zinc-300">
            Story coming soon.
          </p>
        )}
      </div>
    </article>
  );
}
