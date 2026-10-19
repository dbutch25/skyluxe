import type { Metadata } from "next";
import Link from "next/link";
import { fetchPublishedPosts } from "@/lib/data";
import PostCard from "@/components/news/PostCard";

export const metadata: Metadata = {
  title: "News & Updates | Skyluxe Roofing & Sheet Metal",
  description:
    "Project updates, community news, and roofing tips from Skyluxe Roofing & Sheet Metal, serving the Greater Toronto Area.",
  alternates: { canonical: "/news" },
};

export default async function NewsPage() {
  const posts = await fetchPublishedPosts();

  return (
    <>
      {/* Hero band — padding clears the 112px header */}
      <section className="relative w-full overflow-hidden bg-primary-950 pt-44 pb-16 sm:pb-20">
        <div className="absolute left-0 top-1/3 bottom-1/4 w-1 bg-secondary-600" aria-hidden="true" />
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 sm:px-10">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-secondary-400" />
            <span className="font-montserrat text-xs uppercase tracking-[0.18em] text-secondary-300">
              Latest News &amp; Updates
            </span>
          </div>
          <h1
            className="m-0 font-julius font-normal leading-tight text-white"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}
          >
            On the Job &amp; In the Community
          </h1>
          <p className="m-0 max-w-2xl font-montserrat text-base font-light leading-relaxed text-white/75">
            Project updates from across the GTA, news from the Skyluxe team, and
            practical advice for building owners and homeowners.
          </p>
        </div>
      </section>

      <section className="w-full bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          {posts.length > 0 ? (
            <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 py-16 text-center">
              <p className="m-0 font-julius text-2xl text-primary-950">No posts yet</p>
              <p className="m-0 font-montserrat text-sm text-gray-500">
                Check back soon for project updates and news.
              </p>
              <Link
                href="/projects"
                className="mt-2 font-montserrat text-sm font-semibold text-secondary-800 hover:text-secondary-900"
              >
                See our projects instead
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
