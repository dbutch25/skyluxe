import Image from "next/image";
import Link from "next/link";
import type { PostSummary } from "@/types";
import { formatPostDate, isoDate } from "./format";

function ArrowIcon({ size = 12 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

export { ArrowIcon };

export default function PostCard({ post }: { post: PostSummary }) {
  const href = `/news/${post.slug}`;

  return (
    <article className="group flex flex-col gap-4.5">
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden="true"
        className="relative block w-full aspect-4/3 overflow-hidden rounded-xl border border-gray-200 bg-primary-50"
      >
        {post.coverImageUrl ? (
          <Image
            src={post.coverImageUrl}
            alt={post.coverImageAlt || post.title}
            fill
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center font-julius text-2xl text-primary-200">
            Skyluxe
          </span>
        )}
      </Link>

      <div className="flex items-center gap-3 font-montserrat text-xs">
        <span className="rounded bg-secondary-50 px-2.5 py-1.5 font-semibold uppercase tracking-widest text-secondary-700">
          {post.category}
        </span>
        <time dateTime={isoDate(post.publishedAt)} className="text-primary-400">
          {formatPostDate(post.publishedAt)}
        </time>
      </div>

      <h3 className="m-0 font-julius text-[22px] font-normal leading-snug text-primary-950">
        <Link href={href} className="text-primary-950 hover:text-secondary-800 transition-colors">
          {post.title}
        </Link>
      </h3>

      <p className="m-0 line-clamp-3 font-montserrat text-sm leading-relaxed text-gray-600">
        {post.excerpt}
      </p>

      <Link
        href={href}
        className="inline-flex min-h-11 items-center gap-2 font-montserrat text-sm font-semibold text-secondary-800 hover:text-secondary-900"
        aria-label={`Read more: ${post.title}`}
      >
        Read More
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          <ArrowIcon />
        </span>
      </Link>
    </article>
  );
}
