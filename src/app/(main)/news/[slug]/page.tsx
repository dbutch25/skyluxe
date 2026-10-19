import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchPostBySlug, fetchPublishedPosts } from "@/lib/data";
import TiptapContent from "@/components/news/TiptapContent";
import PostCard from "@/components/news/PostCard";
import { formatPostDate, isoDate } from "@/components/news/format";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const SITE_URL = "https://www.skyluxeroofing.com";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);
  if (!post) return { title: "News | Skyluxe Roofing & Sheet Metal" };

  return {
    title: `${post.title} | Skyluxe Roofing & Sheet Metal`,
    description: post.excerpt,
    alternates: { canonical: `/news/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/news/${post.slug}`,
      type: "article",
      publishedTime: isoDate(post.publishedAt),
      images: post.coverImageUrl ? [{ url: post.coverImageUrl, alt: post.coverImageAlt || post.title }] : undefined,
    },
  };
}

/** Article body styles (the Tailwind typography plugin isn't enabled). */
const articleClasses = [
  "font-montserrat text-[17px] leading-8 text-gray-700",
  "[&_p]:my-5",
  "[&_h2]:font-julius [&_h2]:font-normal [&_h2]:text-primary-950 [&_h2]:text-3xl [&_h2]:leading-tight [&_h2]:mt-12 [&_h2]:mb-4",
  "[&_h3]:font-julius [&_h3]:font-normal [&_h3]:text-primary-950 [&_h3]:text-2xl [&_h3]:mt-10 [&_h3]:mb-3",
  "[&_h4]:font-semibold [&_h4]:text-primary-950 [&_h4]:mt-8 [&_h4]:mb-2",
  "[&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1.5 [&_li_p]:my-0",
  "[&_li]:marker:text-secondary-600",
  "[&_blockquote]:my-8 [&_blockquote]:border-l-4 [&_blockquote]:border-secondary-600 [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-primary-700",
  "[&_strong]:font-semibold [&_strong]:text-primary-950",
  "[&_hr]:my-10 [&_hr]:border-gray-200",
  "[&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-primary-50 [&_pre]:p-4 [&_pre]:text-sm",
  "[&_code]:rounded [&_code]:bg-primary-50 [&_code]:px-1 [&_code]:text-[0.9em]",
].join(" ");

export default async function NewsPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug); // published only
  if (!post) notFound();

  const related = (await fetchPublishedPosts()).filter((p) => p.slug !== post.slug).slice(0, 3);
  const date = formatPostDate(post.publishedAt);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: isoDate(post.publishedAt),
    dateModified: isoDate(post.updatedAt),
    image: post.coverImageUrl ?? undefined,
    mainEntityOfPage: `${SITE_URL}/news/${post.slug}`,
    author: { "@type": "Organization", name: "Skyluxe Roofing & Sheet Metal" },
    publisher: {
      "@type": "Organization",
      name: "Skyluxe Roofing & Sheet Metal",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/Skyluxe_Logo.png` },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // JSON.stringify output with "<" escaped so content can't close the script tag
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* Header band — padding clears the 112px header */}
      <section className="w-full bg-primary-950 pt-44 pb-14 sm:pb-16">
        <div className="mx-auto flex max-w-3xl flex-col gap-5 px-6">
          <Link
            href="/news"
            className="inline-flex w-fit items-center gap-2 font-montserrat text-xs uppercase tracking-[0.16em] text-secondary-300 hover:text-white transition-colors"
          >
            <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <path d="M11 6l-6 6 6 6" />
            </svg>
            All News
          </Link>
          <div className="flex flex-wrap items-center gap-3 font-montserrat text-xs">
            <span className="rounded bg-secondary-800 px-2.5 py-1.5 font-semibold uppercase tracking-widest text-white">
              {post.category}
            </span>
            {date && (
              <time dateTime={isoDate(post.publishedAt)} className="text-white/60">
                {date}
              </time>
            )}
          </div>
          <h1
            className="m-0 font-julius font-normal leading-tight text-white"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
          >
            {post.title}
          </h1>
          <p className="m-0 font-montserrat text-lg font-light leading-relaxed text-white/75">
            {post.excerpt}
          </p>
        </div>
      </section>

      <article className="w-full bg-white pb-20">
        {post.coverImageUrl && (
          <div className="mx-auto max-w-5xl px-6 pt-10 sm:pt-14">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-primary-50">
              <Image
                src={post.coverImageUrl}
                alt={post.coverImageAlt || post.title}
                fill
                priority
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        )}

        <div className="mx-auto max-w-3xl px-6 pt-8 sm:pt-12">
          <TiptapContent content={post.content} className={articleClasses} />

          <div className="mt-14 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-primary-50 p-6 sm:p-8">
            <div className="flex flex-col gap-1">
              <p className="m-0 font-julius text-xl text-primary-950">Planning a roofing project?</p>
              <p className="m-0 font-montserrat text-sm text-gray-600">
                Get a free assessment from a GAF Master Elite contractor.
              </p>
            </div>
            <Link
              href="/quote"
              className="inline-flex min-h-12 items-center rounded-md bg-secondary-800 px-6 font-montserrat text-sm font-semibold text-white hover:bg-secondary-900 transition-colors"
            >
              Request a Free Quote
            </Link>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="w-full border-t border-primary-50 bg-[rgb(255,253,245)] py-16 sm:py-20">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 sm:px-10">
            <h2 className="m-0 font-julius font-normal text-3xl text-primary-950">More News</h2>
            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
